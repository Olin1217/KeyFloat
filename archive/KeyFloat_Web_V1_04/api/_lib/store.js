const crypto = require("node:crypto");

const memoryStore = globalThis.__KEYFLOAT_MEMORY_STORE__ || new Map();
globalThis.__KEYFLOAT_MEMORY_STORE__ = memoryStore;

function isProduction() {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

function redisConfiguration() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : undefined;
}

function assertPersistenceReady() {
  if (!redisConfiguration() && isProduction()) {
    const error = new Error("Persistent authentication storage is not configured.");
    error.code = "STORE_NOT_CONFIGURED";
    throw error;
  }
}

async function redisCommand(command) {
  const configuration = redisConfiguration();
  if (!configuration) return undefined;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(configuration.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Store request failed with ${response.status}.`);
    const payload = await response.json();
    if (payload.error) throw new Error(payload.error);
    return payload.result;
  } finally {
    clearTimeout(timeout);
  }
}

function purgeMemoryKey(key) {
  const entry = memoryStore.get(key);
  if (entry && entry.expiresAt <= Date.now()) memoryStore.delete(key);
}

async function getJSON(key) {
  assertPersistenceReady();
  const remote = await redisCommand(["GET", key]);
  if (remote !== undefined) return remote ? JSON.parse(remote) : undefined;
  purgeMemoryKey(key);
  return memoryStore.get(key)?.value;
}

async function setJSON(key, value, ttlSeconds) {
  assertPersistenceReady();
  const serialized = JSON.stringify(value);
  const command = ttlSeconds
    ? ["SET", key, serialized, "EX", String(ttlSeconds)]
    : ["SET", key, serialized];
  const remote = await redisCommand(command);
  if (remote !== undefined) return;
  memoryStore.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1_000 : Number.POSITIVE_INFINITY });
}

async function setJSONIfAbsent(key, value, ttlSeconds) {
  assertPersistenceReady();
  const serialized = JSON.stringify(value);
  const command = ttlSeconds
    ? ["SET", key, serialized, "NX", "EX", String(ttlSeconds)]
    : ["SET", key, serialized, "NX"];
  const remote = await redisCommand(command);
  if (remote !== undefined) return remote === "OK";
  purgeMemoryKey(key);
  if (memoryStore.has(key)) return false;
  memoryStore.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1_000 : Number.POSITIVE_INFINITY });
  return true;
}

async function deleteKey(key) {
  assertPersistenceReady();
  const remote = await redisCommand(["DEL", key]);
  if (remote !== undefined) return;
  memoryStore.delete(key);
}

async function getJSONList(key, limit = 100) {
  assertPersistenceReady();
  const remote = await redisCommand(["LRANGE", key, "0", String(Math.max(0, limit - 1))]);
  if (remote !== undefined) return Array.isArray(remote) ? remote.map((value) => JSON.parse(value)) : [];
  purgeMemoryKey(key);
  const value = memoryStore.get(key)?.value;
  return Array.isArray(value) ? value.slice(0, limit) : [];
}

async function pushJSONList(key, value, limit = 100) {
  assertPersistenceReady();
  const serialized = JSON.stringify(value);
  const remote = await redisCommand(["LPUSH", key, serialized]);
  if (remote !== undefined) {
    await redisCommand(["LTRIM", key, "0", String(Math.max(0, limit - 1))]);
    return;
  }
  purgeMemoryKey(key);
  const current = memoryStore.get(key)?.value;
  const updated = [value, ...(Array.isArray(current) ? current : [])].slice(0, limit);
  memoryStore.set(key, { value: updated, expiresAt: Number.POSITIVE_INFINITY });
}

function privateKey(namespace, value) {
  const digest = crypto.createHash("sha256").update(String(value)).digest("hex");
  return `keyfloat:${namespace}:${digest}`;
}

function resetMemoryStore() {
  memoryStore.clear();
}

module.exports = {
  assertPersistenceReady,
  deleteKey,
  getJSON,
  getJSONList,
  isProduction,
  privateKey,
  resetMemoryStore,
  pushJSONList,
  setJSON,
  setJSONIfAbsent,
};
