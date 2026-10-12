import Foundation

struct ShortcutLibrary: Decodable {
    let software: [SoftwarePack]
}

struct SoftwarePack: Identifiable, Decodable, Hashable {
    let id: String
    let name: String
    let vendor: String
    let accent: String
    let glyph: String
    let bundleIdentifiers: [String]?
    let declaredGroup: SoftwareGroup?
    let dataStatus: SoftwareDataStatus?
    let categories: [ShortcutCategory]
    let provenance: ShortcutProvenance?

    private enum CodingKeys: String, CodingKey {
        case id
        case name
        case vendor
        case accent
        case glyph
        case bundleIdentifiers
        case declaredGroup = "group"
        case dataStatus
        case categories
        case provenance
    }

    var shortcutCount: Int {
        categories.reduce(0) { $0 + $1.items.count }
    }

    var isCatalogOnly: Bool {
        dataStatus == .catalogOnly
    }

    var group: SoftwareGroup {
        if let declaredGroup { return declaredGroup }
        switch id {
        case "word", "excel", "powerpoint", "outlook", "onenote":
            return .office
        case "pages", "numbers", "keynote":
            return .office
        case "obsidian", "jupyter", "spss", "rstudio":
            return .study
        case "figma", "photoshop", "illustrator", "affinitydesigner", "affinityphoto", "affinitypublisher", "sketch":
            return .design
        case "autocad", "sketchup", "rhino":
            return .architecture
        case "fusion360", "freecad", "shapr3d":
            return .engineering
        case "blender", "maya", "cinema4d":
            return .modeling
        case "comsol", "matlab", "simulink":
            return .simulation
        case "vscode", "xcode", "androidstudio", "intellij", "terminal", "iterm2":
            return .development
        case "chrome", "safari", "firefox":
            return .browser
        case "notion":
            return .collaboration
        case "finder":
            return .macUtility
        case "premiere", "aftereffects", "davinci":
            return .media
        default:
            return .other
        }
    }
}

enum SoftwareDataStatus: String, Decodable, Hashable {
    case sourceBacked
    case curated
    case manualReview
    case legacyReviewed
    case catalogOnly
}

struct ShortcutProvenance: Decodable, Hashable {
    let sourceURL: String?
    let sourceTitle: String?
    let appVersion: String?
    let verifiedAt: String?
    let coverage: String?
    let platform: String?
}

enum SoftwareGroup: String, CaseIterable, Identifiable, Decodable {
    case office
    case study
    case design
    case media
    case architecture
    case engineering
    case modeling
    case simulation
    case development
    case versionControl
    case databaseAPI
    case dataAI
    case electronics
    case biology
    case chemistry
    case medical
    case gameDevelopment
    case collaboration
    case browser
    case macUtility
    case other

    var id: String { rawValue }

    func title(for language: AppLanguage) -> String {
        switch (self, language) {
        case (.office, .zh): return "办公软件"
        case (.office, .en): return "Office"
        case (.study, .zh): return "学习与科研"
        case (.study, .en): return "Study & Research"
        case (.design, .zh): return "设计创意"
        case (.design, .en): return "Design"
        case (.media, .zh): return "媒体制作"
        case (.media, .en): return "Media"
        case (.architecture, .zh): return "建筑设计"
        case (.architecture, .en): return "Architecture"
        case (.engineering, .zh): return "工程制图"
        case (.engineering, .en): return "Engineering"
        case (.modeling, .zh): return "三维与动画"
        case (.modeling, .en): return "3D & Animation"
        case (.simulation, .zh): return "仿真与计算"
        case (.simulation, .en): return "Simulation"
        case (.development, .zh): return "软件开发"
        case (.development, .en): return "Development"
        case (.versionControl, .zh): return "版本控制与 DevOps"
        case (.versionControl, .en): return "Version Control & DevOps"
        case (.databaseAPI, .zh): return "数据库与 API"
        case (.databaseAPI, .en): return "Database & API"
        case (.dataAI, .zh): return "数据与智能"
        case (.dataAI, .en): return "Data & AI"
        case (.electronics, .zh): return "电子与电气"
        case (.electronics, .en): return "Electronics & Electrical"
        case (.biology, .zh): return "生物科学"
        case (.biology, .en): return "Biological Science"
        case (.chemistry, .zh): return "化学与材料"
        case (.chemistry, .en): return "Chemistry & Materials"
        case (.medical, .zh): return "医学影像"
        case (.medical, .en): return "Medical Imaging"
        case (.gameDevelopment, .zh): return "游戏开发"
        case (.gameDevelopment, .en): return "Game Development"
        case (.collaboration, .zh): return "协作与项目管理"
        case (.collaboration, .en): return "Collaboration & Projects"
        case (.browser, .zh): return "浏览器"
        case (.browser, .en): return "Browsers"
        case (.macUtility, .zh): return "macOS 效率工具"
        case (.macUtility, .en): return "macOS Utilities"
        case (.other, .zh): return "浏览器与效率工具"
        case (.other, .en): return "Browsers & Productivity"
        }
    }
}

struct SoftwareGroupSection: Identifiable {
    let group: SoftwareGroup
    let software: [SoftwarePack]

    var id: SoftwareGroup { group }
}

struct ShortcutCategory: Identifiable, Decodable, Hashable {
    let id: String
    let zh: String
    let en: String
    let items: [ShortcutItem]

    func title(for language: AppLanguage) -> String {
        language == .zh ? zh : en
    }
}

struct ShortcutItem: Identifiable, Decodable, Hashable {
    let id: String
    let keys: [String]
    let keysZh: [String]?
    let keysEn: [String]?
    let zh: String
    let en: String
    let tags: [String]

    func title(for language: AppLanguage) -> String {
        let localizedTitle: String
        if language == .zh {
            localizedTitle = zh
            .replacingOccurrences(of: " px", with: " 像素")
            .replacingOccurrences(of: "RAM", with: "内存")
        } else {
            localizedTitle = en
        }
        return Self.removingTerminalChinesePeriods(from: localizedTitle)
    }

    private static func removingTerminalChinesePeriods(from value: String) -> String {
        var cleaned = value.trimmingCharacters(in: .whitespacesAndNewlines)
        while cleaned.last == "。" {
            cleaned.removeLast()
            cleaned = cleaned.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        return cleaned
    }

    func keys(for language: AppLanguage) -> [String] {
        if language == .zh {
            return keysZh ?? keys
        }
        return (keysEn ?? keys).map { Self.englishKeyLabels[$0] ?? $0 }
    }

    var allKeyLabels: [String] {
        keys + (keysZh ?? []) + (keysEn ?? [])
    }

    private static let englishKeyLabels: [String: String] = [
        "拖动": "Drag",
        "滚轮": "Wheel",
        "点击": "Click",
        "右键": "Right click",
        "悬停": "Hover",
        "方向键": "Arrow keys",
        "双击": "Double click",
        "点击拖动": "Click-drag",
        "拖动节点": "Drag node",
        "属性快捷键": "Property shortcut",
        "点击菜单": "Menu command",
        "中键拖动": "Middle-drag",
        "中键点击": "Middle click",
        "左键拖动": "Left-drag",
        "右键拖动": "Right-drag",
        "数字": "Number",
    ]
}

enum AppLanguage: String, CaseIterable {
    case zh
    case en

    private static let preferenceKey = "KeyFloatLanguage"
    private static let englishDefaultMigrationKey = "KeyFloatEnglishDefaultV2"

    static func load(from defaults: UserDefaults = .standard) -> AppLanguage {
        guard defaults.bool(forKey: englishDefaultMigrationKey) else {
            defaults.set(AppLanguage.en.rawValue, forKey: preferenceKey)
            defaults.set(true, forKey: englishDefaultMigrationKey)
            return .en
        }
        return AppLanguage(rawValue: defaults.string(forKey: preferenceKey) ?? AppLanguage.en.rawValue) ?? .en
    }
}

enum AppTheme: String, CaseIterable {
    case dark
    case light
}

struct ShortcutSection: Identifiable {
    let category: ShortcutCategory
    let items: [ShortcutItem]

    var id: String { category.id }
}
