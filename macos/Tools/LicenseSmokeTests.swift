import CryptoKit
import Foundation

private enum LicenseSmokeFailure: Error, CustomStringConvertible {
    case failed(String)

    var description: String {
        switch self {
        case .failed(let message): return message
        }
    }
}

@main
@MainActor
struct LicenseSmokeTests {
    static func main() {
        do {
            try run()
            print("License smoke tests passed.")
        } catch {
            fputs("License smoke tests failed: \(error)\n", stderr)
            exit(1)
        }
    }

    private static func run() throws {
        let privateKey = Curve25519.Signing.PrivateKey()
        let publicKeyBase64 = privateKey.publicKey.rawRepresentation.base64EncodedString()
        let validator = LicenseValidator(publicKeyBase64: publicKeyBase64)

        try expect(
            ShortActivationCode.normalized("kf1-abcde-fghjk-mnpqr-stuvw") == "KF1-ABCDE-FGHJK-MNPQR-STUVW",
            "Short activation codes must normalize to uppercase grouped form."
        )
        try expect(
            ShortActivationCode.normalized("KF1-ABCDE-FGHIL-MNPQR-STUVW") == nil,
            "Ambiguous or unsupported short-code characters must be rejected."
        )

        try expect(validator.isAdministratorCode("Ss1217"), "Administrator code must activate.")
        try expect(!validator.isAdministratorCode("ss1217"), "Administrator code must remain case-sensitive.")

        let token = "AbCdEfGhIjKlMnOpQrStUvWx"
        let issuedAt = String(UInt64(Date().timeIntervalSince1970 * 1_000), radix: 36)
        let payload = "KF1|\(token)|\(issuedAt)|keyfloat-desktop"
        let signature = try privateKey.signature(for: Data(payload.utf8)).base64URLEncodedString()
        let voucher = "KF1.\(token).\(issuedAt).\(signature)"
        try expect(voucher.count >= 100, "Voucher must be sufficiently long.")
        try expect(validator.isValidVoucher(voucher), "A correctly signed voucher must validate.")
        try expect(!validator.isValidVoucher(voucher.replacingOccurrences(of: "AbCd", with: "ZbCd")), "A modified voucher must fail.")
        try expect(!validator.isValidVoucher("KF1.short.invalid.signature"), "Malformed vouchers must fail.")

        let suiteName = "KeyFloat.LicenseSmokeTests.\(UUID().uuidString)"
        guard let defaults = UserDefaults(suiteName: suiteName) else {
            throw LicenseSmokeFailure.failed("Unable to create isolated UserDefaults.")
        }
        defer { defaults.removePersistentDomain(forName: suiteName) }

        let store = LicenseStore(defaults: defaults, validator: validator)
        let installationIdentifier = store.installationIdentifier()
        try expect(
            LicenseStore(defaults: defaults, validator: validator).installationIdentifier() == installationIdentifier,
            "The anonymous installation identifier must remain stable."
        )
        try expect(!store.isActivated, "A fresh installation must be locked.")
        try expect(store.activate(code: "") == .emptyCode, "Empty codes must be rejected.")
        try expect(store.activate(code: "invalid") == .invalidCode, "Invalid codes must be rejected.")
        try expect(store.activate(code: voucher) == .activated, "A signed voucher must unlock the product.")
        try expect(LicenseStore(defaults: defaults, validator: validator).isActivated, "Voucher activation must persist.")

        store.resetActivation()
        try expect(!store.isActivated, "Reset must lock the product again.")
        try expect(store.activate(code: "Ss1217") == .activated, "Administrator activation must succeed.")
        try expect(LicenseStore(defaults: defaults, validator: validator).isActivated, "Administrator activation must persist.")

        guard let administratorRecord = defaults.data(forKey: "KeyFloatActivationRecord"),
              var forgedRecord = try JSONSerialization.jsonObject(with: administratorRecord) as? [String: Any] else {
            throw LicenseSmokeFailure.failed("Administrator activation record was not persisted.")
        }
        forgedRecord["credential"] = "forged-local-marker"
        defaults.set(try JSONSerialization.data(withJSONObject: forgedRecord), forKey: "KeyFloatActivationRecord")
        try expect(!LicenseStore(defaults: defaults, validator: validator).isActivated, "Forged administrator records must fail closed.")

        defaults.set(Data("corrupt".utf8), forKey: "KeyFloatActivationRecord")
        try expect(!LicenseStore(defaults: defaults, validator: validator).isActivated, "Corrupt activation records must fail closed.")

        let productionKey = Data(base64Encoded: LicenseValidator.productionPublicKeyBase64)
        try expect(productionKey?.count == 32, "Production Ed25519 public key must contain 32 bytes.")
    }

    private static func expect(_ condition: @autoclosure () -> Bool, _ message: String) throws {
        if !condition() { throw LicenseSmokeFailure.failed(message) }
    }
}

private extension Data {
    func base64URLEncodedString() -> String {
        base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }
}
