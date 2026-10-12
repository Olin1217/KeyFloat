using System.Text.Json;
using KeyFloat.Core.Models;

namespace KeyFloat.Win.Services;

public sealed class AppSettings
{
    public string SelectedSoftwareId { get; set; } = "figma";
    public AppLanguage Language { get; set; } = AppLanguage.English;
    public AppTheme Theme { get; set; } = AppTheme.Dark;
    public bool IsPinned { get; set; } = true;
    public HashSet<string> Favorites { get; set; } = new(StringComparer.Ordinal);
    public WindowPlacement Placement { get; set; } = new();
}

public sealed class WindowPlacement
{
    public double? Top { get; set; }
    public double? Right { get; set; }
    public double ExpandedWidth { get; set; } = 432;
    public double ExpandedHeight { get; set; } = 716;
}

public sealed class SettingsService
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private readonly string _directory;
    private readonly string _path;

    public SettingsService()
    {
        _directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "KeyFloat");
        _path = Path.Combine(_directory, "settings.json");
        Current = Load();
    }

    public AppSettings Current { get; }

    public void Save()
    {
        Directory.CreateDirectory(_directory);
        var temporary = _path + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(Current, JsonOptions));
        File.Move(temporary, _path, true);
    }

    private AppSettings Load()
    {
        try
        {
            return File.Exists(_path)
                ? JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(_path), JsonOptions) ?? new AppSettings()
                : new AppSettings();
        }
        catch (JsonException)
        {
            return new AppSettings();
        }
        catch (IOException)
        {
            return new AppSettings();
        }
    }
}
