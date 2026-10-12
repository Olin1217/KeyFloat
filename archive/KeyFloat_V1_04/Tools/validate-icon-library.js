#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = path.resolve(projectRoot, "..", "icons");
const bundleRoot = path.join(projectRoot, "KeyFloat", "SoftwareIcons");
const manifest = JSON.parse(fs.readFileSync(path.join(sourceRoot, "official-icon-sources.json"), "utf8"));
const viewSource = fs.readFileSync(path.join(projectRoot, "KeyFloat", "KeyFloatView.swift"), "utf8");
const ids = new Set();

for (const icon of manifest.icons) {
  if (ids.has(icon.id)) throw new Error(`Duplicate icon id: ${icon.id}`);
  ids.add(icon.id);
  if (!/^https:\/\//.test(icon.sourcePage)) throw new Error(`${icon.id} has no HTTPS official source page.`);
  if (!(typeof icon.assetURL === "string" && (/^https:\/\//.test(icon.assetURL) || icon.assetURL.startsWith("local-official-download:")))) {
    throw new Error(`${icon.id} has no reviewed first-party asset URL.`);
  }
  if (!(typeof icon.sourceKind === "string" && icon.sourceKind.startsWith("official-"))) {
    throw new Error(`${icon.id} has no official source classification.`);
  }
  const sourceFile = path.join(sourceRoot, icon.file);
  const bundleFile = path.join(bundleRoot, icon.file);
  for (const root of [sourceRoot, bundleRoot]) {
    const file = path.join(root, icon.file);
    if (!fs.existsSync(file)) throw new Error(`Missing ${file}`);
    const markup = fs.readFileSync(file, "utf8");
    if (!/<svg\b/i.test(markup)) throw new Error(`${file} is not SVG markup.`);
    if (/<script\b|onload\s*=|onerror\s*=/i.test(markup)) throw new Error(`${file} contains executable SVG content.`);
  }
  if (!fs.readFileSync(sourceFile).equals(fs.readFileSync(bundleFile))) {
    throw new Error(`${icon.id} differs between the reviewed source library and app bundle.`);
  }
  if (typeof icon.padding !== "number" || icon.padding < 0 || icon.padding > 0.25) {
    throw new Error(`${icon.id} has an invalid presentation padding.`);
  }
  if (icon.background !== undefined && !/^#[0-9A-F]{6}$/i.test(icon.background)) {
    throw new Error(`${icon.id} has an invalid solid background color.`);
  }
  const escapedID = icon.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const presentationMatch = viewSource.match(new RegExp(
    `"${escapedID}"\\s*:\\s*\\.init\\(insetRatio:\\s*([0-9.]+),\\s*backgroundHex:\\s*(nil|"#[0-9A-Fa-f]{6}")\\)`
  ));
  if (!presentationMatch) {
    throw new Error(`${icon.id} is not mapped by SoftwareIconRepository.`);
  }
  const mappedPadding = Number(presentationMatch[1]);
  const mappedBackground = presentationMatch[2] === "nil" ? undefined : presentationMatch[2].slice(1, -1).toUpperCase();
  if (mappedPadding !== icon.padding || mappedBackground !== icon.background?.toUpperCase()) {
    throw new Error(`${icon.id} presentation differs between the reviewed manifest and SwiftUI mapping.`);
  }
}

const supportedExtensions = new Set([".svg", ".png", ".jpg", ".jpeg", ".ico"]);
const bundled = fs.readdirSync(bundleRoot).filter((name) => supportedExtensions.has(path.extname(name).toLowerCase()));
const bundledIDs = new Set();
let rasterCount = 0;

for (const name of bundled) {
  const extension = path.extname(name).toLowerCase();
  const id = path.basename(name, extension);
  if (bundledIDs.has(id)) throw new Error(`Multiple bundled icon formats exist for '${id}'.`);
  bundledIDs.add(id);
  const file = path.join(bundleRoot, name);
  const bytes = fs.readFileSync(file);
  if (extension === ".svg") {
    const markup = bytes.toString("utf8");
    if (!/<svg\b/i.test(markup)) throw new Error(`${name} is not SVG markup.`);
    if (/<script\b|onload\s*=|onerror\s*=/i.test(markup)) throw new Error(`${name} contains executable SVG content.`);
    continue;
  }
  rasterCount += 1;
  if (bytes.length > 64 * 1024) throw new Error(`${name} exceeds the 64 KiB raster icon limit.`);
  if (extension === ".png") {
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    if (bytes.length < 24 || !bytes.subarray(0, 8).equals(pngSignature)) {
      throw new Error(`${name} is not a valid PNG.`);
    }
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    if (width !== 128 || height !== 128) {
      throw new Error(`${name} must be 128 × 128 px, received ${width} × ${height}.`);
    }
  }
}

if (!viewSource.includes('["svg", "png", "jpg", "jpeg", "ico"]')) {
  throw new Error("SoftwareIconRepository does not advertise all supported bundled icon formats.");
}

console.log(
  `Validated ${manifest.icons.length} reviewed first-party SVG sources and ${bundled.length} bundled icons (${rasterCount} compressed raster icons).`
);
