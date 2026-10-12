using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Animation;
using KeyFloat.Core.Models;
using KeyFloat.Win.Services;
using KeyFloat.Win.ViewModels;
using Forms = System.Windows.Forms;

namespace KeyFloat.Win.Views;

public partial class MainWindow : Window
{
    private const double CollapsedWidth = 230;
    private const double CollapsedHeight = 62;
    private const double ExpandedDefaultWidth = 432;
    private const double ExpandedDefaultHeight = 716;
    private const double ExpandedMinimumWidth = 360;
    private const double ExpandedMinimumHeight = 520;
    private const double ExpandedMaximumWidth = 640;
    private const double ExpandedMaximumHeight = 900;
    private const int WmNcHitTest = 0x0084;
    private const int HtLeft = 10;
    private const int HtRight = 11;
    private const int HtTop = 12;
    private const int HtTopLeft = 13;
    private const int HtTopRight = 14;
    private const int HtBottom = 15;
    private const int HtBottomLeft = 16;
    private const int HtBottomRight = 17;

    private readonly MainViewModel _viewModel;
    private readonly SettingsService _settings;
    private bool _isTransitioning;
    private bool? _pendingExpanded;
    private bool _allowClose;
    private bool _isAnimatingWindow;
    private double _expandedWidth;
    private double _expandedHeight;
    private CancellationTokenSource? _toastCancellation;

    public MainWindow(MainViewModel viewModel, SettingsService settings)
    {
        InitializeComponent();
        _viewModel = viewModel;
        _settings = settings;
        DataContext = viewModel;
        _expandedWidth = Math.Clamp(settings.Current.Placement.ExpandedWidth, ExpandedMinimumWidth, ExpandedMaximumWidth);
        _expandedHeight = Math.Clamp(settings.Current.Placement.ExpandedHeight, ExpandedMinimumHeight, ExpandedMaximumHeight);
        Topmost = viewModel.IsPinned;

        viewModel.ExpansionRequested += expanded => _ = SetExpandedAsync(expanded);
        viewModel.CloseRequested += (_, _) => HideToTray();
        viewModel.SoftwareSelected += (_, _) => CloseSoftwarePicker();
        viewModel.SoftwareRequestRequested += group => ShowSoftwareRequest(group);
        viewModel.FeedbackRequested += (_, _) => ShowFeedback();
        viewModel.ThemeChanged += (_, _) => RefreshDynamicBindings();
        viewModel.PinChanged += (_, _) => Topmost = viewModel.IsPinned;
        viewModel.SoftwareSearchFocusRequested += () => Dispatcher.BeginInvoke(() =>
        {
            SoftwareSearchTextBox.Focus();
            Keyboard.Focus(SoftwareSearchTextBox);
        });
        Loaded += (_, _) => RestorePlacement();
        Closing += MainWindow_Closing;
    }

    public void ShowFromTray()
    {
        Show();
        if (WindowState == WindowState.Minimized) WindowState = WindowState.Normal;
        Activate();
        Topmost = _viewModel.IsPinned;
    }

    public void ShutdownClose()
    {
        _allowClose = true;
        Close();
    }

    public void FocusSearch()
    {
        if (_viewModel.IsExpanded)
        {
            SearchTextBox.Focus();
            Keyboard.Focus(SearchTextBox);
        }
        else
        {
            _ = SetExpandedAsync(true, focusSearch: true);
        }
    }

    private async Task SetExpandedAsync(bool expanded, bool focusSearch = false)
    {
        if (_isTransitioning)
        {
            _pendingExpanded = expanded;
            return;
        }
        if (_viewModel.IsExpanded == expanded) return;

        _isTransitioning = true;
        if (expanded)
        {
            _viewModel.ResetSoftwarePicker();
            CloseSoftwarePicker();
            CollapsedPanel.BeginAnimation(OpacityProperty, new DoubleAnimation(0, TimeSpan.FromMilliseconds(180))
            {
                EasingFunction = new QuadraticEase { EasingMode = EasingMode.EaseOut },
            });
            var target = ExpandedTargetRect();
            await AnimateWindowAsync(target, 140);
            await Task.Delay(40);
            CollapsedPanel.Visibility = Visibility.Collapsed;
            CollapsedPanel.Opacity = 1;
            CollapsedPanel.BeginAnimation(OpacityProperty, null);
            ExpandedPanel.Visibility = Visibility.Visible;
            _viewModel.SetExpanded(true);
            ApplyExpandedLimits();
            if (focusSearch)
            {
                SearchTextBox.Focus();
                Keyboard.Focus(SearchTextBox);
            }
        }
        else
        {
            CloseSoftwarePicker();
            Keyboard.ClearFocus();
            RememberExpandedSize();
            _viewModel.SetExpanded(false);
            ExpandedPanel.Visibility = Visibility.Collapsed;
            CollapsedPanel.Visibility = Visibility.Visible;
            CollapsedPanel.Opacity = 0;
            ApplyTransitionLimits();
            var target = CollapsedTargetRect();
            await AnimateWindowAsync(target, 220);
            ApplyCollapsedLimits();
            CollapsedPanel.BeginAnimation(OpacityProperty, new DoubleAnimation(1, TimeSpan.FromMilliseconds(140))
            {
                EasingFunction = new QuadraticEase { EasingMode = EasingMode.EaseOut },
            });
            await Task.Delay(140);
            CollapsedPanel.Opacity = 1;
            CollapsedPanel.BeginAnimation(OpacityProperty, null);
        }

        _isTransitioning = false;
        SavePlacement();
        if (_pendingExpanded is { } pending)
        {
            _pendingExpanded = null;
            await SetExpandedAsync(pending);
        }
    }

    private Rect ExpandedTargetRect()
    {
        var workArea = CurrentWorkArea();
        var width = Math.Min(_expandedWidth, workArea.Width);
        var height = Math.Min(_expandedHeight, workArea.Height);
        var right = Left + ActualWidth;
        var left = Math.Clamp(right - width, workArea.Left, workArea.Right - width);
        var top = Math.Clamp(Top, workArea.Top, workArea.Bottom - height);
        return new Rect(left, top, width, height);
    }

    private Rect CollapsedTargetRect()
    {
        var workArea = CurrentWorkArea();
        var right = Left + ActualWidth;
        var left = Math.Clamp(right - CollapsedWidth, workArea.Left, workArea.Right - CollapsedWidth);
        var top = Math.Clamp(Top, workArea.Top, workArea.Bottom - CollapsedHeight);
        return new Rect(left, top, CollapsedWidth, CollapsedHeight);
    }

    private async Task AnimateWindowAsync(Rect target, int milliseconds)
    {
        ApplyTransitionLimits();
        _isAnimatingWindow = true;
        var easing = new QuadraticEase { EasingMode = EasingMode.EaseInOut };
        var duration = TimeSpan.FromMilliseconds(milliseconds);
        var animations = new[]
        {
            (LeftProperty, new DoubleAnimation(Left, target.Left, duration) { EasingFunction = easing }),
            (TopProperty, new DoubleAnimation(Top, target.Top, duration) { EasingFunction = easing }),
            (WidthProperty, new DoubleAnimation(ActualWidth, target.Width, duration) { EasingFunction = easing }),
            (HeightProperty, new DoubleAnimation(ActualHeight, target.Height, duration) { EasingFunction = easing }),
        };
        foreach (var (property, animation) in animations) BeginAnimation(property, animation, HandoffBehavior.SnapshotAndReplace);
        await Task.Delay(milliseconds + 10);
        foreach (var (property, _) in animations) BeginAnimation(property, null);
        Left = target.Left;
        Top = target.Top;
        Width = target.Width;
        Height = target.Height;
        _isAnimatingWindow = false;
    }

    private void ApplyTransitionLimits()
    {
        MinWidth = 1;
        MinHeight = 1;
        MaxWidth = 10_000;
        MaxHeight = 10_000;
    }

    private void ApplyCollapsedLimits()
    {
        MinWidth = MaxWidth = CollapsedWidth;
        MinHeight = MaxHeight = CollapsedHeight;
        ResizeMode = ResizeMode.NoResize;
    }

    private void ApplyExpandedLimits()
    {
        var workArea = CurrentWorkArea();
        MinWidth = Math.Min(ExpandedMinimumWidth, workArea.Width);
        MinHeight = Math.Min(ExpandedMinimumHeight, workArea.Height);
        MaxWidth = Math.Min(ExpandedMaximumWidth, workArea.Width);
        MaxHeight = Math.Min(ExpandedMaximumHeight, workArea.Height);
        ResizeMode = ResizeMode.CanResize;
    }

    private void RememberExpandedSize()
    {
        if (!_viewModel.IsExpanded && ExpandedPanel.Visibility != Visibility.Visible) return;
        _expandedWidth = Math.Clamp(ActualWidth, ExpandedMinimumWidth, ExpandedMaximumWidth);
        _expandedHeight = Math.Clamp(ActualHeight, ExpandedMinimumHeight, ExpandedMaximumHeight);
        _settings.Current.Placement.ExpandedWidth = _expandedWidth;
        _settings.Current.Placement.ExpandedHeight = _expandedHeight;
    }

    private void RestorePlacement()
    {
        var workArea = CurrentWorkArea();
        var right = _settings.Current.Placement.Right ?? workArea.Right - 22;
        var top = _settings.Current.Placement.Top ?? workArea.Top + 110;
        Left = Math.Clamp(right - CollapsedWidth, workArea.Left, workArea.Right - CollapsedWidth);
        Top = Math.Clamp(top, workArea.Top, workArea.Bottom - CollapsedHeight);
        ApplyCollapsedLimits();
        UpdateRoundedClip();
    }

    private void SavePlacement()
    {
        if (_isAnimatingWindow || !IsLoaded) return;
        _settings.Current.Placement.Right = Left + ActualWidth;
        _settings.Current.Placement.Top = Top;
        if (_viewModel.IsExpanded) RememberExpandedSize();
        _settings.Save();
    }

    private Rect CurrentWorkArea()
    {
        var handle = new WindowInteropHelper(this).Handle;
        var screen = handle == IntPtr.Zero
            ? Forms.Screen.PrimaryScreen
            : Forms.Screen.FromHandle(handle);
        if (screen is null) return SystemParameters.WorkArea;
        var scale = VisualTreeHelper.GetDpi(this);
        return new Rect(
            screen.WorkingArea.Left / scale.DpiScaleX,
            screen.WorkingArea.Top / scale.DpiScaleY,
            screen.WorkingArea.Width / scale.DpiScaleX,
            screen.WorkingArea.Height / scale.DpiScaleY);
    }

    private void HideToTray()
    {
        CloseSoftwarePicker();
        Hide();
    }

    private void SoftwareSelector_Click(object sender, RoutedEventArgs e)
    {
        SoftwarePopup.IsOpen = !SoftwarePopup.IsOpen;
    }

    private void SoftwarePopup_Opened(object? sender, EventArgs e)
    {
        SoftwareChevron.Text = "\uE70E";
        _viewModel.ResetSoftwarePicker();
    }

    private void SoftwarePopup_Closed(object? sender, EventArgs e)
    {
        SoftwareChevron.Text = "\uE70D";
        _viewModel.ResetSoftwarePicker();
    }

    private void CloseSoftwarePicker() => SoftwarePopup.IsOpen = false;

    private void SoftwarePopupContent_PreviewMouseDown(object sender, MouseButtonEventArgs e)
    {
        if (!_viewModel.IsSoftwareSearchActive || FindAncestor<TextBox>(e.OriginalSource as DependencyObject) is not null) return;
        _viewModel.DismissSoftwareSearch();
        Keyboard.ClearFocus();
    }

    private void PickerEntry_Click(object sender, RoutedEventArgs e)
    {
        if (sender is not Button { DataContext: PickerEntryViewModel entry }) return;
        _viewModel.PickerEntryCommand.Execute(entry);
    }

    private void ShowSoftwareRequest(string group)
    {
        CloseSoftwarePicker();
        var dialog = SubmissionDialog.ForSoftwareRequest(_viewModel.Language, group, (name, contact) =>
        {
            _viewModel.SaveSoftwareRequest(group, name, contact);
            ShowToast(_viewModel.IsChinese ? "提交成功" : "Submitted successfully");
        });
        dialog.Owner = this;
        dialog.ShowDialog();
    }

    private void ShowFeedback()
    {
        var dialog = SubmissionDialog.ForFeedback(_viewModel.Language, (message, contact) =>
        {
            _viewModel.SaveFeedback(message, contact);
            ShowToast(_viewModel.IsChinese ? "反馈已提交，感谢你的帮助" : "Feedback sent — thank you");
        });
        dialog.Owner = this;
        dialog.ShowDialog();
    }

    private async void ShowToast(string message)
    {
        _toastCancellation?.Cancel();
        _toastCancellation = new CancellationTokenSource();
        var token = _toastCancellation.Token;
        ToastText.Text = message;
        ToastBorder.Visibility = Visibility.Visible;
        ToastBorder.Opacity = 0;
        ToastBorder.BeginAnimation(OpacityProperty, new DoubleAnimation(1, TimeSpan.FromMilliseconds(160)));
        try
        {
            await Task.Delay(1800, token);
            ToastBorder.BeginAnimation(OpacityProperty, new DoubleAnimation(0, TimeSpan.FromMilliseconds(140)));
            await Task.Delay(140, token);
            ToastBorder.Visibility = Visibility.Collapsed;
        }
        catch (TaskCanceledException)
        {
            // A new toast replaced this one.
        }
    }

    private void DragRegion_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (_viewModel.IsPinned || e.ChangedButton != MouseButton.Left || IsInteractiveElement(e.OriginalSource as DependencyObject)) return;
        try { DragMove(); } catch (InvalidOperationException) { }
    }

    private static bool IsInteractiveElement(DependencyObject? source)
    {
        for (var current = source; current is not null; current = VisualTreeHelper.GetParent(current))
        {
            if (current is ButtonBase or TextBox or ScrollViewer) return true;
        }
        return false;
    }

    private void Window_PreviewKeyDown(object sender, System.Windows.Input.KeyEventArgs e)
    {
        if (e.Key == Key.Escape && (_viewModel.IsExpanded || _isTransitioning))
        {
            _ = SetExpandedAsync(false);
            e.Handled = true;
            return;
        }
        if (Keyboard.Modifiers == ModifierKeys.Control && e.Key is Key.K or Key.F)
        {
            FocusSearch();
            e.Handled = true;
        }
    }

    private void Window_PreviewMouseDown(object sender, MouseButtonEventArgs e)
    {
        if (FindAncestor<TextBox>(e.OriginalSource as DependencyObject) is null)
        {
            Keyboard.ClearFocus();
            SearchBorder.BorderBrush = (Brush)System.Windows.Application.Current.Resources["BorderBrush"];
        }
    }

    private void SearchTextBox_GotKeyboardFocus(object sender, KeyboardFocusChangedEventArgs e) =>
        SearchBorder.BorderBrush = (Brush)System.Windows.Application.Current.Resources["AccentBrush"];

    private void SearchTextBox_LostKeyboardFocus(object sender, KeyboardFocusChangedEventArgs e) =>
        SearchBorder.BorderBrush = (Brush)System.Windows.Application.Current.Resources["BorderBrush"];

    private static T? FindAncestor<T>(DependencyObject? source) where T : DependencyObject
    {
        for (var current = source; current is not null; current = VisualTreeHelper.GetParent(current))
        {
            if (current is T match) return match;
        }
        return null;
    }

    private void RefreshDynamicBindings()
    {
        var dataContext = DataContext;
        DataContext = null;
        DataContext = dataContext;
        UpdateRoundedClip();
    }

    private void Window_SourceInitialized(object? sender, EventArgs e)
    {
        var source = HwndSource.FromHwnd(new WindowInteropHelper(this).Handle);
        source?.AddHook(WindowProcedure);
    }

    private IntPtr WindowProcedure(IntPtr window, int message, IntPtr wParam, IntPtr lParam, ref bool handled)
    {
        if (message != WmNcHitTest || !_viewModel.IsExpanded || _isTransitioning) return IntPtr.Zero;
        var x = unchecked((short)(long)lParam);
        var y = unchecked((short)((long)lParam >> 16));
        var point = PointFromScreen(new Point(x, y));
        const double edge = 7;
        var left = point.X <= edge;
        var right = point.X >= ActualWidth - edge;
        var top = point.Y <= edge;
        var bottom = point.Y >= ActualHeight - edge;
        var result = top && left ? HtTopLeft : top && right ? HtTopRight : bottom && left ? HtBottomLeft :
            bottom && right ? HtBottomRight : left ? HtLeft : right ? HtRight : top ? HtTop : bottom ? HtBottom : 0;
        if (result == 0) return IntPtr.Zero;
        handled = true;
        return new IntPtr(result);
    }

    private void Window_PlacementChanged(object? sender, EventArgs e) => SavePlacement();

    private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
    {
        UpdateRoundedClip();
        if (_viewModel.IsExpanded && !_isAnimatingWindow) RememberExpandedSize();
    }

    private void UpdateRoundedClip()
    {
        if (ActualWidth <= 0 || ActualHeight <= 0) return;
        ShellBorder.Clip = new RectangleGeometry(new Rect(0, 0, ActualWidth, ActualHeight), 15, 15);
    }

    private void MainWindow_Closing(object? sender, CancelEventArgs e)
    {
        if (_allowClose) return;
        e.Cancel = true;
        HideToTray();
    }
}
