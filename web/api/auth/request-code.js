const {
  CODE_TTL_SECONDS, RESEND_SECONDS, codeKey, exposeDevelopmentCode, generateCode,
  generateSalt, hashCode, ipRateKey, maskEmail, normalizeEmail,
} = require("../_lib/auth");
const { allowMethods, requestIP, setNoStore } = require("../_lib/http");
const { consumeRateLimit, deleteKey, getJSON, privateKey, setJSON, setJSONIfAbsent } = require("../_lib/store");
const { sendVerificationCode } = require("../_lib/mailer");

module.exports = async function requestCode(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const email = normalizeEmail(request.body?.email);
  const language = request.body?.language === "zh" ? "zh" : "en";
  if (!email) return response.status(400).json({ code: "INVALID_EMAIL" });

  const requestLockKey = privateKey("auth-code-request-lock", email);
  let requestLockAcquired = false;
  try {
    const acquired = await setJSONIfAbsent(requestLockKey, { acquiredAt: Date.now() }, 15);
    if (!acquired) return response.status(429).json({ code: "RESEND_TOO_SOON", retryAfter: 15 });
    requestLockAcquired = true;

    const now = Date.now();
    const existing = await getJSON(codeKey(email));
    if (existing?.resendAt > now) {
      return response.status(429).json({ code: "RESEND_TOO_SOON", retryAfter: Math.ceil((existing.resendAt - now) / 1_000) });
    }

    const rate = await consumeRateLimit(ipRateKey(requestIP(request)), 20, 3_600);
    if (!rate.allowed) return response.status(429).json({ code: "RATE_LIMITED", retryAfter: 3_600 });

    const code = generateCode();
    const salt = generateSalt();
    const record = {
      codeHash: hashCode(email, code, salt), salt, attempts: 0,
      expiresAt: now + CODE_TTL_SECONDS * 1_000,
      resendAt: now + RESEND_SECONDS * 1_000,
    };
    await setJSON(codeKey(email), record, CODE_TTL_SECONDS);
    try {
      await sendVerificationCode({ email, code, language });
    } catch (error) {
      await deleteKey(codeKey(email));
      return response.status(503).json({ code: error.code || "EMAIL_DELIVERY_FAILED" });
    }

    return response.status(200).json({
      sent: true,
      maskedEmail: maskEmail(email),
      expiresIn: CODE_TTL_SECONDS,
      resendAfter: RESEND_SECONDS,
      ...(exposeDevelopmentCode() ? { developmentCode: code } : {}),
    });
  } catch (error) {
    return response.status(503).json({ code: error.code || "AUTH_UNAVAILABLE" });
  } finally {
    if (requestLockAcquired) await deleteKey(requestLockKey).catch(() => undefined);
  }
};
