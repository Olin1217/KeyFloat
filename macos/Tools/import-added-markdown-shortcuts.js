#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  cleanCell,
  localizedKeys,
  normalizeTitle,
  parseTables,
  slug,
  translateAction,
} = require("./import-markdown-shortcuts.js");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "KeyFloat");
const sourceRoot = process.argv.find((argument) => !argument.startsWith("--") && argument !== process.argv[0] && argument !== process.argv[1]) ||
  "/Users/hualong/Downloads/快捷键md add";
const dryRun = process.argv.includes("--dry-run");
const verifiedAt = "2026-07-25";
const addedTranslations = JSON.parse(
  fs.readFileSync(path.join(__dirname, "added-shortcut-translations.json"), "utf8")
);

const ordinalPattern = "(?:二十一|二十二|二十三|二十四|十一|十二|十三|十四|十五|十六|十七|十八|十九|二十|一|二|三|四|五|六|七|八|九|十)";

const configs = {
  aftereffects: {
    file: "Adobe_After_Effects快捷键大全_Windows_macOS.md",
    name: "After Effects", vendor: "Adobe", accent: "#9999FF", glyph: "Ae", group: "design",
    bundleIdentifiers: ["com.adobe.AfterEffects"], output: "verified-shortcuts-mac.json", currentCount: 717,
    mode: "merge", force: true, keyMode: "mac-column", categorySource: "h1",
    sourceURL: "https://helpx.adobe.com/after-effects/using/keyboard-shortcuts-reference.html",
    appVersion: "After Effects 2024–2026 default shortcuts",
    include: (table) => new RegExp(`^${ordinalPattern}、`).test(table.h1) && !/^二十二、|^二十三、/.test(table.h1),
    categories: {
      "一": ["通用编辑、项目与首选项", "General Editing, Projects & Preferences"],
      "二": ["面板、查看器、工作区与窗口", "Panels, Viewers, Workspaces & Windows"],
      "三": ["工具", "Tools"], "四": ["合成与工作区域", "Compositions & Work Area"],
      "五": ["时间导航", "Time Navigation"], "六": ["预览", "Preview"],
      "七": ["视图、显示、缩放、网格与参考线", "View, Display, Zoom, Grids & Guides"],
      "八": ["素材与项目面板", "Footage & Project Panel"], "九": ["图层", "Layers"],
      "十": ["时间轴属性显示与筛选", "Timeline Properties & Filtering"],
      "十一": ["修改图层属性", "Modify Layer Properties"],
      "十二": ["效果与动画预设", "Effects & Animation Presets"],
      "十三": ["关键帧与图表编辑器", "Keyframes & Graph Editor"],
      "十四": ["3D 图层、相机与灯光", "3D Layers, Cameras & Lights"],
      "十五": ["文本", "Text"], "十六": ["蒙版与路径", "Masks & Paths"],
      "十七": ["形状图层", "Shape Layers"],
      "十八": ["绘画、画笔、仿制图章与橡皮擦", "Painting, Brushes, Clone Stamp & Eraser"],
      "十九": ["标记", "Markers"], "二十": ["运动跟踪", "Motion Tracking"],
      "二十一": ["保存、导出与渲染", "Save, Export & Render"],
    },
  },
  cinema4d: {
    file: "Cinema4D_C4D快捷键大全_Windows_macOS.md",
    name: "Cinema 4D", vendor: "Maxon", accent: "#0B63CE", glyph: "C4D", group: "modeling",
    bundleIdentifiers: ["net.maxon.cinema4d"], output: "curated-shortcuts-mac.json", currentCount: 34,
    force: true, keyMode: "mac-column", categorySource: "h1",
    sourceURL: "https://help.maxon.net/c4d/en-us/Default.htm#html/5892.html",
    appVersion: "Cinema 4D 2026 default shortcuts",
    include: (table) => new RegExp(`^${ordinalPattern}、`).test(table.h1) && !/^二十四、/.test(table.h1),
    categories: {
      "一": ["通用编辑、项目与帮助", "General Editing, Projects & Help"],
      "二": ["管理器与窗口", "Managers & Windows"], "三": ["视口与相机导航", "Viewport & Camera Navigation"],
      "四": ["视口显示模式", "Viewport Display Modes"], "五": ["坐标、变换与建模模式", "Coordinates, Transform & Modeling Modes"],
      "六": ["多边形建模工具", "Polygon Modeling Tools"], "七": ["选择工具与选择命令", "Selection Tools & Commands"],
      "八": ["对象管理器", "Object Manager"], "九": ["材质管理器", "Material Manager"],
      "十": ["节点编辑器", "Node Editor"], "十一": ["时间线与动画播放", "Timeline & Animation Playback"],
      "十二": ["关键帧插值", "Keyframe Interpolation"], "十三": ["属性管理器", "Attribute Manager"],
      "十四": ["图片查看器", "Picture Viewer"], "十五": ["结构管理器", "Structure Manager"],
      "十六": ["资源浏览器", "Asset Browser"], "十七": ["BodyPaint 3D 与 UV", "BodyPaint 3D & UV"],
      "十八": ["运动跟踪", "Motion Tracking"], "十九": ["脚本管理器", "Script Manager"],
      "二十": ["渲染", "Rendering"], "二十一": ["Redshift RenderView", "Redshift RenderView"],
      "二十二": ["Redshift Shader Graph", "Redshift Shader Graph"], "二十三": ["雕刻", "Sculpting"],
    },
  },
  excel: {
    file: "Excel快捷键大全_Windows_macOS_Web_移动端.md",
    name: "Excel", vendor: "Microsoft", accent: "#217346", glyph: "X", group: "office",
    bundleIdentifiers: ["com.microsoft.Excel"], output: "supplemental-shortcuts-mac.json", currentCount: 273,
    mode: "merge", force: true, keyMode: "mac-section", categorySource: "h2",
    sourceURL: "https://support.microsoft.com/en-US/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f",
    appVersion: "Microsoft 365 Excel for Mac",
    include: (table) => /^二、Excel for macOS/.test(table.h1) && /^(?:[1-7])\./.test(table.h2),
    categories: {
      "1": ["文件、窗口与常用操作", "Files, Windows & Common Actions"],
      "2": ["导航、滚动与工作表", "Navigation, Scrolling & Worksheets"],
      "3": ["输入、单元格与公式栏", "Input, Cells & Formula Bar"],
      "4": ["格式与编辑", "Formatting & Editing"], "5": ["选择与选区操作", "Selection & Ranges"],
      "6": ["图表、排序、筛选与分级", "Charts, Sort, Filter & Outline"],
      "7": ["Copilot 与功能键", "Copilot & Function Keys"],
    },
  },
  figma: {
    file: "Figma_快捷键大全_Windows_macOS.md",
    name: "Figma", vendor: "Figma", accent: "#F24E1E", glyph: "F", group: "design",
    bundleIdentifiers: ["com.figma.Desktop"], output: "curated-shortcuts-mac.json", currentCount: 76,
    force: true, keyMode: "mac-column", categorySource: "h2", removeSupplements: true,
    sourceURL: "https://help.figma.com/hc/en-us/articles/360040328653-Use-keyboard-shortcuts",
    appVersion: "Figma Design, FigJam and Dev Mode (2026-07)",
    include: (table) => /^(?:[2-9]|1\d|2[0-3])\./.test(table.h2),
    categories: {
      "2": ["快捷键与命令入口", "Shortcuts & Command Entry"], "3": ["全局编辑与文件操作", "Global Editing & Files"],
      "4": ["工具快捷键", "Tools"], "5": ["画布、缩放与页面导航", "Canvas, Zoom & Page Navigation"],
      "6": ["界面、侧栏与显示模式", "Interface, Sidebars & Display"], "7": ["选择与层级导航", "Selection & Hierarchy Navigation"],
      "8": ["移动、微调、缩放与旋转", "Move, Nudge, Resize & Rotate"], "9": ["图层顺序、对齐与分布", "Layer Order, Alignment & Distribution"],
      "10": ["Frame、Section、Slice 与容器", "Frames, Sections, Slices & Containers"], "11": ["Auto Layout", "Auto Layout"],
      "12": ["复制、粘贴、替换与属性复用", "Copy, Paste, Replace & Properties"], "13": ["填充、描边、透明度与外观", "Fill, Stroke, Opacity & Appearance"],
      "14": ["矢量编辑、路径与节点", "Vector Editing, Paths & Nodes"], "15": ["布尔运算、蒙版与扁平化", "Boolean, Masks & Flatten"],
      "16": ["文字编辑与排版", "Text Editing & Typography"], "17": ["组件、实例、变体与资源库", "Components, Instances, Variants & Libraries"],
      "18": ["变量与样式管理", "Variables & Styles"], "19": ["原型设计与演示模式", "Prototyping & Presentation"],
      "20": ["评论、协作与插件", "Comments, Collaboration & Plugins"], "21": ["Dev Mode 与标注", "Dev Mode & Annotations"],
      "22": ["无障碍键盘操作", "Accessible Keyboard Navigation"], "23": ["FigJam", "FigJam"],
    },
  },
  powerpoint: {
    file: "PowerPoint快捷键大全.md",
    name: "PowerPoint", vendor: "Microsoft", accent: "#B7472A", glyph: "P", group: "office",
    bundleIdentifiers: ["com.microsoft.Powerpoint"], output: "supplemental-shortcuts-mac.json", currentCount: 135,
    mode: "merge", force: true, keyMode: "mac-section", categorySource: "h3",
    sourceURL: "https://support.microsoft.com/en-US/office/use-keyboard-shortcuts-to-create-powerpoint-presentations-ebb3d20e-dcd4-444f-a38e-bb5c5ed180f4",
    appVersion: "Microsoft 365 PowerPoint for Mac",
    include: (table) => /^(?:4|6)\./.test(table.h2) && /^(?:4\.[1-8]|6\.[1-3])\b/.test(table.h3),
    categories: {
      "4.1": ["文件、幻灯片和窗口", "Files, Slides & Windows"], "4.2": ["复制、格式刷和对象", "Copy, Format Painter & Objects"],
      "4.3": ["选择、删除和移动文字", "Select, Delete & Move Text"], "4.4": ["查找和文字格式", "Find & Text Formatting"],
      "4.5": ["表格", "Tables"], "4.6": ["移动幻灯片", "Move Slides"],
      "4.7": ["视图、窗格、网格和参考线", "Views, Panes, Grids & Guides"], "4.8": ["macOS 功能键", "macOS Function Keys"],
      "6.1": ["开始、控制和结束放映", "Start, Control & End Slide Show"], "6.2": ["指针、批注和 Cameo", "Pointer, Annotation & Cameo"],
      "6.3": ["演示者视图", "Presenter View"],
    },
  },
  premiere: {
    file: "Premiere快捷键大全.md",
    name: "Premiere Pro", vendor: "Adobe", accent: "#9999FF", glyph: "Pr", group: "media",
    bundleIdentifiers: ["com.adobe.PremierePro"], output: "curated-shortcuts-mac.json", currentCount: 45,
    force: true, keyMode: "mac-column", categorySource: "h2",
    sourceURL: "https://helpx.adobe.com/premiere-pro/using/keyboard-shortcuts.html",
    appVersion: "Premiere Pro 2024–2026 default preset",
    include: (table) => /^(?:[3-9]|1[0-3])\./.test(table.h2) || /^14\. 自定义/.test(table.h2) && /^14\.1/.test(table.h3),
    categories: {
      "3": ["文件、项目和通用编辑", "Files, Projects & General Editing"], "4": ["工具面板", "Tools Panel"],
      "5": ["播放、定位与 J-K-L 控制", "Playback, Navigation & J-K-L Control"], "6": ["入点、出点与编辑", "In/Out Points & Editing"],
      "7": ["剪辑、修剪和时间轴", "Clips, Trimming & Timeline"], "8": ["素材、链接、速度和音频", "Media, Linking, Speed & Audio"],
      "9": ["标记、字幕和图形文字", "Markers, Captions & Graphics"], "10": ["工作区、窗口和面板", "Workspaces, Windows & Panels"],
      "11": ["项目、媒体浏览器和监视器", "Project, Media Browser & Monitors"], "12": ["效果、混音器、历史和元数据", "Effects, Mixers, History & Metadata"],
      "13": ["多机位剪辑", "Multicam Editing"], "14": ["快捷键管理", "Keyboard Shortcut Management"],
    },
  },
  sketch: {
    file: "Sketch快捷键大全_macOS与Web(1).md",
    name: "Sketch", vendor: "Sketch B.V.", accent: "#F7B500", glyph: "S", group: "design",
    bundleIdentifiers: ["com.bohemiancoding.sketch3"], output: "curated-shortcuts-mac.json", currentCount: 34,
    force: true, keyMode: "mac-section", categorySource: "h2",
    sourceURL: "https://www.sketch.com/docs/shortcuts/",
    appVersion: "Sketch macOS app (official docs updated 2026-06-22)",
    include: (table) => /^一、Sketch macOS 应用快捷键/.test(table.h1) && /^(?:[1-9]|1\d|20)\./.test(table.h2),
    categories: {
      "1": ["通用与应用", "General & Application"], "2": ["文档、标签页与页面", "Documents, Tabs & Pages"],
      "3": ["界面视图", "Interface Views"], "4": ["画布缩放与导航", "Canvas Zoom & Navigation"], "5": ["评论", "Comments"],
      "6": ["插入工具", "Insert Tools"], "7": ["图层选择与层级", "Layer Selection & Hierarchy"], "8": ["基础编辑", "Basic Editing"],
      "9": ["样式与颜色", "Styles & Colors"], "10": ["导出", "Export"], "11": ["移动与缩放", "Move & Resize"],
      "12": ["组织与图层顺序", "Organization & Layer Order"], "13": ["对齐、约束与 Stack Layout", "Alignment, Constraints & Stack Layout"],
      "14": ["形状与布尔运算", "Shapes & Boolean Operations"], "15": ["矢量编辑", "Vector Editing"],
      "16": ["文本编辑与格式", "Text Editing & Formatting"], "17": ["组件", "Components"], "18": ["组件视图", "Components View"],
      "19": ["命令栏与组件浏览", "Command Bar & Component Browsing"], "20": ["Inspector 数值字段", "Inspector Numeric Fields"],
    },
  },
  vscode: {
    file: "VSCode快捷键大全_Windows_macOS_Linux.md",
    name: "Visual Studio Code", vendor: "Microsoft", accent: "#007ACC", glyph: "VS", group: "development",
    bundleIdentifiers: ["com.microsoft.VSCode"], output: "curated-shortcuts-mac.json", currentCount: 50,
    force: true, keyMode: "mac-column", categorySource: "h2",
    sourceURL: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf",
    appVersion: "Visual Studio Code default macOS keybindings (2026-07)",
    include: (table) => /^(?:[1-9]|1\d|20)\./.test(table.h2),
    categories: {
      "1": ["通用与命令面板", "General & Command Palette"], "2": ["文件管理", "File Management"], "3": ["基础编辑", "Basic Editing"],
      "4": ["多光标与选择", "Multi-Cursor & Selection"], "5": ["当前文件查找与替换", "Current File Find & Replace"],
      "6": ["全局搜索与搜索编辑器", "Global Search & Search Editor"], "7": ["智能提示、代码操作与重构", "IntelliSense, Code Actions & Refactoring"],
      "8": ["代码与文件导航", "Code & File Navigation"], "9": ["编辑器与窗口管理", "Editor & Window Management"],
      "10": ["界面、面板与显示", "Interface, Panels & Display"], "11": ["代码折叠", "Code Folding"],
      "12": ["注释、格式化与语言模式", "Comments, Formatting & Language Mode"], "13": ["调试", "Debugging"],
      "14": ["集成终端", "Integrated Terminal"], "15": ["Git 与源代码管理", "Git & Source Control"], "16": ["Markdown", "Markdown"],
      "17": ["任务", "Tasks"], "18": ["AI、Chat 与内联建议", "AI, Chat & Inline Suggestions"],
      "19": ["无障碍与键盘操作", "Accessibility & Keyboard Navigation"], "20": ["首选项与个性化", "Preferences & Personalization"],
    },
  },
  word: {
    file: "Word快捷键大全.md",
    name: "Word", vendor: "Microsoft", accent: "#2B579A", glyph: "W", group: "office",
    bundleIdentifiers: ["com.microsoft.Word"], output: "supplemental-shortcuts-mac.json", currentCount: 216,
    mode: "merge", force: true, keyMode: "mac-section", categorySource: "h3",
    sourceURL: "https://support.microsoft.com/en-US/office/keyboard-shortcuts-in-word-95ef89dd-7142-4b50-afb2-f762f663ceb2",
    appVersion: "Microsoft 365 Word for Mac",
    include: (table) => /^4\. macOS 版完整分类/.test(table.h2) && /^4\.(?:[1-9]|1[0-3])\b/.test(table.h3),
    categories: {
      "4.1": ["文件、编辑和窗口", "Files, Editing & Windows"], "4.2": ["查找、替换、定位和导航", "Find, Replace, Go To & Navigation"],
      "4.3": ["选择文本", "Select Text"], "4.4": ["删除、粘贴和移动内容", "Delete, Paste & Move Content"],
      "4.5": ["换行、分页和特殊字符", "Line Breaks, Page Breaks & Special Characters"], "4.6": ["字符和字体格式", "Character & Font Formatting"],
      "4.7": ["段落、缩进、行距和样式", "Paragraphs, Indents, Spacing & Styles"], "4.8": ["大纲视图", "Outline View"],
      "4.9": ["表格", "Tables"], "4.10": ["审阅、批注和修订", "Review, Comments & Track Changes"],
      "4.11": ["脚注、尾注和域", "Footnotes, Endnotes & Fields"], "4.12": ["缩放和绘图", "Zoom & Drawing"],
      "4.13": ["macOS 功能键", "macOS Function Keys"],
    },
  },
};

const actionHeaders = [
  "操作", "功能", "命令", "工具 / 操作", "工具 / 命令", "工具", "管理器 / 窗口", "显示模式",
  "插值 / 切线操作", "管理器", "场景", "模式", "位置", "工作区", "面板", "插入内容", "作用",
  "当前工具", "目标", "方法", "类型", "按键", "功能键", "粘贴内容", "格式", "移动单位",
];

const modifierTokens = new Set(["⌘", "⌥", "⌃", "⇧", "Fn"]);
const wordReplacements = [
  [/\bCommand\b|\bCmd\b/gi, "⌘"], [/\bOption\b|\bOpt\b|\bAlt\b/gi, "⌥"],
  [/\bControl\b|\bCtrl\b/gi, "⌃"], [/\bShift\b/gi, "⇧"], [/\bEscape\b/gi, "Esc"],
  [/\bEnter\b/gi, "Return"], [/\bBackspace\b/gi, "Delete"], [/\bSpacebar\b|空格键|空格/gi, "Space"],
  [/\bLeft Arrow\b|左箭头/gi, "←"], [/\bRight Arrow\b|右箭头/gi, "→"],
  [/\bUp Arrow\b|上箭头/gi, "↑"], [/\bDown Arrow\b|下箭头/gi, "↓"],
  [/\bPage Up\b/gi, "PageUp"], [/\bPage Down\b/gi, "PageDown"],
  [/\bDouble[- ]Click\b|双击/gi, "DoubleClick"], [/\bArrow(?: Keys?)?\b/gi, "ArrowKeys"],
  [/\bMiddle Mouse Button\b|鼠标中键|中键/gi, "MMB"],
  [/\bLeft Mouse Button\b|鼠标左键|左键/gi, "LMB"], [/\bRight Mouse Button\b|鼠标右键|右键/gi, "RMB"],
];

function headingKey(value) {
  const decimal = cleanCell(value).match(/^(\d+(?:\.\d+)?)/);
  if (decimal) return decimal[1];
  const ordinal = cleanCell(value).match(new RegExp(`^(${ordinalPattern})、`));
  return ordinal?.[1] || "";
}

function categoryFor(config, table) {
  const heading = table[config.categorySource] || "";
  return config.categories[headingKey(heading)] || null;
}

function headerIndex(headers, candidates) {
  for (const candidate of candidates) {
    const index = headers.findIndex((header) => header === candidate);
    if (index >= 0) return index;
  }
  return -1;
}

function looksUnavailable(value) {
  return /^(?:|—|-|无|无默认|默认无|未分配|不适用|同上|菜单命令|依版本|视情况)$/i.test(cleanCell(value)) ||
    /(?:无默认|未分配|可自行设置|菜单中|命令面板中搜索|不设默认)/.test(cleanCell(value));
}

function rawKeyCells(config, table, cells) {
  const macIndex = table.headers.findIndex((header) => /^(?:macOS|Mac)$/.test(header));
  if (macIndex >= 0) {
    let value = cells[macIndex];
    if (/^(?:同 Windows|同左|相同)$/.test(cleanCell(value))) {
      const windowsIndex = table.headers.findIndex((header) => /^Windows(?:\b|$)/.test(header));
      if (windowsIndex >= 0) value = cells[windowsIndex];
    }
    return [value];
  }
  if (table.headers.some((header) => /^Windows(?:\b|$)/.test(header)) && config.keyMode !== "mac-section") return [];
  const indexes = table.headers.flatMap((header, index) =>
    /^(?:快捷键|快捷键 \/ 操作|快捷键 1|快捷键 2|直接执行|打开选项 \/ 说明|按键|单独按|Shift 组合|Ctrl \/ Alt 组合)$/.test(header)
      ? [index] : []
  );
  return indexes.map((index) => cells[index]);
}

function propagateModifiers(parts) {
  if (parts.length < 2) return parts;
  const first = parts[0];
  const prefix = [];
  for (const match of first.matchAll(/(?:⌘|⌥|⌃|⇧|\bFn\b|\bCmd\b|\bCommand\b|\bOption\b|\bControl\b|\bCtrl\b|\bShift\b)/g)) {
    prefix.push(match[0]);
  }
  if (!prefix.length) return parts;
  return parts.map((part, index) => index === 0 || /(?:⌘|⌥|⌃|⇧|\bFn\b|\bCmd\b|\bCommand\b|\bOption\b|\bControl\b|\bCtrl\b|\bShift\b)/.test(part)
    ? part : `${prefix.join(" + ")} + ${part}`);
}

function alternativeExpressions(raw) {
  const source = String(raw || "").replace(/<br\s*\/?\s*>/gi, " 或 ");
  if (looksUnavailable(source) || /Windows|⊞|Win\s*\+/i.test(source)) return [];
  const codeMatches = [...source.matchAll(/`([^`]*)`/g)];
  let expression = codeMatches.length ? codeMatches.map((match) => match[1]).join(
    codeMatches.some((match, index) => index > 0 && /(?:后|再按|依次|→)/.test(source.slice(codeMatches[index - 1].index + codeMatches[index - 1][0].length, match.index)))
      ? " → " : " 或 "
  ) : cleanCell(source);
  expression = expression
    .replace(/\s*[（(](?:依版本|部分版本|必要时|MacBook|扩展键盘|可修改|默认|数字键盘)[^）)]*[）)]\s*/gi, " ")
    .replace(/\s+or\s+/gi, " 或 ")
    .trim();
  let parts = expression.split(/\s+(?:或|ALT_BREAK)\s+|\s*；\s*|\s+\/\s+/).map((part) => part.trim()).filter(Boolean);
  parts = propagateModifiers(parts);
  return parts;
}

function normalizeKeyExpression(expression) {
  let value = cleanCell(expression)
    .replace(/^(?:启动时|编辑时|按住|点按)\s*/g, "")
    .replace(/(?:，|、)\s*(?:然后|再按|后按|依次)\s*/g, " → ")
    .replace(/\s+(?:then|followed by)\s+/gi, " → ")
    .replace(/(?<=[A-Za-z0-9]),\s*(?=[A-Za-z0-9⇧⌘⌥⌃])/g, " → ")
    .replace(/\s*→\s*/g, " → ");
  for (const [pattern, replacement] of wordReplacements) value = value.replace(pattern, replacement);
  value = value.replace(/([⌘⌥⌃⇧←↑↓])/g, " $1 ").replace(/\bfn\b/gi, " Fn ").replace(/\s+/g, " ").trim();
  const explicitSequence = value.includes("→");
  const segments = value.split(/\s+→\s+/);
  const groups = [];
  for (let segment of segments) {
    const trailingPlus = /\+\s*$/.test(segment);
    segment = segment.replace(/\+\s*$/, trailingPlus ? " PLUS_KEY" : "").replace(/\s*\+\s*/g, " ").trim();
    const tokens = segment.split(/\s+/).filter(Boolean).map((token) => {
      if (token === "PLUS_KEY") return "+";
      if (token === "DoubleClick") return "Double click";
      if (token === "ArrowKeys") return "Arrow keys";
      return token;
    });
    let current = [];
    for (const token of tokens) {
      if (modifierTokens.has(token)) {
        if (current.some((part) => !modifierTokens.has(part))) { groups.push(current); current = []; }
        current.push(token);
        continue;
      }
      if (current.some((part) => !modifierTokens.has(part))) { groups.push(current); current = []; }
      current.push(token);
      groups.push(current);
      current = [];
    }
    if (current.length) groups.push(current);
  }
  const filtered = groups.map((group) => group.filter(Boolean)).filter((group) => group.length);
  if (!filtered.length) return [];
  const baseTokens = filtered.flat().filter((token) => !modifierTokens.has(token));
  if (!baseTokens.length || baseTokens.some((token) => /Windows|⊞|\bWin\b/i.test(token))) return [];
  if (baseTokens.some((token) => /[\u3400-\u9fff]/.test(token) || token.length > 30)) return [];
  if (baseTokens.some((token) => /^(?:menu|toolbar|settings|click here)$/i.test(token))) return [];
  const output = [];
  for (const [index, group] of filtered.entries()) {
    if (index > 0 && (explicitSequence || filtered.length > 1)) output.push("→");
    output.push(...group);
  }
  return output.slice(0, 10);
}

function actionCell(table, cells) {
  const index = headerIndex(table.headers, actionHeaders);
  return index >= 0 ? cells[index] : "";
}

function englishCell(table, cells) {
  const englishIndex = table.headers.findIndex((header) => header === "English");
  if (englishIndex >= 0) return cleanCell(cells[englishIndex]).replace(/[.;:]$/, "");
  const commandIndex = table.headers.findIndex((header) => /命令 ID/.test(header));
  return commandIndex >= 0 ? cleanCell(cells[commandIndex]) : "";
}

function hintCell(table, cells) {
  const index = table.headers.findIndex((header) => /说明|作用|结果|用途/.test(header));
  return index >= 0 ? cleanCell(cells[index]) : "";
}

function buildPack(id, config) {
  const sourceFile = path.join(sourceRoot, config.file);
  if (!fs.existsSync(sourceFile)) throw new Error(`Missing source document: ${sourceFile}`);
  const tables = parseTables(sourceFile);
  const categories = new Map();
  const seen = new Set();
  let imported = 0;
  let skippedNoKey = 0;
  let skippedPlatform = 0;

  for (const table of tables) {
    if (!config.include(table)) { skippedPlatform += table.rows.length; continue; }
    const category = categoryFor(config, table);
    if (!category) { skippedPlatform += table.rows.length; continue; }
    const actionIndex = headerIndex(table.headers, actionHeaders);
    if (actionIndex < 0) { skippedNoKey += table.rows.length; continue; }
    for (const cells of table.rows) {
      const zh = normalizeTitle(actionCell(table, cells));
      if (!zh || /^(?:无|—|-|同上|步骤|方式|系统)$/.test(zh)) { skippedNoKey += 1; continue; }
      const raws = rawKeyCells(config, table, cells);
      if (!raws.length) { skippedPlatform += 1; continue; }
      let rowImported = false;
      for (const raw of raws) {
        for (const expression of alternativeExpressions(raw)) {
          const keys = normalizeKeyExpression(expression);
          if (!keys.length) continue;
          const sourceEnglish = englishCell(table, cells);
          const command = /\./.test(sourceEnglish) && !/\s/.test(sourceEnglish) ? sourceEnglish : "";
          const en = addedTranslations[zh] || (sourceEnglish && !/[\u3400-\u9fff]/.test(sourceEnglish) && !command
            ? sourceEnglish
            : translateAction(id, zh, category[1], hintCell(table, cells), command, imported + 1));
          const keySignature = keys.join("+").toLowerCase();
          const signatures = [
            `zh\0${normalizeTitle(zh).toLowerCase()}\0${keySignature}`,
            `en\0${normalizeTitle(en).toLowerCase()}\0${keySignature}`,
          ];
          if (signatures.some((signature) => seen.has(signature))) continue;
          for (const signature of signatures) seen.add(signature);
          imported += 1;
          rowImported = true;
          const localized = localizedKeys(keys);
          const key = headingKey(table[config.categorySource]);
          if (!categories.has(key)) categories.set(key, { id: `${id}-add-${slug(category[1])}`, zh: category[0], en: category[1], items: [] });
          categories.get(key).items.push({
            id: `${id}.add.${String(imported).padStart(4, "0")}.${slug(command || en).slice(0, 42)}`,
            keys,
            ...(JSON.stringify(localized.keysZh) !== JSON.stringify(keys) ? { keysZh: localized.keysZh } : {}),
            ...(JSON.stringify(localized.keysEn) !== JSON.stringify(keys) ? { keysEn: localized.keysEn } : {}),
            zh,
            en: normalizeTitle(en),
            tags: ["macOS", "default", "official-source-cross-checked", config.appVersion, table.h3 || table.h2 || table.h1],
          });
        }
      }
      if (!rowImported) skippedNoKey += 1;
    }
  }

  const categoryList = [...categories.values()].filter((category) => category.items.length);
  if (!categoryList.length) throw new Error(`${config.name} produced no macOS categories.`);
  const isCurated = config.output === "curated-shortcuts-mac.json";
  return {
    pack: {
      id, name: config.name, vendor: config.vendor, accent: config.accent, glyph: config.glyph, group: config.group,
      bundleIdentifiers: config.bundleIdentifiers,
      dataStatus: isCurated ? "curated" : "sourceBacked",
      categories: categoryList,
      provenance: {
        sourceURL: config.sourceURL,
        sourceTitle: `${config.file} (macOS sections and columns only; official sources cross-checked)`,
        appVersion: config.appVersion,
        verifiedAt,
        coverage: isCurated ? "curated-comprehensive-defaults" : "official-source-cross-checked-markdown",
        platform: "macOS",
      },
    },
    stats: { shortcuts: imported, categories: categoryList.length, skippedNoKey, skippedPlatform },
  };
}

function updateLibrary(fileName, replacements) {
  const file = path.join(dataRoot, fileName);
  const library = JSON.parse(fs.readFileSync(file, "utf8"));
  const byID = new Map(replacements.map((pack) => [pack.id, pack]));
  const replaced = new Set();
  library.software = library.software.map((pack) => {
    if (!byID.has(pack.id)) return pack;
    replaced.add(pack.id);
    return byID.get(pack.id);
  });
  for (const [id, pack] of byID) if (!replaced.has(id)) library.software.push(pack);
  fs.writeFileSync(file, `${JSON.stringify(library, null, 2)}\n`);
}

function packFromLibrary(fileName, id) {
  const library = JSON.parse(fs.readFileSync(path.join(dataRoot, fileName), "utf8"));
  return library.software.find((pack) => pack.id === id) || null;
}

function normalizedAction(value) {
  return normalizeTitle(value).toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]+/g, " ").trim();
}

function removeExactDuplicateShortcuts(categories) {
  const seen = new Set();
  let removed = 0;
  const deduplicated = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const signature = `${item.keys.join("+").toLowerCase()}\0${normalizedAction(item.en)}`;
        if (seen.has(signature)) {
          removed += 1;
          return false;
        }
        seen.add(signature);
        return true;
      }),
    }))
    .filter((category) => category.items.length);
  return { categories: deduplicated, removed };
}

function mergeWithExistingPack(base, supplement, config) {
  if (!base) return { pack: supplement, added: supplement.categories.reduce((sum, category) => sum + category.items.length, 0) };
  const cleanedBase = removeExactDuplicateShortcuts(base.categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => !item.id.startsWith(`${supplement.id}.add.`)),
    }))
    .filter((category) => category.items.length && !category.id.startsWith(`${supplement.id}-add-`)));
  const categories = cleanedBase.categories;
  const categoryIDs = new Set(categories.map((category) => category.id));
  const signatures = new Set();
  for (const category of categories) {
    for (const item of category.items) {
      const keys = item.keys.join("+").toLowerCase();
      signatures.add(`zh\0${normalizedAction(item.zh)}\0${keys}`);
      signatures.add(`en\0${normalizedAction(item.en)}\0${keys}`);
    }
  }
  let added = 0;
  for (const incomingCategory of supplement.categories) {
    const items = incomingCategory.items.filter((item) => {
      const keys = item.keys.join("+").toLowerCase();
      const itemSignatures = [
        `zh\0${normalizedAction(item.zh)}\0${keys}`,
        `en\0${normalizedAction(item.en)}\0${keys}`,
      ];
      if (itemSignatures.some((signature) => signatures.has(signature))) return false;
      for (const signature of itemSignatures) signatures.add(signature);
      added += 1;
      return true;
    });
    if (!items.length) continue;
    let categoryID = incomingCategory.id;
    let suffix = 2;
    while (categoryIDs.has(categoryID)) categoryID = `${incomingCategory.id}-${suffix++}`;
    categoryIDs.add(categoryID);
    categories.push({ ...incomingCategory, id: categoryID, items });
  }
  const pack = {
    ...base,
    name: config.name,
    vendor: config.vendor,
    accent: config.accent,
    glyph: config.glyph,
    group: config.group,
    bundleIdentifiers: config.bundleIdentifiers,
    dataStatus: "sourceBacked",
    categories,
    provenance: {
      sourceURL: config.sourceURL,
      sourceTitle: `${(base.provenance?.sourceTitle || "Official macOS shortcut source").split("; supplemented by ")[0]}; supplemented by ${config.file}`,
      appVersion: config.appVersion,
      verifiedAt,
      coverage: "official-source-cross-checked-markdown",
      platform: "macOS",
    },
  };
  if (supplement.id === "powerpoint") {
    const movementItems = pack.categories.flatMap((category) => category.items).filter(
      (item) => item.en === "Move to the start or end of all the text in the object you are editing."
    );
    for (const item of movementItems) {
      item.keys = item.id.includes("down-arrow") ? ["⌘", "↓"] : ["⌘", "↑"];
    }
  }
  return {
    added,
    removedExactDuplicates: cleanedBase.removed,
    pack,
  };
}

function removeSupersededSupplements(ids) {
  const file = path.join(dataRoot, "curated-supplements-mac.json");
  const library = JSON.parse(fs.readFileSync(file, "utf8"));
  const removed = new Set(ids);
  library.software = library.software.filter((pack) => !removed.has(pack.id));
  fs.writeFileSync(file, `${JSON.stringify(library, null, 2)}\n`);
}

function main() {
  const results = new Map();
  for (const [id, config] of Object.entries(configs)) {
    const result = buildPack(id, config);
    const apply = config.force || result.stats.shortcuts > config.currentCount;
    const merged = config.mode === "merge"
      ? mergeWithExistingPack(packFromLibrary(config.output, id), result.pack, config)
      : { pack: result.pack, added: result.stats.shortcuts - config.currentCount };
    results.set(id, { ...result, pack: merged.pack, added: merged.added, removedExactDuplicates: merged.removedExactDuplicates || 0, apply, previousShortcuts: config.currentCount, output: config.output, source: config.file });
    const decision = config.mode === "merge"
      ? `merge ${merged.added} additions into existing ${config.currentCount}`
      : apply ? "replace" : `retain existing ${config.currentCount}`;
    console.log(`${config.name}: ${result.stats.shortcuts} macOS shortcuts / ${result.stats.categories} categories; ${decision}`);
  }

  if (!dryRun) {
    for (const output of new Set(Object.values(configs).map((config) => config.output))) {
      const packs = [...results.entries()]
        .filter(([id, result]) => result.apply && configs[id].output === output)
        .map(([, result]) => result.pack);
      if (packs.length) updateLibrary(output, packs);
    }
    const supplementIDs = [...results.entries()].filter(([id, result]) => result.apply && configs[id].removeSupplements).map(([id]) => id);
    if (supplementIDs.length) removeSupersededSupplements(supplementIDs);
  }

  const report = {
    importedAt: verifiedAt,
    sourceDirectory: sourceRoot,
    dryRun,
    policy: {
      platform: "Only macOS columns, macOS-only chapters, and explicitly shared cross-platform defaults are eligible.",
      exclusions: "Windows, Linux, mobile, Web-only, compatibility notes, custom suggestions, troubleshooting tables, and unassigned commands are excluded.",
      replacement: "A high-coverage official pack is retained unless the new macOS-only candidate is more complete; low-coverage curated packs are replaced.",
    },
    software: [...results].map(([id, result]) => ({
      id, source: result.source, output: result.output, previousShortcuts: result.previousShortcuts,
      candidateShortcuts: result.stats.shortcuts, categories: result.stats.categories,
      addedShortcuts: result.added,
      removedExactDuplicates: result.removedExactDuplicates,
      skippedNoKey: result.stats.skippedNoKey, skippedPlatform: result.stats.skippedPlatform,
      decision: configs[id].mode === "merge" ? "merged-with-existing-official-pack" : result.apply ? "applied" : "retained-more-complete-existing-pack",
    })),
  };
  if (!dryRun) fs.writeFileSync(path.join(projectRoot, "MARKDOWN_SHORTCUT_ADD_IMPORT_REPORT.json"), `${JSON.stringify(report, null, 2)}\n`);
}

main();
