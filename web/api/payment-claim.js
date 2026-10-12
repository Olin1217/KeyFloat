const { readSession } = require("./_lib/auth");
const { allowMethods, requestIP, setNoStore } = require("./_lib/http");
const { submitClaim } = require("./_lib/payment-claims");
const { assertPersistenceReady, consumeRateLimit, privateKey } = require("./_lib/store");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCT_AMOUNTS_CNY = Object.freeze({ "keyfloat-desktop": 6 });
const CLAIM_RATE_LIMIT = 12;
const CLAIM_RATE_SECONDS = 60 * 60;

module.exports = async function paymentClaim(request, response) {
  setNoStore(response);
  if (!allowMethods(request, response, ["POST"])) return;

  const { product, amountCny, email, language } = request.body || {};
  const amount = Number(amountCny);
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const expectedAmount = PRODUCT_AMOUNTS_CNY[product];
  if (expectedAmount === undefined || amount !== expectedAmount || !EMAIL_PATTERN.test(normalizedEmail)) {
    return response.status(400).json({ code: "INVALID_CLAIM" });
  }

  if (process.env.KEYFLOAT_CHECKOUT_ENABLED !== "true") {
    return response.status(503).json({ code: "CHECKOUT_DISABLED" });
  }

  const session = readSession(request);
  if (!session || session.role !== "customer") {
    return response.status(401).json({ code: "AUTH_REQUIRED" });
  }
  if (session.email !== normalizedEmail) {
    return response.status(403).json({ code: "EMAIL_MISMATCH" });
  }

  try {
    assertPersistenceReady();
    const rateKey = privateKey("payment-claim-rate", `${session.email}|${requestIP(request)}`);
    const rate = await consumeRateLimit(rateKey, CLAIM_RATE_LIMIT, CLAIM_RATE_SECONDS);
    if (!rate.allowed) {
      return response.status(429).json({ code: "RATE_LIMITED", retryAfter: CLAIM_RATE_SECONDS });
    }
    const claim = await submitClaim({
      product,
      amountCny: amount,
      email: normalizedEmail,
      language,
    });
    if (claim.status === "approved") {
      return response.status(200).json({ claim });
    }
    return response.status(202).json({ code: "REVIEW_PENDING", claim });
  } catch (error) {
    return response.status(503).json({ code: error.code || "CLAIM_STORAGE_FAILED" });
  }
};
