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
const environmentFile = process.argv[3] || "/etc/keyfloat-web.env";
if (!process.argv[2] || !fs.existsSync(documentPath)) {
  throw new Error("Usage: register-activation-codes.mjs <activation-codes.md> [environment-file]");
}

loadEnvironment(environmentFile);
process.env.NODE_ENV = "production";

const { normalizeActivationCode, registerActivationCode } = require(path.join(root, "api/_lib/activation-codes.js"));
const markdown = fs.readFileSync(documentPath, "utf8");
const candidates = [...markdown.matchAll(/KF1(?:-[2-9A-HJ-KM-NP-Z]{5}){4}/g)].map((match) => match[0]);
const codes = [...new Set(candidates.map(normalizeActivationCode).filter(Boolean))];
if (!codes.length) throw new Error("No valid short activation codes were found in the document.");

for (const code of codes) await registerActivationCode(code);
console.log(JSON.stringify({ registered: codes.length }));
