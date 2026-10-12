using System.Text.RegularExpressions;
using KeyFloat.Core.Models;
using KeyFloat.Core.Services;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;
using Org.BouncyCastle.Security;
using System.Text;

static void Expect(bool condition, string message)
{
    if (!condition) throw new InvalidOperationException(message);
}

var dataPath = args.Length > 0
    ? Path.GetFullPath(args[0])
    : Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "src", "KeyFloat.Win", "Data", "shortcuts-windows.json"));
var repository = ShortcutRepository.Load(dataPath);
Expect(repository.Warnings.Count == 0, $"Repository emitted warnings: {string.Join(" | ", repository.Warnings)}");
Expect(repository.Software.Count == 209, $"Expected 209 catalog entries, got {repository.Software.Count}.");
Expect(repository.Software.Count(pack => pack.IsAvailableOnWindows) == 185, "Expected 185 Windows-compatible apps.");
Expect(repository.Software.Sum(pack => pack.ShortcutCount) == 10_969, "Expected 10,969 Windows shortcut rows.");

var forbidden = new Regex("[⌘⌥⌃⇧]|\\bCommand\\b|\\bmacOS\\b", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
var chinese = new Regex("[\\u3400-\\u9fff]", RegexOptions.CultureInvariant);
foreach (var pack in repository.Software)
{
    if (!pack.IsAvailableOnWindows)
    {
        Expect(pack.Categories.Count == 0, $"{pack.Id} is unavailable but exposes shortcut rows.");
        continue;
    }
    Expect(pack.Categories.Count > 0, $"{pack.Id} is available but empty.");
    foreach (var category in pack.Categories)
    {
        Expect(!chinese.IsMatch(category.EnglishTitle), $"{pack.Id}/{category.Id} has Chinese text in English mode.");
        foreach (var item in category.Items)
        {
            Expect(!chinese.IsMatch(item.EnglishTitle), $"{pack.Id}/{item.Id} has Chinese text in English mode.");
            Expect(item.KeysDefault.All(key => !forbidden.IsMatch(key)), $"{pack.Id}/{item.Id} retained a macOS key.");
        }
    }
}

var figma = repository.FindSoftware("figma") ?? throw new InvalidOperationException("Figma is missing.");
var figmaResults = repository.Filter(figma, "all", "Ctrl K", false, new HashSet<string>());
Expect(figmaResults.Sum(section => section.Items.Count) > 0, "Ctrl K search should find Figma Windows shortcuts.");
var word = repository.FindSoftware("word") ?? throw new InvalidOperationException("Word is missing.");
Expect(repository.Filter(word, "all", "copy", false, new HashSet<string>()).Count > 0, "English command search failed.");
Expect(repository.Filter(word, "all", "复制", false, new HashSet<string>()).Count > 0, "Chinese command search failed.");
Expect(repository.FindSoftware("xcode") is { IsAvailableOnWindows: false }, "Xcode must remain visible but unavailable on Windows.");

var validator = new LicenseValidator();
Expect(LicenseValidator.NormalizeShortActivationCode("kf1-abcde-fghjk-mnpqr-stuvw") == "KF1-ABCDE-FGHJK-MNPQR-STUVW", "Short activation codes must normalize to uppercase grouped form.");
Expect(LicenseValidator.NormalizeShortActivationCode("KF1-ABCDE-FGHIL-MNPQR-STUVW") is null, "Ambiguous or unsupported short-code characters must be rejected.");
Expect(validator.IsAdministratorCode("Ss1217"), "Administrator code compatibility failed.");
Expect(!validator.IsAdministratorCode("ss1217"), "Administrator code comparison must remain case-sensitive.");
Expect(!validator.IsValidVoucher("KF1.invalid.invalid.invalid"), "Malformed voucher was accepted.");
var privateKey = new Ed25519PrivateKeyParameters(new SecureRandom());
var publicKey = privateKey.GeneratePublicKey().GetEncoded();
var issued = (ulong)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
var issuedBase36 = ToBase36(issued);
var token = "AbCdEfGhIjKlMnOpQrSt";
var payload = Encoding.UTF8.GetBytes($"KF1|{token}|{issuedBase36}|keyfloat-desktop");
var signer = new Ed25519Signer();
signer.Init(true, privateKey);
signer.BlockUpdate(payload, 0, payload.Length);
var signature = Convert.ToBase64String(signer.GenerateSignature()).TrimEnd('=').Replace('+', '-').Replace('/', '_');
var signedVoucher = $"KF1.{token}.{issuedBase36}.{signature}";
var testValidator = new LicenseValidator(Convert.ToBase64String(publicKey));
Expect(testValidator.IsValidVoucher(signedVoucher), "A valid Ed25519 voucher was rejected.");
Expect(!testValidator.IsValidVoucher(signedVoucher.Replace(token, token + "X", StringComparison.Ordinal)), "A modified voucher was accepted.");
var now = DateTimeOffset.UtcNow;
var proof = validator.AdministratorActivationProof(now);
Expect(validator.IsValidAdministratorActivationProof(proof, now), "Administrator activation proof failed.");
Expect(!validator.IsValidAdministratorActivationProof(proof, now.AddMilliseconds(1)), "Administrator proof was not bound to its timestamp.");

Console.WriteLine("KeyFloat Windows core smoke tests passed: 209 catalog entries / 185 Windows apps / 10,969 shortcuts.");

static string ToBase36(ulong value)
{
    const string alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
    Span<char> buffer = stackalloc char[13];
    var position = buffer.Length;
    do
    {
        buffer[--position] = alphabet[(int)(value % 36)];
        value /= 36;
    } while (value > 0);
    return new string(buffer[position..]);
}
