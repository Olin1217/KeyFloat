using System.Drawing;
using Forms = System.Windows.Forms;

namespace KeyFloat.Win.Services;

public sealed class TrayService : IDisposable
{
    private readonly Forms.NotifyIcon _notifyIcon;
    private readonly Forms.ToolStripMenuItem _showItem;
    private readonly Forms.ToolStripMenuItem _quitItem;

    public TrayService(Action toggle, Action quit)
    {
        _showItem = new Forms.ToolStripMenuItem("Show / Hide KeyFloat", null, (_, _) => toggle());
        _quitItem = new Forms.ToolStripMenuItem("Quit KeyFloat", null, (_, _) => quit());
        var menu = new Forms.ContextMenuStrip();
        menu.Items.Add(_showItem);
        menu.Items.Add(new Forms.ToolStripSeparator());
        menu.Items.Add(_quitItem);

        var iconPath = Path.Combine(AppContext.BaseDirectory, "Assets", "KeyFloat.ico");
        _notifyIcon = new Forms.NotifyIcon
        {
            Text = "KeyFloat",
            Icon = new Icon(iconPath),
            Visible = true,
            ContextMenuStrip = menu,
        };
        _notifyIcon.MouseClick += (_, eventArgs) =>
        {
            if (eventArgs.Button == Forms.MouseButtons.Left) toggle();
        };
    }

    public void UpdateLanguage(bool chinese)
    {
        _showItem.Text = chinese ? "显示 / 隐藏 KeyFloat" : "Show / Hide KeyFloat";
        _quitItem.Text = chinese ? "退出 KeyFloat" : "Quit KeyFloat";
    }

    public void Dispose()
    {
        _notifyIcon.Visible = false;
        _notifyIcon.Dispose();
        GC.SuppressFinalize(this);
    }
}
