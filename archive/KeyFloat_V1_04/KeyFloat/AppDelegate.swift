import AppKit

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate {
    private let licenseStore = LicenseStore()
    private var floatingWindowController: FloatingWindowController?
    private var activationWindowController: ActivationWindowController?
    private var statusItem: NSStatusItem?

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        applyApplicationIcon()

        installStatusItem()
        NSWorkspace.shared.notificationCenter.addObserver(
            self,
            selector: #selector(workspaceApplicationDidActivate(_:)),
            name: NSWorkspace.didActivateApplicationNotification,
            object: nil
        )
        if licenseStore.isActivated {
            showFloatingWindow()
        } else {
            showActivationWindow()
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        NSWorkspace.shared.notificationCenter.removeObserver(self)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }

    func applicationShouldHandleReopen(
        _ sender: NSApplication,
        hasVisibleWindows flag: Bool
    ) -> Bool {
        showFloatingWindow()
        return true
    }

    private func applyApplicationIcon() {
        if let iconURL = Bundle.main.url(forResource: "AppIcon", withExtension: "icns"),
           let icon = NSImage(contentsOf: iconURL) {
            NSApp.applicationIconImage = icon
            NSApp.dockTile.display()
            return
        }
        if let logo = NSImage(named: "KeyFloatLogo") {
            NSApp.applicationIconImage = logo
            NSApp.dockTile.display()
        }
    }

    private func installStatusItem() {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        if let button = item.button {
            let sourceImage = NSImage(named: "KeyFloatWhiteLogo")
                ?? NSImage(systemSymbolName: "keyboard", accessibilityDescription: "KeyFloat")
            let image = sourceImage?.copy() as? NSImage
            image?.isTemplate = true
            image?.size = NSSize(width: 22, height: 22)
            button.image = image
            button.imageScaling = .scaleProportionallyDown
            button.imagePosition = .imageOnly
            button.toolTip = licenseStore.isActivated ? "KeyFloat" : "KeyFloat — Activation required"
            button.target = self
            button.action = #selector(toggleFloatingWindow(_:))
            button.sendAction(on: [.leftMouseUp])
            button.setAccessibilityLabel("KeyFloat")
        }
        statusItem = item
    }

    @objc private func toggleFloatingWindow(_ sender: Any?) {
        guard licenseStore.isActivated else {
            showActivationWindow()
            return
        }
        guard let controller = floatingWindowController,
              let window = controller.window else { return }
        if window.isVisible {
            window.orderOut(nil)
        } else {
            showFloatingWindow()
        }
    }

    private func showFloatingWindow() {
        guard licenseStore.isActivated else {
            showActivationWindow()
            return
        }
        let controller: FloatingWindowController
        if let existing = floatingWindowController {
            controller = existing
        } else {
            controller = FloatingWindowController()
            floatingWindowController = controller
        }
        guard let window = controller.window else { return }
        NSApp.activate(ignoringOtherApps: true)
        controller.showWindow(nil)
        window.makeKeyAndOrderFront(nil)
        window.orderFrontRegardless()
    }

    private func showActivationWindow() {
        floatingWindowController?.window?.orderOut(nil)
        let controller: ActivationWindowController
        if let existing = activationWindowController {
            controller = existing
        } else {
            controller = ActivationWindowController(licenseStore: licenseStore) { [weak self] in
                self?.completeActivation()
            }
            activationWindowController = controller
        }
        controller.showWindow(nil)
    }

    private func completeActivation() {
        guard licenseStore.isActivated else { return }
        activationWindowController?.window?.orderOut(nil)
        activationWindowController = nil
        statusItem?.button?.toolTip = "KeyFloat"
        showFloatingWindow()
    }

    @MainActor
    @objc private func workspaceApplicationDidActivate(_ notification: Notification) {
        guard let application = notification.userInfo?[NSWorkspace.applicationUserInfoKey]
                as? NSRunningApplication,
              let bundleIdentifier = application.bundleIdentifier,
              bundleIdentifier != Bundle.main.bundleIdentifier,
              licenseStore.isActivated else { return }
        floatingWindowController?.selectSoftware(matchingBundleIdentifier: bundleIdentifier)
    }
}
