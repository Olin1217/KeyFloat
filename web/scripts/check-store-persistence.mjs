import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
const dataFile = process.argv[3];

if (mode === "write" || mode === "read") {
  process.env.NODE_ENV = "production";
  process.env.KEYFLOAT_DATA_FILE = dataFile;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const store = (await import("../api/_lib/store.js")).default;

  if (mode === "write") {
    await store.setJSON("verification-code", { codeHash: "hash", attempts: 0 }, 600);
    await store.setJSON("permanent-record", { retained: true });
    await store.pushJSONList("orders", { reference: "KF-STORE-001" });
    await store.updateJSONMapEntry("analytics-users", "buyer@example.com", {
      setIfAbsent: { email: "buyer@example.com", visitCount: 0 },
      increment: { visitCount: 1 },
    });
    await store.updateJSONMapEntry("analytics-users", "buyer@example.com", { increment: { visitCount: 1 } });
    await store.updateJSONMapEntry("analytics-downloads", "macos", {
      setIfAbsent: { platform: "macos", clickCount: 0 },
      increment: { clickCount: 1 },
    });
    const first = await store.consumeRateLimit("login-rate", 3, 3_600);
    const second = await store.consumeRateLimit("login-rate", 3, 3_600);
    if (!first.allowed || first.count !== 1 || !second.allowed || second.count !== 2) process.exitCode = 1;
  } else {
    const verification = await store.getJSON("verification-code");
    const permanent = await store.getJSON("permanent-record");
    const orders = await store.getJSONList("orders");
    const analyticsUsers = await store.getJSON("analytics-users");
    const analyticsDownloads = await store.getJSON("analytics-downloads");
    const third = await store.consumeRateLimit("login-rate", 3, 3_600);
    const blocked = await store.consumeRateLimit("login-rate", 3, 3_600);
    if (verification?.codeHash !== "hash" || permanent?.retained !== true || orders?.[0]?.reference !== "KF-STORE-001" ||
        analyticsUsers?.["buyer@example.com"]?.visitCount !== 2 ||
        analyticsDownloads?.macos?.clickCount !== 1 ||
        !third.allowed || third.count !== 3 || blocked.allowed || blocked.count !== 3) process.exitCode = 1;
  }
} else {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "keyfloat-store-test-"));
  const file = path.join(directory, "data.json");
  const script = fileURLToPath(import.meta.url);
  try {
    for (const childMode of ["write", "read"]) {
      const result = spawnSync(process.execPath, [script, childMode, file], {
        env: { ...process.env, NODE_ENV: "production", KEYFLOAT_DATA_FILE: file },
        encoding: "utf8",
      });
      if (result.status !== 0) throw new Error(`Persistent store ${childMode} phase failed.`);
    }
    const fileMode = (await fs.stat(file)).mode & 0o777;
    if (fileMode !== 0o600) throw new Error("Persistent store data file is not private.");
    console.log("Validated verification codes, atomic rate limits, user/download analytics, and permanent order data across process restarts.");
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}
