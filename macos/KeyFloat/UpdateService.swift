import AppKit
import Combine
import Foundation

struct KeyFloatRelease: Decodable, Equatable {
    struct ReleaseNotes: Decodable, Equatable {
        let zh: String
        let en: String
    }

    let currentVersion: String
    let latestVersion: String
    let build: String
    let downloadURL: URL
    let publishedAt: String?
    let minimumSystemVersion: String?
    let releaseNotes: ReleaseNotes
    let updateAvailable: Bool
}

@MainActor
final class UpdateService: ObservableObject {
    enum State: Equatable {
        case idle
        case checking
        case current
        case updateAvailable
        case unavailable
    }

    private enum PreferenceKey {
        static let ignoredVersion = "KeyFloatIgnoredUpdateVersion"
    }

    @Published private(set) var state: State = .idle
    @Published private(set) var release: KeyFloatRelease?
    @Published private(set) var ignoredVersion: String?
    @Published private(set) var lastSuccessfulCheckAt: Date?

    let currentVersion: String
    let buildNumber: String

    private let endpoint: URL
    private let session: URLSession
    private let defaults: UserDefaults
    private var checkTask: Task<Void, Never>?
    private var automaticCheckTask: Task<Void, Never>?

    init(
        endpoint: URL = URL(string: "https://keyfloat.cn/api/app/update")!,
        session: URLSession = .shared,
        defaults: UserDefaults = .standard,
        bundle: Bundle = .main
    ) {
        self.endpoint = endpoint
        self.session = session
        self.defaults = defaults
        currentVersion = bundle.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0.0"
        buildNumber = bundle.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "1"
        ignoredVersion = defaults.string(forKey: PreferenceKey.ignoredVersion)
    }

    var shouldShowBadge: Bool {
        guard let release, release.updateAvailable else { return false }
        return ignoredVersion != release.latestVersion
    }

    var isConnectedToUpdateService: Bool {
        switch state {
        case .current, .updateAvailable:
            return true
        default:
            return false
        }
    }

    var ignoresAvailableRelease: Bool {
        guard let release, release.updateAvailable else { return false }
        return ignoredVersion == release.latestVersion
    }

    func releaseNotes(for language: AppLanguage) -> String {
        guard let release else { return "" }
        return language == .zh ? release.releaseNotes.zh : release.releaseNotes.en
    }

    func checkForUpdates(force: Bool = false) {
        if state == .checking { return }
        if !force, release != nil { return }

        checkTask?.cancel()
        state = .checking
        checkTask = Task { [weak self] in
            guard let self else { return }
            do {
                var components = URLComponents(url: endpoint, resolvingAgainstBaseURL: false)
                components?.queryItems = [
                    URLQueryItem(name: "platform", value: "macos"),
                    URLQueryItem(name: "version", value: currentVersion),
                ]
                guard let url = components?.url else {
                    state = .unavailable
                    return
                }
                var request = URLRequest(url: url)
                request.httpMethod = "GET"
                request.timeoutInterval = 12
                request.cachePolicy = .reloadRevalidatingCacheData
                request.setValue("application/json", forHTTPHeaderField: "Accept")
                let (data, response) = try await session.data(for: request)
                guard !Task.isCancelled,
                      let httpResponse = response as? HTTPURLResponse,
                      httpResponse.statusCode == 200,
                      let decoded = try? JSONDecoder().decode(KeyFloatRelease.self, from: data) else {
                    state = .unavailable
                    return
                }
                release = decoded
                lastSuccessfulCheckAt = Date()
                state = decoded.updateAvailable ? .updateAvailable : .current
            } catch {
                guard !Task.isCancelled else { return }
                state = .unavailable
            }
        }
    }

    func startAutomaticChecks(interval: TimeInterval = 4 * 60 * 60) {
        let effectiveInterval = max(60, interval)
        let lastCheckIsStale = lastSuccessfulCheckAt.map {
            Date().timeIntervalSince($0) >= effectiveInterval
        } ?? true
        if release == nil || state == .unavailable || lastCheckIsStale {
            checkForUpdates(force: true)
        }
        guard automaticCheckTask == nil else { return }
        let nanoseconds = UInt64(effectiveInterval * 1_000_000_000)
        automaticCheckTask = Task { [weak self] in
            while !Task.isCancelled {
                do {
                    try await Task.sleep(nanoseconds: nanoseconds)
                } catch {
                    return
                }
                guard !Task.isCancelled, let self else { return }
                self.checkForUpdates(force: true)
            }
        }
    }

    func stopAutomaticChecks() {
        automaticCheckTask?.cancel()
        automaticCheckTask = nil
    }

    func setIgnoreAvailableRelease(_ ignored: Bool) {
        guard let release, release.updateAvailable else { return }
        if ignored {
            ignoredVersion = release.latestVersion
            defaults.set(release.latestVersion, forKey: PreferenceKey.ignoredVersion)
        } else {
            ignoredVersion = nil
            defaults.removeObject(forKey: PreferenceKey.ignoredVersion)
        }
    }

    func openDownload() {
        guard let release, release.updateAvailable else { return }
        NSWorkspace.shared.open(release.downloadURL)
    }

    deinit {
        checkTask?.cancel()
        automaticCheckTask?.cancel()
    }
}
