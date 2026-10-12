import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envPath = path.join(root, ".env.local");
const publicPath = path.join(root, "license-public-key.json");

if (fs.existsSync(envPath) && !process.argv.includes("--force")) {
  throw new Error(".env.local already exists. Refusing to replace the license signing key without --force.");
}

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const publicDER = publicKey.export({ format: "der", type: "spki" });
const publicRaw = publicDER.subarray(publicDER.length - 32);
const privatePEM = privateKey.export({ format: "pem", type: "pkcs8" });
const privateBase64 = Buffer.from(privatePEM, "utf8").toString("base64");
const publicBase64 = publicRaw.toString("base64");

fs.writeFileSync(
  envPath,
  `# Keep this file private. Configure the same value in the production server environment.\nKEYFLOAT_LICENSE_PRIVATE_KEY_BASE64=${privateBase64}\n`,
  { mode: 0o600 }
);
fs.chmodSync(envPath, 0o600);
fs.writeFileSync(
  publicPath,
  `${JSON.stringify({ algorithm: "Ed25519", version: "KF1", publicKeyBase64: publicBase64 }, null, 2)}\n`,
  { mode: 0o644 }
);

console.log(`Generated private signing configuration at ${envPath}`);
console.log(`Generated public verification key at ${publicPath}`);
console.log(`PUBLIC_KEY_BASE64=${publicBase64}`);
