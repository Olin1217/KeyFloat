#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dataRoot = path.resolve(__dirname, "..", "KeyFloat");
const writeChanges = process.argv.includes("--write");
const showAll = process.argv.includes("--all");

// Only separator and sentence punctuation belong here. Paired punctuation,
// operators, percentages, degrees, and other symbols can carry real meaning.
const leadingSeparators = /^[\s\u00A0:：;；,，。．、.!！?？/|｜·•—–]+/u;
const leadingSpacedHyphen = /^-+\s+/u;
const trailingSeparators = /[\s\u00A0:：;；,，。．、!！?？/|｜·•—–]+$/u;
const trailingSpacedHyphen = /\s+-+$/u;

function normalizeShortcutTitle(value) {
  if (typeof value !== "string") return value;

  let normalized = value.trim();
  let previous;

  do {
    previous = normalized;
    normalized = normalized
      .replace(leadingSeparators, "")
      .replace(leadingSpacedHyphen, "")
      .trimStart();
  } while (normalized !== previous);

  do {
    previous = normalized;
    normalized = normalized.trimEnd();

    // An ellipsis is intentional content, not leftover sentence punctuation.
    const trailingDots = normalized.match(/\.+$/u)?.[0] ?? "";
    if (normalized.endsWith("…") || trailingDots === "...") break;

    normalized = normalized
      .replace(trailingSeparators, "")
      .replace(trailingSpacedHyphen, "")
      .replace(/\.+$/u, "")
      .trimEnd();
  } while (normalized !== previous);

  return normalized;
}

function shortcutTitleIssue(value) {
  if (typeof value !== "string") return null;
  const normalized = normalizeShortcutTitle(value);
  if (normalized === value) return null;
  return {
    normalized,
    reason: normalized.length === 0
      ? "title contains only boundary punctuation"
      : "title contains unnecessary leading or trailing punctuation",
  };
}

function shortcutDataFiles() {
  return fs.readdirSync(dataRoot)
    .filter((name) => /(?:shortcuts|supplements)-mac\.json$/u.test(name))
    .sort();
}

function inspectFile(fileName) {
  const filePath = path.join(dataRoot, fileName);
  const library = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const changes = [];
  const blocked = [];

  for (const software of library.software ?? []) {
    for (const category of software.categories ?? []) {
      for (const item of category.items ?? []) {
        for (const language of ["zh", "en"]) {
          const issue = shortcutTitleIssue(item[language]);
          if (!issue) continue;

          const record = {
            fileName,
            softwareID: software.id,
            categoryID: category.id,
            itemID: item.id,
            language,
            before: item[language],
            after: issue.normalized,
          };

          if (issue.normalized.length === 0) {
            blocked.push(record);
          } else {
            changes.push(record);
            item[language] = issue.normalized;
          }
        }
      }
    }
  }

  if (writeChanges && changes.length > 0) {
    fs.writeFileSync(filePath, `${JSON.stringify(library, null, 2)}\n`);
  }

  return { changes, blocked };
}

function run() {
  const changes = [];
  const blocked = [];
  for (const fileName of shortcutDataFiles()) {
    const result = inspectFile(fileName);
    changes.push(...result.changes);
    blocked.push(...result.blocked);
  }

  const action = writeChanges ? "Normalized" : "Found";
  console.log(`${action} ${changes.length} shortcut title fields across ${shortcutDataFiles().length} files.`);

  const visible = showAll ? changes : changes.slice(0, 80);
  for (const change of visible) {
    console.log(
      `${change.fileName}:${change.softwareID}:${change.itemID}:${change.language} ` +
      `${JSON.stringify(change.before)} -> ${JSON.stringify(change.after)}`
    );
  }
  if (!showAll && changes.length > visible.length) {
    console.log(`... ${changes.length - visible.length} additional changes omitted; pass --all to show them.`);
  }

  if (blocked.length > 0) {
    console.error(`Blocked ${blocked.length} punctuation-only title fields that require a real description:`);
    for (const record of blocked) {
      console.error(
        `${record.fileName}:${record.softwareID}:${record.itemID}:${record.language} ` +
        JSON.stringify(record.before)
      );
    }
  }

  if (!writeChanges && (changes.length > 0 || blocked.length > 0)) process.exitCode = 1;
  if (blocked.length > 0) process.exitCode = 1;
}

if (require.main === module) run();

module.exports = {
  normalizeShortcutTitle,
  shortcutTitleIssue,
};
