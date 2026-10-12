# Academic batch progress

- 生成日期：2026-07-22
- 平台：macOS
- 数据状态：`curated`
- 覆盖说明：只补齐按 `ShortcutStore.swift` 当前资源顺序合并后仍为 `catalogOnly` 或 0 条的软件；已有非空后置覆盖的软件未重写。
- 明确跳过的后置非空包：Microsoft Word、Microsoft Excel、Microsoft PowerPoint、Microsoft OneNote、Apple Pages、Apple Numbers、Apple Keynote、MATLAB。

## 软件清单与真实边界

| 分组 | 软件 | ID | 第一轮 | Round 2 新增 | 最终条数 | 版本/上下文边界 |
|---|---|---:|---:|---:|---:|---|
| 学习与科研 | Adobe Acrobat | `adobeacrobat` | 20 | 9 | 29 | 以 Acrobat 当前默认单键/菜单映射为边界；阅读顺序、表单和工具面板快捷键随版本与工作区变化。 |
| 数据与人工智能 | Adobe Firefly | `adobefirefly` | 15 | 9 | 24 | 主要覆盖 Firefly Boards 画布；生成式模块、浏览器保留键和实验功能会随服务更新。 |
| 数据与人工智能 | Amplitude | `amplitude` | 3 | 0 | 3 | Amplitude 快捷键依赖当前分析视图和工作区配置；仅收录稳定的全局导航键。 |
| 学习与科研 | Anki | `anki` | 13 | 9 | 22 | 评分键受牌组按钮数量和复习模式影响；浏览器、编辑器与复习界面的同键含义不同。 |
| 学习与科研 | Calibre | `calibre` | 18 | 3 | 21 | 字母键仅在书库主列表聚焦时有效；阅读器和电子书编辑器有各自可配置快捷键。 |
| 数据与人工智能 | ChatGPT | `chatgpt` | 8 | 0 | 8 | 伴随窗口全局键可在设置中更改；功能键随 ChatGPT macOS 版本和账户能力更新。 |
| 学习与科研 | ChemDraw | `chemdraw` | 18 | 3 | 21 | 覆盖 ChemDraw 默认菜单与常用结构编辑键；工具热键、模板和脚本可能因版本、工作区及用户定制而变化。 |
| 生物信息 | ChimeraX | `chimerax` | 16 | 3 | 19 | ChimeraX 的主要操作通过命令行完成，键盘映射可由 bundles 和用户配置扩展；未把命令文本伪装成快捷键。 |
| 数据与人工智能 | Claude | `claude` | 6 | 0 | 6 | 全局快速输入键可更改；Claude 桌面版的导航和实验功能会随版本更新。 |
| 生物信息 | CLC Genomics Workbench | `clcgenomics` | 19 | 3 | 22 | 仅覆盖工作台通用默认键；序列、比对、树和工作流编辑器具有上下文专属及可配置映射。 |
| 数据与人工智能 | Codex | `codex` | 7 | 0 | 7 | 覆盖 Codex macOS 客户端当前常用全局键；编辑器焦点、终端及实验功能可能接管相同按键。 |
| 数据与人工智能 | ComfyUI | `comfyui` | 17 | 0 | 17 | 节点扩展可注册或覆盖键位；画布键仅在工作流区域聚焦且输入框未激活时有效。 |
| 仿真 | COMSOL Multiphysics | `comsol` | 18 | 3 | 21 | 模型树、几何、结果图与方法编辑器拥有不同上下文键；求解与构建键可能随 COMSOL 版本变化。 |
| 学习与科研 | DeepL | `deepl` | 5 | 3 | 8 | 双击复制键是可配置的全局调用方式；可用性受辅助功能权限、焦点和客户端设置影响。 |
| 电子工程 | Eagle | `eagle` | 20 | 3 | 23 | EAGLE/Fusion Electronics 的命令别名和单键映射可自定义，且原理图与电路板编辑器上下文不同。 |
| 学习与科研 | EndNote | `endnote` | 18 | 3 | 21 | 部分命令取决于资料库窗口、在线搜索模式、写作插件和 EndNote 版本。 |
| 学习与科研 | Evernote | `evernote` | 16 | 3 | 19 | 新版编辑器、旧版客户端和全局快捷键设置存在差异；仅覆盖当前 Mac 客户端常用默认项。 |
| 生物信息 | FlowJo | `flowjo` | 17 | 3 | 20 | 门控、布局、表格和工作区窗口的键位不同；插件、版本及用户偏好可改变映射。 |
| 学习与科研 | Goodnotes | `goodnotes` | 16 | 12 | 28 | 键盘键依赖文稿编辑、文本框和页面导航焦点；手写工具仍以触控板或触控笔操作为主。 |
| 办公 | Google Docs | `googledocs` | 18 | 13 | 31 | 浏览器和系统保留键可能优先；部分高级键需启用兼容的浏览器快捷键或屏幕阅读器模式。 |
| 办公 | Google Sheets | `googlesheets` | 20 | 15 | 35 | 浏览器和输入法可能拦截组合键；公式编辑、数据透视表及屏幕阅读器模式另有上下文键。 |
| 办公 | Google Slides | `googleslides` | 17 | 11 | 28 | 对象编辑、幻灯片缩略图和放映模式会改变同一按键含义；浏览器保留键可能优先。 |
| 学习与科研 | Grammarly | `grammarly` | 7 | 0 | 7 | Grammarly 的建议导航随宿主应用、浏览器扩展或桌面编辑器而异；未推断宿主软件专属快捷键。 |
| 数据与人工智能 | GraphPad Prism | `graphpadprism` | 18 | 3 | 21 | 数据表、图形、布局和分析对话框使用不同上下文键；具体命令会随 Prism 版本变化。 |
| 医学影像 | Horos | `horos` | 20 | 3 | 23 | 影像浏览器与二维、三维查看器键位不同；工具栏热键和鼠标手势可在偏好设置中定制。 |
| 学习与科研 | ImageJ / Fiji | `imagej` | 22 | 14 | 36 | 单字母命令依赖图像窗口焦点；Fiji 插件、宏和用户安装命令可注册或覆盖快捷键。 |
| 数据与人工智能 | JMP | `jmp` | 18 | 3 | 21 | 数据表、报告、图形和脚本编辑器上下文不同；平台版本和自定义菜单会改变快捷键。 |
| 学习与科研 | JupyterLab | `jupyter` | 18 | 12 | 30 | 命令模式与编辑模式必须区分；JupyterLab 键位可由设置、扩展和浏览器覆盖，终端标签页另有 shell 快捷键。 |
| 数据与人工智能 | LM Studio | `lmstudio` | 7 | 3 | 10 | 聊天、模型加载、开发者服务器和提示词编辑器的键位不同；应用版本可能调整导航键。 |
| 仿真 | LTspice | `ltspice` | 22 | 3 | 25 | macOS 版与 Windows 版界面及键位不同；这里仅收录 Mac 编辑器常用默认键，波形窗口另有上下文操作。 |
| 数据与人工智能 | Maple | `maple` | 18 | 3 | 21 | 工作表、文档模式、代码编辑器与调试器映射不同；功能键还可能受 macOS 键盘设置影响。 |
| 化学 | MarvinSketch | `marvinsketch` | 20 | 3 | 23 | 绘图工具单键会随 Marvin 版本和界面模式变化；仅覆盖通用文档与稳定编辑操作。 |
| 数据与人工智能 | Wolfram Mathematica | `mathematica` | 20 | 3 | 23 | Notebook、文本输入、二维数学输入和前端菜单有不同键位；Esc 别名和功能键依赖输入上下文。 |
| 生物信息 | MEGA | `mega` | 18 | 3 | 21 | 序列编辑器、比对探索器、系统发育树和主窗口的键位不同；分析流程与版本会改变命令。 |
| 学习与科研 | Mendeley Reference Manager | `mendeley` | 14 | 3 | 17 | Reference Manager 与旧版 Mendeley Desktop 不同；PDF 阅读器、文献库和引用插件各有上下文键。 |
| 数据与人工智能 | Midjourney | `midjourney` | 4 | 0 | 4 | Midjourney 主要通过网页或 Discord 命令操作，没有完整稳定的 macOS 应用快捷键集；未把命令名当作按键。 |
| 学习与科研 | MindNode | `mindnode` | 19 | 3 | 22 | 节点编辑与文字编辑焦点会改变 Return、Tab 等按键含义；样式与任务功能还有版本相关键位。 |
| 数据与人工智能 | Mixpanel | `mixpanel` | 3 | 0 | 3 | Mixpanel 网页快捷键随报告类型、浏览器和工作区功能更新；仅收录稳定全局导航键。 |
| 电子工程 | MPLAB X IDE | `mplabx` | 21 | 3 | 24 | NetBeans 平台键位可通过 Keymap 修改；调试器、编辑器和不同工具链插件会增加或覆盖快捷键。 |
| 学习与科研 | Obsidian | `obsidian` | 17 | 11 | 28 | Obsidian 核心命令及插件键位均可由用户重映射；部分列出的默认键可能被 Vim 模式或编辑器焦点覆盖。 |
| 医学影像 | OsiriX | `osirix` | 20 | 3 | 23 | 影像数据库、二维查看器和三维重建窗口键位不同；工具热键与鼠标操作可由偏好设置修改。 |
| 办公 | Microsoft Outlook | `outlook` | 18 | 11 | 29 | 新版 Outlook 与旧版 Outlook for Mac 的导航键存在差异；组织策略、阅读窗格和撰写窗口会影响键位。 |
| 学习与科研 | Overleaf | `overleaf` | 17 | 0 | 17 | 源码编辑器、富文本编辑器及 PDF 预览器键位不同；浏览器或 Vim/Emacs 编辑模式可覆盖默认键。 |
| 学习与科研 | ParaView | `paraview` | 21 | 9 | 30 | 渲染视图、管线浏览器、电子表格和动画视图上下文不同；插件可注册额外快捷键。 |
| 学习与科研 | PDF Expert | `pdfexpert` | 21 | 2 | 23 | 阅读、批注、表单和编辑模式的工具键不同；部分高级命令取决于订阅版本。 |
| 数据与人工智能 | Pika | `pika` | 3 | 0 | 3 | Pika 网页端没有公开的完整稳定 macOS 快捷键集；仅收录输入与浮层交互的通用默认键。 |
| 数据与人工智能 | Power BI (Web) | `powerbiweb` | 8 | 0 | 8 | Power BI 网页端官方说明大量使用无修饰的可访问性键；视觉对象、编辑模式和浏览器焦点会改变行为，未转换 Windows 键。 |
| 学习与科研 | Preview | `preview` | 22 | 13 | 35 | PDF、图像、选区和标记文本框的上下文键不同；系统版本可能调整工具栏与侧边栏命令。 |
| 学习与科研 | PyMOL | `pymol` | 20 | 3 | 23 | PyMOL 主要通过命令行和鼠标模式操作；插件、启动脚本和用户键绑定可覆盖单键行为。 |
| 学习与科研 | RStudio | `rstudio` | 23 | 14 | 37 | RStudio Desktop、Server、Quarto 和不同编辑模式的键位会有差异；自定义键位及浏览器保留键可能覆盖默认项。 |
| 数据与人工智能 | Runway | `runway` | 18 | 0 | 18 | 时间线键仅适用于相应编辑器；Runway 网页产品迭代快，不同生成工具可能没有同一套键位。 |
| 数据与人工智能 | SAS Studio | `sasstudio` | 15 | 4 | 19 | SAS Studio 版本、浏览器及编辑器设置可能更改功能键；流程、查询和程序编辑器上下文不同。 |
| 学习与科研 | Scrivener | `scrivener` | 21 | 3 | 24 | 活页夹、编辑器、软木板、提纲和写作模式使用不同上下文键；用户可通过 macOS 菜单快捷键定制。 |
| 仿真 | Simulink | `simulink` | 23 | 3 | 26 | 模型画布、Stateflow、查找器和仿真数据检查器键位不同；版本及自定义快捷键会改变映射。 |
| 生物信息 | SnapGene | `snapgene` | 22 | 3 | 25 | 地图、序列、历史记录和比对视图上下文不同；部分分子克隆命令随 SnapGene 版本变化。 |
| 学习与科研 | IBM SPSS Statistics | `spss` | 19 | 10 | 29 | 数据编辑器、语法编辑器、输出查看器和对话框键位不同；功能受 SPSS 版本与 macOS 键盘设置影响。 |
| 数据与人工智能 | Stable Diffusion WebUI | `stablediffusion` | 5 | 0 | 5 | AUTOMATIC1111 及其扩展没有统一稳定的完整快捷键集；生成键和画布键依赖版本、扩展与焦点。 |
| 数据与人工智能 | Stata | `stata` | 20 | 3 | 23 | 主窗口、脚本编辑器、数据编辑器和图形窗口键位不同；用户首选项可重映射编辑器命令。 |
| 电子工程 | STM32CubeIDE | `stm32cubeide` | 22 | 13 | 35 | 基于 Eclipse 的键位受所选 Key Scheme、透视图、调试器和插件影响；功能键也可能需要按 Fn。 |
| 数据与人工智能 | Tableau | `tableau` | 20 | 3 | 23 | 工作表、仪表板、故事和数据源页面键位不同；Tableau Desktop 与网页编辑不完全一致。 |
| 学习与科研 | TeXstudio | `texstudio` | 22 | 3 | 25 | 默认构建工具链可自定义；编辑器、内嵌 PDF 查看器和不同键盘布局会改变部分功能键。 |
| 学习与科研 | Ulysses | `ulysses` | 16 | 3 | 19 | Markdown XL 标记键依赖文本选择和编辑焦点；发布、导出与目标功能会随版本和订阅变化。 |
| 办公 | WPS Office | `wpsoffice` | 20 | 13 | 33 | 文字、表格、演示和 PDF 模块并非同一套键位；WPS 版本、语言和用户自定义会影响快捷键。 |
| 学习与科研 | XMind | `xmind` | 18 | 3 | 21 | 思维导图编辑、文字编辑和演示模式的同键含义不同；不同 XMind 版本提供的结构命令会变化。 |
| 学习与科研 | Zotero | `zotero` | 19 | 3 | 22 | 资料库、PDF 阅读器、笔记编辑器和文字处理器插件有不同键位；Zotero 偏好设置可修改部分命令。 |

## Round 2 深度补全统计

- 第二轮新增：303 条，涉及 52 款软件；最终总数：1367 条。
- 重点扩展：macOS 窗口管理、Office Web 格式与导航、Jupyter 命令模式、RStudio 运行与窗格、ImageJ 工具、Preview 页面/侧边栏、SPSS 语法、STM32CubeIDE 调试，以及 Outlook 邮件导航。
- 主动不扩充的 13 款：`amplitude`、`chatgpt`、`claude`、`codex`、`comfyui`、`grammarly`、`midjourney`、`mixpanel`、`overleaf`、`pika`、`powerbiweb`、`runway`、`stablediffusion`。这些软件或服务缺少稳定的全局默认快捷键体系，或第一轮已覆盖当前可确认的默认项；未用浏览器通用键或 Windows 文档推断凑数。
- 第二轮同时校正 5 个既有键位：Preview 幻灯片放映；RStudio 源代码窗格、控制台窗格和清空控制台；SAS Studio 代码补全。校正不计入“Round 2 新增”。

## 验证口径

- 不含 `Ctrl`、`Alt`、`Win`、`Windows` 或 `⊞` 键名；实际 Control 键统一写为 `⌃`，Command/Option/Shift 分别写为 `⌘`/`⌥`/`⇧`。
- 每条快捷键均含中英文动作名和 `tags` 数组；ID 使用 `academic.<software>.<action>` 前缀，便于稳定去重。
- `coverage=curated-comprehensive-defaults` 表示尽可能全面覆盖公开默认及稳定常用项，不声称穷尽插件、自定义键位、所有编辑器模式或未来版本。
- 集成边界：批次按任务要求使用 `dataStatus: curated`；当前应用侧 `SoftwareDataStatus` 枚举尚未声明该值，在把本批次加入应用资源加载链之前需同步扩展枚举，否则 Swift 解码会拒绝整份资源。
