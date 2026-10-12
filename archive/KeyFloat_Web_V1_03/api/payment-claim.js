const crypto = require("node:crypto");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REFERENCE_PATTERN = /^[A-Za-z0-9-]{8,64}$/;
const PRODUCT_AMOUNTS_CNY = Object.freeze({ "keyfloat-desktop": 6 });
const WEBHOOK_TIMEOUT_MS = 10_000;
const VOUCHER_VERSION = "KF1";
const VOUCHER_PRODUCT = "keyfloat-desktop";

function parseHTTPSURL(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function loadSigningKey() {
  const encoded = process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64;
  if (!encoded) return undefined;
  try {
    const pem = Buffer.from(encoded, "base64").toString("utf8");
    const key = crypto.createPrivateKey(pem);
    return key.asymmetricKeyType === "ed25519" ? key : undefined;
  } catch {
    return undefined;
  }
}

function randomMixedCaseToken() {
  for (;;) {
    const token = crypto.randomBytes(18).toString("base64url");
    if (/[a-z]/.test(token) && /[A-Z]/.test(token)) return token;
  }
}

function issueVoucher(privateKey) {
  const randomToken = randomMixedCaseToken();
  const issuedAt = Date.now().toString(36);
  const payload = `${VOUCHER_VERSION}|${randomToken}|${issuedAt}|${VOUCHER_PRODUCT}`;
  const signature = crypto.sign(null, Buffer.from(payload, "utf8"), privateKey).toString("base64url");
  return `${VOUCHER_VERSION}.${randomToken}.${issuedAt}.${signature}`;
}

module.exports = async function paymentClaim(request, response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("Pragma", "no-cache");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  }

  const { product, amountCny, paymentReference, email, language } = request.body || {};
  const amount = Number(amountCny);
  const expectedAmount = PRODUCT_AMOUNTS_CNY[product];
  if (expectedAmount === undefined || amount !== expectedAmount ||
      !REFERENCE_PATTERN.test(String(paymentReference || "").trim()) ||
      !EMAIL_PATTERN.test(String(email || "").trim())) {
    return response.status(400).json({ code: "INVALID_CLAIM" });
  }

  if (process.env.KEYFLOAT_CHECKOUT_ENABLED !== "true") {
    return response.status(503).json({ code: "CHECKOUT_DISABLED" });
  }

  const parsedWebhookURL = parseHTTPSURL(process.env.PAYMENT_CLAIM_WEBHOOK_URL);
  const webhookToken = process.env.PAYMENT_CLAIM_WEBHOOK_TOKEN;
  if (!parsedWebhookURL || !webhookToken) {
    return response.status(503).json({ code: "NOT_CONFIGURED" });
  }

  const signingKey = loadSigningKey();
  if (!signingKey) {
    return response.status(503).json({ code: "SIGNING_NOT_CONFIGURED" });
  }

  const payload = {
    product,
    amountCny: amount,
    paymentReference: String(paymentReference).trim(),
    email: String(email).trim().toLowerCase(),
    language: language === "zh" ? "zh" : "en",
    submittedAt: new Date().toISOString(),
    source: "keyfloat-web"
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  let webhookResponse;
  try {
    webhookResponse = await fetch(parsedWebhookURL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${webhookToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  } catch {
    return response.status(502).json({ code: "UPSTREAM_ERROR" });
  } finally {
    clearTimeout(timeout);
  }

  let verification;
  try {
    verification = await webhookResponse.json();
  } catch {
    verification = {};
  }
  if (!webhookResponse.ok) {
    const code = verification.code === "ALREADY_CLAIMED" ? "ALREADY_CLAIMED" : "UPSTREAM_ERROR";
    return response.status(code === "ALREADY_CLAIMED" ? 409 : 502).json({ code });
  }
  if (verification.verified !== true) {
    return response.status(202).json({ code: "PAYMENT_PENDING" });
  }

  const voucherCode = issueVoucher(signingKey);
  const downloadURL = parseHTTPSURL(verification.downloadURL);
  return response.status(200).json({
    verified: true,
    voucherCode,
    ...(downloadURL ? { downloadURL: downloadURL.toString() } : {})
  });
};

module.exports._test = { issueVoucher, loadSigningKey, parseHTTPSURL };
