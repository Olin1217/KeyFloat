using System.Windows;
using System.Windows.Input;
using KeyFloat.Core.Models;
using KeyFloat.Core.Services;
using KeyFloat.Win.Services;

namespace KeyFloat.Win.Views;

public partial class ActivationWindow : Window
{
    private const string DeveloperEmail = "SHL7450702@gmail.com";
    private readonly LicenseStore _licenseStore;
    private readonly SettingsService _settings;
    private readonly LicenseRedemptionService _redemptionService = new();
    private AppLanguage _language;
    private CancellationTokenSource? _copyCancellation;
    private bool _allowClose;
    private bool _isActivating;

    public ActivationWindow(LicenseStore licenseStore, SettingsService settings)
    {
        InitializeComponent();
        _licenseStore = licenseStore;
        _settings = settings;
        _language = settings.Current.Language;
        ApplyLanguage();
        Loaded += (_, _) => CodeTextBox.Focus();
        Closing += (_, eventArgs) =>
        {
            if (!_allowClose)
            {
                _allowClose = true;
                System.Windows.Application.Current.Shutdown();
            }
        };
    }

    public event EventHandler? ActivatedSuccessfully;
    public event Action<AppLanguage>? LanguageChanged;

    public void CompleteAndClose()
    {
        _allowClose = true;
        Close();
    }

    private void ApplyLanguage()
    {
        var chinese = _language == AppLanguage.Chinese;
        TitleText.Text = chinese ? "激活 KeyFloat" : "Activate KeyFloat";
        SubtitleText.Text = chinese ? "输入购买后获得的激活码，验证通过后即可继续使用。" : "Enter the activation code issued after purchase to continue using KeyFloat.";
        PlaceholderText.Text = "KF1-XXXXX-XXXXX-XXXXX-XXXXX";
        HelperText.Text = chinese ? "短激活码首次验证需要联网；原有长券码仍可使用。" : "Short codes require internet once. Existing long vouchers remain supported.";
        ActivateButton.Content = _isActivating ? (chinese ? "正在激活…" : "Activating…") : (chinese ? "激活并继续" : "Activate and continue");
        ContactButton.Content = chinese ? "联系开发者" : "Contact developer";
        LanguageButton.Content = chinese ? "EN" : "中文";
        EmailTitleText.Text = chinese ? "开发者邮箱" : "Developer email";
        ReplyTimeText.Text = chinese ? "开发者将在 1 个工作日内回复" : "The developer will reply within 1 business day";
        ErrorText.Visibility = Visibility.Collapsed;
    }

    private async void Activate_Click(object sender, RoutedEventArgs e)
    {
        if (_isActivating) return;
        var rawCode = CodeTextBox.Text.Trim();
        if (rawCode.Length == 0)
        {
            ShowActivationError(_language == AppLanguage.Chinese ? "请先输入激活码。" : "Enter an activation code first.");
            return;
        }

        if (LicenseValidator.NormalizeShortActivationCode(rawCode) is not null)
        {
            _isActivating = true;
            ActivateButton.IsEnabled = false;
            CodeTextBox.IsEnabled = false;
            ApplyLanguage();
            var version = typeof(ActivationWindow).Assembly.GetName().Version?.ToString(3) ?? "unknown";
            var redemption = await _redemptionService.RedeemAsync(rawCode, version);
            _isActivating = false;
            ActivateButton.IsEnabled = true;
            CodeTextBox.IsEnabled = true;
            ApplyLanguage();
            if (redemption.Result != LicenseRedemptionResult.Redeemed || string.IsNullOrWhiteSpace(redemption.VoucherCode))
            {
                ShowActivationError(RedemptionMessage(redemption.Result));
                CodeTextBox.Focus();
                return;
            }
            rawCode = redemption.VoucherCode;
        }

        var result = _licenseStore.Activate(rawCode);
        if (result == LicenseActivationResult.Activated)
        {
            ErrorText.Visibility = Visibility.Collapsed;
            ActivatedSuccessfully?.Invoke(this, EventArgs.Empty);
            return;
        }
        var chinese = _language == AppLanguage.Chinese;
        ShowActivationError(result switch
        {
            LicenseActivationResult.EmptyCode => chinese ? "请先输入激活码。" : "Enter an activation code first.",
            LicenseActivationResult.InvalidCode => chinese ? "激活码无效，请检查是否完整复制。" : "This activation code is invalid. Check that it was copied in full.",
            _ => chinese ? "无法保存激活信息，请检查系统权限后重试。" : "Activation could not be saved. Check system permissions and try again.",
        });
    }

    private string RedemptionMessage(LicenseRedemptionResult result)
    {
        var chinese = _language == AppLanguage.Chinese;
        return result switch
        {
            LicenseRedemptionResult.InvalidCode => chinese ? "激活码无效，请检查后重新输入。" : "This activation code is invalid. Check it and try again.",
            LicenseRedemptionResult.DeviceLimitReached => chinese ? "该激活码已达到设备数量上限，请联系开发者。" : "This code has reached its device limit. Contact the developer.",
            LicenseRedemptionResult.RateLimited => chinese ? "尝试次数过多，请稍后再试。" : "Too many attempts. Try again later.",
            LicenseRedemptionResult.NetworkUnavailable => chinese ? "无法连接网络，请检查网络后重试。" : "Unable to connect. Check your network and try again.",
            _ => chinese ? "激活服务暂时不可用，请稍后重试。" : "Activation is temporarily unavailable. Try again later.",
        };
    }

    private void ShowActivationError(string message)
    {
        ErrorText.Text = message;
        ErrorText.Visibility = Visibility.Visible;
    }

    private void Language_Click(object sender, RoutedEventArgs e)
    {
        _language = _language == AppLanguage.English ? AppLanguage.Chinese : AppLanguage.English;
        _settings.Current.Language = _language;
        _settings.Save();
        LanguageChanged?.Invoke(_language);
        ApplyLanguage();
    }

    private void Contact_Click(object sender, RoutedEventArgs e) => ContactOverlay.Visibility = Visibility.Visible;

    private void ContactBackdrop_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        ContactOverlay.Visibility = Visibility.Collapsed;
        e.Handled = true;
    }

    private void ContactCard_MouseLeftButtonDown(object sender, MouseButtonEventArgs e) => e.Handled = true;

    private async void CopyEmail_Click(object sender, RoutedEventArgs e)
    {
        Clipboard.SetText(DeveloperEmail);
        _copyCancellation?.Cancel();
        _copyCancellation = new CancellationTokenSource();
        var token = _copyCancellation.Token;
        CopyIcon.Text = "\uE73E";
        try
        {
            await Task.Delay(1400, token);
            CopyIcon.Text = "\uE8C8";
        }
        catch (TaskCanceledException)
        {
            // A repeated copy restarts the feedback interval.
        }
    }

    private void CodeTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e) =>
        PlaceholderText.Visibility = string.IsNullOrEmpty(CodeTextBox.Text) ? Visibility.Visible : Visibility.Collapsed;

    private void Window_PreviewKeyDown(object sender, System.Windows.Input.KeyEventArgs e)
    {
        if (e.Key == Key.Enter)
        {
            Activate_Click(this, new RoutedEventArgs());
            e.Handled = true;
        }
        else if (e.Key == Key.Escape && ContactOverlay.Visibility == Visibility.Visible)
        {
            ContactOverlay.Visibility = Visibility.Collapsed;
            e.Handled = true;
        }
    }

    private void DragRegion_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ChangedButton != MouseButton.Left || FindInteractiveAncestor(e.OriginalSource as DependencyObject)) return;
        try { DragMove(); } catch (InvalidOperationException) { }
    }

    private static bool FindInteractiveAncestor(DependencyObject? source)
    {
        for (var current = source; current is not null; current = System.Windows.Media.VisualTreeHelper.GetParent(current))
        {
            if (current is System.Windows.Controls.Button or System.Windows.Controls.TextBox) return true;
        }
        return false;
    }

    private void Quit_Click(object sender, RoutedEventArgs e)
    {
        _allowClose = true;
        System.Windows.Application.Current.Shutdown();
    }
}
