# Microsoft Excel 快捷键大全

> 适用平台：Windows、macOS、Excel 网页版、iPad / iPhone、Android  
> 整理日期：2026-07-25  
> 资料基准：Microsoft 官方 Excel 与 Microsoft 365 支持文档  
> 键盘布局：默认按美式键盘（US Keyboard）记录

## 目录

- [使用说明](#使用说明)
- [最值得先记住的 30 个快捷键](#最值得先记住的-30-个快捷键)
- [一、Excel for Windows](#一excel-for-windows)
  - [1. 文件、工作簿与常用操作](#1-文件工作簿与常用操作)
  - [2. 功能区、窗口与视图](#2-功能区窗口与视图)
  - [3. 单元格导航与工作表切换](#3-单元格导航与工作表切换)
  - [4. 选择单元格、行、列与区域](#4-选择单元格行列与区域)
  - [5. 输入、编辑与填充](#5-输入编辑与填充)
  - [6. 复制、粘贴与选择性粘贴](#6-复制粘贴与选择性粘贴)
  - [7. 单元格格式与数字格式](#7-单元格格式与数字格式)
  - [8. 行、列、工作表与分组](#8-行列工作表与分组)
  - [9. 公式、函数、名称与计算](#9-公式函数名称与计算)
  - [10. 查找、替换、排序与筛选](#10-查找替换排序与筛选)
  - [11. 表格、图表、对象与数据透视表](#11-表格图表对象与数据透视表)
  - [12. 批注、注释、拼写与审阅](#12-批注注释拼写与审阅)
  - [13. 外部数据、Power Query、宏与 VBA](#13-外部数据power-query宏与-vba)
  - [14. Power Pivot](#14-power-pivot)
  - [15. Python in Excel](#15-python-in-excel)
  - [16. Copilot in Excel](#16-copilot-in-excel)
  - [17. F1–F12 功能键全集](#17-f1f12-功能键全集)
- [二、Excel for macOS](#二excel-for-macos)
- [三、Excel 网页版](#三excel-网页版)
- [四、iPad 与 iPhone 外接键盘](#四ipad-与-iphone-外接键盘)
- [五、Android 外接键盘](#五android-外接键盘)
- [快捷键冲突与自定义](#快捷键冲突与自定义)
- [官方资料来源](#官方资料来源)

---

## 使用说明

### 按键符号

| 文档写法 | 含义 |
|---|---|
| `Ctrl` / `⌃` | Control |
| `Alt` / `⌥` | Windows Alt / macOS Option |
| `Win` | Windows 徽标键 |
| `Cmd` / `⌘` | macOS Command |
| `Shift` / `⇧` | Shift |
| `Enter` / `Return` / `↵` | 回车键 |
| `Backspace` / `⌫` | 向左删除 |
| `Delete` / `Fn+Delete` | 向右删除或清除单元格 |
| `Space` | 空格键 |
| `PageUp` / `PageDown` | 向上 / 向下翻页 |
| `← ↑ → ↓` | 方向键 |

### 同时按与依次按

- `Ctrl+Shift+L`：三个键同时按。
- `Alt, H, H` 或 `Alt+H, H`：先按 `Alt+H` 打开“开始”选项卡，再按 `H`。逗号表示依次按，不是同时按。
- `Ctrl+Arrow`：`Arrow` 代表任意方向键。

### 版本与兼容性

- 主体适用于 Excel for Microsoft 365、Excel 2024、Excel 2021；绝大多数基础快捷键也适用于 Excel 2019 / 2016。
- Microsoft 官方文档以美式键盘为基准。数字行上的 `~ ! @ # $ % ^ & * ( )` 在其他键盘布局中可能需要不同组合。
- Windows 的 `Alt` 功能区按键提示会受 Excel 语言、版本、当前上下文和加载项影响。本文列出的 `Alt` 序列以当前英文界面为基准；中文版若提示字母不同，以按下 `Alt` 后屏幕显示为准。
- MacBook 顶排按键默认可能控制亮度、音量等系统功能。使用 `F1–F12` 时可能需要加按 `Fn`，也可在系统设置中将其改为标准功能键。
- 网页版会与浏览器快捷键冲突，因此部分组合与桌面版不同。
- 带有“上下文相关”的快捷键，只有焦点位于相应单元格、图表、数据透视表、任务窗格或对话框时才生效。
- 动态数组版本通常不再需要用 `Ctrl+Shift+Enter` 提交数组公式；该组合仍适用于旧式 CSE 数组公式和兼容场景。

---

## 最值得先记住的 30 个快捷键

| 功能 | Windows | macOS | 网页版 |
|---|---|---|---|
| 新建工作簿 | `Ctrl+N` | `⌘N` | 浏览器地址栏输入 `excel.new` |
| 打开 | `Ctrl+O` | `⌘O` | `Ctrl+O`，可能由浏览器接管 |
| 保存 | `Ctrl+S` | `⌘S` | 自动保存；`Ctrl+S` 可能由浏览器接管 |
| 打印 | `Ctrl+P` | `⌘P` | `Ctrl+P` |
| 撤销 | `Ctrl+Z` | `⌘Z` | `Ctrl+Z` |
| 重做 | `Ctrl+Y` | `⌘Y` / `⇧⌘Z` | `Ctrl+Y` |
| 剪切 / 复制 / 粘贴 | `Ctrl+X / C / V` | `⌘X / C / V` | `Ctrl+X / C / V` |
| 查找 | `Ctrl+F` | `⌘F` / `Ctrl+F` | `Ctrl+F` / `Shift+F3` |
| 替换 | `Ctrl+H` | `Ctrl+H` / `⇧⌘H` | 使用“查找”菜单 |
| 转到指定单元格 | `Ctrl+G` / `F5` | `Ctrl+G` / `F5` | `Ctrl+G` |
| 编辑活动单元格 | `F2` | `F2` | `F2` |
| 选中整列 | `Ctrl+Space` | `Ctrl+Space` | `Ctrl+Space` |
| 选中整行 | `Shift+Space` | `Shift+Space` | `Shift+Space` |
| 选中当前区域 / 全部 | `Ctrl+A` | `⌘A` | `Ctrl+A` |
| 移到数据区域边缘 | `Ctrl+Arrow` | `⌘+Arrow` | `Ctrl+Arrow` |
| 选择到数据区域边缘 | `Ctrl+Shift+Arrow` | `⇧⌘+Arrow` | `Ctrl+Shift+Arrow` |
| 切换上一 / 下一工作表 | `Ctrl+PageUp / PageDown` | `⌥← / ⌥→` | `Ctrl+Alt+PageUp / PageDown` |
| 单元格内换行 | `Alt+Enter` | `⌥Return` | `Alt+Enter` |
| 同时填充整个选区 | `Ctrl+Enter` | `⌘Return` / `Ctrl+Return` | `Ctrl+Enter` |
| 向下填充 | `Ctrl+D` | `⌘D` / `Ctrl+D` | `Ctrl+D`（视浏览器设置） |
| 快速填充 | `Ctrl+E` | `Ctrl+E` | `Ctrl+E` |
| 自动求和 | `Alt+=` | `⇧⌘T` | `Alt+=` |
| 切换绝对 / 相对引用 | `F4` | `⌘T` / `F4` | `F4` |
| 显示 / 隐藏公式 | ``Ctrl+` `` | ``Ctrl+` `` | 通过功能区 |
| 打开单元格格式 | `Ctrl+1` | `⌘1` | `Ctrl+1` |
| 创建表格 | `Ctrl+T` / `Ctrl+L` | `⌘T` / `Ctrl+T` | `Ctrl+L` |
| 开关自动筛选 | `Ctrl+Shift+L` | `⇧⌘F` / `Ctrl+Shift+L` | `Ctrl+Shift+L` |
| 打开筛选 / 验证下拉菜单 | `Alt+↓` | `⌥↓` | `Alt+↓` |
| 插入当前日期 | `Ctrl+;` | `Ctrl+;` | `Ctrl+;` |
| 插入当前时间 | `Ctrl+Shift+;` | `⌘;` | `Ctrl+Shift+;` |

---

# 一、Excel for Windows

## 1. 文件、工作簿与常用操作

| 操作 | 快捷键 | 说明 |
|---|---|---|
| 新建空白工作簿 | `Ctrl+N` |  |
| 打开工作簿 | `Ctrl+O` |  |
| 保存工作簿 | `Ctrl+S` |  |
| 另存为 | `F12` / `Ctrl+Shift+S` | 部分版本以 `F12` 最稳定 |
| 关闭当前工作簿 | `Ctrl+W` / `Ctrl+F4` | 不一定退出 Excel |
| 退出 Excel | `Alt+F4` |  |
| 打印 | `Ctrl+P` |  |
| 打开“文件”页面 | `Alt+F` |  |
| 撤销 | `Ctrl+Z` |  |
| 重做 / 重复 | `Ctrl+Y` |  |
| 重复上一次命令 | `F4` | 编辑公式引用时用途不同 |
| 剪切 | `Ctrl+X` |  |
| 复制 | `Ctrl+C` |  |
| 粘贴 | `Ctrl+V` |  |
| 清除选中单元格内容 | `Delete` / `Backspace` | 不删除格式、批注或注释 |
| 打开快捷菜单 | `Shift+F10` / 菜单键 | 相当于右键 |
| 打开搜索 /“告诉我” | `Alt+Q` | 可搜索功能命令 |
| 打开帮助 | `F1` |  |

## 2. 功能区、窗口与视图

### 功能区主选项卡

| 操作 | 快捷键 |
|---|---|
| 显示 / 隐藏按键提示 | `Alt` / `F10` |
| 文件 | `Alt+F` |
| 开始 | `Alt+H` |
| 插入 | `Alt+N` |
| 页面布局 | `Alt+P` |
| 公式 | `Alt+M` |
| 数据 | `Alt+A` |
| 审阅 | `Alt+R` |
| 视图 | `Alt+W` |
| 搜索 | `Alt+Q` |

### 在功能区中移动

| 操作 | 快捷键 |
|---|---|
| 进入或退出功能区 | `Alt` / `F10` |
| 在控件间前进 / 后退 | `Tab` / `Shift+Tab` |
| 在选项卡或命令间移动 | `Arrow` |
| 在命令组间移动 | `Ctrl+← / Ctrl+→` |
| 激活选中按钮 | `Space` / `Enter` |
| 打开选中列表 | `↓` |
| 打开选中按钮菜单 | `Alt+↓` |
| 打开快捷菜单 | `Shift+F10` |
| 折叠 / 展开功能区 | `Ctrl+F1` |
| 显示当前功能区项目的提示 | `Ctrl+Shift+F10` |

### 窗口与视图

| 操作 | 快捷键 |
|---|---|
| 在工作表、功能区、任务窗格、缩放控件间切换 | `F6` |
| 反向切换上述区域 | `Shift+F6` |
| 在两个 Excel 窗口间切换 | `Ctrl+F6` |
| 在全部 Excel 窗口间切换 | `Ctrl+Shift+F6` |
| 恢复工作簿窗口大小 | `Ctrl+F5` |
| 最小化工作簿窗口 | `Ctrl+F9` |
| 最大化 / 还原工作簿窗口 | `Ctrl+F10` |
| 全屏 | `Ctrl+Shift+F1` |
| 普通视图 | `Alt, W, L` |
| 页面布局视图 | `Alt, W, P` |
| 分页预览 | `Alt, W, I` |
| 放大 | `Ctrl+Alt+=` |
| 缩小 | `Ctrl+Alt+-` |
| 横向滚动（向上为左，向下为右） | 按住 `Ctrl+Shift` 滚动鼠标滚轮 |

## 3. 单元格导航与工作表切换

| 操作 | 快捷键 |
|---|---|
| 上 / 下 / 左 / 右移动一格 | `↑ / ↓ / ← / →` |
| 向右移动一格 | `Tab` |
| 向左移动一格 | `Shift+Tab` |
| 到当前数据区域边缘 | `Ctrl+Arrow` |
| 进入 End 模式并跳到下一个非空单元格 | `End, Arrow` |
| 到行首 | `Home` |
| 到工作表开头 A1 | `Ctrl+Home` |
| 到工作表最后一个已使用单元格 | `Ctrl+End` |
| 向下 / 向上滚动一屏 | `PageDown / PageUp` |
| 向右 / 向左滚动一屏 | `Alt+PageDown / Alt+PageUp` |
| 下一张 / 上一张工作表 | `Ctrl+PageDown / Ctrl+PageUp` |
| 转到指定单元格或名称 | `Ctrl+G` / `F5` |
| 显示活动单元格（适合大选区） | `Ctrl+Backspace` |
| 打开数据验证下拉列表（当前单元格须有数据验证） | `Alt+↓` |
| 依次选择浮动对象；按 `Esc` 返回网格 | `Ctrl+Alt+5`，然后反复按 `Tab` |
| 在受保护工作表的未锁定单元格间移动 | `Tab` |

## 4. 选择单元格、行、列与区域

| 操作 | 快捷键 |
|---|---|
| 向一个方向扩展一格 | `Shift+Arrow` |
| 扩展到数据区域边缘 | `Ctrl+Shift+Arrow` |
| 扩展到工作表开头 | `Ctrl+Shift+Home` |
| 扩展到最后已使用单元格 | `Ctrl+Shift+End` |
| 选中整列 | `Ctrl+Space` |
| 选中整行 | `Shift+Space` |
| 选中当前区域 / 工作表 | `Ctrl+A` / `Ctrl+Shift+Space` |
| 选中活动单元格周围当前区域 | `Ctrl+Shift+*` |
| 选中可见单元格（筛选或隐藏后复制时非常实用） | `Alt+;` |
| 开启 / 关闭扩展选择模式 | `F8` |
| 将非相邻区域加入选区 | `Shift+F8` |
| 选中当前与下一张工作表 | `Ctrl+Shift+PageDown` |
| 选中当前与上一张工作表 | `Ctrl+Shift+PageUp` |
| 选中当前数组区域 | `Ctrl+/` |
| 选中当前行中与活动单元格不同的单元格 | `Ctrl+\` |
| 选中当前列中与活动单元格不同的单元格 | `Ctrl+Shift+\` |
| 选中直接引用的前置单元格 | `Ctrl+[` |
| 选中全部直接及间接前置单元格 | `Ctrl+Shift+{` |
| 选中直接依赖于活动单元格的单元格 | `Ctrl+]` |
| 选中全部直接及间接依赖单元格 | `Ctrl+Shift+}` |
| 选中对象时选中表中全部对象 | `Ctrl+Shift+Space` |
| 在选区四角间循环 | `Ctrl+.` |

## 5. 输入、编辑与填充

| 操作 | 快捷键 |
|---|---|
| 编辑活动单元格 | `F2` |
| 完成输入并向下移动 | `Enter` |
| 完成输入并向上移动 | `Shift+Enter` |
| 完成输入并向右移动 | `Tab` |
| 完成输入并向左移动 | `Shift+Tab` |
| 取消输入 | `Esc` |
| 单元格内换行 | `Alt+Enter` |
| 用当前输入填充整个选区 | `Ctrl+Enter` |
| 向下填充 | `Ctrl+D` |
| 向右填充 | `Ctrl+R` |
| 快速填充（Flash Fill） | `Ctrl+E` |
| 插入当前日期 | `Ctrl+;` |
| 插入当前时间 | `Ctrl+Shift+;` |
| 从上方单元格复制公式 | `Ctrl+'` |
| 从上方单元格复制显示值 | `Ctrl+Shift+"` |
| 打开插入单元格对话框 | `Ctrl+Shift++` |
| 打开删除单元格对话框 | `Ctrl+-` |
| 插入超链接 | `Ctrl+K` |
| 显示快速分析 | `Ctrl+Q` |
| 创建表格 | `Ctrl+T` / `Ctrl+L` |
| 打开工作簿统计 | `Ctrl+Shift+G` |
| 展开 / 折叠公式栏 | `Ctrl+Shift+U` |
| 公式栏内移到文本结尾 | `Ctrl+End` |
| 公式栏内选到文本结尾 | `Ctrl+Shift+End` |

## 6. 复制、粘贴与选择性粘贴

| 操作 | 快捷键 |
|---|---|
| 剪切 | `Ctrl+X` |
| 复制 | `Ctrl+C` |
| 粘贴 | `Ctrl+V` |
| 打开“选择性粘贴” | `Ctrl+Alt+V` / `Alt, E, S` |

打开“选择性粘贴”后，可按以下字母选择：

| 粘贴内容 | 按键 |
|---|---|
| 全部内容与格式 | `A` |
| 仅公式 | `F` |
| 仅值 | `V` |
| 仅格式 | `T` |
| 仅批注与注释 | `C` |
| 仅数据验证 | `N` |
| 全部内容与格式（All using source theme） | `H` |
| 除边框外全部 | `X` |
| 仅列宽 | `W` |
| 公式与数字格式 | `R` |
| 值与数字格式 | `U` |

> 实用流程：复制后按 `Ctrl+Alt+V, V, Enter`，即可“粘贴为值”。

## 7. 单元格格式与数字格式

### 常用格式

| 操作 | 快捷键 |
|---|---|
| 打开“设置单元格格式” | `Ctrl+1` |
| 打开字体设置 | `Ctrl+Shift+F` |
| 加粗 | `Ctrl+B` / `Ctrl+2` |
| 斜体 | `Ctrl+I` / `Ctrl+3` |
| 下划线 | `Ctrl+U` / `Ctrl+4` |
| 删除线 | `Ctrl+5` |
| 添加外边框 | `Ctrl+Shift+&` |
| 删除外边框 | `Ctrl+Shift+_` |
| 显示 / 隐藏分级显示符号 | `Ctrl+8` |
| 添加边框菜单 | `Alt+H, B` |
| 填充颜色菜单 | `Alt+H, H` |
| 居中对齐 | `Alt+H, A, C` |

### 数字格式

| 格式 | 快捷键 |
|---|---|
| 常规 | `Ctrl+Shift+~` |
| 货币，两位小数 | `Ctrl+Shift+$` |
| 百分比，无小数 | `Ctrl+Shift+%` |
| 科学计数，两位小数 | `Ctrl+Shift+^` |
| 日期（日、月、年） | `Ctrl+Shift+#` |
| 时间（时、分、AM/PM） | `Ctrl+Shift+@` |
| 数值，两位小数与千位分隔符 | `Ctrl+Shift+!` |

## 8. 行、列、工作表与分组

| 操作 | 快捷键 |
|---|---|
| 隐藏选中行 | `Ctrl+9` |
| 取消隐藏行 | `Ctrl+Shift+9` / `Ctrl+Shift+(` |
| 隐藏选中列 | `Ctrl+0` |
| 取消隐藏列 | `Ctrl+Shift+0` / `Ctrl+Shift+)` |
| 插入单元格、行或列 | `Ctrl+Shift++` |
| 删除单元格、行或列 | `Ctrl+-` |
| 通过功能区插入整行 | `Alt+H, I, R` |
| 通过功能区插入整列 | `Alt+H, I, C` |
| 通过功能区删除整行 | `Alt+H, D, R` |
| 通过功能区删除整列 | `Alt+H, D, C` |
| 新建工作表 | `Shift+F11` / `Alt+Shift+F1` |
| 下一张 / 上一张工作表 | `Ctrl+PageDown / Ctrl+PageUp` |
| 选中相邻下一张 / 上一张工作表 | `Ctrl+Shift+PageDown / Ctrl+Shift+PageUp` |
| 展开分组明细 | `Alt+Shift+=` |
| 折叠分组明细 | `Alt+Shift+-` |
| 显示 / 隐藏分级符号 | `Ctrl+8` |

## 9. 公式、函数、名称与计算

| 操作 | 快捷键 |
|---|---|
| 开始输入公式 | `=` |
| 插入函数 | `Shift+F3` |
| 输入函数后打开“函数参数” | `Ctrl+A` |
| 输入函数后插入参数名与括号 | `Ctrl+Shift+A` |
| 自动求和 | `Alt+=` |
| 切换相对、绝对、混合引用 | `F4` |
| 显示 / 隐藏工作表中的公式 | ``Ctrl+` `` |
| 粘贴已定义名称 | `F3` |
| 定义名称 | `Alt+M, M, D` |
| 提交旧式数组公式 | `Ctrl+Shift+Enter` |
| 计算所有打开工作簿 | `F9` |
| 计算活动工作表 | `Shift+F9` |
| 强制计算全部工作簿 | `Ctrl+Alt+F9` |
| 重查依赖关系并完整计算 | `Ctrl+Alt+Shift+F9` |
| 显示错误检查菜单 | `Alt+Shift+F10` |
| 展开 / 折叠公式栏 | `Ctrl+Shift+U` |
| 复制上方公式 | `Ctrl+'` |
| 复制上方值 | `Ctrl+Shift+"` |

## 10. 查找、替换、排序与筛选

### 查找与替换

| 操作 | 快捷键 |
|---|---|
| 查找 | `Ctrl+F` / `Shift+F5` |
| 替换 | `Ctrl+H` |
| 转到 | `Ctrl+G` / `F5` |
| 拼写检查 | `F7` |

### 排序与筛选

| 操作 | 快捷键 | 说明 |
|---|---|---|
| 开关自动筛选 | `Ctrl+Shift+L` | 选区首行作为标题 |
| 打开筛选 / 排序菜单 | `Alt+↓` | 位于表格或筛选标题时 |
| 升序 / A→Z | `Alt+A, S, A` | 也可在下拉菜单中按 `S` |
| 降序 / Z→A | `Alt+A, S, D` | 也可在下拉菜单中按 `O` |
| 打开完整排序对话框 | `Alt+A, S, S` / `Alt+H, S, U` | 多条件排序 |
| 重新应用排序 / 筛选 | `Ctrl+Alt+L` |  |
| 按颜色筛选 | `Alt+↓, I` | 下拉菜单已打开 |
| 按数字或文本条件筛选 | `Alt+↓, F` | 下拉菜单已打开 |
| 快速填充 | `Ctrl+E` | 根据相邻列模式填充 |

## 11. 表格、图表、对象与数据透视表

### 表格与图表

| 操作 | 快捷键 |
|---|---|
| 创建 Excel 表格 | `Ctrl+T` / `Ctrl+L` |
| 基于当前区域创建嵌入式图表 | `Alt+F1` |
| 基于当前区域新建图表工作表 | `F11` |
| 选中对象后选中工作表中全部对象 | `Ctrl+Shift+Space` |
| 在浮动对象间循环 | `Ctrl+Alt+5`，再按 `Tab` |
| 退出对象导航 | `Esc` |

### 数据透视表与数据透视图

| 操作 | 快捷键 |
|---|---|
| 打开“创建数据透视表” | `Alt+N, V, T` |
| 打开“创建数据透视图” | `Alt+N, S, Z, C` |
| 从现有数据透视表插入数据透视图 | `Alt+J, T, C` |
| 在数据透视表中打开字段下拉菜单 | `Alt+↓` |
| 打开数据透视表快捷菜单 | `Shift+F10` |
| 在快捷菜单中刷新当前数据透视表 | `Shift+F10, R` |
| 在网格与字段窗格间移动焦点 | `F6` |

## 12. 批注、注释、拼写与审阅

| 操作 | 快捷键 |
|---|---|
| 插入或编辑旧式注释（Note） | `Shift+F2` |
| 插入或回复线程批注（Comment） | `Ctrl+Shift+F2` |
| 拼写检查 | `F7` |
| 打开“审阅”选项卡 | `Alt+R` |
| 打开超链接 | 选中链接后 `Enter`；对象中可用 `Ctrl+Enter` |

> Microsoft 365 中“线程批注（Comment）”与旧式“注释（Note）”是两种不同对象，因此快捷键也不同。

## 13. 外部数据、Power Query、宏与 VBA

| 操作 | 快捷键 | 说明 |
|---|---|---|
| 刷新选中的外部数据 | `Alt+F5` | Microsoft 的专门刷新文档使用此组合 |
| 刷新全部外部数据 | `Ctrl+Alt+F5` |  |
| 停止刷新 | `Esc` |  |
| 打开 Power Query 编辑器 | `Alt+F12` | 需当前版本支持 |
| 打开“宏”对话框 | `Alt+F8` | 创建、运行、编辑或删除宏 |
| 打开 VBA 编辑器 | `Alt+F11` | Visual Basic for Applications |

> 注意：Microsoft 的综合快捷键页与专门的“刷新外部数据连接”页曾出现 `Ctrl+F5` / `Alt+F5` 表述不一致。当前专门刷新文档将“刷新选中数据”列为 `Alt+F5`，而 `Ctrl+F5` 在 Windows 经典窗口快捷键中用于还原工作簿窗口大小。

## 14. Power Pivot

| 操作 | 快捷键 |
|---|---|
| 打开所选单元格、列或行的快捷菜单 | `Shift+F10` |
| 选中整张表 | `Ctrl+A` |
| 复制数据 | `Ctrl+C` |
| 删除表 | `Ctrl+D` |
| 移动表 | `Ctrl+M` |
| 重命名表 | `Ctrl+R` |
| 保存 | `Ctrl+S` |
| 撤销 / 重做 | `Ctrl+Z / Ctrl+Y` |
| 选中当前列 | `Ctrl+Space` |
| 选中当前行 | `Shift+Space` |
| 选到列尾 / 列首 | `Shift+PageDown / Shift+PageUp` |
| 选到行尾 / 行首 | `Shift+End / Shift+Home` |
| 上一张 / 下一张表 | `Ctrl+PageUp / Ctrl+PageDown` |
| 到表格左上角 / 右下角 | `Ctrl+Home / Ctrl+End` |
| 到当前行首 / 行尾 | `Ctrl+← / Ctrl+→` |
| 到当前列首 / 列尾 | `Ctrl+↑ / Ctrl+↓` |
| 打开自动筛选菜单 | `Alt+↓` |
| 打开“转到” | `F5` |
| 重新计算 Power Pivot 公式 | `F9` |
| 取消对话框或操作 | `Ctrl+Esc` |

## 15. Python in Excel

| 操作 | 快捷键 |
|---|---|
| 在当前单元格启用 Python 公式 | 输入 `=PY` |
| 另一种启用 Python 公式方式 | `Ctrl+Alt+Shift+P` |
| 打开 Python in Excel 代码编辑器窗格 | `Ctrl+Alt+Shift+F2` |
| 在 Python 对象与 Excel 值结果间切换 | `Ctrl+Alt+Shift+M` |
| 将 Python 图从图像对象改为链接浮动图 | `Ctrl+Alt+Shift+C` |
| 重置 Python 运行时 | `Ctrl+Alt+Shift+F9` |
| 提交 Python 公式 | `Ctrl+Enter` |
| 在单元格编辑与公式栏编辑间切换 | `Ctrl+F2` |
| 打开带卡片图标的数据卡片 | `Ctrl+Shift+F5` |
| 展开 / 折叠公式栏 | `Ctrl+Shift+U` |
| 在 Python 单元格的输入与编辑模式间切换 | `F2` |
| 手动计算模式下重新计算 | `F9` |

## 16. Copilot in Excel

| 操作 | 快捷键 |
|---|---|
| 打开 Copilot 任务窗格 | `Alt+C` |
| 发送提示词 | `Enter` |
| 停止 / 取消请求 | `Esc` |
| 接受 Copilot 的更改 | `Ctrl+Enter` |
| 在编辑、聊天与规划模式间切换 | `Ctrl+Shift+M` |
| 在聊天回复间导航 | `Alt+C` |
| 确认使用已选文件 | `Ctrl+J` |
| 开始语音输入 | `Alt+Shift+H` |
| 在 Excel 网格与 Copilot 窗格间移动焦点 | `F6` |

> `Alt+C` 的行为取决于焦点：在工作表中用于打开 Copilot；在 Copilot 窗格内可用于回复导航。

## 17. F1–F12 功能键全集

| 功能键 | 单独按 | Shift 组合 | Ctrl / Alt 组合 |
|---|---|---|---|
| `F1` | 打开帮助 | — | `Ctrl+F1` 功能区开关；`Alt+F1` 嵌入式图表；`Alt+Shift+F1` 新工作表；`Ctrl+Shift+F1` 全屏 |
| `F2` | 编辑活动单元格 | `Shift+F2` 注释 | `Ctrl+F2` 在单元格与公式栏编辑间切换 |
| `F3` | 粘贴名称 | `Shift+F3` 插入函数 | — |
| `F4` | 重复操作；公式中切换引用类型 | — | `Ctrl+F4` 关闭工作簿；`Alt+F4` 退出 Excel |
| `F5` | 转到 | — | `Ctrl+F5` 还原工作簿窗口 |
| `F6` | 在工作表、功能区、窗格与缩放间切换 | `Shift+F6` 反向切换 | `Ctrl+F6` 在两个窗口间切换；`Ctrl+Shift+F6` 在全部窗口间切换 |
| `F7` | 拼写检查 | — | `Ctrl+F7` 移动非最大化窗口 |
| `F8` | 扩展选择模式 | `Shift+F8` 添加非相邻选区 | `Ctrl+F8` 调整窗口大小；`Alt+F8` 宏 |
| `F9` | 计算全部打开工作簿 | `Shift+F9` 计算活动表 | `Ctrl+Alt+F9` 强制全算；`Ctrl+Alt+Shift+F9` 重查依赖并全算；`Ctrl+F9` 最小化窗口 |
| `F10` | 显示 / 隐藏按键提示 | `Shift+F10` 快捷菜单；`Alt+Shift+F10` 错误检查菜单 | `Ctrl+F10` 最大化 / 还原窗口 |
| `F11` | 新建图表工作表 | `Shift+F11` 新工作表 | `Alt+F11` VBA 编辑器 |
| `F12` | 另存为 | — | `Alt+F12` Power Query 编辑器 |

---

# 二、Excel for macOS

## 1. 文件、窗口与常用操作

| 操作 | 快捷键 |
|---|---|
| 新建空白工作簿 | `⌘N` / `Ctrl+N` |
| 从模板新建 | `⇧⌘P` |
| 打开 | `⌘O` / `Ctrl+O` |
| 保存 | `⌘S` / `Ctrl+S` |
| 另存为 | `⇧⌘S` / `F12` |
| 关闭窗口 | `⌘W` / `Ctrl+W` |
| 退出 Excel | `⌘Q` |
| 打印 / 打印预览 | `⌘P` / `Ctrl+P` |
| 撤销 | `⌘Z` / `Ctrl+Z` |
| 重做 | `⌘Y` / `Ctrl+Y` / `⇧⌘Z` |
| 剪切 | `⌘X` / `Ctrl+X` |
| 复制 | `⌘C` / `Ctrl+C` |
| 粘贴 | `⌘V` / `Ctrl+V` |
| 选择性粘贴 | `⌘Ctrl+V` / `Ctrl+⌥V` / `⌘⌥V` |
| 全选 | `⌘A` / `⇧⌘Space` |
| 查找 | `⌘F` / `Ctrl+F` / `Shift+F5` |
| 替换 | `Ctrl+H` / `⇧⌘H` |
| 转到 | `Ctrl+G` / `F5` |
| 帮助 | `F1` / `⌘/` |
| 隐藏 Excel | `⌘H` |
| 全屏 | `⌘Ctrl+F` |
| 折叠 / 展开功能区 | `⌘⌥R` |
| 下一 / 上一应用 | `⌘Tab / ⇧⌘Tab` |
| 下一控件 / 上一控件 | `Tab / Shift+Tab` |
| 取消或关闭对话框 | `Esc` |

## 2. 导航、滚动与工作表

| 操作 | 快捷键 |
|---|---|
| 移动一格 | `Arrow` |
| 到当前数据区域边缘 | `⌘+Arrow` |
| 到行首 | `Home`；MacBook 为 `Fn+←` |
| 到工作表开头 | `Ctrl+Home`；MacBook 为 `Ctrl+Fn+←` |
| 到最后已使用单元格 | `Ctrl+End`；MacBook 为 `Ctrl+Fn+→` |
| 向下 / 向上滚动一屏 | `PageDown / PageUp`；MacBook 为 `Fn+↓ / Fn+↑` |
| 向右 / 向左滚动一屏 | `⌥+PageDown / ⌥+PageUp` |
| 下一张工作表 | `Ctrl+PageDown` / `⌥→` |
| 上一张工作表 | `Ctrl+PageUp` / `⌥←` |
| 滚动以显示活动单元格 | `Ctrl+Delete` |
| 打开转到 | `Ctrl+G` |
| 打开查找 | `Ctrl+F` / `Shift+F5` |
| 在受保护表的未锁定单元格间移动 | `Tab` |
| 横向滚动 | 按住 `Shift` 滚动鼠标滚轮 |

## 3. 输入、单元格与公式栏

| 操作 | 快捷键 |
|---|---|
| 编辑选中单元格 | `F2` |
| 完成输入 | `Return` |
| 完成输入并向上移动 | `Shift+Return` |
| 完成输入并向右 / 左移动 | `Tab / Shift+Tab` |
| 取消输入 | `Esc` |
| 单元格内换行 | `⌥Return` / `Ctrl+⌥Return` |
| 用当前输入填充选区 | `⌘Return` / `Ctrl+Return` |
| 向下填充 | `⌘D` / `Ctrl+D` |
| 向右填充 | `⌘R` / `Ctrl+R` |
| 快速填充 | `Ctrl+E` |
| 插入 / 编辑注释 | `Shift+F2` |
| 插入 / 回复线程批注 | `⇧⌘F2` |
| 展开 / 折叠公式栏 | `Ctrl+Shift+U` |
| 开关公式检查提示 | `Ctrl+⌥P` |
| 提交旧式数组公式 | `⇧⌘Return` / `Ctrl+Shift+Return` |
| 打开函数生成器 | `Shift+F3` |
| 输入函数后显示函数生成器 | `Ctrl+A` |
| 开始公式 | `=` |
| 切换相对 / 绝对 / 混合引用 | `⌘T` / `F4` |
| 自动求和 | `⇧⌘T` |
| 插入日期 | `Ctrl+;` |
| 插入时间 | `⌘;` |
| 复制上方值 | `Ctrl+Shift+"` |
| 复制上方公式 | `Ctrl+'` |
| 显示 / 隐藏公式 | ``Ctrl+` `` |
| 显示自动完成列表 | `⌥↓` |
| 定义名称 | `Ctrl+L` |
| 打开“定义名称” | `⌘F3` |
| 创建名称 | `⇧⌘F3` |
| 计算活动工作表 | `Shift+F9` |
| 计算全部打开工作簿 | `F9` / `⌘=` |
| 强制计算全部工作簿 | `Ctrl+⌥F9` |
| 重查依赖并完整计算 | `Ctrl+⌥⇧F9` |

## 4. 格式与编辑

| 操作 | 快捷键 |
|---|---|
| 创建表格 | `⌘T` / `Ctrl+T` |
| 设置单元格格式 | `⌘1` / `Ctrl+1` |
| 加粗 / 斜体 / 下划线 | `⌘B / ⌘I / ⌘U` |
| 删除线 | `⇧⌘X` |
| 增大 / 减小字号 | `⇧⌘> / ⇧⌘<` |
| 居中 / 左对齐 | `⌘E / ⌘L` |
| 特殊字符与表情 | `Ctrl+⌘Space` |
| 常规数字格式 | `Ctrl+Shift+~` |
| 货币格式 | `Ctrl+Shift+$` |
| 百分比格式 | `Ctrl+Shift+%` |
| 科学计数格式 | `Ctrl+Shift+^` |
| 日期格式 | `Ctrl+Shift+#` |
| 时间格式 | `Ctrl+Shift+@` |
| 数值格式 | `Ctrl+Shift+!` |
| 添加外边框 | `⌘⌥0` |
| 添加右 / 左 / 上 / 下边框 | `⌘⌥→ / ⌘⌥← / ⌘⌥↑ / ⌘⌥↓` |
| 删除外边框 | `⌘⌥-` |
| 隐藏 / 取消隐藏列 | `⌘+) / ⇧⌘+)` |
| 隐藏 / 取消隐藏行 | `⌘+( / ⇧⌘+(` |

## 5. 选择与选区操作

| 操作 | 快捷键 |
|---|---|
| 扩展一格 | `Shift+Arrow` |
| 扩展到数据区域边缘 | `⇧⌘+Arrow` |
| 扩展到行首 | `Shift+Home`；MacBook 为 `Shift+Fn+←` |
| 扩展到工作表开头 | `Ctrl+Shift+Home` |
| 扩展到最后已使用单元格 | `Ctrl+Shift+End` |
| 选中整列 | `Ctrl+Space` |
| 选中整行 | `Shift+Space` |
| 选中当前区域 / 全部 | `⌘A`，重复按可扩大范围 |
| 仅选可见单元格 | `⇧⌘*` |
| 仅保留活动单元格 | `Shift+Delete` |
| 开关扩展选择 | `F8` |
| 加入非相邻选区 | `Shift+F8` |
| 选中当前数组 | `Ctrl+/` |
| 选中当前行中不同值 | `Ctrl+\` |
| 选中直接 / 全部前置引用 | `Ctrl+Shift+[ / Ctrl+Shift+{` |
| 选中直接 / 全部依赖引用 | `Ctrl+] / Ctrl+Shift+}` |
| 在选区四角间循环 | `Ctrl+.` |
| 在选区内向下 / 向上移动 | `Return / Shift+Return` |
| 在选区内向右 / 向左移动 | `Tab / Shift+Tab` |
| 组合 / 取消组合选中单元格 | `⇧⌘K / ⇧⌘J` |

## 6. 图表、排序、筛选与分级

| 操作 | 快捷键 |
|---|---|
| 新建图表工作表 | `F11` |
| 在图表对象间循环 | `Arrow` |
| 打开排序对话框 | `⇧⌘R` |
| 开关筛选 | `⇧⌘F` / `Ctrl+Shift+L` |
| 打开筛选或数据透视表字段菜单 | `⌥↓` |
| 显示 / 隐藏分级符号 | `Ctrl+8` |
| 隐藏 / 取消隐藏行 | `Ctrl+9 / Ctrl+Shift+(` |
| 隐藏 / 取消隐藏列 | `Ctrl+0 / Ctrl+Shift+)` |

## 7. Copilot 与功能键

### Copilot

| 操作 | 快捷键 |
|---|---|
| 打开 Copilot | `⌘Ctrl+I` |
| 发送提示词 | `Return` |
| 停止 / 取消请求 | `Esc` |
| 接受更改 | `⌘Return` |
| 切换编辑、聊天、规划模式 | `⇧⌘M` |
| 在回复间导航 | `⌥C` |
| 确认使用已选文件 | `⌘J` |
| 开始语音输入 | `⌥⇧H` |
| 在网格与 Copilot 间移动焦点 | `Shift+F6` |

### 功能键

| 操作 | 快捷键 |
|---|---|
| 帮助 | `F1` |
| 编辑单元格 | `F2` |
| 插入 / 编辑注释 | `Shift+F2` |
| 插入 / 回复线程批注 | `⇧⌘F2` |
| 保存对话框 | `⌥F2` |
| 函数生成器 | `Shift+F3` |
| 定义名称 | `⌘F3` |
| 关闭窗口 / 对话框 | `⌘F4` |
| 转到 | `F5` |
| 查找 | `Shift+F5` |
| 搜索工作表 | `Ctrl+F5` |
| 在工作表、功能区、任务窗格和状态栏间切换 | `F6 / Shift+F6` |
| 拼写 / 同义词库 | `F7 / Shift+F7` |
| 扩展选区 / 添加选区 | `F8 / Shift+F8` |
| 宏 | `⌥F8` |
| 计算全部 / 当前表 | `F9 / Shift+F9` |
| 快捷菜单 | `Shift+F10` |
| 新建图表工作表 / 工作表 | `F11 / Shift+F11` |
| Excel 4.0 宏表 | `⌘F11` |
| VBA 编辑器 | `⌥F11` |
| 另存为 | `F12` |
| 打开 | `⌘F12` |
| Power Query 编辑器 | `⌥F12` |
| 开关绘图模式 | `⌘Ctrl+Z` |

---

# 三、Excel 网页版

## 1. 网页版的重要差异

- 网页版运行在浏览器中，`F1`、`Ctrl+O`、`Ctrl+S` 等组合可能先由浏览器接管。
- Microsoft 推荐使用 Edge。若希望网页 Excel 优先处理快捷键，可在 Excel 网页版中打开“帮助 > 键盘快捷方式”，启用“覆盖浏览器快捷键”。
- Windows 上的网页版功能区序列以 `Alt+Win` 开始；Mac 上以 `Ctrl+Option` 开始。
- 桌面版使用 `F6` 切换区域，网页版通常使用 `Ctrl+F6`。
- 若文件处于查看模式，可按 `Alt+Win, Z, M, E` 切换到编辑模式。

## 2. 常用与功能区

| 操作 | 快捷键 |
|---|---|
| 转到指定单元格 | `Ctrl+G` |
| 打印 | `Ctrl+P` |
| 剪切 / 复制 / 粘贴 | `Ctrl+X / C / V` |
| 撤销 / 重做 | `Ctrl+Z / Ctrl+Y` |
| 打开 / 关闭工作簿 | `Ctrl+O / Ctrl+W` |
| 另存为 | `Alt+F2` |
| 查找 | `Ctrl+F` / `Shift+F3` |
| 加粗 | `Ctrl+B` |
| 打开快捷菜单 | `Shift+F10` / 菜单键 |
| 搜索命令 | `Alt+Q` |
| 向下 / 向上重复查找 | `Shift+F4 / Ctrl+Shift+F4` |
| 插入图表 | `Alt+F1` |
| 显示经典功能区按键提示 | `Alt+.` |
| 打开无障碍快捷菜单 | `Alt+Shift+A` |

### Windows 网页版功能区

| 位置 | 快捷键 |
|---|---|
| 功能区 / 显示按键提示 | `Alt+Win` |
| 搜索 | `Alt+Win, Q` |
| 文件 | `Alt+Win, F` |
| 开始 | `Alt+Win, H` |
| 插入 | `Alt+Win, N` |
| 数据 | `Alt+Win, A` |
| 审阅 | `Alt+Win, R` |
| 视图 | `Alt+Win, W` |
| 折叠 / 展开功能区 | `Ctrl+F1` |
| 在功能区与工作簿间切换 | `Ctrl+F6` |

## 3. 编辑、输入与公式

| 操作 | 快捷键 |
|---|---|
| 插入当前行上方的新行 | `Alt+Win, H, I, R` |
| 插入当前列左侧的新列 | `Alt+Win, H, I, C` |
| 编辑选中单元格 | `F2` |
| 完成并向下 / 向上 | `Enter / Shift+Enter` |
| 完成并向右 / 向左 | `Tab / Shift+Tab` |
| 取消输入 | `Esc` |
| 单元格内换行 | `Alt+Enter` |
| 插入超链接 | `Ctrl+K` |
| 插入表格 | `Ctrl+L` |
| 插入函数 | `Shift+F3` |
| 切换相对 / 绝对 / 混合引用 | `F4` |
| 清除单元格 | `Delete` |
| 清除并开始编辑 | `Backspace` |
| 到单元格行首 / 行尾 | `Home / End` |
| 插入日期 / 时间 | `Ctrl+; / Ctrl+Shift+;` |
| 复制上方公式 | `Ctrl+'` |
| 复制上方值 | `Ctrl+Shift+'` |
| 插入函数参数 | `Ctrl+Shift+A` |
| 自动求和 | `Alt+=` |
| 快速填充 | `Ctrl+E` |
| 计算工作簿 | `F9` |
| 完整计算 | `Ctrl+Shift+Alt+F9` |

## 4. 格式

| 操作 | 快捷键 |
|---|---|
| 加粗 / 斜体 / 下划线 | `Ctrl+B / Ctrl+I / Ctrl+U` |
| 粘贴格式 | `Ctrl+Shift+V` |
| 添加外边框 | `Ctrl+Shift+&` |
| 数值 / 时间 / 日期格式 | `Ctrl+Shift+1 / 2 / 3` |
| 货币 / 百分比 / 科学计数 | `Ctrl+Shift+4 / 5 / 6` |
| 外边框 | `Ctrl+Shift+7` |
| 打开数字格式 | `Ctrl+1` |
| 增大 / 减小字号 | `Ctrl+Shift+> / Ctrl+Shift+<` |

## 5. 导航、选择、行列与工作表

| 操作 | 快捷键 |
|---|---|
| 移动一格 | `Arrow` |
| 到行首 | `Home` |
| 到 A1 / 最后已用单元格 | `Ctrl+Home / Ctrl+End` |
| 向下 / 向上滚动一屏 | `PageDown / PageUp` |
| 到数据区域边缘 | `Ctrl+Arrow` |
| 插入新工作表 | `Shift+F11` |
| 下一 / 上一工作表 | `Ctrl+Alt+PageDown / Ctrl+Alt+PageUp` |
| Teams 或部分非 Chrome 浏览器切换工作表 | `Ctrl+PageDown / Ctrl+PageUp` |
| 选择区域 | `Shift+Arrow` |
| 选中整列 / 整行 | `Ctrl+Space / Shift+Space` |
| 扩展到数据区域边缘 | `Ctrl+Shift+Arrow` |
| 添加非相邻选区 | `Shift+F8` |
| 插入单元格、行、列 | `Ctrl++` |
| 删除单元格、行、列 | `Ctrl+-` |
| 隐藏 / 取消隐藏行 | `Ctrl+9 / Ctrl+Shift+9` |
| 隐藏 / 取消隐藏列 | `Ctrl+0 / Ctrl+Shift+0` |
| 在选区内向下 / 向上 | `Enter / Shift+Enter` |
| 在选区内向右 / 向左 | `Tab / Shift+Tab` |
| 回到活动单元格 | `Shift+Backspace` |
| 回到活动单元格并保留选区 | `Ctrl+Backspace` |
| 在选区四角间循环 | `Ctrl+.` |
| 下一 / 上一非相邻选区 | `Ctrl+Alt+→ / Ctrl+Alt+←` |

## 6. 筛选、对象、刷新与 Copilot

| 操作 | 快捷键 |
|---|---|
| 应用筛选 | `Alt+Win, A, T` |
| 重新应用筛选 | `Ctrl+Alt+L` |
| 开关自动筛选 | `Ctrl+Shift+L` |
| 对象菜单 / 下钻 | `Alt+↓` |
| 关闭对象菜单 / 上钻 | `Alt+↑` |
| 打开超链接 | `Ctrl+Enter` |
| 打开注释 | `Shift+F2` |
| 打开 / 回复线程批注 | `Ctrl+Shift+F2` |
| 左 / 右旋转对象 | `Alt+← / Alt+→` |
| 刷新外部数据 | `Alt+F5` |
| 刷新全部外部数据 | `Ctrl+Alt+F5` |
| 打开数据透视表窗格 | `Alt+Win, N, V, T` |

### Copilot

| 操作 | Windows / 通用 | Mac |
|---|---|---|
| 打开 Copilot | `Alt+C` | `⌘Ctrl+I` |
| 发送 | `Enter` | `Return` |
| 停止 / 取消 | `Esc` | `Esc` |
| 接受更改 | `Ctrl+Enter` | `⌘Return` |
| 切换编辑、聊天、规划模式 | `Ctrl+Shift+M` | `⇧⌘M` |
| 回复间导航 | `Alt+C` | `⌥C` |
| 确认使用文件 | `Ctrl+J` | `⌘J` |
| 语音输入 | `Alt+Shift+H` | `⌥⇧H` |
| 网格与 Copilot 间切换焦点 | `F6` | `Shift+F6` |

---

# 四、iPad 与 iPhone 外接键盘

| 操作 | 快捷键 |
|---|---|
| 向右移动一格 | `Tab` |
| 移动一格 | `Arrow` |
| 下一 / 上一工作表 | `⌥→ / ⌥←` |
| 复制 / 粘贴 / 剪切 | `⌘C / ⌘V / ⌘X` |
| 撤销 | `⌘Z` |
| 重做 | `⌘Y` / `⇧⌘Z` |
| 加粗 / 斜体 / 下划线 | `⌘B / ⌘I / ⌘U` |
| 全选 | `⌘A` |
| 扩展选择 | `Shift+← / Shift+→` |
| 单元格内换行 | `⌘⌥Return` / `Ctrl+⌥Return` |
| 行内移到开头 / 结尾 | `⌘← / ⌘→` |
| 单元格内移到开头 / 结尾 | `⌘↑ / ⌘↓` |
| 按段落向上 / 向下 | `⌥↑ / ⌥↓` |
| 按单词向左 / 向右 | `⌥← / ⌥→` |
| 自动求和 | `⇧⌘T` |
| 添加 / 删除外边框 | `⌘⌥0 / ⌘⌥-` |
| 隐藏 / 取消隐藏列 | `⌘0 / ⇧⌘0` |
| 隐藏 / 取消隐藏行 | `Ctrl+9 / Shift+Ctrl+9` |

---

# 五、Android 外接键盘

| 操作 | 快捷键 |
|---|---|
| 向右移动一格 | `Tab` |
| 移动一格 | `Arrow` |
| 保存 | `Ctrl+S` |
| 复制 / 粘贴 / 剪切 | `Ctrl+C / Ctrl+V / Ctrl+X` |
| 撤销 / 重做 | `Ctrl+Z / Ctrl+Y` |
| 加粗 / 斜体 / 下划线 | `Ctrl+B / Ctrl+I / Ctrl+U` |
| 全选 | `Ctrl+A` |
| 查找 | `Ctrl+F` |
| 单元格内换行 | `Alt+Enter` |

---

# 快捷键冲突与自定义

## Windows

- 按一次 `Alt` 可查看当前界面实际可用的功能区按键提示。它比死记所有 `Alt` 序列更可靠。
- 加载项和企业自定义功能区可能增加、移动或覆盖按键提示。
- 中文输入法开启时，部分字母和符号组合可能先被输入法捕获；快捷键无效时可先切换到英文输入状态。
- 如果一个常用命令没有默认快捷键，可录制宏，再将宏加入快速访问工具栏；工具栏项目通常可通过 `Alt+1`、`Alt+2` 等调用。

## macOS

- Excel 菜单栏选择“工具 > 自定义键盘”，可为 Excel 命令添加自定义组合键。
- 自定义组合至少应包含 `Command`、`Control`、`Option` 或 `Shift` 中的一个修饰键。
- 默认快捷键不能删除，但可添加另一个组合；自定义项可移除或全部重置。
- macOS 系统快捷键、第三方效率工具和输入法可能抢占组合。可在“系统设置 > 键盘 > 键盘快捷键”中检查冲突。
- 若功能键无效，尝试 `Fn+F键`，或启用“将 F1、F2 等键用作标准功能键”。
- 方向键无法移动单元格时，请检查 Scroll Lock；Microsoft 建议用 `Shift+F14` 切换，但 MacBook 通常需要外接键盘。

## 网页版

1. 打开 Excel 网页版的“帮助 > 键盘快捷方式”。
2. 搜索目标快捷键或按分类浏览。
3. 启用“覆盖浏览器快捷键”，让更多桌面版组合由 Excel 处理。
4. 需要确认覆盖项时，打开“显示覆盖”。

---

# 官方资料来源

1. [Microsoft：Keyboard shortcuts in Excel](https://support.microsoft.com/en-us/accessibility/excel/keyboard-shortcuts-in-excel)  
   Windows、macOS、iOS、Android、Excel 网页版的主快捷键参考。
2. [Microsoft：Use the keyboard to work with the ribbon](https://support.microsoft.com/en-gb/office/use-the-keyboard-to-work-with-the-ribbon-954cd3f7-2f77-4983-978d-c09b20e31f0e)  
   Microsoft 365 功能区、KeyTips 与键盘导航规则。
3. [Microsoft：Create a custom keyboard shortcut for Office for Mac](https://support.microsoft.com/en-us/onenote/create-a-custom-keyboard-shortcut-for-office-for-mac)  
   Excel for Mac 自定义、删除和重置快捷键。
4. [Microsoft：Refresh an external data connection in Excel](https://support.microsoft.com/en-us/excel/refresh-an-external-data-connection-in-excel)  
   外部数据刷新、刷新全部与停止刷新。
5. [Microsoft：Use a screen reader to sort or filter a table in Excel](https://support.microsoft.com/en-us/accessibility/excel/use-a-screen-reader-to-sort-or-filter-a-table-in-excel)  
   排序、筛选、重新应用与筛选菜单组合。
6. [Microsoft：Using Flash Fill in Excel](https://support.microsoft.com/en-us/excel/using-flash-fill-in-excel)  
   `Ctrl+E` 快速填充。
7. [Microsoft：Python in Excel keyboard shortcuts](https://support.microsoft.com/en-us/excel/python/python-in-excel-keyboard-shortcuts)  
   Python 单元格、运行时、编辑器与结果类型快捷键。
8. [Microsoft：Create a PivotTable or PivotChart in Excel with the keyboard](https://support.microsoft.com/en-us/accessibility/excel/use-a-screen-reader-to-create-a-pivottable-or-pivotchart-in-excel)  
   Windows 与网页版数据透视表、数据透视图操作。
9. [Microsoft：Outline (group) data in a worksheet](https://support.microsoft.com/en-us/excel/outline-group-data-in-a-worksheet)  
   分组明细展开与折叠。

## 校勘说明

- 本文将 Microsoft 官方页面中的英文操作说明重新归类并用中文改写，不是对网页表格的逐行复制。
- Microsoft 综合快捷键页在少数位置存在明显的重复、缺失或疑似排版错误。例如 Mac 章节曾将“复制选区”的备用组合显示为 `Ctrl+V`，且“上一张工作表”一行曾重复写成 `Ctrl+PageDown`。本文依据同页其他章节和 Excel 的平台规则分别校正为 `Ctrl+C` 与 `Ctrl+PageUp`。
- 快捷键会随 Microsoft 365 逐步发布的功能更新而变化；Copilot、Python、Power Query 和网页版功能尤其依赖账号、地区、版本与授权。
