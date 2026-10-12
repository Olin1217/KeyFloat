import fs from "node:fs";
import path from "node:path";

const webRoot = path.resolve(import.meta.dirname, "..");
const publicKeyFile = JSON.parse(fs.readFileSync(path.join(webRoot, "license-public-key.json"), "utf8"));
const swiftPath = path.resolve(webRoot, "..", "KeyFloat-Xcode", "KeyFloat", "LicenseService.swift");
const swift = fs.readFileSync(swiftPath, "utf8");
const match = swift.match(/productionPublicKeyBase64\s*=\s*"([^"]+)"/);

if (publicKeyFile.algorithm !== "Ed25519" || publicKeyFile.version !== "KF1") {
  throw new Error("The public license metadata is invalid.");
}
if (!match || match[1] !== publicKeyFile.publicKeyBase64) {
  throw new Error("Website and macOS client license public keys are out of sync.");
}
const key = Buffer.from(publicKeyFile.publicKeyBase64, "base64");
if (key.length !== 32) throw new Error("The Ed25519 public key must contain exactly 32 bytes.");

console.log("Validated the shared KF1 Ed25519 public key across website and macOS client.");
