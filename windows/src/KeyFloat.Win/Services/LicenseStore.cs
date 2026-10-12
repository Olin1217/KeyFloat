using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using KeyFloat.Core.Services;

namespace KeyFloat.Win.Services;

public enum LicenseActivationResult
{
    Activated,
    EmptyCode,
    InvalidCode,
    PersistenceFailed,
}

public sealed class LicenseStore
{
    private sealed class ActivationRecord
    {
        public int Version { get; init; }
        public string Method { get; init; } = "";
        public string? Credential { get; init; }
        public DateTimeOffset ActivatedAt { get; init; }
    }

    private readonly LicenseValidator _validator = new();
    private readonly string _path;

    public LicenseStore()
    {
        var directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "KeyFloat");
        _path = Path.Combine(directory, "activation.dat");
        IsActivated = LoadActivation();
    }

    public bool IsActivated { get; private set; }

    public LicenseActivationResult Activate(string rawCode)
    {
        var code = rawCode.Trim();
        if (code.Length == 0) return LicenseActivationResult.EmptyCode;
        var activatedAt = DateTimeOffset.UtcNow;
        ActivationRecord record;
        if (_validator.IsAdministratorCode(code))
        {
            record = new ActivationRecord
            {
                Version = 2,
                Method = "administrator",
                Credential = _validator.AdministratorActivationProof(activatedAt),
                ActivatedAt = activatedAt,
            };
        }
        else if (_validator.IsValidVoucher(code))
        {
            record = new ActivationRecord
            {
                Version = 2,
                Method = "voucher",
                Credential = code,
                ActivatedAt = activatedAt,
            };
        }
        else
        {
            return LicenseActivationResult.InvalidCode;
        }

        try
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_path)!);
            var plain = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(record));
            var protectedData = ProtectedData.Protect(plain, Encoding.UTF8.GetBytes("KeyFloat|Windows|Activation|v2"), DataProtectionScope.CurrentUser);
            File.WriteAllBytes(_path, protectedData);
            IsActivated = LoadActivation();
            return IsActivated ? LicenseActivationResult.Activated : LicenseActivationResult.PersistenceFailed;
        }
        catch (CryptographicException)
        {
            return LicenseActivationResult.PersistenceFailed;
        }
        catch (IOException)
        {
            return LicenseActivationResult.PersistenceFailed;
        }
    }

    private bool LoadActivation()
    {
        try
        {
            if (!File.Exists(_path)) return false;
            var protectedData = File.ReadAllBytes(_path);
            var plain = ProtectedData.Unprotect(protectedData, Encoding.UTF8.GetBytes("KeyFloat|Windows|Activation|v2"), DataProtectionScope.CurrentUser);
            var record = JsonSerializer.Deserialize<ActivationRecord>(plain);
            if (record?.Version != 2) return false;
            return record.Method switch
            {
                "administrator" => _validator.IsValidAdministratorActivationProof(record.Credential, record.ActivatedAt),
                "voucher" => record.Credential is not null && _validator.IsValidVoucher(record.Credential),
                _ => false,
            };
        }
        catch (CryptographicException)
        {
            return false;
        }
        catch (JsonException)
        {
            return false;
        }
        catch (IOException)
        {
            return false;
        }
    }
}
