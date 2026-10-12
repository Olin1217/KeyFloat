using System.Collections.Concurrent;
using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace KeyFloat.Win.Converters;

public sealed class BooleanToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        value is true ? Visibility.Visible : Visibility.Collapsed;
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class InverseBooleanToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        value is true ? Visibility.Collapsed : Visibility.Visible;
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class ZeroCountToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        value is int count && count == 0 ? Visibility.Visible : Visibility.Collapsed;
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class PositiveCountToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        value is int count && count > 0 ? Visibility.Visible : Visibility.Collapsed;
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class EmptyStringToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        string.IsNullOrEmpty(value as string) ? Visibility.Visible : Visibility.Collapsed;
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class FilterBackgroundConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        System.Windows.Application.Current.Resources[value is true ? "SurfaceSelectedBrush" : "SurfaceBrush"];
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class FilterForegroundConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        System.Windows.Application.Current.Resources[value is true ? "TextPrimaryBrush" : "TextSecondaryBrush"];
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class IconPathConverter : IValueConverter
{
    private static readonly ConcurrentDictionary<string, BitmapImage> Cache = new(StringComparer.OrdinalIgnoreCase);

    public object? Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is not string relative || string.IsNullOrWhiteSpace(relative)) return null;
        return Cache.GetOrAdd(relative, path =>
        {
            var absolute = Path.Combine(AppContext.BaseDirectory, path.Replace('/', Path.DirectorySeparatorChar));
            var image = new BitmapImage();
            image.BeginInit();
            image.CacheOption = BitmapCacheOption.OnLoad;
            image.UriSource = new Uri(absolute, UriKind.Absolute);
            image.DecodePixelWidth = 128;
            image.EndInit();
            image.Freeze();
            return image;
        });
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class SoftwareIconInsetConverter : IValueConverter
{
    private static readonly Dictionary<string, double> Insets = new(StringComparer.OrdinalIgnoreCase)
    {
        ["word"] = .12, ["excel"] = .12, ["powerpoint"] = .12, ["outlook"] = .06, ["onenote"] = .08,
        ["pages"] = .08, ["numbers"] = .08, ["keynote"] = .08, ["googledocs"] = .08,
        ["googlesheets"] = .08, ["googleslides"] = .08, ["figma"] = .18, ["grammarly"] = .16,
        ["chatgpt"] = .04, ["vscode"] = .08, ["godot"] = .06, ["jupyter"] = .14,
        ["supabase"] = .13, ["obsstudio"] = .10, ["obsidian"] = .09, ["linear"] = .17,
        ["netlify"] = .13, ["dockerdesktop"] = .12, ["postman"] = .10, ["github"] = .14,
        ["vercel"] = .16, ["blender"] = .04, ["photoshop"] = .04, ["illustrator"] = .04,
        ["aftereffects"] = .04, ["premiere"] = .04, ["indesign"] = .04, ["lightroom"] = .04,
        ["adobefirefly"] = .04, ["adobeacrobat"] = .04, ["adobexd"] = .04,
        ["substancepainter"] = .04, ["intellij"] = .04, ["datagrip"] = .04, ["goland"] = .04,
        ["pycharm"] = .04, ["clion"] = .04, ["webstorm"] = .04,
    };

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var ratio = value is string id && Insets.TryGetValue(id, out var custom) ? custom : .06;
        var inset = 34 * ratio;
        return new Thickness(inset);
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}

public sealed class SoftwareIconBackgroundConverter : IValueConverter
{
    private static readonly HashSet<string> WhiteBackground = new(StringComparer.OrdinalIgnoreCase)
    {
        "endnote", "scrivener", "linear", "dockerdesktop", "github", "vercel", "deepl", "zotero",
    };

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture) =>
        value is string id && WhiteBackground.Contains(id)
            ? Brushes.White
            : System.Windows.Application.Current.Resources["SurfaceRaisedBrush"];
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) => Binding.DoNothing;
}
