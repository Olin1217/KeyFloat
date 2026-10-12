using System.Windows;
using System.Windows.Input;
using KeyFloat.Core.Models;

namespace KeyFloat.Win.Views;

public partial class SubmissionDialog : Window
{
    private readonly Action<string, string> _onSubmit;

    private SubmissionDialog(Action<string, string> onSubmit)
    {
        InitializeComponent();
        _onSubmit = onSubmit;
        Loaded += (_, _) => MainTextBox.Focus();
    }

    public static SubmissionDialog ForSoftwareRequest(AppLanguage language, string group, Action<string, string> onSubmit)
    {
        var dialog = new SubmissionDialog(onSubmit);
        var chinese = language == AppLanguage.Chinese;
        dialog.TitleText.Text = chinese
            ? "输入您想要的产品名称，我们会尽快补充上架"
            : "Tell us which product you need. We’ll add it as soon as possible.";
        dialog.MainLabel.Text = chinese ? "软件名称" : "Software name";
        dialog.MainPlaceholder.Text = chinese ? "请输入软件名称" : "Enter the software name";
        dialog.ContactLabel.Text = chinese ? "联系方式（非必填）" : "Contact details (optional)";
        dialog.ContactPlaceholder.Text = chinese
            ? "请留下您的联系方式，微信/手机号/邮箱，我们会向您提供反馈结果"
            : "Leave your WeChat, phone number, or email so we can share the result";
        dialog.SubmitButton.Content = chinese ? "提交" : "Submit";
        return dialog;
    }

    public static SubmissionDialog ForFeedback(AppLanguage language, Action<string, string> onSubmit)
    {
        var dialog = new SubmissionDialog(onSubmit);
        var chinese = language == AppLanguage.Chinese;
        dialog.TitleText.Text = chinese ? "感谢你的反馈，帮助我们持续改进" : "Thanks for helping us improve KeyFloat";
        dialog.MainLabel.Text = chinese ? "问题与建议" : "Issue or suggestion";
        dialog.MainPlaceholder.Text = chinese
            ? "请描述遇到的问题或改进建议，必要时可补充复现步骤"
            : "Describe the issue or suggestion, including steps to reproduce when helpful";
        dialog.MainTextBox.MinHeight = 82;
        dialog.ContactLabel.Text = chinese ? "联系方式（非必填）" : "Contact details (optional)";
        dialog.ContactPlaceholder.Text = chinese
            ? "留下微信、手机号或邮箱，便于我们反馈处理结果"
            : "Leave your WeChat, phone number, or email so we can follow up";
        dialog.SubmitButton.Content = chinese ? "提交反馈" : "Send feedback";
        return dialog;
    }

    private void Submit_Click(object sender, RoutedEventArgs e)
    {
        var message = MainTextBox.Text.Trim();
        if (message.Length == 0) return;
        _onSubmit(message, ContactTextBox.Text.Trim());
        DialogResult = true;
    }

    private void Close_Click(object sender, RoutedEventArgs e) => DialogResult = false;

    private void MainTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
    {
        if (SubmitButton is not null) SubmitButton.IsEnabled = !string.IsNullOrWhiteSpace(MainTextBox.Text);
        if (MainPlaceholder is not null) MainPlaceholder.Visibility = string.IsNullOrEmpty(MainTextBox.Text) ? Visibility.Visible : Visibility.Collapsed;
    }

    private void ContactTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
    {
        if (ContactPlaceholder is not null) ContactPlaceholder.Visibility = string.IsNullOrEmpty(ContactTextBox.Text) ? Visibility.Visible : Visibility.Collapsed;
    }

    private void Window_PreviewKeyDown(object sender, System.Windows.Input.KeyEventArgs e)
    {
        if (e.Key == Key.Escape)
        {
            DialogResult = false;
            e.Handled = true;
        }
        else if (e.Key == Key.Enter && Keyboard.Modifiers == ModifierKeys.Control && SubmitButton.IsEnabled)
        {
            Submit_Click(this, new RoutedEventArgs());
            e.Handled = true;
        }
    }
}
