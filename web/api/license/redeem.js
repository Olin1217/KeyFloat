const { redeemActivationCode, normalizeActivationCode } = require("../_lib/activation-codes");
const { allowMethods, requestIP, setNoStore } = require("../_lib/http");
const { assertPersistenceReady, consumeRateLimit, privateKey } = require("../_lib/store");

const IP_RATE_LIMIT = 30;
const IP_RATE_SECONDS = 60 * 60;
const CODE_RATE_LIMIT = 12;
const CODE_RATE_SECONDS = 10 * 60;

module.exports = async function redeemLicense(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;

  const { code, installationId, platform, appVersion } = request.body || {};
  const normalizedCode = normalizeActivationCode(code);
  if (!normalizedCode || typeof installationId !== "string" || typeof platform !== "string") {
    return response.status(400).json({ code: "INVALID_ACTIVATION_REQUEST" });
  }

  try {
    assertPersistenceReady();
    const ipRate = await consumeRateLimit(
      privateKey("activation-ip-rate", requestIP(request)),
      IP_RATE_LIMIT,
      IP_RATE_SECONDS
    );
    if (!ipRate.allowed) {
      return response.status(429).json({ code: "RATE_LIMITED", retryAfter: IP_RATE_SECONDS });
    }
    const codeRate = await consumeRateLimit(
      privateKey("activation-code-rate", normalizedCode),
      CODE_RATE_LIMIT,
      CODE_RATE_SECONDS
    );
    if (!codeRate.allowed) {
      return response.status(429).json({ code: "RATE_LIMITED", retryAfter: CODE_RATE_SECONDS });
    }

    const license = await redeemActivationCode({
      activationCode: normalizedCode,
      installationId,
      platform,
      appVersion,
    });
    return response.status(200).json({ license });
  } catch (error) {
    const status = error.code === "INVALID_ACTIVATION_REQUEST" ? 400
      : error.code === "ACTIVATION_CODE_INVALID" ? 404
        : error.code === "DEVICE_LIMIT_REACHED" ? 409
          : error.code === "ACTIVATION_BUSY" ? 409 : 503;
    return response.status(status).json({ code: error.code || "ACTIVATION_UNAVAILABLE" });
  }
};
