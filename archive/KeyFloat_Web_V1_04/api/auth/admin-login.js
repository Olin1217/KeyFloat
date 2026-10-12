const { adminSessionCookie, createSession, normalizeEmail, safeEqual } = require("../_lib/auth");
const { allowMethods, requestIP, setNoStore } = require("../_lib/http");
const { deleteKey, getJSON, privateKey, setJSON } = require("../_lib/store");

const MAX_ADMIN_ATTEMPTS = 10;
const ADMIN_RATE_SECONDS = 15 * 60;

module.exports = async function adminLogin(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;

  const submitted = String(request.body?.adminCode || "").trim();
  const configured = process.env.KEYFLOAT_ADMIN_LOGIN_CODE;
  const adminEmail = normalizeEmail(process.env.KEYFLOAT_ADMIN_EMAIL);
  if (!configured || configured.length < 6 || !adminEmail) {
    return response.status(503).json({ code: "ADMIN_LOGIN_NOT_CONFIGURED" });
  }
  if (!submitted || submitted.length > 128) {
    return response.status(401).json({ code: "INVALID_CREDENTIALS" });
  }

  try {
    const rateKey = privateKey("admin-login-ip", requestIP(request));
    const rate = (await getJSON(rateKey)) || { attempts: 0 };
    if (rate.attempts >= MAX_ADMIN_ATTEMPTS) {
      return response.status(429).json({ code: "RATE_LIMITED", retryAfter: ADMIN_RATE_SECONDS });
    }
    if (!safeEqual(submitted, configured)) {
      await setJSON(rateKey, { attempts: rate.attempts + 1 }, ADMIN_RATE_SECONDS);
      return response.status(401).json({ code: "INVALID_CREDENTIALS" });
    }

    await deleteKey(rateKey);
    const session = createSession(adminEmail, true, "admin");
    response.setHeader("Set-Cookie", adminSessionCookie(session.token, session.maxAge));
    return response.status(200).json({
      authenticated: true,
      user: { email: adminEmail, role: "admin" },
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    return response.status(503).json({ code: error.code || "AUTH_UNAVAILABLE" });
  }
};
