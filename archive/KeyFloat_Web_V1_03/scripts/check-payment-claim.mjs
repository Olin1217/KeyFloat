import crypto from "node:crypto";
import paymentClaim from "../api/payment-claim.js";

function responseDouble() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; }
  };
}

async function call(request) {
  const response = responseDouble();
  await paymentClaim(request, response);
  return response;
}

async function expectCode(request, expectedStatus, expectedCode) {
  const response = await call(request);
  if (response.statusCode !== expectedStatus || response.payload?.code !== expectedCode) {
    throw new Error(`Expected ${expectedStatus}/${expectedCode}, got ${response.statusCode}/${response.payload?.code}`);
  }
  if (response.headers["Cache-Control"] !== "no-store, max-age=0") {
    throw new Error("Payment responses must disable caching.");
  }
}

const validBody = {
  product: "keyfloat-desktop",
  amountCny: 6,
  paymentReference: "202607220001",
  email: "buyer@example.com",
  language: "en"
};

await expectCode({ method: "GET" }, 405, "METHOD_NOT_ALLOWED");
await expectCode({ method: "POST", body: { ...validBody, amountCny: 1 } }, 400, "INVALID_CLAIM");
await expectCode({ method: "POST", body: { ...validBody, product: "keyfloat-macos" } }, 400, "INVALID_CLAIM");
await expectCode({ method: "POST", body: { ...validBody, paymentReference: "short" } }, 400, "INVALID_CLAIM");

delete process.env.PAYMENT_CLAIM_WEBHOOK_URL;
delete process.env.PAYMENT_CLAIM_WEBHOOK_TOKEN;
delete process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64;
delete process.env.KEYFLOAT_CHECKOUT_ENABLED;
await expectCode({ method: "POST", body: validBody }, 503, "CHECKOUT_DISABLED");

process.env.KEYFLOAT_CHECKOUT_ENABLED = "true";
await expectCode({ method: "POST", body: validBody }, 503, "NOT_CONFIGURED");

process.env.PAYMENT_CLAIM_WEBHOOK_URL = "http://payments.example.com/claim";
process.env.PAYMENT_CLAIM_WEBHOOK_TOKEN = "test-token";
await expectCode({ method: "POST", body: validBody }, 503, "NOT_CONFIGURED");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const privatePEM = privateKey.export({ format: "pem", type: "pkcs8" });
process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64 = Buffer.from(privatePEM, "utf8").toString("base64");
process.env.PAYMENT_CLAIM_WEBHOOK_URL = "https://payments.example.com/claim";
process.env.PAYMENT_CLAIM_WEBHOOK_TOKEN = "test-token";

const originalFetch = globalThis.fetch;
let forwardedRequest;
globalThis.fetch = async (url, options) => {
  forwardedRequest = { url: String(url), options };
  return { ok: true, json: async () => ({ verified: false }) };
};
await expectCode({ method: "POST", body: validBody }, 202, "PAYMENT_PENDING");

globalThis.fetch = async (url, options) => {
  forwardedRequest = { url: String(url), options };
  return {
    ok: true,
    json: async () => ({ verified: true, downloadURL: "https://downloads.example.com/keyfloat.dmg" })
  };
};
const accepted = await call({ method: "POST", body: validBody });
if (accepted.statusCode !== 200 || accepted.payload?.verified !== true ||
    typeof accepted.payload?.voucherCode !== "string" || accepted.payload.voucherCode.length < 100) {
  throw new Error("A verified payment did not return a sufficiently long voucher.");
}
if (accepted.payload.downloadURL !== "https://downloads.example.com/keyfloat.dmg") {
  throw new Error("A verified HTTPS installer URL was not forwarded.");
}
const [version, token, issuedAt, signatureText, ...extra] = accepted.payload.voucherCode.split(".");
if (version !== "KF1" || extra.length || !/[a-z]/.test(token) || !/[A-Z]/.test(token)) {
  throw new Error("Voucher format or mixed-case entropy is invalid.");
}
const signedPayload = `KF1|${token}|${issuedAt}|keyfloat-desktop`;
const signature = Buffer.from(signatureText, "base64url");
if (!crypto.verify(null, Buffer.from(signedPayload, "utf8"), publicKey, signature)) {
  throw new Error("Voucher signature does not verify with the matching public key.");
}
const forwardedPayload = JSON.parse(forwardedRequest.options.body);
if (forwardedRequest.url !== process.env.PAYMENT_CLAIM_WEBHOOK_URL ||
    forwardedRequest.options.headers.Authorization !== "Bearer test-token" ||
    forwardedPayload.amountCny !== 6 || forwardedPayload.product !== "keyfloat-desktop") {
  throw new Error("The payment claim was not forwarded correctly.");
}

globalThis.fetch = async () => ({ ok: false, json: async () => ({ code: "ALREADY_CLAIMED" }) });
await expectCode({ method: "POST", body: validBody }, 409, "ALREADY_CLAIMED");
globalThis.fetch = async () => { throw new Error("network unavailable"); };
await expectCode({ method: "POST", body: validBody }, 502, "UPSTREAM_ERROR");
globalThis.fetch = originalFetch;

delete process.env.PAYMENT_CLAIM_WEBHOOK_URL;
delete process.env.PAYMENT_CLAIM_WEBHOOK_TOKEN;
delete process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64;
delete process.env.KEYFLOAT_CHECKOUT_ENABLED;
console.log("Validated ¥6 payment guards, verification states, signed vouchers, downloads, and failure handling.");
