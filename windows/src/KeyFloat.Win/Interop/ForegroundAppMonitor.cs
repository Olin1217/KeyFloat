using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Threading;

namespace KeyFloat.Win.Interop;

public sealed class ForegroundAppMonitor : IDisposable
{
    private const uint EventSystemForeground = 0x0003;
    private const uint WineventOutofcontext = 0x0000;
    private readonly Dispatcher _dispatcher;
    private readonly WinEventDelegate _callback;
    private IntPtr _hook;

    public ForegroundAppMonitor(Dispatcher dispatcher)
    {
        _dispatcher = dispatcher;
        _callback = OnWinEvent;
    }

    public event Action<string>? ForegroundProcessChanged;

    public void Start()
    {
        if (_hook != IntPtr.Zero) return;
        _hook = SetWinEventHook(EventSystemForeground, EventSystemForeground, IntPtr.Zero, _callback, 0, 0, WineventOutofcontext);
    }

    public void Dispose()
    {
        if (_hook == IntPtr.Zero) return;
        UnhookWinEvent(_hook);
        _hook = IntPtr.Zero;
        GC.SuppressFinalize(this);
    }

    private void OnWinEvent(IntPtr hook, uint eventType, IntPtr window, int objectId, int childId, uint eventThread, uint eventTime)
    {
        if (window == IntPtr.Zero) return;
        GetWindowThreadProcessId(window, out var processId);
        if (processId == 0) return;
        try
        {
            var processName = Process.GetProcessById((int)processId).ProcessName;
            _dispatcher.BeginInvoke(() => ForegroundProcessChanged?.Invoke(processName));
        }
        catch (ArgumentException)
        {
            // The process ended between the foreground event and the lookup.
        }
        catch (InvalidOperationException)
        {
            // Protected system processes are intentionally ignored.
        }
    }

    private delegate void WinEventDelegate(IntPtr hook, uint eventType, IntPtr window, int objectId, int childId, uint eventThread, uint eventTime);

    [DllImport("user32.dll")]
    private static extern IntPtr SetWinEventHook(uint eventMin, uint eventMax, IntPtr module, WinEventDelegate callback, uint processId, uint threadId, uint flags);

    [DllImport("user32.dll")]
    private static extern bool UnhookWinEvent(IntPtr hook);

    [DllImport("user32.dll")]
    private static extern uint GetWindowThreadProcessId(IntPtr window, out uint processId);
}
