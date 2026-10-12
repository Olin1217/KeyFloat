import AppKit
import SwiftUI

private final class KeyFloatPanel: NSPanel {
    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }
}

private final class DragHandleView: NSView {
    var allowsDragging = true

    override var acceptsFirstResponder: Bool { false }

    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }

    override func hitTest(_ point: NSPoint) -> NSView? {
        allowsDragging ? super.hitTest(point) : nil
    }

    override func mouseDown(with event: NSEvent) {
        guard allowsDragging else { return }
        window?.performDrag(with: event)
    }
}

@MainActor
final class FloatingWindowController: NSWindowController, NSWindowDelegate {
    private enum Metrics {
        static let collapsed = NSSize(width: 230, height: 62)
        static let expanded = NSSize(width: 432, height: 716)
        static let searchField = NSRect(x: 13, y: 608, width: 406, height: 36)
        static let edgeInset: CGFloat = 22
        static let defaultTopInset: CGFloat = 110
    }

    private let store: ShortcutStore
    private let commands: WindowCommands
    private var collapsedDragZones: [DragHandleView] = []
    private var expandedDragZones: [DragHandleView] = []
    private var escapeEventMonitor: Any?
    private var mouseDownEventMonitor: Any?
    private var isResizingWindow = false

    private enum WindowPreferenceKey {
        static let legacyFrame = "KeyFloatWindowFrame"
        static let topRight = "KeyFloatWindowTopRight"
        static let displayID = "KeyFloatWindowDisplayID"
    }

    init() {
        let store = ShortcutStore()
        let commands = WindowCommands()
        self.store = store
        self.commands = commands

        let initialFrame = Self.initialFrame(size: Metrics.collapsed)
        let panel = KeyFloatPanel(
            contentRect: initialFrame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        panel.title = "KeyFloat"
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.hasShadow = false
        panel.hidesOnDeactivate = false
        panel.isReleasedWhenClosed = false
        panel.level = store.isPinned ? .floating : .normal
        panel.collectionBehavior = store.isPinned
            ? [.canJoinAllSpaces, .fullScreenAuxiliary]
            : [.managed]
        panel.animationBehavior = .utilityWindow
        panel.isMovable = !store.isPinned
        panel.isMovableByWindowBackground = false
        panel.minSize = Metrics.collapsed
        panel.maxSize = Metrics.collapsed
        panel.contentMinSize = Metrics.collapsed
        panel.contentMaxSize = Metrics.collapsed

        let rootView = KeyFloatView(store: store, commands: commands)
        let hostingView = NSHostingView(rootView: rootView)
        hostingView.sizingOptions = []
        hostingView.translatesAutoresizingMaskIntoConstraints = false
        hostingView.wantsLayer = true
        hostingView.layer?.backgroundColor = NSColor.clear.cgColor

        let container = NSView(frame: NSRect(origin: .zero, size: Metrics.collapsed))
        container.wantsLayer = true
        container.layer?.backgroundColor = NSColor.clear.cgColor
        container.layer?.masksToBounds = true
        panel.contentView = container
        container.addSubview(hostingView)
        NSLayoutConstraint.activate([
            hostingView.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            hostingView.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            hostingView.topAnchor.constraint(equalTo: container.topAnchor),
            hostingView.bottomAnchor.constraint(equalTo: container.bottomAnchor),
        ])

        // Each annotated region is a real native drag view. Using separate
        // rectangles keeps AppKit hit testing reliable and leaves every
        // control outside these frames fully interactive.
        let collapsedMainDragZone = DragHandleView()
        let collapsedZones = [collapsedMainDragZone]
        for dragZone in collapsedZones {
            dragZone.allowsDragging = !store.isPinned
            dragZone.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(dragZone, positioned: .above, relativeTo: hostingView)
        }

        func makeExpandedDragZone(
            x: CGFloat,
            y: CGFloat,
            width: CGFloat,
            height: CGFloat
        ) -> DragHandleView {
            let dragZone = DragHandleView()
            dragZone.allowsDragging = !store.isPinned
            dragZone.isHidden = true
            dragZone.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(dragZone, positioned: .above, relativeTo: hostingView)
            NSLayoutConstraint.activate([
                dragZone.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: x),
                dragZone.topAnchor.constraint(equalTo: container.topAnchor, constant: y),
                dragZone.widthAnchor.constraint(equalToConstant: width),
                dragZone.heightAnchor.constraint(equalToConstant: height),
            ])
            return dragZone
        }

        // Header geometry (432 × 62 pt):
        // - Software selector: x 31...176, y 14...48
        // - Five controls: 30 × 30 at x 260, 293, 326, 359 and 392
        // Every remaining point is covered by one of these drag rectangles.
        let expandedZones = [
            makeExpandedDragZone(x: 0, y: 0, width: 432, height: 14),
            makeExpandedDragZone(x: 0, y: 48, width: 432, height: 14),
            makeExpandedDragZone(x: 0, y: 14, width: 31, height: 34),
            makeExpandedDragZone(x: 176, y: 14, width: 84, height: 34),
            makeExpandedDragZone(x: 260, y: 14, width: 172, height: 2),
            makeExpandedDragZone(x: 260, y: 46, width: 172, height: 2),
            makeExpandedDragZone(x: 290, y: 16, width: 3, height: 30),
            makeExpandedDragZone(x: 323, y: 16, width: 3, height: 30),
            makeExpandedDragZone(x: 356, y: 16, width: 3, height: 30),
            makeExpandedDragZone(x: 389, y: 16, width: 3, height: 30),
            makeExpandedDragZone(x: 422, y: 16, width: 10, height: 30),
        ]
        NSLayoutConstraint.activate([
            collapsedMainDragZone.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            collapsedMainDragZone.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -73),
            collapsedMainDragZone.topAnchor.constraint(equalTo: container.topAnchor),
            collapsedMainDragZone.heightAnchor.constraint(equalToConstant: 62),
        ])

        super.init(window: panel)
        panel.delegate = self
        self.collapsedDragZones = collapsedZones
        self.expandedDragZones = expandedZones
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(screenParametersDidChange(_:)),
            name: NSApplication.didChangeScreenParametersNotification,
            object: nil
        )

        commands.setExpanded = { [weak self] expanded, completion in
            guard let self else {
                completion()
                return
            }
            self.setExpanded(expanded, completion: completion)
        }
        commands.setPinned = { [weak self] pinned in
            self?.setPinned(pinned)
        }
        commands.closeWindow = { [weak panel] in
            panel?.orderOut(nil)
        }

        escapeEventMonitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self, weak panel] event in
            guard event.window === panel, event.keyCode == 53 else { return event }
            Task { @MainActor [weak self] in
                self?.store.requestEscape()
            }
            return nil
        }

        mouseDownEventMonitor = NSEvent.addLocalMonitorForEvents(matching: .leftMouseDown) { [weak self, weak panel] event in
            guard event.window === panel else { return event }
            guard !Metrics.searchField.contains(event.locationInWindow) else { return event }
            Task { @MainActor [weak self] in
                self?.store.requestDismissSearch()
            }
            return event
        }
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        if let escapeEventMonitor { NSEvent.removeMonitor(escapeEventMonitor) }
        if let mouseDownEventMonitor { NSEvent.removeMonitor(mouseDownEventMonitor) }
    }

    private func setExpanded(_ expanded: Bool, completion: @escaping () -> Void) {
        guard let window else {
            completion()
            return
        }
        let targetSize = expanded ? Metrics.expanded : Metrics.collapsed
        collapsedDragZones.forEach { $0.isHidden = expanded }
        expandedDragZones.forEach { $0.isHidden = !expanded }
        let currentFrame = window.frame
        let visible = (window.screen ?? NSScreen.main)?.visibleFrame ?? currentFrame

        var targetFrame = NSRect(
            x: currentFrame.maxX - targetSize.width,
            y: currentFrame.maxY - targetSize.height,
            width: targetSize.width,
            height: targetSize.height
        )
        targetFrame = Self.constrained(targetFrame, to: visible)
        window.minSize = NSSize(width: 1, height: 1)
        window.maxSize = NSSize(width: 10_000, height: 10_000)
        window.contentMinSize = NSSize(width: 1, height: 1)
        window.contentMaxSize = NSSize(width: 10_000, height: 10_000)
        isResizingWindow = true
        NSAnimationContext.runAnimationGroup { context in
            context.duration = expanded ? 0.14 : 0.22
            context.allowsImplicitAnimation = true
            window.animator().setFrame(targetFrame, display: true)
        } completionHandler: { [weak self, weak window] in
            Task { @MainActor in
                guard let window else {
                    completion()
                    return
                }
                window.minSize = targetSize
                window.maxSize = targetSize
                window.contentMinSize = targetSize
                window.contentMaxSize = targetSize
                self?.isResizingWindow = false
                self?.saveWindowPosition()
                completion()
            }
        }
    }

    private func setPinned(_ pinned: Bool) {
        guard let window else { return }
        window.level = pinned ? .floating : .normal
        window.collectionBehavior = pinned
            ? [.canJoinAllSpaces, .fullScreenAuxiliary]
            : [.managed]
        window.isMovable = !pinned
        (collapsedDragZones + expandedDragZones).forEach {
            $0.allowsDragging = !pinned
        }
    }

    func windowDidMove(_ notification: Notification) {
        guard !isResizingWindow else { return }
        saveWindowPosition()
    }

    func windowDidChangeScreen(_ notification: Notification) {
        guard !isResizingWindow else { return }
        saveWindowPosition()
    }

    private func saveWindowPosition() {
        guard let window else { return }
        let topRight = NSPoint(x: window.frame.maxX, y: window.frame.maxY)
        UserDefaults.standard.set(
            NSStringFromPoint(topRight),
            forKey: WindowPreferenceKey.topRight
        )
        if let displayID = Self.displayID(for: window.screen) {
            UserDefaults.standard.set(displayID, forKey: WindowPreferenceKey.displayID)
        }
    }

    private static func initialFrame(size: NSSize) -> NSRect {
        let fallbackVisible = NSRect(x: 0, y: 0, width: 1440, height: 900)
        let screens = NSScreen.screens
        let fallbackScreen = NSScreen.main ?? screens.first
        let defaults = UserDefaults.standard

        let savedDisplayID = defaults.object(forKey: WindowPreferenceKey.displayID) as? NSNumber
        let preferredScreen = screens.first { displayID(for: $0) == savedDisplayID }

        let savedTopRight: NSPoint? = {
            if let pointValue = defaults.string(forKey: WindowPreferenceKey.topRight) {
                return NSPointFromString(pointValue)
            }
            if let legacyValue = defaults.string(forKey: WindowPreferenceKey.legacyFrame) {
                let legacyFrame = NSRectFromString(legacyValue)
                guard legacyFrame.width > 0, legacyFrame.height > 0 else { return nil }
                return NSPoint(x: legacyFrame.maxX, y: legacyFrame.maxY)
            }
            return nil
        }()

        if let savedTopRight {
            let containingScreen = screens.first { $0.visibleFrame.contains(savedTopRight) }
            let visible = (preferredScreen ?? containingScreen ?? fallbackScreen)?.visibleFrame ?? fallbackVisible
            let proposed = NSRect(
                x: savedTopRight.x - size.width,
                y: savedTopRight.y - size.height,
                width: size.width,
                height: size.height
            )
            return constrained(proposed, to: visible)
        }

        let visible = fallbackScreen?.visibleFrame ?? fallbackVisible
        return NSRect(
            x: visible.maxX - size.width - Metrics.edgeInset,
            y: visible.maxY - size.height - Metrics.defaultTopInset,
            width: size.width,
            height: size.height
        )
    }

    @objc private func screenParametersDidChange(_ notification: Notification) {
        constrainWindowToVisibleScreen()
    }

    private func constrainWindowToVisibleScreen() {
        guard let window else { return }
        let screens = NSScreen.screens
        let screen = window.screen
            ?? screens.max { lhs, rhs in
                lhs.visibleFrame.intersection(window.frame).area
                    < rhs.visibleFrame.intersection(window.frame).area
            }
            ?? NSScreen.main
        guard let visible = screen?.visibleFrame else { return }

        let corrected = Self.constrained(window.frame, to: visible)
        if corrected.origin != window.frame.origin {
            window.setFrame(corrected, display: true)
        }
        saveWindowPosition()
    }

    private static func constrained(_ frame: NSRect, to visible: NSRect) -> NSRect {
        var result = frame
        let maximumX = max(visible.minX, visible.maxX - frame.width)
        let maximumY = max(visible.minY, visible.maxY - frame.height)
        result.origin.x = min(max(frame.origin.x, visible.minX), maximumX)
        result.origin.y = min(max(frame.origin.y, visible.minY), maximumY)
        return result
    }

    private static func displayID(for screen: NSScreen?) -> NSNumber? {
        screen?.deviceDescription[NSDeviceDescriptionKey("NSScreenNumber")] as? NSNumber
    }
}

private extension NSRect {
    var area: CGFloat {
        guard !isNull, !isEmpty else { return 0 }
        return width * height
    }
}
