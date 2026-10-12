using System.Windows;
using System.Windows.Media;
using KeyFloat.Core.Models;

namespace KeyFloat.Win.Services;

public static class ThemeService
{
    private static readonly Dictionary<string, (string Light, string Dark)> Colors = new()
    {
        ["PanelBrush"] = ("#FBFBFB", "#141414"),
        ["ChromeBrush"] = ("#FFFFFF", "#1B1B1B"),
        ["ContentBrush"] = ("#F8F8F8", "#0F0F0F"),
        ["SurfaceBrush"] = ("#F3F3F3", "#1E1E1E"),
        ["SurfaceRaisedBrush"] = ("#EDEDED", "#282828"),
        ["SurfaceSelectedBrush"] = ("#E4E4E4", "#363636"),
        ["BorderBrush"] = ("#DADADA", "#414141"),
        ["TextPrimaryBrush"] = ("#1A1A1A", "#F4F4F4"),
        ["TextSecondaryBrush"] = ("#585858", "#AEAEAE"),
        ["TextMutedBrush"] = ("#818181", "#7C7C7C"),
        ["AccentBrush"] = ("#4A4A4A", "#D0D0D0"),
    };

    public static void Apply(AppTheme theme)
    {
        foreach (var (key, colors) in Colors)
        {
            System.Windows.Application.Current.Resources[key] = new SolidColorBrush((Color)ColorConverter.ConvertFromString(
                theme == AppTheme.Light ? colors.Light : colors.Dark));
        }
    }
}
