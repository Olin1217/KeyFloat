#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const root = path.resolve(__dirname, "..");
const assets = path.join(root, "src", "KeyFloat.Win", "Assets");
const iconDirectory = path.join(assets, "SoftwareIcons");

function render(source, output, size) {
  const svg = fs.readFileSync(source, "utf8");
  const image = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)",
  }).render();
  fs.writeFileSync(output, image.asPng());
}

let count = 0;
for (const name of fs.readdirSync(iconDirectory).filter((entry) => entry.toLowerCase().endsWith(".svg"))) {
  render(path.join(iconDirectory, name), path.join(iconDirectory, `${path.parse(name).name}.png`), 128);
  count += 1;
}
render(path.join(assets, "KeyFloat Logo.svg"), path.join(assets, "KeyFloat Logo.png"), 256);
render(path.join(assets, "KeyFloat White Logo.svg"), path.join(assets, "KeyFloat White Logo.png"), 256);
console.log(`Rasterized ${count} SVG software icons and 2 KeyFloat brand assets.`);
