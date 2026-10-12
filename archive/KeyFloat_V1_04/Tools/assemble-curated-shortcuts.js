#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const batchRoot = path.join(__dirname, "shortcut_batches");
const output = path.join(projectRoot, "KeyFloat", "curated-shortcuts-mac.json");
const supplementOutput = path.join(projectRoot, "KeyFloat", "curated-supplements-mac.json");
const batchNames = ["academic.json", "creative.json", "technical.json"];
const supplementBatchNames = [
  "academic-existing.json",
  "creative-existing.json",
  "technical-existing.json",
];
const software = [];
const ids = new Set();

for (const batchName of batchNames) {
  const batchPath = path.join(batchRoot, batchName);
  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  if (!Array.isArray(batch.software)) throw new Error(`${batchName} has no software array.`);
  for (const pack of batch.software) {
    if (ids.has(pack.id)) throw new Error(`Duplicate curated software id: ${pack.id}`);
    if (pack.dataStatus !== "curated") throw new Error(`${pack.id} is not marked curated.`);
    if (!pack.categories?.length) throw new Error(`${pack.id} has no shortcut categories.`);
    ids.add(pack.id);
    software.push(pack);
  }
}

software.sort((left, right) => left.id.localeCompare(right.id));
const shortcutCount = software.reduce(
  (total, pack) => total + pack.categories.reduce((sum, category) => sum + category.items.length, 0),
  0
);
const library = {
  schemaVersion: 1,
  platform: "macOS",
  generatedAt: "2026-07-22",
  generationPolicy: "Official sources where available; ChatGPT 5.6 Sol curated macOS defaults for remaining catalog gaps.",
  software
};
fs.writeFileSync(output, `${JSON.stringify(library, null, 2)}\n`);
console.log(`Assembled ${software.length} curated software packs and ${shortcutCount} shortcuts.`);

const supplements = [];
const supplementIDs = new Set();
for (const batchName of supplementBatchNames) {
  const batchPath = path.join(batchRoot, batchName);
  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  if (!Array.isArray(batch.software)) throw new Error(`${batchName} has no software array.`);
  for (const pack of batch.software) {
    if (supplementIDs.has(pack.id)) throw new Error(`Duplicate supplement software id: ${pack.id}`);
    if (pack.dataStatus !== "curated") throw new Error(`${pack.id} supplement is not marked curated.`);
    if (!pack.categories?.length) throw new Error(`${pack.id} supplement has no shortcut categories.`);
    supplementIDs.add(pack.id);
    supplements.push(pack);
  }
}
supplements.sort((left, right) => left.id.localeCompare(right.id));
const supplementShortcutCount = supplements.reduce(
  (total, pack) => total + pack.categories.reduce((sum, category) => sum + category.items.length, 0),
  0
);
fs.writeFileSync(
  supplementOutput,
  `${JSON.stringify({
    schemaVersion: 1,
    platform: "macOS",
    generatedAt: "2026-07-22",
    generationPolicy: "Third-pass completion for previously non-empty low-coverage software packs.",
    software: supplements,
  }, null, 2)}\n`
);
console.log(`Assembled ${supplements.length} low-coverage supplements and ${supplementShortcutCount} shortcuts.`);
