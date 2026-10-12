const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const library = require("../data/shortcuts");

const report = [];
const globalSoftwareIds = new Set();

for (const [softwareId, software] of Object.entries(library)) {
  assert.equal(software.id, softwareId, `${softwareId}: object key and id must match`);
  assert(!globalSoftwareIds.has(software.id), `${softwareId}: duplicate software id`);
  globalSoftwareIds.add(software.id);
  assert(software.name, `${softwareId}: missing name`);
  assert(/^#[0-9a-f]{6}$/i.test(software.accent), `${softwareId}: invalid accent`);
  assert(software.categories.length > 0, `${softwareId}: no categories`);

  const categoryIds = new Set();
  const shortcutIds = new Set();
  let shortcutCount = 0;

  for (const group of software.categories) {
    assert(group.id && group.zh && group.en, `${softwareId}: incomplete category`);
    assert(!categoryIds.has(group.id), `${softwareId}: duplicate category ${group.id}`);
    categoryIds.add(group.id);
    assert(group.items.length > 0, `${softwareId}/${group.id}: empty category`);

    for (const item of group.items) {
      shortcutCount += 1;
      assert(item.id && item.zh && item.en, `${softwareId}/${group.id}: incomplete shortcut`);
      assert(!shortcutIds.has(item.id), `${softwareId}: duplicate shortcut id ${item.id}`);
      shortcutIds.add(item.id);
      assert(Array.isArray(item.keys?.mac) && item.keys.mac.length, `${item.id}: missing macOS keys`);
      assert(Array.isArray(item.keys?.win) && item.keys.win.length, `${item.id}: missing Windows keys`);
    }
  }

  report.push(`${software.name}: ${shortcutCount} shortcuts / ${categoryIds.size} categories`);
}

assert(Object.keys(library).length >= 6, "expected the six launch software packs");
assert(
  library.figma.categories.reduce((sum, group) => sum + group.items.length, 0) >= 170,
  "Figma launch pack should remain comprehensive",
);

const projectRoot = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const renderer = fs.readFileSync(path.join(projectRoot, "renderer.js"), "utf8");
const htmlIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const rendererIds = [...renderer.matchAll(/\$\("#([^"]+)"\)/g)].map((match) => match[1]);
const missingIds = rendererIds.filter((id) => !htmlIds.has(id));
assert.deepEqual(missingIds, [], `renderer references missing HTML ids: ${missingIds.join(", ")}`);

console.log(`Validated ${report.length} software packs:`);
report.forEach((line) => console.log(`  - ${line}`));
console.log(`Validated ${rendererIds.length} renderer control bindings.`);
