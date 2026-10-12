import AppKit
import SwiftUI

private let shellCornerRadius: CGFloat = 15

private enum Palette {
    static let panel = Color.adaptive(light: "#FBFBFB", dark: "#141414")
    static let chrome = Color.adaptive(light: "#FFFFFF", dark: "#1B1B1B")
    static let content = Color.adaptive(light: "#F8F8F8", dark: "#0F0F0F")
    static let surface = Color.adaptive(light: "#F3F3F3", dark: "#1E1E1E")
    static let surfaceRaised = Color.adaptive(light: "#EDEDED", dark: "#282828")
    static let surfaceSelected = Color.adaptive(light: "#E4E4E4", dark: "#363636")
    static let border = Color.adaptive(light: "#DADADA", dark: "#414141")
    static let textPrimary = Color.adaptive(light: "#1A1A1A", dark: "#F4F4F4")
    static let textSecondary = Color.adaptive(light: "#585858", dark: "#AEAEAE")
    static let textMuted = Color.adaptive(light: "#818181", dark: "#7C7C7C")
    static let accent = Color.adaptive(light: "#4A4A4A", dark: "#D0D0D0")
}

final class WindowCommands {
    var setExpanded: ((Bool, @escaping () -> Void) -> Void)?
    var setPinned: ((Bool) -> Void)?
    var closeWindow: (() -> Void)?
}

private enum SubmissionToastKind {
    case softwareRequest
    case feedback
}

struct KeyFloatView: View {
    @ObservedObject var store: ShortcutStore
    let commands: WindowCommands

    @State private var showsSoftwarePicker = false
    @State private var softwarePickerChevronExpanded = false
    @State private var collapsedContentOpacity = 1.0
    @State private var isWindowTransitioning = false
    @State private var transitionTargetExpanded: Bool?
    @State private var pendingExpandedState: Bool?
    @State private var pendingSearchFocus = false
    @State private var showsSoftwareRequest = false
    @State private var softwareRequestGroup: SoftwareGroup?
    @State private var requestedSoftwareName = ""
    @State private var requestContact = ""
    @State private var showsFeedbackDialog = false
    @State private var feedbackMessage = ""
    @State private var feedbackContact = ""
    @State private var showsSubmissionToast = false
    @State private var submissionToastKind = SubmissionToastKind.softwareRequest
    @State private var toastDismissTask: Task<Void, Never>?
    @FocusState private var searchIsFocused: Bool
    @FocusState private var requestNameIsFocused: Bool
    @FocusState private var feedbackMessageIsFocused: Bool

    private var accent: Color {
        Palette.accent
    }

    private var selectedColorScheme: ColorScheme {
        store.theme == .light ? .light : .dark
    }

    private var expansionToggleShowsCollapse: Bool {
        transitionTargetExpanded ?? store.isExpanded
    }

    private var expansionToggleIcon: String {
        expansionToggleShowsCollapse ? "chevron.up" : "chevron.down"
    }

    private var expansionToggleAccessibilityLabel: String {
        if expansionToggleShowsCollapse {
            return store.language == .zh ? "收起快捷键面板" : "Collapse shortcut panel"
        }
        return store.language == .zh ? "展开快捷键面板" : "Expand shortcut panel"
    }

    private var submissionToastText: String {
        switch (submissionToastKind, store.language) {
        case (.softwareRequest, .zh): return "提交成功"
        case (.softwareRequest, .en): return "Submitted successfully"
        case (.feedback, .zh): return "反馈已提交，感谢你的帮助"
        case (.feedback, .en): return "Feedback sent — thank you"
        }
    }

    private var submissionToastAccessibilityIdentifier: String {
        switch submissionToastKind {
        case .softwareRequest: return "keyfloat.software-request.toast"
        case .feedback: return "keyfloat.feedback.toast"
        }
    }

    var body: some View {
        Group {
            if store.isExpanded {
                expandedView
            } else {
                collapsedView
            }
        }
        .preferredColorScheme(selectedColorScheme)
        .environment(\.colorScheme, selectedColorScheme)
        .foregroundStyle(Palette.textPrimary)
        .onChange(of: store.escapeRequestID) { _ in
            handleEscape()
        }
        .onChange(of: store.dismissSearchRequestID) { _ in
            searchIsFocused = false
        }
        .sheet(isPresented: $showsSoftwareRequest) {
            softwareRequestDialog
                .preferredColorScheme(selectedColorScheme)
                .environment(\.colorScheme, selectedColorScheme)
        }
        .sheet(isPresented: $showsFeedbackDialog) {
            feedbackDialog
                .preferredColorScheme(selectedColorScheme)
                .environment(\.colorScheme, selectedColorScheme)
        }
        .overlay(alignment: .bottom) {
            if showsSubmissionToast {
                HStack(spacing: 6) {
                    Image(systemName: "checkmark")
                        .font(.system(size: 10, weight: .bold))
                    Text(submissionToastText)
                        .font(.system(size: 10.5, weight: .semibold))
                }
                .foregroundStyle(Palette.textPrimary)
                .padding(.horizontal, 12)
                .frame(height: 32)
                .background(Palette.surfaceRaised, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.border))
                .padding(.bottom, store.isExpanded ? 47 : 10)
                .transition(.move(edge: .bottom))
                .accessibilityLabel(submissionToastText)
                .accessibilityIdentifier(submissionToastAccessibilityIdentifier)
            }
        }
        .onDisappear {
            toastDismissTask?.cancel()
        }
        .overlay(alignment: .topLeading) {
            Group {
                Button {
                    focusSearch()
                } label: {
                    EmptyView()
                }
                .keyboardShortcut("k", modifiers: .command)

                Button {
                    focusSearch()
                } label: {
                    EmptyView()
                }
                .keyboardShortcut("f", modifiers: .command)
            }
            .buttonStyle(.plain)
            .frame(width: 0, height: 0)
            .opacity(0)
            .accessibilityHidden(true)
        }
    }

    private var collapsedView: some View {
        HStack(spacing: 7) {
            DragDots()
                .frame(width: 7)

            HStack(spacing: 7) {
                AppLogo(software: store.selectedSoftware, size: 34)

                VStack(alignment: .leading, spacing: 3) {
                    Text(store.selectedSoftware?.name ?? "KeyFloat")
                        .font(.system(size: 13.5, weight: .semibold))
                        .foregroundStyle(Palette.textPrimary)
                        .lineLimit(1)
                    Text(store.language == .zh ? "快捷键助手" : "Shortcut companion")
                        .font(.system(size: 10.5))
                        .foregroundStyle(Palette.textSecondary)
                        .lineLimit(1)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)

            HStack(spacing: 3) {
                IconButton(
                    systemName: expansionToggleIcon,
                    color: Palette.textSecondary,
                    accessibilityLabel: expansionToggleAccessibilityLabel
                ) {
                    toggleExpansion()
                }

                IconButton(
                    systemName: "xmark",
                    color: Palette.textSecondary,
                    accessibilityLabel: store.language == .zh ? "关闭窗口" : "Close window"
                ) {
                    commands.closeWindow?()
                }
            }
        }
        .padding(.leading, 11)
        .padding(.trailing, 10)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .opacity(collapsedContentOpacity)
        .background(panelBackground(cornerRadius: shellCornerRadius))
        .clipShape(RoundedRectangle(cornerRadius: shellCornerRadius))
        .padding(1)
    }

    private var expandedView: some View {
        VStack(spacing: 0) {
            VStack(spacing: 0) {
                header
                toolbar
            }
            .background(Palette.chrome)

            VStack(spacing: 0) {
                categoryTabs

                HStack {
                    Text(store.resultTitle)
                        .font(.system(size: 9.5, weight: .semibold))
                        .foregroundStyle(Palette.textSecondary)
                        .lineLimit(1)
                    Spacer()
                    Text(store.language == .zh ? "\(store.shownCount) 项" : "\(store.shownCount) items")
                        .font(.system(size: 9.5))
                        .foregroundStyle(Palette.textSecondary)
                }
                .padding(.horizontal, 16)
                .frame(height: 36)

                shortcutList
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Palette.content)

            HStack {
                HStack(spacing: 5) {
                    MiniKey(text: "Esc")
                    Text(store.language == .zh ? "收起" : "collapse")
                    Text("·")
                    MiniKey(text: "⌘ K")
                    Text(store.language == .zh ? "搜索" : "search")
                }
                Spacer()
                HStack(spacing: 13) {
                    Button {
                        presentFeedbackDialog()
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "questionmark.bubble")
                                .font(.system(size: 9, weight: .medium))
                            Text(store.language == .zh ? "问题反馈" : "Feedback")
                        }
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(store.language == .zh ? "提交问题反馈" : "Send product feedback")
                    .accessibilityIdentifier("keyfloat.feedback.open")

                    HStack(spacing: 5) {
                        Image("KeyFloatLogo")
                            .resizable()
                            .interpolation(.high)
                            .antialiased(true)
                            .frame(width: 12, height: 12)
                            .accessibilityHidden(true)
                        Text("KeyFloat")
                            .fontWeight(.semibold)
                            .tracking(0.4)
                    }
                }
            }
            .font(.system(size: 8.5))
            .foregroundStyle(Palette.textMuted)
            .padding(.horizontal, 14)
            .frame(height: 35)
            .background(Palette.chrome)
            .overlay(alignment: .top) { SolidDivider() }
        }
        .background(panelBackground(cornerRadius: shellCornerRadius))
        .clipShape(RoundedRectangle(cornerRadius: shellCornerRadius))
        .padding(1)
    }

    private var header: some View {
        HStack(spacing: 10) {
            DragDots()
                .frame(width: 7)

            Button {
                toggleSoftwarePicker()
            } label: {
                HStack(spacing: 9) {
                    AppLogo(software: store.selectedSoftware, size: 34)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(store.selectedSoftware?.name ?? "KeyFloat")
                            .font(.system(size: 12.5, weight: .semibold))
                            .foregroundStyle(Palette.textPrimary)
                            .lineLimit(1)
                        Text(store.language == .zh ? "快捷键库" : "Shortcut library")
                            .font(.system(size: 9.5))
                            .foregroundStyle(Palette.textSecondary)
                    }
                    Image(systemName: softwarePickerChevronExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 9, weight: .semibold))
                        .foregroundStyle(Palette.textSecondary)
                        .transaction { transaction in
                            transaction.animation = nil
                            transaction.disablesAnimations = true
                        }
                }
                .frame(width: 145, height: 34, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(
                store.language == .zh
                    ? "选择快捷键软件，当前为 \(store.selectedSoftware?.name ?? "KeyFloat")"
                    : "Choose shortcut software, currently \(store.selectedSoftware?.name ?? "KeyFloat")"
            )
            .popover(isPresented: $showsSoftwarePicker, arrowEdge: .top) {
                softwarePicker
            }
            .onChange(of: showsSoftwarePicker) { isPresented in
                setSoftwarePickerChevronExpanded(isPresented)
            }

            Spacer()

            HStack(spacing: 3) {
                IconButton(
                    systemName: store.theme == .dark ? "sun.max" : "moon",
                    color: Palette.textSecondary,
                    accessibilityLabel: store.language == .zh
                        ? (store.theme == .dark ? "切换到浅色模式" : "切换到深色模式")
                        : (store.theme == .dark ? "Switch to light mode" : "Switch to dark mode")
                ) {
                    store.toggleTheme()
                }

                IconButton(
                    systemName: store.isPinned ? "pin.fill" : "pin",
                    color: store.isPinned ? Palette.panel : Palette.textSecondary,
                    accessibilityLabel: store.language == .zh
                        ? (store.isPinned ? "取消钉住窗口" : "钉住窗口")
                        : (store.isPinned ? "Unpin window" : "Pin window"),
                    background: store.isPinned ? accent : Palette.surface
                ) {
                    let pinned = !store.isPinned
                    store.setPinned(pinned)
                    commands.setPinned?(pinned)
                }

                Button {
                    store.toggleLanguage()
                } label: {
                    Text(store.language == .zh ? "中" : "EN")
                        .font(.system(size: 10.5, weight: .bold))
                        .frame(width: 30, height: 30)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .foregroundStyle(Palette.textSecondary)
                .accessibilityLabel(
                    store.language == .zh ? "切换到英文" : "Switch to Chinese"
                )

                IconButton(
                    systemName: expansionToggleIcon,
                    color: Palette.textSecondary,
                    accessibilityLabel: expansionToggleAccessibilityLabel
                ) {
                    toggleExpansion()
                }

                IconButton(
                    systemName: "xmark",
                    color: Palette.textSecondary,
                    accessibilityLabel: store.language == .zh ? "关闭窗口" : "Close window"
                ) {
                    commands.closeWindow?()
                }
            }
        }
        .padding(.leading, 14)
        .padding(.trailing, 10)
        .frame(height: 62)
        .overlay(alignment: .bottom) { SolidDivider() }
    }

    private var toolbar: some View {
        VStack(spacing: 9) {
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 13))
                    .foregroundStyle(Palette.textSecondary)
                TextField(
                    store.language == .zh ? "搜索命令、工具或按键" : "Search commands, tools or keys",
                    text: $store.query
                )
                .textFieldStyle(.plain)
                .font(.system(size: 11.5))
                .foregroundStyle(Palette.textPrimary)
                .focused($searchIsFocused)
                .onSubmit { searchIsFocused = true }
                .accessibilityLabel(store.language == .zh ? "搜索快捷键" : "Search shortcuts")
                .accessibilityIdentifier("keyfloat.search")
                Spacer(minLength: 4)
                MiniKey(text: "⌘ K")
            }
            .padding(.horizontal, 10)
            .frame(height: 36)
            .background(Palette.surface, in: RoundedRectangle(cornerRadius: 11))
            .overlay(
                RoundedRectangle(cornerRadius: 11)
                    .stroke(searchIsFocused ? accent : Palette.border, lineWidth: 1)
            )

            HStack {
                HStack(spacing: 2) {
                    FilterButton(
                        title: store.language == .zh ? "全部" : "All",
                        systemName: nil,
                        active: !store.favoriteOnly
                    ) {
                        store.favoriteOnly = false
                    }
                    FilterButton(
                        title: store.language == .zh ? "收藏" : "Favorites",
                        systemName: "star",
                        active: store.favoriteOnly
                    ) {
                        store.favoriteOnly = true
                    }
                }
                .padding(2)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 8))

                Spacer()

                Label(store.language == .zh ? "仅 macOS" : "macOS only", systemImage: "apple.logo")
                    .font(.system(size: 9.5, weight: .medium))
                    .foregroundStyle(Palette.textSecondary)
                    .padding(.horizontal, 8)
                    .frame(height: 25)
                    .background(Palette.surface, in: RoundedRectangle(cornerRadius: 7))
            }
        }
        .padding(.horizontal, 13)
        .padding(.vertical, 10)
        .overlay(alignment: .bottom) { SolidDivider() }
    }

    private var categoryTabs: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                CategoryButton(
                    title: store.language == .zh ? "全部分类" : "All categories",
                    active: store.selectedCategoryID == "all",
                    accent: accent
                ) {
                    store.selectCategory("all")
                }

                ForEach(store.selectedSoftware?.categories ?? []) { category in
                    CategoryButton(
                        title: category.title(for: store.language),
                        active: store.selectedCategoryID == category.id,
                        accent: accent
                    ) {
                        store.selectCategory(category.id)
                    }
                }
            }
            .padding(.horizontal, 13)
        }
        .frame(height: 42)
        .overlay(alignment: .bottom) { SolidDivider() }
    }

    @ViewBuilder
    private var shortcutList: some View {
        if store.loadError != nil {
            emptyState(
                icon: "exclamationmark.triangle",
                title: store.language == .zh ? "快捷键数据加载失败" : "Unable to load shortcuts",
                message: store.language == .zh
                    ? "请确认快捷键数据文件已正确包含在应用中。"
                    : "Please verify that the shortcut data file is included in the app."
            )
        } else if store.selectedSoftware?.isCatalogOnly == true {
            emptyState(
                icon: "checkmark.shield",
                title: store.language == .zh ? "快捷键正在核验" : "Shortcuts under verification",
                message: store.language == .zh
                    ? "该软件已收入分类目录；官方 macOS 默认键位核验完成前，不展示未经证实的内容。"
                    : "This app is in the catalog. Unverified shortcuts stay hidden until its official macOS defaults are confirmed."
            )
        } else if store.filteredSections.isEmpty {
            emptyState(
                icon: "magnifyingglass",
                title: store.language == .zh ? "没有找到快捷键" : "No shortcuts found",
                message: store.favoriteOnly
                    ? (store.language == .zh ? "点击星标收藏常用命令。" : "Use the star to keep common commands here.")
                    : (store.language == .zh ? "试试搜索中文、英文或具体按键。" : "Try a command, tool, or key.")
            )
        } else {
            ScrollView {
                LazyVStack(spacing: 0, pinnedViews: [.sectionHeaders]) {
                    ForEach(store.filteredSections) { section in
                        Section {
                            ForEach(section.items) { item in
                                ShortcutRow(
                                    item: item,
                                    language: store.language,
                                    favorite: store.isFavorite(item),
                                    accent: accent
                                ) {
                                    store.toggleFavorite(item)
                                }
                            }
                        } header: {
                            HStack(spacing: 7) {
                                Circle()
                                    .fill(accent)
                                    .frame(width: 4, height: 4)
                                Text(section.category.title(for: store.language).uppercased())
                                    .font(.system(size: 8.5, weight: .bold))
                                    .tracking(0.8)
                                    .foregroundStyle(Palette.textMuted)
                                Spacer()
                            }
                            .padding(.horizontal, 8)
                            .frame(height: 28)
                            .background(Palette.content)
                        }
                    }
                }
                .padding(.horizontal, 8)
                .padding(.bottom, 10)
            }
        }
    }

    private var softwarePicker: some View {
        VStack(spacing: 0) {
            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text(store.language == .zh ? "选择软件" : "Choose software")
                        .font(.system(size: 12, weight: .semibold))
                    Text(store.language == .zh ? "切换当前快捷键库" : "Switch the shortcut library")
                        .font(.system(size: 9))
                        .foregroundStyle(Palette.textSecondary)
                }
                Spacer()
            }
            .padding(.horizontal, 14)
            .frame(height: 58)

            SolidDivider()

            ScrollView {
                LazyVStack(alignment: .leading, spacing: 14) {
                    ForEach(store.groupedSoftware) { section in
                        let rows = softwarePickerRows(for: section)
                        VStack(alignment: .leading, spacing: 7) {
                            HStack(spacing: 7) {
                                Text(section.group.title(for: store.language))
                                    .font(.system(size: 9, weight: .bold))
                                    .foregroundStyle(Palette.textSecondary)
                                Text("\(section.software.count)")
                                    .font(.system(size: 8, weight: .semibold))
                                    .foregroundStyle(Palette.textMuted)
                                Spacer()
                            }
                            .padding(.horizontal, 3)

                            VStack(spacing: 7) {
                                ForEach(rows.indices, id: \.self) { rowIndex in
                                    HStack(spacing: 7) {
                                        ForEach(rows[rowIndex]) { entry in
                                            softwarePickerEntry(entry)
                                                .frame(maxWidth: .infinity)
                                        }
                                        if rows[rowIndex].count == 1 {
                                            Color.clear
                                                .frame(maxWidth: .infinity)
                                                .frame(height: 59)
                                                .accessibilityHidden(true)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .padding(11)
            }
            .frame(height: 420)

            SolidDivider()

            Text(store.language == .zh
                 ? "快捷键库已按办公、设计、工程、开发与媒体等场景分类。"
                 : "Shortcut packs are grouped by office, design, engineering, development, media, and more.")
                .font(.system(size: 8.5))
                .foregroundStyle(Palette.textMuted)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 14)
                .frame(height: 40)
        }
        .frame(width: 396)
        .background(Palette.panel)
    }

    private func softwarePickerRows(for section: SoftwareGroupSection) -> [[SoftwarePickerEntry]] {
        let entries = section.software.map(SoftwarePickerEntry.software)
            + [.add(section.group)]
        return stride(from: 0, to: entries.count, by: 2).map { start in
            Array(entries[start..<min(start + 2, entries.count)])
        }
    }

    @ViewBuilder
    private func softwarePickerEntry(_ entry: SoftwarePickerEntry) -> some View {
        switch entry {
        case .software(let software):
            softwarePickerButton(software)
        case .add(let group):
            addSoftwareButton(for: group)
        }
    }

    private func softwarePickerButton(_ software: SoftwarePack) -> some View {
        Button {
            var transaction = Transaction(animation: nil)
            transaction.disablesAnimations = true
            withTransaction(transaction) {
                showsSoftwarePicker = false
                softwarePickerChevronExpanded = false
                store.selectSoftware(software.id)
            }
        } label: {
            HStack(spacing: 9) {
                AppLogo(software: software, size: 34)
                VStack(alignment: .leading, spacing: 3) {
                    Text(software.name)
                        .font(.system(size: 10.5, weight: .semibold))
                        .lineLimit(1)
                    Text(
                        software.isCatalogOnly
                            ? (store.language == .zh ? "核验中" : "Verification pending")
                            : (store.language == .zh ? "\(software.shortcutCount) 项" : "\(software.shortcutCount) items")
                    )
                        .font(.system(size: 8.5))
                        .foregroundStyle(Palette.textSecondary)
                }
                Spacer(minLength: 0)
            }
            .padding(8)
            .frame(height: 59)
            .background(
                store.selectedSoftwareID == software.id
                    ? Palette.surfaceSelected
                    : Palette.surface,
                in: RoundedRectangle(cornerRadius: 11)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 11)
                    .stroke(
                        store.selectedSoftwareID == software.id
                            ? Palette.accent
                            : Palette.border,
                        lineWidth: 1
                    )
            )
        }
        .buttonStyle(.plain)
    }

    private func addSoftwareButton(for group: SoftwareGroup) -> some View {
        Button {
            presentSoftwareRequest(for: group)
        } label: {
            Image(systemName: "plus")
                .font(.system(size: 23, weight: .light))
                .foregroundStyle(Palette.border)
                .frame(maxWidth: .infinity)
                .frame(height: 59)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 11))
                .overlay(RoundedRectangle(cornerRadius: 11).stroke(Palette.border, lineWidth: 1))
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(
            store.language == .zh
                ? "提交希望新增到\(group.title(for: store.language))的软件"
                : "Request software for \(group.title(for: store.language))"
        )
        .accessibilityIdentifier("keyfloat.add-software.\(group.rawValue)")
    }

    private var softwareRequestDialog: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(alignment: .top, spacing: 12) {
                Text(
                    store.language == .zh
                        ? "输入您想要的产品名称，我们会尽快补充上架"
                        : "Tell us which product you need. We’ll add it as soon as possible."
                )
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Palette.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

                Spacer(minLength: 8)

                Button {
                    dismissSoftwareRequest()
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(Palette.textSecondary)
                        .frame(width: 28, height: 28)
                        .background(Palette.surface, in: RoundedRectangle(cornerRadius: 8))
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(store.language == .zh ? "关闭" : "Close")
            }

            VStack(alignment: .leading, spacing: 7) {
                Text(store.language == .zh ? "软件名称" : "Software name")
                    .font(.system(size: 9.5, weight: .semibold))
                    .foregroundStyle(Palette.textSecondary)
                TextField(
                    store.language == .zh ? "请输入软件名称" : "Enter the software name",
                    text: $requestedSoftwareName
                )
                .textFieldStyle(.plain)
                .font(.system(size: 11))
                .foregroundStyle(Palette.textPrimary)
                .padding(.horizontal, 11)
                .frame(height: 38)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.border))
                .focused($requestNameIsFocused)
                .accessibilityIdentifier("keyfloat.software-request.name")
            }

            VStack(alignment: .leading, spacing: 7) {
                Text(store.language == .zh ? "联系方式（非必填）" : "Contact details (optional)")
                    .font(.system(size: 9.5, weight: .semibold))
                    .foregroundStyle(Palette.textSecondary)
                TextField(
                    store.language == .zh
                        ? "请留下您的联系方式，微信/手机号/邮箱，我们会向您提供反馈结果"
                        : "Leave your WeChat, phone number, or email so we can share the result",
                    text: $requestContact,
                    axis: .vertical
                )
                .textFieldStyle(.plain)
                .font(.system(size: 10.5))
                .foregroundStyle(Palette.textPrimary)
                .lineLimit(2, reservesSpace: true)
                .padding(.horizontal, 11)
                .padding(.vertical, 9)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.border))
                .accessibilityIdentifier("keyfloat.software-request.contact")
            }

            Button {
                submitSoftwareRequest()
            } label: {
                Text(store.language == .zh ? "提交" : "Submit")
                    .font(.system(size: 11, weight: .semibold))
                    .frame(maxWidth: .infinity)
                    .frame(height: 38)
                    .background(
                        requestedSoftwareName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                            ? Palette.surfaceSelected
                            : Palette.accent,
                        in: RoundedRectangle(cornerRadius: 10)
                    )
                    .foregroundStyle(
                        requestedSoftwareName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                            ? Palette.textMuted
                            : Palette.panel
                    )
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .disabled(requestedSoftwareName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            .keyboardShortcut(.return, modifiers: .command)
            .accessibilityIdentifier("keyfloat.software-request.submit")
        }
        .padding(18)
        .frame(width: 380)
        .background(Palette.panel)
        .onAppear {
            DispatchQueue.main.async {
                requestNameIsFocused = true
            }
        }
    }

    private var feedbackDialog: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(alignment: .top, spacing: 12) {
                Text(
                    store.language == .zh
                        ? "感谢你的反馈，帮助我们持续改进"
                        : "Thanks for helping us improve KeyFloat"
                )
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Palette.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

                Spacer(minLength: 8)

                Button {
                    dismissFeedbackDialog()
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundStyle(Palette.textSecondary)
                        .frame(width: 28, height: 28)
                        .background(Palette.surface, in: RoundedRectangle(cornerRadius: 8))
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(store.language == .zh ? "关闭" : "Close")
            }

            VStack(alignment: .leading, spacing: 7) {
                Text(store.language == .zh ? "问题与建议" : "Issue or suggestion")
                    .font(.system(size: 9.5, weight: .semibold))
                    .foregroundStyle(Palette.textSecondary)
                TextField(
                    store.language == .zh
                        ? "请描述遇到的问题或改进建议，必要时可补充复现步骤"
                        : "Describe the issue or suggestion, including steps to reproduce when helpful",
                    text: $feedbackMessage,
                    axis: .vertical
                )
                .textFieldStyle(.plain)
                .font(.system(size: 10.5))
                .foregroundStyle(Palette.textPrimary)
                .lineLimit(4, reservesSpace: true)
                .padding(.horizontal, 11)
                .padding(.vertical, 9)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.border))
                .focused($feedbackMessageIsFocused)
                .accessibilityIdentifier("keyfloat.feedback.message")
            }

            VStack(alignment: .leading, spacing: 7) {
                Text(store.language == .zh ? "联系方式（非必填）" : "Contact details (optional)")
                    .font(.system(size: 9.5, weight: .semibold))
                    .foregroundStyle(Palette.textSecondary)
                TextField(
                    store.language == .zh
                        ? "留下微信、手机号或邮箱，便于我们反馈处理结果"
                        : "Leave your WeChat, phone number, or email so we can follow up",
                    text: $feedbackContact,
                    axis: .vertical
                )
                .textFieldStyle(.plain)
                .font(.system(size: 10.5))
                .foregroundStyle(Palette.textPrimary)
                .lineLimit(2, reservesSpace: true)
                .padding(.horizontal, 11)
                .padding(.vertical, 9)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.border))
                .accessibilityIdentifier("keyfloat.feedback.contact")
            }

            Button {
                submitFeedback()
            } label: {
                Text(store.language == .zh ? "提交反馈" : "Send feedback")
                    .font(.system(size: 11, weight: .semibold))
                    .frame(maxWidth: .infinity)
                    .frame(height: 38)
                    .background(
                        feedbackMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                            ? Palette.surfaceSelected
                            : Palette.accent,
                        in: RoundedRectangle(cornerRadius: 10)
                    )
                    .foregroundStyle(
                        feedbackMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                            ? Palette.textMuted
                            : Palette.panel
                    )
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .disabled(feedbackMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            .keyboardShortcut(.return, modifiers: .command)
            .accessibilityIdentifier("keyfloat.feedback.submit")
        }
        .padding(18)
        .frame(width: 380)
        .background(Palette.panel)
        .onAppear {
            DispatchQueue.main.async {
                feedbackMessageIsFocused = true
            }
        }
    }

    private func presentSoftwareRequest(for group: SoftwareGroup) {
        softwareRequestGroup = group
        requestedSoftwareName = ""
        requestContact = ""
        requestNameIsFocused = false
        var transaction = Transaction(animation: nil)
        transaction.disablesAnimations = true
        withTransaction(transaction) {
            showsSoftwarePicker = false
            softwarePickerChevronExpanded = false
        }
        DispatchQueue.main.async {
            showsSoftwareRequest = true
        }
    }

    private func dismissSoftwareRequest() {
        requestNameIsFocused = false
        showsSoftwareRequest = false
        softwareRequestGroup = nil
        requestedSoftwareName = ""
        requestContact = ""
    }

    private func submitSoftwareRequest() {
        let name = requestedSoftwareName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !name.isEmpty, let group = softwareRequestGroup else { return }
        store.submitSoftwareRequest(
            name: name,
            contact: requestContact,
            group: group
        )
        dismissSoftwareRequest()
        showSubmissionToast(.softwareRequest)
    }

    private func presentFeedbackDialog() {
        feedbackMessage = ""
        feedbackContact = ""
        feedbackMessageIsFocused = false
        var transaction = Transaction(animation: nil)
        transaction.disablesAnimations = true
        withTransaction(transaction) {
            showsSoftwarePicker = false
            softwarePickerChevronExpanded = false
        }
        DispatchQueue.main.async {
            showsFeedbackDialog = true
        }
    }

    private func dismissFeedbackDialog() {
        feedbackMessageIsFocused = false
        showsFeedbackDialog = false
        feedbackMessage = ""
        feedbackContact = ""
    }

    private func submitFeedback() {
        let message = feedbackMessage.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !message.isEmpty else { return }
        store.submitFeedback(message: message, contact: feedbackContact)
        dismissFeedbackDialog()
        showSubmissionToast(.feedback)
    }

    private func showSubmissionToast(_ kind: SubmissionToastKind) {
        toastDismissTask?.cancel()
        submissionToastKind = kind
        withAnimation(.easeOut(duration: 0.16)) {
            showsSubmissionToast = true
        }
        toastDismissTask = Task { @MainActor in
            try? await Task.sleep(nanoseconds: 1_800_000_000)
            guard !Task.isCancelled else { return }
            withAnimation(.easeIn(duration: 0.14)) {
                showsSubmissionToast = false
            }
            toastDismissTask = nil
        }
    }

    private func emptyState(icon: String, title: String, message: String) -> some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundStyle(Palette.textSecondary)
                .frame(width: 42, height: 42)
                .background(Palette.surface, in: RoundedRectangle(cornerRadius: 13))
                .overlay(RoundedRectangle(cornerRadius: 13).stroke(Palette.border))
            Text(title)
                .font(.system(size: 12, weight: .semibold))
            Text(message)
                .font(.system(size: 10))
                .foregroundStyle(Palette.textSecondary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: 250)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func panelBackground(cornerRadius: CGFloat) -> some View {
        RoundedRectangle(cornerRadius: cornerRadius)
            .fill(Palette.panel)
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(Palette.border, lineWidth: 1)
            )
    }

    private func collapse() {
        if isWindowTransitioning {
            if transitionTargetExpanded == false {
                pendingExpandedState = nil
            } else {
                pendingExpandedState = false
            }
            pendingSearchFocus = false
            return
        }
        isWindowTransitioning = true
        transitionTargetExpanded = false
        searchIsFocused = false
        var transaction = Transaction(animation: nil)
        transaction.disablesAnimations = true
        withTransaction(transaction) {
            showsSoftwarePicker = false
            softwarePickerChevronExpanded = false
            store.isExpanded = false
            collapsedContentOpacity = 0
        }
        DispatchQueue.main.async {
            resizeWindow(expanded: false) {
                if pendingExpandedState == true {
                    collapsedContentOpacity = 0
                } else {
                    withAnimation(.easeOut(duration: 0.14)) {
                        collapsedContentOpacity = 1
                    }
                }
                isWindowTransitioning = false
                transitionTargetExpanded = nil
                runPendingWindowTransition()
            }
        }
    }

    private func toggleExpansion() {
        if expansionToggleShowsCollapse {
            collapse()
        } else {
            expand()
        }
    }

    private func toggleSoftwarePicker() {
        let shouldPresent = !softwarePickerChevronExpanded
        setSoftwarePickerChevronExpanded(shouldPresent)
        DispatchQueue.main.async {
            var transaction = Transaction(animation: nil)
            transaction.disablesAnimations = true
            withTransaction(transaction) {
                showsSoftwarePicker = shouldPresent
            }
        }
    }

    private func setSoftwarePickerChevronExpanded(_ expanded: Bool) {
        guard softwarePickerChevronExpanded != expanded else { return }
        var transaction = Transaction(animation: nil)
        transaction.disablesAnimations = true
        withTransaction(transaction) {
            softwarePickerChevronExpanded = expanded
        }
    }

    private func expand(focusSearchAfterExpansion: Bool = false) {
        if isWindowTransitioning {
            pendingSearchFocus = pendingSearchFocus || focusSearchAfterExpansion
            if transitionTargetExpanded == true {
                pendingExpandedState = nil
            } else {
                pendingExpandedState = true
            }
            return
        }
        isWindowTransitioning = true
        transitionTargetExpanded = true

        withAnimation(.easeOut(duration: 0.18)) {
            collapsedContentOpacity = 0
        }

        resizeWindow(expanded: true) {
            // The shell expands immediately (140 ms) while the collapsed
            // controls finish their 180 ms fade. Reveal the full UI only
            // after both animations have completed.
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.04) {
                var transaction = Transaction(animation: nil)
                transaction.disablesAnimations = true
                withTransaction(transaction) {
                    store.isExpanded = true
                }
                isWindowTransitioning = false
                transitionTargetExpanded = nil
                let shouldFocusSearch = focusSearchAfterExpansion || pendingSearchFocus
                if shouldFocusSearch && pendingExpandedState != false {
                    DispatchQueue.main.async {
                        searchIsFocused = true
                    }
                }
                if pendingExpandedState == nil {
                    pendingSearchFocus = false
                }
                runPendingWindowTransition()
            }
        }
    }

    private func focusSearch() {
        if store.isExpanded {
            searchIsFocused = true
        } else {
            expand(focusSearchAfterExpansion: true)
        }
    }

    private func resizeWindow(expanded: Bool, completion: @escaping () -> Void) {
        guard let resize = commands.setExpanded else {
            completion()
            return
        }
        resize(expanded, completion)
    }

    private func handleEscape() {
        guard store.isExpanded
                || transitionTargetExpanded == true
                || pendingExpandedState == true else { return }
        collapse()
    }

    private func runPendingWindowTransition() {
        guard let shouldExpand = pendingExpandedState else { return }
        let shouldFocusSearch = pendingSearchFocus
        pendingExpandedState = nil
        pendingSearchFocus = false
        DispatchQueue.main.async {
            if shouldExpand {
                expand(focusSearchAfterExpansion: shouldFocusSearch)
            } else {
                collapse()
            }
        }
    }
}

private struct SolidDivider: View {
    var body: some View {
        Rectangle()
            .fill(Palette.border)
            .frame(height: 1)
    }
}

private struct ShortcutRow: View {
    let item: ShortcutItem
    let language: AppLanguage
    let favorite: Bool
    let accent: Color
    let toggleFavorite: () -> Void

    var body: some View {
        HStack(spacing: 8) {
            VStack(alignment: .leading, spacing: 2) {
                Text(item.title(for: language))
                    .font(.system(size: 11))
                    .foregroundStyle(Palette.textPrimary)
                    .lineLimit(1)
            }

            Spacer(minLength: 5)

            HStack(spacing: 3) {
                ForEach(Array(item.keys(for: language).enumerated()), id: \.offset) { _, key in
                    KeyCap(text: key)
                }
            }

            Button(action: toggleFavorite) {
                Image(systemName: favorite ? "star.fill" : "star")
                    .font(.system(size: 11))
                    .foregroundStyle(favorite ? accent : Palette.textMuted)
                    .frame(width: 22, height: 22)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(
                language == .zh
                    ? (favorite ? "取消收藏 \(item.title(for: language))" : "收藏 \(item.title(for: language))")
                    : (favorite ? "Remove \(item.title(for: language)) from favorites" : "Add \(item.title(for: language)) to favorites")
            )
        }
        .padding(.leading, 10)
        .padding(.trailing, 7)
        .frame(minHeight: 41)
        .background(Palette.content, in: RoundedRectangle(cornerRadius: 10))
    }
}

private struct KeyCap: View {
    let text: String

    var body: some View {
        Text(text)
            .font(.system(size: 9.5, weight: .semibold, design: .monospaced))
            .foregroundStyle(Palette.textPrimary)
            .padding(.horizontal, 5)
            .frame(minWidth: 21, minHeight: 22)
            .background(Palette.surfaceRaised, in: RoundedRectangle(cornerRadius: 6))
            .overlay(RoundedRectangle(cornerRadius: 6).stroke(Palette.border))
    }
}

private struct MiniKey: View {
    let text: String

    var body: some View {
        Text(text)
            .font(.system(size: 8, weight: .medium, design: .monospaced))
            .foregroundStyle(Palette.textSecondary)
            .padding(.horizontal, 4)
            .frame(minHeight: 16)
            .background(Palette.surfaceRaised, in: RoundedRectangle(cornerRadius: 4))
            .overlay(RoundedRectangle(cornerRadius: 4).stroke(Palette.border))
    }
}

private struct FilterButton: View {
    let title: String
    let systemName: String?
    let active: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 4) {
                if let systemName {
                    Image(systemName: systemName)
                        .font(.system(size: 10))
                }
                Text(title)
            }
            .font(.system(size: 9.5))
            .padding(.horizontal, 9)
            .frame(height: 25)
            .background(active ? Palette.surfaceSelected : Palette.surface, in: RoundedRectangle(cornerRadius: 6))
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .foregroundStyle(active ? Palette.textPrimary : Palette.textSecondary)
    }
}

private struct CategoryButton: View {
    let title: String
    let active: Bool
    let accent: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 10))
                .padding(.horizontal, 10)
                .frame(height: 25)
                .background(active ? accent : Palette.surface, in: RoundedRectangle(cornerRadius: 8))
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(active ? accent : Palette.border, lineWidth: 1)
                )
        }
        .buttonStyle(.plain)
        .foregroundStyle(active ? Palette.panel : Palette.textSecondary)
    }
}

private enum SoftwarePickerEntry: Identifiable {
    case software(SoftwarePack)
    case add(SoftwareGroup)

    var id: String {
        switch self {
        case .software(let software): return "software-\(software.id)"
        case .add(let group): return "add-\(group.rawValue)"
        }
    }
}

private struct IconButton: View {
    let systemName: String
    let color: Color
    let accessibilityLabel: String
    var background: Color = Palette.surface
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 12, weight: .medium))
                .foregroundStyle(color)
                .frame(width: 30, height: 30)
                .background(background, in: RoundedRectangle(cornerRadius: 9))
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(Text(accessibilityLabel))
    }
}

private struct DragDots: View {
    var body: some View {
        Grid(horizontalSpacing: 3, verticalSpacing: 3) {
            ForEach(0..<3, id: \.self) { _ in
                GridRow {
                    Circle().fill(Palette.textMuted).frame(width: 2, height: 2)
                    Circle().fill(Palette.textMuted).frame(width: 2, height: 2)
                }
            }
        }
    }
}

private struct AppLogo: View {
    let software: SoftwarePack?
    let size: CGFloat

    private var accent: Color { Color(hex: software?.accent ?? "#808080") }
    private var originalAppIcon: NSImage? {
        guard let software else { return nil }
        return SoftwareIconRepository.installedIcon(for: software)
    }

    var body: some View {
        Group {
            if software?.id != "grammarly", let originalAppIcon {
                Image(nsImage: originalAppIcon)
                    .resizable()
                    .interpolation(.high)
                    .antialiased(true)
                    .scaledToFit()
            } else {
                ZStack {
                    RoundedRectangle(cornerRadius: size * 0.31)
                        .fill(Palette.surfaceRaised)
                    RoundedRectangle(cornerRadius: size * 0.31)
                        .stroke(accent, lineWidth: 1)

                    if software?.id == "figma" {
                        FigmaMark()
                            .frame(width: size * 0.47, height: size * 0.68)
                    } else if software?.id == "grammarly" {
                        Image("GrammarlyLogo")
                            .resizable()
                            .interpolation(.high)
                            .antialiased(true)
                            .scaledToFit()
                            .frame(width: size * 0.66, height: size * 0.66)
                    } else {
                        Text(software?.glyph ?? "K")
                            .font(.system(size: size * 0.4, weight: .bold))
                            .foregroundStyle(accent)
                    }
                }
            }
        }
        .frame(width: size, height: size)
    }
}

@MainActor
private enum SoftwareIconRepository {
    private static let bundleIdentifiers: [String: [String]] = [
        "figma": ["com.figma.Desktop"],
        "photoshop": ["com.adobe.Photoshop"],
        "illustrator": ["com.adobe.illustrator"],
        "affinitydesigner": ["com.seriflabs.affinitydesigner2", "com.seriflabs.affinitydesigner"],
        "affinityphoto": ["com.seriflabs.affinityphoto2", "com.seriflabs.affinityphoto"],
        "affinitypublisher": ["com.seriflabs.affinitypublisher2", "com.seriflabs.affinitypublisher"],
        "aftereffects": ["com.adobe.AfterEffects.application"],
        "premiere": ["com.adobe.PremierePro"],
        "blender": ["org.blenderfoundation.blender"],
        "word": ["com.microsoft.Word"],
        "excel": ["com.microsoft.Excel"],
        "powerpoint": ["com.microsoft.Powerpoint"],
        "outlook": ["com.microsoft.Outlook"],
        "onenote": ["com.microsoft.onenote.mac"],
        "autocad": ["com.autodesk.AutoCAD"],
        "rhino": ["com.mcneel.rhinoceros"],
        "fusion360": ["com.autodesk.fusion360", "com.autodesk.mas.fusion360"],
        "freecad": ["org.freecad.FreeCAD", "org.freecadweb.FreeCAD"],
        "shapr3d": ["com.shapr3d.shapr", "com.shapr3d.Shapr3D"],
        "cinema4d": ["net.maxon.cinema4d"],
        "comsol": ["com.comsol.multiphysics"],
        "matlab": ["com.mathworks.matlab"],
        "vscode": ["com.microsoft.VSCode"],
        "xcode": ["com.apple.dt.Xcode"],
        "terminal": ["com.apple.Terminal"],
        "androidstudio": ["com.google.android.studio"],
        "intellij": ["com.jetbrains.intellij"],
        "spss": ["com.ibm.spss.Statistics"],
        "rstudio": ["org.rstudio.RStudio"],
        "davinci": ["com.blackmagic-design.DaVinciResolve"],
        "chrome": ["com.google.Chrome"],
        "safari": ["com.apple.Safari"],
        "finder": ["com.apple.finder"],
        "notion": ["notion.id"],
        "obsidian": ["md.obsidian"],
    ]

    private static var cachedIcons: [String: NSImage] = [:]
    private static var missingIconIDs = Set<String>()

    static func installedIcon(for software: SoftwarePack) -> NSImage? {
        let softwareID = software.id
        if let cached = cachedIcons[softwareID] { return cached }
        if missingIconIDs.contains(softwareID) { return nil }
        guard let identifiers = software.bundleIdentifiers ?? bundleIdentifiers[softwareID] else {
            missingIconIDs.insert(softwareID)
            return nil
        }

        let workspace = NSWorkspace.shared
        for identifier in identifiers {
            guard let url = workspace.urlForApplication(withBundleIdentifier: identifier) else {
                continue
            }
            let icon = workspace.icon(forFile: url.path)
            icon.size = NSSize(width: 256, height: 256)
            cachedIcons[softwareID] = icon
            return icon
        }
        missingIconIDs.insert(softwareID)
        return nil
    }
}

private struct FigmaMark: View {
    var body: some View {
        GeometryReader { proxy in
            let cell = proxy.size.width / 2
            ZStack(alignment: .topLeading) {
                Circle().fill(Color(hex: "#FF7262")).frame(width: cell, height: cell)
                Circle().fill(Color(hex: "#F24E1E")).frame(width: cell, height: cell).offset(x: cell)
                Circle().fill(Color(hex: "#A259FF")).frame(width: cell, height: cell).offset(y: cell)
                Circle().fill(Color(hex: "#1ABCFE")).frame(width: cell, height: cell).offset(x: cell, y: cell)
                Circle().fill(Color(hex: "#0ACF83")).frame(width: cell, height: cell).offset(y: cell * 2)
            }
        }
    }
}

private extension Color {
    static func adaptive(light: String, dark: String) -> Color {
        Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            let match = appearance.bestMatch(from: [.aqua, .darkAqua])
            return NSColor(hex: match == .darkAqua ? dark : light)
        }))
    }

    init(hex: String) {
        let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var value: UInt64 = 0
        Scanner(string: cleaned).scanHexInt64(&value)
        let red = Double((value >> 16) & 0xFF) / 255
        let green = Double((value >> 8) & 0xFF) / 255
        let blue = Double(value & 0xFF) / 255
        self.init(red: red, green: green, blue: blue)
    }
}

private extension NSColor {
    convenience init(hex: String) {
        let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var value: UInt64 = 0
        Scanner(string: cleaned).scanHexInt64(&value)
        let red = CGFloat((value >> 16) & 0xFF) / 255
        let green = CGFloat((value >> 8) & 0xFF) / 255
        let blue = CGFloat(value & 0xFF) / 255
        self.init(srgbRed: red, green: green, blue: blue, alpha: 1)
    }
}
