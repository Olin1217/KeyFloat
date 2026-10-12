const { readSession } = require("../_lib/auth");
const { allowMethods, requestIP, setNoStore } = require("../_lib/http");
const { assertPersistenceReady, consumeRateLimit, privateKey } = require("../_lib/store");
const { automaticAlipayReady, createAlipayOrder } = require("../_lib/alipay");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CREATE_RATE_LIMIT = 10;

module.exports = async function createAlipayOrderEndpoint(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;
  const session = readSession(request);
  if (!session || session.role !== "customer") return response.status(401).json({ code: "AUTH_REQUIRED" });
  if (process.env.KEYFLOAT_ALIPAY_ENABLED !== "true") return response.status(503).json({ code: "ALIPAY_DISABLED" });
  if (!automaticAlipayReady()) return response.status(503).json({ code: "ALIPAY_NOT_READY" });

  const { product, amountCny, email, language } = request.body || {};
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail !== session.email) {
    return response.status(403).json({ code: "EMAIL_MISMATCH" });
  }
  if (product !== "keyfloat-desktop" || Number(amountCny) !== 6) {
    return response.status(400).json({ code: "INVALID_ALIPAY_ORDER" });
  }
  try {
    assertPersistenceReady();
    const rate = await consumeRateLimit(privateKey("alipay-create-rate", `${session.email}|${requestIP(request)}`), CREATE_RATE_LIMIT, 60 * 60);
    if (!rate.allowed) return response.status(429).json({ code: "RATE_LIMITED", retryAfter: 3600 });
    const order = await createAlipayOrder({ email: session.email, product, amountCny, language });
    return response.status(200).json({ order });
  } catch (error) {
    const status = ["ALIPAY_DISABLED", "ALIPAY_NOT_CONFIGURED", "ALIPAY_KEY_INVALID", "ALIPAY_GATEWAY_FAILED", "ALIPAY_TIMEOUT", "ALIPAY_QR_MISSING"].includes(error.code) ? 503
      : error.code === "ALIPAY_ORDER_BUSY" ? 409 : 503;
    return response.status(status).json({ code: error.code || "ALIPAY_ORDER_FAILED" });
  }
};
