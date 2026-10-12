import Combine
import Foundation

struct ShortcutAISearchRequest: Encodable, Equatable {
    let query: String
    let softwareID: String
    let language: String
    let localResultCount: Int
    let platform: String

    init(
        query: String,
        softwareID: String,
        language: AppLanguage,
        localResultCount: Int
    ) {
        self.query = query
        self.softwareID = softwareID
        self.language = language.rawValue
        self.localResultCount = localResultCount
        platform = "macos"
    }
}

struct ShortcutAISearchSuggestion: Decodable, Identifiable, Equatable {
    let id: String
    let title: String
    let detail: String?
    let softwareID: String?
    let shortcutIDs: [String]
}

private struct ShortcutAISearchResponse: Decodable {
    let suggestions: [ShortcutAISearchSuggestion]
}

enum ShortcutAISearchError: LocalizedError, Equatable {
    case invalidConfiguration
    case invalidResponse
    case server(statusCode: Int)

    var errorDescription: String? {
        switch self {
        case .invalidConfiguration:
            return "AI search is not configured."
        case .invalidResponse:
            return "The AI search service returned an invalid response."
        case .server(let statusCode):
            return "The AI search service returned HTTP \(statusCode)."
        }
    }
}

protocol ShortcutAISearchProviding {
    var isEnabled: Bool { get }
    func suggestions(for request: ShortcutAISearchRequest) async throws -> [ShortcutAISearchSuggestion]
}

struct ShortcutAISearchConfiguration {
    let isEnabled: Bool
    let endpoint: URL?

    // Keep the client disabled until the server-side AI proxy, privacy notice,
    // usage limits, and result UI are ready. API credentials must remain on
    // the KeyFloat server and must never be embedded in the macOS app.
    static let current = ShortcutAISearchConfiguration(
        isEnabled: false,
        endpoint: URL(string: "https://keyfloat.cn/api/ai/search")
    )
}

struct DisabledShortcutAISearchProvider: ShortcutAISearchProviding {
    let isEnabled = false

    func suggestions(for request: ShortcutAISearchRequest) async throws -> [ShortcutAISearchSuggestion] {
        []
    }
}

final class RemoteShortcutAISearchProvider: ShortcutAISearchProviding {
    let isEnabled = true

    private let endpoint: URL
    private let session: URLSession

    init(endpoint: URL, session: URLSession = .shared) {
        self.endpoint = endpoint
        self.session = session
    }

    func suggestions(for request: ShortcutAISearchRequest) async throws -> [ShortcutAISearchSuggestion] {
        var urlRequest = URLRequest(url: endpoint)
        urlRequest.httpMethod = "POST"
        urlRequest.timeoutInterval = 20
        urlRequest.cachePolicy = .reloadIgnoringLocalCacheData
        urlRequest.setValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.httpBody = try JSONEncoder().encode(request)

        let (data, response) = try await session.data(for: urlRequest)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw ShortcutAISearchError.invalidResponse
        }
        guard (200..<300).contains(httpResponse.statusCode) else {
            throw ShortcutAISearchError.server(statusCode: httpResponse.statusCode)
        }
        guard let decoded = try? JSONDecoder().decode(ShortcutAISearchResponse.self, from: data) else {
            throw ShortcutAISearchError.invalidResponse
        }
        return decoded.suggestions
    }
}

enum ShortcutAISearchProviderFactory {
    static func make(
        configuration: ShortcutAISearchConfiguration = .current,
        session: URLSession = .shared
    ) -> any ShortcutAISearchProviding {
        guard configuration.isEnabled, let endpoint = configuration.endpoint else {
            return DisabledShortcutAISearchProvider()
        }
        return RemoteShortcutAISearchProvider(endpoint: endpoint, session: session)
    }
}

@MainActor
final class ShortcutAISearchGateway: ObservableObject {
    enum State: Equatable {
        case disabled
        case idle
        case loading
        case ready
        case failed
    }

    @Published private(set) var state: State
    @Published private(set) var suggestions: [ShortcutAISearchSuggestion] = []

    var isEnabled: Bool { provider.isEnabled }

    private let provider: any ShortcutAISearchProviding
    private var searchTask: Task<Void, Never>?

    init(provider: any ShortcutAISearchProviding = ShortcutAISearchProviderFactory.make()) {
        self.provider = provider
        state = provider.isEnabled ? .idle : .disabled
    }

    func prepareSuggestions(
        query: String,
        softwareID: String,
        language: AppLanguage,
        localResultCount: Int
    ) {
        searchTask?.cancel()
        guard provider.isEnabled else {
            suggestions = []
            state = .disabled
            return
        }

        let trimmedQuery = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmedQuery.count >= 2 else {
            suggestions = []
            state = .idle
            return
        }

        let request = ShortcutAISearchRequest(
            query: trimmedQuery,
            softwareID: softwareID,
            language: language,
            localResultCount: localResultCount
        )
        state = .loading
        searchTask = Task { [weak self] in
            do {
                try await Task.sleep(nanoseconds: 350_000_000)
                guard !Task.isCancelled, let self else { return }
                let result = try await self.provider.suggestions(for: request)
                guard !Task.isCancelled else { return }
                self.suggestions = result
                self.state = .ready
            } catch is CancellationError {
                return
            } catch {
                guard !Task.isCancelled, let self else { return }
                self.suggestions = []
                self.state = .failed
            }
        }
    }

    func cancel() {
        searchTask?.cancel()
        searchTask = nil
    }

    deinit {
        searchTask?.cancel()
    }
}
