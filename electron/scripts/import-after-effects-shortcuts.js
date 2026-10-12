const fs = require("node:fs");
const path = require("node:path");

const [presetPath, chineseDictionaryPath, englishBinaryPath, outputPath] = process.argv.slice(2);

if (!presetPath || !chineseDictionaryPath || !englishBinaryPath || !outputPath) {
  console.error(
    "Usage: node scripts/import-after-effects-shortcuts.js <preset.txt> <zh_CN.dat> <AfterFXLib> <output.json>"
  );
  process.exit(1);
}

const categoryTitles = {
  CPanoProjLayerPano: ["图层视图", "Layer View"],
  Clipboard: ["剪贴板", "Clipboard"],
  CloneToolPresets: ["仿制图章预设", "Clone Tool Presets"],
  "CompositionPanel-Views": ["合成视图", "Composition Views"],
  "CompositionPanel-Zoom-Masks": ["合成缩放与蒙版", "Composition Zoom & Masks"],
  EffectControlsPanel: ["效果控件", "Effect Controls"],
  FlowchartPanel: ["流程图", "Flowchart"],
  FootagePanel: ["素材面板", "Footage Panel"],
  General: ["通用", "General"],
  GeneralPanel: ["通用面板", "General Panels"],
  LayerPanel: ["图层面板", "Layer Panel"],
  LayerPanelMagnification: ["图层缩放", "Layer Magnification"],
  LayerProperties: ["图层属性", "Layer Properties"],
  MacSysShortcutsAlt: ["macOS 系统替代键位", "macOS Alternate System Shortcuts"],
  MacSysShortcutsStd: ["macOS 系统键位", "macOS System Shortcuts"],
  Markers: ["标记", "Markers"],
  MotionTracker: ["运动跟踪", "Motion Tracking"],
  PaintPanel: ["绘画面板", "Paint Panel"],
  PreviewPanel: ["预览面板", "Preview Panel"],
  Previewing: ["预览", "Previewing"],
  ProjectPanel: ["项目面板", "Project Panel"],
  PropertyGroupsandProperties: ["属性与属性组", "Properties & Property Groups"],
  RenderQueuePanel: ["渲染队列", "Render Queue"],
  TextLayer: ["文字图层", "Text Layer"],
  Time: ["时间与工作区", "Time & Work Area"],
  TimelineLayerProperties: ["时间线图层属性", "Timeline Layer Properties"],
  TimelineLayers: ["时间线图层", "Timeline Layers"],
  TimelineNavigation: ["时间线导航", "Timeline Navigation"],
  Tools: ["工具", "Tools"],
  ToolsUnifiedCamera: ["摄像机工具", "Camera Tools"],
  ViewerPanel: ["查看器面板", "Viewer Panel"],
};

// A small set of default bindings is present in the official preset but is not
// exposed through Adobe's localized keyboard-shortcut dictionary. Keep these
// explicit so the generated Chinese and English libraries remain independent.
const manualTitles = {
  CloseAll: ["关闭全部面板", "Close All Panels"],
  FastPreviewsAdaptiveResolutionKeyboard: ["快速预览：自适应分辨率", "Fast Previews: Adaptive Resolution"],
  FastPreviewsCalderRTEDraft3DKeyboard: ["快速预览：草图三维", "Fast Previews: Draft 3D"],
  FastPreviewsOffKeyboard: ["关闭快速预览", "Turn Fast Previews Off"],
  FastPreviewsWireframeKeyboard: ["快速预览：线框", "Fast Previews: Wireframe"],
  GizmoModeToggle: ["切换三维操纵器模式", "Toggle 3D Gizmo Mode"],
  NewDebugComp: ["新建调试合成", "New Debug Composition"],
  OpenKeyboardShortcutsPanel: ["打开键盘快捷键面板", "Open Keyboard Shortcuts Panel"],
  OpenLayerSourceWindow: ["打开图层源窗口", "Open Layer Source Window"],
  PrefsStartupAndRepairV2: ["打开启动与修复首选项", "Open Startup & Repair Preferences"],
  RecentScript00: ["运行最近使用的脚本", "Run Most Recent Script"],
  SelectNextTab: ["选择下一个面板标签页", "Select Next Panel Tab"],
  SelectPrevTab: ["选择上一个面板标签页", "Select Previous Panel Tab"],
  ShowDebugMonitor: ["显示调试监视器", "Show Debug Monitor"],
  SwitchTo3DViewFirst: ["切换到第一个三维视图", "Switch to First 3D View"],
  ToggleTabPanelMaximize: ["最大化或恢复当前面板", "Maximize or Restore Current Panel"],
  ZoomWindowMega: ["最大化或恢复应用窗口", "Maximize or Restore Application Window"],
  ZoomWindowMegaMainMonitor: ["在主显示器最大化应用窗口", "Maximize Application Window on Main Display"],
};

function printableASCIIStrings(buffer, minimumLength = 4) {
  const result = [];
  let current = [];
  for (const byte of buffer) {
    if (byte >= 0x20 && byte <= 0x7e) {
      current.push(byte);
    } else {
      if (current.length >= minimumLength) result.push(Buffer.from(current).toString("ascii"));
      current = [];
    }
  }
  if (current.length >= minimumLength) result.push(Buffer.from(current).toString("ascii"));
  return result;
}

function parseLocalizedEntries(lines) {
  const entries = new Map();
  for (const line of lines) {
    const match = line.match(/^"?\$\$\$\/AE\/KB\/S\/([^/]+)\/([^=]+)=(.*?)"?$/);
    if (!match) continue;
    const [, category, command, rawTitle] = match;
    const title = rawTitle.replace(/"$/, "").trim();
    if (!title) continue;
    const current = entries.get(command);
    if (!current || category === "General") entries.set(command, { category, title });
  }
  return entries;
}

function normalizeKeyName(value) {
  const names = {
    Cmd: "⌘",
    Option: "⌥",
    Shift: "⇧",
    macControl: "⌃",
    LeftArrow: "←",
    RightArrow: "→",
    UpArrow: "↑",
    DownArrow: "↓",
    PageUP: "Page Up",
    PageDOWN: "Page Down",
    HOME: "Home",
    END: "End",
    FwdDel: "Forward Delete",
    Backspace: "Delete",
    Return: "Return",
    Enter: "Enter",
    Esc: "Esc",
    Space: "Space",
    Backslash: "\\",
    SingleQuote: "'",
    DoubleQuote: "\"",
    Comma: ",",
    Plus: "+",
    PadDecimal: "Num .",
    PadComma: "Num ,",
    PadMultiply: "Num *",
    PadPlus: "Num +",
    PadClear: "Num Clear",
    PadSlash: "Num /",
    PadMinus: "Num -",
    PadEqual: "Num =",
    PadInsert: "Num 0",
    PadDelete: "Num .",
    PadHome: "Num 7",
    PadEnd: "Num 1",
    PadPageUp: "Num 9",
    PadPageDown: "Num 3",
  };
  if (names[value]) return names[value];
  const padDigit = value.match(/^Pad([0-9])$/);
  if (padDigit) return `Num ${padDigit[1]}`;
  const unicode = value.match(/^Ux([0-9A-Fa-f]{4})$/);
  if (unicode) return String.fromCodePoint(Number.parseInt(unicode[1], 16));
  return value;
}

function parseKeyChord(chord) {
  return chord.split("+").map(normalizeKeyName);
}

function slug(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function humanize(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const presetText = fs.readFileSync(presetPath, "utf8").replace(/\r/g, "\n");
const chineseText = fs.readFileSync(chineseDictionaryPath, "utf8").replace(/^\uFEFF/, "");
const englishStrings = printableASCIIStrings(fs.readFileSync(englishBinaryPath));

const chineseEntries = parseLocalizedEntries(chineseText.split(/\r?\n/));
const englishEntries = parseLocalizedEntries(englishStrings);

const parsedBindings = [];
let presetSection = "General";
for (const line of presetText.split(/\n+/)) {
  const sectionMatch = line.match(/^\["([^"]+)"\]$/);
  if (sectionMatch) {
    presetSection = sectionMatch[1];
    continue;
  }

  const entryMatch = line.match(/^\s*"([^"]+)"\s*=\s*"(.*)"\s*$/);
  if (!entryMatch) continue;
  const [, command, rawBindings] = entryMatch;
  const chords = Array.from(rawBindings.matchAll(/\(([^()]*)\)/g), (match) => match[1]).filter(Boolean);
  for (const chord of chords) parsedBindings.push({ presetSection, command, chord });
}

const categories = new Map();
const missingChinese = new Set();
const missingEnglish = new Set();

for (const binding of parsedBindings) {
  const chinese = chineseEntries.get(binding.command);
  const english = englishEntries.get(binding.command);
  const manual = manualTitles[binding.command];
  if (!chinese && !manual) missingChinese.add(binding.command);
  if (!english && !manual) missingEnglish.add(binding.command);

  const categoryID = english?.category ?? chinese?.category ?? "General";
  if (!categories.has(categoryID)) {
    const titles = categoryTitles[categoryID] ?? ["其他快捷键", humanize(categoryID)];
    categories.set(categoryID, {
      id: `ae-${slug(categoryID)}`,
      zh: titles[0],
      en: titles[1],
      items: [],
    });
  }

  const category = categories.get(categoryID);
  const duplicateIndex = category.items.filter((item) => item.id.startsWith(`ae.${slug(binding.presetSection)}.${slug(binding.command)}.`)).length;
  category.items.push({
    id: `ae.${slug(binding.presetSection)}.${slug(binding.command)}.${duplicateIndex + 1}`,
    keys: parseKeyChord(binding.chord),
    zh: chinese?.title ?? manual?.[0] ?? `未翻译命令：${binding.command}`,
    en: english?.title ?? manual?.[1] ?? humanize(binding.command),
    tags: [binding.presetSection, binding.command, "After Effects 26.0"],
  });
}

const categoryOrder = Object.keys(categoryTitles);
const sortedCategories = Array.from(categories.entries())
  .sort(([left], [right]) => {
    const leftIndex = categoryOrder.indexOf(left);
    const rightIndex = categoryOrder.indexOf(right);
    return (leftIndex < 0 ? 999 : leftIndex) - (rightIndex < 0 ? 999 : rightIndex) || left.localeCompare(right);
  })
  .map(([, category]) => category);

const output = {
  software: [
    {
      id: "aftereffects",
      name: "After Effects",
      vendor: "Adobe",
      accent: "#9999FF",
      glyph: "Ae",
      provenance: {
        sourceURL: "https://helpx.adobe.com/after-effects/using/keyboard-shortcuts-reference.html",
        sourceTitle: "After Effects 26.0 installed official default shortcut preset",
        appVersion: "After Effects 26.0",
        verifiedAt: "2026-07-21",
        coverage: "complete-official-installed-default-preset",
        platform: "macOS",
      },
      categories: sortedCategories,
    },
  ],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Generated ${parsedBindings.length} After Effects default macOS bindings in ${sortedCategories.length} categories.`);
console.log(`Missing Chinese titles: ${missingChinese.size}`);
console.log(`Missing English titles: ${missingEnglish.size}`);
if (missingChinese.size > 0) console.log(`Chinese gaps: ${Array.from(missingChinese).sort().join(", ")}`);
if (missingEnglish.size > 0) console.log(`English gaps: ${Array.from(missingEnglish).sort().join(", ")}`);
