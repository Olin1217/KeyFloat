import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var floatingWindowController: FloatingWindowController?
    private var statusItem: NSStatusItem?

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        applyApplicationIcon()

        let controller = FloatingWindowController()
        floatingWindowController = controller
        installStatusItem()
        controller.showWindow(nil)
        controller.window?.orderFrontRegardless()
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
            button.toolTip = "KeyFloat"
            button.target = self
            button.action = #selector(toggleFloatingWindow(_:))
            button.sendAction(on: [.leftMouseUp])
            button.setAccessibilityLabel("KeyFloat")
        }
        statusItem = item
    }

    @objc private func toggleFloatingWindow(_ sender: Any?) {
        guard let controller = floatingWindowController,
              let window = controller.window else { return }
        if window.isVisible {
            window.orderOut(nil)
        } else {
            showFloatingWindow()
        }
    }

    private func showFloatingWindow() {
        guard let controller = floatingWindowController,
              let window = controller.window else { return }
        NSApp.activate(ignoringOtherApps: true)
        controller.showWindow(nil)
        window.makeKeyAndOrderFront(nil)
        window.orderFrontRegardless()
    }
}
