#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "KeyFloat");
const sourceRoot = process.argv[2] || "/Users/hualong/Downloads/快捷键md";
const verifiedAt = "2026-07-25";

const configs = {
  photoshop: {
    file: "Photoshop_快捷键大全_Windows_macOS.md",
    name: "Photoshop", vendor: "Adobe", accent: "#31A8FF", glyph: "Ps", group: "design",
    bundleIdentifiers: ["com.adobe.Photoshop"], output: "supplemental-shortcuts-mac.json",
    sourceURL: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/default-keyboard-shortcuts/photoshop-keyboard-shortcuts.pdf",
    appVersion: "Photoshop desktop (sources checked 2026-07-25)",
    includeMajor: (major) => major >= 1 && major <= 19,
    categories: {
      1: ["文件、编辑与常用命令", "Files, Edit & Common Commands"],
      2: ["工具", "Tools"], 3: ["视图、画布与窗口", "View, Canvas & Windows"],
      4: ["选区", "Selections"], 5: ["变换、裁剪与参考线", "Transform, Crop & Guides"],
      6: ["图层", "Layers"], 7: ["蒙版与通道", "Masks & Channels"],
      8: ["画笔与绘制", "Brushes & Painting"], 9: ["混合模式", "Blend Modes"],
      10: ["文字", "Type"], 11: ["路径、钢笔与形状", "Paths, Pen & Shapes"],
      12: ["调整与曲线", "Adjustments & Curves"], 13: ["选择并遮住", "Select and Mask"],
      14: ["液化", "Liquify"], 15: ["消失点", "Vanishing Point"],
      16: ["滤镜库", "Filter Gallery"], 17: ["面板与功能键", "Panels & Function Keys"],
      18: ["Camera Raw", "Camera Raw"], 19: ["专用工作区与旧版插件", "Specialized Workspaces & Legacy Plug-ins"],
    },
  },
  illustrator: {
    file: "Illustrator_快捷键大全_Windows_macOS.md",
    name: "Illustrator", vendor: "Adobe", accent: "#FF9A00", glyph: "Ai", group: "design",
    bundleIdentifiers: ["com.adobe.illustrator"], output: "supplemental-shortcuts-mac.json",
    sourceURL: "https://helpx.adobe.com/illustrator/using/default-keyboard-shortcuts.html",
    appVersion: "Illustrator desktop (sources checked 2026-07-25)",
    includeMajor: (major) => major >= 1 && major <= 20,
    categories: {
      1: ["常用、编辑与剪贴板", "Common, Edit & Clipboard"],
      2: ["文档、导出与打印", "Documents, Export & Print"], 3: ["工具", "Tools"],
      4: ["视图与导航", "View & Navigation"], 5: ["画板", "Artboards"],
      6: ["选择与对象", "Selection & Objects"], 7: ["绘制", "Drawing"],
      8: ["路径与锚点", "Paths & Anchors"], 9: ["变换与对象效果", "Transform & Object Effects"],
      10: ["填色、描边与颜色", "Fill, Stroke & Color"], 11: ["实时上色", "Live Paint"],
      12: ["可变宽度描边", "Variable Width Strokes"], 13: ["透视网格", "Perspective Grid"],
      14: ["文字", "Type"], 15: ["字号与字距", "Type Metrics"],
      16: ["特殊字符与空格", "Special Characters & Spaces"], 17: ["通用面板操作", "Panel Operations"],
      18: ["面板专用操作", "Panel-Specific Commands"], 19: ["图层、渐变与外观", "Layers, Gradients & Appearance"],
      20: ["功能键与面板开关", "Function Keys & Panel Toggles"],
    },
  },
  autocad: {
    file: "AutoCAD_2026_快捷键大全_Windows_macOS.md",
    name: "AutoCAD", vendor: "Autodesk", accent: "#E51050", glyph: "A", group: "architecture",
    bundleIdentifiers: ["com.autodesk.autocad"], output: "curated-shortcuts-mac.json",
    sourceURL: "https://www.autodesk.com/asean/shortcuts/autocad-for-mac",
    appVersion: "AutoCAD 2026 for Mac",
    includeMajor: (major) => major === 2 || (major >= 5 && major <= 18),
    commandConfirmation: true,
    categories: {
      2: ["一键命令别名", "One-Key Command Aliases"], 5: ["macOS 快捷键", "macOS Keyboard Shortcuts"],
      6: ["临时替代键", "Temporary Override Keys"], 7: ["A–Z 命令别名", "A–Z Command Aliases"],
      8: ["macOS 专属命令别名", "macOS-Specific Command Aliases"], 9: ["对象捕捉与点过滤", "Object Snaps & Point Filters"],
      10: ["选择快捷输入", "Selection Inputs"], 11: ["坐标与精确输入", "Coordinates & Precision Input"],
      12: ["鼠标与视图导航", "Mouse & View Navigation"], 13: ["夹点与上下文按键", "Grips & Context Keys"],
      14: ["命令行与文字输入", "Command Line & Text Input"], 15: ["多行文字编辑器", "Multiline Text Editor"],
      16: ["标注命令", "Dimension Commands"], 17: ["图层、块与参照", "Layers, Blocks & References"],
      18: ["三维建模与视图", "3D Modeling & Views"],
    },
  },
  sketchup: {
    file: "SketchUp_2026_快捷键大全_Windows_macOS.md",
    name: "SketchUp", vendor: "Trimble", accent: "#005F9E", glyph: "S", group: "architecture",
    bundleIdentifiers: ["com.sketchup.SketchUp.2026", "com.sketchup.SketchUp"], output: "curated-shortcuts-mac.json",
    sourceURL: "https://help.sketchup.com/en/default-keyboard-shortcuts",
    appVersion: "SketchUp 2026 for macOS",
    includeMajor: (major, table) => (major === 2 && /^2\.3\b/.test(table.h3)) || (major >= 3 && major <= 21),
    categories: {
      2: ["测量框与输入", "Measurements & Input"], 3: ["默认工具", "Default Tools"],
      4: ["文件与编辑", "Files & Editing"], 5: ["导航", "Navigation"],
      6: ["推断与轴向锁定", "Inference & Axis Locks"], 7: ["选择", "Selection"],
      8: ["直线与手绘", "Lines & Freehand"], 9: ["矩形", "Rectangles"],
      10: ["圆与多边形", "Circles & Polygons"], 11: ["圆弧", "Arcs"],
      12: ["移动与阵列", "Move & Arrays"], 13: ["旋转与翻转", "Rotate & Flip"],
      14: ["缩放", "Scale"], 15: ["推拉、偏移与路径跟随", "Push/Pull, Offset & Follow Me"],
      16: ["橡皮擦与可见性", "Eraser & Visibility"], 17: ["材质、标签与分类", "Materials, Tags & Classification"],
      18: ["测量与精确输入", "Measurement & Precision"], 19: ["视图与相机", "Views & Camera"],
      20: ["群组与组件", "Groups & Components"], 21: ["其他桌面工具与命令", "Other Desktop Tools & Commands"],
    },
  },
  blender: {
    file: "Blender_5.2_LTS_快捷键大全_Windows_macOS.md",
    name: "Blender", vendor: "Blender Foundation", accent: "#E87D0D", glyph: "B", group: "modeling",
    bundleIdentifiers: ["org.blenderfoundation.blender"], output: "curated-shortcuts-mac.json",
    sourceURL: "https://docs.blender.org/manual/en/latest/interface/keymap/blender_default.html",
    appVersion: "Blender 5.2 LTS default keymap",
    includeMajor: (major) => major >= 2 && major <= 26,
    categories: {
      2: ["模态输入与约束", "Modal Input & Constraints"], 3: ["文件与窗口", "Files & Windows"],
      4: ["界面与编辑器", "Interface & Editors"], 5: ["选择与剪贴板", "Selection & Clipboard"],
      6: ["变换", "Transform"], 7: ["视图与导航", "View & Navigation"],
      8: ["对象模式", "Object Mode"], 9: ["网格选择", "Mesh Selection"],
      10: ["网格编辑", "Mesh Editing"], 11: ["曲线、文字与其他对象", "Curves, Text & Other Object Types"],
      12: ["骨架与姿态", "Armatures & Pose"], 13: ["雕刻", "Sculpting"],
      14: ["绘制模式", "Paint Modes"], 15: ["Grease Pencil", "Grease Pencil"],
      16: ["UV 与图像编辑器", "UV & Image Editor"], 17: ["节点", "Nodes"],
      18: ["时间线与摄影表", "Timeline & Dope Sheet"], 19: ["曲线与 NLA 编辑器", "Graph & NLA Editors"],
      20: ["大纲、属性与资产浏览器", "Outliner, Properties & Asset Browser"],
      21: ["渲染与视口着色", "Rendering & Viewport Shading"], 22: ["视频序列编辑器", "Video Sequencer"],
      23: ["影片剪辑与遮罩", "Movie Clip & Masking"], 24: ["文本编辑器、控制台与信息", "Text Editor, Console & Info"],
      25: ["电子表格、几何节点与驱动", "Spreadsheet, Geometry Nodes & Drivers"],
      26: ["仿真与物理", "Simulation & Physics"],
    },
  },
};

function splitMarkdownRow(line) {
  const cells = [];
  let value = "";
  let escaped = false;
  for (let index = 1; index < line.length - 1; index += 1) {
    const char = line[index];
    if (escaped) { value += char; escaped = false; continue; }
    if (char === "\\") { escaped = true; value += char; continue; }
    if (char === "|") { cells.push(value.trim()); value = ""; }
    else value += char;
  }
  cells.push(value.trim());
  return cells;
}

function cleanCell(value) {
  return String(value || "")
    .replace(/<br\s*\/?\s*>/gi, " / ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\\\|/g, "|")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTables(file) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  let h1 = "", h2 = "", h3 = "", h4 = "";
  const tables = [];
  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,4})\s+(.+)/);
    if (heading) {
      const title = cleanCell(heading[2]);
      if (heading[1].length === 1) { h1 = title; h2 = ""; h3 = ""; h4 = ""; }
      else if (heading[1].length === 2) { h2 = title; h3 = ""; h4 = ""; }
      else if (heading[1].length === 3) { h3 = title; h4 = ""; }
      else h4 = title;
    }
    if (!lines[index].startsWith("|") || !/^\|\s*:?-+/.test(lines[index + 1] || "")) continue;
    const headers = splitMarkdownRow(lines[index]).map(cleanCell);
    const rows = [];
    let rowIndex = index + 2;
    while (rowIndex < lines.length && lines[rowIndex].startsWith("|")) {
      const cells = splitMarkdownRow(lines[rowIndex]);
      if (cells.length === headers.length) rows.push(cells);
      rowIndex += 1;
    }
    tables.push({ h1, h2, h3, h4, headers, rows, line: index + 1 });
    index = rowIndex - 1;
  }
  return tables;
}

function majorFor(table) {
  for (const heading of [table.h3, table.h2]) {
    const match = heading.match(/^(\d+)(?:\.|\b)/);
    if (match) return Number(match[1]);
  }
  return null;
}

function normalizeTitle(value) {
  return cleanCell(value)
    .replace(/[。；;：:]$/g, "")
    .replace(/\s*[（(][^）)]*(?:Windows|macOS|说明|默认|依版本)[^）)]*[）)]\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildExistingTranslations() {
  const bySoftware = new Map();
  const candidates = new Map();
  for (const name of fs.readdirSync(dataRoot).filter((entry) => entry.endsWith("shortcuts-mac.json"))) {
    const library = JSON.parse(fs.readFileSync(path.join(dataRoot, name), "utf8"));
    for (const pack of library.software || []) {
      if (!bySoftware.has(pack.id)) bySoftware.set(pack.id, new Map());
      for (const category of pack.categories || []) {
        for (const item of category.items || []) {
          const title = normalizeTitle(item.zh);
          bySoftware.get(pack.id).set(title, item.en);
          if (!candidates.has(title)) candidates.set(title, new Set());
          candidates.get(title).add(item.en);
        }
      }
    }
  }
  const unambiguous = new Map();
  for (const [title, values] of candidates) if (values.size === 1) unambiguous.set(title, [...values][0]);
  return { bySoftware, unambiguous };
}

const existingTranslations = buildExistingTranslations();

const phraseTranslations = new Map(Object.entries({
  "关闭除当前以外的文档": "Close all documents except the current one",
  "隐藏/显示除工具和控制栏外的面板": "Hide or show all panels except Tools and Control",
  "隐藏/显示全部面板": "Hide or show all panels",
  "切换标准/快速蒙版模式": "Toggle Standard and Quick Mask modes",
  "前景色/背景色互换": "Swap foreground and background colors",
  "默认前景色/背景色": "Default foreground and background colors",
  "存储为 Web 所用格式（旧版）": "Save for Web (Legacy)",
  "再次变换并复制": "Transform again and duplicate",
  "再次变换": "Transform again",
  "后退一步": "Step backward",
  "前进一步": "Step forward",
  "原位粘贴": "Paste in place",
  "粘贴到前面": "Paste in front",
  "粘贴到后面": "Paste in back",
  "粘贴到所有画板": "Paste on all artboards",
  "合并拷贝": "Copy merged",
  "选择并遮住": "Select and Mask",
  "取消当前模态操作": "Cancel the current modal operation",
  "确认当前模态操作": "Confirm the current modal operation",
  "切换对象捕捉追踪": "Toggle Object Snap Tracking",
  "切换二维对象捕捉": "Toggle 2D Object Snap",
  "切换三维对象捕捉": "Toggle 3D Object Snap",
  "切换动态输入": "Toggle Dynamic Input",
  "切换正交模式": "Toggle Ortho Mode",
  "切换极轴追踪": "Toggle Polar Tracking",
  "切换栅格显示": "Toggle grid display",
  "循环切换等轴测平面": "Cycle isometric planes",
  "调整上次操作": "Adjust Last Operation",
  "重复上一次操作": "Repeat last action",
  "全部取消选择": "Deselect all",
  "选择全部": "Select all",
  "反转选择": "Invert selection",
  "框选": "Box select",
  "圈选": "Circle select",
  "套索选择": "Lasso select",
  "全选": "Select all",
  "反选": "Invert selection",
  "取消选择": "Deselect",
  "新建文档": "New document",
  "新建文件": "New file",
  "新建模型": "New model",
  "打开文档": "Open document",
  "打开文件": "Open file",
  "打开": "Open",
  "关闭当前文档": "Close current document",
  "关闭窗口": "Close window",
  "关闭": "Close",
  "保存副本": "Save a copy",
  "另存为": "Save as",
  "保存": "Save",
  "打印": "Print",
  "退出应用": "Quit application",
  "撤销": "Undo",
  "重做": "Redo",
  "剪切": "Cut",
  "复制": "Copy",
  "粘贴": "Paste",
  "删除": "Delete",
  "清除": "Clear",
  "确认": "Confirm",
  "取消": "Cancel",
  "搜索": "Search",
  "首选项": "Preferences",
  "自由变换": "Free Transform",
  "图像大小": "Image Size",
  "画布大小": "Canvas Size",
  "放大": "Zoom in",
  "缩小": "Zoom out",
  "适合屏幕": "Fit on screen",
  "实际像素": "Actual pixels",
  "显示全部": "Show all",
  "隐藏所选": "Hide selected",
  "隐藏未选": "Hide unselected",
  "显示所选": "Show selected",
  "创建组件": "Make component",
  "创建群组": "Make group",
  "进入编辑模式": "Enter Edit Mode",
  "退出编辑模式": "Exit Edit Mode",
  "对象模式": "Object Mode",
  "编辑模式": "Edit Mode",
  "姿态模式": "Pose Mode",
  "插入关键帧": "Insert keyframe",
  "删除关键帧": "Delete keyframe",
  "播放/暂停": "Play or pause",
  "播放": "Play",
  "暂停": "Pause",
  "渲染图像": "Render image",
  "渲染动画": "Render animation",
  "移动": "Move",
  "旋转": "Rotate",
  "缩放": "Scale",
  "挤出": "Extrude",
  "内插": "Inset",
  "倒角": "Bevel",
  "环切": "Loop cut",
  "细分": "Subdivide",
  "合并": "Merge",
  "分离": "Separate",
  "填充": "Fill",
  "连接": "Connect",
  "断开": "Disconnect",
  "应用": "Apply",
  "重置": "Reset",
  "恢复": "Restore",
  "启用": "Enable",
  "禁用": "Disable",
  "切换": "Toggle",
  "显示": "Show",
  "隐藏": "Hide",
  "选择": "Select",
  "添加": "Add",
  "创建": "Create",
  "移除": "Remove",
  "设置": "Set",
  "锁定": "Lock",
  "解锁": "Unlock",
  "对齐": "Align",
  "增加": "Increase",
  "减小": "Decrease",
}));

const tokenTranslations = new Map(Object.entries({
  "当前": "current", "全部": "all", "所选": "selected", "未选": "unselected", "上一个": "previous", "下一个": "next",
  "第一个": "first", "最后一个": "last", "向前": "forward", "向后": "backward", "向上": "up", "向下": "down",
  "左": "left", "右": "right", "顶部": "top", "底部": "bottom", "中心": "center", "中央": "center",
  "水平": "horizontal", "垂直": "vertical", "局部": "local", "全局": "global", "临时": "temporary",
  "工具": "tool", "模式": "mode", "面板": "panel", "窗口": "window", "菜单": "menu", "命令": "command",
  "文件": "file", "文档": "document", "对象": "object", "元素": "element", "图层": "layer", "画板": "artboard",
  "画布": "canvas", "图像": "image", "视图": "view", "相机": "camera", "场景": "scene", "工作区": "workspace",
  "路径": "path", "锚点": "anchor point", "控制点": "control point", "节点": "node", "连线": "link", "边": "edge",
  "面": "face", "顶点": "vertex", "网格": "mesh", "曲线": "curve", "曲面": "surface", "骨骼": "bone", "骨架": "armature",
  "关键帧": "keyframe", "帧": "frame", "时间线": "timeline", "标记": "marker", "通道": "channel", "条带": "strip",
  "选区": "selection", "蒙版": "mask", "矢量蒙版": "vector mask", "快速蒙版": "Quick Mask", "剪贴蒙版": "clipping mask",
  "画笔": "brush", "笔刷": "brush", "描边": "stroke", "填色": "fill", "前景色": "foreground color", "背景色": "background color",
  "颜色": "color", "渐变": "gradient", "透明度": "opacity", "不透明度": "opacity", "流量": "flow", "硬度": "hardness",
  "大小": "size", "宽度": "width", "高度": "height", "角度": "angle", "半径": "radius", "距离": "distance",
  "文字": "type", "文本": "text", "字符": "character", "段落": "paragraph", "字号": "font size", "行距": "leading", "字距": "tracking",
  "参考线": "guide", "标尺": "ruler", "栅格": "grid", "捕捉": "snap", "推断": "inference", "轴": "axis", "平面": "plane",
  "正交": "orthographic", "透视": "perspective", "渲染": "render", "预览": "preview", "导航": "navigation", "播放": "playback",
  "材质": "material", "纹理": "texture", "贴图": "mapping", "着色": "shading", "叠加层": "overlays", "线框": "wireframe",
  "群组": "group", "组件": "component", "集合": "collection", "父级": "parent", "子级": "child", "原点": "origin",
  "法线": "normal", "接缝": "seam", "比例编辑": "proportional editing", "枢轴": "pivot", "游标": "cursor",
  "圆": "circle", "圆弧": "arc", "矩形": "rectangle", "多边形": "polygon", "直线": "line", "多段线": "polyline",
  "偏移": "offset", "阵列": "array", "镜像": "mirror", "翻转": "flip", "推拉": "Push/Pull", "路径跟随": "Follow Me",
  "图块": "tile", "标签": "tag", "分类器": "classifier", "吸附点": "snap point", "后边线": "back edges",
  "撤销": "undo", "重做": "redo", "重复": "repeat", "切换": "toggle", "循环": "cycle", "确认": "confirm", "取消": "cancel",
  "选择": "select", "取消选择": "deselect", "添加": "add", "删除": "delete", "移动": "move", "旋转": "rotate", "缩放": "scale",
  "创建": "create", "新建": "new", "打开": "open", "关闭": "close", "保存": "save", "复制": "duplicate", "剪切": "cut", "粘贴": "paste",
  "插入": "insert", "移除": "remove", "清除": "clear", "应用": "apply", "设置": "set", "重置": "reset", "恢复": "restore",
  "锁定": "lock", "解锁": "unlock", "对齐": "align", "连接": "connect", "断开": "disconnect", "合并": "merge", "分离": "separate",
  "挤出": "extrude", "内插": "inset", "倒角": "bevel", "细分": "subdivide", "填充": "fill", "拆分": "split", "裁剪": "crop",
  "启用": "enable", "禁用": "disable", "增加": "increase", "减小": "decrease", "最大化": "maximize", "最小化": "minimize",
}));

function englishHint(value) {
  const cleaned = cleanCell(value);
  if (!cleaned || /[\u3400-\u9fff]/.test(cleaned)) {
    const matches = [...cleaned.matchAll(/[（(]([A-Za-z][A-Za-z0-9 /&+.-]{1,50})[）)]/g)];
    return matches.at(-1)?.[1]?.trim() || "";
  }
  return /[A-Za-z]/.test(cleaned) ? cleaned.replace(/[.;:]$/, "").trim() : "";
}

function translateAction(softwareID, zh, categoryEn, hint, command, index) {
  const normalized = normalizeTitle(zh);
  const softwareTranslations = existingTranslations.bySoftware.get(softwareID);
  if (softwareTranslations?.has(normalized)) return softwareTranslations.get(normalized);
  if (existingTranslations.unambiguous.has(normalized)) return existingTranslations.unambiguous.get(normalized);
  if (phraseTranslations.has(normalized)) return phraseTranslations.get(normalized);
  const parenthetical = englishHint(normalized);
  if (parenthetical) return parenthetical;
  if (command && /^[A-Za-z0-9_+.-]{2,30}$/.test(command)) {
    return command.replace(/^[-_.]+/, "").replace(/_/g, " ");
  }
  const hintText = englishHint(hint);
  if (hintText && hintText.length <= 72) return hintText;

  let translated = normalized;
  for (const [source, target] of [...phraseTranslations, ...tokenTranslations].sort((a, b) => b[0].length - a[0].length)) {
    translated = translated.split(source).join(` ${target} `);
  }
  translated = translated
    .replace(/[（）()【】\[\]“”"'，、；：。]/g, " ")
    .replace(/[\u3400-\u9fff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (translated.length >= 3 && /[A-Za-z]/.test(translated)) {
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  }
  return `${categoryEn} shortcut ${String(index).padStart(3, "0")}`;
}

const actionHeaders = [
  "中文功能 / 差异", "中文功能", "混合模式 / 功能", "命令行功能", "工具 / 命令", "工具 / 操作", "工具 / 功能",
  "Pattern Maker 功能", "Extract 功能", "通用功能", "功能", "含义", "结果", "作用", "工具", "工具组", "方法", "操作",
  "视图命令", "命令", "菜单", "目标", "场景", "当前工具", "图层", "面板", "类型", "输入形式", "输入方式",
];

const keyHeaders = [
  "macOS", "Windows / macOS", "鼠标 / 键盘", "按键 / 鼠标", "按键 / 输入", "按键序列", "快捷键",
  "临时替代键", "桌面版 2026 默认键", "默认键", "按键", "输入示例", "示例", "输入形式", "输入", "别名 / 命令",
  "macOS 别名", "别名", "可输入内容", "反向视图", "快捷操作", "操作",
];

function headerIndex(headers, candidates) {
  for (const candidate of candidates) {
    const exact = headers.findIndex((header) => header === candidate);
    if (exact >= 0) return exact;
  }
  return -1;
}

function resolveKeyCell(table, cells, config) {
  const macIndex = table.headers.findIndex((header) => header === "macOS");
  if (macIndex >= 0) {
    let raw = cells[macIndex];
    if (/^\s*(同左|同 Windows|相同)\s*$/.test(cleanCell(raw))) {
      const windowsIndex = table.headers.findIndex((header) => /^Windows(?:\b|$)/.test(header));
      if (windowsIndex >= 0) raw = cells[windowsIndex];
    }
    return raw;
  }
  const commonIndex = table.headers.findIndex((header) => /Windows\s*\/\s*macOS/.test(header));
  if (commonIndex >= 0) return cells[commonIndex];
  const index = headerIndex(table.headers, keyHeaders);
  if (index >= 0) return cells[index];

  if (config.commandConfirmation) {
    const aliasIndex = table.headers.findIndex((header) => /^(别名|macOS 别名|输入)$/.test(header));
    if (aliasIndex >= 0) return cells[aliasIndex];
  }
  return "";
}

function extractKeyExpression(raw) {
  const prepared = String(raw || "")
    .replace(/`([^`]+)\+``\s*`/g, "`$1+Grave`")
    .replace(/``\s*`\s*``/g, "`Grave`");
  const matches = [...prepared.matchAll(/`([^`]*)`/g)];
  if (!matches.length) return cleanCell(prepared);
  let expression = cleanCell(matches[0][1]);
  for (let index = 1; index < matches.length; index += 1) {
    const between = prepared.slice(matches[index - 1].index + matches[index - 1][0].length, matches[index].index);
    const connector = /(?:或|\/)/.test(between) ? " / " : /(?:→|后|再按)/.test(between) ? " SEQUENCE " : " + ";
    expression += connector + cleanCell(matches[index][1]);
  }
  return expression;
}

function looksLikeShortcut(raw) {
  const value = extractKeyExpression(raw);
  if (!value || /^(?:无|—|-|不适用|默认无|同上|视情况|菜单|工具栏|属性|状态栏)/.test(value)) return false;
  if (value.includes(">")) return false;
  if (/(?:可在|使用|通过|建议|搜索命令|首选项|工具栏|右上角|上下文菜单|默认无)/.test(value) && !/`/.test(raw)) return false;
  return /`[^`]+`|(?:Command|Cmd|Option|Opt|Control|Ctrl|Alt|Shift|Return|Enter|Space|Esc|Tab|Delete|Backspace|Home|End|Page|F\d|Numpad|LMB|MMB|RMB|Wheel|鼠标|滚轮|方向键|单击|双击|三击|四击|五击|拖动|按住|[⌘⌥⌃⇧←→↑↓]|^[A-Za-z0-9+\\/\[\]{}.,'"`~*-]{1,24}$)/i.test(raw);
}

function splitAlternatives(value) {
  const prepared = String(value || "").replace(/<br\s*\/?\s*>/gi, " ALT_BREAK ");
  const cleaned = extractKeyExpression(prepared)
    .replace(/\s+或\s+/g, " ALT_BREAK ")
    .replace(/\s*；\s*/g, " ALT_BREAK ");
  return cleaned.split(/\s+ALT_BREAK\s+/).map((part) => part.trim()).filter(Boolean);
}

const keyLabelMap = new Map(Object.entries({
  "Command": "⌘", "Cmd": "⌘", "⌘": "⌘", "Option": "⌥", "Opt": "⌥", "Alt": "⌥", "⌥": "⌥",
  "Control": "⌃", "Ctrl": "⌃", "⌃": "⌃", "Shift": "⇧", "⇧": "⇧", "Spacebar": "Space", "空格": "Space",
  "Enter": "Return", "回车": "Return", "Esc": "Esc", "Escape": "Esc", "Delete": "Delete", "Backspace": "Delete",
  "Left": "←", "Right": "→", "Up": "↑", "Down": "↓", "左箭头": "←", "右箭头": "→", "上箭头": "↑", "下箭头": "↓",
  "方向键": "Arrow keys", "鼠标左键": "LMB", "鼠标中键": "MMB", "鼠标右键": "RMB", "左键": "LMB", "中键": "MMB", "右键": "RMB",
  "滚轮向上": "Wheel Up", "滚轮向下": "Wheel Down", "滚轮": "Wheel", "单击": "Click", "双击": "Double click", "拖动": "Drag",
  "三击": "Triple click", "四击": "Quadruple click", "五击": "Quintuple click",
}));

function normalizeKeyToken(token) {
  let value = cleanCell(token)
    .replace(/^按住\s*/, "Hold ")
    .replace(/^点按\s*/, "")
    .replace(/\s*[（(][^）)]*[）)]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const [source, target] of keyLabelMap) {
    value = value.replace(new RegExp(`(^|\\s)${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`, "gi"), `$1${target}`);
  }
  value = value
    .replace(/^Fn\s*\+?\s*/i, "Fn+")
    .replace(/^(?:then|再按|后按|后输入)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (["⌘", "⌥", "⌃", "⇧", "←", "→", "↑", "↓"].includes(value)) return value;
  return value.slice(0, 30);
}

function parseKeySequence(value) {
  let cleaned = cleanCell(value)
    .replace(/(?<=[A-Za-z0-9])\s*→\s*(?=[A-Za-z0-9])/g, " SEQUENCE ")
    .replace(/\s+SEQUENCE\s+/g, " + → + ")
    .replace(/\s*后(?:输入|按)?\s*/g, " + → + ")
    .replace(/\s*\+\s*/g, " + ")
    .replace(/\b(?:macOS|Windows)\b\s*/gi, "")
    .trim();
  if (cleaned === "+") return ["+"];
  cleaned = cleaned.replace(/(\S)\s*\+\s*\+\s*$/g, "$1 + PLUS_KEY");
  const tokens = cleaned.split(/\s+\+\s+/).map(normalizeKeyToken).filter(Boolean)
    .map((token) => token === "PLUS_KEY" ? "+" : token);
  if (!tokens.length) return [];
  return tokens.slice(0, 8);
}

const keyPhraseTranslations = new Map(Object.entries({
  "先选路径": "Select path first", "启动工具": "start the tool", "单击截面": "click the profile",
  "圆心": "center", "起点": "start point", "终点": "end point", "参考点": "reference point", "参考面": "reference face",
  "对应工具键": "corresponding tool key", "工具键": "tool key", "工具": "tool", "旋转": "rotate", "选择": "select",
  "创建平面工具": "Create Plane tool", "边缘高光器": "Edge Highlighter", "填充工具": "Fill tool", "吸管工具": "Eyedropper tool",
  "添加图层蒙版": "Add Layer Mask", "图层蒙版按钮": "Layer Mask button", "矢量蒙版缩览图": "vector mask thumbnail",
  "蒙版缩览图": "mask thumbnail", "图层缩览图": "layer thumbnail", "路径缩览图": "path thumbnail", "通道缩览图": "channel thumbnail",
  "已禁用蒙版缩略图": "disabled mask thumbnail", "蒙版缩略图": "mask thumbnail", "缩览图": "thumbnail",
  "新建子图层": "New Sublayer", "新建图层": "New Layer", "新建通道": "New Channel", "新建路径": "New Path",
  "新建动作": "New Action", "新建色板": "New Swatch", "新建组": "New Group", "新建": "New",
  "播放当前所选": "Play Current Selection", "播放按钮": "Play button", "删除": "Delete", "动作/命令": "action or command",
  "已记录命令": "recorded command", "图层名称": "layer name", "滤镜名称": "filter name", "滤镜旁混合选项图标": "Blending Options icon next to filter",
  "文件夹图标": "folder icon", "工具图标": "tool icon", "眼睛图标": "eye icon", "展开三角": "disclosure triangle",
  "三角形": "triangle", "三角图标": "triangle icon", "三角": "triangle", "图钉": "pin", "眼睛": "eye",
  "两图层分界线": "boundary between two layers", "图层或效果": "layer or effect", "效果": "effect", "滤镜": "filter",
  "图层": "layer", "蒙版": "mask", "路径": "path", "通道": "channel", "色板": "swatch", "色条": "color bar",
  "渐变填色框": "gradient fill box", "渐变按钮": "Gradient button", "渐变终点": "gradient endpoint", "色标": "color stop",
  "宽度点": "width point", "控制点": "control point", "角控制点": "corner handle", "边控制点": "side handle",
  "端点": "endpoint", "点": "point", "平面": "plane", "网格": "grid", "画布": "canvas", "图像": "image",
  "区域": "area", "项目": "item", "标题": "title", "列标题": "column header", "句柄": "handle", "中部": "center area",
  "滑块": "slider", "黑/白场滑块": "black or white point slider", "参考线": "guide", "画笔": "brush",
  "选择标记": "selection marker", "另一色板": "another swatch", "另一色标": "another color stop", "编辑器": "editor",
  "另一个面": "another face", "另一面": "another face", "对象": "object", "截面": "profile", "路径": "path",
  "复制模式": "copy mode", "长度": "length", "宽度": "width", "角度": "angle", "数值": "value",
  "数字键": "number key", "数字": "number", "松开": "release", "绘制": "draw", "移动到": "move to",
  "单击": "Click", "双击": "Double-click", "三击": "Triple-click", "四击": "Quadruple-click", "五击": "Quintuple-click",
  "拖动": "drag", "按住": "Hold", "滚动": "Scroll", "滚轮": "wheel", "鼠标中键": "MMB", "鼠标左键": "LMB",
  "鼠标右键": "RMB", "中键": "MMB", "左键": "LMB", "右键": "RMB", "空白区": "empty area",
  "命令名": "command name", "输入": "Input", "搜索": "Search", "切换": "Toggle", "沿路径": "along path",
}));

function translateKeyToEnglish(key) {
  let value = key;
  for (const [source, target] of [...keyPhraseTranslations].sort((a, b) => b[0].length - a[0].length)) {
    value = value.split(source).join(` ${target} `);
  }
  value = value
    .replace(/[“”]/g, "")
    .replace(/[\u3400-\u9fff]+/g, " ")
    .replace(/\s*([,→/])\s*/g, " $1 ")
    .replace(/\s+/g, " ")
    .trim();
  return (value || "Pointer interaction").slice(0, 30);
}

function localizedKeys(keys) {
  const zhMap = { "Hold": "按住", "Click": "单击", "Double click": "双击", "Drag": "拖动", "Arrow keys": "方向键", "Wheel": "滚轮", "Wheel Up": "滚轮向上", "Wheel Down": "滚轮向下" };
  const enMap = { "按住": "Hold", "单击": "Click", "双击": "Double click", "拖动": "Drag", "方向键": "Arrow keys", "滚轮": "Wheel", "滚轮向上": "Wheel Up", "滚轮向下": "Wheel Down" };
  const keysZh = keys.map((key) => zhMap[key] || key);
  const keysEn = keys.map((key) => translateKeyToEnglish(enMap[key] || key));
  return { keysZh, keysEn };
}

function commandCell(table, cells) {
  const index = table.headers.findIndex((header) => /完整命令|英文/.test(header));
  return index >= 0 ? cleanCell(cells[index]) : "";
}

function hintCell(table, cells) {
  const index = table.headers.findIndex((header) => /说明|作用|结果|用途|访问方式/.test(header));
  return index >= 0 ? cleanCell(cells[index]) : "";
}

function shouldAppendCommandConfirmation(config, table) {
  if (!config.commandConfirmation) return false;
  return table.headers.some((header) => /别名|完整命令/.test(header)) ||
    /^8\.|^9\.|^16\.|^17\.|^18\./.test(table.h2);
}

function slug(value) {
  const latin = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return latin || "shortcut";
}

function applyRequiredIllustratorShortcuts(pack) {
  const items = pack.categories.flatMap((category) => category.items);
  const setRequired = (id, zhPattern, keys, en) => {
    const item = items.find((candidate) => zhPattern.test(candidate.zh));
    if (!item) throw new Error(`Illustrator source is missing required shortcut ${id}.`);
    item.id = id;
    item.keys = keys;
    if (en) item.en = en;
  };
  setRequired("ai.line", /^直线段工具/, ["\\"]);
  setRequired("ai.front", /^移到最前/, ["⌘", "⇧", "]"], "Bring to Front");
  setRequired("ai.back", /^移到最后/, ["⌘", "⇧", "["], "Send to Back");
  setRequired("ai.zoom-in", /^放大$/, ["⌘", "="], "Zoom In");
  setRequired("ai.zoom-out", /^缩小$/, ["⌘", "-"], "Zoom Out");
  setRequired("ai.export", /^导出为屏幕所用格式/, ["⌥", "⌘", "E"], "Export for Screens");
  const saveForWeb = items.find((item) => /^存储为 Web 所用格式/.test(item.zh));
  if (!saveForWeb) throw new Error("Illustrator source is missing Save for Web (Legacy).");
  saveForWeb.keys = ["⌥", "⇧", "⌘", "S"];
  saveForWeb.en = "Open the Save For Web dialog box";
}

function buildPack(id, config) {
  const file = path.join(sourceRoot, config.file);
  if (!fs.existsSync(file)) throw new Error(`Missing source document: ${file}`);
  const tables = parseTables(file);
  const categoryItems = new Map();
  const seen = new Set();
  let itemIndex = 0;
  let skippedNoKey = 0;
  let skippedPlatform = 0;

  for (const table of tables) {
    const major = majorFor(table);
    if (!major || !config.categories[major] || !config.includeMajor(major, table)) { skippedPlatform += table.rows.length; continue; }
    const actionIndex = headerIndex(table.headers, actionHeaders);
    if (actionIndex < 0) { skippedNoKey += table.rows.length; continue; }
    for (const cells of table.rows) {
      const zh = normalizeTitle(cells[actionIndex]);
      if (!zh || /^(?:无|—|-|同上|步骤|方式|类别)$/.test(zh)) { skippedNoKey += 1; continue; }
      const rawKey = resolveKeyCell(table, cells, config);
      if (!looksLikeShortcut(rawKey)) { skippedNoKey += 1; continue; }
      const alternatives = splitAlternatives(rawKey);
      for (const alternative of alternatives) {
        let keys = parseKeySequence(alternative);
        if (!keys.length || keys.some((key) => !key)) { skippedNoKey += 1; continue; }
        if (shouldAppendCommandConfirmation(config, table) && !keys.includes("Return") && !keys.includes("Space") && !keys.some((key) => /mouse|click|drag|wheel|鼠标|单击|拖动|滚轮/i.test(key))) {
          keys = [...keys, "Space"];
        }
        if (keys.some((key) => /Windows|⊞/i.test(key))) { skippedPlatform += 1; continue; }
        const signature = `${id === "autocad" ? "" : major}\0${zh}\0${keys.join("+")}`;
        if (seen.has(signature)) continue;
        seen.add(signature);
        itemIndex += 1;
        const categoryEn = config.categories[major][1];
        const command = commandCell(table, cells);
        const hint = hintCell(table, cells);
        const en = translateAction(id, zh, categoryEn, hint, command, itemIndex);
        const contextZh = normalizeTitle((table.h3 || table.h2).replace(/^\d+(?:\.\d+)*\.?\s*/, ""));
        const contextEn = translateAction(id, contextZh, categoryEn, "", "", itemIndex);
        const localized = localizedKeys(keys);
        const item = {
          id: `${id}.md.${String(itemIndex).padStart(4, "0")}.${slug(command || en).slice(0, 36)}`,
          keys,
          ...(JSON.stringify(localized.keysZh) !== JSON.stringify(keys) ? { keysZh: localized.keysZh } : {}),
          ...(JSON.stringify(localized.keysEn) !== JSON.stringify(keys) ? { keysEn: localized.keysEn } : {}),
          zh,
          en,
          tags: ["macOS", "default", "official-source", config.appVersion, table.h3 || table.h2],
          _contextZh: contextZh,
          _contextEn: contextEn,
        };
        if (!categoryItems.has(major)) categoryItems.set(major, []);
        categoryItems.get(major).push(item);
      }
    }
  }

  const allItems = [...categoryItems.values()].flat();
  const duplicateGroups = new Map();
  for (const item of allItems) {
    const signature = `${item.en}\0${item.keys.join("+")}`;
    if (!duplicateGroups.has(signature)) duplicateGroups.set(signature, []);
    duplicateGroups.get(signature).push(item);
  }
  for (const group of duplicateGroups.values()) {
    if (group.length < 2) continue;
    for (const item of group) {
      const contextZh = item._contextZh || config.categories[majorFor({ h3: "", h2: "" })]?.[0] || "当前上下文";
      let contextEn = item._contextEn || "Current context";
      if (/shortcut \d+$/i.test(contextEn)) contextEn = "Context-specific";
      if (contextZh && !item.zh.includes(`· ${contextZh}`)) item.zh = `${item.zh} · ${contextZh}`;
      if (!item.en.includes(`— ${contextEn}`)) item.en = `${item.en} — ${contextEn}`;
    }
  }
  for (const item of allItems) {
    delete item._contextZh;
    delete item._contextEn;
  }
  const finalSeen = new Set();
  for (const [major, items] of categoryItems) {
    categoryItems.set(major, items.filter((item) => {
      const signature = `${item.en}\0${item.keys.join("+")}`;
      if (finalSeen.has(signature)) return false;
      finalSeen.add(signature);
      return true;
    }));
  }

  const categories = [...categoryItems.entries()].sort((a, b) => a[0] - b[0]).map(([major, items]) => ({
    id: `${id}-md-${major}`,
    zh: config.categories[major][0],
    en: config.categories[major][1],
    items,
  }));
  if (!categories.length) throw new Error(`${config.name} produced no categories.`);
  const pack = {
    id, name: config.name, vendor: config.vendor, accent: config.accent, glyph: config.glyph,
    group: config.group, bundleIdentifiers: config.bundleIdentifiers,
    dataStatus: config.output === "curated-shortcuts-mac.json" ? "curated" : "sourceBacked",
    categories,
    provenance: {
      sourceURL: config.sourceURL,
      sourceTitle: `${config.file} (official sources cross-checked)`,
      appVersion: config.appVersion,
      verifiedAt,
      coverage: config.output === "curated-shortcuts-mac.json" ? "curated-comprehensive-defaults" : "official-source-cross-checked-markdown",
      platform: "macOS",
    },
  };
  if (id === "illustrator") applyRequiredIllustratorShortcuts(pack);
  return {
    pack,
    stats: { shortcuts: categories.reduce((sum, category) => sum + category.items.length, 0), categories: categories.length, skippedNoKey, skippedPlatform },
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

function removeSupersededSupplements(ids) {
  const file = path.join(dataRoot, "curated-supplements-mac.json");
  const library = JSON.parse(fs.readFileSync(file, "utf8"));
  const removed = new Set(ids);
  library.software = library.software.filter((pack) => !removed.has(pack.id));
  fs.writeFileSync(file, `${JSON.stringify(library, null, 2)}\n`);
}

function run() {
  const results = new Map();
  for (const [id, config] of Object.entries(configs)) {
    const result = buildPack(id, config);
    results.set(id, result);
    console.log(`${config.name}: ${result.stats.shortcuts} shortcuts / ${result.stats.categories} categories (skipped ${result.stats.skippedNoKey} non-shortcut rows, ${result.stats.skippedPlatform} out-of-scope rows)`);
  }

  for (const output of new Set(Object.values(configs).map((config) => config.output))) {
    const packs = [...results.entries()].filter(([id]) => configs[id].output === output).map(([, result]) => result.pack);
    updateLibrary(output, packs);
  }
  removeSupersededSupplements(["photoshop"]);

  const audit = {
    importedAt: verifiedAt,
    sourceDirectory: sourceRoot,
    policy: {
      platform: "Only macOS or cross-platform default shortcuts are imported.",
      exclusions: "Windows-only, SketchUp Web, LayOut, Industry Compatible keymap, custom suggestions, and rows without a default shortcut are excluded.",
      commandAliases: "AutoCAD command aliases include Space as the explicit confirmation step.",
    },
    software: [...results.entries()].map(([id, result]) => ({ id, ...result.stats, source: configs[id].file })),
  };
  fs.writeFileSync(path.join(projectRoot, "MARKDOWN_SHORTCUT_IMPORT_REPORT.json"), `${JSON.stringify(audit, null, 2)}\n`);
}

if (require.main === module) run();

module.exports = {
  cleanCell,
  englishHint,
  localizedKeys,
  normalizeTitle,
  parseTables,
  slug,
  translateAction,
};
