import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvironment(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

const documentPath = path.resolve(process.argv[2] || "");
const expectedCount = Number(process.argv[3]);
const environmentFile = process.argv[4] || "/etc/keyfloat-web.env";
if (!process.argv[2] || !Number.isInteger(expectedCount) || expectedCount < 1) {
  throw new Error("Usage: verify-activation-batch.mjs <document.md> <expected-count> [environment-file]");
}

loadEnvironment(environmentFile);
process.env.NODE_ENV = "production";

const { normalizeActivationCode } = require(path.join(root, "api/_lib/activation-codes.js"));
const { getJSON, privateKey } = require(path.join(root, "api/_lib/store.js"));
const markdown = fs.readFileSync(documentPath, "utf8");
const codes = [...markdown.matchAll(/^\d{3}\. `(KF1(?:-[2-9A-HJ-KM-NP-Z]{5}){4})`$/gm)]
  .map((match) => match[1]);
if (codes.length !== expectedCount || new Set(codes).size !== expectedCount) {
  throw new Error("The activation-code document does not contain the expected number of unique codes.");
}

let activeRecords = 0;
for (const code of codes) {
  if (normalizeActivationCode(code) !== code) throw new Error("The document contains a malformed activation code.");
  const record = await getJSON(privateKey("activation-code", code));
  if (record?.status !== "active" || typeof record.voucherCode !== "string" || !record.voucherCode.startsWith("KF1.")) {
    throw new Error("An activation code is missing its active signed credential record.");
  }
  activeRecords += 1;
}

console.log(JSON.stringify({ uniqueCodes: codes.length, activeRecords }));
