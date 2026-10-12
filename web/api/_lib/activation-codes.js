const crypto = require("node:crypto");
const {
  deleteKey,
  getJSON,
  privateKey,
  setJSON,
  setJSONIfAbsent,
  updateJSONMapEntry,
} = require("./store");

const CODE_PREFIX = "KF1";
const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const CODE_GROUPS = 4;
const CODE_GROUP_LENGTH = 5;
const INSTALLATION_ID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const REDEMPTION_LOCK_SECONDS = 20;

function activationCodeIndexKey() {
  return privateKey("activation-code-index", "v1");
}

function configuredDeviceLimit() {
  const configured = Number(process.env.KEYFLOAT_LICENSE_DEVICE_LIMIT || 3);
  return Number.isInteger(configured) && configured >= 1 && configured <= 20 ? configured : 3;
}

function randomCodeBody() {
  const bytes = crypto.randomBytes(CODE_GROUPS * CODE_GROUP_LENGTH);
  let body = "";
  for (const byte of bytes) body += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  return body;
}

function formatCodeBody(body) {
  const groups = [];
  for (let index = 0; index < body.length; index += CODE_GROUP_LENGTH) {
    groups.push(body.slice(index, index + CODE_GROUP_LENGTH));
  }
  return `${CODE_PREFIX}-${groups.join("-")}`;
}

function normalizeActivationCode(value) {
  const compact = String(value || "").trim().toUpperCase().replace(/[\s-]/g, "");
  const expectedLength = CODE_PREFIX.length + CODE_GROUPS * CODE_GROUP_LENGTH;
  if (compact.length !== expectedLength || !compact.startsWith(CODE_PREFIX)) return undefined;
  const body = compact.slice(CODE_PREFIX.length);
  if (![...body].every((character) => CODE_ALPHABET.includes(character))) return undefined;
  return formatCodeBody(body);
}

function codeRecordKey(activationCode) {
  return privateKey("activation-code", normalizeActivationCode(activationCode));
}

function installationDigest(installationId) {
  return crypto.createHash("sha256").update(String(installationId).toLowerCase()).digest("hex");
}

function activationCodeSource(paymentReference) {
  const reference = String(paymentReference || "");
  const manualBatch = reference.match(/^(KF-\d{14})-\d{3}$/);
  if (manualBatch) return { source: "manual_batch", batch: manualBatch[1] };
  return reference ? { source: "purchase", paymentReference: reference } : { source: "manual" };
}

function activationCodeSummary(activationCode, record) {
  const installations = record.installations && typeof record.installations === "object"
    ? Object.values(record.installations)
    : [];
  const platforms = [...new Set(installations.map((item) => item?.platform).filter(Boolean))].sort();
  return {
    activationCode,
    status: record.status === "active" ? "active" : "disabled",
    issuedAt: record.issuedAt,
    maxDevices: Number(record.maxDevices || configuredDeviceLimit()),
    deviceCount: installations.length,
    platforms,
    ...(record.lastRedeemedAt ? { lastRedeemedAt: record.lastRedeemedAt } : {}),
    ...activationCodeSource(record.paymentReference),
  };
}

async function syncActivationCodeIndex(activationCode, record) {
  const normalizedCode = normalizeActivationCode(activationCode);
  if (!normalizedCode || !record || typeof record !== "object") {
    const error = new Error("The activation-code record is invalid.");
    error.code = "ACTIVATION_CODE_INVALID";
    throw error;
  }
  const summary = activationCodeSummary(normalizedCode, record);
  await updateJSONMapEntry(activationCodeIndexKey(), normalizedCode, { set: summary });
  return summary;
}

async function registerActivationCode(activationCode) {
  const normalizedCode = normalizeActivationCode(activationCode);
  if (!normalizedCode) {
    const error = new Error("The activation code is invalid.");
    error.code = "ACTIVATION_CODE_INVALID";
    throw error;
  }
  const record = await getJSON(codeRecordKey(normalizedCode));
  if (!record || typeof record.voucherCode !== "string") {
    const error = new Error("The activation code was not found.");
    error.code = "ACTIVATION_CODE_INVALID";
    throw error;
  }
  return syncActivationCodeIndex(normalizedCode, record);
}

async function listActivationCodes() {
  const index = await getJSON(activationCodeIndexKey());
  if (!index || typeof index !== "object" || Array.isArray(index)) {
    return { activationCodes: [], metrics: { total: 0, available: 0, redeemed: 0, disabled: 0 } };
  }
  const activationCodes = Object.values(index)
    .filter((entry) => entry && normalizeActivationCode(entry.activationCode) === entry.activationCode)
    .map((entry) => ({
      activationCode: entry.activationCode,
      status: entry.status === "active" ? "active" : "disabled",
      issuedAt: entry.issuedAt,
      maxDevices: Number(entry.maxDevices || configuredDeviceLimit()),
      deviceCount: Math.max(0, Number(entry.deviceCount) || 0),
      platforms: Array.isArray(entry.platforms) ? entry.platforms.filter((value) => ["macos", "windows"].includes(value)) : [],
      source: ["manual", "manual_batch", "purchase"].includes(entry.source) ? entry.source : "manual",
      ...(entry.batch ? { batch: String(entry.batch) } : {}),
      ...(entry.paymentReference ? { paymentReference: String(entry.paymentReference) } : {}),
      ...(entry.lastRedeemedAt ? { lastRedeemedAt: entry.lastRedeemedAt } : {}),
    }))
    .sort((first, second) => {
      const dateDifference = new Date(second.issuedAt || 0) - new Date(first.issuedAt || 0);
      return dateDifference || first.activationCode.localeCompare(second.activationCode);
    });
  const metrics = activationCodes.reduce((result, entry) => {
    result.total += 1;
    if (entry.status !== "active") result.disabled += 1;
    else if (entry.deviceCount > 0) result.redeemed += 1;
    else result.available += 1;
    return result;
  }, { total: 0, available: 0, redeemed: 0, disabled: 0 });
  return { activationCodes, metrics };
}

async function issueActivationCredential({ createVoucher, email, paymentReference }) {
  if (typeof createVoucher !== "function") throw new TypeError("A voucher factory is required.");
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const activationCode = formatCodeBody(randomCodeBody());
    const voucherCode = createVoucher();
    const issuedAt = new Date().toISOString();
    const record = {
      version: 1,
      status: "active",
      activationCode,
      voucherCode,
      issuedAt,
      maxDevices: configuredDeviceLimit(),
      ownerHash: crypto.createHash("sha256").update(String(email || "").trim().toLowerCase()).digest("hex"),
      paymentReference: String(paymentReference || ""),
      installations: {},
    };
    if (await setJSONIfAbsent(codeRecordKey(activationCode), record)) {
      await syncActivationCodeIndex(activationCode, record);
      return { activationCode, voucherCode, issuedAt, maxDevices: record.maxDevices };
    }
  }
  const error = new Error("Unable to reserve a unique activation code.");
  error.code = "ACTIVATION_CODE_COLLISION";
  throw error;
}

async function redeemActivationCode({ activationCode, installationId, platform, appVersion }) {
  const normalizedCode = normalizeActivationCode(activationCode);
  if (!normalizedCode || !INSTALLATION_ID_PATTERN.test(String(installationId || ""))) {
    const error = new Error("The activation request is invalid.");
    error.code = "INVALID_ACTIVATION_REQUEST";
    throw error;
  }
  const normalizedPlatform = String(platform || "").toLowerCase();
  if (!["macos", "windows"].includes(normalizedPlatform)) {
    const error = new Error("The activation platform is invalid.");
    error.code = "INVALID_ACTIVATION_REQUEST";
    throw error;
  }

  const recordKey = codeRecordKey(normalizedCode);
  const lockKey = privateKey("activation-redemption-lock", normalizedCode);
  const locked = await setJSONIfAbsent(lockKey, { acquiredAt: Date.now() }, REDEMPTION_LOCK_SECONDS);
  if (!locked) {
    const error = new Error("The activation code is already being redeemed.");
    error.code = "ACTIVATION_BUSY";
    throw error;
  }

  try {
    const record = await getJSON(recordKey);
    if (!record || record.status !== "active" || typeof record.voucherCode !== "string") {
      const error = new Error("The activation code was not found.");
      error.code = "ACTIVATION_CODE_INVALID";
      throw error;
    }

    const digest = installationDigest(installationId);
    const installations = record.installations && typeof record.installations === "object"
      ? { ...record.installations }
      : {};
    const now = new Date().toISOString();
    if (!installations[digest] && Object.keys(installations).length >= Number(record.maxDevices || configuredDeviceLimit())) {
      const error = new Error("The activation device limit has been reached.");
      error.code = "DEVICE_LIMIT_REACHED";
      throw error;
    }

    installations[digest] = {
      platform: normalizedPlatform,
      appVersion: String(appVersion || "").slice(0, 32),
      firstRedeemedAt: installations[digest]?.firstRedeemedAt || now,
      lastRedeemedAt: now,
    };
    const updatedRecord = { ...record, activationCode: normalizedCode, installations, lastRedeemedAt: now };
    await setJSON(recordKey, updatedRecord);
    await syncActivationCodeIndex(normalizedCode, updatedRecord);
    return {
      voucherCode: record.voucherCode,
      activationCode: normalizedCode,
      deviceCount: Object.keys(installations).length,
      maxDevices: Number(record.maxDevices || configuredDeviceLimit()),
    };
  } finally {
    await deleteKey(lockKey);
  }
}

module.exports = {
  configuredDeviceLimit,
  issueActivationCredential,
  listActivationCodes,
  normalizeActivationCode,
  registerActivationCode,
  redeemActivationCode,
};
