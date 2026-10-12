import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "KeyFloat.Win.sln",
  "src/KeyFloat.Core/KeyFloat.Core.csproj",
  "src/KeyFloat.Win/KeyFloat.Win.csproj",
  "src/KeyFloat.Win/Views/MainWindow.xaml",
  "src/KeyFloat.Win/Views/ActivationWindow.xaml",
  "src/KeyFloat.Win/Data/shortcuts-windows.json",
  "src/KeyFloat.Win/Assets/KeyFloat.ico",
  "installer/KeyFloat.iss",
  "scripts/build-release.ps1",
];
const errors = [];
for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`Missing ${relative}`);
}

const data = JSON.parse(fs.readFileSync(path.join(root, "src/KeyFloat.Win/Data/shortcuts-windows.json"), "utf8"));
const iconDirectory = path.join(root, "src/KeyFloat.Win/Assets/SoftwareIcons");
const iconIDs = new Set(fs.readdirSync(iconDirectory).filter(name => name.endsWith(".png")).map(name => path.parse(name).name));
for (const pack of data.software) {
  if (!iconIDs.has(pack.id)) errors.push(`Missing optimized Windows icon for ${pack.id}`);
}

const mainXaml = fs.readFileSync(path.join(root, "src/KeyFloat.Win/Views/MainWindow.xaml"), "utf8");
for (const expected of ['Width="230" Height="62"', 'CornerRadius="15"', 'Text="Ctrl K"']) {
  if (!mainXaml.includes(expected)) errors.push(`Main window lost required design token: ${expected}`);
}
if (/#[0-9A-Fa-f]{8}/.test(mainXaml)) errors.push("Main window contains an alpha-channel color.");
for (const relative of [
  "src/KeyFloat.Win/Views/MainWindow.xaml",
  "src/KeyFloat.Win/Views/ActivationWindow.xaml",
  "src/KeyFloat.Win/Views/SubmissionDialog.xaml",
]) {
  const xaml = fs.readFileSync(path.join(root, relative), "utf8");
  if (xaml.includes("Segoe Fluent Icons")) errors.push(`${relative} uses a Windows 11-only icon font.`);
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(`Validated Windows project structure, ${data.software.length} catalog entries, ${iconIDs.size} optimized software icons, and immutable design metrics.`);
