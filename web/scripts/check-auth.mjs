import requestCode from "../api/auth/request-code.js";
import verifyCode from "../api/auth/verify-code.js";
import session from "../api/auth/session.js";
import logout from "../api/auth/logout.js";
import adminLogin from "../api/auth/admin-login.js";
import adminSession from "../api/auth/admin-session.js";
import adminLogout from "../api/auth/admin-logout.js";
import orders from "../api/orders.js";
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
process.env.KEYFLOAT_AUTH_EMAIL_PROVIDER = "console";
process.env.KEYFLOAT_AUTH_EXPOSE_DEV_CODE = "true";
process.env.KEYFLOAT_ADMIN_LOGIN_CODE = "TestAdmin42";
process.env.KEYFLOAT_ADMIN_EMAIL = "administrator@example.com";
store.resetMemoryStore();

function responseDouble() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

async function call(handler, request) {
  const response = responseDouble();
  await handler({ headers: {}, socket: { remoteAddress: "127.0.0.1" }, ...request }, response);
  return response;
}

let result = await call(requestCode, { method: "GET" });
if (result.statusCode !== 405) throw new Error("Request-code endpoint must reject GET.");

result = await call(requestCode, { method: "POST", body: { email: "invalid", language: "en" } });
if (result.statusCode !== 400 || result.payload?.code !== "INVALID_EMAIL") throw new Error("Invalid email was accepted.");

const email = "buyer@example.com";
result = await call(requestCode, { method: "POST", body: { email, language: "en" } });
const code = result.payload?.developmentCode;
if (result.statusCode !== 200 || !/^\d{6}$/.test(code) || result.payload.maskedEmail.includes("buyer")) {
  throw new Error("Verification code request did not complete securely.");
}
if (result.headers["Cache-Control"] !== "no-store, max-age=0") throw new Error("Auth responses must disable caching.");

result = await call(verifyCode, { method: "POST", body: { email, code: code === "000000" ? "111111" : "000000", remember: true } });
if (result.statusCode !== 401 || result.payload?.code !== "INVALID_CODE") throw new Error("An invalid verification code was accepted.");

result = await call(verifyCode, { method: "POST", body: { email, code, remember: true } });
const setCookie = result.headers["Set-Cookie"];
if (result.statusCode !== 200 || !result.payload?.authenticated || !/^kf_session=/.test(setCookie) ||
    !setCookie.includes("HttpOnly") || !setCookie.includes("SameSite=Lax")) {
  throw new Error("Successful verification did not establish a secure session.");
}
const cookie = setCookie.split(";")[0];

result = await call(session, { method: "GET", headers: { cookie } });
if (!result.payload?.authenticated || result.payload.user.email !== email) throw new Error("Session could not be restored.");

result = await call(orders, { method: "GET", headers: { cookie } });
if (result.statusCode !== 200 || result.payload.orders.length !== 0) throw new Error("New account should have an empty order history.");

await orderLibrary.appendOrder({
  email,
  product: "keyfloat-desktop",
  platform: "macos",
  amountCny: 6,
  paymentReference: "202607250001",
  voucherCode: "KF1.TestVoucher.MixedCase.Signature",
  purchasedAt: "2026-07-25T01:00:00.000Z",
  downloadURL: "https://downloads.example.com/keyfloat.dmg",
});
result = await call(orders, { method: "GET", headers: { cookie } });
const order = result.payload?.orders?.[0];
if (result.statusCode !== 200 || order?.voucherCode !== "KF1.TestVoucher.MixedCase.Signature" || order?.amountCny !== 6) {
  throw new Error("Authenticated order and voucher lookup failed.");
}

result = await call(logout, { method: "POST", headers: { cookie } });
if (result.statusCode !== 200 || !result.headers["Set-Cookie"].includes("Max-Age=0")) throw new Error("Logout did not clear the session.");
result = await call(orders, { method: "GET" });
if (result.statusCode !== 401 || result.payload?.code !== "AUTH_REQUIRED") throw new Error("Order history is accessible without authentication.");

result = await call(adminLogin, { method: "POST", body: { adminCode: "WrongAdminCode" } });
if (result.statusCode !== 401 || result.payload?.code !== "INVALID_CREDENTIALS") {
  throw new Error("Invalid administrator credentials were accepted.");
}
result = await call(adminLogin, { method: "POST", body: { adminCode: "TestAdmin42" } });
const adminCookie = result.headers["Set-Cookie"]?.split(";")[0];
if (result.statusCode !== 200 || result.payload?.user?.role !== "admin" || !adminCookie) {
  throw new Error("Administrator login did not establish a secure admin session.");
}
if (!/^kf_admin_session=/.test(adminCookie) || !result.headers["Set-Cookie"].includes("SameSite=Strict")) {
  throw new Error("Administrator login did not use the isolated strict admin cookie.");
}
result = await call(session, { method: "GET", headers: { cookie: adminCookie } });
if (result.payload?.authenticated !== false) {
  throw new Error("The customer login endpoint accepted an administrator cookie.");
}
result = await call(adminSession, { method: "GET", headers: { cookie: adminCookie } });
if (!result.payload?.authenticated || result.payload?.user?.role !== "admin" || result.payload?.user?.email !== "administrator@example.com") {
  throw new Error("Administrator session could not be restored on the isolated endpoint.");
}
result = await call(adminSession, { method: "GET", headers: { cookie } });
if (result.payload?.authenticated !== false) throw new Error("The administrator endpoint accepted a customer cookie.");
result = await call(adminLogout, { method: "POST", headers: { cookie: adminCookie } });
if (!result.headers["Set-Cookie"]?.startsWith("kf_admin_session=") || !result.headers["Set-Cookie"].includes("Max-Age=0")) {
  throw new Error("Administrator logout did not clear the isolated admin cookie.");
}

console.log("Validated email codes, isolated customer/admin sessions, order lookup, voucher recovery, and logout.");
