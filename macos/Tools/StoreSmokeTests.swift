import Foundation

private enum SmokeTestFailure: Error, CustomStringConvertible {
    case failed(String)

    var description: String {
        switch self {
        case .failed(let message): return message
        }
    }
}

private struct LegacySoftwareRequest: Codable {
    let id: UUID
    let group: String
    let softwareName: String
    let contact: String
    let submittedAt: Date
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
        defaults.set(["figma", "missing-software", "figma", "word"], forKey: "KeyFloatPinnedSoftwareIDs")
        defaults.set([SoftwareGroup.office.rawValue, "missing-group"], forKey: "KeyFloatCollapsedSoftwareGroups")
        defaults.set(true, forKey: "KeyFloatPinnedSoftwareGroupCollapsed")
        defaults.set("zh", forKey: "KeyFloatLanguage")
        let legacySoftwareRequest = LegacySoftwareRequest(
            id: UUID(),
            group: SoftwareGroup.design.rawValue,
            softwareName: "Legacy Design App",
            contact: "legacy@example.com",
            submittedAt: Date(timeIntervalSince1970: 1_700_000_000)
        )
        defaults.set(
            try JSONEncoder().encode([legacySoftwareRequest]),
            forKey: "KeyFloatSoftwareRequests"
        )

        let store = ShortcutStore(bundle: bundle, defaults: defaults)
            try expect(store.loadError == nil, "The packaged library should load without an error.")
            try expect(store.dataWarnings.isEmpty, "The packaged library should load without warnings.")
            try expect(store.language == .en, "The V2 language migration must default to English.")
            try expect(store.software.count == 209, "Expected 209 merged software entries, got \(store.software.count).")

            let total = store.software.reduce(0) { $0 + $1.shortcutCount }
            try expect(total == 17_407, "Expected 17,407 displayed shortcuts, got \(total).")
            for language in AppLanguage.allCases {
                let titles = store.software
                    .flatMap(\.categories)
                    .flatMap(\.items)
                    .map { $0.title(for: language) }
                try expect(
                    titles.allSatisfy(hasCleanShortcutTitleBoundary),
                    "No displayed shortcut title may begin or end with unnecessary punctuation in \(language.rawValue)."
                )
            }
            try expect(
                store.software.allSatisfy { !$0.isCatalogOnly && $0.shortcutCount > 0 },
                "Every final software pack must expose non-empty macOS shortcuts."
            )
            try expect(store.favorites.isEmpty, "Stale favorites should be removed after a clean data load.")
            try expect(
                store.pinnedSoftwareIDs == ["figma", "word"],
                "Pinned software should preserve order while removing stale and duplicate IDs."
            )
            try expect(
                store.pinnedSoftware.map(\.id) == ["figma", "word"],
                "Pinned software should resolve to the corresponding software packs."
            )
            try expect(
                store.collapsedSoftwareGroups == [.office],
                "Collapsed software groups should remove unknown persisted values."
            )
            try expect(
                store.isPinnedSoftwareGroupCollapsed,
                "The pinned software section collapse preference should be restored."
            )

            store.toggleSoftwarePinned("figma")
            try expect(store.pinnedSoftwareIDs == ["word"], "A pinned software card should be removable.")
            store.toggleSoftwarePinned("photoshop")
            try expect(
                store.pinnedSoftwareIDs == ["photoshop", "word"],
                "Newly pinned software should be placed first in the pinned section."
            )
            try expect(
                !store.isPinnedSoftwareGroupCollapsed,
                "Pinning software should reveal the pinned section immediately."
            )
            try expect(
                defaults.stringArray(forKey: "KeyFloatPinnedSoftwareIDs") == ["photoshop", "word"],
                "Pinned software order should persist."
            )

            store.toggleSoftwareGroupCollapsed(.office)
            store.toggleSoftwareGroupCollapsed(.design)
            try expect(
                store.collapsedSoftwareGroups == [.design],
                "Software group collapse state should toggle independently."
            )
            try expect(
                defaults.stringArray(forKey: "KeyFloatCollapsedSoftwareGroups") == [SoftwareGroup.design.rawValue],
                "Software group collapse state should persist."
            )
            store.togglePinnedSoftwareGroupCollapsed()
            try expect(
                store.isPinnedSoftwareGroupCollapsed,
                "The pinned software section should support collapsing."
            )

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
            let dataAIIDs = Set(
                store.groupedSoftware.first(where: { $0.group == .dataAI })?.software.map(\.id) ?? []
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
            try expect(dataAIIDs.contains("chatgpt"), "ChatGPT must be in Data & AI.")
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

            for (softwareID, expectedCount) in [
                ("goodnotes", 14), ("overleaf", 18), ("texstudio", 29),
                ("xmind", 38), ("mindnode", 92),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) verified macOS shortcuts."
                )
                try expect(
                    store.selectedSoftware?.dataStatus == .sourceBacked &&
                    store.selectedSoftware?.provenance?.platform == "macOS" &&
                    store.selectedSoftware?.provenance?.verifiedAt == "2026-07-28",
                    "\(softwareID) must retain the 2026-07-28 source-backed macOS provenance."
                )
            }

            store.selectSoftware("aftereffects")
            try expect(store.selectedSoftware?.dataStatus == .sourceBacked, "After Effects should combine the installed preset with the reviewed macOS document.")
            try expect(store.selectedSoftware?.shortcutCount == 929, "After Effects should contain 929 deduplicated macOS shortcuts.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "official-source-cross-checked-markdown",
                "After Effects must retain its cross-checked macOS provenance."
            )

            store.selectSoftware("sketch")
            try expect(store.selectedSoftware?.dataStatus == .curated, "Sketch should use the curated macOS completion layer.")
            try expect(store.selectedSoftware?.shortcutCount == 206, "Sketch should contain 206 curated macOS shortcuts.")
            try expect(!store.filteredSections.isEmpty, "Sketch shortcuts must be searchable.")

            store.selectSoftware("chimerax")
            try expect(store.selectedSoftware?.dataStatus == .curated, "ChimeraX should use the curated macOS completion layer.")
            try expect(store.selectedSoftware?.shortcutCount == 19, "ChimeraX should contain 19 curated macOS shortcuts.")

            store.selectSoftware("chatgpt")
            try expect(store.selectedSoftware?.dataStatus == .curated, "ChatGPT should use the curated macOS shortcut layer.")
            try expect(store.selectedSoftware?.shortcutCount == 18, "ChatGPT should contain 18 reviewed macOS shortcuts.")
            try expect(
                store.selectedSoftware?.bundleIdentifiers?.contains("com.openai.chat") == true,
                "ChatGPT must retain its official macOS bundle identifier."
            )
            store.query = "search chats"
            try expect(
                store.filteredSections.flatMap(\.items).contains(where: { $0.id == "academic.chatgpt.search-chats" }),
                "ChatGPT search should find the Search chats, files, and projects shortcut."
            )
            store.query = ""

            store.selectSoftware("figma")
            try expect(store.selectedSoftware?.dataStatus == .curated, "Figma should use the final curated completion layer.")
            try expect(store.selectedSoftware?.shortcutCount == 349, "Figma should contain 349 documented macOS shortcuts.")

            for (softwareID, expectedCount) in [
                ("cinema4d", 356), ("premiere", 229), ("vscode", 200),
            ] {
                store.selectSoftware(softwareID)
                try expect(store.selectedSoftware?.dataStatus == .curated, "\(softwareID) should use the reviewed macOS document import.")
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) documented macOS shortcuts."
                )
            }

            store.selectSoftware("photoshop")
            try expect(store.selectedSoftware?.dataStatus == .sourceBacked, "Photoshop should use the source-backed markdown import.")
            try expect(store.selectedSoftware?.shortcutCount == 639, "Photoshop should contain 639 documented macOS shortcuts.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "official-source-cross-checked-markdown",
                "Photoshop must retain its cross-checked source provenance."
            )

            store.selectSoftware("matlab")
            try expect(store.selectedSoftware?.shortcutCount == 84, "MATLAB should contain 84 official macOS alternatives.")
            try expect(
                store.selectedSoftware?.provenance?.coverage == "complete-official-macos-column",
                "MATLAB must retain official macOS-column provenance."
            )

            for (softwareID, expectedCount) in [
                ("word", 428), ("excel", 463), ("powerpoint", 295),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) combined macOS shortcuts."
                )
                try expect(
                    store.selectedSoftware?.provenance?.coverage == "official-source-cross-checked-markdown",
                    "\(softwareID) must retain its official and reviewed-document macOS provenance."
                )
            }
            for (softwareID, expectedCount) in [
                ("outlook", 115), ("onenote", 82), ("pages", 395), ("numbers", 389),
                ("keynote", 461), ("googledocs", 183), ("googlesheets", 158),
                ("googleslides", 182), ("wpsoffice", 165), ("jupyter", 216),
                ("spss", 125), ("rstudio", 247), ("obsidian", 174), ("chemdraw", 122),
                ("pymol", 323), ("imagej", 358), ("paraview", 143), ("preview", 90),
                ("pdfexpert", 101), ("zotero", 226), ("mendeley", 59), ("endnote", 73),
                ("anki", 220),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) source-backed macOS shortcuts."
                )
                try expect(
                    store.selectedSoftware?.dataStatus == .sourceBacked,
                    "\(softwareID) must use the source-backed research import."
                )
                try expect(
                    store.selectedSoftware?.provenance?.coverage == "source-backed-comprehensive-macos",
                    "\(softwareID) must retain the comprehensive macOS research provenance."
                )
                try expect(
                    store.selectedSoftware?.provenance?.platform == "macOS" &&
                    store.selectedSoftware?.provenance?.verifiedAt == "2026-07-27",
                    "\(softwareID) must retain the current macOS verification metadata."
                )
            }

            for (softwareID, expectedCount) in [
                ("ulysses", 88), ("scrivener", 156), ("calibre", 300), ("deepl", 11),
                ("grammarly", 26), ("pgadmin", 91), ("mongodbcompass", 61), ("redisinsight", 20),
                ("sqlitestudio", 129), ("tableplus", 69), ("supabase", 253), ("mathematica", 91),
                ("stata", 16), ("jmp", 162), ("slicer", 113), ("osirix", 137), ("horos", 60),
                ("godot", 54), ("substancepainter", 58), ("houdini", 44), ("notion", 42),
                ("confluence", 43), ("jira", 11), ("linear", 49), ("trello", 16), ("feishu", 2),
                ("yuque", 42), ("teams", 54), ("zoom", 31),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) source-backed macOS shortcuts."
                )
                try expect(
                    store.selectedSoftware?.dataStatus == .sourceBacked &&
                    store.selectedSoftware?.provenance?.coverage == "source-backed-comprehensive-macos",
                    "\(softwareID) must use the current source-backed research import."
                )
            }

            store.selectSoftware("supabase")
            let projectSettings = store.selectedSoftware?.categories.flatMap(\.items)
                .first(where: { $0.en == "Go to Project Settings" })
            try expect(
                projectSettings?.keys == ["G", "then", ","],
                "Supabase must preserve the sequential G, comma navigation chord."
            )
            store.selectSoftware("mathematica")
            let integralAlias = store.selectedSoftware?.categories.flatMap(\.items)
                .first(where: { $0.en == "Indefinite integral template" })
            try expect(
                integralAlias?.keys == ["Esc", "then", "intt", "then", "Esc"],
                "Mathematica input aliases must remain sequential Esc-alias-Esc commands."
            )
            store.selectSoftware("calibre")
            try expect(
                store.selectedSoftware?.categories.flatMap(\.items)
                    .contains(where: { $0.en == "Edit the current field in the bibliography list" && $0.keys == ["Return"] }) == true,
                "Calibre must retain its explicit macOS Return alternative."
            )

            store.selectSoftware("labview")
            try expect(store.selectedSoftware?.shortcutCount == 61, "LabVIEW should contain 61 source-backed shortcuts.")
            store.selectSoftware("avogadro")
            try expect(store.selectedSoftware?.shortcutCount == 97, "Avogadro should contain 97 combined shortcuts.")
            store.selectSoftware("safari")
            try expect(store.selectedSoftware?.shortcutCount == 88, "Safari should contain 88 combined shortcuts.")
            store.selectSoftware("finder")
            try expect(store.selectedSoftware?.shortcutCount == 99, "Finder should contain 99 combined shortcuts.")
            store.selectSoftware("illustrator")
            try expect(store.selectedSoftware?.dataStatus == .sourceBacked, "Illustrator should use the source-backed markdown import.")
            try expect(store.selectedSoftware?.shortcutCount == 393, "Illustrator should contain 393 documented macOS shortcuts.")
            for (softwareID, expectedCount) in [
                ("autocad", 547), ("sketchup", 270), ("blender", 889),
            ] {
                store.selectSoftware(softwareID)
                try expect(
                    store.selectedSoftware?.dataStatus == .curated,
                    "\(softwareID) should use the reviewed macOS markdown import."
                )
                try expect(
                    store.selectedSoftware?.shortcutCount == expectedCount,
                    "\(softwareID) should contain \(expectedCount) documented macOS shortcuts."
                )
            }
            store.selectSoftware("affinityphoto")
            try expect(store.selectedSoftware?.shortcutCount == 272, "Affinity Photo should contain 272 official shortcuts.")
            store.selectSoftware("affinitypublisher")
            try expect(store.selectedSoftware?.shortcutCount == 204, "Affinity Publisher should contain 204 official shortcuts.")
            store.selectSoftware("terminal")

            try expect(
                store.selectSoftware(matchingBundleIdentifier: "com.figma.Desktop"),
                "Collapsed KeyFloat should follow a recognized foreground application."
            )
            try expect(store.selectedSoftwareID == "figma", "Figma bundle detection should select Figma.")
            store.isExpanded = true
            try expect(
                !store.selectSoftware(matchingBundleIdentifier: "com.apple.Terminal"),
                "Expanded reading must not be interrupted by foreground-app changes."
            )
            try expect(store.selectedSoftwareID == "figma", "Expanded KeyFloat should keep the current software.")
            store.isExpanded = false
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

            store.submitSoftwareRequest(name: "   ", contact: "", group: .design)
            guard let unchangedRequestData = defaults.data(forKey: "KeyFloatSoftwareRequests"),
                  let unchangedRequests = try JSONSerialization.jsonObject(with: unchangedRequestData) as? [[String: Any]] else {
                throw SmokeTestFailure.failed("Legacy software requests should remain decodable after migration.")
            }
            try expect(unchangedRequests.count == 1, "Blank software requests must not be stored.")

            store.submitSoftwareRequest(
                name: "  Affinity Publisher 3  ",
                contact: "  requester@example.com  ",
                group: .design
            )
            guard let requestData = defaults.data(forKey: "KeyFloatSoftwareRequests"),
                  let requests = try JSONSerialization.jsonObject(with: requestData) as? [[String: Any]] else {
                throw SmokeTestFailure.failed("Software requests should be stored as a delivery queue.")
            }
            try expect(requests.count == 2, "A new software request should preserve and append to legacy requests.")
            try expect(
                requests.contains(where: { $0["softwareName"] as? String == "Legacy Design App" }),
                "A pre-upgrade software request must be preserved for automatic delivery."
            )
            guard let currentRequest = requests.first(where: { $0["softwareName"] as? String == "Affinity Publisher 3" }) else {
                throw SmokeTestFailure.failed("The normalized software request is missing.")
            }
            try expect(currentRequest["contact"] as? String == "requester@example.com", "Software request contact should be trimmed.")
            try expect(currentRequest["group"] as? String == SoftwareGroup.design.rawValue, "Software request group should be retained.")
            try expect(currentRequest["language"] as? String == "zh", "Software request language should be retained.")
            try expect(currentRequest["deliveredAt"] == nil, "A new software request should remain queued until delivered.")

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

    private static func hasCleanShortcutTitleBoundary(_ title: String) -> Bool {
        guard title == title.trimmingCharacters(in: .whitespacesAndNewlines),
              let first = title.first,
              let last = title.last else {
            return false
        }

        let forbiddenLeading: Set<Character> = [
            ":", "：", ";", "；", ",", "，", "。", "．", ".", "、",
            "!", "！", "?", "？", "/", "|", "｜", "·", "•", "—", "–",
        ]
        if forbiddenLeading.contains(first) { return false }
        if first == "-", title.dropFirst().first?.isWhitespace == true { return false }

        if title.hasSuffix("...") || title.hasSuffix("…") { return true }

        let forbiddenTrailing: Set<Character> = [
            ":", "：", ";", "；", ",", "，", "。", "．", ".", "、",
            "!", "！", "?", "？", "/", "|", "｜", "·", "•", "—", "–",
        ]
        if forbiddenTrailing.contains(last) { return false }
        if last == "-", title.dropLast().last?.isWhitespace == true { return false }
        return true
    }

    private static func expect(_ condition: @autoclosure () -> Bool, _ message: String) throws {
        if !condition() { throw SmokeTestFailure.failed(message) }
    }
}
