using System.Security.Cryptography;
using System.Text;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;

namespace KeyFloat.Core.Services;

public sealed class LicenseValidator
{
    public const string ProductionPublicKeyBase64 = "DMPzhBVNMtFYIEy3uQ005ox6ECNOYWo+NRXBLPxkkcM=";

    private const string VoucherVersion = "KF1";
    private const string VoucherProduct = "keyfloat-desktop";
    private const ulong EarliestIssueMilliseconds = 1_735_689_600_000;
    private const ulong AllowedClockSkewMilliseconds = 86_400_000;
    private static readonly byte[] AdministratorCodeHash = Convert.FromHexString(
        "315eb04dc32dc569c380c3166d39578d952fe1fcc47d8b81047039e78d7f6e93");
    private const string ShortCodeAlphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

    private readonly byte[]? _publicKey;

    public LicenseValidator(string publicKeyBase64 = ProductionPublicKeyBase64)
    {
        try
        {
            var key = Convert.FromBase64String(publicKeyBase64);
            _publicKey = key.Length == Ed25519PublicKeyParameters.KeySize ? key : null;
        }
        catch (FormatException)
        {
            _publicKey = null;
        }
    }

    public bool IsAdministratorCode(string code)
    {
        var digest = SHA256.HashData(Encoding.UTF8.GetBytes(code));
        return CryptographicOperations.FixedTimeEquals(digest, AdministratorCodeHash);
    }

    public static string? NormalizeShortActivationCode(string value)
    {
        var compact = new string((value ?? "").Trim().ToUpperInvariant()
            .Where(character => !char.IsWhiteSpace(character) && character != '-')
            .ToArray());
        if (compact.Length != 23 || !compact.StartsWith("KF1", StringComparison.Ordinal)) return null;
        var body = compact[3..];
        if (body.Any(character => !ShortCodeAlphabet.Contains(character))) return null;
        return $"KF1-{body[..5]}-{body[5..10]}-{body[10..15]}-{body[15..20]}";
    }

    public string AdministratorActivationProof(DateTimeOffset activatedAt)
    {
        var payload = AdministratorProofPayload(activatedAt);
        return Convert.ToBase64String(HMACSHA256.HashData(AdministratorCodeHash, payload));
    }

    public bool IsValidAdministratorActivationProof(string? proof, DateTimeOffset activatedAt)
    {
        if (string.IsNullOrWhiteSpace(proof)) return false;
        try
        {
            var received = Convert.FromBase64String(proof);
            var expected = HMACSHA256.HashData(AdministratorCodeHash, AdministratorProofPayload(activatedAt));
            return received.Length == expected.Length && CryptographicOperations.FixedTimeEquals(received, expected);
        }
        catch (FormatException)
        {
            return false;
        }
    }

    public bool IsValidVoucher(string voucher, DateTimeOffset? now = null)
    {
        if (_publicKey is null) return false;
        var parts = voucher.Split('.', StringSplitOptions.None);
        if (parts.Length != 4 || parts[0] != VoucherVersion || parts[1].Length is < 20 or > 32 ||
            !parts[1].All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_') ||
            !parts[1].Any(char.IsAsciiLetterLower) || !parts[1].Any(char.IsAsciiLetterUpper) ||
            !TryParseBase36(parts[2], out var issuedAt) || issuedAt < EarliestIssueMilliseconds)
        {
            return false;
        }

        var currentMilliseconds = (ulong)(now ?? DateTimeOffset.UtcNow).ToUnixTimeMilliseconds();
        if (issuedAt > currentMilliseconds + AllowedClockSkewMilliseconds) return false;

        byte[] signature;
        try
        {
            signature = DecodeBase64Url(parts[3]);
        }
        catch (FormatException)
        {
            return false;
        }

        if (signature.Length != Ed25519PrivateKeyParameters.SignatureSize) return false;
        var payload = Encoding.UTF8.GetBytes($"{VoucherVersion}|{parts[1]}|{parts[2]}|{VoucherProduct}");
        var signer = new Ed25519Signer();
        signer.Init(false, new Ed25519PublicKeyParameters(_publicKey, 0));
        signer.BlockUpdate(payload, 0, payload.Length);
        return signer.VerifySignature(signature);
    }

    private static byte[] AdministratorProofPayload(DateTimeOffset activatedAt) =>
        Encoding.UTF8.GetBytes($"KeyFloat|administrator|windows|v2|{activatedAt.ToUnixTimeMilliseconds():x}");

    private static byte[] DecodeBase64Url(string value)
    {
        var base64 = value.Replace('-', '+').Replace('_', '/');
        base64 += new string('=', (4 - base64.Length % 4) % 4);
        return Convert.FromBase64String(base64);
    }

    private static bool TryParseBase36(string value, out ulong result)
    {
        result = 0;
        if (string.IsNullOrEmpty(value)) return false;
        foreach (var character in value)
        {
            var digit = character switch
            {
                >= '0' and <= '9' => character - '0',
                >= 'a' and <= 'z' => character - 'a' + 10,
                >= 'A' and <= 'Z' => character - 'A' + 10,
                _ => -1,
            };
            if (digit < 0 || result > (ulong.MaxValue - (ulong)digit) / 36) return false;
            result = result * 36 + (ulong)digit;
        }
        return true;
    }
}
