import crypto from "node:crypto";
import paymentClaim from "../api/payment-claim.js";
import paymentStatus from "../api/payment-status.js";
import adminPaymentClaims from "../api/admin/payment-claims.js";
import auth from "../api/_lib/auth.js";
import orderLibrary from "../api/_lib/orders.js";
import store from "../api/_lib/store.js";

process.env.NODE_ENV = "development";
delete process.env.VERCEL_ENV;
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;
process.env.KEYFLOAT_SESSION_SECRET = "test-session-secret-at-least-32-characters-long";
process.env.KEYFLOAT_AUTH_CODE_SECRET = "test-code-secret-at-least-32-characters-long-value";
store.resetMemoryStore();

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

async function call(handler, request) {
  const response = responseDouble();
  await handler({ headers: {}, socket: { remoteAddress: "127.0.0.1" }, ...request }, response);
  if (response.headers["Cache-Control"] !== "no-store, max-age=0") {
    throw new Error("Payment responses must disable caching.");
  }
  return response;
}

async function expectCode(handler, request, expectedStatus, expectedCode) {
  const response = await call(handler, request);
  if (response.statusCode !== expectedStatus || response.payload?.code !== expectedCode) {
    throw new Error(`Expected ${expectedStatus}/${expectedCode}, got ${response.statusCode}/${response.payload?.code}`);
  }
  return response;
}

function sessionCookie(email, role = "customer") {
  const session = auth.createSession(email, true, role);
  const name = role === "admin" ? "kf_admin_session" : "kf_session";
  return `${name}=${encodeURIComponent(session.token)}`;
}

const customerEmail = "buyer@example.com";
const customerCookie = sessionCookie(customerEmail);
const adminCookie = sessionCookie("administrator@example.com", "admin");
const validBody = {
  product: "keyfloat-desktop",
  amountCny: 6,
  email: customerEmail,
  language: "en"
};

await expectCode(paymentClaim, { method: "GET" }, 405, "METHOD_NOT_ALLOWED");
await expectCode(paymentClaim, { method: "POST", headers: { cookie: customerCookie }, body: { ...validBody, amountCny: 1 } }, 400, "INVALID_CLAIM");
delete process.env.KEYFLOAT_CHECKOUT_ENABLED;
await expectCode(paymentClaim, { method: "POST", headers: { cookie: customerCookie }, body: validBody }, 503, "CHECKOUT_DISABLED");

process.env.KEYFLOAT_CHECKOUT_ENABLED = "true";
await expectCode(paymentClaim, { method: "POST", body: validBody }, 401, "AUTH_REQUIRED");
await expectCode(paymentClaim, {
  method: "POST",
  headers: { cookie: customerCookie },
  body: { ...validBody, email: "other@example.com" }
}, 403, "EMAIL_MISMATCH");

const submitted = await call(paymentClaim, { method: "POST", headers: { cookie: customerCookie }, body: validBody });
const claimId = submitted.payload?.claim?.id;
const reviewReference = submitted.payload?.claim?.reviewReference;
if (submitted.statusCode !== 202 || submitted.payload?.code !== "REVIEW_PENDING" ||
    !/^[a-f0-9]{24}$/.test(claimId) || !/^KF-\d{12}-[A-F0-9]{4}$/.test(reviewReference) ||
    submitted.payload.claim.status !== "pending" || "paymentReference" in submitted.payload.claim) {
  throw new Error("A valid payment was not placed into manual review.");
}
const repeatedSubmission = await call(paymentClaim, { method: "POST", headers: { cookie: customerCookie }, body: validBody });
if (repeatedSubmission.payload?.claim?.id !== claimId || repeatedSubmission.payload?.claim?.reviewReference !== reviewReference) {
  throw new Error("Repeated clicks created duplicate pending claims for one verified email.");
}

let status = await call(paymentStatus, {
  method: "GET",
  url: `/api/payment-status?claimId=${claimId}`,
  headers: { cookie: customerCookie }
});
if (status.statusCode !== 200 || status.payload?.claim?.status !== "pending" || status.payload.claim.voucherCode) {
  throw new Error("A pending customer claim exposed the wrong status or a voucher.");
}
await expectCode(paymentStatus, { method: "GET", url: `/api/payment-status?claimId=${claimId}` }, 401, "AUTH_REQUIRED");

await expectCode(adminPaymentClaims, { method: "GET", headers: { cookie: customerCookie } }, 401, "AUTH_REQUIRED");
let pending = await call(adminPaymentClaims, { method: "GET", headers: { cookie: adminCookie } });
if (pending.statusCode !== 200 || pending.payload?.claims?.length !== 1 || pending.payload.claims[0].email !== customerEmail ||
    pending.payload.claims[0].reviewReference !== reviewReference || "paymentReference" in pending.payload.claims[0]) {
  throw new Error("The administrator did not receive the pending payment claim.");
}
await expectCode(adminPaymentClaims, {
  method: "POST",
  headers: { cookie: adminCookie },
  body: { action: "approve", claimId }
}, 503, "SIGNING_NOT_CONFIGURED");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const privatePEM = privateKey.export({ format: "pem", type: "pkcs8" });
process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64 = Buffer.from(privatePEM, "utf8").toString("base64");
process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL = "https://downloads.example.com/keyfloat.dmg";
process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER = "webhook";
process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL = "https://mail.example.com/keyfloat";
process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN = "test-mail-token";

const originalFetch = globalThis.fetch;
let deliveredEmail;
let emailAttempts = 0;
globalThis.fetch = async () => {
  emailAttempts += 1;
  throw new Error("Temporary email provider outage");
};

const approved = await call(adminPaymentClaims, {
  method: "POST",
  headers: { cookie: adminCookie },
  body: { action: "approve", claimId }
});
const voucher = approved.payload?.claim?.voucherCode;
if (approved.statusCode !== 200 || approved.payload?.claim?.status !== "approved" ||
    typeof voucher !== "string" || voucher.length < 100) {
  throw new Error("Administrator approval did not issue a voucher.");
}
if (approved.payload.emailDelivered !== false || approved.payload.claim.emailDeliveryStatus !== "failed") {
  throw new Error("Email failure must not block web voucher delivery and must be recorded for retry.");
}
if (approved.payload.claim.downloadURL !== process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL) {
  throw new Error("The approved order did not receive the configured installer URL.");
}

const [version, token, issuedAt, signatureText, ...extra] = voucher.split(".");
if (version !== "KF1" || extra.length || !/[a-z]/.test(token) || !/[A-Z]/.test(token)) {
  throw new Error("Voucher format or mixed-case entropy is invalid.");
}
const signedPayload = `KF1|${token}|${issuedAt}|keyfloat-desktop`;
if (!crypto.verify(null, Buffer.from(signedPayload, "utf8"), publicKey, Buffer.from(signatureText, "base64url"))) {
  throw new Error("Voucher signature does not verify with the matching public key.");
}

globalThis.fetch = async (url, options) => {
  emailAttempts += 1;
  deliveredEmail = { url: String(url), options, payload: JSON.parse(options.body) };
  return { ok: true, status: 200 };
};
const retriedEmail = await call(adminPaymentClaims, {
  method: "POST",
  headers: { cookie: adminCookie },
  body: { action: "resend-email", claimId }
});
if (retriedEmail.statusCode !== 200 || retriedEmail.payload?.emailDelivered !== true ||
    retriedEmail.payload?.claim?.emailDeliveryStatus !== "sent") {
  throw new Error("A failed voucher email could not be retried by the administrator.");
}
if (deliveredEmail?.url !== process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL ||
    deliveredEmail.options.headers.Authorization !== `Bearer ${process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN}` ||
    deliveredEmail.payload?.type !== "keyfloat.voucher-issued" || deliveredEmail.payload?.to !== customerEmail ||
    deliveredEmail.payload?.voucherCode !== voucher || deliveredEmail.payload?.reviewReference !== reviewReference) {
  throw new Error("The voucher email did not contain the exact web voucher and verified order details.");
}

const attemptsBeforeRepeat = emailAttempts;
const repeatedApproval = await call(adminPaymentClaims, {
  method: "POST",
  headers: { cookie: adminCookie },
  body: { action: "approve", claimId }
});
if (repeatedApproval.payload?.claim?.voucherCode !== voucher) {
  throw new Error("Repeated approval issued a second voucher.");
}
if (!repeatedApproval.payload?.emailAlreadySent || emailAttempts !== attemptsBeforeRepeat) {
  throw new Error("Repeated approval must not send a duplicate voucher email.");
}
globalThis.fetch = originalFetch;

status = await call(paymentStatus, {
  method: "GET",
  url: `/api/payment-status?claimId=${claimId}`,
  headers: { cookie: customerCookie }
});
if (status.payload?.claim?.status !== "approved" || status.payload.claim.voucherCode !== voucher) {
  throw new Error("The customer did not receive the approved voucher through status polling.");
}
const orders = await orderLibrary.listOrders(customerEmail);
if (orders.length !== 1 || orders[0].voucherCode !== voucher) {
  throw new Error("The approved voucher was not persisted for account recovery.");
}
pending = await call(adminPaymentClaims, { method: "GET", headers: { cookie: adminCookie } });
if (pending.payload?.claims?.length !== 0) throw new Error("Approved payments must leave the pending queue.");
const history = await call(adminPaymentClaims, {
  method: "GET",
  url: "/api/admin/payment-claims?scope=all",
  headers: { cookie: adminCookie }
});
if (history.payload?.claims?.length !== 1 || history.payload.claims[0].status !== "approved" ||
    history.payload.claims[0].emailDeliveryStatus !== "sent") {
  throw new Error("The administrator history did not retain the approved payment.");
}

const otherCookie = sessionCookie("other@example.com");
const otherSubmission = await call(paymentClaim, {
  method: "POST",
  headers: { cookie: otherCookie },
  body: { ...validBody, email: "other@example.com" }
});
if (otherSubmission.statusCode !== 202 || otherSubmission.payload?.claim?.id === claimId ||
    otherSubmission.payload?.claim?.reviewReference === reviewReference) {
  throw new Error("A separate verified customer could not create an independent review claim.");
}

delete process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL;
delete process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64;
delete process.env.KEYFLOAT_CHECKOUT_ENABLED;
delete process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER;
delete process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL;
delete process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN;
console.log("Validated no-reference payment review, duplicate-click protection, identical web/email vouchers, isolated admin review, polling, and recovery.");
