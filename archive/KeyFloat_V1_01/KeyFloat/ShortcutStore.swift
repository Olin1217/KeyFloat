import Foundation

@MainActor
final class ShortcutStore: ObservableObject {
    @Published private(set) var software: [SoftwarePack] = []
    @Published private(set) var loadError: String?
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

    private struct FilterCacheKey: Equatable {
        let softwareID: String
        let categoryID: String
        let query: String
        let favoriteOnly: Bool
        let favoritesRevision: Int
    }

    private var softwareByID: [String: SoftwarePack] = [:]
    private var cachedFilterKey: FilterCacheKey?
    private var cachedFilteredSections: [ShortcutSection] = []
    private var favoritesRevision = 0

    private enum PreferenceKey {
        static let software = "KeyFloatSoftware"
        static let language = "KeyFloatLanguage"
        static let theme = "KeyFloatTheme"
        static let pinned = "KeyFloatPinned"
        static let favorites = "KeyFloatFavorites"
    }

    init(bundle: Bundle = .main, defaults: UserDefaults = .standard) {
        selectedSoftwareID = defaults.string(forKey: PreferenceKey.software) ?? "figma"
        language = AppLanguage(
            rawValue: defaults.string(forKey: PreferenceKey.language) ?? "en"
        ) ?? .en
        theme = AppTheme(
            rawValue: defaults.string(forKey: PreferenceKey.theme) ?? "dark"
        ) ?? .dark
        isPinned = defaults.object(forKey: PreferenceKey.pinned) as? Bool ?? true
        favorites = Set(defaults.stringArray(forKey: PreferenceKey.favorites) ?? [])

        do {
            let resourceNames = [
                "shortcuts-mac",
                "office-shortcuts-mac",
                "professional-shortcuts-mac",
                "productivity-shortcuts-mac",
                "verified-shortcuts-mac",
            ]
            let loadedPacks = try resourceNames.flatMap { resourceName -> [SoftwarePack] in
                guard let url = bundle.url(forResource: resourceName, withExtension: "json") else {
                    throw ShortcutLibraryLoadError.missingResource(resourceName)
                }
                let data = try Data(contentsOf: url)
                return try JSONDecoder().decode(ShortcutLibrary.self, from: data).software
            }

            var mergedPacks: [SoftwarePack] = []
            var indexByID: [String: Int] = [:]
            for pack in loadedPacks {
                if let index = indexByID[pack.id] {
                    mergedPacks[index] = pack
                } else {
                    indexByID[pack.id] = mergedPacks.count
                    mergedPacks.append(pack)
                }
            }
            software = mergedPacks
            softwareByID = Dictionary(uniqueKeysWithValues: software.map { ($0.id, $0) })
            if !software.contains(where: { $0.id == selectedSoftwareID }) {
                selectedSoftwareID = software.first?.id ?? "figma"
            }
        } catch {
            loadError = error.localizedDescription
        }
    }

    var selectedSoftware: SoftwarePack? {
        softwareByID[selectedSoftwareID] ?? software.first
    }

    var groupedSoftware: [SoftwareGroupSection] {
        SoftwareGroup.allCases.compactMap { group in
            let members = software.filter { $0.group == group }
            return members.isEmpty ? nil : SoftwareGroupSection(group: group, software: members)
        }
    }

    var filteredSections: [ShortcutSection] {
        let cacheKey = FilterCacheKey(
            softwareID: selectedSoftwareID,
            categoryID: selectedCategoryID,
            query: query,
            favoriteOnly: favoriteOnly,
            favoritesRevision: favoritesRevision
        )
        if cachedFilterKey == cacheKey {
            return cachedFilteredSections
        }

        guard let selectedSoftware else { return [] }
        let tokens = normalized(query).split(separator: " ").map(String.init)

        let sections: [ShortcutSection] = selectedSoftware.categories.compactMap { category -> ShortcutSection? in
            guard selectedCategoryID == "all" || selectedCategoryID == category.id else {
                return nil
            }

            let items = category.items.filter { item in
                if favoriteOnly && !favorites.contains(favoriteKey(for: item)) {
                    return false
                }
                if tokens.isEmpty { return true }

                let haystack = normalized(
                    ([item.zh, item.en, category.zh, category.en] + item.keys + item.tags)
                        .joined(separator: " ")
                )
                return tokens.allSatisfy(haystack.contains)
            }

            return items.isEmpty ? nil : ShortcutSection(category: category, items: items)
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
        if softwareChanged { selectedSoftwareID = id }
        if selectedCategoryID != "all" { selectedCategoryID = "all" }
        if favoriteOnly { favoriteOnly = false }
        if !query.isEmpty { query = "" }
        if softwareChanged {
            UserDefaults.standard.set(id, forKey: PreferenceKey.software)
        }
    }

    func toggleLanguage() {
        language = language == .zh ? .en : .zh
        UserDefaults.standard.set(language.rawValue, forKey: PreferenceKey.language)
    }

    func toggleTheme() {
        theme = theme == .dark ? .light : .dark
        UserDefaults.standard.set(theme.rawValue, forKey: PreferenceKey.theme)
    }

    func setPinned(_ pinned: Bool) {
        isPinned = pinned
        UserDefaults.standard.set(pinned, forKey: PreferenceKey.pinned)
    }

    func requestEscape() {
        escapeRequestID &+= 1
    }

    func requestDismissSearch() {
        dismissSearchRequestID &+= 1
    }

    func favoriteKey(for item: ShortcutItem) -> String {
        "\(selectedSoftwareID):\(item.id)"
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
        favoritesRevision += 1
        UserDefaults.standard.set(Array(favorites).sorted(), forKey: PreferenceKey.favorites)
    }

    private func normalized(_ value: String) -> String {
        value
            .lowercased()
            .replacingOccurrences(of: "command", with: "cmd")
            .replacingOccurrences(of: "control", with: "ctrl")
            .replacingOccurrences(of: "option", with: "alt")
            .replacingOccurrences(of: "⌘", with: "cmd")
            .replacingOccurrences(of: "⌥", with: "alt")
            .replacingOccurrences(of: "⌃", with: "ctrl")
            .replacingOccurrences(of: "⇧", with: "shift")
            .split(whereSeparator: \Character.isWhitespace)
            .joined(separator: " ")
    }
}

private enum ShortcutLibraryLoadError: LocalizedError {
    case missingResource(String)

    var errorDescription: String? {
        switch self {
        case .missingResource(let name):
            return "\(name).json is missing from the app bundle."
        }
    }
}
