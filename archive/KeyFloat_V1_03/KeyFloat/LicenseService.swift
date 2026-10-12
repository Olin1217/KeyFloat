import CryptoKit
import Foundation

enum LicenseActivationResult: Equatable {
    case activated
    case emptyCode
    case invalidCode
    case persistenceFailed
}

struct LicenseValidator {
    static let productionPublicKeyBase64 = "DMPzhBVNMtFYIEy3uQ005ox6ECNOYWo+NRXBLPxkkcM="

    private static let voucherVersion = "KF1"
    private static let voucherProduct = "keyfloat-desktop"
    private static let earliestIssueMilliseconds: UInt64 = 1_735_689_600_000
    private static let allowedClockSkewMilliseconds: UInt64 = 86_400_000
    private static let administratorCodeHash = Data(hexString: "315eb04dc32dc569c380c3166d39578d952fe1fcc47d8b81047039e78d7f6e93")!

    private let publicKey: Curve25519.Signing.PublicKey?

    init(publicKeyBase64: String = Self.productionPublicKeyBase64) {
        guard let data = Data(base64Encoded: publicKeyBase64), data.count == 32 else {
            publicKey = nil
            return
        }
        publicKey = try? Curve25519.Signing.PublicKey(rawRepresentation: data)
    }

    func isAdministratorCode(_ code: String) -> Bool {
        let digest = SHA256.hash(data: Data(code.utf8))
        return Data(digest) == Self.administratorCodeHash
    }

    func administratorActivationProof(activatedAt: Date) -> String {
        let key = SymmetricKey(data: Self.administratorCodeHash)
        let payload = Self.administratorProofPayload(activatedAt: activatedAt)
        let proof = HMAC<SHA256>.authenticationCode(for: payload, using: key)
        return Data(proof).base64EncodedString()
    }

    func isValidAdministratorActivationProof(_ proof: String?, activatedAt: Date) -> Bool {
        guard let proof, let proofData = Data(base64Encoded: proof), proofData.count == 32 else {
            return false
        }
        let key = SymmetricKey(data: Self.administratorCodeHash)
        return HMAC<SHA256>.isValidAuthenticationCode(
            proofData,
            authenticating: Self.administratorProofPayload(activatedAt: activatedAt),
            using: key
        )
    }

    func isValidVoucher(_ voucher: String, now: Date = Date()) -> Bool {
        guard let publicKey else { return false }
        let parts = voucher.split(separator: ".", omittingEmptySubsequences: false).map(String.init)
        guard parts.count == 4,
              parts[0] == Self.voucherVersion,
              (20...32).contains(parts[1].count),
              parts[1].allSatisfy({ $0.isASCII && ($0.isLetter || $0.isNumber || $0 == "-" || $0 == "_") }),
              parts[1].contains(where: { $0.isLowercase }),
              parts[1].contains(where: { $0.isUppercase }),
              let issuedAt = UInt64(parts[2], radix: 36),
              issuedAt >= Self.earliestIssueMilliseconds,
              issuedAt <= UInt64(now.timeIntervalSince1970 * 1_000) + Self.allowedClockSkewMilliseconds,
              let signature = Data(base64URLEncoded: parts[3]),
              signature.count == 64 else {
            return false
        }

        let payload = "\(Self.voucherVersion)|\(parts[1])|\(parts[2])|\(Self.voucherProduct)"
        return publicKey.isValidSignature(signature, for: Data(payload.utf8))
    }

    private static func administratorProofPayload(activatedAt: Date) -> Data {
        let timestampBits = String(activatedAt.timeIntervalSinceReferenceDate.bitPattern, radix: 16)
        return Data("KeyFloat|administrator|v2|\(timestampBits)".utf8)
    }
}

@MainActor
final class LicenseStore {
    private struct ActivationRecord: Codable {
        enum Method: String, Codable {
            case voucher
            case administrator
        }

        let version: Int
        let method: Method
        let credential: String?
        let activatedAt: Date
    }

    private enum PreferenceKey {
        static let activationRecord = "KeyFloatActivationRecord"
    }

    private let defaults: UserDefaults
    private let validator: LicenseValidator
    private(set) var isActivated = false

    init(defaults: UserDefaults = .standard, validator: LicenseValidator = LicenseValidator()) {
        self.defaults = defaults
        self.validator = validator
        isActivated = Self.loadActivation(from: defaults, validator: validator)
    }

    func activate(code rawCode: String) -> LicenseActivationResult {
        let code = rawCode.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !code.isEmpty else { return .emptyCode }

        let record: ActivationRecord
        let activatedAt = Date()
        if validator.isAdministratorCode(code) {
            record = ActivationRecord(
                version: 2,
                method: .administrator,
                credential: validator.administratorActivationProof(activatedAt: activatedAt),
                activatedAt: activatedAt
            )
        } else if validator.isValidVoucher(code) {
            record = ActivationRecord(version: 2, method: .voucher, credential: code, activatedAt: activatedAt)
        } else {
            return .invalidCode
        }

        guard let encoded = try? JSONEncoder().encode(record) else { return .persistenceFailed }
        defaults.set(encoded, forKey: PreferenceKey.activationRecord)
        guard defaults.synchronize(), Self.loadActivation(from: defaults, validator: validator) else {
            return .persistenceFailed
        }
        isActivated = true
        return .activated
    }

    func resetActivation() {
        defaults.removeObject(forKey: PreferenceKey.activationRecord)
        isActivated = false
    }

    private static func loadActivation(from defaults: UserDefaults, validator: LicenseValidator) -> Bool {
        guard let data = defaults.data(forKey: PreferenceKey.activationRecord),
              let record = try? JSONDecoder().decode(ActivationRecord.self, from: data),
              record.version == 1 || record.version == 2 else {
            return false
        }
        switch record.method {
        case .administrator:
            guard record.version == 2 else { return false }
            return validator.isValidAdministratorActivationProof(record.credential, activatedAt: record.activatedAt)
        case .voucher:
            guard let voucher = record.credential else { return false }
            return validator.isValidVoucher(voucher)
        }
    }
}

private extension Data {
    init?(hexString: String) {
        guard hexString.count.isMultiple(of: 2) else { return nil }
        var data = Data(capacity: hexString.count / 2)
        var index = hexString.startIndex
        while index < hexString.endIndex {
            let next = hexString.index(index, offsetBy: 2)
            guard let byte = UInt8(hexString[index..<next], radix: 16) else { return nil }
            data.append(byte)
            index = next
        }
        self = data
    }

    init?(base64URLEncoded value: String) {
        var base64 = value.replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        let remainder = base64.count % 4
        if remainder != 0 {
            base64 += String(repeating: "=", count: 4 - remainder)
        }
        self.init(base64Encoded: base64)
    }
}
