using System.Windows;

namespace KeyFloat.Win.Controls;

public static class ButtonAssist
{
    public static readonly DependencyProperty CornerRadiusProperty = DependencyProperty.RegisterAttached(
        "CornerRadius",
        typeof(CornerRadius),
        typeof(ButtonAssist),
        new FrameworkPropertyMetadata(new CornerRadius(8)));

    public static void SetCornerRadius(DependencyObject element, CornerRadius value) => element.SetValue(CornerRadiusProperty, value);
    public static CornerRadius GetCornerRadius(DependencyObject element) => (CornerRadius)element.GetValue(CornerRadiusProperty);
}
