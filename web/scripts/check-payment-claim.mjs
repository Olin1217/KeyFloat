import crypto from "node:crypto";
import paymentClaim from "../api/payment-claim.js";
import paymentStatus from "../api/payment-status.js";
import redeemLicense from "../api/license/redeem.js";
import adminPaymentClaims from "../api/admin/payment-claims.js";
import adminLicenses from "../api/admin/licenses.js";
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
process.env.KEYFLOAT_SHORT_CODES_ENABLED = "true";
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
const activationCode = approved.payload?.claim?.voucherCode;
if (approved.statusCode !== 200 || approved.payload?.claim?.status !== "approved" ||
    !/^KF1(?:-[2-9A-HJ-KM-NP-Z]{5}){4}$/.test(activationCode)) {
  throw new Error("Administrator approval did not issue a Windows-style short activation code.");
}
if (approved.payload.emailDelivered !== false || approved.payload.claim.emailDeliveryStatus !== "failed") {
  throw new Error("Email failure must not block web voucher delivery and must be recorded for retry.");
}
if (approved.payload.claim.downloadURL !== process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL) {
  throw new Error("The approved order did not receive the configured installer URL.");
}

await expectCode(adminLicenses, { method: "GET", headers: { cookie: customerCookie } }, 401, "AUTH_REQUIRED");
let inventory = await call(adminLicenses, { method: "GET", headers: { cookie: adminCookie } });
if (inventory.statusCode !== 200 || inventory.payload?.metrics?.total !== 1 ||
    inventory.payload?.metrics?.available !== 1 || inventory.payload?.metrics?.redeemed !== 0 ||
    inventory.payload?.activationCodes?.[0]?.activationCode !== activationCode) {
  throw new Error("A newly issued activation code did not enter the administrator inventory.");
}

const installationId = "9d4fe615-9d2a-4e5c-8490-2f723db420f1";
const redemption = await call(redeemLicense, {
  method: "POST",
  body: { code: activationCode.toLowerCase(), installationId, platform: "macos", appVersion: "1.0.4" }
});
const voucher = redemption.payload?.license?.voucherCode;
if (redemption.statusCode !== 200 || redemption.payload?.license?.activationCode !== activationCode ||
    redemption.payload?.license?.deviceCount !== 1 || redemption.payload?.license?.maxDevices !== 3) {
  throw new Error("The short activation code did not redeem into a signed offline voucher.");
}
inventory = await call(adminLicenses, { method: "GET", headers: { cookie: adminCookie } });
if (inventory.payload?.metrics?.available !== 0 || inventory.payload?.metrics?.redeemed !== 1 ||
    inventory.payload?.activationCodes?.[0]?.deviceCount !== 1 ||
    !inventory.payload?.activationCodes?.[0]?.platforms?.includes("macos")) {
  throw new Error("A redeemed activation code did not update the administrator inventory.");
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
    deliveredEmail.payload?.voucherCode !== activationCode || deliveredEmail.payload?.reviewReference !== reviewReference) {
  throw new Error("The activation email did not contain the exact short code and verified order details.");
}

const attemptsBeforeRepeat = emailAttempts;
const repeatedApproval = await call(adminPaymentClaims, {
  method: "POST",
  headers: { cookie: adminCookie },
  body: { action: "approve", claimId }
});
if (repeatedApproval.payload?.claim?.voucherCode !== activationCode) {
  throw new Error("Repeated approval issued a second activation code.");
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
if (status.payload?.claim?.status !== "approved" || status.payload.claim.voucherCode !== activationCode) {
  throw new Error("The customer did not receive the approved short code through status polling.");
}
const orders = await orderLibrary.listOrders(customerEmail);
if (orders.length !== 1 || orders[0].voucherCode !== activationCode) {
  throw new Error("The approved short code was not persisted for account recovery.");
}

const repeatedRedemption = await call(redeemLicense, {
  method: "POST",
  body: { code: activationCode, installationId, platform: "macos", appVersion: "1.0.4" }
});
if (repeatedRedemption.payload?.license?.voucherCode !== voucher || repeatedRedemption.payload?.license?.deviceCount !== 1) {
  throw new Error("A repeated redemption from the same installation was not idempotent.");
}
for (const id of ["44a3d73f-f92f-4d39-84f4-40b53cad6b80", "fd7f9cd4-930f-493b-a7a2-c47c990daf18"]) {
  const additional = await call(redeemLicense, {
    method: "POST",
    body: { code: activationCode, installationId: id, platform: "windows", appVersion: "1.0.5" }
  });
  if (additional.statusCode !== 200) throw new Error("A permitted additional device could not redeem the code.");
}
await expectCode(redeemLicense, {
  method: "POST",
  body: {
    code: activationCode,
    installationId: "55a3d73f-f92f-4d39-84f4-40b53cad6b80",
    platform: "windows",
    appVersion: "1.0.5"
  }
}, 409, "DEVICE_LIMIT_REACHED");
inventory = await call(adminLicenses, { method: "GET", headers: { cookie: adminCookie } });
if (inventory.payload?.activationCodes?.[0]?.deviceCount !== 3 ||
    !inventory.payload?.activationCodes?.[0]?.platforms?.includes("windows")) {
  throw new Error("Activation inventory did not retain the complete cross-platform device count.");
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
delete process.env.KEYFLOAT_SHORT_CODES_ENABLED;
delete process.env.KEYFLOAT_CHECKOUT_ENABLED;
delete process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER;
delete process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_URL;
delete process.env.KEYFLOAT_AUTH_EMAIL_WEBHOOK_TOKEN;
console.log("Validated no-reference payment review, duplicate-click protection, identical web/email vouchers, isolated admin review, polling, and recovery.");
