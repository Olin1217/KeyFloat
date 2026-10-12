import AppKit
import SwiftUI

private final class ActivationPanel: NSPanel {
    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }
}

@MainActor
private final class ActivationViewModel: ObservableObject {
    @Published var code = ""
    @Published var errorMessage = ""
    @Published var isContactPresented = false
    @Published var isActivating = false
    @Published var language: AppLanguage

    private let licenseStore: LicenseStore
    private let onActivated: () -> Void
    private let redemptionService = LicenseRedemptionService()

    init(licenseStore: LicenseStore, onActivated: @escaping () -> Void) {
        self.licenseStore = licenseStore
        self.onActivated = onActivated
        language = AppLanguage.load()
    }

    var isChinese: Bool { language == .zh }
    var title: String { isChinese ? "激活 KeyFloat" : "Activate KeyFloat" }
    var subtitle: String { isChinese ? "输入购买后获得的激活码，验证通过后即可继续使用。" : "Enter the activation code issued after purchase to continue using KeyFloat." }
    var placeholder: String { isChinese ? "KF1-XXXXX-XXXXX-XXXXX-XXXXX" : "KF1-XXXXX-XXXXX-XXXXX-XXXXX" }
    var activateTitle: String {
        if isActivating { return isChinese ? "正在激活…" : "Activating…" }
        return isChinese ? "激活并继续" : "Activate and continue"
    }
    var helper: String { isChinese ? "短激活码首次验证需要联网；原有长券码仍可使用。" : "Short codes require internet once. Existing long vouchers remain supported." }
    var contactTitle: String { isChinese ? "联系开发者" : "Contact developer" }
    var developerEmailTitle: String { isChinese ? "开发者邮箱" : "Developer email" }
    var developerReplyTime: String { isChinese ? "开发者将在 1 个工作日内回复" : "The developer will reply within 1 business day" }
    var copyEmailTitle: String { isChinese ? "复制邮箱" : "Copy email" }
    var emailCopiedTitle: String { isChinese ? "邮箱已复制" : "Email copied" }
    var closeLabel: String { isChinese ? "退出 KeyFloat" : "Quit KeyFloat" }
    var languageTitle: String { isChinese ? "EN" : "中文" }

    func toggleLanguage() {
        language = language == .en ? .zh : .en
        UserDefaults.standard.set(language.rawValue, forKey: "KeyFloatLanguage")
        errorMessage = ""
    }

    func activate() {
        guard !isActivating else { return }
        let trimmed = code.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            errorMessage = isChinese ? "请先输入激活码。" : "Enter an activation code first."
            return
        }
        if ShortActivationCode.normalized(trimmed) != nil {
            isActivating = true
            errorMessage = ""
            Task { @MainActor in
                defer { isActivating = false }
                do {
                    let voucher = try await redemptionService.redeem(
                        code: trimmed,
                        installationId: licenseStore.installationIdentifier(),
                        appVersion: Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "unknown"
                    )
                    handleLocalActivation(voucher)
                } catch let error as LicenseRedemptionError {
                    errorMessage = redemptionMessage(for: error)
                } catch {
                    errorMessage = redemptionMessage(for: .serviceUnavailable)
                }
            }
            return
        }
        handleLocalActivation(trimmed)
    }

    private func handleLocalActivation(_ credential: String) {
        switch licenseStore.activate(code: credential) {
        case .activated:
            errorMessage = ""
            onActivated()
        case .emptyCode:
            errorMessage = isChinese ? "请先输入激活码。" : "Enter an activation code first."
        case .invalidCode:
            errorMessage = isChinese ? "激活码无效，请检查是否完整复制。" : "This activation code is invalid. Check that it was copied in full."
        case .persistenceFailed:
            errorMessage = isChinese ? "无法保存激活信息，请检查系统权限后重试。" : "Activation could not be saved. Check system permissions and try again."
        }
    }

    private func redemptionMessage(for error: LicenseRedemptionError) -> String {
        switch error {
        case .invalidCode:
            return isChinese ? "激活码无效，请检查后重新输入。" : "This activation code is invalid. Check it and try again."
        case .deviceLimitReached:
            return isChinese ? "该激活码已达到设备数量上限，请联系开发者。" : "This code has reached its device limit. Contact the developer."
        case .rateLimited:
            return isChinese ? "尝试次数过多，请稍后再试。" : "Too many attempts. Try again later."
        case .networkUnavailable:
            return isChinese ? "无法连接网络，请检查网络后重试。" : "Unable to connect. Check your network and try again."
        case .serviceUnavailable, .invalidResponse:
            return isChinese ? "激活服务暂时不可用，请稍后重试。" : "Activation is temporarily unavailable. Try again later."
        }
    }

}

private struct ActivationContactModalView: View {
    private static let developerEmail = "SHL7450702@gmail.com"

    @ObservedObject var viewModel: ActivationViewModel
    @State private var didCopyEmail = false
    @State private var copyFeedbackTask: Task<Void, Never>?

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.white)
                        .frame(width: 40, height: 40)
                    Image(systemName: "envelope.fill")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundColor(Color.black)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(viewModel.developerEmailTitle)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Color.white)
                    Text(viewModel.developerReplyTime)
                        .font(.system(size: 11.5))
                        .foregroundColor(Color(hexValue: "#969696"))
                }
            }

            Rectangle()
                .fill(Color(hexValue: "#3B3B3B"))
                .frame(height: 1)
                .padding(.vertical, 17)

            HStack(spacing: 10) {
                Text(verbatim: Self.developerEmail)
                    .font(.system(size: 13.5, weight: .semibold, design: .monospaced))
                    .foregroundColor(Color.white)

                Spacer(minLength: 6)

                Button {
                    copyDeveloperEmail()
                } label: {
                    Image(systemName: didCopyEmail ? "checkmark" : "doc.on.doc")
                        .font(.system(size: 11.5, weight: .semibold))
                        .frame(width: 30, height: 30)
                }
                .buttonStyle(ActivationIconButtonStyle())
                .help(didCopyEmail ? viewModel.emailCopiedTitle : viewModel.copyEmailTitle)
                .accessibilityLabel(didCopyEmail ? viewModel.emailCopiedTitle : viewModel.copyEmailTitle)
                .accessibilityIdentifier("keyfloat.activation.email-copy")
            }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 14)
                .padding(.trailing, 7)
                .frame(height: 44)
                .background(Color(hexValue: "#111111"), in: RoundedRectangle(cornerRadius: 8))
                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color(hexValue: "#3F3F3F")))
        }
        .padding(20)
        .frame(width: 340)
        .background(Color(hexValue: "#1C1C1C"), in: RoundedRectangle(cornerRadius: 14))
        .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color(hexValue: "#4C4C4C")))
        .contentShape(RoundedRectangle(cornerRadius: 14))
        .onTapGesture { }
        .accessibilityElement(children: .contain)
        .onDisappear { copyFeedbackTask?.cancel() }
    }

    private func copyDeveloperEmail() {
        let pasteboard = NSPasteboard.general
        pasteboard.clearContents()
        guard pasteboard.setString(Self.developerEmail, forType: .string) else { return }

        didCopyEmail = true
        copyFeedbackTask?.cancel()
        copyFeedbackTask = Task { @MainActor in
            try? await Task.sleep(nanoseconds: 1_400_000_000)
            guard !Task.isCancelled else { return }
            didCopyEmail = false
        }
    }
}

private struct ActivationView: View {
    @ObservedObject var viewModel: ActivationViewModel
    @FocusState private var codeFieldFocused: Bool

    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                HStack(spacing: 7) {
                Image("KeyFloatWhiteLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 30, height: 30)
                    .accessibilityHidden(true)
                Text("KeyFloat")
                    .font(.system(size: 15, weight: .semibold))
                Spacer()
                Button(viewModel.languageTitle) {
                    viewModel.toggleLanguage()
                }
                .buttonStyle(ActivationTextButtonStyle())
                .accessibilityLabel(viewModel.isChinese ? "Switch to English" : "切换为中文")
                Button {
                    NSApp.terminate(nil)
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 11, weight: .semibold))
                        .frame(width: 30, height: 30)
                }
                .buttonStyle(ActivationIconButtonStyle())
                .accessibilityLabel(viewModel.closeLabel)
                }

                VStack(alignment: .leading, spacing: 0) {
                Text(viewModel.title)
                    .font(.system(size: 32, weight: .bold))
                    .tracking(-1.1)
                Text(viewModel.subtitle)
                    .font(.system(size: 14))
                    .foregroundStyle(Color(hexValue: "#AFAFAF"))
                    .padding(.top, 10)
                    .fixedSize(horizontal: false, vertical: true)

                TextField(viewModel.placeholder, text: $viewModel.code)
                    .textFieldStyle(.plain)
                    .font(.system(size: 13, design: .monospaced))
                    .padding(.horizontal, 12)
                    .frame(height: 46)
                    .background(Color(hexValue: "#0F0F0F"), in: RoundedRectangle(cornerRadius: 8))
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color(hexValue: "#494949")))
                    .focused($codeFieldFocused)
                    .onSubmit { viewModel.activate() }
                    .accessibilityIdentifier("keyfloat.activation.code")
                    .padding(.top, 28)

                Text(viewModel.helper)
                    .font(.system(size: 11.5))
                    .foregroundStyle(Color(hexValue: "#818181"))
                    .padding(.top, 10)
                    .fixedSize(horizontal: false, vertical: true)

                if !viewModel.errorMessage.isEmpty {
                    Text(viewModel.errorMessage)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(Color(hexValue: "#D6D6D6"))
                        .padding(.top, 12)
                        .fixedSize(horizontal: false, vertical: true)
                        .accessibilityIdentifier("keyfloat.activation.message")
                }

                Spacer()
                    .frame(height: 74)

                Button(viewModel.activateTitle) {
                    viewModel.activate()
                }
                .buttonStyle(ActivationPrimaryButtonStyle())
                .disabled(viewModel.isActivating)
                .accessibilityIdentifier("keyfloat.activation.submit")

                Button(viewModel.contactTitle) {
                    viewModel.isContactPresented = true
                }
                .buttonStyle(ActivationInlineLinkButtonStyle())
                .padding(.top, 10)
                .accessibilityIdentifier("keyfloat.activation.contact")
                }
                .frame(maxHeight: .infinity)
                .padding(.top, 36)
            }
            .padding(.horizontal, 22)
            .padding(.top, 16)
            .padding(.bottom, 20)

            if viewModel.isContactPresented {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color(hexValue: "#101010"))
                    .contentShape(Rectangle())
                    .onTapGesture { viewModel.isContactPresented = false }

                ActivationContactModalView(viewModel: viewModel)
            }
        }
        .frame(width: 460, height: 468)
        .foregroundStyle(Color.white)
        .background(Color(hexValue: "#171717"), in: RoundedRectangle(cornerRadius: 16))
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(hexValue: "#454545")))
        .onAppear { codeFieldFocused = true }
    }
}

@MainActor
final class ActivationWindowController: NSWindowController {
    private let viewModel: ActivationViewModel

    init(licenseStore: LicenseStore, onActivated: @escaping () -> Void) {
        viewModel = ActivationViewModel(licenseStore: licenseStore, onActivated: onActivated)
        let panel = ActivationPanel(
            contentRect: NSRect(x: 0, y: 0, width: 460, height: 468),
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        panel.title = "Activate KeyFloat"
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.hasShadow = true
        panel.hidesOnDeactivate = false
        panel.isReleasedWhenClosed = false
        panel.level = .floating
        panel.collectionBehavior = [.moveToActiveSpace, .fullScreenAuxiliary]
        panel.isMovableByWindowBackground = true
        panel.contentView = NSHostingView(rootView: ActivationView(viewModel: viewModel))
        panel.center()
        super.init(window: panel)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func showWindow(_ sender: Any?) {
        super.showWindow(sender)
        window?.center()
        NSApp.activate(ignoringOtherApps: true)
        window?.makeKeyAndOrderFront(nil)
        window?.orderFrontRegardless()
    }
}

private struct ActivationPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 13.5, weight: .semibold))
            .foregroundStyle(Color.black)
            .frame(maxWidth: .infinity)
            .frame(height: 46)
            .background(configuration.isPressed ? Color(hexValue: "#D8D8D8") : Color.white, in: RoundedRectangle(cornerRadius: 8))
    }
}

private struct ActivationInlineLinkButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 14))
            .foregroundStyle(configuration.isPressed ? Color.white : Color(hexValue: "#AFAFAF"))
            .frame(height: 28)
            .contentShape(Rectangle())
    }
}

private struct ActivationTextButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 11.5, weight: .medium))
            .foregroundStyle(configuration.isPressed ? Color.white : Color(hexValue: "#A9A9A9"))
            .padding(.horizontal, 5)
            .frame(height: 30)
            .contentShape(Rectangle())
    }
}

private struct ActivationIconButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundStyle(configuration.isPressed ? Color.white : Color(hexValue: "#B5B5B5"))
            .background(configuration.isPressed ? Color(hexValue: "#303030") : Color(hexValue: "#242424"), in: RoundedRectangle(cornerRadius: 8))
            .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color(hexValue: "#3C3C3C")))
    }
}

private extension Color {
    init(hexValue: String) {
        let value = UInt64(hexValue.dropFirst(), radix: 16) ?? 0
        self.init(
            red: Double((value >> 16) & 0xFF) / 255,
            green: Double((value >> 8) & 0xFF) / 255,
            blue: Double(value & 0xFF) / 255
        )
    }
}
