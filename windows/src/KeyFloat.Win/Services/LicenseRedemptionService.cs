using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using KeyFloat.Core.Services;

namespace KeyFloat.Win.Services;

public enum LicenseRedemptionResult
{
    Redeemed,
    InvalidCode,
    DeviceLimitReached,
    RateLimited,
    NetworkUnavailable,
    ServiceUnavailable,
}

public sealed record LicenseRedemptionOutcome(LicenseRedemptionResult Result, string? VoucherCode = null);

public sealed class LicenseRedemptionService
{
    private sealed record RequestBody(string Code, string InstallationId, string Platform, string AppVersion);
    private sealed record LicenseBody(string VoucherCode);
    private sealed record ResponseBody(LicenseBody License);
    private sealed record ErrorBody(string Code);

    private static readonly HttpClient Client = new()
    {
        BaseAddress = new Uri("https://keyfloat.cn/"),
        Timeout = TimeSpan.FromSeconds(15),
    };

    private readonly string _installationPath;

    public LicenseRedemptionService()
    {
        var directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "KeyFloat");
        _installationPath = Path.Combine(directory, "installation-id");
    }

    public async Task<LicenseRedemptionOutcome> RedeemAsync(string rawCode, string appVersion, CancellationToken cancellationToken = default)
    {
        var code = LicenseValidator.NormalizeShortActivationCode(rawCode);
        if (code is null) return new(LicenseRedemptionResult.InvalidCode);

        try
        {
            var request = new RequestBody(code, InstallationIdentifier().ToString("D"), "windows", appVersion);
            using var response = await Client.PostAsJsonAsync("api/license/redeem", request, cancellationToken);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var payload = await response.Content.ReadFromJsonAsync<ResponseBody>(cancellationToken: cancellationToken);
                return string.IsNullOrWhiteSpace(payload?.License.VoucherCode)
                    ? new(LicenseRedemptionResult.ServiceUnavailable)
                    : new(LicenseRedemptionResult.Redeemed, payload.License.VoucherCode);
            }

            ErrorBody? error = null;
            try
            {
                error = await response.Content.ReadFromJsonAsync<ErrorBody>(cancellationToken: cancellationToken);
            }
            catch (JsonException) { }
            return error?.Code switch
            {
                "ACTIVATION_CODE_INVALID" or "INVALID_ACTIVATION_REQUEST" => new(LicenseRedemptionResult.InvalidCode),
                "DEVICE_LIMIT_REACHED" => new(LicenseRedemptionResult.DeviceLimitReached),
                "RATE_LIMITED" => new(LicenseRedemptionResult.RateLimited),
                _ => new(LicenseRedemptionResult.ServiceUnavailable),
            };
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            return new(LicenseRedemptionResult.NetworkUnavailable);
        }
        catch (HttpRequestException)
        {
            return new(LicenseRedemptionResult.NetworkUnavailable);
        }
        catch (IOException)
        {
            return new(LicenseRedemptionResult.ServiceUnavailable);
        }
    }

    private Guid InstallationIdentifier()
    {
        try
        {
            if (File.Exists(_installationPath) && Guid.TryParse(File.ReadAllText(_installationPath).Trim(), out var stored)) {
                return stored;
            }
            var identifier = Guid.NewGuid();
            Directory.CreateDirectory(Path.GetDirectoryName(_installationPath)!);
            var temporary = _installationPath + ".tmp";
            File.WriteAllText(temporary, identifier.ToString("D"));
            File.Move(temporary, _installationPath, true);
            return identifier;
        }
        catch (IOException)
        {
            // A stable per-user fallback still avoids sending hardware identifiers.
            var source = $"{Environment.UserName}|{Environment.MachineName}|KeyFloat";
            var bytes = System.Security.Cryptography.SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(source));
            return new Guid(bytes[..16]);
        }
    }
}
