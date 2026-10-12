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

private struct ResizeEdges: OptionSet {
    let rawValue: Int

    static let left = ResizeEdges(rawValue: 1 << 0)
    static let right = ResizeEdges(rawValue: 1 << 1)
    static let top = ResizeEdges(rawValue: 1 << 2)
    static let bottom = ResizeEdges(rawValue: 1 << 3)
}

private final class ResizeHandleView: NSView {
    let edges: ResizeEdges
    var onResizeBegan: (() -> Void)?
    var onResizeEnded: ((NSSize) -> Void)?

    private var initialFrame = NSRect.zero
    private var initialMouseLocation = NSPoint.zero

    init(edges: ResizeEdges) {
        self.edges = edges
        super.init(frame: .zero)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override var acceptsFirstResponder: Bool { false }

    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }

    override func resetCursorRects() {
        let hasHorizontalEdge = edges.contains(.left) || edges.contains(.right)
        let cursor: NSCursor = hasHorizontalEdge ? .resizeLeftRight : .resizeUpDown
        addCursorRect(bounds, cursor: cursor)
    }

    override func mouseDown(with event: NSEvent) {
        guard let window else { return }
        initialFrame = window.frame
        initialMouseLocation = window.convertPoint(toScreen: event.locationInWindow)
        onResizeBegan?()
    }

    override func mouseDragged(with event: NSEvent) {
        guard let window else { return }
        let mouseLocation = window.convertPoint(toScreen: event.locationInWindow)
        let deltaX = mouseLocation.x - initialMouseLocation.x
        let deltaY = mouseLocation.y - initialMouseLocation.y
        let visible = (window.screen ?? NSScreen.main)?.visibleFrame

        var frame = initialFrame
        if edges.contains(.left) {
            let screenMaximum = initialFrame.maxX - (visible?.minX ?? -.greatestFiniteMagnitude)
            let width = Self.clamped(
                initialFrame.width - deltaX,
                minimum: window.minSize.width,
                maximum: min(window.maxSize.width, screenMaximum)
            )
            frame.origin.x = initialFrame.maxX - width
            frame.size.width = width
        } else if edges.contains(.right) {
            let screenMaximum = (visible?.maxX ?? .greatestFiniteMagnitude) - initialFrame.minX
            frame.size.width = Self.clamped(
                initialFrame.width + deltaX,
                minimum: window.minSize.width,
                maximum: min(window.maxSize.width, screenMaximum)
            )
        }

        if edges.contains(.bottom) {
            let screenMaximum = initialFrame.maxY - (visible?.minY ?? -.greatestFiniteMagnitude)
            let height = Self.clamped(
                initialFrame.height - deltaY,
                minimum: window.minSize.height,
                maximum: min(window.maxSize.height, screenMaximum)
            )
            frame.origin.y = initialFrame.maxY - height
            frame.size.height = height
        } else if edges.contains(.top) {
            let screenMaximum = (visible?.maxY ?? .greatestFiniteMagnitude) - initialFrame.minY
            frame.size.height = Self.clamped(
                initialFrame.height + deltaY,
                minimum: window.minSize.height,
                maximum: min(window.maxSize.height, screenMaximum)
            )
        }

        window.setFrame(frame, display: true)
    }

    override func mouseUp(with event: NSEvent) {
        guard let window else { return }
        onResizeEnded?(window.frame.size)
    }

    private static func clamped(_ value: CGFloat, minimum: CGFloat, maximum: CGFloat) -> CGFloat {
        min(max(value, minimum), max(minimum, maximum))
    }
}

@MainActor
final class FloatingWindowController: NSWindowController, NSWindowDelegate {
    private enum Metrics {
        static let collapsed = NSSize(width: 230, height: 62)
        static let expandedDefault = NSSize(width: 432, height: 716)
        static let expandedMinimum = NSSize(width: 360, height: 520)
        static let expandedMaximum = NSSize(width: 640, height: 900)
        static let searchHorizontalInset: CGFloat = 13
        static let searchTopOffset: CGFloat = 108
        static let searchHeight: CGFloat = 36
        static let edgeInset: CGFloat = 22
        static let defaultTopInset: CGFloat = 110
    }

    private let store: ShortcutStore
    private let commands: WindowCommands
    private var collapsedDragZones: [DragHandleView] = []
    private var expandedDragZones: [DragHandleView] = []
    private var resizeHandles: [ResizeHandleView] = []
    private var expandedDragZoneConstraints: [NSLayoutConstraint] = []
    private var escapeEventMonitor: Any?
    private var mouseDownEventMonitor: Any?
    private var isResizingWindow = false
    private var isExpanded = false
    private var expandedSize: NSSize

    private enum WindowPreferenceKey {
        static let legacyFrame = "KeyFloatWindowFrame"
        static let topRight = "KeyFloatWindowTopRight"
        static let displayID = "KeyFloatWindowDisplayID"
        static let expandedSize = "KeyFloatExpandedWindowSize"
    }

    init() {
        let store = ShortcutStore()
        let commands = WindowCommands()
        self.store = store
        self.commands = commands
        self.expandedSize = Self.savedExpandedSize()

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

        var expandedZoneConstraints: [NSLayoutConstraint] = []
        func makeExpandedDragZone(
            leading: CGFloat? = nil,
            trailing: CGFloat? = nil,
            top: CGFloat,
            width: CGFloat? = nil,
            height: CGFloat
        ) -> DragHandleView {
            let dragZone = DragHandleView()
            dragZone.allowsDragging = !store.isPinned
            dragZone.isHidden = true
            dragZone.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(dragZone, positioned: .above, relativeTo: hostingView)
            var constraints = [
                dragZone.topAnchor.constraint(equalTo: container.topAnchor, constant: top),
                dragZone.heightAnchor.constraint(equalToConstant: height),
            ]
            if let leading {
                constraints.append(
                    dragZone.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: leading)
                )
            }
            if let trailing {
                let trailingConstraint = dragZone.trailingAnchor.constraint(
                    equalTo: container.trailingAnchor,
                    constant: -trailing
                )
                constraints.append(trailingConstraint)
            }
            if let width {
                constraints.append(dragZone.widthAnchor.constraint(equalToConstant: width))
            }
            expandedZoneConstraints.append(contentsOf: constraints)
            return dragZone
        }

        // Header geometry scales with the window width:
        // - Software selector remains at x 31...176, y 14...48.
        // - Five controls remain aligned to the trailing 172 pt.
        // Every other point remains draggable at every supported width.
        let expandedZones = [
            makeExpandedDragZone(leading: 0, trailing: 0, top: 0, height: 14),
            makeExpandedDragZone(leading: 0, trailing: 0, top: 48, height: 14),
            makeExpandedDragZone(leading: 0, top: 14, width: 31, height: 34),
            makeExpandedDragZone(leading: 176, trailing: 172, top: 14, height: 34),
            makeExpandedDragZone(trailing: 0, top: 14, width: 172, height: 2),
            makeExpandedDragZone(trailing: 0, top: 46, width: 172, height: 2),
            makeExpandedDragZone(trailing: 139, top: 16, width: 3, height: 30),
            makeExpandedDragZone(trailing: 106, top: 16, width: 3, height: 30),
            makeExpandedDragZone(trailing: 73, top: 16, width: 3, height: 30),
            makeExpandedDragZone(trailing: 40, top: 16, width: 3, height: 30),
            makeExpandedDragZone(trailing: 0, top: 16, width: 10, height: 30),
        ]

        func makeResizeHandle(_ edges: ResizeEdges) -> ResizeHandleView {
            let handle = ResizeHandleView(edges: edges)
            handle.isHidden = true
            handle.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(handle)
            return handle
        }

        let topResizeHandle = makeResizeHandle(.top)
        let bottomResizeHandle = makeResizeHandle(.bottom)
        let leftResizeHandle = makeResizeHandle(.left)
        let rightResizeHandle = makeResizeHandle(.right)
        let topLeftResizeHandle = makeResizeHandle([.top, .left])
        let topRightResizeHandle = makeResizeHandle([.top, .right])
        let bottomLeftResizeHandle = makeResizeHandle([.bottom, .left])
        let bottomRightResizeHandle = makeResizeHandle([.bottom, .right])
        let resizeHandles = [
            topResizeHandle, bottomResizeHandle, leftResizeHandle, rightResizeHandle,
            topLeftResizeHandle, topRightResizeHandle, bottomLeftResizeHandle, bottomRightResizeHandle,
        ]
        expandedZoneConstraints.append(contentsOf: [
            topResizeHandle.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 12),
            topResizeHandle.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -12),
            topResizeHandle.topAnchor.constraint(equalTo: container.topAnchor),
            topResizeHandle.heightAnchor.constraint(equalToConstant: 6),

            bottomResizeHandle.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 12),
            bottomResizeHandle.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -12),
            bottomResizeHandle.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            bottomResizeHandle.heightAnchor.constraint(equalToConstant: 6),

            leftResizeHandle.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            leftResizeHandle.topAnchor.constraint(equalTo: container.topAnchor, constant: 12),
            leftResizeHandle.bottomAnchor.constraint(equalTo: container.bottomAnchor, constant: -12),
            leftResizeHandle.widthAnchor.constraint(equalToConstant: 6),

            rightResizeHandle.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            rightResizeHandle.topAnchor.constraint(equalTo: container.topAnchor, constant: 12),
            rightResizeHandle.bottomAnchor.constraint(equalTo: container.bottomAnchor, constant: -12),
            rightResizeHandle.widthAnchor.constraint(equalToConstant: 6),

            topLeftResizeHandle.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            topLeftResizeHandle.topAnchor.constraint(equalTo: container.topAnchor),
            topLeftResizeHandle.widthAnchor.constraint(equalToConstant: 12),
            topLeftResizeHandle.heightAnchor.constraint(equalToConstant: 12),

            topRightResizeHandle.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            topRightResizeHandle.topAnchor.constraint(equalTo: container.topAnchor),
            topRightResizeHandle.widthAnchor.constraint(equalToConstant: 12),
            topRightResizeHandle.heightAnchor.constraint(equalToConstant: 12),

            bottomLeftResizeHandle.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            bottomLeftResizeHandle.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            bottomLeftResizeHandle.widthAnchor.constraint(equalToConstant: 12),
            bottomLeftResizeHandle.heightAnchor.constraint(equalToConstant: 12),

            bottomRightResizeHandle.trailingAnchor.constraint(equalTo: container.trailingAnchor),
            bottomRightResizeHandle.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            bottomRightResizeHandle.widthAnchor.constraint(equalToConstant: 12),
            bottomRightResizeHandle.heightAnchor.constraint(equalToConstant: 12),
        ])
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
        self.resizeHandles = resizeHandles
        self.expandedDragZoneConstraints = expandedZoneConstraints
        resizeHandles.forEach { handle in
            handle.onResizeBegan = { [weak self] in
                self?.isResizingWindow = true
            }
            handle.onResizeEnded = { [weak self] size in
                guard let self else { return }
                self.recordExpandedSize(size)
                self.isResizingWindow = false
                self.saveWindowPosition()
            }
        }
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
            guard let self, let panel, event.window === panel else { return event }
            guard !self.searchFieldFrame(in: panel).contains(event.locationInWindow) else { return event }
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
        if !expanded, isExpanded {
            recordExpandedSize(window.frame.size)
        }
        isExpanded = expanded
        let limits = expandedSizeLimits(for: window)
        let targetSize = expanded
            ? Self.clamped(expandedSize, minimum: limits.minimum, maximum: limits.maximum)
            : Metrics.collapsed
        collapsedDragZones.forEach { $0.isHidden = expanded }
        expandedDragZones.forEach { $0.isHidden = true }
        resizeHandles.forEach { $0.isHidden = true }
        if !expanded {
            NSLayoutConstraint.deactivate(expandedDragZoneConstraints)
        }
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
                guard let self, let window else {
                    completion()
                    return
                }
                if expanded {
                    self.applyExpandedSizeLimits(to: window)
                    self.recordExpandedSize(window.frame.size)
                    NSLayoutConstraint.activate(self.expandedDragZoneConstraints)
                    self.expandedDragZones.forEach { $0.isHidden = false }
                    self.resizeHandles.forEach { $0.isHidden = false }
                } else {
                    self.applyFixedSize(Metrics.collapsed, to: window)
                }
                self.isResizingWindow = false
                self.saveWindowPosition()
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

    private func expandedSizeLimits(
        for window: NSWindow
    ) -> (minimum: NSSize, maximum: NSSize) {
        let visibleSize = (window.screen ?? NSScreen.main)?.visibleFrame.size
            ?? Metrics.expandedMaximum
        let maximum = NSSize(
            width: min(Metrics.expandedMaximum.width, visibleSize.width),
            height: min(Metrics.expandedMaximum.height, visibleSize.height)
        )
        let minimum = NSSize(
            width: min(Metrics.expandedMinimum.width, maximum.width),
            height: min(Metrics.expandedMinimum.height, maximum.height)
        )
        return (minimum, maximum)
    }

    private func applyExpandedSizeLimits(to window: NSWindow) {
        let limits = expandedSizeLimits(for: window)
        window.minSize = limits.minimum
        window.maxSize = limits.maximum
        window.contentMinSize = limits.minimum
        window.contentMaxSize = limits.maximum
    }

    private func applyFixedSize(_ size: NSSize, to window: NSWindow) {
        window.minSize = size
        window.maxSize = size
        window.contentMinSize = size
        window.contentMaxSize = size
    }

    private func recordExpandedSize(_ size: NSSize) {
        expandedSize = Self.clamped(
            size,
            minimum: Metrics.expandedMinimum,
            maximum: Metrics.expandedMaximum
        )
        UserDefaults.standard.set(
            NSStringFromSize(expandedSize),
            forKey: WindowPreferenceKey.expandedSize
        )
    }

    private func searchFieldFrame(in window: NSWindow) -> NSRect {
        NSRect(
            x: Metrics.searchHorizontalInset,
            y: window.frame.height - Metrics.searchTopOffset,
            width: max(0, window.frame.width - Metrics.searchHorizontalInset * 2),
            height: Metrics.searchHeight
        )
    }

    func selectSoftware(matchingBundleIdentifier bundleIdentifier: String) {
        store.selectSoftware(matchingBundleIdentifier: bundleIdentifier)
    }

    func windowDidMove(_ notification: Notification) {
        guard !isResizingWindow else { return }
        saveWindowPosition()
    }

    func windowDidResize(_ notification: Notification) {
        guard isExpanded, !isResizingWindow, let window else { return }
        expandedSize = Self.clamped(
            window.frame.size,
            minimum: Metrics.expandedMinimum,
            maximum: Metrics.expandedMaximum
        )
    }

    func windowDidEndLiveResize(_ notification: Notification) {
        guard isExpanded, !isResizingWindow, let window else { return }
        recordExpandedSize(window.frame.size)
        saveWindowPosition()
    }

    func windowDidChangeScreen(_ notification: Notification) {
        guard !isResizingWindow else { return }
        if isExpanded, let window {
            applyExpandedSizeLimits(to: window)
            constrainWindowToVisibleScreen()
        }
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

    private static func savedExpandedSize() -> NSSize {
        guard let value = UserDefaults.standard.string(forKey: WindowPreferenceKey.expandedSize) else {
            return Metrics.expandedDefault
        }
        let size = NSSizeFromString(value)
        guard size.width.isFinite, size.height.isFinite, size.width > 0, size.height > 0 else {
            return Metrics.expandedDefault
        }
        return clamped(
            size,
            minimum: Metrics.expandedMinimum,
            maximum: Metrics.expandedMaximum
        )
    }

    private static func clamped(
        _ size: NSSize,
        minimum: NSSize,
        maximum: NSSize
    ) -> NSSize {
        NSSize(
            width: min(max(size.width, minimum.width), maximum.width),
            height: min(max(size.height, minimum.height), maximum.height)
        )
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

        var proposed = window.frame
        if isExpanded {
            let limits = expandedSizeLimits(for: window)
            let topRight = NSPoint(x: proposed.maxX, y: proposed.maxY)
            proposed.size = Self.clamped(
                proposed.size,
                minimum: limits.minimum,
                maximum: limits.maximum
            )
            proposed.origin = NSPoint(
                x: topRight.x - proposed.width,
                y: topRight.y - proposed.height
            )
        }
        let corrected = Self.constrained(proposed, to: visible)
        if corrected != window.frame {
            window.setFrame(corrected, display: true)
            if isExpanded {
                recordExpandedSize(corrected.size)
            }
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
