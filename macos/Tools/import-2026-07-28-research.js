#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  cleanCell,
  localizedKeys,
  looksLikeShortcut,
  normalizeTitle,
  parseKeySequence,
  parseTables,
  slug,
  translateAction,
} = require("./import-markdown-shortcuts.js");

const projectRoot = path.resolve(__dirname, "..");
const dataRoot = path.join(projectRoot, "KeyFloat");
const sourceFile = process.argv.find((argument, index) => index > 1 && !argument.startsWith("--")) ||
  "/Users/hualong/Documents/loong/shortcut-research-7.28补充快捷键/7.28补充快捷键.md";
const dryRun = process.argv.includes("--dry-run");
const verifiedAt = "2026-07-28";

const configs = {
  Goodnotes: { id: "goodnotes", baselineShortcuts: 28, declaredMappings: 18 },
  Overleaf: { id: "overleaf", baselineShortcuts: 17, declaredMappings: 17 },
  TeXstudio: { id: "texstudio", baselineShortcuts: 25, declaredMappings: 27 },
  XMind: { id: "xmind", baselineShortcuts: 21, declaredMappings: 38 },
  MindNode: { id: "mindnode", baselineShortcuts: 22, declaredMappings: 91 },
};

const categoryTranslations = new Map(Object.entries({
  "桌面端对象编辑": "Desktop Object Editing",
  "缩放与页面导航": "Zoom & Page Navigation",
  "Flashcards（桌面模式）": "Flashcards (Desktop Mode)",
  "编辑器默认快捷键": "Default Editor Shortcuts",
  "文件、编译与 PDF": "Files, Build & PDF",
  "编辑器、文本与 LaTeX 插入": "Editor, Text & LaTeX",
  "编译日志与 PDF 查看器导航": "Build Log & PDF Navigation",
  "文件操作": "Files",
  "查看与视图": "View",
  "插入主题与元素": "Topics & Elements",
  "编辑与主题整理": "Editing & Organization",
  "Node：创建与交互": "Nodes: Create & Interact",
  "拖拽节点时的修饰键": "Node Drag Modifiers",
  "节点选择": "Node Selection",
  "节点组织": "Node Organization",
  "折叠与连接": "Folding & Connections",
  "Selection Mode": "Outline Selection Mode",
  "Text Editing Mode": "Outline Text Editing Mode",
  "Canvas 画布：复制、删除与撤销": "Canvas Editing",
  "画布缩放、搜索与文档": "Canvas, Search & Documents",
}));

const exactEnglishTranslations = new Map(Object.entries({
  "剪切": "Cut",
  "复制": "Copy",
  "粘贴": "Paste",
  "删除": "Delete",
  "撤销": "Undo",
  "平移已放大的页面": "Pan the zoomed page",
  "跳到下一个文本字段": "Move to the next text field",
  "跳到上一个文本字段": "Move to the previous text field",
  "上一张卡片": "Previous card",
  "下一张卡片": "Next card",
  "翻转卡片": "Flip card",
  "选择“Still Learning”": "Choose Still Learning",
  "选择“Knew It”": "Choose Knew It",
  "新建子节点": "Create child node",
  "新建父节点": "Create parent node",
  "新建同级节点": "Create sibling node",
  "在当前节点上方新建同级节点": "Create sibling above current node",
  "新建主节点": "Create main node",
  "编辑节点标题": "Edit node title",
  "添加/编辑链接": "Add or edit link",
  "打开链接": "Open link",
  "添加/移除任务": "Add or remove task",
  "完成/重新打开任务": "Complete or reopen task",
  "节点尺寸适应内容": "Fit node size to content",
  "显示图片/贴纸 Quick Look": "Quick Look image or sticker",
  "显示 Notes Popover": "Show Notes popover",
  "进入/离开 Focus Mode": "Enter or exit Focus Mode",
  "将拖拽节点从父节点脱离": "Detach dragged node from parent",
  "立即连接到另一个节点": "Connect immediately to another node",
  "禁用自动定位": "Disable automatic positioning",
  "不继承新父节点样式": "Do not inherit the new parent style",
  "向右移动选择": "Move selection right",
  "向下移动选择": "Move selection down",
  "向左移动选择": "Move selection left",
  "向上移动选择": "Move selection up",
  "选择右侧下一个节点": "Extend selection to the next node on the right",
  "选择下方下一个节点": "Extend selection to the next node below",
  "选择左侧下一个节点": "Extend selection to the next node on the left",
  "选择上方下一个节点": "Extend selection to the next node above",
  "全选": "Select all",
  "取消全选": "Deselect all",
  "选择当前 MainNode": "Select current main node",
  "选择下一个 MainNode": "Select next main node",
  "选择上一个 MainNode": "Select previous main node",
  "选择全部子节点": "Select all child nodes",
  "按字母排序子节点": "Sort child nodes alphabetically",
  "按任务状态排序子节点": "Sort child nodes by task status",
  "平衡子节点": "Balance child nodes",
  "将节点移到同级节点上方": "Move node above its sibling",
  "将节点移到同级节点下方": "Move node below its sibling",
  "将节点向右移动": "Move node right",
  "将节点向左移动": "Move node left",
  "脱离节点": "Detach node",
  "重置手动定位": "Reset manual positioning",
  "折叠/展开节点": "Collapse or expand node",
  "折叠/展开节点及同级节点": "Collapse or expand node and siblings",
  "展开一级": "Expand one level",
  "全部展开": "Expand all",
  "创建交叉连接": "Create cross connection",
  "重置交叉连接 waypoint": "Reset cross-connection waypoint",
  "显示交叉连接起点": "Show cross-connection start",
  "显示交叉连接终点": "Show cross-connection end",
  "进入文本编辑": "Enter text editing",
  "添加同级节点": "Add sibling node",
  "删除节点": "Delete node",
  "折叠节点": "Collapse node",
  "展开节点": "Expand node",
  "缩进节点": "Indent node",
  "取消缩进节点": "Outdent node",
  "上下导航": "Navigate up or down",
  "向上扩展选择": "Extend selection upward",
  "向下扩展选择": "Extend selection downward",
  "向上移动选中节点": "Move selected nodes up",
  "向下移动选中节点": "Move selected nodes down",
  "退出文本编辑": "Exit text editing",
  "复制选中节点": "Copy selected nodes",
  "粘贴并保留样式": "Paste and preserve style",
  "删除节点/连接": "Delete node or connection",
  "删除选中节点": "Delete selected nodes",
  "复制节点": "Duplicate node",
  "复制单个节点": "Copy a single node",
  "重做": "Redo",
  "复制样式": "Copy style",
  "粘贴样式": "Paste style",
  "放大": "Zoom in",
  "缩小": "Zoom out",
  "实际大小": "Actual size",
  "内容适配": "Fit content",
  "居中选区": "Center selection",
  "查找": "Find",
  "查找与替换": "Find and replace",
  "查找下一个": "Find next",
  "查找上一个": "Find previous",
  "使用选区查找": "Find using selection",
  "跳转到选区": "Reveal selection",
  "显示思维导图": "Show mind map",
  "显示大纲": "Show outline",
  "导出": "Export",
  "同步所有文档": "Sync all documents",
  "编译项目": "Compile project",
  "跳到当前文件第一行": "Go to the first line of the current file",
  "跳到当前文件最后一行": "Go to the last line of the current file",
  "跳到指定行": "Go to line",
  "切换选中行注释": "Toggle comments on selected lines",
  "删除当前行": "Delete current line",
  "缩进选区": "Indent selection",
  "取消缩进选区": "Outdent selection",
  "转换为大写": "Convert to uppercase",
  "转换为小写": "Convert to lowercase",
  "粗体": "Bold",
  "斜体": "Italic",
  "打开自动补全菜单": "Open autocomplete menu",
  "保存文件": "Save file",
  "编译（Compile）": "Compile",
  "构建并查看（Build & View）": "Build and view",
  "查看 PDF": "View PDF",
  "PDF 正向/反向搜索": "PDF forward or inverse search",
  "PDF 全屏模式": "PDF full-screen mode",
  "粗体/\\textbf": "Bold with \\textbf",
  "插入 \\item": "Insert \\item",
  "切换行内数学模式": "Toggle inline math mode",
  "插入显示数学模式": "Insert display math mode",
  "打开 LaTeX 自动补全": "Open LaTeX autocomplete",
  "跳到补全占位符": "Move between completion placeholders",
  "切换补全模式": "Cycle completion mode",
  "环境补全": "Complete environment",
  "替换": "Replace",
  "拼写检查对话框": "Open spelling dialog",
  "同义词词典": "Open thesaurus",
  "删除光标下单词/命令": "Delete word or command under cursor",
  "镜像光标/补全分隔符": "Mirror cursor or complete delimiter",
  "添加块光标": "Add block cursor",
  "退出块光标模式": "Exit block cursor mode",
  "跳到上一个/下一个错误": "Go to previous or next error",
  "跳到警告或 bad box": "Go to warning or bad box",
  "在任意日志标记间移动": "Move between log markers",
  "PDF 查看器放大": "Zoom in PDF viewer",
  "PDF 查看器缩小": "Zoom out PDF viewer",
  "复制 PDF 坐标": "Copy PDF coordinates",
  "保存": "Save",
  "另存为": "Save as",
  "新建": "New document",
  "新建标签页": "New tab",
  "打开": "Open",
  "打印": "Print",
  "ZEN 模式": "ZEN mode",
  "显示标签栏": "Show tab bar",
  "最小化当前窗口": "Minimize current window",
  "折叠/展开子主题": "Collapse or expand subtopics",
  "插入子主题": "Insert subtopic",
  "插入后置主题": "Insert following sibling topic",
  "插入前置主题": "Insert preceding sibling topic",
  "插入父主题": "Insert parent topic",
  "插入关系线": "Insert relationship",
  "插入边界": "Insert boundary",
  "插入概要": "Insert summary",
  "插入笔记": "Insert note",
  "插入超链接": "Insert hyperlink",
  "设置优先级 1–7": "Set priority 1–7",
  "复制并创建副本": "Duplicate topic",
  "全选主题": "Select all topics",
  "多选主题": "Select multiple topics",
  "查找/替换": "Find and replace",
  "上移主题": "Move topic up",
  "下移主题": "Move topic down",
  "插入新行": "Insert line break",
}));

const contextTranslations = new Map(Object.entries({
  "Edit Mode": "编辑模式",
  "Practice Mode": "练习模式",
  "Smart Learn Mode": "智能学习模式",
  "Selection Mode": "选择模式",
  "Text Editing Mode": "文本编辑模式",
}));

function stripTerminalPunctuation(value) {
  return String(value || "")
    .trim()
    .replace(/[。．.;；]+$/g, "")
    .trim();
}

function sectionName(table) {
  return table.h2.replace(/^\d{4}\.\s*/, "").trim();
}

function sourceSection(markdown, softwareName) {
  const escaped = softwareName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.match(
    new RegExp(`^##\\s+\\d{4}\\.\\s+${escaped}\\s*$[\\s\\S]*?(?=^##\\s+\\d{4}\\.|(?![\\s\\S]))`, "m")
  )?.[0] || "";
}

function sourceMetadata(section) {
  const sourceURL = section.match(/\[O1\][^\n]*?\((https?:\/\/[^)]+)\)/)?.[1] || "";
  const version = section.match(/^> 覆盖版本：([^\n]+)/m)?.[1]?.replace(/\s{2,}$/, "").trim() || "Current version";
  return { sourceURL, version };
}

function actionCell(table, cells) {
  const index = table.headers.indexOf("功能");
  return index >= 0 ? cells[index] : "";
}

function keyCell(table, cells) {
  const macIndex = table.headers.indexOf("macOS");
  if (macIndex >= 0) return cells[macIndex];
  if (table.headers.includes("iOS/iPadOS") &&
      !table.headers.includes("快捷键") &&
      !table.headers.includes("默认/官方键位")) return "";
  for (const header of ["快捷键", "默认/官方键位"]) {
    const index = table.headers.indexOf(header);
    if (index >= 0) return cells[index];
  }
  return "";
}

function rowContext(table, cells) {
  const modeIndex = table.headers.indexOf("模式");
  if (modeIndex >= 0) return cleanCell(cells[modeIndex]);
  return cleanCell(table.h4 || table.h3);
}

function categoryTitle(table) {
  if (table.h4) return table.h4;
  return table.h3;
}

function normalizeKeyInput(raw) {
  return cleanCell(raw)
    .replace(/^按住\s+(Command|Cmd|Option|Control|Ctrl|Shift)\s+后单击主题$/i, "$1 + Click")
    .replace(/左键单击/g, "Click")
    .replace(/右键单击/g, "Right click")
    .replace(/\b(Command|Cmd)\s*\+\s*1\s*至\s*(?:Command|Cmd)\s*\+\s*7\b/i, "$1 + 1–7")
    .replace(/\b(Command|Cmd)\s*\+\s*1\s*(?:through|to)\s*(?:Command|Cmd)\s*\+\s*7\b/i, "$1 + 1–7")
    .replace(/\s+/g, " ")
    .trim();
}

function keyAlternatives(raw) {
  const normalized = normalizeKeyInput(raw);
  if (!normalized || /^(?:未确认|无|—|-|不适用|未分配)$/i.test(normalized)) return [];
  return normalized
    .split(/\s+(?:或|or)\s+|\s+\/\s+|\s*；\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizedKeys(expression) {
  const keys = parseKeySequence(expression).map((key) => {
    if (/^[←→↑↓]\s+Arrow$/i.test(key)) return key[0];
    if (key === "Left click") return "Click";
    return key;
  });
  if (!keys.length || keys.some((key) => !key || /[\u3400-\u9fff]|Windows|⊞/i.test(key))) return [];
  if (keys.some((key) => [...key].length > 30)) return [];
  return keys;
}

function englishTitle(softwareID, zh, categoryEn, context, index) {
  if (exactEnglishTranslations.has(zh)) return exactEnglishTranslations.get(zh);
  return translateAction(softwareID, zh, categoryEn, context, "", index);
}

function translatedContext(value) {
  return contextTranslations.get(value) || value;
}

function buildPack(config, tables, markdown, existingPack) {
  const categories = new Map();
  const stagedItems = [];
  let itemIndex = 0;
  let skippedUnknownPlatform = 0;
  let skippedInvalidKey = 0;

  for (const table of tables) {
    const titleZh = stripTerminalPunctuation(categoryTitle(table));
    if (!titleZh || /^外接键盘与文本工具/.test(titleZh)) {
      skippedUnknownPlatform += table.rows.length;
      continue;
    }
    const titleEn = categoryTranslations.get(titleZh);
    if (!titleEn) throw new Error(`${config.id}: missing English category title for '${titleZh}'.`);
    const categoryID = `${config.id}.research-20260728.${slug(titleEn)}`;
    if (!categories.has(categoryID)) {
      categories.set(categoryID, { id: categoryID, zh: titleZh, en: titleEn, items: [] });
    }

    for (const cells of table.rows) {
      const zh = stripTerminalPunctuation(
        normalizeTitle(actionCell(table, cells)).replace(/\\{2,}/g, "\\")
      );
      const rawKey = keyCell(table, cells);
      if (!zh || !rawKey || /未确认/.test(cleanCell(rawKey))) {
        skippedUnknownPlatform += 1;
        continue;
      }
      if (!looksLikeShortcut(rawKey) && !/(?:单击|Click|Arrow|方向键)/i.test(rawKey)) {
        skippedInvalidKey += 1;
        continue;
      }
      const context = rowContext(table, cells);
      for (const alternative of keyAlternatives(rawKey)) {
        const keys = normalizedKeys(alternative);
        if (!keys.length) {
          skippedInvalidKey += 1;
          continue;
        }
        itemIndex += 1;
        const en = stripTerminalPunctuation(englishTitle(config.id, zh, titleEn, context, itemIndex));
        const localized = localizedKeys(keys);
        const item = {
          id: `${config.id}.research.20260728.${String(itemIndex).padStart(4, "0")}.${slug(en).slice(0, 36)}`,
          keys,
          ...(JSON.stringify(localized.keysZh) !== JSON.stringify(keys) ? { keysZh: localized.keysZh } : {}),
          ...(JSON.stringify(localized.keysEn) !== JSON.stringify(keys) ? { keysEn: localized.keysEn } : {}),
          zh,
          en,
          tags: ["macOS", "default", "official-source", "7.28补充快捷键.md", context].filter(Boolean),
          _context: context,
          _categoryID: categoryID,
        };
        stagedItems.push(item);
      }
    }
  }

  const uniqueStagedItems = [];
  const stagedSignatures = new Set();
  for (const item of stagedItems) {
    const signature = `${item._categoryID}\0${item._context}\0${item.zh}\0${item.en}\0${item.keys.join("+")}`;
    if (stagedSignatures.has(signature)) continue;
    stagedSignatures.add(signature);
    uniqueStagedItems.push(item);
  }

  const duplicateGroups = new Map();
  for (const item of uniqueStagedItems) {
    const signature = `${item.zh}\0${item.en}\0${item.keys.join("+")}`;
    if (!duplicateGroups.has(signature)) duplicateGroups.set(signature, []);
    duplicateGroups.get(signature).push(item);
  }
  for (const group of duplicateGroups.values()) {
    if (new Set(group.map((item) => item._context)).size < 2) continue;
    for (const item of group) {
      const context = item._context;
      if (!context) continue;
      const contextZh = translatedContext(context);
      item.zh = stripTerminalPunctuation(`${item.zh} · ${contextZh}`);
      item.en = stripTerminalPunctuation(`${item.en} — ${context}`);
    }
  }

  const seen = new Set();
  for (const item of uniqueStagedItems) {
    const categoryID = item._categoryID;
    delete item._context;
    delete item._categoryID;
    const signature = `${categoryID}\0${item.zh}\0${item.en}\0${item.keys.join("+")}`;
    if (seen.has(signature)) continue;
    seen.add(signature);
    categories.get(categoryID).items.push(item);
  }

  const finalCategories = [...categories.values()].filter((category) => category.items.length > 0);
  if (!finalCategories.length) throw new Error(`${config.id}: no verified macOS shortcuts were produced.`);
  const section = sourceSection(markdown, existingPack.name);
  const metadata = sourceMetadata(section);
  if (!metadata.sourceURL) throw new Error(`${config.id}: missing primary official source URL.`);
  return {
    pack: {
      ...existingPack,
      dataStatus: "sourceBacked",
      categories: finalCategories,
      provenance: {
        sourceURL: metadata.sourceURL,
        sourceTitle: `7.28补充快捷键.md — ${existingPack.name} official-source section`,
        appVersion: metadata.version,
        verifiedAt,
        coverage: "source-backed-comprehensive-macos",
        platform: "macOS",
      },
    },
    stats: {
      shortcuts: finalCategories.reduce((sum, category) => sum + category.items.length, 0),
      categories: finalCategories.length,
      skippedUnknownPlatform,
      skippedInvalidKey,
    },
  };
}

function terminalPunctuationCount(pack) {
  return pack.categories.reduce((sum, category) => sum + category.items.filter(
    (item) => /[。．.;；]$/.test(item.zh.trim()) || /[。．.;；]$/.test(item.en.trim())
  ).length, 0);
}

function main() {
  if (!fs.existsSync(sourceFile)) throw new Error(`Source document not found: ${sourceFile}`);
  const markdown = fs.readFileSync(sourceFile, "utf8");
  const allTables = parseTables(sourceFile);
  const targetFile = path.join(dataRoot, "curated-shortcuts-mac.json");
  const library = JSON.parse(fs.readFileSync(targetFile, "utf8"));
  const packIndex = new Map(library.software.map((pack, index) => [pack.id, index]));
  const results = [];

  for (const [softwareName, config] of Object.entries(configs)) {
    const index = packIndex.get(config.id);
    if (index === undefined) throw new Error(`curated-shortcuts-mac.json is missing ${config.id}.`);
    const tables = allTables.filter((table) => sectionName(table) === softwareName);
    if (!tables.length) throw new Error(`Source document is missing ${softwareName}.`);
    const previousCount = library.software[index].categories.reduce((sum, category) => sum + category.items.length, 0);
    const built = buildPack(config, tables, markdown, library.software[index]);
    if (terminalPunctuationCount(built.pack) !== 0) {
      throw new Error(`${config.id}: generated titles contain terminal sentence punctuation.`);
    }
    library.software[index] = built.pack;
    results.push({
      id: config.id,
      name: softwareName,
      previousShortcuts: config.baselineShortcuts ?? previousCount,
      declaredCrossPlatformMappings: config.declaredMappings,
      ...built.stats,
    });
  }

  const allSections = [...markdown.matchAll(/^##\s+\d{4}\.\s+(.+?)\s*$/gm)].map((match) => match[1]);
  const appliedNames = new Set(Object.keys(configs));
  const report = {
    importedAt: verifiedAt,
    sourceFile,
    dryRun,
    policy: {
      platform: "Only explicit macOS columns or official shared desktop keys were imported.",
      exclusions: "iOS/iPadOS-only rows, unconfirmed macOS cells, invalid key expressions, generic fallback rows, Google search placeholders, and inferred modifier substitutions were excluded.",
      localization: "Only sections with source-provided Chinese action names and deterministic English labels were applied, preserving language isolation in KeyFloat.",
      punctuation: "Shortcut action titles are normalized without terminal Chinese or Western sentence periods and semicolons.",
    },
    applied: results,
    deferred: allSections.filter((name) => !appliedNames.has(name)).map((name) => ({
      name,
      reason: ["Adobe Acrobat", "Evernote", "Adobe XD", "Framer", "Axure RP"].includes(name)
        ? "Official mappings are English-only in the supplied chapter; defer until a verified Chinese title pairing is available."
        : "The supplied chapter contains generic fallback rows or search-placeholder evidence and does not pass the source-backed macOS import gate.",
    })),
  };

  if (!dryRun) {
    fs.writeFileSync(targetFile, `${JSON.stringify(library, null, 2)}\n`);
    fs.writeFileSync(
      path.join(projectRoot, "SHORTCUT_RESEARCH_2026-07-28_IMPORT_REPORT.json"),
      `${JSON.stringify(report, null, 2)}\n`
    );
  }

  for (const result of results) {
    console.log(
      `${result.name}: ${result.previousShortcuts} -> ${result.shortcuts} shortcuts / ${result.categories} categories ` +
      `(skipped ${result.skippedUnknownPlatform} out-of-scope rows, ${result.skippedInvalidKey} invalid rows)`
    );
  }
  console.log(`Applied ${results.length} verified sections; deferred ${report.deferred.length} sections.`);
}

main();
