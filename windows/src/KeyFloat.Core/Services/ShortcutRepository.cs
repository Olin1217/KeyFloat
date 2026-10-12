using System.Globalization;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using KeyFloat.Core.Models;

namespace KeyFloat.Core.Services;

public sealed class ShortcutRepository
{
    private static readonly string[] GroupOrder =
    [
        "office", "study", "design", "media", "architecture", "engineering",
        "modeling", "simulation", "development", "versionControl", "databaseAPI",
        "dataAI", "electronics", "biology", "chemistry", "medical",
        "gameDevelopment", "collaboration", "browser", "windowsUtility", "other",
    ];

    private readonly Dictionary<string, SoftwarePack> _softwareById;
    private readonly Dictionary<string, SearchDocument> _documents;

    private ShortcutRepository(IReadOnlyList<SoftwarePack> software, IReadOnlyList<string> warnings)
    {
        Software = software;
        Warnings = warnings;
        _softwareById = software.ToDictionary(pack => pack.Id, StringComparer.OrdinalIgnoreCase);
        _documents = BuildSearchIndex(software);
        GroupedSoftware = GroupOrder
            .Select(group => new SoftwareGroupSection(
                group,
                software.Where(pack => pack.Group == group).ToArray()))
            .Where(section => section.Software.Count > 0)
            .ToArray();
    }

    public IReadOnlyList<SoftwarePack> Software { get; }
    public IReadOnlyList<SoftwareGroupSection> GroupedSoftware { get; }
    public IReadOnlyList<string> Warnings { get; }

    public static ShortcutRepository Load(string path)
    {
        var json = File.ReadAllText(path, Encoding.UTF8);
        var library = JsonSerializer.Deserialize<ShortcutLibrary>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        }) ?? throw new InvalidDataException("The Windows shortcut library is empty.");

        var warnings = new List<string>();
        var packs = new List<SoftwarePack>();
        var softwareIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var pack in library.Software)
        {
            if (string.IsNullOrWhiteSpace(pack.Id) || string.IsNullOrWhiteSpace(pack.Name) || !softwareIds.Add(pack.Id))
            {
                warnings.Add($"Skipped software with an empty or duplicate id: '{pack.Id}'.");
                continue;
            }

            if (pack.IsAvailableOnWindows && pack.Categories.Count == 0)
            {
                warnings.Add($"Skipped {pack.Id}: it is marked available but has no Windows shortcuts.");
                continue;
            }

            var itemIds = new HashSet<string>(StringComparer.Ordinal);
            var valid = true;
            foreach (var category in pack.Categories)
            {
                foreach (var item in category.Items)
                {
                    if (string.IsNullOrWhiteSpace(item.Id) || !itemIds.Add(item.Id) || item.KeysDefault.Count == 0 ||
                        string.IsNullOrWhiteSpace(item.ChineseTitle) || string.IsNullOrWhiteSpace(item.EnglishTitle))
                    {
                        warnings.Add($"Invalid shortcut in {pack.Id}/{category.Id}/{item.Id}.");
                        valid = false;
                    }

                    if (item.KeysDefault.Any(IsMacOnlyKey))
                    {
                        warnings.Add($"macOS key remained in {pack.Id}/{item.Id}.");
                        valid = false;
                    }
                }
            }

            if (valid)
            {
                packs.Add(pack);
            }
        }

        if (packs.Count == 0)
        {
            throw new InvalidDataException("No valid Windows shortcut packs were found.");
        }

        return new ShortcutRepository(packs, warnings);
    }

    public SoftwarePack? FindSoftware(string id) => _softwareById.GetValueOrDefault(id);

    public IReadOnlyList<ShortcutSection> Filter(
        SoftwarePack software,
        string categoryId,
        string query,
        bool favoriteOnly,
        IReadOnlySet<string> favorites)
    {
        var normalizedQuery = Normalize(query);
        var tokens = normalizedQuery.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var sections = new List<(int Offset, int Score, ShortcutSection Section)>();

        for (var categoryOffset = 0; categoryOffset < software.Categories.Count; categoryOffset++)
        {
            var category = software.Categories[categoryOffset];
            if (categoryId != "all" && category.Id != categoryId)
            {
                continue;
            }

            var ranked = new List<(int Offset, int Score, ShortcutItem Item)>();
            for (var itemOffset = 0; itemOffset < category.Items.Count; itemOffset++)
            {
                var item = category.Items[itemOffset];
                if (favoriteOnly && !favorites.Contains(FavoriteKey(software.Id, item.Id)))
                {
                    continue;
                }

                if (tokens.Length == 0)
                {
                    ranked.Add((itemOffset, 0, item));
                    continue;
                }

                var key = FavoriteKey(software.Id, item.Id);
                if (!_documents.TryGetValue(key, out var document) ||
                    !tokens.All(token => document.Haystack.Contains(token, StringComparison.Ordinal)))
                {
                    continue;
                }

                ranked.Add((itemOffset, Score(document, normalizedQuery, tokens), item));
            }

            if (ranked.Count == 0)
            {
                continue;
            }

            var ordered = tokens.Length == 0
                ? ranked
                : ranked.OrderByDescending(item => item.Score).ThenBy(item => item.Offset).ToList();
            sections.Add((
                categoryOffset,
                ranked.Max(item => item.Score),
                new ShortcutSection(category, ordered.Select(item => item.Item).ToArray())));
        }

        return tokens.Length == 0
            ? sections.Select(section => section.Section).ToArray()
            : sections.OrderByDescending(section => section.Score)
                .ThenBy(section => section.Offset)
                .Select(section => section.Section)
                .ToArray();
    }

    public static string FavoriteKey(string softwareId, string itemId) => $"{softwareId}:{itemId}";

    public static string Normalize(string value)
    {
        var normalized = value.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var builder = new StringBuilder(normalized.Length);
        foreach (var character in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark)
            {
                builder.Append(character);
            }
        }

        normalized = builder.ToString().Normalize(NormalizationForm.FormC);
        var replacements = new (string Source, string Target)[]
        {
            ("control", "ctrl"), ("ctl", "ctrl"), ("控制", "ctrl"),
            ("option", "alt"), ("选项", "alt"), ("换档", "shift"),
            ("return", "enter"), ("回车", "enter"), ("escape", "esc"),
            ("backspace", "delete"), ("删除", "delete"),
            ("←", " left "), ("→", " right "), ("↑", " up "), ("↓", " down "),
            ("+", " "), ("-", " "), ("/", " slash "), ("\\", " backslash "),
        };
        foreach (var (source, target) in replacements)
        {
            normalized = normalized.Replace(source, target, StringComparison.Ordinal);
        }

        normalized = Regex.Replace(normalized, @"[^\p{L}\p{N}]+", " ");
        return Regex.Replace(normalized, @"\s+", " ").Trim();
    }

    private static bool IsMacOnlyKey(string key) =>
        key.Contains('⌘') || key.Contains('⌥') || key.Contains('⌃') || key.Contains('⇧') ||
        key.Contains("Command", StringComparison.OrdinalIgnoreCase) ||
        key.Contains("macOS", StringComparison.OrdinalIgnoreCase);

    private static Dictionary<string, SearchDocument> BuildSearchIndex(IEnumerable<SoftwarePack> software)
    {
        var documents = new Dictionary<string, SearchDocument>(StringComparer.Ordinal);
        foreach (var pack in software)
        {
            foreach (var category in pack.Categories)
            {
                var categoryText = Normalize($"{category.ChineseTitle} {category.EnglishTitle}");
                foreach (var item in category.Items)
                {
                    var title = Normalize($"{item.ChineseTitle} {item.EnglishTitle}");
                    var keys = Normalize(string.Join(' ', item.KeysDefault.Concat(item.KeysChinese ?? []).Concat(item.KeysEnglish ?? [])));
                    var tags = Normalize(string.Join(' ', item.Tags));
                    documents[FavoriteKey(pack.Id, item.Id)] = new SearchDocument(
                        title,
                        keys,
                        tags,
                        categoryText,
                        $"{title} {keys} {tags} {categoryText}");
                }
            }
        }

        return documents;
    }

    private static int Score(SearchDocument document, string query, IReadOnlyList<string> tokens)
    {
        var score = 0;
        if (document.Keys == query) score += 1_200;
        else if (document.Keys.StartsWith(query, StringComparison.Ordinal)) score += 900;
        else if (document.Keys.Contains(query, StringComparison.Ordinal)) score += 700;
        if (document.Title == query) score += 1_000;
        else if (document.Title.StartsWith(query, StringComparison.Ordinal)) score += 800;
        else if (document.Title.Contains(query, StringComparison.Ordinal)) score += 600;
        if (document.Tags.Contains(query, StringComparison.Ordinal)) score += 300;
        if (document.Category.Contains(query, StringComparison.Ordinal)) score += 150;
        score += tokens.Sum(token =>
            (document.Title.Contains(token, StringComparison.Ordinal) ? 40 : 0) +
            (document.Keys.Contains(token, StringComparison.Ordinal) ? 35 : 0) +
            (document.Tags.Contains(token, StringComparison.Ordinal) ? 15 : 0));
        return score;
    }

    private sealed record SearchDocument(string Title, string Keys, string Tags, string Category, string Haystack);
}
