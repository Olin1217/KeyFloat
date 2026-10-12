using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows;
using KeyFloat.Core.Services;
using KeyFloat.Win.Interop;
using KeyFloat.Win.Services;
using KeyFloat.Win.ViewModels;
using KeyFloat.Win.Views;

namespace KeyFloat.Win;

public partial class App : System.Windows.Application
{
    private const string MutexName = "Local\\KeyFloat.Windows.V1";
    private Mutex? _singleInstance;
    private LicenseStore? _licenseStore;
    private SettingsService? _settings;
    private MainViewModel? _viewModel;
    private MainWindow? _mainWindow;
    private ActivationWindow? _activationWindow;
    private TrayService? _tray;
    private ForegroundAppMonitor? _foregroundMonitor;
    private bool _isShuttingDown;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        ShutdownMode = ShutdownMode.OnExplicitShutdown;
        _singleInstance = new Mutex(true, MutexName, out var createdNew);
        if (!createdNew)
        {
            ActivateExistingWindow();
            Shutdown();
            return;
        }

        try
        {
            var repository = ShortcutRepository.Load(Path.Combine(AppContext.BaseDirectory, "Data", "shortcuts-windows.json"));
            var settings = new SettingsService();
            _settings = settings;
            var submissions = new SubmissionService();
            var viewModel = new MainViewModel(repository, settings, submissions);
            _viewModel = viewModel;
            _licenseStore = new LicenseStore();
            _mainWindow = new MainWindow(viewModel, settings);
            MainWindow = _mainWindow;
            _tray = new TrayService(ToggleMainWindow, ShutdownApplication);
            _tray.UpdateLanguage(viewModel.IsChinese);
            viewModel.PropertyChanged += (_, eventArgs) =>
            {
                if (eventArgs.PropertyName == nameof(MainViewModel.Language)) _tray?.UpdateLanguage(viewModel.IsChinese);
            };
            _foregroundMonitor = new ForegroundAppMonitor(Dispatcher);
            _foregroundMonitor.ForegroundProcessChanged += process => viewModel.SelectForegroundProcess(process);
            _foregroundMonitor.Start();

            if (_licenseStore.IsActivated) ShowMainWindow();
            else ShowActivationWindow();
        }
        catch (Exception exception) when (exception is IOException or UnauthorizedAccessException or InvalidDataException)
        {
            MessageBox.Show(
                $"KeyFloat could not start because its Windows shortcut library is unavailable.\n\n{exception.Message}",
                "KeyFloat",
                MessageBoxButton.OK,
                MessageBoxImage.Error);
            ShutdownApplication();
        }
    }

    protected override void OnExit(ExitEventArgs e)
    {
        _foregroundMonitor?.Dispose();
        _tray?.Dispose();
        if (_singleInstance is not null)
        {
            try { _singleInstance.ReleaseMutex(); } catch (ApplicationException) { }
            _singleInstance.Dispose();
        }
        base.OnExit(e);
    }

    private void ToggleMainWindow()
    {
        Dispatcher.Invoke(() =>
        {
            if (_licenseStore?.IsActivated != true)
            {
                ShowActivationWindow();
                return;
            }
            if (_mainWindow?.IsVisible == true) _mainWindow.Hide();
            else ShowMainWindow();
        });
    }

    private void ShowMainWindow()
    {
        if (_mainWindow is null) return;
        _activationWindow?.Hide();
        _mainWindow.ShowFromTray();
    }

    private void ShowActivationWindow()
    {
        if (_licenseStore is null) return;
        _mainWindow?.Hide();
        if (_activationWindow is null)
        {
            if (_settings is null) return;
            _activationWindow = new ActivationWindow(_licenseStore, _settings);
            _activationWindow.LanguageChanged += language => _viewModel?.SetLanguage(language);
            _activationWindow.ActivatedSuccessfully += (_, _) =>
            {
                _activationWindow?.CompleteAndClose();
                _activationWindow = null;
                ShowMainWindow();
            };
        }
        _activationWindow.Show();
        _activationWindow.Activate();
    }

    private void ShutdownApplication()
    {
        if (_isShuttingDown) return;
        _isShuttingDown = true;
        _mainWindow?.ShutdownClose();
        _activationWindow?.CompleteAndClose();
        Shutdown();
    }

    private static void ActivateExistingWindow()
    {
        var window = FindWindow(null, "KeyFloat");
        if (window == IntPtr.Zero) return;
        ShowWindow(window, 9);
        SetForegroundWindow(window);
    }

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    private static extern IntPtr FindWindow(string? className, string windowName);

    [DllImport("user32.dll")]
    private static extern bool ShowWindow(IntPtr window, int command);

    [DllImport("user32.dll")]
    private static extern bool SetForegroundWindow(IntPtr window);
}
