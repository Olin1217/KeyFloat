# KeyFloat 浏览器来源快捷键人工校验清单

更新时间：2026-07-21  
用途：记录不是直接从厂商完整快捷键表导入、需要产品负责人再次人工确认的数据。

## 状态说明

- `officialImport` / `sourceBacked`：来自厂商官方页面、官方手册、官方源码或本机官方默认预设，不列入本清单。
- `manualReview`：通过浏览器检索获得的二级来源数据，会进入 KeyFloat，但必须由人工复核。
- `catalogOnly`：尚无可用数据，只保留软件目录，不展示快捷键。

## MR-001 · Figma

- KeyFloat 状态：`manualReview`
- 浏览器检索词：`Figma keyboard shortcuts Mac cheat sheet`
- 搜索引擎：Bing
- 厂商官方页面：[Use Figma products with a keyboard](https://help.figma.com/hc/en-us/articles/360040328653-Use-keyboard-shortcuts)
- 官方页面结论：只说明快捷键面板与少量键盘操作，没有公开可抓取的完整快捷键清单。
- 二级数据来源：[Figma Keyboard Shortcuts for Mac (2026)](https://shortcut-tools.com/en/shortcuts/figma/mac/)
- 来源类型：第三方快捷键聚合页
- 本轮采用：8 条
- 可信度：中等。页面明确标注 Mac，并将 `Cmd`、`Option` 分开列出，但不是 Figma 官方发布。
- 已发现的历史数据风险：旧数据把“创建组件”记录为其他组合；二级来源给出 `⌘ + ⌥ + K`，因此旧版 177 条不会整体恢复。

| 按键 | 中文动作 | English action |
|---|---|---|
| V | 选择或移动 | Select / Move |
| F | 画框 | Frame |
| R | 矩形 | Rectangle |
| T | 文本 | Text |
| ⌘ + G | 编组 | Group |
| ⌘ + D | 创建副本 | Duplicate |
| ⌘ + ⌥ + K | 创建组件 | Component |
| ⇧ + 1 | 缩放以适应画布 | Zoom to Fit |

### 人工校验建议

1. 在最新 Figma 桌面版打开任意设计文件。
2. 逐条执行上表按键，确认动作和上下文。
3. 重点确认 `⌘ + ⌥ + K` 是否为“创建组件”。
4. 重点确认 `⇧ + 1` 是否在当前键盘布局下执行“缩放以适应画布”。
5. 校验完成后，可将本包从 `manualReview` 升级为 `sourceBacked` 或保留逐条确认记录。

## 浏览器检索但无需人工校验的数据

### MATLAB Editor

- 浏览器检索到 MathWorks 官方页面：[Editor Keyboard Shortcuts](https://www.mathworks.com/help/matlab/matlab_prog/editor-keyboard-shortcuts.html)
- 页面包含单独的 `Keyboard Shortcut on macOS` 列。
- KeyFloat 仅导入该 macOS 列，并跳过官方标为 `N/A` 的项目。
- 该数据归为 `officialImport`，不属于不确定数据。

### Photoshop 2026

- 浏览器确认 Adobe 当前官方说明页：[View keyboard shortcuts](https://helpx.adobe.com/photoshop/desktop/get-started/settings-and-preferences/view-keyboard-shortcuts.html)
- 具体键位来自本机 Photoshop 2026 “Keyboard Shortcuts and Menus”官方导出文件。
- KeyFloat 只恢复能够在导出文件中复核到的 52 条现有中英文记录；5 条缺失或语义变化的旧记录继续隔离。
- 该数据归为 `officialImport`，覆盖范围标记为 selection，不宣称完整覆盖全部 Photoshop 命令。

### Microsoft Office for Mac

- 浏览器逐一确认了 Microsoft Support 页面中的 `macOS` 标签，导入器只读取该标签，不读取默认选中的 Windows 表。
- [Word 官方页面](https://support.microsoft.com/en-US/accessibility/word/keyboard-shortcuts-in-word)：21 个表格，去除跨分类完全重复项后采用 216 条。
- [Excel 官方页面](https://support.microsoft.com/en-US/accessibility/excel/keyboard-shortcuts-in-excel)：13 个表格，去除跨分类完全重复项后采用 273 条。
- [PowerPoint 官方页面](https://support.microsoft.com/en-US/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations)：13 个表格，去除跨分类完全重复项后采用 135 条。
- [OneNote 官方页面](https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-onenote-44b8b3f4-c274-4bcc-a089-e80fdcc87950)：5 个表格，采用 84 条。
- 四款软件均同时读取 Microsoft 简体中文官方页面；中英文表格数量及行数必须完全一致，否则生成器会停止。
- Excel 当前 macOS 表有一行只给出 `Ctrl+E`、但中英文动作名称均为空。KeyFloat 没有根据 Windows/Web 表猜测含义，已明确跳过该无标题行。
- 该批数据归为 `officialImport`，不属于不确定数据。

### Apple iWork

- [Pages 官方页面](https://support.apple.com/guide/pages/keyboard-shortcuts-tanc0ffef022/mac)：10 个分类，去重后采用 305 条。
- [Numbers 官方页面](https://support.apple.com/guide/numbers/keyboard-shortcuts-tana45192591/mac)：10 个分类，去重后采用 306 条。
- [Keynote 官方页面](https://support.apple.com/guide/keynote/keyboard-shortcuts-tanfde4a3e6d/mac)：14 个分类，去重后采用 368 条。
- 三款软件均使用 Apple 官方中英文页面逐行配对，只导入页面明确列出的 Mac 键位和手势。
- 该批数据归为 `officialImport`，不属于不确定数据。

## 浏览器检索但未采用的数据

### BR-001 · Microsoft Outlook for Mac

- 浏览器检索词：`site:support.microsoft.com "Keyboard shortcuts in Outlook for Mac"`
- Microsoft 当前 Outlook 快捷键总页仍指向相对路径 `mac/keyboard-shortcuts-in-outlook-for-mac`。
- 2026-07-21 访问该 Microsoft Support Mac 链接返回 HTTP 404。
- 本轮采用：0 条。
- KeyFloat 状态：继续保持 `catalogOnly`，不恢复旧版手工数据，也不使用第三方表代替官方来源。
- 人工校验建议：后续若 Microsoft 修复链接或在新版 Outlook 页面提供明确的 macOS 表，再重新运行官方导入流程。

## 后续追加规则

每次使用浏览器二级来源补充软件时，必须新增一个 `MR-xxx` 条目，并记录检索词、页面地址、采用条数、风险点和人工校验步骤。
