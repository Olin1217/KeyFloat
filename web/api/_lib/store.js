const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const memoryStore = globalThis.__KEYFLOAT_MEMORY_STORE__ || new Map();
globalThis.__KEYFLOAT_MEMORY_STORE__ = memoryStore;
let fileStoreLoaded = false;
let fileMutationQueue = Promise.resolve();

function isProduction() {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

function redisConfiguration() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : undefined;
}

function fileConfiguration() {
  const configured = String(process.env.KEYFLOAT_DATA_FILE || "").trim();
  return configured ? path.resolve(configured) : undefined;
}

function assertPersistenceReady() {
  if (!redisConfiguration() && !fileConfiguration() && isProduction()) {
    const error = new Error("Persistent authentication storage is not configured.");
    error.code = "STORE_NOT_CONFIGURED";
    throw error;
  }
}

async function loadFileStore() {
  const file = fileConfiguration();
  if (!file || fileStoreLoaded) return;
  try {
    const payload = JSON.parse(await fs.readFile(file, "utf8"));
    for (const [key, entry] of Object.entries(payload)) {
      if (entry && Object.prototype.hasOwnProperty.call(entry, "value")) {
        memoryStore.set(key, {
          value: entry.value,
          expiresAt: Number.isFinite(entry.expiresAt) ? entry.expiresAt : null,
        });
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  fileStoreLoaded = true;
}

async function persistFileStore() {
  const file = fileConfiguration();
  if (!file) return;
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(Object.fromEntries(memoryStore), null, 2), { mode: 0o600 });
  await fs.rename(temporary, file);
}

function mutateFileStore(operation) {
  const run = fileMutationQueue.then(async () => {
    await loadFileStore();
    const result = await operation();
    await persistFileStore();
    return result;
  });
  fileMutationQueue = run.catch(() => undefined);
  return run;
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
  if (entry && Number.isFinite(entry.expiresAt) && entry.expiresAt <= Date.now()) memoryStore.delete(key);
}

function expirationFor(ttlSeconds) {
  return ttlSeconds ? Date.now() + ttlSeconds * 1_000 : null;
}

async function getJSON(key) {
  assertPersistenceReady();
  const remote = await redisCommand(["GET", key]);
  if (remote !== undefined) return remote ? JSON.parse(remote) : undefined;
  await fileMutationQueue;
  await loadFileStore();
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
  return mutateFileStore(() => {
    memoryStore.set(key, { value, expiresAt: expirationFor(ttlSeconds) });
  });
}

async function setJSONIfAbsent(key, value, ttlSeconds) {
  assertPersistenceReady();
  const serialized = JSON.stringify(value);
  const command = ttlSeconds
    ? ["SET", key, serialized, "NX", "EX", String(ttlSeconds)]
    : ["SET", key, serialized, "NX"];
  const remote = await redisCommand(command);
  if (remote !== undefined) return remote === "OK";
  return mutateFileStore(() => {
    purgeMemoryKey(key);
    if (memoryStore.has(key)) return false;
    memoryStore.set(key, { value, expiresAt: expirationFor(ttlSeconds) });
    return true;
  });
}

async function consumeRateLimit(key, maximum, ttlSeconds, field = "count") {
  if (!Number.isInteger(maximum) || maximum < 1 || !Number.isInteger(ttlSeconds) || ttlSeconds < 1) {
    throw new TypeError("Rate-limit settings must be positive integers.");
  }

  assertPersistenceReady();
  const script = [
    "local raw = redis.call('GET', KEYS[1])",
    "local current = 0",
    "if raw then",
    "  local ok, value = pcall(cjson.decode, raw)",
    "  if ok and value[ARGV[1]] then current = tonumber(value[ARGV[1]]) or 0 end",
    "end",
    "if current >= tonumber(ARGV[2]) then return {0, current} end",
    "current = current + 1",
    "local updated = {}",
    "updated[ARGV[1]] = current",
    "redis.call('SET', KEYS[1], cjson.encode(updated), 'EX', ARGV[3])",
    "return {1, current}",
  ].join("\n");
  const remote = await redisCommand(["EVAL", script, "1", key, field, String(maximum), String(ttlSeconds)]);
  if (remote !== undefined) {
    return { allowed: Number(remote?.[0]) === 1, count: Number(remote?.[1]) || 0 };
  }

  return mutateFileStore(() => {
    purgeMemoryKey(key);
    const entry = memoryStore.get(key);
    const current = Number(entry?.value?.[field]) || 0;
    if (current >= maximum) return { allowed: false, count: current };
    const count = current + 1;
    memoryStore.set(key, { value: { [field]: count }, expiresAt: expirationFor(ttlSeconds) });
    return { allowed: true, count };
  });
}

async function updateJSONMapEntry(key, entryKey, { set = {}, setIfAbsent = {}, increment = {} } = {}) {
  if (typeof entryKey !== "string" || !entryKey || entryKey.length > 254) {
    throw new TypeError("Map entry keys must be non-empty strings no longer than 254 characters.");
  }
  for (const [field, value] of Object.entries(increment)) {
    if (!field || !Number.isFinite(value)) throw new TypeError("Map increments must contain finite numeric values.");
  }

  assertPersistenceReady();
  const script = [
    "local root = {}",
    "local raw = redis.call('GET', KEYS[1])",
    "if raw then",
    "  local ok, decoded = pcall(cjson.decode, raw)",
    "  if ok and type(decoded) == 'table' then root = decoded end",
    "end",
    "local entry = root[ARGV[1]]",
    "if type(entry) ~= 'table' then entry = {} end",
    "local defaults = cjson.decode(ARGV[2])",
    "for field, value in pairs(defaults) do if entry[field] == nil then entry[field] = value end end",
    "local assigned = cjson.decode(ARGV[3])",
    "for field, value in pairs(assigned) do entry[field] = value end",
    "local increments = cjson.decode(ARGV[4])",
    "for field, value in pairs(increments) do entry[field] = (tonumber(entry[field]) or 0) + tonumber(value) end",
    "root[ARGV[1]] = entry",
    "redis.call('SET', KEYS[1], cjson.encode(root))",
    "return cjson.encode(entry)",
  ].join("\n");
  const remote = await redisCommand([
    "EVAL", script, "1", key, entryKey,
    JSON.stringify(setIfAbsent), JSON.stringify(set), JSON.stringify(increment),
  ]);
  if (remote !== undefined) return JSON.parse(remote);

  return mutateFileStore(() => {
    purgeMemoryKey(key);
    const current = memoryStore.get(key)?.value;
    const root = current && typeof current === "object" && !Array.isArray(current) ? { ...current } : {};
    const existing = root[entryKey];
    const entry = existing && typeof existing === "object" && !Array.isArray(existing) ? { ...existing } : {};
    for (const [field, value] of Object.entries(setIfAbsent)) {
      if (entry[field] === undefined || entry[field] === null) entry[field] = value;
    }
    Object.assign(entry, set);
    for (const [field, value] of Object.entries(increment)) {
      entry[field] = (Number(entry[field]) || 0) + value;
    }
    root[entryKey] = entry;
    memoryStore.set(key, { value: root, expiresAt: null });
    return entry;
  });
}

async function deleteKey(key) {
  assertPersistenceReady();
  const remote = await redisCommand(["DEL", key]);
  if (remote !== undefined) return;
  return mutateFileStore(() => memoryStore.delete(key));
}

async function getJSONList(key, limit = 100) {
  assertPersistenceReady();
  const remote = await redisCommand(["LRANGE", key, "0", String(Math.max(0, limit - 1))]);
  if (remote !== undefined) return Array.isArray(remote) ? remote.map((value) => JSON.parse(value)) : [];
  await fileMutationQueue;
  await loadFileStore();
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
  return mutateFileStore(() => {
    purgeMemoryKey(key);
    const current = memoryStore.get(key)?.value;
    const updated = [value, ...(Array.isArray(current) ? current : [])].slice(0, limit);
    memoryStore.set(key, { value: updated, expiresAt: null });
  });
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
  consumeRateLimit,
  deleteKey,
  getJSON,
  getJSONList,
  isProduction,
  privateKey,
  resetMemoryStore,
  pushJSONList,
  setJSON,
  setJSONIfAbsent,
  updateJSONMapEntry,
};
