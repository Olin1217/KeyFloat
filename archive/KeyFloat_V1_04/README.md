# KeyFloat for macOS

KeyFloat 是原生 SwiftUI/AppKit 桌面快捷键助手。当前版本为 **1.0.2 (2)**，仅收录 macOS 键位，不依赖 Electron 或 WKWebView。维护入口为 `Tools/run-product-iteration.sh`，它会组装补充数据并统一验证快捷键、官方 SVG、官网和 Xcode 构建。

## 当前能力

- `230 × 62 pt` 悬浮小窗，可展开、收起、钉住并跨桌面显示。
- 默认英文，可完整切换为简体中文；支持深色与浅色模式。
- 按 21 个工作与学习场景组织 209 款软件；官方来源数据与 ChatGPT 5.6 Sol 两轮整理的 `curated` 默认键位共同覆盖全部目录软件。
- 收起状态下可根据前台应用的 Bundle ID 自动切换到对应软件；展开阅读时不会被打断。
- 支持分类、收藏、双语命令搜索和按键组合搜索。
- `⌘K` 或 `⌘F` 可从小窗直接展开并聚焦搜索；`Esc` 可重复收起。
- 搜索兼容 `Command K`、`Cmd+K`、`Command-K`、`⌘K` 与中文修饰键名称。
- 记录窗口右上角锚点和显示器；外接屏断开后自动回到可见区域。
- 关闭窗口后应用继续在后台运行，可从菜单栏或 Dock 重新打开。
- 展开窗口右下角提供问题反馈入口，可提交问题、建议与可选联系方式；提交时自动记录当前软件和语言上下文。
- VoiceOver 可识别软件选择、搜索、主题、钉住、收起、关闭和收藏动作。

## 数据可信度

后加载的数据层会按明确策略进行合并或替换，并在运行时跳过空字段、重复 ID 和 Windows-only 键位。

已建立可追踪来源的重点数据：

- After Effects 26：717 条应用默认 macOS 绑定。
- Photoshop：639 条 macOS 默认键位与上下文操作，依据 2026-07-25 汇总文档及 Adobe 官方来源交叉核验。
- Illustrator：393 条 macOS 默认键位与上下文操作，依据 2026-07-25 汇总文档及 Adobe 官方来源交叉核验。
- AutoCAD 2026 for Mac：547 条组合键、命令别名、对象捕捉、精确输入与三维操作。
- SketchUp 2026 for macOS：270 条桌面版工具、修饰键、鼠标操作与精确输入；不混入 Web 和 LayOut 键位。
- Blender 5.2 LTS：889 条默认键位，覆盖对象、网格、雕刻、动画、节点、视频、跟踪与其他主要编辑器上下文。
- Affinity Designer 2：255 条 Serif 官方双语页面内容，去除完全重复行并拆分复合动作。
- Affinity Photo 2：272 条 Serif 官方双语页面内容。
- Affinity Publisher 2：204 条 Serif 官方双语页面内容。
- Terminal：98 条 Apple 官方双语页面内容。
- Safari：64 条 Apple 官方页面键位。
- Finder：78 条 Apple 官方“Finder 与系统快捷键”内容。
- MATLAB：84 条 MathWorks 官方页面 macOS 专用列键位及等价组合。
- Microsoft Word：216 条 Microsoft Support 官方 macOS 标签键位。
- Microsoft Excel：273 条 Microsoft Support 官方 macOS 标签键位；官方表中动作名称为空的 `Ctrl+E` 行未猜测导入。
- Microsoft PowerPoint：135 条 Microsoft Support 官方 macOS 标签键位。
- Microsoft OneNote：84 条 Microsoft Support 官方 macOS 标签键位。
- Apple Pages：305 条 Apple 官方中英文页面键位与明确列出的手势。
- Apple Numbers：306 条 Apple 官方中英文页面键位与明确列出的手势。
- Apple Keynote：368 条 Apple 官方中英文页面键位与明确列出的手势。
- Figma：8 条浏览器二级来源键位，状态为 `manualReview`，详见人工校验清单。

旧版基础包仍由后置数据层覆盖。官方来源层保持原有证据记录；原目录空包由三份独立的 ChatGPT 5.6 Sol 批次进行两轮补充，并在最终资源中以 `curated` 标记，避免与官方导入混淆。每款软件的版本、上下文、网页焦点与可自定义键位边界记录在 `Tools/shortcut_batches/*-progress.md`。

Windows-only 产品、命令行命令和框架不会用相似软件键位代替。最终验证要求 209 款软件均包含非空 macOS 快捷键数据，且不得残留 `catalogOnly` 状态。

## 工程结构

```text
KeyFloat-Xcode/
├── KeyFloat.xcodeproj/
├── KeyFloat/
│   ├── KeyFloatApp.swift
│   ├── AppDelegate.swift
│   ├── FloatingWindowController.swift
│   ├── KeyFloatView.swift
│   ├── ShortcutModels.swift
│   ├── ShortcutStore.swift
│   ├── KeyFloat.entitlements
│   ├── shortcuts-mac.json
│   ├── office-shortcuts-mac.json
│   ├── professional-shortcuts-mac.json
│   ├── productivity-shortcuts-mac.json
│   ├── verified-shortcuts-mac.json
│   ├── supplemental-shortcuts-mac.json
│   ├── ecosystem-shortcuts-mac.json
│   ├── browser-reviewed-shortcuts-mac.json
│   ├── extended-shortcuts-mac.json
│   ├── curated-shortcuts-mac.json
│   ├── curated-supplements-mac.json
│   └── SoftwareIcons/
├── Tools/
│   ├── generate_ecosystem_shortcuts.py
│   ├── ecosystem-coverage.json
│   ├── generate_extended_shortcuts.py
│   ├── extended-coverage.json
│   ├── audit_shortcut_truth.py
│   ├── shortcut-truth-audit.json
│   ├── generate_browser_review_shortcuts.py
│   ├── import_official_shortcuts.py
│   ├── validate-shortcuts.js
│   ├── validate-icon-library.js
│   ├── assemble-curated-shortcuts.js
│   ├── run-product-iteration.sh
│   ├── shortcut_batches/
│   └── StoreSmokeTests.swift
├── BROWSER_SOURCED_SHORTCUTS_REVIEW.md
└── PRODUCT_AUDIT_V1.02.md
```

## 打开与运行

1. 双击 `KeyFloat.xcodeproj`。
2. 在 Scheme 中选择 `KeyFloat` 和 `My Mac`。
3. 按 `⌘R` 运行。

命令行 Debug 构建：

```bash
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer \
xcodebuild -project KeyFloat.xcodeproj -scheme KeyFloat \
  -configuration Debug CODE_SIGNING_ALLOWED=NO build
```

## 数据和行为校验

从五份本地汇总文档重新生成 Photoshop、Illustrator、AutoCAD、SketchUp 和 Blender 的 macOS 数据：

```bash
node Tools/import-markdown-shortcuts.js "/Users/hualong/Downloads/快捷键md"
```

导入会自动排除 Windows 专属、SketchUp Web/LayOut、Blender Industry Compatible、自定义建议和无默认键条目，并生成 `MARKDOWN_SHORTCUT_IMPORT_REPORT.json`。

校验全部 JSON 数据层的结构、双语字段、分类、Bundle Identifier、重复 ID、Windows 键位、过长键帽和最终合并结果：

```bash
node Tools/validate-shortcuts.js
```

重新从官方双语页面生成补充层（默认输出到标准输出；`--write` 更新资源，`--check` 验证资源）：

```bash
python3 Tools/import_official_shortcuts.py
python3 Tools/import_official_shortcuts.py --write
python3 Tools/import_official_shortcuts.py --check
```

生成浏览器二级来源包和人工校验清单：

```bash
python3 Tools/generate_browser_review_shortcuts.py --write
python3 Tools/generate_browser_review_shortcuts.py --check
```

重新生成并核对四轮生态扩展数据：

```bash
python3 Tools/generate_ecosystem_shortcuts.py --write
python3 Tools/generate_ecosystem_shortcuts.py --check
```

生成扩展版官方来源数据，并执行真实性边界审计：

```bash
python3 Tools/generate_extended_shortcuts.py --write
python3 Tools/generate_extended_shortcuts.py --check
python3 Tools/audit_shortcut_truth.py --write
python3 Tools/audit_shortcut_truth.py --check
```

Store 冒烟测试需要传入已构建的 `KeyFloat.app` 路径；它会使用隔离的 `UserDefaults`，不会修改用户偏好。

## 签名与归档

在 Target → Signing & Capabilities 中选择自己的 Team，并保持 Automatically manage signing 开启。使用 Product → Archive 创建分发归档。

本地自用可以选择 Distribute App → Copy App；对外发布需要 Apple Developer 的 Developer ID 签名与公证。
