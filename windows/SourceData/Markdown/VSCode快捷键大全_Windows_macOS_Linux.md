# Visual Studio Code 快捷键大全

> 适用平台：Windows、macOS、Linux  
> 整理日期：2026-07-25  
> 资料基准：VS Code 官方文档与官方平台快捷键参考表  
> 键盘布局：默认按美式键盘（US Keyboard）记录

## 目录

- [使用说明](#使用说明)
- [最值得先记住的 25 个快捷键](#最值得先记住的-25-个快捷键)
- [1. 通用与命令面板](#1-通用与命令面板)
- [2. 文件管理](#2-文件管理)
- [3. 基础编辑](#3-基础编辑)
- [4. 多光标与选择](#4-多光标与选择)
- [5. 当前文件查找与替换](#5-当前文件查找与替换)
- [6. 全局搜索与搜索编辑器](#6-全局搜索与搜索编辑器)
- [7. 智能提示、代码操作与重构](#7-智能提示代码操作与重构)
- [8. 代码与文件导航](#8-代码与文件导航)
- [9. 编辑器与窗口管理](#9-编辑器与窗口管理)
- [10. 界面、面板与显示](#10-界面面板与显示)
- [11. 代码折叠](#11-代码折叠)
- [12. 注释、格式化与语言模式](#12-注释格式化与语言模式)
- [13. 调试](#13-调试)
- [14. 集成终端](#14-集成终端)
- [15. Git 与源代码管理](#15-git-与源代码管理)
- [16. Markdown](#16-markdown)
- [17. 任务](#17-任务)
- [18. AI、Chat 与内联建议](#18-aichat-与内联建议)
- [19. 无障碍与键盘操作](#19-无障碍与键盘操作)
- [20. 首选项与个性化](#20-首选项与个性化)
- [21. 查看真正完整的系统快捷键](#21-查看真正完整的系统快捷键)
- [22. 自定义快捷键](#22-自定义快捷键)
- [23. 快捷键冲突排查](#23-快捷键冲突排查)
- [官方资料来源](#官方资料来源)

---

## 使用说明

### 修饰键对照

| 符号 | macOS | Windows / Linux |
|---|---|---|
| `⌘` | Command | — |
| `⌥` | Option | Alt |
| `⌃` | Control | Ctrl |
| `⇧` | Shift | Shift |
| `← ↑ → ↓` | 方向键 | 方向键 |
| `PageUp / PageDown` | 翻页键 | 翻页键 |

### 连续组合键

`Ctrl+K Ctrl+S` 不是同时按下四个键，而是：

1. 先按 `Ctrl+K`；
2. 松开；
3. 再按 `Ctrl+S`。

VS Code 将这种两段式快捷键称为 **Key Chord**。

### 重要说明

- 同一组按键可根据焦点区域执行不同命令，例如编辑器、终端和 Chat 面板可能共用相同按键。
- 本文以 VS Code 内置默认快捷键为主，不包含 Vim、Sublime Text、IntelliJ 等 Keymap 扩展改写后的按键。
- 扩展可以新增或覆盖快捷键，因此安装扩展后，以本机“键盘快捷方式”页面显示的结果为准。
- 中文、德文等非美式键盘布局可能改变符号键的实际组合。
- 表格中的 `—` 表示该平台默认未分配快捷键，可通过命令面板调用或自行绑定。
- `Fn` 键属于键盘硬件层。如果 Mac 功能键控制亮度或音量，使用 `F5`、`F11` 等按键时可能需要同时按住 `Fn`。

---

## 最值得先记住的 25 个快捷键

| 功能 | Windows | macOS | Linux |
|---|---|---|---|
| 打开命令面板 | `Ctrl+Shift+P` / `F1` | `⇧⌘P` / `F1` | `Ctrl+Shift+P` / `F1` |
| 快速打开文件 | `Ctrl+P` | `⌘P` | `Ctrl+P` |
| 打开设置 | `Ctrl+,` | `⌘,` | `Ctrl+,` |
| 打开快捷键设置 | `Ctrl+K Ctrl+S` | `⌘K ⌘S` | `Ctrl+K Ctrl+S` |
| 保存 | `Ctrl+S` | `⌘S` | `Ctrl+S` |
| 查找 | `Ctrl+F` | `⌘F` | `Ctrl+F` |
| 全局搜索 | `Ctrl+Shift+F` | `⇧⌘F` | `Ctrl+Shift+F` |
| 替换 | `Ctrl+H` | `⌥⌘F` | `Ctrl+H` |
| 行注释开关 | `Ctrl+/` | `⌘/` | `Ctrl+/` |
| 格式化文档 | `Shift+Alt+F` | `⇧⌥F` | `Ctrl+Shift+I` |
| 快速修复 | `Ctrl+.` | `⌘.` | `Ctrl+.` |
| 重命名符号 | `F2` | `F2` | `F2` |
| 转到定义 | `F12` | `F12` | `F12` |
| 查找所有引用 | `Shift+F12` | `⇧F12` | `Shift+F12` |
| 添加下一个相同选择 | `Ctrl+D` | `⌘D` | `Ctrl+D` |
| 选择全部相同内容 | `Ctrl+Shift+L` | `⇧⌘L` | `Ctrl+Shift+L` |
| 移动当前行 | `Alt+↑ / ↓` | `⌥↑ / ↓` | `Alt+↑ / ↓` |
| 复制当前行 | `Shift+Alt+↑ / ↓` | `⇧⌥↑ / ↓` | `Ctrl+Shift+Alt+↑ / ↓` |
| 删除当前行 | `Ctrl+Shift+K` | `⇧⌘K` | `Ctrl+Shift+K` |
| 拆分编辑器 | `Ctrl+\` | `⌘\` | `Ctrl+\` |
| 切换侧边栏 | `Ctrl+B` | `⌘B` | `Ctrl+B` |
| 打开/隐藏终端 | ``Ctrl+` `` | ``⌃` `` | ``Ctrl+` `` |
| 开始/继续调试 | `F5` | `F5` | `F5` |
| 设置/取消断点 | `F9` | `F9` | `F9` |
| 打开源代码管理 | `Ctrl+Shift+G` | `⌃⇧G` | `Ctrl+Shift+G` |

---

## 1. 通用与命令面板

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 显示全部命令/命令面板 | `Ctrl+Shift+P` / `F1` | `⇧⌘P` / `F1` | `Ctrl+Shift+P` / `F1` | `workbench.action.showCommands` |
| 快速打开/转到文件 | `Ctrl+P` | `⌘P` | `Ctrl+P` | `workbench.action.quickOpen` |
| 新建窗口 | `Ctrl+Shift+N` | `⇧⌘N` | `Ctrl+Shift+N` | `workbench.action.newWindow` |
| 关闭窗口 | `Alt+F4` | `⇧⌘W` | `Alt+F4` | `workbench.action.closeWindow` |
| 打开设置 | `Ctrl+,` | `⌘,` | `Ctrl+,` | `workbench.action.openSettings` |
| 打开键盘快捷方式 | `Ctrl+K Ctrl+S` | `⌘K ⌘S` | `Ctrl+K Ctrl+S` | `workbench.action.openGlobalKeybindings` |
| 选择颜色主题 | `Ctrl+K Ctrl+T` | `⌘K ⌘T` | `Ctrl+K Ctrl+T` | `workbench.action.selectTheme` |
| 快速打开视图 | `Ctrl+Q` | `⌃Q` | `—` | `workbench.action.quickOpenView` |

---

## 2. 文件管理

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 新建无标题文件 | `Ctrl+N` | `⌘N` | `Ctrl+N` | `workbench.action.files.newUntitledFile` |
| 打开文件 | `Ctrl+O` | `⌘O` | `Ctrl+O` | `workbench.action.files.openFile` |
| 保存 | `Ctrl+S` | `⌘S` | `Ctrl+S` | `workbench.action.files.save` |
| 全部保存 | `Ctrl+K S` | `⌥⌘S` | `—` | `saveAll` |
| 另存为 | `Ctrl+Shift+S` | `⇧⌘S` | `Ctrl+Shift+S` | `workbench.action.files.saveAs` |
| 关闭当前编辑器 | `Ctrl+F4` | `⌘W` | `Ctrl+W` | `workbench.action.closeActiveEditor` |
| 关闭当前编辑器组 | `Ctrl+K W` | `⌘K W` | `Ctrl+K W` | `workbench.action.closeEditorsInGroup` |
| 关闭所有编辑器 | `Ctrl+K Ctrl+W` | `⌘K ⌘W` | `Ctrl+K Ctrl+W` | `workbench.action.closeAllEditors` |
| 重新打开已关闭编辑器 | `Ctrl+Shift+T` | `⇧⌘T` | `Ctrl+Shift+T` | `workbench.action.reopenClosedEditor` |
| 保持预览编辑器打开 | `Ctrl+K Enter` | `⌘K Enter` | `Ctrl+K Enter` | `workbench.action.keepEditor` |
| 复制当前文件路径 | `Ctrl+K P` | `⌘K P` | `Ctrl+K P` | `workbench.action.files.copyPathOfActiveFile` |
| 在资源管理器/Finder 中显示当前文件 | `Ctrl+K R` | `⌘K R` | `Ctrl+K R` | `workbench.action.files.revealActiveFileInWindows` |
| 在新窗口中显示当前文件 | `Ctrl+K O` | `⌘K O` | `Ctrl+K O` | `workbench.action.files.showOpenedFileInNewWindow` |
| 关闭当前文件夹 | `Ctrl+K F` | `⌘K F` | `Ctrl+K F` | `workbench.action.closeFolder` |
| 将当前文件与剪贴板比较 | `Ctrl+K C` | `⌘K C` | `Ctrl+K C` | `workbench.files.action.compareWithClipboard` |

---

## 3. 基础编辑

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 剪切；未选择时剪切整行 | `Ctrl+X` | `⌘X` | `Ctrl+X` | `editor.action.clipboardCutAction` |
| 复制；未选择时复制整行 | `Ctrl+C` | `⌘C` | `Ctrl+C` | `editor.action.clipboardCopyAction` |
| 粘贴 | `Ctrl+V` | `⌘V` | `Ctrl+V` | `editor.action.clipboardPasteAction` |
| 撤销 | `Ctrl+Z` | `⌘Z` | `Ctrl+Z` | `undo` |
| 重做 | `Ctrl+Y` | `⇧⌘Z` | `Ctrl+Y` | `redo` |
| 删除当前行 | `Ctrl+Shift+K` | `⇧⌘K` | `Ctrl+Shift+K` | `editor.action.deleteLines` |
| 在下方插入一行 | `Ctrl+Enter` | `⌘Enter` | `Ctrl+Enter` | `editor.action.insertLineAfter` |
| 在上方插入一行 | `Ctrl+Shift+Enter` | `⇧⌘Enter` | `Ctrl+Shift+Enter` | `editor.action.insertLineBefore` |
| 向下移动行 | `Alt+↓` | `⌥↓` | `Alt+↓` | `editor.action.moveLinesDownAction` |
| 向上移动行 | `Alt+↑` | `⌥↑` | `Alt+↑` | `editor.action.moveLinesUpAction` |
| 向下复制行 | `Shift+Alt+↓` | `⇧⌥↓` | `Ctrl+Shift+Alt+↓` | `editor.action.copyLinesDownAction` |
| 向上复制行 | `Shift+Alt+↑` | `⇧⌥↑` | `Ctrl+Shift+Alt+↑` | `editor.action.copyLinesUpAction` |
| 选择当前行 | `Ctrl+L` | `⌘L` | `Ctrl+L` | `expandLineSelection` |
| 跳转到匹配括号 | `Ctrl+Shift+\` | `⇧⌘\` | `Ctrl+Shift+\` | `editor.action.jumpToBracket` |
| 增加缩进 | `Ctrl+]` | `⌘]` | `Ctrl+]` | `editor.action.indentLines` |
| 减少缩进 | `Ctrl+[` | `⌘[` | `Ctrl+[` | `editor.action.outdentLines` |
| 转到行首 | `Home` | `Home` | `Home` | `cursorHome` |
| 转到行尾 | `End` | `End` | `End` | `cursorEnd` |
| 转到文件开头 | `Ctrl+Home` | `⌘↑` | `Ctrl+Home` | `cursorTop` |
| 转到文件末尾 | `Ctrl+End` | `⌘↓` | `Ctrl+End` | `cursorBottom` |
| 向上滚动一行 | `Ctrl+↑` | `⌃PageUp` | `Ctrl+↑` | `scrollLineUp` |
| 向下滚动一行 | `Ctrl+↓` | `⌃PageDown` | `Ctrl+↓` | `scrollLineDown` |
| 向上滚动一页 | `Alt+PageUp` | `⌘PageUp` | `Alt+PageUp` | `scrollPageUp` |
| 向下滚动一页 | `Alt+PageDown` | `⌘PageDown` | `Alt+PageDown` | `scrollPageDown` |
| 切换自动换行 | `Alt+Z` | `⌥Z` | `Alt+Z` | `editor.action.toggleWordWrap` |
| 切换插入/覆盖输入模式 | `Insert` | `⌥⌘O` | `Insert` | `editor.action.toggleOvertypeInsertMode` |
| 切换 Tab 键移动焦点 | `Ctrl+M` | `⌃⇧M` | `Ctrl+M` | `editor.action.toggleTabFocusMode` |

---

## 4. 多光标与选择

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 鼠标位置插入光标 | `Alt+单击` | `⌥+单击` | `Alt+单击` | — |
| 在下方插入光标 | `Ctrl+Alt+↓` | `⌥⌘↓` | `Shift+Alt+↓` | `editor.action.insertCursorBelow` |
| 在上方插入光标 | `Ctrl+Alt+↑` | `⌥⌘↑` | `Shift+Alt+↑` | `editor.action.insertCursorAbove` |
| 撤销上一次光标操作 | `Ctrl+U` | `⌘U` | `Ctrl+U` | `cursorUndo` |
| 在每个已选行末尾插入光标 | `Shift+Alt+I` | `⇧⌥I` | `Shift+Alt+I` | `editor.action.insertCursorAtEndOfEachLineSelected` |
| 将下一个匹配项加入选择 | `Ctrl+D` | `⌘D` | `Ctrl+D` | `editor.action.addSelectionToNextFindMatch` |
| 将最后一个选择移到下一个匹配项 | `Ctrl+K Ctrl+D` | `⌘K ⌘D` | `Ctrl+K Ctrl+D` | `editor.action.moveSelectionToNextFindMatch` |
| 选择当前选择内容的所有出现位置 | `Ctrl+Shift+L` | `⇧⌘L` | `Ctrl+Shift+L` | `editor.action.selectHighlights` |
| 选择当前单词的所有出现位置 | `Ctrl+F2` | `⌘F2` | `Ctrl+F2` | `editor.action.changeAll` |
| 扩大语法选择范围 | `Shift+Alt+→` | `⌃⇧⌘→` | `Shift+Alt+→` | `editor.action.smartSelect.expand` |
| 缩小语法选择范围 | `Shift+Alt+←` | `⌃⇧⌘←` | `Shift+Alt+←` | `editor.action.smartSelect.shrink` |
| 鼠标列/框选 | `Shift+Alt+拖动` | `⇧⌥+拖动` | `Shift+Alt+拖动` | — |
| 键盘向上/下列选择 | `Ctrl+Shift+Alt+↑ / ↓` | `⇧⌥⌘↑ / ↓` | `Ctrl+Shift+Alt+↑ / ↓` | — |
| 键盘向左/右列选择 | `Ctrl+Shift+Alt+← / →` | `⇧⌥⌘← / →` | `Ctrl+Shift+Alt+← / →` | — |
| 列选择向上/下翻页 | `Ctrl+Shift+Alt+PageUp / PageDown` | `⇧⌥⌘PageUp / PageDown` | `Ctrl+Shift+Alt+PageUp / PageDown` | — |

> Linux 部分桌面环境会占用 `Alt+单击` 拖动窗口。可将设置 `editor.multiCursorModifier` 改为 `ctrlCmd`，使用 `Ctrl+单击` 添加光标。

---

## 5. 当前文件查找与替换

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 查找 | `Ctrl+F` | `⌘F` | `Ctrl+F` | `actions.find` |
| 替换 | `Ctrl+H` | `⌥⌘F` | `Ctrl+H` | `editor.action.startFindReplaceAction` |
| 查找框中转到下一个匹配项 | `Enter` | `Enter` | `Enter` | `editor.action.nextMatchFindAction` |
| 查找框中转到上一个匹配项 | `Shift+Enter` | `⇧Enter` | `Shift+Enter` | `editor.action.previousMatchFindAction` |
| 全局转到下一个查找结果 | `F3` | `⌘G` | `F3` | `editor.action.nextMatchFindAction` |
| 全局转到上一个查找结果 | `Shift+F3` | `⇧⌘G` | `Shift+F3` | `editor.action.previousMatchFindAction` |
| 选择所有查找匹配项 | `Alt+Enter` | `⌥Enter` | `Alt+Enter` | `editor.action.selectAllMatches` |
| 区分大小写开关 | `Alt+C` | `⌥⌘C` | `Alt+C` | `toggleFindCaseSensitive` |
| 正则表达式开关 | `Alt+R` | `⌥⌘R` | `Alt+R` | `toggleFindRegex` |
| 全字匹配开关 | `Alt+W` | `⌥⌘W` | `Alt+W` | `toggleFindWholeWord` |
| 关闭查找框 | `Escape` | `Escape` | `Escape` | `closeFindWidget` |

---

## 6. 全局搜索与搜索编辑器

### 工作区搜索

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开搜索视图 | `Ctrl+Shift+F` | `⇧⌘F` | `Ctrl+Shift+F` | `workbench.view.search` |
| 在文件中替换 | `Ctrl+Shift+H` | `⇧⌘H` | `Ctrl+Shift+H` | `workbench.action.replaceInFiles` |
| 显示/隐藏搜索详细信息 | `Ctrl+Shift+J` | `⇧⌘J` | `Ctrl+Shift+J` | `workbench.action.search.toggleQueryDetails` |
| 区分大小写开关 | `Alt+C` | `⌥⌘C` | `Alt+C` | `toggleSearchCaseSensitive` |
| 全字匹配开关 | `Alt+W` | `⌥⌘W` | `Alt+W` | `toggleSearchWholeWord` |
| 正则表达式开关 | `Alt+R` | `⌥⌘R` | `Alt+R` | `toggleSearchRegex` |
| 聚焦下一个搜索结果 | `F4` | `F4` | `F4` | `search.action.focusNextSearchResult` |
| 聚焦上一个搜索结果 | `Shift+F4` | `⇧F4` | `Shift+F4` | `search.action.focusPreviousSearchResult` |
| 显示下一条搜索历史 | `↓` | `↓` | `↓` | `history.showNext` |
| 显示上一条搜索历史 | `↑` | `↑` | `↑` | `history.showPrevious` |

### 搜索编辑器

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 在搜索编辑器中打开结果 | `Alt+Enter` | `⌘Enter` | `Alt+Enter` | `search.action.openInEditor` |
| 聚焦搜索编辑器输入框 | `Escape` | `Escape` | `Escape` | `search.action.focusQueryEditorWidget` |
| 重新搜索 | `Ctrl+Shift+R` | `⇧⌘R` | `Ctrl+Shift+R` | `rerunSearchEditorSearch` |
| 删除文件搜索结果 | `Ctrl+Shift+Backspace` | `⇧⌘Backspace` | `Ctrl+Shift+Backspace` | `search.searchEditor.action.deleteFileResults` |

---

## 7. 智能提示、代码操作与重构

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 触发代码建议/IntelliSense | `Ctrl+Space` / `Ctrl+I` | `⌃Space` / `⌘I` | `Ctrl+Space` / `Ctrl+I` | `editor.action.triggerSuggest` |
| 显示/隐藏建议详情 | `Ctrl+Space` | `⌃Space` | `Ctrl+Space` | `toggleSuggestionDetails` |
| 切换建议列表焦点 | `Ctrl+Alt+Space` | `⌃⌥Space` | `Ctrl+Alt+Space` | `toggleSuggestionFocus` |
| 触发参数提示 | `Ctrl+Shift+Space` | `⇧⌘Space` | `Ctrl+Shift+Space` | `editor.action.triggerParameterHints` |
| 显示悬停信息 | `Ctrl+K Ctrl+I` | `⌘K ⌘I` | `Ctrl+K Ctrl+I` | `editor.action.showHover` |
| 快速修复/代码操作 | `Ctrl+.` | `⌘.` | `Ctrl+.` | `editor.action.quickFix` |
| 重命名符号 | `F2` | `F2` | `F2` | `editor.action.rename` |
| 转到定义 | `F12` | `F12` | `F12` | `editor.action.revealDefinition` |
| 查看定义（Peek） | `Alt+F12` | `⌥F12` | `Ctrl+Shift+F10` | `editor.action.peekDefinition` |
| 在侧边打开定义 | `Ctrl+K F12` | `⌘K F12` | `Ctrl+K F12` | `editor.action.revealDefinitionAside` |
| 转到引用 | `Shift+F12` | `⇧F12` | `Shift+F12` | `editor.action.goToReferences` |
| 替换为下一个值 | `Ctrl+Shift+.` | `⇧⌘.` | `Ctrl+Shift+.` | `editor.action.inPlaceReplace.down` |
| 替换为上一个值 | `Ctrl+Shift+,` | `⇧⌘,` | `Ctrl+Shift+,` | `editor.action.inPlaceReplace.up` |

> “转到实现”“转到类型定义”“重构”等命令的可用性取决于当前语言服务。部分命令默认未绑定快捷键，可在命令面板中搜索并自行设置。

---

## 8. 代码与文件导航

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 显示工作区所有符号 | `Ctrl+T` | `⌘T` | `Ctrl+T` | `workbench.action.showAllSymbols` |
| 转到行 | `Ctrl+G` | `⌃G` | `Ctrl+G` | `workbench.action.gotoLine` |
| 转到文件/快速打开 | `Ctrl+P` | `⌘P` | `Ctrl+P` | `workbench.action.quickOpen` |
| 转到当前文件中的符号 | `Ctrl+Shift+O` | `⇧⌘O` | `Ctrl+Shift+O` | `workbench.action.gotoSymbol` |
| 显示问题面板 | `Ctrl+Shift+M` | `⇧⌘M` | `Ctrl+Shift+M` | `workbench.actions.view.problems` |
| 转到下一个错误或警告 | `F8` | `F8` | `F8` | `editor.action.marker.nextInFiles` |
| 转到上一个错误或警告 | `Shift+F8` | `⇧F8` | `Shift+F8` | `editor.action.marker.prevInFiles` |
| 浏览当前编辑器组历史 | `Ctrl+Tab` | `⌃Tab` | `Ctrl+Tab` | `workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup` |
| 向后导航 | `Alt+←` | `⌃-` | `Ctrl+Alt+-` | `workbench.action.navigateBack` |
| 向前导航 | `Alt+→` | `⌃⇧-` | `Ctrl+Shift+-` | `workbench.action.navigateForward` |
| 快速输入界面返回上一级 | `Alt+←` | `⌃-` | `Ctrl+Alt+-` | `workbench.action.quickInputBack` |
| 聚焦面包屑导航 | `Ctrl+Shift+;` | `⇧⌘;` | `Ctrl+Shift+;` | `breadcrumbs.focus` |
| 聚焦并选择面包屑项目 | `Ctrl+Shift+.` | `⇧⌘.` | `Ctrl+Shift+.` | `breadcrumbs.focusAndSelect` |

### Quick Open 输入前缀

在 `Ctrl+P` / `⌘P` 的快速打开框中输入：

| 前缀 | 作用 |
|---|---|
| 不输入前缀 | 按名称查找文件 |
| `>` | 显示并搜索全部命令 |
| `@` | 转到当前文件中的符号 |
| `@:` | 按类别分组显示当前文件符号 |
| `#` | 搜索工作区符号 |
| `:` 加行号 | 转到当前文件指定行 |

---

## 9. 编辑器与窗口管理

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 拆分编辑器 | `Ctrl+\` | `⌘\` | `Ctrl+\` | `workbench.action.splitEditor` |
| 聚焦第 1 个编辑器组 | `Ctrl+1` | `⌘1` | `Ctrl+1` | `workbench.action.focusFirstEditorGroup` |
| 聚焦第 2 个编辑器组 | `Ctrl+2` | `⌘2` | `Ctrl+2` | `workbench.action.focusSecondEditorGroup` |
| 聚焦第 3 个编辑器组 | `Ctrl+3` | `⌘3` | `Ctrl+3` | `workbench.action.focusThirdEditorGroup` |
| 聚焦左侧编辑器组 | `Ctrl+K Ctrl+←` | `⌘K ⌘←` | `Ctrl+K Ctrl+←` | `workbench.action.focusLeftGroup` |
| 聚焦右侧编辑器组 | `Ctrl+K Ctrl+→` | `⌘K ⌘→` | `Ctrl+K Ctrl+→` | `workbench.action.focusRightGroup` |
| 向左移动编辑器标签 | `Ctrl+Shift+PageUp` | `⌘K ⇧⌘←` | `Ctrl+Shift+PageUp` | `workbench.action.moveEditorLeftInGroup` |
| 向右移动编辑器标签 | `Ctrl+Shift+PageDown` | `⌘K ⇧⌘→` | `Ctrl+Shift+PageDown` | `workbench.action.moveEditorRightInGroup` |
| 向左移动当前编辑器组 | `Ctrl+K ←` | `⌘K ←` | `Ctrl+K ←` | `workbench.action.moveActiveEditorGroupLeft` |
| 向右移动当前编辑器组 | `Ctrl+K →` | `⌘K →` | `Ctrl+K →` | `workbench.action.moveActiveEditorGroupRight` |
| 将当前编辑器移到下一组 | `Ctrl+Alt+→` | `⌃⌘→` | `Ctrl+Alt+→` | `workbench.action.moveEditorToNextGroup` |
| 将当前编辑器移到上一组 | `Ctrl+Alt+←` | `⌃⌘←` | `Ctrl+Alt+←` | `workbench.action.moveEditorToPreviousGroup` |

---

## 10. 界面、面板与显示

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 切换全屏 | `F11` | `⌃⌘F` | `F11` | `workbench.action.toggleFullScreen` |
| 切换 Zen 模式 | `Ctrl+K Z` | `⌘K Z` | `Ctrl+K Z` | `workbench.action.toggleZenMode` |
| 退出 Zen 模式 | `Escape Escape` | `Escape Escape` | `Escape Escape` | `workbench.action.exitZenMode` |
| 放大界面 | `Ctrl+=` | `⌘=` | `Ctrl+=` | `workbench.action.zoomIn` |
| 缩小界面 | `Ctrl+-` | `⌘-` | `Ctrl+-` | `workbench.action.zoomOut` |
| 重置缩放 | `Ctrl+Numpad0` | `⌘Numpad0` | `Ctrl+Numpad0` | `workbench.action.zoomReset` |
| 切换侧边栏 | `Ctrl+B` | `⌘B` | `Ctrl+B` | `workbench.action.toggleSidebarVisibility` |
| 显示资源管理器/切换焦点 | `Ctrl+Shift+E` | `⇧⌘E` | `Ctrl+Shift+E` | `workbench.view.explorer` |
| 显示搜索 | `Ctrl+Shift+F` | `⇧⌘F` | `Ctrl+Shift+F` | `workbench.view.search` |
| 显示源代码管理 | `Ctrl+Shift+G` | `⌃⇧G` | `Ctrl+Shift+G` | `workbench.view.scm` |
| 显示运行和调试 | `Ctrl+Shift+D` | `⇧⌘D` | `Ctrl+Shift+D` | `workbench.view.debug` |
| 显示扩展 | `Ctrl+Shift+X` | `⇧⌘X` | `Ctrl+Shift+X` | `workbench.view.extensions` |
| 显示输出面板 | `Ctrl+Shift+U` | `⇧⌘U` | `Ctrl+K Ctrl+H` | `workbench.action.output.toggleOutput` |
| 打开外部命令行/终端 | `Ctrl+Shift+C` | `⇧⌘C` | `Ctrl+Shift+C` | `workbench.action.terminal.openNativeConsole` |
| 切换编辑器水平/垂直布局 | `Shift+Alt+0` | `⌥⌘0` | `Shift+Alt+0` | `workbench.action.toggleEditorGroupLayout` |

---

## 11. 代码折叠

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 折叠当前区域 | `Ctrl+Shift+[` | `⌥⌘[` | `Ctrl+Shift+[` | `editor.fold` |
| 展开当前区域 | `Ctrl+Shift+]` | `⌥⌘]` | `Ctrl+Shift+]` | `editor.unfold` |
| 切换当前区域折叠状态 | `Ctrl+K Ctrl+L` | `⌘K ⌘L` | `Ctrl+K Ctrl+L` | `editor.toggleFold` |
| 递归折叠所有子区域 | `Ctrl+K Ctrl+[` | `⌘K ⌘[` | `Ctrl+K Ctrl+[` | `editor.foldRecursively` |
| 递归展开所有子区域 | `Ctrl+K Ctrl+]` | `⌘K ⌘]` | `Ctrl+K Ctrl+]` | `editor.unfoldRecursively` |
| 折叠所有区域 | `Ctrl+K Ctrl+0` | `⌘K ⌘0` | `Ctrl+K Ctrl+0` | `editor.foldAll` |
| 展开所有区域 | `Ctrl+K Ctrl+J` | `⌘K ⌘J` | `Ctrl+K Ctrl+J` | `editor.unfoldAll` |

---

## 12. 注释、格式化与语言模式

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 添加行注释 | `Ctrl+K Ctrl+C` | `⌘K ⌘C` | `Ctrl+K Ctrl+C` | `editor.action.addCommentLine` |
| 删除行注释 | `Ctrl+K Ctrl+U` | `⌘K ⌘U` | `Ctrl+K Ctrl+U` | `editor.action.removeCommentLine` |
| 切换行注释 | `Ctrl+/` | `⌘/` | `Ctrl+/` | `editor.action.commentLine` |
| 切换块注释 | `Shift+Alt+A` | `⇧⌥A` | `Ctrl+Shift+A` | `editor.action.blockComment` |
| 格式化整个文档 | `Shift+Alt+F` | `⇧⌥F` | `Ctrl+Shift+I` | `editor.action.formatDocument` |
| 格式化选中内容 | `Ctrl+K Ctrl+F` | `⌘K ⌘F` | `Ctrl+K Ctrl+F` | `editor.action.formatSelection` |
| 删除行尾空格 | `Ctrl+K Ctrl+X` | `⌘K ⌘X` | `Ctrl+K Ctrl+X` | `editor.action.trimTrailingWhitespace` |
| 更改文件语言模式 | `Ctrl+K M` | `⌘K M` | `Ctrl+K M` | `workbench.action.editor.changeLanguageMode` |

---

## 13. 调试

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开运行和调试视图 | `Ctrl+Shift+D` | `⇧⌘D` | `Ctrl+Shift+D` | `workbench.view.debug` |
| 开始调试 | `F5` | `F5` | `F5` | `workbench.action.debug.start` |
| 继续 | `F5` | `F5` | `F5` | `workbench.action.debug.continue` |
| 不调试直接运行 | `Ctrl+F5` | `⌃F5` | `Ctrl+F5` | `workbench.action.debug.run` |
| 暂停 | `F6` | `F6` | `F6` | `workbench.action.debug.pause` |
| 设置/取消断点 | `F9` | `F9` | `F9` | `editor.debug.action.toggleBreakpoint` |
| 单步跳过（Step Over） | `F10` | `F10` | `F10` | `workbench.action.debug.stepOver` |
| 单步进入（Step Into） | `F11` | `F11` | `F11` | `workbench.action.debug.stepInto` |
| 单步跳出（Step Out） | `Shift+F11` | `⇧F11` | `Shift+F11` | `workbench.action.debug.stepOut` |
| 重启调试 | `Ctrl+Shift+F5` | `⇧⌘F5` | `Ctrl+Shift+F5` | `workbench.action.debug.restart` |
| 停止调试 | `Shift+F5` | `⇧F5` | `Shift+F5` | `workbench.action.debug.stop` |
| 打开调试控制台 | `Ctrl+Shift+Y` | `⇧⌘Y` | `Ctrl+Shift+Y` | `workbench.debug.action.toggleRepl` |
| 在变量区域中过滤 | `Ctrl+Alt+F` | `⌥⌘F` | `Ctrl+Alt+F` | — |
| 显示悬停信息 | `Ctrl+K Ctrl+I` | `⌘K ⌘I` | `Ctrl+K Ctrl+I` | `editor.action.showHover` |

> `F5` 在未调试时表示“开始调试”，调试过程中表示“继续”；VS Code 会根据 `when` 条件决定实际执行的命令。

---

## 14. 集成终端

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 显示/隐藏集成终端 | ``Ctrl+` `` | ``⌃` `` | ``Ctrl+` `` | `workbench.action.terminal.toggleTerminal` |
| 新建终端 | ``Ctrl+Shift+` `` | ``⌃⇧` `` | ``Ctrl+Shift+` `` | `workbench.action.terminal.new` |
| 复制终端选中内容 | `Ctrl+C` | `⌘C` | `Ctrl+Shift+C` | `workbench.action.terminal.copySelection` |
| 粘贴到终端 | `Ctrl+V` | `⌘V` | `Ctrl+Shift+V` | `workbench.action.terminal.paste` |
| 终端向上滚动一行 | `Ctrl+↑` | `⌘↑` | `Ctrl+Shift+↑` | `workbench.action.terminal.scrollUp` |
| 终端向下滚动一行 | `Ctrl+↓` | `⌘↓` | `Ctrl+Shift+↓` | `workbench.action.terminal.scrollDown` |
| 终端向上翻页 | `Shift+PageUp` | `PageUp` | `Shift+PageUp` | `workbench.action.terminal.scrollUpPage` |
| 终端向下翻页 | `Shift+PageDown` | `PageDown` | `Shift+PageDown` | `workbench.action.terminal.scrollDownPage` |
| 滚动到终端顶部 | `Ctrl+Home` | `⌘Home` | `Shift+Home` | `workbench.action.terminal.scrollToTop` |
| 滚动到终端底部 | `Ctrl+End` | `⌘End` | `Shift+End` | `workbench.action.terminal.scrollToBottom` |
| 打开终端中检测到的链接 | `Ctrl+Shift+O` | `⇧⌘O` | `Ctrl+Shift+O` | `workbench.action.terminal.openDetectedLink` |
| 终端中启动内联 Chat | `Ctrl+I` | `⌘I` | `Ctrl+I` | `workbench.action.terminal.chat.start` |

### 终端使用注意

- Windows 终端中，`Ctrl+C` 仅在有选中内容时复制；没有选择时通常向进程发送中断信号。
- macOS 使用标准的 `⌘C` / `⌘V` 复制粘贴。
- Linux 终端使用 `Ctrl+Shift+C` / `Ctrl+Shift+V`，以免与 Shell 的控制字符冲突。
- “拆分终端”“终止终端”“聚焦上一个/下一个终端”等命令可能因版本和上下文具有不同默认绑定，建议在快捷键设置中搜索 `Terminal:` 查看本机结果。

---

## 15. Git 与源代码管理

### 默认快捷键

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开源代码管理视图 | `Ctrl+Shift+G` | `⌃⇧G` | `Ctrl+Shift+G` | `workbench.view.scm` |
| 打开/转到下一个差异 | `F7` | `F7` | `F7` | `editor.action.accessibleDiffViewer.next` / 依上下文变化 |
| 转到上一个差异 | `Shift+F7` | `⇧F7` | `Shift+F7` | `editor.action.accessibleDiffViewer.prev` / 依上下文变化 |

### 默认未分配快捷键的常用 Git 命令

下列命令通常通过 `Ctrl+Shift+P` / `⇧⌘P` 打开命令面板后搜索。默认键位可能为空，也可能被扩展重新分配：

| 命令面板中搜索的名称 | 作用 |
|---|---|
| `Git: Stage Changes` | 暂存当前更改 |
| `Git: Stage All Changes` | 暂存全部更改 |
| `Git: Unstage Changes` | 取消暂存 |
| `Git: Commit` | 提交 |
| `Git: Commit All` | 提交全部更改 |
| `Git: Pull` | 拉取远程更改 |
| `Git: Push` | 推送本地提交 |
| `Git: Sync` | 同步拉取与推送 |
| `Git: Checkout to...` | 切换分支或标签 |
| `Git: Create Branch...` | 创建分支 |
| `Git: View History` | 查看历史记录 |
| `Git: Open Changes` | 打开当前文件的差异视图 |
| `Git: Stage Selected Ranges` | 暂存选中的代码范围 |

> Git 操作没有统一的大量默认快捷键，这是 VS Code 的有意设计。建议只为自己高频使用的 `Stage`、`Commit`、`Push` 等命令设置自定义组合，避免误操作。

---

## 16. Markdown

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开/切换 Markdown 预览 | `Ctrl+Shift+V` | `⇧⌘V` | `Ctrl+Shift+V` | `markdown.togglePreview` |
| 在侧边打开 Markdown 预览 | `Ctrl+K V` | `⌘K V` | `Ctrl+K V` | `markdown.showPreviewToSide` |

---

## 17. 任务

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 运行生成任务（Build Task） | `Ctrl+Shift+B` | `⇧⌘B` | `Ctrl+Shift+B` | `workbench.action.tasks.build` |

其他任务命令可在命令面板中搜索：

- `Tasks: Run Task`
- `Tasks: Run Test Task`
- `Tasks: Restart Running Task`
- `Tasks: Terminate Task`
- `Tasks: Configure Task`

这些命令多数默认未分配快捷键。

---

## 18. AI、Chat 与内联建议

> 此部分随 VS Code 版本、GitHub Copilot 功能和登录状态变化较快。以下为 2026-07 官方文档中的默认按键。

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开 Chat 视图 | `Ctrl+Alt+I` | `⌃⌘I` | `Ctrl+Alt+I` | `workbench.action.chat.open` |
| 以 Agent 模式打开 Chat | `Ctrl+Shift+I` | `⇧⌘I` | `Ctrl+Shift+Alt+I` | `workbench.action.chat.openagent` |
| 在编辑器中启动内联 Chat | `Ctrl+I` | `⌘I` | `Ctrl+I` | `inlineChat.start` |
| 在终端中启动内联 Chat | `Ctrl+I` | `⌘I` | `Ctrl+I` | `workbench.action.terminal.chat.start` |
| 打开 Quick Chat | `Ctrl+Shift+Alt+L` | `⇧⌥⌘L` | `Ctrl+Shift+Alt+L` | `workbench.action.quickchat.toggle` |
| 打开 Agent 选择器 | `Ctrl+.` | `⌘.` | `Ctrl+.` | `workbench.action.chat.openModePicker` |
| 打开语言模型选择器 | `Ctrl+Alt+.` | `⌥⌘.` | `Ctrl+Alt+.` | `workbench.action.chat.openModelPicker` |
| 新建 Chat 会话 | `Ctrl+N` | `⌘N` | `Ctrl+N` | `workbench.action.chat.newChat` |
| 接受内联建议/下一编辑建议 | `Tab` | `Tab` | `Tab` | `editor.action.inlineSuggest.commit` |
| 关闭内联建议 | `Escape` | `Escape` | `Escape` | — |

> `Ctrl+N`、`⌘N`、`Ctrl+.`、`⌘.` 等按键会根据当前焦点执行不同命令。例如在普通编辑器中 `Ctrl+.` / `⌘.` 通常是“快速修复”，在 Chat 中则可能打开 Agent 选择器。

---

## 19. 无障碍与键盘操作

| 功能 | Windows | macOS | Linux |
|---|---|---|---|
| 打开无障碍帮助 | `Alt+F1` | `⌥F1` | `Shift+Alt+F1` |
| 打开无障碍视图 | `Alt+F2` | `⌥F2` | `Shift+Alt+F2` |
| 聚焦界面下一部分 | `F6` | `F6` | `F6` |
| 聚焦界面上一部分 | `Shift+F6` | `⇧F6` | `Shift+F6` |
| 从输入框转到结果 | `Ctrl+↓` | `⌘↓` | `Ctrl+↓` |
| 从结果返回输入框 | `Ctrl+↑` | `⌘↑` | `Ctrl+↑` |
| 转到下一个差异 | `F7` | `F7` | `F7` |
| 转到上一个差异 | `Shift+F7` | `⇧F7` | `Shift+F7` |
| 终端无障碍视图中的符号导航 | `Ctrl+Shift+O` | `⇧⌘O` | `Ctrl+Shift+O` |

---

## 20. 首选项与个性化

| 功能 | Windows | macOS | Linux | 命令 ID |
|---|---|---|---|---|
| 打开设置 | `Ctrl+,` | `⌘,` | `Ctrl+,` | `workbench.action.openSettings` |
| 打开键盘快捷方式 | `Ctrl+K Ctrl+S` | `⌘K ⌘S` | `Ctrl+K Ctrl+S` | `workbench.action.openGlobalKeybindings` |
| 选择颜色主题 | `Ctrl+K Ctrl+T` | `⌘K ⌘T` | `Ctrl+K Ctrl+T` | `workbench.action.selectTheme` |
| 更改语言模式 | `Ctrl+K M` | `⌘K M` | `Ctrl+K M` | `workbench.action.editor.changeLanguageMode` |

---

## 21. 查看真正完整的系统快捷键

任何静态清单都无法永久覆盖 VS Code 的全部快捷键，因为系统快捷键会受到以下因素影响：

- Windows、macOS、Linux 的默认绑定不同；
- 当前 VS Code 版本不同；
- 当前键盘布局不同；
- 当前焦点和 `when` 条件不同；
- 已安装扩展会新增、覆盖或移除按键；
- 用户自己的 `keybindings.json` 会覆盖默认规则。

因此，查看本机“真正完整列表”的可靠方式如下。

### 方法一：打开键盘快捷方式编辑器

1. 按 `Ctrl+K Ctrl+S`（Windows / Linux）或 `⌘K ⌘S`（macOS）。
2. 点击右上角“更多操作”。
3. 选择 **Show System Keybindings（显示系统快捷键）**。

### 方法二：打开默认快捷键 JSON

1. 按 `Ctrl+Shift+P` / `⇧⌘P`。
2. 搜索并执行：

```text
Preferences: Open Default Keyboard Shortcuts (JSON)
```

这里会显示当前版本、当前平台的完整默认规则，包括：

- `key`：按键；
- `command`：命令 ID；
- `when`：快捷键生效条件；
- 同一按键在不同上下文中的多条绑定。

### 方法三：按命令或按键筛选

打开“键盘快捷方式”后，可以使用：

```text
@source:default
```

仅显示内置默认快捷键。

```text
@source:user
```

仅显示用户修改过的快捷键。

```text
@source:extension
```

仅显示扩展提供的快捷键。

点击搜索框右侧的“录制按键”图标，再按下一组快捷键，可以反查这组按键绑定了哪些命令。

---

## 22. 自定义快捷键

### 图形界面修改

1. 打开“键盘快捷方式”；
2. 搜索命令；
3. 点击命令左侧铅笔图标；
4. 按下新的组合键；
5. 按 `Enter` 保存。

### 编辑 `keybindings.json`

打开命令面板，搜索：

```text
Preferences: Open Keyboard Shortcuts (JSON)
```

示例：

```jsonc
[
  {
    "key": "ctrl+alt+f",
    "command": "editor.action.formatDocument",
    "when": "editorTextFocus && !editorReadonly"
  }
]
```

### 删除某条默认绑定

在命令 ID 前添加 `-`：

```jsonc
[
  {
    "key": "tab",
    "command": "-jumpToNextSnippetPlaceholder"
  }
]
```

### 一组快捷键依次执行多个命令

```jsonc
[
  {
    "key": "ctrl+alt+c",
    "command": "runCommands",
    "args": {
      "commands": [
        "editor.action.copyLinesDownAction",
        "cursorUp",
        "editor.action.addCommentLine",
        "cursorDown"
      ]
    }
  }
]
```

---

## 23. 快捷键冲突排查

### 查看同键冲突

1. 打开“键盘快捷方式”；
2. 找到目标命令；
3. 右键选择 **Show Same Keybindings（显示相同快捷键）**；
4. 对比命令的 `when` 条件、来源和优先级。

### 开启快捷键故障排查日志

1. 打开命令面板；
2. 执行：

```text
Developer: Toggle Keyboard Shortcuts Troubleshooting
```

3. 按下有问题的快捷键；
4. 在输出面板查看 VS Code 实际识别到的按键、匹配的命令和生效的 `when` 条件。

### 常见冲突来源

- 输入法或系统全局快捷键；
- macOS Mission Control、Spotlight 等系统功能；
- Linux 桌面环境窗口管理快捷键；
- 显卡、截图、剪贴板或鼠标增强软件；
- Vim、Emacs、Sublime、IntelliJ Keymap 扩展；
- GitHub Copilot、Chat 或其他扩展新增的上下文快捷键；
- 非美式键盘上反引号、斜杠、方括号等符号位置不同。

---

## 官方资料来源

本文优先使用 VS Code 官方资料，并在 2026-07-25 进行交叉核对：

1. [VS Code：Default keyboard shortcuts reference](https://code.visualstudio.com/docs/reference/default-keybindings)
2. [VS Code：Keyboard shortcuts / Customize keybindings](https://code.visualstudio.com/docs/configure/keybindings)
3. [VS Code：Windows 官方快捷键 PDF](https://go.microsoft.com/fwlink/?linkid=832145)
4. [VS Code：macOS 官方快捷键 PDF](https://go.microsoft.com/fwlink/?linkid=832143)
5. [VS Code：Linux 官方快捷键 PDF](https://go.microsoft.com/fwlink/?linkid=832144)
6. [VS Code：Basic Editing](https://code.visualstudio.com/docs/editing/codebasics)
7. [VS Code：Code Navigation](https://code.visualstudio.com/docs/editing/editingevolved)
8. [VS Code：IntelliSense](https://code.visualstudio.com/docs/editing/intellisense)
9. [VS Code：Debugging](https://code.visualstudio.com/docs/debugtest/debugging)
10. [VS Code：Terminal Basics](https://code.visualstudio.com/docs/terminal/basics)
11. [VS Code：Staging and committing changes](https://code.visualstudio.com/docs/sourcecontrol/staging-commits)
12. [VS Code：Accessibility](https://code.visualstudio.com/docs/configure/accessibility/accessibility)
13. [VS Code：AI features cheat sheet](https://code.visualstudio.com/docs/agents/reference/ai-features-cheat-sheet)

---

## 版本说明

- 本文整理的是 VS Code 内置常用默认快捷键，以及官方文档明确列出的终端、调试、Chat 和无障碍快捷键。
- “最全”不等于把每个扩展、每种语言插件和每条未绑定命令都强行分配按键。VS Code 官方也明确建议：完整系统规则应通过 **Open Default Keyboard Shortcuts (JSON)** 查看。
- 如果本表与本机不一致，请以当前 VS Code 的快捷键编辑器、默认快捷键 JSON、键盘布局和扩展配置为准。

