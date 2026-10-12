#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "KeyFloat");
const resources = [
  { name: "shortcuts-mac.json", mode: "merge" },
  { name: "office-shortcuts-mac.json", mode: "merge" },
  { name: "professional-shortcuts-mac.json", mode: "merge" },
  { name: "productivity-shortcuts-mac.json", mode: "merge" },
  { name: "ecosystem-shortcuts-mac.json", mode: "replace" },
  { name: "verified-shortcuts-mac.json", mode: "replace" },
  { name: "supplemental-shortcuts-mac.json", mode: "replace" },
  { name: "browser-reviewed-shortcuts-mac.json", mode: "replace" },
  { name: "extended-shortcuts-mac.json", mode: "merge" },
  { name: "curated-shortcuts-mac.json", mode: "replace" },
  { name: "curated-supplements-mac.json", mode: "merge" },
];

const allowedGroups = new Set([
  "office", "study", "design", "media", "architecture", "engineering",
  "modeling", "simulation", "development", "versionControl", "databaseAPI",
  "dataAI", "collaboration", "browser", "macUtility", "other",
  "electronics", "biology", "chemistry", "medical", "gameDevelopment",
]);

const errors = [];
const warnings = [];
const loaded = [];
const summaryOnly = process.argv.includes("--summary");

function error(message) {
  errors.push(message);
}

function warning(message) {
  warnings.push(message);
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePack(pack, source) {
  const label = `${source}:${pack?.id ?? "<unknown>"}`;
  if (!nonEmptyString(pack?.id)) error(`${label} has no software id.`);
  if (!nonEmptyString(pack?.name)) error(`${label} has no software name.`);
  if (!nonEmptyString(pack?.vendor)) error(`${label} has no vendor.`);
  if (pack?.group !== undefined && !allowedGroups.has(pack.group)) {
    error(`${label} has unknown group '${pack.group}'.`);
  }
  if (pack?.bundleIdentifiers !== undefined &&
      (!Array.isArray(pack.bundleIdentifiers) ||
       pack.bundleIdentifiers.length === 0 ||
       pack.bundleIdentifiers.some((identifier) => !nonEmptyString(identifier)))) {
    error(`${label} has invalid bundleIdentifiers.`);
  }
  if (pack?.dataStatus !== undefined &&
      !["sourceBacked", "curated", "manualReview", "legacyReviewed", "catalogOnly"].includes(pack.dataStatus)) {
    error(`${label} has unknown dataStatus '${pack.dataStatus}'.`);
  }
  if (source === "extended-shortcuts-mac.json" &&
      !["sourceBacked", "catalogOnly"].includes(pack?.dataStatus)) {
    error(`${label} must be sourceBacked or catalogOnly.`);
  }
  if (source === "ecosystem-shortcuts-mac.json" && pack?.dataStatus !== "catalogOnly") {
    error(`${label} must remain catalogOnly until its macOS shortcuts are source-backed.`);
  }
  if (source === "browser-reviewed-shortcuts-mac.json" && pack?.dataStatus !== "manualReview") {
    error(`${label} must be marked manualReview.`);
  }
  if (source === "curated-shortcuts-mac.json" && pack?.dataStatus !== "curated") {
    error(`${label} must be marked curated.`);
  }
  if (source === "curated-supplements-mac.json" && pack?.dataStatus !== "curated") {
    error(`${label} supplement must be marked curated.`);
  }
  if (pack?.dataStatus === "curated" && pack?.provenance?.coverage !== "curated-comprehensive-defaults") {
    error(`${label} curated packs must declare curated-comprehensive-defaults coverage.`);
  }
  if (pack?.dataStatus === "manualReview" && pack?.provenance?.coverage !== "browser-search-manual-review") {
    error(`${label} manual-review packs must declare browser-search-manual-review coverage.`);
  }
  if (pack?.dataStatus === "catalogOnly") {
    if (!Array.isArray(pack.categories) || pack.categories.length !== 0) {
      error(`${label} catalog-only packs must not contain shortcuts.`);
    }
    if (pack?.provenance?.platform !== "macOS" ||
        !nonEmptyString(pack?.provenance?.sourceURL) ||
        !nonEmptyString(pack?.provenance?.verifiedAt)) {
      error(`${label} catalog-only provenance is incomplete.`);
    }
    if (pack?.provenance?.coverage !== "catalog-only-unverified-shortcuts-removed") {
      error(`${label} catalog-only packs must declare quarantined coverage.`);
    }
    return;
  }
  if (!Array.isArray(pack?.categories) || pack.categories.length === 0) {
    error(`${label} has no categories.`);
    return;
  }

  if (pack.provenance) {
    if (pack.provenance.platform !== "macOS") {
      error(`${label} provenance platform must be macOS.`);
    }
    if (!nonEmptyString(pack.provenance.sourceURL)) {
      error(`${label} has provenance without a sourceURL.`);
    }
    if (!nonEmptyString(pack.provenance.verifiedAt)) {
      error(`${label} has provenance without verifiedAt.`);
    }
    if (pack.provenance.coverage === "complete-official-page" && !/^https:\/\//.test(pack.provenance.sourceURL)) {
      error(`${label} claims complete official-page coverage without an HTTPS source.`);
    }
  }

  const categoryIDs = new Set();
  const itemIDs = new Set();
  for (const category of pack.categories) {
    const categoryLabel = `${label}/${category?.id ?? "<unknown>"}`;
    if (!nonEmptyString(category?.id)) error(`${categoryLabel} has no category id.`);
    if (categoryIDs.has(category.id)) error(`${label} repeats category id '${category.id}'.`);
    categoryIDs.add(category.id);
    if (!nonEmptyString(category?.zh) || !nonEmptyString(category?.en)) {
      error(`${categoryLabel} is missing a bilingual title.`);
    }
    if (!Array.isArray(category?.items) || category.items.length === 0) {
      error(`${categoryLabel} has no shortcuts.`);
      continue;
    }

    for (const item of category.items) {
      const itemLabel = `${categoryLabel}/${item?.id ?? "<unknown>"}`;
      if (!nonEmptyString(item?.id)) error(`${itemLabel} has no shortcut id.`);
      if (itemIDs.has(item.id)) error(`${label} repeats shortcut id '${item.id}'.`);
      itemIDs.add(item.id);
      if (!nonEmptyString(item?.zh) || !nonEmptyString(item?.en)) {
        error(`${itemLabel} is missing a bilingual action title.`);
      }
      if (!Array.isArray(item?.keys) || item.keys.length === 0 || item.keys.some((key) => !nonEmptyString(key))) {
        error(`${itemLabel} has an empty key sequence.`);
      }
      for (const localizedName of ["keysZh", "keysEn"]) {
        if (item[localizedName] !== undefined &&
            (!Array.isArray(item[localizedName]) || item[localizedName].some((key) => !nonEmptyString(key)))) {
          error(`${itemLabel} has an invalid ${localizedName} sequence.`);
        }
      }
      const allKeys = [item.keys, item.keysZh || [], item.keysEn || []].flat();
      if (allKeys.some((key) => [...key].length > 30)) {
        error(`${itemLabel} contains a key label longer than 30 characters.`);
      }
      if (allKeys.some((key) => /windows|⊞/i.test(key))) {
        error(`${itemLabel} contains a Windows-only key.`);
      }
      if (!Array.isArray(item?.tags)) error(`${itemLabel} tags must be an array.`);
    }
  }
}

function mergePack(base, overlay) {
  const categories = base.categories.map((category) => ({
    ...category,
    items: category.items.slice(),
  }));
  const categoryIndex = new Map(categories.map((category, index) => [category.id, index]));
  for (const overlayCategory of overlay.categories) {
    if (!categoryIndex.has(overlayCategory.id)) {
      categoryIndex.set(overlayCategory.id, categories.length);
      categories.push({ ...overlayCategory, items: overlayCategory.items.slice() });
      continue;
    }
    const index = categoryIndex.get(overlayCategory.id);
    const items = categories[index].items.slice();
    const itemIndex = new Map(items.map((item, itemOffset) => [item.id, itemOffset]));
    for (const item of overlayCategory.items) {
      if (itemIndex.has(item.id)) items[itemIndex.get(item.id)] = item;
      else {
        itemIndex.set(item.id, items.length);
        items.push(item);
      }
    }
    categories[index] = { ...overlayCategory, items };
  }
  return {
    ...overlay,
    categories,
    provenance: overlay.provenance || base.provenance,
  };
}

for (const resource of resources) {
  const file = path.join(dataRoot, resource.name);
  if (!fs.existsSync(file)) {
    error(`${resource.name} is missing.`);
    continue;
  }
  try {
    const library = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Array.isArray(library?.software)) {
      error(`${resource.name} has no software array.`);
      continue;
    }
    const ids = new Set();
    for (const pack of library.software) {
      if (ids.has(pack.id)) error(`${resource.name} repeats software id '${pack.id}'.`);
      ids.add(pack.id);
      validatePack(pack, resource.name);
      loaded.push({ pack, mode: resource.mode, source: resource.name });
    }
  } catch (caught) {
    error(`${resource.name} is not valid JSON: ${caught.message}`);
  }
}

const merged = new Map();
const sourceByID = new Map();
for (const entry of loaded) {
  if (!merged.has(entry.pack.id) || entry.mode === "replace") {
    merged.set(entry.pack.id, entry.pack);
  } else {
    merged.set(entry.pack.id, mergePack(merged.get(entry.pack.id), entry.pack));
  }
  sourceByID.set(entry.pack.id, entry.source);
}

let shortcutTotal = 0;
for (const pack of merged.values()) {
  const count = pack.categories.reduce((sum, category) => sum + category.items.length, 0);
  shortcutTotal += count;
  if (pack.dataStatus === "catalogOnly" || count === 0) {
    error(`${pack.id} remains catalog-only or has no final macOS shortcuts.`);
  }
  const coverage = pack?.provenance?.coverage || "";
  const isOfficialDisplayPack = pack?.dataStatus === "sourceBacked" ||
    pack?.dataStatus === "curated" ||
    pack?.dataStatus === "manualReview" ||
    coverage.startsWith("complete-official") ||
    coverage.startsWith("official-page") ||
    coverage.startsWith("official-manual") ||
    coverage.startsWith("official-source") ||
    coverage.startsWith("official-table");
  if (pack?.dataStatus !== "catalogOnly" && !isOfficialDisplayPack) {
    error(`${pack.id} exposes shortcuts without official, source-backed, or manual-review provenance.`);
  }
  const exact = new Map();
  for (const category of pack.categories) {
    for (const item of category.items) {
      const signature = `${item.keys.join("+")}\u0000${item.en}`;
      exact.set(signature, (exact.get(signature) || 0) + 1);
    }
  }
  const exactDuplicates = [...exact.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0);
  if (exactDuplicates > 0 && pack.id !== "aftereffects") {
    warning(`${pack.id} has ${exactDuplicates} exact action/key duplicates to review.`);
  }
  if (!summaryOnly) {
    console.log(
      `${pack.name}: ${count} shortcuts / ${pack.categories.length} categories / ${sourceByID.get(pack.id)}`
    );
  }
}

console.log(`\nValidated ${merged.size} macOS software packs and ${shortcutTotal} shortcuts.`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((message) => console.log(`- ${message}`));
}
if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
