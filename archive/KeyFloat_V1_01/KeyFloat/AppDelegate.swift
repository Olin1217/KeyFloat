import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var floatingWindowController: FloatingWindowController?

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)

        let controller = FloatingWindowController()
        floatingWindowController = controller
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
        if !flag {
            floatingWindowController?.showWindow(nil)
            floatingWindowController?.window?.orderFrontRegardless()
        }
        return true
    }
}
