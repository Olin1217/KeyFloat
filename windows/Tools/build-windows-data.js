#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "SourceData");
const markdownRoot = path.join(sourceRoot, "Markdown");
const outputPath = path.join(root, "src", "KeyFloat.Win", "Data", "shortcuts-windows.json");
const reportPath = path.join(root, "WINDOWS_SHORTCUT_ADAPTATION_REPORT.json");
const addedTranslations = JSON.parse(fs.readFileSync(path.join(sourceRoot, "added-shortcut-translations.json"), "utf8"));

const resources = [
  ["shortcuts-mac.json", "merge"],
  ["office-shortcuts-mac.json", "merge"],
  ["professional-shortcuts-mac.json", "merge"],
  ["productivity-shortcuts-mac.json", "merge"],
  ["ecosystem-shortcuts-mac.json", "replace"],
  ["verified-shortcuts-mac.json", "replace"],
  ["supplemental-shortcuts-mac.json", "replace"],
  ["browser-reviewed-shortcuts-mac.json", "replace"],
  ["extended-shortcuts-mac.json", "merge"],
  ["curated-shortcuts-mac.json", "replace"],
  ["curated-supplements-mac.json", "merge"],
];

const unavailableOnWindows = new Set([
  "xcode", "safari", "sketch", "finalcut", "logicpro", "garageband", "iterm2",
  "pages", "numbers", "keynote", "preview", "pdfexpert", "mindnode", "alfred",
  "cleanshot", "bartender", "rectangle", "magnet", "iina", "ulysses", "terminal",
  "finder", "osirix", "horos",
]);

const markdownApplications = new Map([
  ["Photoshop_快捷键大全_Windows_macOS.md", "photoshop"],
  ["Illustrator_快捷键大全_Windows_macOS.md", "illustrator"],
  ["AutoCAD_2026_快捷键大全_Windows_macOS.md", "autocad"],
  ["SketchUp_2026_快捷键大全_Windows_macOS.md", "sketchup"],
  ["Blender_5.2_LTS_快捷键大全_Windows_macOS.md", "blender"],
  ["Adobe_After_Effects快捷键大全_Windows_macOS.md", "aftereffects"],
  ["Cinema4D_C4D快捷键大全_Windows_macOS.md", "cinema4d"],
  ["Excel快捷键大全_Windows_macOS_Web_移动端.md", "excel"],
  ["Figma_快捷键大全_Windows_macOS.md", "figma"],
  ["PowerPoint快捷键大全.md", "powerpoint"],
  ["Premiere快捷键大全.md", "premiere"],
  ["VSCode快捷键大全_Windows_macOS_Linux.md", "vscode"],
  ["Word快捷键大全.md", "word"],
]);

const executableNames = {
  figma: ["Figma"], photoshop: ["Photoshop"], illustrator: ["Illustrator"],
  aftereffects: ["AfterFX"], premiere: ["Adobe Premiere Pro"], blender: ["blender"],
  word: ["WINWORD"], excel: ["EXCEL"], powerpoint: ["POWERPNT"], outlook: ["OUTLOOK"],
  onenote: ["ONENOTE"], autocad: ["acad"], sketchup: ["SketchUp"], rhino: ["Rhino"],
  fusion360: ["Fusion360"], freecad: ["FreeCAD"], shapr3d: ["Shapr3D"], maya: ["maya"],
  cinema4d: ["Cinema 4D"], comsol: ["comsol"], matlab: ["MATLAB"], simulink: ["MATLAB"],
  davinci: ["Resolve"], vscode: ["Code"], androidstudio: ["studio64"], intellij: ["idea64"],
  jupyter: ["jupyter-lab", "python"], spss: ["stats"], rstudio: ["rstudio"], chrome: ["chrome"],
  notion: ["Notion"], obsidian: ["Obsidian"], adobexd: ["Adobe XD"], framer: ["Framer"],
  axure: ["AxureRP"], indesign: ["InDesign"], lightroom: ["Lightroom"], zbrush: ["ZBrush"],
  archicad: ["ARCHICAD"], enscape: ["EnscapeClient"], twinmotion: ["Twinmotion"],
  unity: ["Unity"], unrealengine: ["UnrealEditor"], qgis: ["qgis-bin"], chemdraw: ["ChemDraw"],
  pymol: ["PyMOL"], imagej: ["ImageJ-win64"], paraview: ["paraview"], kicad: ["kicad"],
  arduinoide: ["Arduino IDE"], ltspice: ["XVIIx64"], mathematica: ["Mathematica"],
  stata: ["StataMP-64", "StataSE-64"], jmp: ["jmp"], graphpadprism: ["prism"],
  cursor: ["Cursor"], pycharm: ["pycharm64"], webstorm: ["webstorm64"], goland: ["goland64"],
  clion: ["clion64"], githubdesktop: ["GitHubDesktop"], sourcetree: ["SourceTree"], tower: ["Tower"],
  postman: ["Postman"], insomnia: ["Insomnia"], apifox: ["Apifox"], dockerdesktop: ["Docker Desktop"],
  dbeaver: ["dbeaver"], datagrip: ["datagrip64"], mysqlworkbench: ["MySQLWorkbench"],
  pgadmin: ["pgAdmin4"], mongodbcompass: ["MongoDBCompass"], redisinsight: ["RedisInsight"],
  sqlitestudio: ["SQLiteStudio"], tableplus: ["TablePlus"], warp: ["Warp"], arc: ["Arc"],
  firefox: ["firefox"], edge: ["msedge"], zotero: ["zotero"], mendeley: ["Mendeley Reference Manager"],
  endnote: ["EndNote"], anki: ["anki"], goodnotes: ["Goodnotes"], texstudio: ["texstudio"],
  xmind: ["XMind"], drawio: ["draw.io"], miro: ["Miro"], teams: ["ms-teams", "Teams"],
  zoom: ["Zoom"], slack: ["slack"], discord: ["Discord"], wechat: ["WeChat"],
  raycast: ["Raycast"], onepassword: ["1Password"], tableau: ["tableau"], chatgpt: ["ChatGPT"],
  lmstudio: ["LM Studio"], capcut: ["CapCut"], audacity: ["Audacity"], obsstudio: ["obs64"],
  vlc: ["vlc"], handbrake: ["HandBrake"], wpsoffice: ["wps", "et", "wpp"],
  adobeacrobat: ["Acrobat"], evernote: ["Evernote"], scrivener: ["Scrivener"],
  dropbox: ["Dropbox"], googledrive: ["GoogleDriveFS"], onedrive: ["OneDrive"],
  tencentmeeting: ["wemeetapp"], dingtalk: ["DingTalk"], qq: ["QQ"], eclipse: ["eclipse"],
  sublimetext: ["sublime_text"], vectorworks: ["Vectorworks"], calibre: ["calibre"],
  deepl: ["DeepL"], grammarly: ["Grammarly.Desktop"], todoist: ["Todoist"], ticktick: ["TickTick"],
  brave: ["brave"], affinitydesigner: ["Designer"], affinityphoto: ["Photo"],
  affinitypublisher: ["Publisher"], labview: ["LabVIEW"], godot: ["Godot"],
  eagle: ["eagle"], stm32cubeide: ["stm32cubeide"], mplabx: ["mplab_ide64"],
  snapgene: ["SnapGene"], chimerax: ["ChimeraX"], substancepainter: ["Adobe Substance 3D Painter"],
  houdini: ["houdinifx", "houdini"],
};

const actionHeaders = [
  "操作", "功能", "命令", "工具 / 操作", "工具 / 命令", "工具", "管理器 / 窗口",
  "显示模式", "管理器", "场景", "模式", "位置", "工作区", "面板", "插入内容",
  "作用", "当前工具", "目标", "方法", "类型", "功能键", "粘贴内容", "格式", "移动单位",
];

function mergePack(base, overlay) {
  const categories = base.categories.map((category) => ({ ...category, items: [...category.items] }));
  const categoryIndex = new Map(categories.map((category, index) => [category.id, index]));
  for (const category of overlay.categories || []) {
    if (!categoryIndex.has(category.id)) {
      categoryIndex.set(category.id, categories.length);
      categories.push({ ...category, items: [...category.items] });
      continue;
    }
    const index = categoryIndex.get(category.id);
    const items = [...categories[index].items];
    const itemIndex = new Map(items.map((item, offset) => [item.id, offset]));
    for (const item of category.items) {
      if (itemIndex.has(item.id)) items[itemIndex.get(item.id)] = item;
      else {
        itemIndex.set(item.id, items.length);
        items.push(item);
      }
    }
    categories[index] = { ...category, items };
  }
  return { ...base, ...overlay, categories };
}

function loadEffectiveLibrary() {
  const effective = new Map();
  for (const [name, mode] of resources) {
    const library = JSON.parse(fs.readFileSync(path.join(sourceRoot, name), "utf8"));
    for (const pack of library.software) {
      effective.set(
        pack.id,
        !effective.has(pack.id) || mode === "replace"
          ? pack
          : mergePack(effective.get(pack.id), pack)
      );
    }
  }
  return [...effective.values()];
}

function cleanCell(value) {
  return String(value || "")
    .replace(/<br\s*\/?\s*>/gi, " / ")
    .replace(/\*\*/g, "")
    .replace(/\\([|`])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTableRow(line) {
  const source = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = [];
  let current = "";
  let escaped = false;
  for (const character of source) {
    if (escaped) {
      current += character;
      escaped = false;
    } else if (character === "\\") {
      current += character;
      escaped = true;
    } else if (character === "|") {
      cells.push(cleanCell(current));
      current = "";
    } else {
      current += character;
    }
  }
  cells.push(cleanCell(current));
  return cells;
}

function parseTables(file) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const headings = { h1: "", h2: "", h3: "", h4: "" };
  const tables = [];
  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      headings[`h${level}`] = cleanCell(heading[2]);
      for (let deeper = level + 1; deeper <= 4; deeper += 1) headings[`h${deeper}`] = "";
      continue;
    }
    if (!/^\s*\|/.test(lines[index]) || !/^\s*\|?\s*:?-{3,}/.test(lines[index + 1] || "")) continue;
    const headers = splitTableRow(lines[index]);
    const rows = [];
    index += 2;
    while (index < lines.length && /^\s*\|/.test(lines[index])) {
      const cells = splitTableRow(lines[index]);
      while (cells.length < headers.length) cells.push("");
      rows.push(cells.slice(0, headers.length));
      index += 1;
    }
    index -= 1;
    tables.push({ ...headings, headers, rows });
  }
  return tables;
}

function normalizeAction(value) {
  return cleanCell(value)
    .replace(/`/g, "")
    .replace(/[。.;:：]$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u3400-\u9fff]+/g, " ")
    .trim();
}

function tableContext(table) {
  return [table.h1, table.h2, table.h3, table.h4].filter(Boolean).join(" / ");
}

function isWindowsTable(table) {
  if (table.headers.some((header) => /^(?:Windows|Windows \/ Linux)(?:\b|$)/i.test(header))) return true;
  const context = tableContext(table);
  if (/macOS|Mac\b/i.test(context) && !/Windows/i.test(context)) return false;
  if (/网页版|Web\b|移动端|iPad|iPhone|Android|Linux/i.test(context) && !/Windows/i.test(context)) return false;
  return /Windows/i.test(context) || table.headers.some((header) => /平台|系统/.test(header));
}

function actionIndex(table) {
  for (const header of actionHeaders) {
    const index = table.headers.indexOf(header);
    if (index >= 0) return index;
  }
  return -1;
}

function englishIndex(table) {
  return table.headers.findIndex((header) => header === "English" || header === "英文");
}

function windowsKeyIndexes(table) {
  const exact = table.headers.flatMap((header, index) =>
    /^(?:Windows|Windows \/ Linux)(?:\b|$)/i.test(header) ? [index] : []);
  if (exact.length) return exact;
  if (!isWindowsTable(table)) return [];
  return table.headers.flatMap((header, index) =>
    /^(?:快捷键|按键|组合键|触发方式|本文写法|直接执行|打开选项 \/ 说明|单独按|Shift 组合|Ctrl \/ Alt 组合)$/i.test(header)
      ? [index]
      : []);
}

function rowSupportsWindows(table, cells) {
  const platformIndex = table.headers.findIndex((header) => /平台|系统/.test(header));
  if (platformIndex < 0) return true;
  const platform = cleanCell(cells[platformIndex]);
  return !platform || /Windows|通用|全平台|桌面版/i.test(platform);
}

function splitAlternatives(raw) {
  const source = String(raw || "").replace(/<br\s*\/?\s*>/gi, " / ");
  if (!source || /无默认|未分配|不适用|菜单命令|可自行设置|同 macOS/i.test(source)) return [];
  const code = [...source.matchAll(/`([^`]*)`/g)].map((match) => match[1].trim()).filter(Boolean);
  const expression = code.length ? code.join(" / ") : cleanCell(source);
  return expression
    .split(/\s+(?:或|or)\s+|\s+\/\s+|\s*；\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

const modifiers = new Set(["Ctrl", "Alt", "Shift", "Win"]);

function normalizeWindowsExpression(expression) {
  let value = cleanCell(expression);
  if (/^(?:(?:Ctrl|Control|Alt|Shift|Win)\s*\+\s*)*→$/i.test(value)) {
    value = value.replace(/→$/, "RightArrowKey");
  }
  value = value
    .replace(/[（(](?:Windows|默认|部分版本|扩展键盘|数字键盘)[^）)]*[）)]/gi, "")
    .replace(/Control/gi, "Ctrl")
    .replace(/Command|Cmd|⌘/gi, "Ctrl")
    .replace(/Option|⌥/gi, "Alt")
    .replace(/⌃/g, "Ctrl")
    .replace(/⇧/g, "Shift")
    .replace(/Windows logo key|Windows 键|Win键/gi, "Win")
    .replace(/Return/gi, "Enter")
    .replace(/Escape/gi, "Esc")
    .replace(/Backspace/gi, "Backspace")
    .replace(/Forward Delete/gi, "Delete")
    .replace(/Page\s*Up/gi, "PageUp")
    .replace(/Page\s*Down/gi, "PageDown")
    .replace(/Arrow\s*Keys?/gi, "ArrowKeys")
    .replace(/Left\s*Arrow/gi, "←")
    .replace(/Right\s*Arrow/gi, "→KEY")
    .replace(/Up\s*Arrow/gi, "↑")
    .replace(/Down\s*Arrow/gi, "↓")
    .replace(/RightArrowKey/gi, "→KEY")
    .replace(/鼠标中键|中键/gi, "MMB")
    .replace(/鼠标左键|左键/gi, "LMB")
    .replace(/鼠标右键|右键/gi, "RMB")
    .replace(/双击/gi, "DoubleClick")
    .replace(/拖动/gi, "Drag")
    .replace(/滚轮/gi, "Wheel")
    .replace(/点击/gi, "Click")
    .replace(/方向键/gi, "ArrowKeys")
    .replace(/\s*(?:然后|再按|依次|followed by|then)\s*/gi, " → ")
    .replace(/\s*\+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!value || /macOS|OS X|⌘|⌥|⌃|⇧/i.test(value)) return [];
  const explicitSegments = value.split(/\s+→\s+/);
  const output = [];
  for (const segment of explicitSegments) {
    const rawTokens = segment.split(/\s+/).filter(Boolean);
    let chord = [];
    const groups = [];
    for (let token of rawTokens) {
      token = token.replace(/^→KEY$/, "→").replace(/^PageUp$/, "Page Up").replace(/^PageDown$/, "Page Down")
        .replace(/^ArrowKeys$/, "Arrow keys").replace(/^DoubleClick$/, "Double click");
      if (modifiers.has(token)) {
        if (!chord.includes(token)) chord.push(token);
        continue;
      }
      if (chord.some((part) => !modifiers.has(part))) {
        groups.push(chord);
        chord = [];
      }
      chord.push(token);
      groups.push(chord);
      chord = [];
    }
    if (chord.length) groups.push(chord);
    for (const group of groups) {
      if (output.length) output.push("⟶");
      output.push(...group);
    }
  }
  return output.filter(Boolean).slice(0, 12);
}

function buildMarkdownOverrides() {
  const result = new Map();
  const rowsBySoftware = new Map();
  const stats = {};
  for (const [fileName, softwareID] of markdownApplications) {
    const file = path.join(markdownRoot, fileName);
    if (!fs.existsSync(file)) continue;
    const byAction = new Map();
    const uniqueRows = new Map();
    let rows = 0;
    for (const table of parseTables(file)) {
      if (!isWindowsTable(table)) continue;
      const actionOffset = actionIndex(table);
      const keyOffsets = windowsKeyIndexes(table);
      if (actionOffset < 0 || !keyOffsets.length) continue;
      const enOffset = englishIndex(table);
      for (const cells of table.rows) {
        if (!rowSupportsWindows(table, cells)) continue;
        const zh = cleanCell(cells[actionOffset]).replace(/[。.;:]$/, "");
        if (!zh || /^(?:无|—|-|同上)$/.test(zh)) continue;
        const en = enOffset >= 0 ? cleanCell(cells[enOffset]).replace(/[。.;:]$/, "") : "";
        const expressions = keyOffsets.flatMap((index) => splitAlternatives(cells[index]));
        for (const expression of expressions) {
          const keys = normalizeWindowsExpression(expression);
          if (!keys.length) continue;
          const row = { keys, zh, en };
          uniqueRows.set(`${normalizeAction(zh)}\0${keys.join("+").toLowerCase()}`, row);
          for (const action of [zh, en].filter(Boolean)) {
            const normalized = normalizeAction(action);
            if (!byAction.has(normalized)) byAction.set(normalized, []);
            const signature = keys.join("+").toLowerCase();
            if (!byAction.get(normalized).some((entry) => entry.keys.join("+").toLowerCase() === signature)) {
              byAction.get(normalized).push(row);
            }
          }
          rows += 1;
        }
      }
    }
    result.set(softwareID, byAction);
    rowsBySoftware.set(softwareID, [...uniqueRows.values()]);
    stats[softwareID] = { source: fileName, parsedWindowsRows: rows, matchedRows: 0 };
  }
  return { overrides: result, rowsBySoftware, stats };
}

function buildLegacyOverrides() {
  const library = require(path.join(sourceRoot, "legacy-shortcuts.js"));
  const result = new Map();
  for (const pack of Object.values(library)) {
    const byAction = new Map();
    for (const category of pack.categories || []) {
      for (const item of category.items || []) {
        const keys = (item.keys.win || []).map((key) => key === "Arrow" ? "Arrow keys" : key);
        if (!keys.length) continue;
        for (const action of [item.zh, item.en].filter(Boolean)) {
          const normalized = normalizeAction(action);
          if (!byAction.has(normalized)) byAction.set(normalized, []);
          byAction.get(normalized).push({ keys, zh: item.zh, en: item.en });
        }
      }
    }
    result.set(pack.id, byAction);
  }
  return result;
}

function convertedKey(token, language, title) {
  const pointerEnglish = {
    "拖动": "Drag", "滚轮": "Wheel", "点击": "Click", "右键": "Right click",
    "悬停": "Hover", "方向键": "Arrow keys", "双击": "Double click", "点击拖动": "Click-drag",
    "拖动节点": "Drag node", "点击菜单": "Menu command", "中键拖动": "Middle-drag",
    "中键点击": "Middle click", "左键拖动": "Left-drag", "右键拖动": "Right-drag",
  };
  const pointerChinese = Object.fromEntries(Object.entries(pointerEnglish).map(([zh, en]) => [en, zh]));
  const exact = {
    "⌘": "Ctrl", "Command": "Ctrl", "Cmd": "Ctrl", "⌥": "Alt", "Option": "Alt", "Alt": "Alt",
    "⌃": "Ctrl", "Control": "Ctrl", "Ctrl": "Ctrl", "⇧": "Shift", "Shift": "Shift",
    "Return": "Enter", "Enter": "Enter", "Escape": "Esc", "Backspace": "Backspace",
    "Forward Delete": "Delete", "⌫": "Backspace", "⌦": "Delete", "Fn": "",
  };
  let value = exact[token] ?? token;
  value = value
    .replace(/Command|Cmd|⌘/gi, "Ctrl")
    .replace(/Option|⌥/gi, "Alt")
    .replace(/Control|⌃/gi, "Ctrl")
    .replace(/Shift|⇧/gi, "Shift")
    .replace(/Return/gi, "Enter")
    .replace(/Forward Delete/gi, "Delete");
  if (value === "Delete" && /previous|backward|前一个|向后删除|左侧字符/i.test(title)) value = "Backspace";
  if (language === "en") return pointerEnglish[value] ?? value;
  return pointerChinese[value] ?? value;
}

function convertKeySequence(keys, language, title) {
  const output = [];
  let segmentModifiers = new Set();
  const sourceKeys = keys || [];
  for (const [index, raw] of sourceKeys.entries()) {
    if (raw === "→" && index > 0 && index < sourceKeys.length - 1) {
      if (output.at(-1) !== "⟶") output.push("⟶");
      segmentModifiers = new Set();
      continue;
    }
    const key = convertedKey(raw, language, title);
    if (!key) continue;
    if (modifiers.has(key)) {
      if (segmentModifiers.has(key)) continue;
      segmentModifiers.add(key);
    }
    output.push(key);
  }
  while (output.at(-1) === "⟶") output.pop();
  return output;
}

function actionSpecificOverride(item, keys) {
  const title = `${item.zh} ${item.en}`;
  if (/switch (?:between )?applications|切换应用/i.test(title)) return ["Alt", "Tab"];
  if (/force quit|强制退出/i.test(title)) return ["Ctrl", "Shift", "Esc"];
  if (/quit (?:the )?(?:application|program)|exit (?:the )?(?:application|program)|退出程序|退出应用/i.test(title)) {
    return ["Alt", "F4"];
  }
  return keys;
}

function deduplicateWindowsModifiers(keys) {
  const result = [];
  let modifiersInChord = new Set();
  for (const key of keys) {
    if (key === "⟶") {
      if (result.length && result.at(-1) !== "⟶") result.push(key);
      modifiersInChord = new Set();
      continue;
    }
    if (modifiers.has(key)) {
      if (modifiersInChord.has(key)) continue;
      modifiersInChord.add(key);
    }
    result.push(key);
  }
  while (result.at(-1) === "⟶") result.pop();
  return result;
}

function expandAlternativeSequences(keys) {
  const compoundIndex = keys.findIndex((key) => key.includes(" / "));
  if (compoundIndex < 0) return [deduplicateWindowsModifiers(keys)];
  const prefix = keys.slice(0, compoundIndex);
  const suffix = keys.slice(compoundIndex + 1);
  const options = keys[compoundIndex].split(" / ").map((option) => option.trim()).filter(Boolean);
  const containsModifierAlternative = options.some((option) => modifiers.has(option));
  const expanded = [];
  for (const option of options) {
    const sequence = containsModifierAlternative && suffix.length
      ? modifiers.has(option)
        ? [...prefix, option, ...suffix]
        : [...prefix, option]
      : [...prefix, option, ...suffix];
    expanded.push(...expandAlternativeSequences(sequence));
  }
  const unique = new Map();
  for (const sequence of expanded) unique.set(sequence.join("+").toLowerCase(), sequence);
  return [...unique.values()];
}

function findOverride(byAction, item, occurrence) {
  if (!byAction) return null;
  for (const action of [item.zh, item.en]) {
    const entries = byAction.get(normalizeAction(action));
    if (entries?.length) return entries[Math.min(occurrence, entries.length - 1)];
  }
  return null;
}

function adaptPack(pack, markdown, legacy, reportStats) {
  const unavailable = unavailableOnWindows.has(pack.id);
  const mappedGroup = pack.group === "macUtility" ? "windowsUtility" : pack.group;
  if (unavailable) {
    return {
      ...pack,
      group: mappedGroup,
      bundleIdentifiers: undefined,
      windowsAvailability: "unavailable",
      windowsExecutableNames: [],
      categories: [],
      provenance: {
        ...(pack.provenance || {}),
        platform: "Windows",
        coverage: "software-unavailable-on-windows",
      },
    };
  }

  const markdownByAction = markdown.overrides.get(pack.id);
  const legacyByAction = legacy.get(pack.id);
  const actionOccurrences = new Map();
  let exactMarkdown = 0;
  let exactLegacy = 0;
  let conventionMapped = 0;
  const categories = pack.categories.map((category) => {
    const seen = new Set();
    const items = [];
    for (const item of category.items) {
      const actionKey = normalizeAction(item.zh || item.en);
      const occurrence = actionOccurrences.get(actionKey) || 0;
      actionOccurrences.set(actionKey, occurrence + 1);
      const markdownOverride = findOverride(markdownByAction, item, occurrence);
      const legacyOverride = markdownOverride ? null : findOverride(legacyByAction, item, occurrence);
      let keys;
      let sourceTag;
      if (markdownOverride) {
        keys = markdownOverride.keys;
        sourceTag = "windows-source-document";
        exactMarkdown += 1;
        if (markdown.stats[pack.id]) markdown.stats[pack.id].matchedRows += 1;
      } else if (legacyOverride) {
        keys = legacyOverride.keys;
        sourceTag = "windows-reviewed-legacy";
        exactLegacy += 1;
      } else {
        keys = actionSpecificOverride(item, convertKeySequence(item.keys, "en", `${item.zh} ${item.en}`));
        sourceTag = "windows-convention-mapped";
        conventionMapped += 1;
      }
      if (!keys.length) continue;
      const alternatives = expandAlternativeSequences(keys);
      for (const [alternativeIndex, alternative] of alternatives.entries()) {
        const keysZh = alternative.map((key) => convertedKey(key, "zh", item.zh));
        const keysEn = alternative.map((key) => convertedKey(key, "en", item.en));
        const signature = `${normalizeAction(item.en)}\0${keysEn.join("+").toLowerCase()}`;
        if (seen.has(signature)) continue;
        seen.add(signature);
        items.push({
          ...item,
          id: alternatives.length > 1 ? `${item.id}.win${alternativeIndex + 1}` : item.id,
          keys: keysEn,
          keysZh,
          keysEn,
          tags: [...new Set([...(item.tags || []).filter((tag) => !/^macOS$/i.test(tag)), "Windows", sourceTag])],
        });
      }
    }
    return { ...category, items };
  }).filter((category) => category.items.length);

  let windowsSpecificAdditions = 0;
  const documentedRows = markdown.rowsBySoftware.get(pack.id) || [];
  if (documentedRows.length) {
    const existing = new Set();
    for (const category of categories) {
      for (const item of category.items) {
        const keySignature = item.keys.join("+").toLowerCase();
        existing.add(`zh\0${normalizeAction(item.zh)}\0${keySignature}`);
        existing.add(`en\0${normalizeAction(item.en)}\0${keySignature}`);
      }
    }
    const extraItems = [];
    for (const row of documentedRows) {
      const en = row.en || addedTranslations[row.zh];
      if (!en || /[\u3400-\u9fff]/.test(en)) continue;
      const keySignature = row.keys.join("+").toLowerCase();
      const signatures = [
        `zh\0${normalizeAction(row.zh)}\0${keySignature}`,
        `en\0${normalizeAction(en)}\0${keySignature}`,
      ];
      if (signatures.some((signature) => existing.has(signature))) continue;
      for (const signature of signatures) existing.add(signature);
      windowsSpecificAdditions += 1;
      extraItems.push({
        id: `${pack.id}.windows.${String(windowsSpecificAdditions).padStart(4, "0")}.${normalizeAction(en).replace(/\s+/g, "-").slice(0, 42)}`,
        keys: row.keys,
        keysZh: row.keys.map((key) => convertedKey(key, "zh", row.zh)),
        keysEn: row.keys.map((key) => convertedKey(key, "en", en)),
        zh: row.zh,
        en,
        tags: ["Windows", "default", "windows-source-document", "windows-specific"],
      });
    }
    if (extraItems.length) {
      categories.push({
        id: `${pack.id}-windows-specific`,
        zh: "Windows 专属命令",
        en: "Windows-specific commands",
        items: extraItems,
      });
    }
  }

  reportStats[pack.id] = {
    name: pack.name,
    shortcuts: categories.reduce((sum, category) => sum + category.items.length, 0),
    exactMarkdown,
    exactLegacy,
    conventionMapped,
    windowsSpecificAdditions,
    availability: "available",
  };

  return {
    ...pack,
    group: mappedGroup,
    bundleIdentifiers: undefined,
    windowsAvailability: "available",
    windowsExecutableNames: executableNames[pack.id] || [],
    categories,
    provenance: {
      ...(pack.provenance || {}),
      sourceTitle: `${pack.provenance?.sourceTitle || "KeyFloat reviewed shortcut pack"}; Windows adaptation cross-checked against bundled Windows source tables where available`,
      verifiedAt: "2026-07-26",
      coverage: "windows-document-cross-checked-and-convention-mapped",
      platform: "Windows",
    },
  };
}

function main() {
  const effective = loadEffectiveLibrary();
  const markdown = buildMarkdownOverrides();
  const legacy = buildLegacyOverrides();
  const softwareReport = {};
  const software = effective.map((pack) => {
    const adapted = adaptPack(pack, markdown, legacy, softwareReport);
    if (unavailableOnWindows.has(pack.id)) {
      softwareReport[pack.id] = { name: pack.name, shortcuts: 0, exactMarkdown: 0, exactLegacy: 0, conventionMapped: 0, availability: "unavailable" };
    }
    return adapted;
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify({ software })}\n`);
  const available = software.filter((pack) => pack.windowsAvailability === "available");
  const totalShortcuts = available.reduce((sum, pack) => sum + pack.categories.reduce((count, category) => count + category.items.length, 0), 0);
  const report = {
    generatedAt: "2026-07-26",
    sourceSoftware: effective.length,
    windowsAvailableSoftware: available.length,
    windowsUnavailableSoftware: software.length - available.length,
    windowsShortcutRows: totalShortcuts,
    policy: {
      priority: ["Bundled Windows markdown tables", "Reviewed legacy Windows pairs", "Explicit Windows convention mapping"],
      unavailable: "Software without a supported Windows edition remains visible in the catalog but exposes no fabricated shortcuts.",
      sourceIntegrity: "The macOS source project is read-only; all transformations occur inside KeyFloat Win V1.04.",
    },
    markdownSources: markdown.stats,
    software: softwareReport,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Generated ${available.length} Windows software packs and ${totalShortcuts} shortcuts; ${software.length - available.length} unavailable products retained as catalog entries.`);
}

main();
