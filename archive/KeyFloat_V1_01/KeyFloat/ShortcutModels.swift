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
    let categories: [ShortcutCategory]

    var shortcutCount: Int {
        categories.reduce(0) { $0 + $1.items.count }
    }

    var group: SoftwareGroup {
        switch id {
        case "word", "excel", "powerpoint", "outlook", "onenote":
            return .office
        case "figma", "photoshop", "illustrator":
            return .design
        case "autocad", "sketchup", "rhino":
            return .architecture
        case "fusion360", "freecad", "shapr3d":
            return .engineering
        case "blender", "maya", "cinema4d":
            return .modeling
        case "comsol", "matlab", "simulink":
            return .simulation
        case "vscode", "xcode", "androidstudio", "intellij":
            return .development
        case "jupyter", "spss", "rstudio":
            return .dataAI
        case "premiere", "aftereffects", "davinci":
            return .media
        case "chrome", "safari", "notion", "obsidian":
            return .other
        default:
            return .other
        }
    }
}

enum SoftwareGroup: String, CaseIterable, Identifiable {
    case office
    case design
    case architecture
    case engineering
    case modeling
    case simulation
    case development
    case dataAI
    case media
    case other

    var id: String { rawValue }

    func title(for language: AppLanguage) -> String {
        switch (self, language) {
        case (.office, .zh): return "办公软件"
        case (.office, .en): return "Office"
        case (.design, .zh): return "设计创意"
        case (.design, .en): return "Design"
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
        case (.dataAI, .zh): return "数据与智能"
        case (.dataAI, .en): return "Data & AI"
        case (.media, .zh): return "媒体制作"
        case (.media, .en): return "Media"
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
    let zh: String
    let en: String
    let tags: [String]

    func title(for language: AppLanguage) -> String {
        guard language == .zh else { return en }
        return zh
            .replacingOccurrences(of: " px", with: " 像素")
            .replacingOccurrences(of: "RAM", with: "内存")
    }

    func keys(for language: AppLanguage) -> [String] {
        guard language == .en else { return keys }
        return keys.map { Self.englishKeyLabels[$0] ?? $0 }
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
