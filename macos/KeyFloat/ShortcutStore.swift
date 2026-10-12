import Foundation

@MainActor
final class ShortcutStore: ObservableObject {
    @Published private(set) var software: [SoftwarePack] = []
    @Published private(set) var loadError: String?
    @Published private(set) var dataWarnings: [String] = []
    @Published var selectedSoftwareID: String
    @Published var language: AppLanguage
    @Published var theme: AppTheme
    @Published var selectedCategoryID = "all"
    @Published var query = ""
    @Published var favoriteOnly = false
    @Published var isExpanded = false
    @Published private(set) var escapeRequestID = 0
    @Published private(set) var dismissSearchRequestID = 0
    @Published var isPinned: Bool
    @Published private(set) var favorites: Set<String>
    @Published private(set) var pinnedSoftwareIDs: [String]
    @Published private(set) var collapsedSoftwareGroups: Set<SoftwareGroup>
    @Published private(set) var isPinnedSoftwareGroupCollapsed: Bool

    private enum MergeMode {
        case merge
        case replace
    }

    private struct ResourceDescriptor {
        let name: String
        let mergeMode: MergeMode
    }

    private struct FilterCacheKey: Equatable {
        let softwareID: String
        let categoryID: String
        let normalizedQuery: String
        let favoriteOnly: Bool
        let favoritesRevision: Int
    }

    private struct SearchDocument {
        let titleVariants: [String]
        let keyVariants: [String]
        let title: String
        let keys: String
        let tags: String
        let category: String
        let haystack: String
        let tokens: Set<String>
    }

    private struct StoredSoftwareRequest: Codable {
        let id: UUID
        let group: String
        let softwareName: String
        let contact: String
        let submittedAt: Date
        let language: String?
        var deliveredAt: Date?
    }

    private struct StoredFeedbackReport: Codable {
        let id: UUID
        let message: String
        let contact: String
        let softwareID: String
        let language: String
        let submittedAt: Date
        var deliveredAt: Date?
    }

    private struct FeedbackPayload: Encodable {
        let source: String
        let kind: String
        let message: String
        let contact: String
        let softwareID: String?
        let softwareName: String?
        let softwareGroup: String?
        let language: String?
        let appVersion: String
        let clientSubmissionId: String
    }

    private let defaults: UserDefaults
    private let remoteFeedbackEnabled: Bool
    private var softwareByID: [String: SoftwarePack] = [:]
    private var softwareIDByBundleIdentifier: [String: String] = [:]
    private var groupedSoftwareCache: [SoftwareGroupSection] = []
    private var searchDocuments: [String: SearchDocument] = [:]
    private var cachedFilterKey: FilterCacheKey?
    private var cachedFilteredSections: [ShortcutSection] = []
    private var favoritesRevision = 0
    private var feedbackDeliveryTask: Task<Void, Never>?
    private var additionalDeliveryPassRequested = false

    private enum PreferenceKey {
        static let software = "KeyFloatSoftware"
        static let language = "KeyFloatLanguage"
        static let theme = "KeyFloatTheme"
        static let pinned = "KeyFloatPinned"
        static let favorites = "KeyFloatFavorites"
        static let pinnedSoftware = "KeyFloatPinnedSoftwareIDs"
        static let collapsedSoftwareGroups = "KeyFloatCollapsedSoftwareGroups"
        static let pinnedSoftwareGroupCollapsed = "KeyFloatPinnedSoftwareGroupCollapsed"
        static let softwareRequests = "KeyFloatSoftwareRequests"
        static let feedbackReports = "KeyFloatFeedbackReports"
    }

    private static let fallbackSoftwareIDByBundleIdentifier: [String: String] = [
        "com.figma.desktop": "figma",
        "com.adobe.photoshop": "photoshop",
        "com.adobe.illustrator": "illustrator",
        "com.adobe.aftereffects.application": "aftereffects",
        "com.adobe.premierepro": "premiere",
        "org.blenderfoundation.blender": "blender",
        "com.microsoft.word": "word",
        "com.microsoft.excel": "excel",
        "com.microsoft.powerpoint": "powerpoint",
        "com.microsoft.outlook": "outlook",
        "com.microsoft.onenote.mac": "onenote",
        "com.autodesk.autocad": "autocad",
        "com.mcneel.rhinoceros": "rhino",
        "com.autodesk.fusion360": "fusion360",
        "com.autodesk.mas.fusion360": "fusion360",
        "org.freecad.freecad": "freecad",
        "org.freecadweb.freecad": "freecad",
        "com.shapr3d.shapr": "shapr3d",
        "com.shapr3d.shapr3d": "shapr3d",
        "net.maxon.cinema4d": "cinema4d",
        "com.comsol.multiphysics": "comsol",
        "com.mathworks.matlab": "matlab",
        "com.microsoft.vscode": "vscode",
        "com.apple.dt.xcode": "xcode",
        "com.apple.terminal": "terminal",
        "com.google.android.studio": "androidstudio",
        "com.jetbrains.intellij": "intellij",
        "com.ibm.spss.statistics": "spss",
        "org.rstudio.rstudio": "rstudio",
        "com.blackmagic-design.davinciresolve": "davinci",
        "com.google.chrome": "chrome",
        "com.apple.safari": "safari",
        "com.apple.finder": "finder",
        "notion.id": "notion",
        "md.obsidian": "obsidian",
    ]

    init(bundle: Bundle = .main, defaults: UserDefaults = .standard) {
        self.defaults = defaults
        remoteFeedbackEnabled = bundle.bundleIdentifier == Bundle.main.bundleIdentifier
        selectedSoftwareID = defaults.string(forKey: PreferenceKey.software) ?? "figma"
        language = AppLanguage.load(from: defaults)
        theme = AppTheme(
            rawValue: defaults.string(forKey: PreferenceKey.theme) ?? "dark"
        ) ?? .dark
        isPinned = defaults.object(forKey: PreferenceKey.pinned) as? Bool ?? true
        favorites = Set(defaults.stringArray(forKey: PreferenceKey.favorites) ?? [])
        pinnedSoftwareIDs = defaults.stringArray(forKey: PreferenceKey.pinnedSoftware) ?? []
        collapsedSoftwareGroups = Set(
            (defaults.stringArray(forKey: PreferenceKey.collapsedSoftwareGroups) ?? [])
                .compactMap(SoftwareGroup.init(rawValue:))
        )
        isPinnedSoftwareGroupCollapsed = defaults.object(
            forKey: PreferenceKey.pinnedSoftwareGroupCollapsed
        ) as? Bool ?? false

        loadShortcutLibrary(from: bundle)
        requestPendingFeedbackDelivery()
    }

    var selectedSoftware: SoftwarePack? {
        softwareByID[selectedSoftwareID] ?? software.first
    }

    var groupedSoftware: [SoftwareGroupSection] {
        groupedSoftwareCache
    }

    var pinnedSoftware: [SoftwarePack] {
        pinnedSoftwareIDs.compactMap { softwareByID[$0] }
    }

    var filteredSections: [ShortcutSection] {
        let normalizedQuery = normalize(query)
        let cacheKey = FilterCacheKey(
            softwareID: selectedSoftwareID,
            categoryID: selectedCategoryID,
            normalizedQuery: normalizedQuery,
            favoriteOnly: favoriteOnly,
            favoritesRevision: favoritesRevision
        )
        if cachedFilterKey == cacheKey {
            return cachedFilteredSections
        }

        guard let selectedSoftware else { return [] }
        let validCategoryID = selectedSoftware.categories.contains { $0.id == selectedCategoryID }
            ? selectedCategoryID
            : "all"
        let tokens = normalizedQuery.split(separator: " ").map(String.init)

        let rankedSections: [(offset: Int, score: Int, section: ShortcutSection)] = selectedSoftware.categories
            .enumerated()
            .compactMap { categoryOffset, category in
            guard validCategoryID == "all" || validCategoryID == category.id else {
                return nil
            }

            let rankedItems: [(offset: Int, score: Int, item: ShortcutItem)] = category.items
                .enumerated()
                .compactMap { offset, item in
                    if favoriteOnly && !favorites.contains(favoriteKey(for: item)) {
                        return nil
                    }
                    guard !tokens.isEmpty else {
                        return (offset, 0, item)
                    }
                    guard let document = searchDocuments[searchKey(softwareID: selectedSoftware.id, itemID: item.id)],
                          tokens.allSatisfy({ tokenMatches($0, in: document) }) else {
                        return nil
                    }
                    return (offset, searchScore(document, query: normalizedQuery, tokens: tokens), item)
                }

            let items: [ShortcutItem]
            if tokens.isEmpty {
                items = rankedItems.map(\.item)
            } else {
                items = rankedItems
                    .sorted {
                        if $0.score != $1.score { return $0.score > $1.score }
                        return $0.offset < $1.offset
                    }
                    .map(\.item)
            }

            guard !items.isEmpty else { return nil }
            return (
                categoryOffset,
                rankedItems.map(\.score).max() ?? 0,
                ShortcutSection(category: category, items: items)
            )
        }
        let sections: [ShortcutSection]
        if tokens.isEmpty {
            sections = rankedSections.map(\.section)
        } else {
            sections = rankedSections
                .sorted {
                    if $0.score != $1.score { return $0.score > $1.score }
                    return $0.offset < $1.offset
                }
                .map(\.section)
        }
        cachedFilterKey = cacheKey
        cachedFilteredSections = sections
        return sections
    }

    var shownCount: Int {
        filteredSections.reduce(0) { $0 + $1.items.count }
    }

    var resultTitle: String {
        if !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return language == .zh ? "搜索结果 · “\(query)”" : "Search results · “\(query)”"
        }
        if favoriteOnly {
            return language == .zh ? "已收藏快捷键" : "Favorite shortcuts"
        }
        if selectedCategoryID != "all",
           let category = selectedSoftware?.categories.first(where: { $0.id == selectedCategoryID }) {
            return category.title(for: language)
        }
        return language == .zh ? "全部快捷键" : "All shortcuts"
    }

    func selectSoftware(_ id: String) {
        guard softwareByID[id] != nil else { return }
        let softwareChanged = selectedSoftwareID != id
        if softwareChanged {
            selectedSoftwareID = id
            defaults.set(id, forKey: PreferenceKey.software)
        }
        if selectedCategoryID != "all" { selectedCategoryID = "all" }
        if favoriteOnly { favoriteOnly = false }
        if !query.isEmpty { query = "" }
    }

    @discardableResult
    func selectSoftware(matchingBundleIdentifier bundleIdentifier: String) -> Bool {
        guard !isExpanded,
              let id = softwareIDByBundleIdentifier[bundleIdentifier.lowercased()],
              id != selectedSoftwareID else { return false }
        selectSoftware(id)
        return true
    }

    func selectCategory(_ id: String) {
        guard id == "all" || selectedSoftware?.categories.contains(where: { $0.id == id }) == true else {
            if selectedCategoryID != "all" { selectedCategoryID = "all" }
            return
        }
        if selectedCategoryID != id { selectedCategoryID = id }
    }

    func toggleLanguage() {
        language = language == .zh ? .en : .zh
        defaults.set(language.rawValue, forKey: PreferenceKey.language)
    }

    func toggleTheme() {
        theme = theme == .dark ? .light : .dark
        defaults.set(theme.rawValue, forKey: PreferenceKey.theme)
    }

    func setPinned(_ pinned: Bool) {
        guard isPinned != pinned else { return }
        isPinned = pinned
        defaults.set(pinned, forKey: PreferenceKey.pinned)
    }

    func isSoftwarePinned(_ softwareID: String) -> Bool {
        pinnedSoftwareIDs.contains(softwareID)
    }

    func toggleSoftwarePinned(_ softwareID: String) {
        guard softwareByID[softwareID] != nil else { return }
        if let index = pinnedSoftwareIDs.firstIndex(of: softwareID) {
            pinnedSoftwareIDs.remove(at: index)
        } else {
            pinnedSoftwareIDs.insert(softwareID, at: 0)
            isPinnedSoftwareGroupCollapsed = false
            defaults.set(false, forKey: PreferenceKey.pinnedSoftwareGroupCollapsed)
        }
        defaults.set(pinnedSoftwareIDs, forKey: PreferenceKey.pinnedSoftware)
    }

    func isSoftwareGroupCollapsed(_ group: SoftwareGroup) -> Bool {
        collapsedSoftwareGroups.contains(group)
    }

    func toggleSoftwareGroupCollapsed(_ group: SoftwareGroup) {
        if collapsedSoftwareGroups.contains(group) {
            collapsedSoftwareGroups.remove(group)
        } else {
            collapsedSoftwareGroups.insert(group)
        }
        defaults.set(
            collapsedSoftwareGroups.map(\.rawValue).sorted(),
            forKey: PreferenceKey.collapsedSoftwareGroups
        )
    }

    func togglePinnedSoftwareGroupCollapsed() {
        isPinnedSoftwareGroupCollapsed.toggle()
        defaults.set(
            isPinnedSoftwareGroupCollapsed,
            forKey: PreferenceKey.pinnedSoftwareGroupCollapsed
        )
    }

    func requestEscape() {
        escapeRequestID &+= 1
    }

    func requestDismissSearch() {
        dismissSearchRequestID &+= 1
    }

    func favoriteKey(for item: ShortcutItem) -> String {
        searchKey(softwareID: selectedSoftwareID, itemID: item.id)
    }

    func isFavorite(_ item: ShortcutItem) -> Bool {
        favorites.contains(favoriteKey(for: item))
    }

    func toggleFavorite(_ item: ShortcutItem) {
        let key = favoriteKey(for: item)
        if favorites.contains(key) {
            favorites.remove(key)
        } else {
            favorites.insert(key)
        }
        favoritesRevision &+= 1
        defaults.set(Array(favorites).sorted(), forKey: PreferenceKey.favorites)
    }

    func submitSoftwareRequest(
        name: String,
        contact: String,
        group: SoftwareGroup
    ) {
        let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedName.isEmpty else { return }
        let request = StoredSoftwareRequest(
            id: UUID(),
            group: group.rawValue,
            softwareName: trimmedName,
            contact: contact.trimmingCharacters(in: .whitespacesAndNewlines),
            submittedAt: Date(),
            language: language.rawValue,
            deliveredAt: nil
        )
        var requests: [StoredSoftwareRequest] = []
        if let data = defaults.data(forKey: PreferenceKey.softwareRequests),
           let decoded = try? JSONDecoder().decode([StoredSoftwareRequest].self, from: data) {
            requests = decoded
        }
        requests.append(request)
        if requests.count > 100 {
            requests.removeFirst(requests.count - 100)
        }
        if let data = try? JSONEncoder().encode(requests) {
            defaults.set(data, forKey: PreferenceKey.softwareRequests)
        }
        requestPendingFeedbackDelivery()
    }

    func submitFeedback(message: String, contact: String) {
        let trimmedMessage = message.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedMessage.isEmpty else { return }
        let report = StoredFeedbackReport(
            id: UUID(),
            message: trimmedMessage,
            contact: contact.trimmingCharacters(in: .whitespacesAndNewlines),
            softwareID: selectedSoftwareID,
            language: language.rawValue,
            submittedAt: Date(),
            deliveredAt: nil
        )
        var reports: [StoredFeedbackReport] = []
        if let data = defaults.data(forKey: PreferenceKey.feedbackReports),
           let decoded = try? JSONDecoder().decode([StoredFeedbackReport].self, from: data) {
            reports = decoded
        }
        reports.append(report)
        if reports.count > 100 {
            reports.removeFirst(reports.count - 100)
        }
        if let data = try? JSONEncoder().encode(reports) {
            defaults.set(data, forKey: PreferenceKey.feedbackReports)
        }
        requestPendingFeedbackDelivery()
    }

    private func requestPendingFeedbackDelivery() {
        guard remoteFeedbackEnabled else { return }
        additionalDeliveryPassRequested = true
        guard feedbackDeliveryTask == nil else { return }
        feedbackDeliveryTask = Task { [weak self] in
            guard let self else { return }
            repeat {
                self.additionalDeliveryPassRequested = false
                await self.deliverPendingFeedback()
            } while self.additionalDeliveryPassRequested
            self.feedbackDeliveryTask = nil
        }
    }

    private func deliverPendingFeedback() async {
        guard remoteFeedbackEnabled,
              let endpoint = URL(string: "https://keyfloat.cn/api/feedback") else { return }

        let reports = storedFeedbackReports()
        for report in reports where report.deliveredAt == nil {
            let payload = FeedbackPayload(
                source: "macos",
                kind: "feedback",
                message: report.message,
                contact: report.contact,
                softwareID: report.softwareID,
                softwareName: nil,
                softwareGroup: nil,
                language: report.language,
                appVersion: Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "unknown",
                clientSubmissionId: report.id.uuidString
            )
            if await deliver(payload, to: endpoint) {
                markFeedbackReportDelivered(report.id)
            }
        }

        let softwareRequests = storedSoftwareRequests()
        for softwareRequest in softwareRequests where softwareRequest.deliveredAt == nil {
            let payload = FeedbackPayload(
                source: "macos",
                kind: "software_request",
                message: softwareRequest.softwareName,
                contact: softwareRequest.contact,
                softwareID: nil,
                softwareName: softwareRequest.softwareName,
                softwareGroup: softwareRequest.group,
                language: softwareRequest.language,
                appVersion: Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "unknown",
                clientSubmissionId: softwareRequest.id.uuidString
            )
            if await deliver(payload, to: endpoint) {
                markSoftwareRequestDelivered(softwareRequest.id)
            }
        }
    }

    private func deliver(_ payload: FeedbackPayload, to endpoint: URL) async -> Bool {
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 15
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONEncoder().encode(payload)
        guard request.httpBody != nil else { return false }
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse else { return false }
            return (200...299).contains(http.statusCode)
        } catch {
            // Keep the local item queued. The next launch or submission retries it.
            return false
        }
    }

    private func storedFeedbackReports() -> [StoredFeedbackReport] {
        guard let data = defaults.data(forKey: PreferenceKey.feedbackReports),
              let reports = try? JSONDecoder().decode([StoredFeedbackReport].self, from: data) else { return [] }
        return reports
    }

    private func storedSoftwareRequests() -> [StoredSoftwareRequest] {
        guard let data = defaults.data(forKey: PreferenceKey.softwareRequests),
              let requests = try? JSONDecoder().decode([StoredSoftwareRequest].self, from: data) else { return [] }
        return requests
    }

    private func markFeedbackReportDelivered(_ id: UUID) {
        var reports = storedFeedbackReports()
        guard let index = reports.firstIndex(where: { $0.id == id && $0.deliveredAt == nil }) else { return }
        reports[index].deliveredAt = Date()
        if let encoded = try? JSONEncoder().encode(reports) {
            defaults.set(encoded, forKey: PreferenceKey.feedbackReports)
        }
    }

    private func markSoftwareRequestDelivered(_ id: UUID) {
        var requests = storedSoftwareRequests()
        guard let index = requests.firstIndex(where: { $0.id == id && $0.deliveredAt == nil }) else { return }
        requests[index].deliveredAt = Date()
        if let encoded = try? JSONEncoder().encode(requests) {
            defaults.set(encoded, forKey: PreferenceKey.softwareRequests)
        }
    }

    private func loadShortcutLibrary(from bundle: Bundle) {
        let resources = [
            ResourceDescriptor(name: "shortcuts-mac", mergeMode: .merge),
            ResourceDescriptor(name: "office-shortcuts-mac", mergeMode: .merge),
            ResourceDescriptor(name: "professional-shortcuts-mac", mergeMode: .merge),
            ResourceDescriptor(name: "productivity-shortcuts-mac", mergeMode: .merge),
            ResourceDescriptor(name: "ecosystem-shortcuts-mac", mergeMode: .replace),
            ResourceDescriptor(name: "verified-shortcuts-mac", mergeMode: .replace),
            ResourceDescriptor(name: "supplemental-shortcuts-mac", mergeMode: .replace),
            ResourceDescriptor(name: "browser-reviewed-shortcuts-mac", mergeMode: .replace),
            ResourceDescriptor(name: "extended-shortcuts-mac", mergeMode: .merge),
            ResourceDescriptor(name: "curated-shortcuts-mac", mergeMode: .replace),
            ResourceDescriptor(name: "curated-supplements-mac", mergeMode: .merge),
        ]

        var mergedPacks: [SoftwarePack] = []
        var indexByID: [String: Int] = [:]
        var warnings: [String] = []

        for resource in resources {
            guard let url = bundle.url(forResource: resource.name, withExtension: "json") else {
                warnings.append("\(resource.name).json is missing from the app bundle.")
                continue
            }

            do {
                let data = try Data(contentsOf: url, options: .mappedIfSafe)
                let packs = try JSONDecoder().decode(ShortcutLibrary.self, from: data).software
                for rawPack in packs {
                    guard let pack = sanitized(rawPack, source: resource.name, warnings: &warnings) else {
                        continue
                    }
                    if let index = indexByID[pack.id] {
                        switch resource.mergeMode {
                        case .merge:
                            mergedPacks[index] = merge(base: mergedPacks[index], overlay: pack)
                        case .replace:
                            mergedPacks[index] = pack
                        }
                    } else {
                        indexByID[pack.id] = mergedPacks.count
                        mergedPacks.append(pack)
                    }
                }
            } catch {
                warnings.append("\(resource.name).json could not be loaded: \(error.localizedDescription)")
            }
        }

        guard !mergedPacks.isEmpty else {
            loadError = warnings.joined(separator: "\n")
            dataWarnings = warnings
            return
        }

        software = mergedPacks
        softwareByID = Dictionary(uniqueKeysWithValues: mergedPacks.map { ($0.id, $0) })
        softwareIDByBundleIdentifier = mergedPacks.reduce(
            into: Self.fallbackSoftwareIDByBundleIdentifier
        ) { result, pack in
            for bundleIdentifier in pack.bundleIdentifiers ?? [] {
                result[bundleIdentifier.lowercased()] = pack.id
            }
        }
        groupedSoftwareCache = SoftwareGroup.allCases.compactMap { group in
            let members = mergedPacks.filter { $0.group == group }
            return members.isEmpty ? nil : SoftwareGroupSection(group: group, software: members)
        }
        removeStaleSoftwarePickerPreferences()
        buildSearchIndex()

        if softwareByID[selectedSoftwareID] == nil {
            selectedSoftwareID = software.first?.id ?? "figma"
            defaults.set(selectedSoftwareID, forKey: PreferenceKey.software)
        }

        if warnings.isEmpty {
            removeStaleFavorites()
        }
        dataWarnings = warnings
    }

    private func sanitized(
        _ pack: SoftwarePack,
        source: String,
        warnings: inout [String]
    ) -> SoftwarePack? {
        guard !pack.id.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
              !pack.name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            warnings.append("\(source).json contains a software pack with an empty id or name.")
            return nil
        }

        if pack.isCatalogOnly, pack.categories.isEmpty {
            return pack
        }

        var seenCategoryIDs = Set<String>()
        var seenItemIDs = Set<String>()
        var categories: [ShortcutCategory] = []

        for category in pack.categories {
            guard !category.id.isEmpty, seenCategoryIDs.insert(category.id).inserted else {
                warnings.append("\(source).json: \(pack.id) has a duplicate or empty category id '\(category.id)'.")
                continue
            }

            let items = category.items.filter { item in
                guard !item.id.isEmpty, seenItemIDs.insert(item.id).inserted else {
                    warnings.append("\(source).json: \(pack.id) has a duplicate or empty shortcut id '\(item.id)'.")
                    return false
                }
                guard !item.keys.isEmpty,
                      !item.en.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
                      !item.zh.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
                    warnings.append("\(source).json: \(pack.id)/\(item.id) has an empty key or title.")
                    return false
                }
                if item.keys.contains(where: { $0.localizedCaseInsensitiveContains("windows") || $0 == "⊞" }) {
                    warnings.append("\(source).json: \(pack.id)/\(item.id) contains a Windows-only key and was skipped.")
                    return false
                }
                return true
            }

            guard !items.isEmpty else { continue }
            categories.append(
                ShortcutCategory(id: category.id, zh: category.zh, en: category.en, items: items)
            )
        }

        guard !categories.isEmpty else {
            warnings.append("\(source).json: \(pack.id) contains no valid shortcut categories.")
            return nil
        }

        return SoftwarePack(
            id: pack.id,
            name: pack.name,
            vendor: pack.vendor,
            accent: pack.accent,
            glyph: pack.glyph,
            bundleIdentifiers: pack.bundleIdentifiers,
            declaredGroup: pack.declaredGroup,
            dataStatus: pack.dataStatus,
            categories: categories,
            provenance: pack.provenance
        )
    }

    private func merge(base: SoftwarePack, overlay: SoftwarePack) -> SoftwarePack {
        var categories = base.categories
        var categoryIndex = Dictionary(uniqueKeysWithValues: categories.enumerated().map { ($0.element.id, $0.offset) })

        for overlayCategory in overlay.categories {
            guard let index = categoryIndex[overlayCategory.id] else {
                categoryIndex[overlayCategory.id] = categories.count
                categories.append(overlayCategory)
                continue
            }

            let baseCategory = categories[index]
            var items = baseCategory.items
            var itemIndex = Dictionary(uniqueKeysWithValues: items.enumerated().map { ($0.element.id, $0.offset) })
            for item in overlayCategory.items {
                if let existing = itemIndex[item.id] {
                    items[existing] = item
                } else {
                    itemIndex[item.id] = items.count
                    items.append(item)
                }
            }
            categories[index] = ShortcutCategory(
                id: overlayCategory.id,
                zh: overlayCategory.zh,
                en: overlayCategory.en,
                items: items
            )
        }

        return SoftwarePack(
            id: overlay.id,
            name: overlay.name,
            vendor: overlay.vendor,
            accent: overlay.accent,
            glyph: overlay.glyph,
            bundleIdentifiers: overlay.bundleIdentifiers ?? base.bundleIdentifiers,
            declaredGroup: overlay.declaredGroup ?? base.declaredGroup,
            dataStatus: overlay.dataStatus ?? base.dataStatus,
            categories: categories,
            provenance: overlay.provenance ?? base.provenance
        )
    }

    private func buildSearchIndex() {
        var documents: [String: SearchDocument] = [:]
        for pack in software {
            for category in pack.categories {
                let normalizedCategory = normalize("\(category.zh) \(category.en)")
                for item in category.items {
                    let normalizedTitles = [normalize(item.zh), normalize(item.en)]
                    let keySequences = [item.keys, item.keysZh, item.keysEn]
                        .compactMap { $0 }
                    let normalizedKeyVariants = Array(
                        Set(keySequences.map { normalize($0.joined(separator: " ")) })
                    ).sorted()
                    let normalizedTitle = normalizedTitles.joined(separator: " ")
                    let normalizedKeys = normalizedKeyVariants.joined(separator: " ")
                    let normalizedTags = normalize(item.tags.joined(separator: " "))
                    let haystack = [normalizedTitle, normalizedKeys, normalizedTags, normalizedCategory]
                        .joined(separator: " ")
                    documents[searchKey(softwareID: pack.id, itemID: item.id)] = SearchDocument(
                        titleVariants: normalizedTitles,
                        keyVariants: normalizedKeyVariants,
                        title: normalizedTitle,
                        keys: normalizedKeys,
                        tags: normalizedTags,
                        category: normalizedCategory,
                        haystack: haystack,
                        tokens: Set(haystack.split(separator: " ").map(String.init))
                    )
                }
            }
        }
        searchDocuments = documents
    }

    private func removeStaleFavorites() {
        let validKeys = Set(searchDocuments.keys)
        let cleaned = favorites.intersection(validKeys)
        guard cleaned != favorites else { return }
        favorites = cleaned
        favoritesRevision &+= 1
        defaults.set(Array(cleaned).sorted(), forKey: PreferenceKey.favorites)
    }

    private func removeStaleSoftwarePickerPreferences() {
        let validSoftwareIDs = Set(softwareByID.keys)
        let sanitizedPinnedSoftwareIDs = pinnedSoftwareIDs.reduce(into: [String]()) { result, id in
            guard validSoftwareIDs.contains(id), !result.contains(id) else { return }
            result.append(id)
        }
        if sanitizedPinnedSoftwareIDs != pinnedSoftwareIDs {
            pinnedSoftwareIDs = sanitizedPinnedSoftwareIDs
            defaults.set(pinnedSoftwareIDs, forKey: PreferenceKey.pinnedSoftware)
        }

        let availableGroups = Set(groupedSoftwareCache.map(\.group))
        let sanitizedCollapsedGroups = collapsedSoftwareGroups.intersection(availableGroups)
        if sanitizedCollapsedGroups != collapsedSoftwareGroups {
            collapsedSoftwareGroups = sanitizedCollapsedGroups
            defaults.set(
                collapsedSoftwareGroups.map(\.rawValue).sorted(),
                forKey: PreferenceKey.collapsedSoftwareGroups
            )
        }
    }

    private func searchScore(_ document: SearchDocument, query: String, tokens: [String]) -> Int {
        var score = 0
        if document.keyVariants.contains(query) { score += 1_200 }
        else if document.keyVariants.contains(where: { $0.hasPrefix(query) }) { score += 900 }
        else if document.keyVariants.contains(where: { $0.contains(query) }) { score += 700 }

        if document.titleVariants.contains(query) { score += 1_000 }
        else if document.titleVariants.contains(where: { $0.hasPrefix(query) }) { score += 800 }
        else if document.titleVariants.contains(where: { $0.contains(query) }) { score += 600 }

        if document.tags.contains(query) { score += 300 }
        if document.category.contains(query) { score += 150 }
        score += tokens.reduce(0) { partial, token in
            partial
                + (document.title.contains(token) ? 40 : 0)
                + (document.keys.contains(token) ? 35 : 0)
                + (document.tags.contains(token) ? 15 : 0)
        }
        return score
    }

    private func tokenMatches(_ token: String, in document: SearchDocument) -> Bool {
        if token.unicodeScalars.count == 1,
           let scalar = token.unicodeScalars.first,
           scalar.isASCII {
            return document.tokens.contains(token)
        }
        return document.haystack.contains(token)
    }

    private func searchKey(softwareID: String, itemID: String) -> String {
        "\(softwareID):\(itemID)"
    }

    private func normalize(_ value: String) -> String {
        var result = value
            .folding(options: [.caseInsensitive, .diacriticInsensitive, .widthInsensitive], locale: .current)
            .lowercased()

        let modifierAndNavigationAliases: [(String, String)] = [
            ("⌘", " cmd "), ("⌥", " option "), ("⌃", " control "), ("⇧", " shift "),
            ("⌫", " delete "), ("⌦", " forwarddelete "), ("↩", " return "), ("⏎", " return "),
            ("⎋", " esc "), ("←", " left "), ("→", " right "), ("↑", " up "), ("↓", " down "),
        ]
        for (symbol, alias) in modifierAndNavigationAliases {
            result = result.replacingOccurrences(of: symbol, with: alias)
        }

        // A plus or hyphen between chord tokens is a separator (Cmd+K,
        // Command-K), while a trailing sign is the actual + or - key.
        result = result.replacingOccurrences(
            of: "([\\p{L}\\p{N}])\\s*[+-]\\s*(?=[\\p{L}\\p{N}\\[\\]\\\\/])",
            with: "$1 ",
            options: .regularExpression
        )
        result = result.replacingOccurrences(of: "++", with: " plus ")

        let punctuationAliases: [(String, String)] = [
            ("+", " plus "), ("-", " minus "), ("/", " slash "), ("\\", " backslash "),
            ("[", " leftbracket "), ("]", " rightbracket "), (",", " comma "), (".", " period "),
        ]
        for (symbol, alias) in punctuationAliases {
            result = result.replacingOccurrences(of: symbol, with: alias)
        }

        result = result.replacingOccurrences(
            of: "[^\\p{L}\\p{N}]+",
            with: " ",
            options: .regularExpression
        )

        let wordAliases: [String: String] = [
            "command": "cmd", "cmd": "cmd", "命令": "cmd",
            "option": "option", "opt": "option", "alt": "option", "选项": "option",
            "control": "control", "ctrl": "control", "ctl": "control", "控制": "control",
            "shift": "shift", "上档": "shift", "换档": "shift",
            "return": "return", "enter": "return", "回车": "return",
            "escape": "esc", "esc": "esc",
            "backspace": "delete", "delete": "delete", "删除": "delete",
            "arrow": "", "箭头": "",
            "left": "left", "左": "left", "right": "right", "右": "right",
            "up": "up", "上": "up", "down": "down", "下": "down",
        ]

        return result
            .split(whereSeparator: \Character.isWhitespace)
            .map(String.init)
            .map { wordAliases[$0] ?? $0 }
            .filter { !$0.isEmpty }
            .joined(separator: " ")
    }
}
