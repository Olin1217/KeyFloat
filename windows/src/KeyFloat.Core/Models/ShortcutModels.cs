using System.Text.Json.Serialization;

namespace KeyFloat.Core.Models;

public enum AppLanguage
{
    English,
    Chinese,
}

public enum AppTheme
{
    Dark,
    Light,
}

public sealed class ShortcutLibrary
{
    [JsonPropertyName("software")]
    public List<SoftwarePack> Software { get; init; } = [];
}

public sealed class SoftwarePack
{
    [JsonPropertyName("id")]
    public string Id { get; init; } = "";

    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("vendor")]
    public string Vendor { get; init; } = "";

    [JsonPropertyName("accent")]
    public string Accent { get; init; } = "#808080";

    [JsonPropertyName("glyph")]
    public string Glyph { get; init; } = "K";

    [JsonPropertyName("group")]
    public string? DeclaredGroup { get; init; }

    [JsonPropertyName("dataStatus")]
    public string? DataStatus { get; init; }

    [JsonPropertyName("windowsAvailability")]
    public string WindowsAvailability { get; init; } = "available";

    [JsonPropertyName("windowsExecutableNames")]
    public List<string> WindowsExecutableNames { get; init; } = [];

    [JsonPropertyName("categories")]
    public List<ShortcutCategory> Categories { get; init; } = [];

    [JsonPropertyName("provenance")]
    public ShortcutProvenance? Provenance { get; init; }

    [JsonIgnore]
    public bool IsAvailableOnWindows => WindowsAvailability == "available";

    [JsonIgnore]
    public int ShortcutCount => Categories.Sum(category => category.Items.Count);

    [JsonIgnore]
    public string Group => DeclaredGroup ?? Id switch
    {
        "safari" => "browser",
        "affinitydesigner" or "affinityphoto" or "affinitypublisher" => "design",
        "terminal" => "development",
        "finder" => "windowsUtility",
        _ => "other",
    };

    [JsonIgnore]
    public string IconPath => $"Assets/SoftwareIcons/{Id}.png";
}

public sealed class ShortcutProvenance
{
    [JsonPropertyName("sourceURL")]
    public string? SourceUrl { get; init; }

    [JsonPropertyName("sourceTitle")]
    public string? SourceTitle { get; init; }

    [JsonPropertyName("appVersion")]
    public string? AppVersion { get; init; }

    [JsonPropertyName("verifiedAt")]
    public string? VerifiedAt { get; init; }

    [JsonPropertyName("coverage")]
    public string? Coverage { get; init; }

    [JsonPropertyName("platform")]
    public string? Platform { get; init; }
}

public sealed class ShortcutCategory
{
    [JsonPropertyName("id")]
    public string Id { get; init; } = "";

    [JsonPropertyName("zh")]
    public string ChineseTitle { get; init; } = "";

    [JsonPropertyName("en")]
    public string EnglishTitle { get; init; } = "";

    [JsonPropertyName("items")]
    public List<ShortcutItem> Items { get; init; } = [];

    public string Title(AppLanguage language) => language == AppLanguage.Chinese ? ChineseTitle : EnglishTitle;
}

public sealed class ShortcutItem
{
    [JsonPropertyName("id")]
    public string Id { get; init; } = "";

    [JsonPropertyName("keys")]
    public List<string> KeysDefault { get; init; } = [];

    [JsonPropertyName("keysZh")]
    public List<string>? KeysChinese { get; init; }

    [JsonPropertyName("keysEn")]
    public List<string>? KeysEnglish { get; init; }

    [JsonPropertyName("zh")]
    public string ChineseTitle { get; init; } = "";

    [JsonPropertyName("en")]
    public string EnglishTitle { get; init; } = "";

    [JsonPropertyName("tags")]
    public List<string> Tags { get; init; } = [];

    public string Title(AppLanguage language)
    {
        var value = language == AppLanguage.Chinese ? ChineseTitle : EnglishTitle;
        return value.Trim().TrimEnd('。').Trim();
    }

    public IReadOnlyList<string> Keys(AppLanguage language) =>
        language == AppLanguage.Chinese
            ? KeysChinese ?? KeysDefault
            : KeysEnglish ?? KeysDefault;
}

public sealed record ShortcutSection(ShortcutCategory Category, IReadOnlyList<ShortcutItem> Items);

public sealed record SoftwareGroupSection(string Group, IReadOnlyList<SoftwarePack> Software);
