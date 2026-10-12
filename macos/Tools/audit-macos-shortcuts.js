#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "KeyFloat");
const reportPath = path.join(projectRoot, "MACOS_SHORTCUT_AUDIT.json");
const fix = process.argv.includes("--fix");
const resources = [
  "shortcuts-mac.json", "office-shortcuts-mac.json", "professional-shortcuts-mac.json",
  "productivity-shortcuts-mac.json", "ecosystem-shortcuts-mac.json", "verified-shortcuts-mac.json",
  "supplemental-shortcuts-mac.json", "browser-reviewed-shortcuts-mac.json",
  "extended-shortcuts-mac.json", "curated-shortcuts-mac.json", "curated-supplements-mac.json",
];

const exactAliases = new Map([
  ["Command", "⌘"], ["Cmd", "⌘"], ["Option", "⌥"], ["Alt", "⌥"],
  ["Control", "⌃"], ["Ctrl", "⌃"], ["Shift", "⇧"], ["Escape", "Esc"],
  ["Enter", "Return"], ["Backspace", "Delete"],
]);
const windowsPattern = /(?:\bWindows\b|⊞|\bWin(?:dows)?\s*\+)/i;
const unnormalizedPattern = /\b(?:Command|Cmd|Option|Alt|Control|Ctrl|Shift)\b\s*\+|^(?:Enter|Backspace|Escape)$/i;
const errors = [];
const normalizationCounts = new Map();
const normalizationBySoftware = new Map();
let softwareEntries = 0;
let shortcutRows = 0;

function recordNormalization(softwareID, from, to) {
  const label = `${from} → ${to}`;
  normalizationCounts.set(label, (normalizationCounts.get(label) || 0) + 1);
  if (!normalizationBySoftware.has(softwareID)) normalizationBySoftware.set(softwareID, new Map());
  const softwareCounts = normalizationBySoftware.get(softwareID);
  softwareCounts.set(label, (softwareCounts.get(label) || 0) + 1);
}

function normalizeKey(softwareID, key) {
  const replacement = exactAliases.get(key);
  if (!replacement) return key;
  recordNormalization(softwareID, key, replacement);
  return replacement;
}

for (const resource of resources) {
  const file = path.join(dataRoot, resource);
  const library = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = false;
  for (const pack of library.software || []) {
    softwareEntries += 1;
    if (pack.provenance && pack.provenance.platform !== "macOS") {
      errors.push(`${resource}:${pack.id} provenance platform is '${pack.provenance.platform}'.`);
    }
    for (const category of pack.categories || []) {
      for (const item of category.items || []) {
        shortcutRows += 1;
        for (const field of ["keys", "keysZh", "keysEn"]) {
          if (!Array.isArray(item[field])) continue;
          const normalized = item[field].map((key) => normalizeKey(pack.id, key));
          if (JSON.stringify(normalized) !== JSON.stringify(item[field])) {
            item[field] = normalized;
            changed = true;
          }
          for (const key of normalized) {
            if (windowsPattern.test(key)) {
              errors.push(`${resource}:${pack.id}/${item.id}/${field} contains Windows-only key '${key}'.`);
            }
            if (unnormalizedPattern.test(key)) {
              errors.push(`${resource}:${pack.id}/${item.id}/${field} contains unnormalized key label '${key}'.`);
            }
          }
        }
      }
    }
  }
  if (fix && changed) fs.writeFileSync(file, `${JSON.stringify(library, null, 2)}\n`);
}

const report = {
  auditedAt: "2026-07-25",
  platform: "macOS",
  resources,
  softwareEntries,
  shortcutRows,
  fixApplied: fix,
  normalizedLabels: Object.fromEntries([...normalizationCounts].sort()),
  normalizedBySoftware: Object.fromEntries(
    [...normalizationBySoftware].sort(([left], [right]) => left.localeCompare(right)).map(([id, counts]) => [id, Object.fromEntries([...counts].sort())])
  ),
  policies: {
    platformSelection: "Importers must use macOS columns, macOS-only chapters, or explicitly shared cross-platform defaults.",
    keyLabels: "Command, Option, Control, Shift, Return, Delete, and Escape use canonical macOS symbols or names.",
    forbidden: "Windows, Win, and Windows-logo key tokens are rejected from every bundled shortcut resource.",
    extendedKeyboards: "Insert, Home, End, PageUp, PageDown, and function keys remain valid when a documented Mac app supports an extended keyboard or Fn equivalent.",
  },
  errors,
};
if (fix) fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (errors.length) {
  for (const message of errors) console.error(`ERROR ${message}`);
  process.exitCode = 1;
} else {
  console.log(
    `Audited ${softwareEntries} resource entries / ${shortcutRows} shortcut rows for macOS; ` +
    `${[...normalizationCounts.values()].reduce((sum, count) => sum + count, 0)} key labels normalized; 0 Windows-only keys.`
  );
}
