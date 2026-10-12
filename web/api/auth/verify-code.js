const {
  CODE_PATTERN, MAX_CODE_ATTEMPTS, codeKey, createSession, hashCode, normalizeEmail,
  safeEqual, sessionCookie,
} = require("../_lib/auth");
const { allowMethods, setNoStore } = require("../_lib/http");
const { deleteKey, getJSON, setJSON } = require("../_lib/store");
const { registerUser } = require("../_lib/analytics");

module.exports = async function verifyCode(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const email = normalizeEmail(request.body?.email);
  const code = String(request.body?.code || "").trim();
  if (!email || !CODE_PATTERN.test(code)) return response.status(400).json({ code: "INVALID_INPUT" });

  try {
    const key = codeKey(email);
    const record = await getJSON(key);
    if (!record || record.expiresAt <= Date.now()) {
      if (record) await deleteKey(key);
      return response.status(401).json({ code: "CODE_EXPIRED" });
    }
    if (record.attempts >= MAX_CODE_ATTEMPTS) {
      await deleteKey(key);
      return response.status(429).json({ code: "TOO_MANY_ATTEMPTS" });
    }
    if (!safeEqual(record.codeHash, hashCode(email, code, record.salt))) {
      record.attempts += 1;
      if (record.attempts >= MAX_CODE_ATTEMPTS) await deleteKey(key);
      else await setJSON(key, record, Math.max(1, Math.ceil((record.expiresAt - Date.now()) / 1_000)));
      return response.status(401).json({ code: "INVALID_CODE", attemptsRemaining: Math.max(0, MAX_CODE_ATTEMPTS - record.attempts) });
    }

    await deleteKey(key);
    const session = createSession(email, request.body?.remember === true);
    await registerUser(email).catch(() => undefined);
    response.setHeader("Set-Cookie", sessionCookie(session.token, session.maxAge));
    return response.status(200).json({ authenticated: true, user: { email }, expiresAt: session.expiresAt });
  } catch (error) {
    return response.status(503).json({ code: error.code || "AUTH_UNAVAILABLE" });
  }
};
