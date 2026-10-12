#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const targets = { "win-x64": 0x8664, "win-arm64": 0xaa64 };
const results = [];
const errors = [];

for (const [target, expectedMachine] of Object.entries(targets)) {
  const directory = path.join(root, "artifacts", "publish", target);
  const executable = path.join(directory, "KeyFloat.exe");
  const dataPath = path.join(directory, "Data", "shortcuts-windows.json");
  const iconPath = path.join(directory, "Assets", "KeyFloat.ico");
  for (const file of [executable, dataPath, iconPath]) {
    if (!fs.existsSync(file)) errors.push(`${target} is missing ${path.relative(directory, file)}.`);
  }
  if (!fs.existsSync(executable) || !fs.existsSync(dataPath)) continue;
  const executableData = fs.readFileSync(executable);
  const peOffset = executableData.readUInt32LE(0x3c);
  const machine = executableData.readUInt16LE(peOffset + 4);
  if (machine !== expectedMachine) errors.push(`${target} has PE machine 0x${machine.toString(16)}, expected 0x${expectedMachine.toString(16)}.`);
  const library = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const shortcuts = library.software.reduce((sum, pack) => sum + (pack.categories || []).reduce((count, category) => count + category.items.length, 0), 0);
  const iconCount = fs.readdirSync(path.join(directory, "Assets", "SoftwareIcons")).filter(name => name.endsWith(".png")).length;
  if (library.software.length !== 209) errors.push(`${target} contains ${library.software.length} software entries.`);
  if (shortcuts !== 10_969) errors.push(`${target} contains ${shortcuts} shortcuts.`);
  if (iconCount !== 209) errors.push(`${target} contains ${iconCount} icons.`);
  if (fs.readdirSync(directory).some(name => name.endsWith(".pdb"))) errors.push(`${target} contains release debug symbols.`);
  results.push({ target, machine: `0x${machine.toString(16)}`, executableBytes: executableData.length, dataBytes: fs.statSync(dataPath).size, software: library.software.length, shortcuts, icons: iconCount });
}

const report = { validatedAt: "2026-07-26", results, errors };
fs.writeFileSync(path.join(root, "WINDOWS_PUBLISH_VALIDATION_REPORT.json"), `${JSON.stringify(report, null, 2)}\n`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log("Validated x64 and ARM64 Windows publish directories, PE architectures, runtime data, icons, and release symbol policy.");
