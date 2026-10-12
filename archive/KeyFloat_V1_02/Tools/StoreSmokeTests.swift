import Foundation

private enum SmokeTestFailure: Error, CustomStringConvertible {
    case failed(String)

    var description: String {
        switch self {
        case .failed(let message): return message
        }
    }
}

@main
@MainActor
struct StoreSmokeTests {
    static func main() {
        do {
            try run()
            print("Store smoke tests passed.")
        } catch {
            fputs("Store smoke tests failed: \(error)\n", stderr)
            exit(1)
        }
    }

    private static func run() throws {
        guard CommandLine.arguments.count == 2,
              let bundle = Bundle(path: CommandLine.arguments[1]) else {
            throw SmokeTestFailure.failed("Pass the built KeyFloat.app path as the only argument.")
        }

        let suiteName = "KeyFloat.StoreSmokeTests.\(UUID().uuidString)"
        guard let defaults = UserDefaults(suiteName: suiteName) else {
            throw SmokeTestFailure.failed("Unable to create isolated UserDefaults.")
        }
        defer { defaults.removePersistentDomain(forName: suiteName) }
        defaults.set(["missing-software:stale-shortcut"], forKey: "KeyFloatFavorites")

        let store = ShortcutStore(bundle: bundle, defaults: defaults)
            try expect(store.loadError == nil, "The packaged library should load without an error.")
            try expect(store.dataWarnings.isEmpty, "The packaged library should load without warnings.")
            try expect(store.language == .en, "A fresh installation must default to English.")
            try expect(store.software.count == 209, "Expected 209 merged software entries, got \(store.software.count).")

            let total = store.software.reduce(0) { $0 + $1.shortcutCount }
            try expect(total == 4_204, "Expected 4,204 displayed shortcuts, got \(total).")
            try expect(store.favorites.isEmpty, "Stale favorites should be removed after a clean data load.")

            let designIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .design })?.software.map(\.id) ?? []
            )
            let developmentIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .development })?.software.map(\.id) ?? []
            )
            let studyIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .study })?.software.map(\.id) ?? []
            )
            let browserIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .browser })?.software.map(\.id) ?? []
            )
            let versionControlIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .versionControl })?.software.map(\.id) ?? []
            )
            let databaseAPIIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .databaseAPI })?.software.map(\.id) ?? []
            )
            let collaborationIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .collaboration })?.software.map(\.id) ?? []
            )
            let macUtilityIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .macUtility })?.software.map(\.id) ?? []
            )
            let electronicsIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .electronics })?.software.map(\.id) ?? []
            )
            let biologyIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .biology })?.software.map(\.id) ?? []
            )
            let chemistryIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .chemistry })?.software.map(\.id) ?? []
            )
            let medicalIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .medical })?.software.map(\.id) ?? []
            )
            let gameDevelopmentIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .gameDevelopment })?.software.map(\.id) ?? []
            )
            try expect(designIDs.contains("affinitydesigner"), "Affinity Designer must be in Design.")
            try expect(designIDs.contains("affinityphoto"), "Affinity Photo must be in Design.")
            try expect(designIDs.contains("affinitypublisher"), "Affinity Publisher must be in Design.")
            try expect(developmentIDs.contains("terminal"), "Terminal must be in Development.")
            try expect(developmentIDs.contains("cursor"), "Cursor must be in Development.")
            try expect(studyIDs.contains("zotero"), "Zotero must be in Study & Research.")
            try expect(studyIDs.contains("obsidian"), "Obsidian must be in Study & Research.")
            try expect(browserIDs.contains("chrome"), "Chrome must be in Browsers.")
            try expect(browserIDs.contains("arc"), "Arc must be in Browsers.")
            try expect(versionControlIDs.contains("githubdesktop"), "GitHub Desktop must be in Version Control & DevOps.")
            try expect(databaseAPIIDs.contains("postman"), "Postman must be in Database & API.")
            try expect(collaborationIDs.contains("jira"), "Jira must be in Collaboration & Projects.")
            try expect(macUtilityIDs.contains("finder"), "Finder must be in macOS Utilities.")
            try expect(macUtilityIDs.contains("raycast"), "Raycast must be in macOS Utilities.")
            try expect(electronicsIDs.contains("labview"), "LabVIEW must be in Electronics & Electrical.")
            try expect(electronicsIDs.contains("plecs"), "PLECS must be in Electronics & Electrical.")
            try expect(biologyIDs.contains("benchling"), "Benchling must be in Biological Science.")
            try expect(biologyIDs.contains("geneious"), "Geneious must be in Biological Science.")
            try expect(biologyIDs.contains("vmd"), "VMD must be in Biological Science.")
            try expect(chemistryIDs.contains("avogadro"), "Avogadro must be in Chemistry & Materials.")
            try expect(medicalIDs.contains("slicer"), "3D Slicer must be in Medical Imaging.")
            try expect(gameDevelopmentIDs.contains("godot"), "Godot must be in Game Development.")
            try expect(electronicsIDs.contains("stm32cubeide"), "STM32CubeIDE must be in Electronics & Electrical.")
            try expect(biologyIDs.contains("chimerax"), "ChimeraX must be in Biological Science.")
            try expect(chemistryIDs.contains("marvinsketch"), "MarvinSketch must be in Chemistry & Materials.")
            try expect(medicalIDs.contains("osirix"), "OsiriX must be in Medical Imaging.")
            try expect(gameDevelopmentIDs.contains("houdini"), "Houdini must be in Game Development.")

            store.selectSoftware("terminal")
            try expect(store.selectedSoftware?.shortcutCount == 98, "Terminal should contain 98 official shortcuts.")

            store.selectSoftware("aftereffects")
            try expect(store.selectedSoftware?.shortcutCount == 717, "After Effects should contain 717 installed default bindings.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "complete-official-installed-default-preset",
                "After Effects must retain its installed official preset provenance."
            )

            store.selectSoftware("sketch")
            try expect(store.selectedSoftware?.isCatalogOnly == true, "Sketch's former template data must be quarantined.")
            try expect(store.selectedSoftware?.shortcutCount == 0, "Catalog-only software must not expose unverified shortcuts.")
            try expect(store.filteredSections.isEmpty, "Catalog-only software must have no searchable shortcut rows.")

            store.selectSoftware("chimerax")
            try expect(store.selectedSoftware?.isCatalogOnly == true, "ChimeraX must remain catalog-only until verified.")
            try expect(store.selectedSoftware?.shortcutCount == 0, "New catalog-only software must expose zero shortcuts.")

            store.selectSoftware("figma")
            try expect(store.selectedSoftware?.dataStatus == .manualReview, "Figma must retain its browser-source manual-review status.")
            try expect(store.selectedSoftware?.shortcutCount == 8, "Figma should expose only the eight browser-sourced review rows.")

            store.selectSoftware("photoshop")
            try expect(store.selectedSoftware?.shortcutCount == 52, "Photoshop should contain 52 installed-export selections.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "official-page-installed-export-selection",
                "Photoshop must retain installed-export provenance."
            )

            store.selectSoftware("matlab")
            try expect(store.selectedSoftware?.shortcutCount == 84, "MATLAB should contain 84 official macOS alternatives.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "complete-official-macos-column",
                "MATLAB must retain official macOS-column provenance."
            )

            for (softwareID, expectedCount) in [
                ("word", 216), ("excel", 273), ("powerpoint", 135), ("onenote", 84),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) official macOS shortcuts."
                )
                try expect(
                    store.selectedSoftware?.provenance?.coverage == "complete-official-macos-tab",
                    "\(softwareID) must retain its Microsoft macOS-tab provenance."
                )
            }

            for (softwareID, expectedCount) in [
                ("pages", 305), ("numbers", 306), ("keynote", 368),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) official Apple shortcuts."
                )
                try expect(
                    store.selectedSoftware?.provenance?.coverage == "complete-official-page",
                    "\(softwareID) must retain its Apple official-page provenance."
                )
            }

            store.selectSoftware("labview")
            try expect(store.selectedSoftware?.shortcutCount == 61, "LabVIEW should contain 61 source-backed shortcuts.")
            store.selectSoftware("avogadro")
            try expect(store.selectedSoftware?.shortcutCount == 73, "Avogadro should contain 73 source-backed shortcuts.")
            store.selectSoftware("slicer")
            try expect(store.selectedSoftware?.shortcutCount == 53, "3D Slicer should contain 53 source-backed shortcuts.")
            store.selectSoftware("godot")
            try expect(store.selectedSoftware?.shortcutCount == 39, "Godot should contain 39 source-backed shortcuts.")

            store.selectSoftware("safari")
            try expect(store.selectedSoftware?.shortcutCount == 64, "Safari should contain 64 official-page shortcuts.")
            store.selectSoftware("finder")
            try expect(store.selectedSoftware?.shortcutCount == 78, "Finder should contain 78 official shortcuts.")
            store.selectSoftware("illustrator")
            try expect(store.selectedSoftware?.shortcutCount == 366, "Illustrator should contain 366 official-page shortcuts.")
            store.selectSoftware("affinityphoto")
            try expect(store.selectedSoftware?.shortcutCount == 272, "Affinity Photo should contain 272 official shortcuts.")
            store.selectSoftware("affinitypublisher")
            try expect(store.selectedSoftware?.shortcutCount == 204, "Affinity Publisher should contain 204 official shortcuts.")
            store.selectSoftware("terminal")

            store.query = "command k"
            let wordCommandResults = resultIDs(store)
            store.query = "⌘ K"
            let symbolCommandResults = resultIDs(store)
            store.query = "命令 K"
            let chineseCommandResults = resultIDs(store)
            store.query = "Cmd+K"
            let compactCommandResults = resultIDs(store)
            store.query = "Command-K"
            let hyphenCommandResults = resultIDs(store)
            try expect(!wordCommandResults.isEmpty, "Command-K search should return results.")
            try expect(wordCommandResults == symbolCommandResults, "Command and ⌘ searches should be equivalent.")
            try expect(wordCommandResults == chineseCommandResults, "命令 and Command searches should be equivalent.")
            try expect(wordCommandResults == compactCommandResults, "Cmd+K must treat + as a chord separator.")
            try expect(wordCommandResults == hyphenCommandResults, "Command-K must treat - as a chord separator.")

            store.selectSoftware("terminal")
            store.query = "cmd+k"
            let terminalCommandKResults = store.filteredSections.flatMap(\.items)
            try expect(
                terminalCommandKResults.contains(where: { $0.id == "terminal.work-with-marks-and-bookmarks.clear-to-start.command-k" }),
                "Cmd+K should find Terminal's Clear to start shortcut."
            )
            try expect(
                !terminalCommandKResults.contains(where: { $0.id == "terminal.work-with-terminal-windows-and-tabs.edit-background-color.option-command-i" }),
                "The K key must not match a letter inside the word background."
            )

            store.query = "clear to start"
            let clearResults = store.filteredSections.flatMap(\.items)
            try expect(
                clearResults.contains(where: { $0.en == "Clear to start" }),
                "English action search should find Clear to start."
            )
            try expect(
                store.filteredSections.first?.items.first?.en == "Clear to start",
                "An exact English title match should rank first across categories."
            )

            store.query = ""
            store.selectCategory("not-a-category")
            try expect(store.selectedCategoryID == "all", "Invalid categories must fall back to All.")
            store.selectSoftware("not-a-software")
            try expect(store.selectedSoftwareID == "terminal", "Invalid software selection must be ignored.")

            guard let clearItem = store.selectedSoftware?.categories
                .flatMap(\.items)
                .first(where: { $0.en == "Clear to start" }) else {
                throw SmokeTestFailure.failed("Clear to start fixture is missing.")
            }
            store.toggleFavorite(clearItem)
            try expect(store.isFavorite(clearItem), "A shortcut should become a favorite.")
            store.favoriteOnly = true
            try expect(store.shownCount == 1, "Favorite filtering should show the selected favorite only.")
            store.toggleFavorite(clearItem)
            try expect(store.shownCount == 0, "Removing a favorite should invalidate the filter cache.")

            store.favoriteOnly = false
            store.selectSoftware("safari")
            store.query = "cmd +"
            try expect(
                store.filteredSections.flatMap(\.items).contains(where: { $0.id == "safari.zoom-in" }),
                "A trailing + must remain searchable as the literal Plus key."
            )

            store.toggleLanguage()
            store.toggleTheme()
            store.setPinned(false)
            try expect(defaults.string(forKey: "KeyFloatLanguage") == "zh", "Language preference was not saved.")
            try expect(defaults.string(forKey: "KeyFloatTheme") == "light", "Theme preference was not saved.")
            try expect(defaults.bool(forKey: "KeyFloatPinned") == false, "Pinned preference was not saved.")

            store.submitFeedback(message: "   ", contact: "")
            try expect(
                defaults.data(forKey: "KeyFloatFeedbackReports") == nil,
                "Blank feedback must not be stored."
            )
            store.submitFeedback(message: "Search did not find a shortcut", contact: "tester@example.com")
            try expect(
                defaults.data(forKey: "KeyFloatFeedbackReports") != nil,
                "Valid feedback should be stored for later submission."
            )

            store.selectSoftware("affinitydesigner")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "complete-official-page",
                "Affinity Designer must retain official coverage metadata."
            )
            try expect(
                store.selectedSoftware?.categories.flatMap(\.items).contains(where: { $0.keysEn != nil }) == true,
                "Affinity Designer should contain localized key gestures."
            )

            store.query = "cmd"
            for _ in 0..<1_000 { _ = store.filteredSections }
        try expect(!store.filteredSections.isEmpty, "Repeated cached search must remain stable.")
    }

    private static func resultIDs(_ store: ShortcutStore) -> Set<String> {
        Set(store.filteredSections.flatMap(\.items).map(\.id))
    }

    private static func expect(_ condition: @autoclosure () -> Bool, _ message: String) throws {
        if !condition() { throw SmokeTestFailure.failed(message) }
    }
}
