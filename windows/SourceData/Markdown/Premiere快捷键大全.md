# Adobe Premiere Pro 快捷键大全（Windows / macOS）

> 用户原词：Premium；本文按 **Adobe Premiere Pro（Pr）** 整理。  
> 更新日期：2026-07-25  
> 适用范围：Adobe Premiere Pro / Premiere 2024—2026，兼顾近年 Creative Cloud 版本。  
> 键位基准：`Adobe Premiere Pro Default` 默认预设、美国英语键盘布局。  
> 收录量：250+ 条“命令—按键”映射，含默认键、面板键、工具键和需核对预设的经典键位。  
> 整理原则：Adobe 官方 2026 年表为主，官方工作流文档和行业资料补漏；带“依版本/预设”的组合请在当前软件的“键盘快捷键”窗口确认。

---

## 目录

1. [符号、版本与焦点说明](#1-符号版本与焦点说明)
2. [最高频快捷键速查](#2-最高频快捷键速查)
3. [文件、项目和通用编辑](#3-文件项目和通用编辑)
4. [工具面板快捷键](#4-工具面板快捷键)
5. [播放、定位和 J-K-L 控制](#5-播放定位和-j-k-l-控制)
6. [入点、出点、插入、覆盖、提升和提取](#6-入点出点插入覆盖提升和提取)
7. [剪辑、修剪和时间轴](#7-剪辑修剪和时间轴)
8. [素材、链接、速度和音频](#8-素材链接速度和音频)
9. [标记、字幕和图形文字](#9-标记字幕和图形文字)
10. [工作区、窗口和面板切换](#10-工作区窗口和面板切换)
11. [项目、媒体浏览器和监视器面板](#11-项目媒体浏览器和监视器面板)
12. [效果、混音器、历史和元数据面板](#12-效果混音器历史和元数据面板)
13. [多机位剪辑](#13-多机位剪辑)
14. [自定义、备份、打印和冲突排查](#14-自定义备份打印和冲突排查)
15. [资料来源](#15-资料来源)

---

## 1. 符号、版本与焦点说明

| 写法 | 含义 |
|---|---|
| `Ctrl + K` | 同时按住 `Ctrl` 和 `K` |
| `Cmd` | macOS 的 Command（⌘）键 |
| `Option` | macOS 的 Option（⌥）键，部分键盘标为 Alt |
| `Shift + 1` | 顶部数字行的 `1`，不是数字键盘 |
| `,` / `.` | 逗号键 / 句号键 |
| `[` / `]` | 左 / 右方括号键 |
| `;` / `'` | 分号键 / 单引号键 |
| `` ` `` / `~` | Esc 下方的重音/波浪号键 |
| `Forward Delete` | Mac 扩展键盘的向前删除；MacBook 通常按 `Fn + Delete` |
| “无默认” | 命令存在，但 Adobe 默认预设没有绑定，可自行设置 |

### 为什么同一个键会执行不同命令

Premiere 快捷键分为三类：

- **应用程序快捷键**：通常全局生效，例如保存、导入、导出。
- **面板快捷键**：只有焦点在指定面板时生效，例如项目面板的 `Ctrl/Cmd + B` 新建素材箱。
- **工具快捷键**：切换时间轴工具，例如 `V` 选择、`C` 剃刀。

焦点是 Premiere 快捷键最常见的“失效”原因。例如 `Ctrl/Cmd + R` 在“素材”语境中打开速度/持续时间，但在节目监视器中用于显示标尺。

### 默认预设差异

- Premiere 可加载 Adobe 默认、Final Cut Pro、Avid Media Composer 或自定义 `.kys` 预设。
- 键盘布局非美式时，`~`、反斜杠、方括号、分号和单引号位置可能不同。
- 新版本可能新增命令但不一定分配默认键；本文不会把自定义建议伪装成默认键。

---

## 2. 最高频快捷键速查

| 功能 | Windows | macOS |
|---|---|---|
| 新建项目 | `Ctrl + Alt + N` | `Option + Cmd + N` |
| 新建序列 | `Ctrl + N` | `Cmd + N` |
| 打开项目 | `Ctrl + O` | `Cmd + O` |
| 保存 | `Ctrl + S` | `Cmd + S` |
| 另存为 | `Ctrl + Shift + S` | `Shift + Cmd + S` |
| 导入 | `Ctrl + I` | `Cmd + I` |
| 导出媒体 | `Ctrl + M` | `Cmd + M` |
| 撤销 / 重做 | `Ctrl + Z / Ctrl + Shift + Z` | `Cmd + Z / Shift + Cmd + Z` |
| 播放 / 停止 | `Space` | `Space` |
| 反向 / 停止 / 正向播放 | `J / K / L` | `J / K / L` |
| 标记入点 / 出点 | `I / O` | `I / O` |
| 清除入点和出点 | `Ctrl + Shift + X` | `Option + X` |
| 插入 / 覆盖 | `, / .` | `, / .` |
| 提升 / 提取 | `; / '` | `; / '` |
| 添加剪辑点 | `Ctrl + K` | `Cmd + K` |
| 所有目标轨道添加剪辑点 | `Ctrl + Shift + K` | `Shift + Cmd + K` |
| 默认视频转场 | `Ctrl + D` | `Cmd + D` |
| 默认音频转场 | `Ctrl + Shift + D` | `Shift + Cmd + D` |
| 匹配帧 | `F` | `F` |
| 吸附开关 | `S` | `S` |
| 选择工具 / 剃刀工具 | `V / C` | `V / C` |
| 波纹编辑 / 滚动编辑 | `B / N` | `B / N` |
| 速率伸缩 / 滑移 / 滑动 | `R / Y / U` | `R / Y / U` |
| 波纹修剪到播放头 | `Q / W` | `Q / W`（默认预设） |
| 音频增益 | `G` | `G` |
| 速度/持续时间 | `Ctrl + R` | `Cmd + R` |
| 添加标记 | `M` | `M` |
| 放大 / 缩小时间轴 | `= / -` | `= / -` |
| 最大化鼠标所在面板 | `` ` `` / `~` | `` ` `` / `~` |
| 键盘快捷键窗口 | `Ctrl + Alt + K` | `Cmd + Option + K` |

---

## 3. 文件、项目和通用编辑

### 3.1 文件菜单

| 命令 | Windows | macOS |
|---|---|---|
| 新建项目 | `Ctrl + Alt + N` | `Option + Cmd + N` |
| 新建序列 | `Ctrl + N` | `Cmd + N` |
| 打开项目 | `Ctrl + O` | `Cmd + O` |
| 关闭 | `Ctrl + W` | `Cmd + W` |
| 关闭项目 | `Ctrl + Shift + W` | `Shift + Cmd + W` |
| 保存 | `Ctrl + S` | `Cmd + S` |
| 另存为 | `Ctrl + Shift + S` | `Shift + Cmd + S` |
| 保存副本 | `Ctrl + Alt + S` | `Option + Cmd + S` |
| 从媒体浏览器导入 | `Ctrl + Alt + I` | `Option + Cmd + I` |
| 导入 | `Ctrl + I` | `Cmd + I` |
| 导出媒体 | `Ctrl + M` | `Cmd + M` |
| 发送到 Media Encoder | `Alt + Shift + M` | `Option + Shift + M` |
| 获取所选媒体文件属性 | `Ctrl + Shift + H` | `Shift + Cmd + H` |
| 退出 Premiere | `Ctrl + Q` | `Cmd + Q` |

### 3.2 编辑菜单

| 命令 | Windows | macOS |
|---|---|---|
| 撤销 | `Ctrl + Z` | `Cmd + Z` |
| 重做 | `Ctrl + Shift + Z` | `Shift + Cmd + Z` |
| 剪切 | `Ctrl + X` | `Cmd + X` |
| 复制 | `Ctrl + C` | `Cmd + C` |
| 粘贴 | `Ctrl + V` | `Cmd + V` |
| 粘贴属性 | `Ctrl + Alt + V` | `Option + Cmd + V` |
| 清除/删除 | `Delete` | `Forward Delete` |
| 波纹删除 | `Shift + Delete` | `Shift + Forward Delete` |
| 复制所选项 | `Ctrl + Shift + /` | `Shift + Cmd + /` |
| 全选 | `Ctrl + A` | `Cmd + A` |
| 取消全选 | `Ctrl + Shift + A` | `Shift + Cmd + A` |
| 查找 | `Ctrl + F` | `Cmd + F` |
| 编辑原始文件 | `Ctrl + E` | `Cmd + E` |
| 打开键盘快捷键窗口 | `Ctrl + Alt + K` | `Cmd + Option + K` |

### 3.3 经典采集命令（依设备与版本）

| 命令 | Windows | macOS |
|---|---|---|
| 采集 | `F5` | `F5`（必要时加 `Fn`） |
| 批量采集 | `F6` | `F6`（必要时加 `Fn`） |

> DV/HDV 磁带采集等传统工作流在新硬件和新版 Premiere 中可能不可用，但命令仍可能存在于旧项目或旧版本中。

---

## 4. 工具面板快捷键

| 工具 | Windows | macOS | 作用 |
|---|---|---|---|
| 选择工具（Selection） | `V` | `V` | 选择、移动、调整剪辑和对象 |
| 向前选择轨道（Track Select Forward） | `A` | `A` | 选择点击位置右侧的剪辑 |
| 向后选择轨道（Track Select Backward） | `Shift + A` | `Shift + A` | 选择点击位置左侧的剪辑 |
| 波纹编辑（Ripple Edit） | `B` | `B` | 修剪并自动关闭/扩展时间线空隙 |
| 滚动编辑（Rolling Edit） | `N` | `N` | 同时调整相邻剪辑的出点和入点 |
| 速率伸缩（Rate Stretch） | `R` | `R` | 通过改变速度匹配持续时间 |
| 剃刀（Razor） | `C` | `C` | 在点击位置切割剪辑 |
| 滑移（Slip） | `Y` | `Y` | 保持剪辑位置和长度，改变内部入/出点 |
| 滑动（Slide） | `U` | `U` | 移动剪辑并修剪相邻剪辑 |
| 钢笔（Pen） | `P` | `P` | 添加/编辑关键帧和路径点 |
| 手形（Hand） | `H` | `H` | 平移时间轴视图 |
| 缩放（Zoom） | `Z` | `Z` | 放大时间轴；按住 `Alt/Option` 通常缩小 |
| 文字（Type） | `T` | `T` | 创建和编辑文字 |

提示：按住 `Shift` 使用轨道选择、剃刀等工具时，经常会临时切换到“全部轨道”或相关变体。新版的生成式扩展、重混等工具可能没有稳定的默认单键，请在快捷键窗口搜索命令名。

---

## 5. 播放、定位和 J-K-L 控制

### 5.1 基础播放

| 命令 | Windows | macOS |
|---|---|---|
| 播放/停止 | `Space` | `Space` |
| 反向穿梭播放 | `J` | `J` |
| 停止穿梭 | `K` | `K` |
| 正向穿梭播放 | `L` | `L` |
| 慢速反向播放 | `Shift + J` | `Shift + J` |
| 慢速正向播放 | `Shift + L` | `Shift + L` |
| 播放编辑点周围 | `Shift + K` | `Shift + K` |
| 播放入点到出点 | `Ctrl + Shift + Space` | `Option + K` 或依预设 |

### 5.2 逐帧、编辑点和序列导航

| 命令 | Windows | macOS |
|---|---|---|
| 后退/前进 1 帧 | `← / →` | `← / →` |
| 后退/前进 5 帧 | `Shift + ← / →` | `Shift + ← / →` |
| 上一个/下一个编辑点 | `↑ / ↓` | `↑ / ↓` |
| 序列开头/结尾 | `Home / End` | `Home / End`（MacBook 可能需 `Fn`） |
| 上一/下一屏时间轴 | `Page Up / Page Down` | `Page Up / Page Down` |
| 转到入点/出点 | `Shift + I / Shift + O` | `Shift + I / Shift + O` |
| 匹配帧 | `F` | `F` |
| 反向匹配帧 | `Shift + R` | `Shift + R` |
| 在项目中显示匹配素材 | `Shift + F`（常用默认） | `Shift + F`（常用默认） |

### 5.3 面板与焦点导航

| 命令 | Windows | macOS |
|---|---|---|
| 选择下一个面板 | `Ctrl + Shift + .`（依预设） | `Control + Shift + .`（依预设） |
| 选择上一个面板 | `Ctrl + Shift + ,`（依预设） | `Control + Shift + ,`（依预设） |
| 最大化/还原鼠标所在面板 | `` ` `` / `~` | `` ` `` / `~` |
| 关闭当前面板/窗口 | `Ctrl + W`（依上下文） | `Cmd + W`（依上下文） |

---

## 6. 入点、出点、插入、覆盖、提升和提取

### 6.1 标记范围

| 命令 | Windows | macOS |
|---|---|---|
| 标记入点 | `I` | `I` |
| 标记出点 | `O` | `O` |
| 标记剪辑 | `X` | `X` |
| 标记所选范围 | `/` | `/` |
| 转到入点 | `Shift + I` | `Shift + I` |
| 转到出点 | `Shift + O` | `Shift + O` |
| 清除入点 | `Ctrl + Shift + I` | `Option + I` |
| 清除出点 | `Ctrl + Shift + O` | `Option + O` |
| 清除入点和出点 | `Ctrl + Shift + X` | `Option + X` |

### 6.2 三点/四点编辑

| 命令 | Windows | macOS |
|---|---|---|
| 插入（Insert） | `,` | `,` |
| 覆盖（Overwrite） | `.` | `.` |
| 提升（Lift） | `;` | `;` |
| 提取（Extract） | `'` | `'` |

解释：

- **插入**会推开后续素材；**覆盖**会覆盖目标位置已有内容。
- **提升**会留下空隙；**提取**会闭合被移除区间。
- 结果受源补丁、轨道目标、同步锁定和入/出点共同影响。

---

## 7. 剪辑、修剪和时间轴

### 7.1 添加剪辑点、默认转场和吸附

| 命令 | Windows | macOS |
|---|---|---|
| 添加剪辑点 | `Ctrl + K` | `Cmd + K` |
| 所有目标轨道添加剪辑点 | `Ctrl + Shift + K` | `Shift + Cmd + K` |
| 打开修剪编辑 | `Shift + T` | `Cmd + T` |
| 将所选编辑点扩展到播放头 | `E` | `E` |
| 应用默认视频转场 | `Ctrl + D` | `Cmd + D` |
| 应用默认音频转场 | `Ctrl + Shift + D` | `Shift + Cmd + D` |
| 对所选项应用默认转场 | `Shift + D` | `Shift + D` |
| 吸附开关 | `S` | `S` |
| 创建子序列 | `Shift + U` | `Cmd + U` |

### 7.2 波纹修剪到播放头

| 命令 | Windows | macOS |
|---|---|---|
| 将上一编辑点波纹修剪到播放头 | `Q` | `Q` |
| 将下一编辑点波纹修剪到播放头 | `W` | `W` |

> `Q/W` 是剪辑师最常用的默认键之一，但自定义、Final Cut Pro 或 Avid 预设可能不同。它们会立即改变时间轴，请先确认轨道目标与同步锁定。

### 7.3 时间轴缩放、轨道高度和工作区范围

| 命令 | Windows | macOS |
|---|---|---|
| 放大 / 缩小时间轴 | `= / -` | `= / -` |
| 适配整个序列到窗口 | `\`（常用默认） | `\`（常用默认） |
| 降低/增加音频轨高度 | `Alt + - / Alt + =` | `Option + - / Option + =` |
| 降低/增加视频轨高度 | `Ctrl + - / Ctrl + =` | `Cmd + - / Cmd + =` |
| 设置工作区入点/出点 | `Alt + [ / Alt + ]` | `Option + [ / Option + ]` |
| 上一/下一屏 | `Page Up / Page Down` | `Page Up / Page Down` |

### 7.4 移动剪辑（Nudge）

| 命令 | Windows | macOS |
|---|---|---|
| 所选剪辑左移 1 帧 | `Alt + ←` | `Cmd + ←` |
| 所选剪辑右移 1 帧 | `Alt + →` | `Cmd + →` |
| 所选剪辑左移 5 帧 | `Alt + Shift + ←` | `Shift + Cmd + ←` |
| 所选剪辑右移 5 帧 | `Alt + Shift + →` | `Shift + Cmd + →` |

### 7.5 滑动编辑（Slide）

| 命令 | Windows | macOS |
|---|---|---|
| 所选剪辑向左滑动 1 帧 | `Alt + ,` | `Option + ,` |
| 所选剪辑向右滑动 1 帧 | `Alt + .` | `Option + .` |
| 所选剪辑向左滑动 5 帧 | `Alt + Shift + ,` | `Option + Shift + ,` |
| 所选剪辑向右滑动 5 帧 | `Alt + Shift + .` | `Option + Shift + .` |

### 7.6 滑移编辑（Slip）

| 命令 | Windows | macOS |
|---|---|---|
| 所选剪辑向左滑移 1 帧 | `Ctrl + Alt + ←` | `Option + Cmd + ←` |
| 所选剪辑向右滑移 1 帧 | `Ctrl + Alt + →` | `Option + Cmd + →` |
| 所选剪辑向左滑移 5 帧 | `Ctrl + Alt + Shift + ←` | `Option + Shift + Cmd + ←` |
| 所选剪辑向右滑移 5 帧 | `Ctrl + Alt + Shift + →` | `Option + Shift + Cmd + →` |

### 7.7 删除和选择

| 命令 | Windows | macOS |
|---|---|---|
| 清除所选项 | `Backspace` 或 `Delete`（依面板） | `Delete` |
| 波纹删除（编辑菜单） | `Shift + Delete` | `Shift + Forward Delete` |
| 波纹删除（时间轴面板备用） | `Alt + Backspace` | `Option + Delete` |
| 选择播放头下方剪辑 | `D`（常用默认） | `D`（常用默认） |
| 取消全部选择 | `Ctrl + Shift + A` | `Shift + Cmd + A` |

### 7.8 渲染与序列导航

| 命令 | Windows | macOS |
|---|---|---|
| 渲染入点到出点的效果 | `Enter` | `Enter` |
| 序列中的下一个项目 | `Shift + ;` | `Shift + ;` |
| 序列中的上一个项目 | `Ctrl + Shift + ;` | `Option + ;` |

---

## 8. 素材、链接、速度和音频

### 8.1 素材菜单

| 命令 | Windows | macOS |
|---|---|---|
| 创建子剪辑 | `Ctrl + U` | `Cmd + U` |
| 音频声道 | `Shift + G` | `Shift + G` |
| 音频增益 | `G` | `G` |
| 速度/持续时间 | `Ctrl + R` | `Cmd + R` |
| 启用/禁用剪辑 | `Shift + E` | `Shift + Cmd + E` |
| 链接/取消链接 | `Ctrl + L` | `Cmd + L` |
| 组合 | `Ctrl + G` | `Cmd + G` |
| 取消组合 | `Ctrl + Shift + G` | `Shift + Cmd + G` |

### 8.2 音量和音频常用键

| 命令 | Windows | macOS |
|---|---|---|
| 降低/提高剪辑音量 | `[ / ]`（常见默认） | `[ / ]`（常见默认） |
| 较大幅度降低/提高剪辑音量 | `Shift + [ / Shift + ]`（依预设） | 同左（依预设） |
| 应用默认音频转场 | `Ctrl + Shift + D` | `Shift + Cmd + D` |
| 播放/暂停所选媒体 | `Space` | `Space` |

### 8.3 音视频同步相关提示

- `Ctrl/Cmd + L` 只改变“链接”状态，不会移动素材。
- 波纹删除、Q/W 修剪和插入编辑会受 **同步锁定（Sync Lock）** 影响。
- 源补丁（Source Patching）决定插入/覆盖时源视频与音频进入哪些轨道。
- 许多“选择下一轨道、切换轨道目标、切换同步锁定”命令默认没有键，适合自行绑定。

---

## 9. 标记、字幕和图形文字

### 9.1 标记

| 命令 | Windows | macOS |
|---|---|---|
| 添加标记 | `M` | `M` |
| 下一标记 | `Shift + M` | `Shift + M` |
| 上一标记 | `Ctrl + Shift + M` | `Shift + Cmd + M` |
| 清除所选标记 | `Ctrl + Alt + M` | `Option + M` |
| 清除全部标记 | `Ctrl + Alt + Shift + M` | `Option + Cmd + M` |

提示：在不少版本中，于已有标记位置再次按 `M` 可打开或编辑标记；若行为不同，请在快捷键窗口搜索“Edit Marker”。

### 9.2 字幕

| 命令 | Windows | macOS |
|---|---|---|
| 新建字幕轨 | `Ctrl + Alt + A` | `Option + Cmd + A` |
| 在播放头添加字幕 | `Ctrl + Alt + C` | `Option + Cmd + C` |
| 下一字幕片段 | `Ctrl + Alt + ↓` | `Option + Cmd + ↓` |
| 上一字幕片段 | `Ctrl + Alt + ↑` | `Option + Cmd + ↑` |

### 9.3 图形和标题图层

| 命令 | Windows | macOS |
|---|---|---|
| 新建文字图层 | `Ctrl + T` | `Cmd + T` |
| 新建矩形 | `Ctrl + Alt + R` | `Option + Cmd + R` |
| 新建椭圆 | `Ctrl + Alt + E` | `Option + Cmd + E` |
| 置于顶层 | `Ctrl + Shift + ]` | `Shift + Cmd + ]` |
| 上移一个层级 | `Ctrl + ]` | `Cmd + ]` |
| 下移一个层级 | `Ctrl + [` | `Cmd + [` |
| 置于底层 | `Ctrl + Shift + [` | `Shift + Cmd + [` |
| 选择下一图层 | `Ctrl + Alt + ]` | `Option + Cmd + ]` |
| 选择上一图层 | `Ctrl + Alt + [` | `Option + Cmd + [` |

---

## 10. 工作区、窗口和面板切换

### 10.1 工作区

| 工作区 | Windows | macOS |
|---|---|---|
| 所有面板 | `Alt + Shift + 1` | `Option + Shift + 1` |
| 组装 | `Alt + Shift + 2` | `Option + Shift + 2` |
| 音频 | `Alt + Shift + 3` | `Option + Shift + 3` |
| 字幕和图形 | `Alt + Shift + 4` | `Option + Shift + 4` |
| 颜色 | `Alt + Shift + 5` | `Option + Shift + 5` |
| 编辑 | `Alt + Shift + 6` | `Option + Shift + 6` |
| 效果 | `Alt + Shift + 7` | `Option + Shift + 7` |
| 基本/Essentials | `Alt + Shift + 8` | `Option + Shift + 8` |
| 学习 | `Alt + Shift + 9` | `Option + Shift + 9` |
| 重置为已保存布局 | `Alt + Shift + 0` | `Option + Shift + 0` |

> 工作区名称可能随语言、版本或自行保存的工作区而变化，但官方默认数字映射通常保持一致。

### 10.2 直接聚焦常用面板

| 面板 | Windows | macOS |
|---|---|---|
| 项目（Project） | `Shift + 1` | `Shift + 1` |
| 源监视器 | `Shift + 2` | `Shift + 2` |
| 时间轴 | `Shift + 3` | `Shift + 3` |
| 节目监视器 | `Shift + 4` | `Shift + 4` |
| 效果控件 | `Shift + 5` | `Shift + 5` |
| 音轨混合器 | `Shift + 6` | `Shift + 6` |
| 效果 | `Shift + 7` | `Shift + 7` |
| 媒体浏览器 | `Shift + 8` | `Shift + 8` |
| 音频剪辑混合器 | `Shift + 9` | `Shift + 9` |
| 最大化/还原面板 | `` ` `` / `~` | `` ` `` / `~` |

---

## 11. 项目、媒体浏览器和监视器面板

### 11.1 项目面板

| 命令 | Windows | macOS |
|---|---|---|
| 新建素材箱（Bin） | `Ctrl + B` | `Cmd + B` |
| 删除 | `Backspace` | `Delete` |
| 列表视图 | `Ctrl + Page Up` | `Cmd + Page Up` |
| 图标视图 | `Ctrl + Page Down` | `Cmd + Page Down` |
| 悬停擦洗开关 | `Shift + H` | `Shift + H` |
| 带选项删除所选项 | `Ctrl + Delete` | `Cmd + Forward Delete` |
| 向下/左/右/上扩展选择 | `Shift + ↓ / ← / → / ↑` | 同左 |
| 所选项向下/左/右/上移动 | `↓ / ← / → / ↑` | 同左 |
| 移到首项/末项 | `Home / End` | `Home / End` |
| 上一页/下一页 | `Page Up / Page Down` | `Page Up / Page Down` |
| 下一/上一列字段 | `Tab / Shift + Tab` | `Tab / Shift + Tab` |
| 下一/上一行字段 | `Enter / Shift + Enter` | `Return / Shift + Return` |
| 在源监视器打开 | `Shift + O` | `Shift + O` |
| 增大/减小缩略图 | `Shift + ] / Shift + [` | 同左 |
| 切换视图 | `Shift + \` | `Shift + \` |
| 放大/缩小 | `= / -` | `= / -` |

### 11.2 媒体浏览器

| 命令 | Windows | macOS |
|---|---|---|
| 在源监视器打开 | `Shift + O` | `Shift + O` |
| 选择目录列表 | `Shift + ←` | `Shift + ←` |
| 选择媒体列表 | `Shift + →` | `Shift + →` |

### 11.3 节目监视器：标尺、参考线和对象微移

| 命令 | Windows | macOS |
|---|---|---|
| 显示标尺 | `Ctrl + R` | `Cmd + R` |
| 显示参考线 | `Ctrl + ;` | `Cmd + ;` |
| 节目监视器吸附 | `Ctrl + Shift + ;` | `Shift + Cmd + ;` |
| 锁定参考线 | `Ctrl + Alt + Shift + R` | `Option + Shift + Cmd + R` |
| 所选对象上/右/左/下移 1 帧单位 | `Ctrl + ↑ / → / ← / ↓` | `Cmd + ↑ / → / ← / ↓` |
| 所选对象上/右/左/下移 5 帧单位 | `Shift + Ctrl + ↑ / → / ← / ↓` | `Shift + Cmd + ↑ / → / ← / ↓` |

> Adobe 官方表把节目监视器中的对象位置步长描述为“帧”；实际视觉移动单位和画布缩放、图形类型有关。

---

## 12. 效果、混音器、历史和元数据面板

### 12.1 音轨混合器

| 命令 | Windows | macOS |
|---|---|---|
| 显示/隐藏轨道 | `Ctrl + Alt + T` | `Option + Cmd + T` |
| 循环 | `Ctrl + L` | `Cmd + L` |
| 仅计量输入 | `Ctrl + Shift + I` | `Ctrl + Shift + I` |

### 12.2 效果控件

| 命令 | Windows | macOS |
|---|---|---|
| 删除所选效果 | `Backspace` | `Delete` |
| 仅音频播放时循环 | `Ctrl + L` | `Cmd + L` |

### 12.3 效果面板

| 命令 | Windows | macOS |
|---|---|---|
| 新建自定义素材箱 | `Ctrl + /` | `Cmd + /` |
| 删除自定义项目 | `Backspace` | `Delete` |

### 12.4 历史面板

| 命令 | Windows | macOS |
|---|---|---|
| 后退一步 | `←` | `←` |
| 前进一步 | `→` | `→` |
| 删除历史状态 | `Backspace` | `Delete` |

### 12.5 元数据面板

| 命令 | Windows | macOS |
|---|---|---|
| 循环 | `Ctrl + L` | `Cmd + L` |
| 播放 | `Space` | `Space` |

---

## 13. 多机位剪辑

| 命令 | Windows | macOS |
|---|---|---|
| 切换多机位视图 | `Shift + 0`（常用默认） | `Shift + 0`（常用默认） |
| 选择摄像机 1—9（不切割） | `1`—`9` | `1`—`9` |
| 切换并切割到摄像机 1—9 | `Ctrl + 1`—`Ctrl + 9` | `Cmd + 1`—`Cmd + 9` |

注意：

- 多机位命令依赖节目监视器/时间轴焦点和多机位序列状态。
- “选择摄像机”和“切割到摄像机”是不同命令；直播式切换通常用带 `Ctrl/Cmd` 的组合。
- 摄像机超过 9 路或需要仅切换音频时，建议自定义额外快捷键。

---

## 14. 自定义、备份、打印和冲突排查

### 14.1 打开并编辑快捷键

| 操作 | Windows | macOS |
|---|---|---|
| 打开“键盘快捷键” | `Ctrl + Alt + K` | `Cmd + Option + K` |
| 菜单路径 | `编辑 → 键盘快捷键` | `Premiere → 键盘快捷键` |

在窗口中可以：

1. 搜索命令名。
2. 切换 Adobe、Final Cut Pro、Avid 或自定义预设。
3. 把命令拖到虚拟键盘上的按键，或为命令添加组合。
4. 给一个命令分配多个快捷键。
5. 查看冲突并删除旧绑定。
6. 使用“另存为”创建自己的 `.kys` 预设。

### 14.2 复制 `.kys` 预设到另一台电脑

Adobe 官方当前给出的默认保存位置：

| 系统 | 预设目录 |
|---|---|
| Windows | `C:\Users\用户名\Documents\Adobe\Premiere Pro\版本\Profile-用户名\Win\` |
| macOS | `/Users/用户名/Documents/Adobe/Premiere Pro/版本/Profile-用户名/Mac/` |

复制对应 `.kys` 文件到另一台电脑的相同版本/配置目录，然后重启 Premiere 并在快捷键窗口选择该预设。

### 14.3 复制或打印当前快捷键列表

Adobe 提供从“键盘快捷键”窗口复制当前映射的方法：

- Windows：按住 `Ctrl + Shift`，同时从“编辑”菜单打开“键盘快捷键”。
- macOS：按住 `Cmd + Shift`，同时从“Premiere”菜单打开“键盘快捷键”。
- 将复制的内容粘贴到文本编辑器或电子表格，即可搜索、整理和打印；该列表会反映你当前的自定义预设。

### 14.4 常见冲突排查

| 现象 | 常见原因 | 处理建议 |
|---|---|---|
| 快捷键完全无反应 | 焦点在另一个面板或文本输入框 | 先用 `Shift + 1—9` 聚焦目标面板，或单击目标面板 |
| J/K/L 输入成文字 | 焦点在搜索框、字幕或文字编辑 | 按 `Esc` 退出文字输入，再聚焦监视器/时间轴 |
| Q/W 删除了意外轨道内容 | 轨道目标或同步锁定设置不当 | 先检查蓝色轨道目标与 Sync Lock，再执行波纹修剪 |
| `Ctrl/Cmd + R` 行为不符 | 节目监视器中是标尺，素材语境中是速度/持续时间 | 聚焦时间轴或通过“素材”菜单执行 |
| `Ctrl/Cmd + L` 行为不符 | 不同面板分别代表链接或循环 | 确认焦点在时间轴还是混音/效果/元数据面板 |
| 波浪号不能最大化面板 | 非美式键盘位置不同或系统占用 | 搜索“Maximize or Restore Frame”并重新绑定 |
| macOS 功能键触发系统功能 | 系统把 F 键用于亮度、媒体或 Mission Control | 加按 `Fn`，或修改系统键盘设置 |
| 方括号/反斜杠组合不对 | 键盘布局不是 US | 在虚拟键盘中查找实际物理键，建议自定义 |
| 资料中的组合与本机不同 | 使用了 FCP/Avid/旧版/自定义预设 | 打开快捷键窗口查看当前 Preset，并搜索命令名 |
| 新命令没有默认键 | Adobe 新增功能常不自动占用按键 | 为高频命令分配无冲突组合并另存 `.kys` |

### 14.5 推荐优先自定义的无默认命令

这些命令是否已有默认键取决于版本和预设，适合在“键盘快捷键”中搜索后按个人工作流绑定：

- 切换轨道目标、切换同步锁定、源补丁。
- 添加/删除关键帧，下一/上一关键帧。
- 切换代理、显示重复帧标记、启用高质量播放。
- 切换轨道输出、静音、独奏、录音准备。
- 选择下一/上一字幕片段、拆分字幕、创建转录。
- 生成式扩展、重混、场景编辑检测、自动重构图。
- 导出帧、在 Finder/资源管理器中显示、在项目中显示。

---

## 15. 资料来源

### Adobe 官方（主依据）

1. [Adobe Help：Premiere 默认键盘快捷键（中文）](https://helpx.adobe.com/cn/premiere/desktop/get-started/keyboard-shortcuts/default-keyboard-shortcuts.html)
2. [Adobe Help：Default keyboard shortcuts（英文原页）](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/default-keyboard-shortcuts.html)
3. [Adobe Help：自定义键盘快捷键](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/customize-keyboard-shortcuts.html)
4. [Adobe Help：在电脑之间复制 `.kys` 快捷键](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/copy-keyboard-shortcuts-from-one-computer-to-another.html)
5. [Adobe Help：给一个命令分配多个快捷键](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/assign-multiple-keyboard-shortcuts-to-a-command.html)
6. [Adobe Help：查找键盘快捷键](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/find-keyboard-shortcuts.html)
7. [Adobe Help：移除键盘快捷键](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/remove-keyboard-shortcuts.html)
8. [Adobe Help：复制和打印快捷键列表](https://helpx.adobe.com/premiere/desktop/get-started/keyboard-shortcuts/print-keyboard-shortcuts.html)
9. [Adobe Help：Premiere 工具面板](https://helpx.adobe.com/premiere/desktop/get-started/tour-the-workspace/tools-panel-and-options-panel.html)

### 补充交叉检查来源

10. [PremiumBeat：Premiere Pro keyboard shortcut customization](https://www.premiumbeat.com/blog/premiere-pro-keyboard-shortcuts/)

检索与整理日期：2026-07-25。Adobe 默认快捷键主清单页面元数据显示最近更新于 2026-01-07；`.kys` 跨电脑迁移页面最近更新于 2026-02-26。第三方资料仅用于补充经典工作流键位，遇到冲突时以 Adobe 官方页面和你当前预设为准。

---

## 附：剪辑师一分钟记忆法

- **播放**：`J-K-L` 是反向—停—正向；连按 `J/L` 改变速度。
- **范围**：`I/O` 设入出点，逗号/句号插入与覆盖，分号/单引号提升与提取。
- **剪切**：`C` 剃刀，`Ctrl/Cmd + K` 在播放头切割，`Q/W` 从两侧波纹修剪到播放头。
- **修剪工具**：`B/N/R/Y/U` 依次记作波纹、滚动、速率、滑移、滑动。
- **导航**：`↑/↓` 跳编辑点，`←/→` 逐帧，`F` 匹配帧，`S` 吸附。
- **窗口**：`Shift + 1—9` 直达面板，波浪号最大化当前面板。
- **交付**：`Ctrl/Cmd + M` 导出媒体，`Alt/Option + Shift + M` 发送到 Media Encoder。
