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

const count = Number(process.argv[2]);
const output = path.resolve(process.argv[3] || "");
const environmentFile = process.argv[4] || "/etc/keyfloat-web.env";
if (!Number.isInteger(count) || count < 1 || count > 1_000 || !process.argv[3]) {
  throw new Error("Usage: generate-activation-batch.mjs <count:1-1000> <output.md> [environment-file]");
}

loadEnvironment(environmentFile);
process.env.NODE_ENV = "production";

const { issueActivationCredential, normalizeActivationCode } = require(path.join(root, "api/_lib/activation-codes.js"));
const { issueVoucher, loadSigningKey } = require(path.join(root, "api/_lib/vouchers.js"));
const signingKey = loadSigningKey();
if (!signingKey) throw new Error("The KeyFloat Ed25519 signing key is not configured.");

const batchID = `KF-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}`;
const codes = [];
for (let index = 0; index < count; index += 1) {
  const credential = await issueActivationCredential({
    createVoucher: () => issueVoucher(signingKey),
    email: "manual-batch@keyfloat.invalid",
    paymentReference: `${batchID}-${String(index + 1).padStart(3, "0")}`,
  });
  if (normalizeActivationCode(credential.activationCode) !== credential.activationCode) {
    throw new Error("An invalid activation code was generated.");
  }
  codes.push(credential.activationCode);
}

if (new Set(codes).size !== count) throw new Error("The generated activation codes are not unique.");

const lines = [
  "# KeyFloat 激活码",
  "",
  `- 数量：${count}`,
  `- 批次：${batchID}`,
  `- 生成时间：${new Date().toISOString()}`,
  "- 格式：`KF1-XXXXX-XXXXX-XXXXX-XXXXX`",
  "- 每枚激活码最多支持 3 个安装实例",
  "- 激活码属于敏感凭证，请勿公开传播",
  "",
  "## 激活码清单",
  "",
  ...codes.map((code, index) => `${String(index + 1).padStart(3, "0")}. \`${code}\``),
  "",
];

fs.mkdirSync(path.dirname(output), { recursive: true, mode: 0o700 });
fs.writeFileSync(output, `${lines.join("\n")}\n`, { encoding: "utf8", mode: 0o600, flag: "wx" });
console.log(JSON.stringify({ batchID, count, output }));
