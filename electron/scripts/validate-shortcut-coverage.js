const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const coverage = JSON.parse(fs.readFileSync(path.join(__dirname, "shortcut-coverage.json"), "utf8"));
const dataFiles = [
  "KeyFloat-Xcode/KeyFloat/shortcuts-mac.json",
  "KeyFloat-Xcode/KeyFloat/office-shortcuts-mac.json",
  "KeyFloat-Xcode/KeyFloat/professional-shortcuts-mac.json",
  "KeyFloat-Xcode/KeyFloat/productivity-shortcuts-mac.json",
  "KeyFloat-Xcode/KeyFloat/verified-shortcuts-mac.json",
];

const effective = new Map();
for (const relativePath of dataFiles) {
  const library = JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  for (const pack of library.software) effective.set(pack.id, pack);
}

const failures = [];
for (const audit of coverage.software) {
  const pack = effective.get(audit.id);
  if (!pack) {
    failures.push(`${audit.id}: missing software pack`);
    continue;
  }
  const count = pack.categories.reduce((total, category) => total + category.items.length, 0);
  if (audit.status === "verified" && count !== audit.expectedBindings) {
    failures.push(`${audit.id}: expected ${audit.expectedBindings} verified bindings, found ${count}`);
  }
}

const verified = coverage.software.filter((item) => item.status === "verified");
const exported = coverage.software.filter((item) => item.status === "source-exported");
const pending = coverage.software.filter((item) => item.status === "pending");

console.log(`Coverage audit: ${verified.length}/${coverage.software.length} software packs verified complete.`);
console.log(`Source exported, awaiting bilingual import: ${exported.map((item) => item.id).join(", ") || "none"}.`);
console.log(`Pending official source audit: ${pending.length}.`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
