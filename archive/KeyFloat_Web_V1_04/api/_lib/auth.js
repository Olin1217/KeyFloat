const crypto = require("node:crypto");
const { isProduction, privateKey } = require("./store");
const { parseCookies } = require("./http");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_PATTERN = /^\d{6}$/;
const SESSION_COOKIE = "kf_session";
const ADMIN_SESSION_COOKIE = "kf_admin_session";
const CODE_TTL_SECONDS = 10 * 60;
const RESEND_SECONDS = 60;
const MAX_CODE_ATTEMPTS = 5;

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  return email.length <= 254 && EMAIL_PATTERN.test(email) ? email : undefined;
}

function maskEmail(email) {
  const [local, domain] = email.split("@");
  const visible = local.length <= 2 ? local.slice(0, 1) : local.slice(0, 2);
  return `${visible}${"•".repeat(Math.max(2, Math.min(6, local.length - visible.length)))}@${domain}`;
}

function requiredSecret(name) {
  const configured = process.env[name] || (name === "KEYFLOAT_AUTH_CODE_SECRET" ? process.env.KEYFLOAT_SESSION_SECRET : undefined);
  if (configured && configured.length >= 32) return configured;
  if (!isProduction()) return `keyfloat-local-development-${name}-only`;
  const error = new Error(`${name} is not configured.`);
  error.code = "AUTH_NOT_CONFIGURED";
  throw error;
}

function generateCode() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function generateSalt() {
  return crypto.randomBytes(16).toString("base64url");
}

function hashCode(email, code, salt) {
  return crypto
    .createHmac("sha256", requiredSecret("KEYFLOAT_AUTH_CODE_SECRET"))
    .update(`${email}|${code}|${salt}`)
    .digest("base64url");
}

function safeEqual(first, second) {
  const a = Buffer.from(String(first));
  const b = Buffer.from(String(second));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function codeKey(email) {
  return privateKey("auth-code", email);
}

function ipRateKey(ip) {
  return privateKey("auth-ip", ip);
}

function sessionSignature(payload) {
  return crypto.createHmac("sha256", requiredSecret("KEYFLOAT_SESSION_SECRET")).update(payload).digest("base64url");
}

function createSession(email, remember, role = "customer") {
  const issuedAt = Math.floor(Date.now() / 1_000);
  const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
  const safeRole = role === "admin" ? "admin" : "customer";
  const payload = Buffer.from(JSON.stringify({ v: 1, email, role: safeRole, iat: issuedAt, exp: issuedAt + maxAge }), "utf8").toString("base64url");
  return { token: `${payload}.${sessionSignature(payload)}`, maxAge, expiresAt: (issuedAt + maxAge) * 1_000 };
}

function readSessionCookie(request, cookieName, expectedRole) {
  const token = parseCookies(request)[cookieName];
  if (!token) return undefined;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra || !safeEqual(signature, sessionSignature(payload))) return undefined;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const email = normalizeEmail(session.email);
    const now = Math.floor(Date.now() / 1_000);
    if (session.v !== 1 || !email || !Number.isFinite(session.exp) || session.exp <= now) return undefined;
    const role = session.role === "admin" ? "admin" : "customer";
    if (role !== expectedRole) return undefined;
    return { email, role, expiresAt: session.exp * 1_000 };
  } catch {
    return undefined;
  }
}

function readSession(request) {
  return readSessionCookie(request, SESSION_COOKIE, "customer");
}

function readAdminSession(request) {
  return readSessionCookie(request, ADMIN_SESSION_COOKIE, "admin");
}

function sessionCookie(token, maxAge) {
  const secure = isProduction() ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function adminSessionCookie(token, maxAge) {
  const secure = isProduction() ? "; Secure" : "";
  return `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

function clearSessionCookie() {
  const secure = isProduction() ? "; Secure" : "";
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

function clearAdminSessionCookie() {
  const secure = isProduction() ? "; Secure" : "";
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

function exposeDevelopmentCode() {
  return !isProduction() && process.env.KEYFLOAT_AUTH_EXPOSE_DEV_CODE === "true";
}

module.exports = {
  CODE_PATTERN,
  CODE_TTL_SECONDS,
  MAX_CODE_ATTEMPTS,
  RESEND_SECONDS,
  adminSessionCookie,
  clearAdminSessionCookie,
  clearSessionCookie,
  codeKey,
  createSession,
  exposeDevelopmentCode,
  generateCode,
  generateSalt,
  hashCode,
  ipRateKey,
  maskEmail,
  normalizeEmail,
  readAdminSession,
  readSession,
  safeEqual,
  sessionCookie,
};
