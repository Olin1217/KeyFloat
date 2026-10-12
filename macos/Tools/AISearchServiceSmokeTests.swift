import Foundation

private final class MockAISearchURLProtocol: URLProtocol {
    static var capturedRequest: URLRequest?

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        Self.capturedRequest = request
        let body = Data(#"""
        {
          "suggestions": [
            {
              "id": "suggestion-1",
              "title": "Create a component",
              "detail": "Use the local Figma shortcut",
              "softwareID": "figma",
              "shortcutIDs": ["figma-component"]
            }
          ]
        }
        """#.utf8)
        let response = HTTPURLResponse(
            url: request.url!,
            statusCode: 200,
            httpVersion: "HTTP/1.1",
            headerFields: ["Content-Type": "application/json"]
        )!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: body)
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}

private struct AISearchTestFailure: Error, CustomStringConvertible {
    let message: String
    var description: String { message }
}

@main
private struct AISearchServiceSmokeTests {
    @MainActor
    static func main() async throws {
        let request = ShortcutAISearchRequest(
            query: "create component",
            softwareID: "figma",
            language: .en,
            localResultCount: 4
        )

        let disabledProvider = DisabledShortcutAISearchProvider()
        guard !disabledProvider.isEnabled,
              try await disabledProvider.suggestions(for: request).isEmpty else {
            throw AISearchTestFailure(message: "Disabled AI search must remain inert.")
        }

        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [MockAISearchURLProtocol.self]
        let session = URLSession(configuration: configuration)
        let endpoint = URL(string: "https://keyfloat.test/api/ai/search")!
        let provider = RemoteShortcutAISearchProvider(endpoint: endpoint, session: session)
        let suggestions = try await provider.suggestions(for: request)
        let capturedMethod = MockAISearchURLProtocol.capturedRequest?.httpMethod
        let capturedContentType = MockAISearchURLProtocol.capturedRequest?.value(forHTTPHeaderField: "Content-Type")
        let encodedPayload = try JSONEncoder().encode(request)
        let payload = try JSONSerialization.jsonObject(with: encodedPayload) as? [String: Any]

        guard suggestions.count == 1,
              suggestions[0].id == "suggestion-1",
              capturedMethod == "POST",
              capturedContentType == "application/json",
              let payload,
              payload["query"] as? String == "create component",
              payload["softwareID"] as? String == "figma",
              payload["platform"] as? String == "macos" else {
            throw AISearchTestFailure(message: "Remote AI search request or response contract is invalid.")
        }

        let gateway = ShortcutAISearchGateway(provider: provider)
        gateway.prepareSuggestions(
            query: "create component",
            softwareID: "figma",
            language: .en,
            localResultCount: 4
        )
        for _ in 0..<100 where gateway.state == .loading {
            try await Task.sleep(nanoseconds: 20_000_000)
        }
        guard gateway.state == .ready, gateway.suggestions.count == 1 else {
            throw AISearchTestFailure(message: "The debounced AI search gateway did not expose results.")
        }

        print("Validated the disabled default, server-proxy request contract, response decoding, and debounced AI search gateway.")
    }
}
