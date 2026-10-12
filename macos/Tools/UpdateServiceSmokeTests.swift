import Combine
import Foundation

enum AppLanguage {
    case zh
    case en
}

final class MockUpdateURLProtocol: URLProtocol {
    static var responseStatusCode = 200
    static var responseBody = Data()

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        let response = HTTPURLResponse(
            url: request.url!,
            statusCode: Self.responseStatusCode,
            httpVersion: "HTTP/1.1",
            headerFields: ["Content-Type": "application/json"]
        )!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: Self.responseBody)
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}

@main
struct UpdateServiceSmokeTests {
    @MainActor
    static func waitUntil(_ predicate: @escaping () -> Bool) async throws {
        for _ in 0..<100 {
            if predicate() { return }
            try await Task.sleep(nanoseconds: 20_000_000)
        }
        throw TestFailure(message: "Timed out waiting for the update service")
    }

    @MainActor
    static func main() async throws {
        let suiteName = "KeyFloat.UpdateServiceSmokeTests.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: suiteName)!
        defer { defaults.removePersistentDomain(forName: suiteName) }

        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [MockUpdateURLProtocol.self]
        let session = URLSession(configuration: configuration)
        let endpoint = URL(string: "https://updates.test/api/app/update")!

        MockUpdateURLProtocol.responseBody = Data(#"""
        {
          "currentVersion":"1.0.0",
          "latestVersion":"1.0.6",
          "build":"6",
          "downloadURL":"https://keyfloat.cn/downloads/KeyFloat-macOS-1.0.6-universal.dmg",
          "publishedAt":"2026-08-06T10:00:00.000Z",
          "minimumSystemVersion":"13.0",
          "releaseNotes":{"zh":"更新说明","en":"Release notes"},
          "updateAvailable":true
        }
        """#.utf8)

        let service = UpdateService(endpoint: endpoint, session: session, defaults: defaults)
        service.checkForUpdates()
        try await waitUntil { service.state != .checking }
        guard service.state == .updateAvailable,
              service.isConnectedToUpdateService,
              service.lastSuccessfulCheckAt != nil,
              service.shouldShowBadge,
              service.release?.latestVersion == "1.0.6",
              service.releaseNotes(for: .zh) == "更新说明" else {
            throw TestFailure(message: "A newer release was not exposed correctly")
        }

        service.setIgnoreAvailableRelease(true)
        guard service.ignoresAvailableRelease, !service.shouldShowBadge,
              defaults.string(forKey: "KeyFloatIgnoredUpdateVersion") == "1.0.6" else {
            throw TestFailure(message: "Ignored-version persistence is invalid")
        }

        service.setIgnoreAvailableRelease(false)
        guard !service.ignoresAvailableRelease, service.shouldShowBadge else {
            throw TestFailure(message: "Update reminders could not be restored")
        }

        MockUpdateURLProtocol.responseStatusCode = 503
        service.checkForUpdates(force: true)
        try await waitUntil { service.state != .checking }
        guard service.state == .unavailable, !service.isConnectedToUpdateService else {
            throw TestFailure(message: "A failed update request did not fail safely")
        }

        print("Validated update availability, connectivity state, badge state, ignored-version persistence, release notes, and safe network failure.")
    }
}

struct TestFailure: Error, CustomStringConvertible {
    let message: String
    var description: String { message }
}
