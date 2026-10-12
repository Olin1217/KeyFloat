const crypto = require("node:crypto");
const QRCode = require("qrcode");
const { appendOrder } = require("./orders");
const {
  deleteKey,
  getJSON,
  getJSONList,
  privateKey,
  assertPersistenceReady,
  pushJSONList,
  setJSON,
  setJSONIfAbsent,
} = require("./store");
const { sendVoucherEmail } = require("./mailer");
const { issueActivationCredential } = require("./activation-codes");
const { issueVoucher, loadSigningKey, parseHTTPSURL } = require("./vouchers");

const PRODUCT_AMOUNTS_CNY = Object.freeze({ "keyfloat-desktop": 6 });
const ORDER_TTL_SECONDS = 2 * 60 * 60;
const FINALIZE_LOCK_SECONDS = 30;
const SUCCESS_STATUSES = new Set(["TRADE_SUCCESS", "TRADE_FINISHED"]);

function isProduction() {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

function decodeKey(value) {
  const source = String(value || "").trim();
  if (!source) return undefined;
  const pem = source.includes("BEGIN ") ? source.replace(/\\n/g, "\n") : Buffer.from(source, "base64").toString("utf8");
  return pem.trim();
}

function configuredURL(value, { requireHTTPS = false } = {}) {
  if (!value) return undefined;
  const parsed = parseHTTPSURL(String(value).trim());
  if (parsed) return parsed.toString();
  if (!requireHTTPS && /^http:\/\/127\.0\.0\.1(?::\d+)?(?:\/|$)/.test(String(value))) return String(value);
  if (!requireHTTPS && /^http:\/\/localhost(?::\d+)?(?:\/|$)/.test(String(value))) return String(value);
  return undefined;
}

function alipayConfiguration({ requireComplete = true } = {}) {
  const appId = String(process.env.KEYFLOAT_ALIPAY_APP_ID || "").trim();
  const privateKeyPEM = decodeKey(process.env.KEYFLOAT_ALIPAY_PRIVATE_KEY_BASE64 || process.env.KEYFLOAT_ALIPAY_PRIVATE_KEY);
  const publicKeyPEM = decodeKey(process.env.KEYFLOAT_ALIPAY_PUBLIC_KEY_BASE64 || process.env.KEYFLOAT_ALIPAY_PUBLIC_KEY);
  const gatewayURL = configuredURL(process.env.KEYFLOAT_ALIPAY_GATEWAY_URL || "https://openapi.alipay.com/gateway.do");
  const publicBaseURL = configuredURL(process.env.KEYFLOAT_PUBLIC_BASE_URL, { requireHTTPS: isProduction() })?.replace(/\/$/, "");
  const notifyURL = configuredURL(process.env.KEYFLOAT_ALIPAY_NOTIFY_URL || (publicBaseURL ? `${publicBaseURL}/api/alipay/notify` : ""), { requireHTTPS: isProduction() });
  let privateKey;
  let publicKey;
  try {
    if (privateKeyPEM) privateKey = crypto.createPrivateKey(privateKeyPEM);
    if (publicKeyPEM) publicKey = crypto.createPublicKey(publicKeyPEM);
  } catch {
    privateKey = undefined;
    publicKey = undefined;
  }

  const complete = Boolean(appId && privateKey && publicKey && gatewayURL && notifyURL);
  if (requireComplete && !complete) {
    const error = new Error("Alipay server credentials are not configured.");
    error.code = "ALIPAY_NOT_CONFIGURED";
    throw error;
  }
  if (privateKey && privateKey.asymmetricKeyType !== "rsa") {
    const error = new Error("The Alipay merchant private key must be RSA.");
    error.code = "ALIPAY_KEY_INVALID";
    throw error;
  }
  if (publicKey && publicKey.asymmetricKeyType !== "rsa") {
    const error = new Error("The Alipay public key must be RSA.");
    error.code = "ALIPAY_KEY_INVALID";
    throw error;
  }
  return {
    appId,
    privateKey,
    publicKey,
    gatewayURL,
    notifyURL,
    subject: String(process.env.KEYFLOAT_ALIPAY_SUBJECT || "KeyFloat activation code").slice(0, 256),
    timeoutExpress: String(process.env.KEYFLOAT_ALIPAY_TIMEOUT_EXPRESS || "30m").slice(0, 10),
    sellerId: String(process.env.KEYFLOAT_ALIPAY_SELLER_ID || "").trim(),
    complete,
  };
}

function automaticAlipayReady() {
  try {
    const configuration = alipayConfiguration({ requireComplete: false });
    const configuredDownload = process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL;
    if (configuredDownload && !parseHTTPSURL(configuredDownload)) return false;
    assertPersistenceReady();
    return configuration.complete && Boolean(loadSigningKey()) && process.env.KEYFLOAT_SHORT_CODES_ENABLED === "true";
  } catch {
    return false;
  }
}

function canonicalParams(params, { includeSignType = false } = {}) {
  return Object.keys(params)
    .filter((key) => key !== "sign" && (includeSignType || key !== "sign_type"))
    .filter((key) => params[key] !== undefined && params[key] !== null && String(params[key]) !== "")
    .sort()
    .map((key) => `${key}=${String(params[key])}`)
    .join("&");
}

function signParams(params, privateKey) {
  return crypto.sign("RSA-SHA256", Buffer.from(canonicalParams(params, { includeSignType: true }), "utf8"), privateKey).toString("base64");
}

function verifyParams(params, publicKey) {
  if (!params?.sign || !publicKey) return false;
  return crypto.verify("RSA-SHA256", Buffer.from(canonicalParams(params), "utf8"), publicKey, Buffer.from(String(params.sign), "base64"));
}

function formatTimestamp(date = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}

function orderKey(outTradeNo) {
  return privateKey("alipay-order", outTradeNo);
}

function pendingEmailKey(email) {
  return privateKey("alipay-pending-email", email);
}

function finalizeLockKey(outTradeNo) {
  return privateKey("alipay-finalize-lock", outTradeNo);
}

function recentOrdersKey() {
  return privateKey("alipay-orders", "recent");
}

function generateOutTradeNo() {
  return `KF${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(7).toString("hex").toUpperCase()}`.slice(0, 64);
}

function expectedAmount(product) {
  return PRODUCT_AMOUNTS_CNY[product];
}

function amountMatches(actual, expected) {
  const actualNumber = Number(actual);
  return Number.isFinite(actualNumber) && actualNumber.toFixed(2) === Number(expected).toFixed(2);
}

function responseKeyFor(method) {
  return method.replaceAll(".", "_") + "_response";
}

function extractResponseContent(raw, responseKey) {
  const marker = `"${responseKey}"`;
  const markerIndex = raw.indexOf(marker);
  if (markerIndex < 0) return undefined;
  const colonIndex = raw.indexOf(":", markerIndex + marker.length);
  const start = raw.indexOf("{", colonIndex + 1);
  if (colonIndex < 0 || start < 0) return undefined;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < raw.length; index += 1) {
    const character = raw[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) return raw.slice(start, index + 1);
  }
  return undefined;
}

function parseResponse(method, raw, publicKey) {
  let payload;
  try { payload = JSON.parse(raw); }
  catch {
    const error = new Error("Alipay returned malformed JSON.");
    error.code = "ALIPAY_INVALID_RESPONSE";
    throw error;
  }
  const responseKey = responseKeyFor(method);
  const response = payload?.[responseKey];
  if (!response) {
    const error = new Error("Alipay returned an invalid response.");
    error.code = "ALIPAY_INVALID_RESPONSE";
    throw error;
  }
  const signedContent = extractResponseContent(raw, responseKey);
  if (!payload.sign || !signedContent || !crypto.verify("RSA-SHA256", Buffer.from(signedContent, "utf8"), publicKey, Buffer.from(String(payload.sign), "base64"))) {
    const error = new Error("The Alipay response signature is invalid.");
    error.code = "ALIPAY_INVALID_RESPONSE_SIGNATURE";
    throw error;
  }
  if (response.code !== "10000") {
    const error = new Error(response.msg || "Alipay request failed.");
    error.code = `ALIPAY_${response.sub_code || response.code || "REQUEST_FAILED"}`;
    throw error;
  }
  return response;
}

async function callAlipay(method, bizContent, configuration = alipayConfiguration()) {
  const params = {
    app_id: configuration.appId,
    method,
    format: "JSON",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: formatTimestamp(),
    version: "1.0",
    ...(method === "alipay.trade.precreate" ? { notify_url: configuration.notifyURL } : {}),
    biz_content: JSON.stringify(bizContent),
  };
  params.sign = signParams(params, configuration.privateKey);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(configuration.gatewayURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" },
      body: new URLSearchParams(params).toString(),
      signal: controller.signal,
    });
    if (!response.ok) {
      const error = new Error(`Alipay gateway returned HTTP ${response.status}.`);
      error.code = "ALIPAY_GATEWAY_FAILED";
      throw error;
    }
    const raw = await response.text();
    return parseResponse(method, raw, configuration.publicKey);
  } catch (error) {
    if (error.name === "AbortError") error.code = "ALIPAY_TIMEOUT";
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function publicOrder(order, { includeQRCode = false } = {}) {
  return {
    id: order.id || order.outTradeNo,
    outTradeNo: order.outTradeNo,
    product: order.product,
    amountCny: order.amountCny,
    status: order.status,
    paymentStatus: order.tradeStatus || "WAIT_BUYER_PAY",
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    ...(order.voucherCode ? { voucherCode: order.voucherCode } : {}),
    ...(includeQRCode && order.qrCode ? { qrCode: order.qrCode } : {}),
    ...(includeQRCode && order.qrImageDataUrl ? { qrImageDataUrl: order.qrImageDataUrl } : {}),
  };
}

function adminOrder(order) {
  return {
    ...publicOrder(order),
    email: order.email,
    language: order.language,
    tradeNo: order.tradeNo,
    emailDeliveryStatus: order.emailDeliveryStatus || "pending",
    emailSentAt: order.emailSentAt,
    emailLastAttemptAt: order.emailLastAttemptAt,
  };
}

async function createAlipayOrder({ email, product, amountCny, language }) {
  const configuration = alipayConfiguration();
  const expected = expectedAmount(product);
  if (expected === undefined || !amountMatches(amountCny, expected)) {
    const error = new Error("The Alipay order amount is invalid.");
    error.code = "INVALID_ALIPAY_ORDER";
    throw error;
  }

  const existingId = await getJSON(pendingEmailKey(email));
  if (existingId) {
    const existing = await getJSON(orderKey(existingId));
    if (existing && existing.status === "pending" && existing.expiresAt > Date.now()) {
      await pushJSONList(recentOrdersKey(), existing.outTradeNo, 500);
      return publicOrder(existing, { includeQRCode: true });
    }
    await deleteKey(pendingEmailKey(email));
  }

  const outTradeNo = generateOutTradeNo();
  const response = await callAlipay("alipay.trade.precreate", {
    out_trade_no: outTradeNo,
    total_amount: Number(expected).toFixed(2),
    subject: configuration.subject,
    timeout_express: configuration.timeoutExpress,
  }, configuration);
  const qrCode = String(response.qr_code || "").trim();
  if (!qrCode) {
    const error = new Error("Alipay did not return a payment QR code.");
    error.code = "ALIPAY_QR_MISSING";
    throw error;
  }
  const now = new Date().toISOString();
  const order = {
    id: crypto.randomBytes(12).toString("hex"),
    outTradeNo,
    email,
    product,
    amountCny: expected,
    language: language === "zh" ? "zh" : "en",
    qrCode,
    qrImageDataUrl: await QRCode.toDataURL(qrCode, { errorCorrectionLevel: "M", margin: 1, width: 360 }),
    status: "pending",
    tradeStatus: "WAIT_BUYER_PAY",
    createdAt: now,
    expiresAt: Date.now() + ORDER_TTL_SECONDS * 1_000,
  };
  const reserved = await setJSONIfAbsent(orderKey(outTradeNo), order, ORDER_TTL_SECONDS);
  if (!reserved) {
    const error = new Error("Unable to reserve the Alipay order.");
    error.code = "ALIPAY_ORDER_BUSY";
    throw error;
  }
  await setJSON(pendingEmailKey(email), outTradeNo, ORDER_TTL_SECONDS);
  await pushJSONList(recentOrdersKey(), outTradeNo, 500);
  return publicOrder(order, { includeQRCode: true });
}

async function listPaidAlipayOrders() {
  const recent = await getJSONList(recentOrdersKey(), 500);
  const unique = [...new Set(recent.filter((value) => /^[A-Za-z0-9_-]{8,64}$/.test(String(value))))];
  const orders = await Promise.all(unique.map((outTradeNo) => getJSON(orderKey(outTradeNo))));
  return orders
    .filter((order) => order?.status === "paid" && order.voucherCode)
    .map(adminOrder)
    .sort((first, second) => new Date(second.paidAt || 0) - new Date(first.paidAt || 0));
}

async function queryAlipayOrder(outTradeNo, configuration = alipayConfiguration()) {
  let response;
  try {
    response = await callAlipay("alipay.trade.query", { out_trade_no: outTradeNo }, configuration);
  } catch (error) {
    if (String(error.code || "").includes("ACQ.TRADE_NOT_EXIST")) {
      return { outTradeNo, tradeStatus: "WAIT_BUYER_PAY" };
    }
    throw error;
  }
  return {
    outTradeNo: String(response.out_trade_no || outTradeNo),
    tradeNo: response.trade_no ? String(response.trade_no) : undefined,
    tradeStatus: String(response.trade_status || "WAIT_BUYER_PAY"),
    totalAmount: response.total_amount,
    buyerLogonId: response.buyer_logon_id,
  };
}

async function deliverVoucher(order) {
  const attemptedAt = new Date().toISOString();
  try {
    await sendVoucherEmail({
      email: order.email,
      language: order.language,
      voucherCode: order.voucherCode,
      reviewReference: order.outTradeNo,
      amountCny: order.amountCny,
      ...(parseHTTPSURL(process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL) ? { downloadURL: process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL } : {}),
      idempotencyKey: `keyfloat-alipay-${order.outTradeNo}`,
    });
    return { emailDeliveryStatus: "sent", emailSentAt: attemptedAt, emailLastAttemptAt: attemptedAt };
  } catch (error) {
    return { emailDeliveryStatus: "failed", emailLastAttemptAt: attemptedAt, emailErrorCode: error.code || "EMAIL_DELIVERY_FAILED" };
  }
}

async function finalizeAlipayOrder(outTradeNo, payment = {}) {
  const normalized = String(outTradeNo || "").trim();
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(normalized)) {
    const error = new Error("The Alipay order number is invalid.");
    error.code = "INVALID_ALIPAY_ORDER";
    throw error;
  }
  const lockKey = finalizeLockKey(normalized);
  if (!await setJSONIfAbsent(lockKey, { acquiredAt: Date.now() }, FINALIZE_LOCK_SECONDS)) {
    const error = new Error("The Alipay order is already being finalized.");
    error.code = "ALIPAY_ORDER_BUSY";
    throw error;
  }
  try {
    let order = await getJSON(orderKey(normalized));
    if (!order) {
      const error = new Error("The Alipay order was not found.");
      error.code = "ALIPAY_ORDER_NOT_FOUND";
      throw error;
    }
    if (!amountMatches(payment.totalAmount ?? order.amountCny, order.amountCny)) {
      const error = new Error("The Alipay amount does not match the KeyFloat order.");
      error.code = "ALIPAY_AMOUNT_MISMATCH";
      throw error;
    }
    const tradeStatus = String(payment.tradeStatus || order.tradeStatus || "");
    if (tradeStatus === "TRADE_CLOSED") {
      const closed = { ...order, status: "closed", tradeStatus, updatedAt: new Date().toISOString() };
      await setJSON(orderKey(normalized), closed, ORDER_TTL_SECONDS);
      await deleteKey(pendingEmailKey(order.email));
      return publicOrder(closed);
    }
    if (!SUCCESS_STATUSES.has(tradeStatus)) {
      return publicOrder({ ...order, tradeStatus });
    }
    if (order.status !== "paid") {
      const signingKey = loadSigningKey();
      if (!signingKey) {
        const error = new Error("Activation signing is not configured.");
        error.code = "SIGNING_NOT_CONFIGURED";
        throw error;
      }
      const credential = await issueActivationCredential({
        createVoucher: () => issueVoucher(signingKey),
        email: order.email,
        paymentReference: order.outTradeNo,
      });
      const paidAt = new Date().toISOString();
      const storedOrder = await appendOrder({
        email: order.email,
        product: order.product,
        platform: "macos",
        amountCny: order.amountCny,
        paymentReference: order.outTradeNo,
        voucherCode: credential.activationCode,
        purchasedAt: paidAt,
        ...(parseHTTPSURL(process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL) ? { downloadURL: process.env.KEYFLOAT_INSTALLER_DOWNLOAD_URL } : {}),
      });
      order = {
        ...order,
        status: "paid",
        tradeStatus,
        tradeNo: payment.tradeNo,
        voucherCode: storedOrder.voucherCode,
        paidAt,
        updatedAt: paidAt,
      };
      await setJSON(orderKey(normalized), order);
      await deleteKey(pendingEmailKey(order.email));
    }
    if (order.emailDeliveryStatus !== "sent") {
      const delivery = await deliverVoucher(order);
      order = { ...order, ...delivery, updatedAt: new Date().toISOString() };
      await setJSON(orderKey(normalized), order);
    }
    return publicOrder(order);
  } finally {
    await deleteKey(lockKey);
  }
}

async function checkAndFinalizeAlipayOrder(outTradeNo) {
  const configuration = alipayConfiguration();
  const payment = await queryAlipayOrder(outTradeNo, configuration);
  return finalizeAlipayOrder(outTradeNo, payment);
}

function normalizeNotification(body) {
  return Object.fromEntries(Object.entries(body || {}).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value ?? "")]));
}

async function handleAlipayNotification(body) {
  const configuration = alipayConfiguration();
  const notification = normalizeNotification(body);
  if (!verifyParams(notification, configuration.publicKey)) {
    const error = new Error("The Alipay notification signature is invalid.");
    error.code = "ALIPAY_INVALID_SIGNATURE";
    throw error;
  }
  if (notification.app_id !== configuration.appId || (configuration.sellerId && notification.seller_id !== configuration.sellerId)) {
    const error = new Error("The Alipay notification merchant is invalid.");
    error.code = "ALIPAY_INVALID_MERCHANT";
    throw error;
  }
  const order = await getJSON(orderKey(notification.out_trade_no));
  if (!order) {
    const error = new Error("The Alipay notification order was not found.");
    error.code = "ALIPAY_ORDER_NOT_FOUND";
    throw error;
  }
  if (!amountMatches(notification.total_amount, order.amountCny)) {
    const error = new Error("The Alipay notification amount does not match.");
    error.code = "ALIPAY_AMOUNT_MISMATCH";
    throw error;
  }
  const payment = {
    outTradeNo: notification.out_trade_no,
    tradeNo: notification.trade_no,
    tradeStatus: notification.trade_status,
    totalAmount: notification.total_amount,
  };
  if (!SUCCESS_STATUSES.has(notification.trade_status)) return { accepted: true, order: publicOrder({ ...order, tradeStatus: notification.trade_status }) };
  const verified = await queryAlipayOrder(notification.out_trade_no, configuration);
  if (verified.outTradeNo !== notification.out_trade_no ||
      (notification.trade_no && verified.tradeNo && notification.trade_no !== verified.tradeNo) ||
      !SUCCESS_STATUSES.has(verified.tradeStatus) || !amountMatches(verified.totalAmount, order.amountCny)) {
    const error = new Error("The Alipay query did not confirm a successful payment.");
    error.code = "ALIPAY_PAYMENT_NOT_CONFIRMED";
    throw error;
  }
  payment.tradeStatus = verified.tradeStatus;
  payment.tradeNo = verified.tradeNo || payment.tradeNo;
  payment.totalAmount = verified.totalAmount;
  return { accepted: true, order: await finalizeAlipayOrder(notification.out_trade_no, payment) };
}

async function getAlipayOrderForCustomer(outTradeNo, email, { refresh = false } = {}) {
  const order = await getJSON(orderKey(String(outTradeNo || "").trim()));
  if (!order || order.email !== email) return undefined;
  if (refresh && order.status === "pending") return checkAndFinalizeAlipayOrder(order.outTradeNo);
  return publicOrder(order, { includeQRCode: order.status === "pending" });
}

async function redeliverAlipayVoucher(outTradeNo) {
  const order = await getJSON(orderKey(String(outTradeNo || "").trim()));
  if (!order || order.status !== "paid" || !order.voucherCode) {
    const error = new Error("The paid Alipay order was not found.");
    error.code = "ALIPAY_ORDER_NOT_FOUND";
    throw error;
  }
  await setJSON(orderKey(order.outTradeNo), { ...order, emailDeliveryStatus: "failed" });
  const updated = await finalizeAlipayOrder(order.outTradeNo, {
    tradeNo: order.tradeNo,
    tradeStatus: order.tradeStatus,
    totalAmount: order.amountCny,
  });
  return adminOrder(await getJSON(orderKey(updated.outTradeNo)));
}

module.exports = {
  SUCCESS_STATUSES,
  alipayConfiguration,
  automaticAlipayReady,
  canonicalParams,
  checkAndFinalizeAlipayOrder,
  createAlipayOrder,
  finalizeAlipayOrder,
  getAlipayOrderForCustomer,
  handleAlipayNotification,
  listPaidAlipayOrders,
  normalizeNotification,
  redeliverAlipayVoucher,
  signParams,
  verifyParams,
};
