import crypto from "node:crypto";
import alipayConfig from "../api/alipay/config.js";
import createOrder from "../api/alipay/create-order.js";
import orderStatus from "../api/alipay/order-status.js";
import notify from "../api/alipay/notify.js";
import ordersEndpoint from "../api/orders.js";
import adminPaymentClaims from "../api/admin/payment-claims.js";
import auth from "../api/_lib/auth.js";
import alipay from "../api/_lib/alipay.js";
import store from "../api/_lib/store.js";

process.env.NODE_ENV = "development";
delete process.env.VERCEL_ENV;
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;
process.env.KEYFLOAT_SESSION_SECRET = "alipay-test-session-secret-at-least-32-characters";
process.env.KEYFLOAT_AUTH_CODE_SECRET = "alipay-test-auth-code-secret-at-least-32-chars";
process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER = "console";
process.env.KEYFLOAT_SHORT_CODES_ENABLED = "true";
process.env.KEYFLOAT_ALIPAY_ENABLED = "true";
process.env.KEYFLOAT_ALIPAY_APP_ID = "2026000000000000";
process.env.KEYFLOAT_ALIPAY_SELLER_ID = "2088000000000000";
process.env.KEYFLOAT_ALIPAY_GATEWAY_URL = "http://127.0.0.1:19999/gateway.do";
process.env.KEYFLOAT_PUBLIC_BASE_URL = "http://127.0.0.1:4173";
store.resetMemoryStore();

const merchantKeys = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const alipayKeys = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const licenseKeys = crypto.generateKeyPairSync("ed25519");
process.env.KEYFLOAT_ALIPAY_PRIVATE_KEY_BASE64 = Buffer.from(merchantKeys.privateKey.export({ format: "pem", type: "pkcs8" })).toString("base64");
process.env.KEYFLOAT_ALIPAY_PUBLIC_KEY_BASE64 = Buffer.from(alipayKeys.publicKey.export({ format: "pem", type: "spki" })).toString("base64");
process.env.KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64 = Buffer.from(licenseKeys.privateKey.export({ format: "pem", type: "pkcs8" })).toString("base64");

function responseDouble() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
    end(payload = "") { this.payload = payload; return this; },
  };
}

async function call(handler, request) {
  const response = responseDouble();
  await handler({ headers: {}, socket: { remoteAddress: "127.0.0.1" }, ...request }, response);
  if (response.headers["Cache-Control"] !== "no-store, max-age=0") throw new Error("Alipay responses must disable caching.");
  return response;
}

function sessionCookie(email) {
  const session = auth.createSession(email, true);
  return `kf_session=${encodeURIComponent(session.token)}`;
}

function adminCookie(email = "administrator@example.com") {
  const session = auth.createSession(email, true, "admin");
  return `kf_admin_session=${encodeURIComponent(session.token)}`;
}

function signedGatewayResponse(method, response) {
  const key = `${method.replaceAll(".", "_")}_response`;
  const content = JSON.stringify(response);
  const signature = crypto.sign("RSA-SHA256", Buffer.from(content), alipayKeys.privateKey).toString("base64");
  return new Response(`{"${key}":${content},"sign":"${signature}"}`, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

let paid = false;
let gatewayOrderNo = "";
let gatewayRequests = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = async (_url, options) => {
  gatewayRequests += 1;
  const params = Object.fromEntries(new URLSearchParams(options.body));
  const signatureValid = crypto.verify(
    "RSA-SHA256",
    Buffer.from(alipay.canonicalParams(params, { includeSignType: true })),
    merchantKeys.publicKey,
    Buffer.from(params.sign, "base64")
  );
  if (!signatureValid || params.app_id !== process.env.KEYFLOAT_ALIPAY_APP_ID || params.sign_type !== "RSA2") {
    throw new Error("The merchant request was not signed correctly.");
  }
  const biz = JSON.parse(params.biz_content);
  if (params.method === "alipay.trade.precreate") {
    gatewayOrderNo = biz.out_trade_no;
    return signedGatewayResponse(params.method, {
      code: "10000",
      msg: "Success",
      out_trade_no: gatewayOrderNo,
      qr_code: `https://qr.alipay.com/mock-${gatewayOrderNo}`,
    });
  }
  if (params.method === "alipay.trade.query") {
    if (biz.out_trade_no !== gatewayOrderNo) throw new Error("The wrong merchant order was queried.");
    return signedGatewayResponse(params.method, {
      code: "10000",
      msg: "Success",
      out_trade_no: gatewayOrderNo,
      trade_no: paid ? "20260827000000000001" : undefined,
      trade_status: paid ? "TRADE_SUCCESS" : "WAIT_BUYER_PAY",
      total_amount: "6.00",
    });
  }
  throw new Error(`Unexpected Alipay method: ${params.method}`);
};

const buyer = "alipay-buyer@example.com";
const buyerCookie = sessionCookie(buyer);
let result = await call(alipayConfig, { method: "GET" });
if (result.statusCode !== 200 || !result.payload?.enabled) throw new Error("Configured Alipay checkout was not advertised as ready.");

result = await call(createOrder, {
  method: "POST",
  headers: { cookie: buyerCookie },
  body: { product: "keyfloat-desktop", amountCny: 6, email: buyer, language: "zh" },
});
const orderNo = result.payload?.order?.outTradeNo;
if (result.statusCode !== 200 || !/^[A-Za-z0-9_-]{8,64}$/.test(orderNo) ||
    !result.payload.order.qrCode.startsWith("https://qr.alipay.com/") ||
    !result.payload.order.qrImageDataUrl.startsWith("data:image/png;base64,")) {
  throw new Error("The website could not create a signed Alipay QR order.");
}

const repeated = await call(createOrder, {
  method: "POST",
  headers: { cookie: buyerCookie },
  body: { product: "keyfloat-desktop", amountCny: 6, email: buyer, language: "zh" },
});
if (repeated.payload?.order?.outTradeNo !== orderNo || gatewayRequests !== 1) {
  throw new Error("A repeated checkout created a second Alipay transaction.");
}

result = await call(orderStatus, { method: "GET", url: `/api/alipay/order-status?outTradeNo=${orderNo}`, headers: { cookie: buyerCookie } });
if (result.statusCode !== 200 || result.payload?.order?.status !== "pending" || result.payload.order.voucherCode) {
  throw new Error("An unpaid Alipay order exposed the wrong state.");
}

const notification = {
  notify_time: "2026-08-27 16:30:00",
  notify_type: "trade_status_sync",
  notify_id: "mock-notify-id",
  app_id: process.env.KEYFLOAT_ALIPAY_APP_ID,
  seller_id: process.env.KEYFLOAT_ALIPAY_SELLER_ID,
  out_trade_no: orderNo,
  trade_no: "20260827000000000001",
  trade_status: "TRADE_SUCCESS",
  total_amount: "6.00",
  sign_type: "RSA2",
};

function signNotification(payload) {
  return crypto.sign("RSA-SHA256", Buffer.from(alipay.canonicalParams(payload)), alipayKeys.privateKey).toString("base64");
}

result = await call(notify, { method: "POST", body: { ...notification, sign: "invalid" } });
if (result.statusCode !== 400 || result.payload?.code !== "ALIPAY_INVALID_SIGNATURE") {
  throw new Error("A forged Alipay callback was accepted.");
}

const tampered = { ...notification, total_amount: "0.01" };
tampered.sign = signNotification(tampered);
result = await call(notify, { method: "POST", body: tampered });
if (result.statusCode !== 400 || result.payload?.code !== "ALIPAY_AMOUNT_MISMATCH") {
  throw new Error("A signed callback with a tampered amount was accepted.");
}

paid = true;
notification.sign = signNotification(notification);
result = await call(notify, { method: "POST", body: notification });
if (result.statusCode !== 200 || result.payload !== "success") throw new Error("A valid Alipay payment callback was not acknowledged.");

result = await call(orderStatus, { method: "GET", url: `/api/alipay/order-status?outTradeNo=${orderNo}`, headers: { cookie: buyerCookie } });
const activationCode = result.payload?.order?.voucherCode;
if (result.statusCode !== 200 || result.payload?.order?.status !== "paid" || !/^KF1(?:-[A-Z2-9]{5}){4}$/.test(activationCode)) {
  throw new Error("A verified Alipay payment did not issue an activation code.");
}

const firstActivationCode = activationCode;
result = await call(notify, { method: "POST", body: notification });
if (result.statusCode !== 200) throw new Error("A repeated Alipay notification was not idempotent.");
result = await call(orderStatus, { method: "GET", url: `/api/alipay/order-status?outTradeNo=${orderNo}`, headers: { cookie: buyerCookie } });
if (result.payload?.order?.voucherCode !== firstActivationCode) throw new Error("A repeated Alipay callback issued a second activation code.");

result = await call(ordersEndpoint, { method: "GET", headers: { cookie: buyerCookie } });
if (result.payload?.orders?.length !== 1 || result.payload.orders[0].voucherCode !== firstActivationCode) {
  throw new Error("The Alipay purchase was not persisted in the verified buyer account.");
}

result = await call(adminPaymentClaims, {
  method: "GET",
  url: "/api/admin/payment-claims?scope=all",
  headers: { cookie: adminCookie() },
});
const adminRecord = result.payload?.claims?.find((claim) => claim.paymentProvider === "alipay");
if (result.statusCode !== 200 || adminRecord?.reviewReference !== orderNo ||
    adminRecord?.voucherCode !== firstActivationCode || adminRecord?.status !== "approved") {
  throw new Error("The verified Alipay purchase did not appear in administrator payment history.");
}

result = await call(orderStatus, {
  method: "GET",
  url: `/api/alipay/order-status?outTradeNo=${orderNo}`,
  headers: { cookie: sessionCookie("other-buyer@example.com") },
});
if (result.statusCode !== 404) throw new Error("A different customer could read the Alipay order.");

globalThis.fetch = realFetch;
delete process.env.KEYFLOAT_ALIPAY_APP_ID;
result = await call(alipayConfig, { method: "GET" });
if (result.payload?.enabled !== false) throw new Error("Incomplete Alipay credentials were advertised as enabled.");

console.log("Validated signed Alipay QR creation, active payment confirmation, callback verification, amount checks, customer isolation, and idempotent activation issuance.");
