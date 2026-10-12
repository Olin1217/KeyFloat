#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src", "KeyFloat.Win", "Data", "shortcuts-windows.json");
const reportPath = path.join(root, "WINDOWS_SHORTCUT_VALIDATION_REPORT.json");
const library = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const errors = [];
const warnings = [];
const softwareIDs = new Set();
const forbidden = /⌘|⌥|⌃|⇧|\bCommand\b|\bmacOS\b/i;
const allowedAvailability = new Set(["available", "unavailable"]);
let shortcuts = 0;
let available = 0;
let unavailable = 0;

for (const pack of library.software || []) {
  if (!pack.id || !pack.name || softwareIDs.has(pack.id)) errors.push(`Invalid or duplicate software id '${pack.id}'.`);
  softwareIDs.add(pack.id);
  if (!allowedAvailability.has(pack.windowsAvailability)) errors.push(`${pack.id} has invalid Windows availability.`);
  if (pack.provenance?.platform !== "Windows") errors.push(`${pack.id} provenance is not Windows.`);
  if (pack.windowsAvailability === "unavailable") {
    unavailable += 1;
    if ((pack.categories || []).length) errors.push(`${pack.id} is unavailable but exposes shortcuts.`);
    continue;
  }
  available += 1;
  if (!(pack.categories || []).length) errors.push(`${pack.id} is available but empty.`);
  const categoryIDs = new Set();
  const itemIDs = new Set();
  for (const category of pack.categories || []) {
    if (!category.id || categoryIDs.has(category.id)) errors.push(`${pack.id} has duplicate category '${category.id}'.`);
    categoryIDs.add(category.id);
    if (!category.zh || !category.en || !(category.items || []).length) errors.push(`${pack.id}/${category.id} is incomplete.`);
    const signatures = new Set();
    for (const item of category.items || []) {
      shortcuts += 1;
      if (!item.id || itemIDs.has(item.id)) errors.push(`${pack.id} repeats item '${item.id}'.`);
      itemIDs.add(item.id);
      if (!item.zh || !item.en || !Array.isArray(item.keys) || !item.keys.length) errors.push(`${pack.id}/${item.id} is incomplete.`);
      const allKeys = [item.keys || [], item.keysZh || [], item.keysEn || []].flat();
      if (allKeys.some((key) => forbidden.test(key))) errors.push(`${pack.id}/${item.id} retains a macOS key.`);
      if (!item.tags?.includes("Windows")) errors.push(`${pack.id}/${item.id} lacks a Windows tag.`);
      const signature = `${item.en}\0${item.keys.join("+")}`;
      if (signatures.has(signature)) warnings.push(`${pack.id}/${category.id} repeats ${item.en} / ${item.keys.join(" ")}.`);
      signatures.add(signature);
    }
  }
}

const report = {
  validatedAt: "2026-07-26",
  software: softwareIDs.size,
  available,
  unavailable,
  shortcuts,
  errors,
  warnings,
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(`Validated ${softwareIDs.size} catalog entries: ${available} Windows apps / ${shortcuts} shortcuts, ${unavailable} unavailable apps, 0 macOS key labels.`);
