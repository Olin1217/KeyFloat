const crypto = require("node:crypto");

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

module.exports = { issueVoucher, loadSigningKey, parseHTTPSURL };
