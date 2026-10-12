# Blender 5.2 LTS 快捷键大全（Windows / macOS）

> 整理日期：2026-07-25  
> 版本基准：Blender 5.2 LTS，默认 **Blender Keymap**  
> 适用平台：Windows、macOS（Linux 键位通常与 Windows 相同）  
> 内容范围：通用界面、3D 视图、建模、雕刻、绘制、绑定、动画、节点、UV、视频剪辑、跟踪、文件与脚本编辑器等  
> 不混入：第三方插件键位、个人自定义键位、旧版 2.7x 键位；Industry Compatible Keymap 单独说明

---

## 目录

1. [使用前必读](#1-使用前必读)
2. [按键符号、平台差异与操作规则](#2-按键符号平台差异与操作规则)
3. [全局、文件与窗口操作](#3-全局文件与窗口操作)
4. [界面、区域、菜单与搜索](#4-界面区域菜单与搜索)
5. [选择、确认、取消与通用编辑](#5-选择确认取消与通用编辑)
6. [变换系统：移动、旋转、缩放](#6-变换系统移动旋转缩放)
7. [3D 视图导航、观察与显示](#7-3d-视图导航观察与显示)
8. [对象模式](#8-对象模式)
9. [网格编辑模式：选择](#9-网格编辑模式选择)
10. [网格编辑模式：建模与拓扑](#10-网格编辑模式建模与拓扑)
11. [曲线、曲面、文本、晶格与元球](#11-曲线曲面文本晶格与元球)
12. [骨架编辑、姿态与权重](#12-骨架编辑姿态与权重)
13. [雕刻模式](#13-雕刻模式)
14. [顶点绘制、权重绘制与纹理绘制](#14-顶点绘制权重绘制与纹理绘制)
15. [Grease Pencil / 2D 动画](#15-grease-pencil--2d-动画)
16. [UV 编辑器与图像编辑器](#16-uv-编辑器与图像编辑器)
17. [节点编辑器](#17-节点编辑器)
18. [动画通用、时间线与摄影表](#18-动画通用时间线与摄影表)
19. [曲线编辑器与非线性动画](#19-曲线编辑器与非线性动画)
20. [大纲视图、属性、资产与文件浏览器](#20-大纲视图属性资产与文件浏览器)
21. [渲染、材质预览与合成](#21-渲染材质预览与合成)
22. [视频序列编辑器](#22-视频序列编辑器)
23. [电影剪辑、跟踪与遮罩](#23-电影剪辑跟踪与遮罩)
24. [文本编辑器、Python 控制台与信息编辑器](#24-文本编辑器python-控制台与信息编辑器)
25. [电子表格、几何节点与其他编辑器](#25-电子表格几何节点与其他编辑器)
26. [模拟工具中的通用按键](#26-模拟工具中的通用按键)
27. [Industry Compatible Keymap 速查](#27-industry-compatible-keymap-速查)
28. [自定义、查找、导入、导出与恢复](#28-自定义查找导入导出与恢复)
29. [导出本机绝对完整键位表](#29-导出本机绝对完整键位表)
30. [冲突、版本差异与排错](#30-冲突版本差异与排错)
31. [官方资料与补充来源](#31-官方资料与补充来源)

---

## 1. 使用前必读

### 1.1 Blender 没有一张脱离上下文的“唯一快捷键表”

Blender 的快捷键由以下状态共同决定：

- 鼠标当前悬停的编辑器，例如 3D 视图、节点编辑器或时间线。
- 当前模式，例如对象模式、编辑模式、雕刻模式或姿态模式。
- 当前对象类型，例如网格、曲线、骨架或 Grease Pencil。
- 是否正在执行移动、旋转、挤出、绘制等模态工具。
- 当前活动工具、键位预设、插件与用户自定义设置。

因此同一个键可能有不同含义。例如：

| 按键 | 3D 视图 | 节点编辑器 | 时间线 / 动画编辑器 |
|---|---|---|---|
| `G` | 移动对象或元素 | 移动节点 | 移动关键帧 |
| `R` | 旋转 | 通常无全局默认动作 | 调整关键帧手柄或时间，视编辑器而定 |
| `S` | 缩放 | 缩放节点布局 | 缩放关键帧时间 |
| `I` | 插入关键帧 / 插入面，取决于模式 | 插入节点到连线通常由拖动触发 | 插入关键帧 |
| `M` | 移到集合 / 合并，取决于模式 | 静音节点 | 添加标记或其他上下文动作 |

本文按编辑器和模式拆分。使用时先确认鼠标位于哪个区域。

### 1.2 本文的“最全”边界

本文收录：

- Blender 5.2 LTS 默认 Blender Keymap 的高频与中低频默认键位。
- 工具运行中的轴向、吸附、精确输入、复制、约束等修饰键。
- 主要编辑器和对象模式中的上下文快捷操作。
- 默认没有固定键位、但适合自定义的入口。
- 一段可在 Blender 内运行的脚本，用于导出**你本机当前安装、当前插件、当前用户设置下的全部活动键位**。

由于 Blender 的键位由 Python 模块、运行时工具、插件和用户首选项共同生成，任何静态文档都无法覆盖每台电脑的所有插件键位。第 29 章的导出方法才是本机配置的最终权威。

### 1.3 本文默认条件

- 键位预设选择 `Blender`，不是 `Industry Compatible`。
- 选择方式采用 Blender 当前默认的左键选择。
- 未开启“模拟三键鼠标”“模拟数字键盘”等会改变输入行为的选项。
- 字母键以英文 QWERTY 布局为准。
- `Numpad` 指独立数字小键盘，不是主键盘上方的数字行。

---
## 2. 按键符号、平台差异与操作规则

### 2.1 符号说明

| 写法 | 含义 |
|---|---|
| `LMB` | 鼠标左键 |
| `MMB` | 鼠标中键 / 按下滚轮 |
| `RMB` | 鼠标右键 |
| `WheelUp` / `WheelDown` | 滚轮向上 / 向下 |
| `Numpad0` | 数字小键盘 0 |
| `NumpadPeriod` | 数字小键盘小数点 |
| `OSKey` | Windows 键、macOS `Command ⌘` 或 Linux Super |
| `Shift+G` | 同时按下 |
| `G` → `X` | 依次按下 |
| 按住 | 持续按住才生效 |
| 点按 | 按一下切换或触发 |

### 2.2 Windows 与 macOS 不要机械互换

Blender 的原生建模快捷键在两平台通常相同，例如 `Ctrl+R` 环切、`Ctrl+B` 倒角；macOS 上这些组合仍可能使用 `Control ⌃`，不能全部替换成 `Command ⌘`。

以下系统习惯命令通常采用平台对应键：

| 操作 | Windows | macOS |
|---|---:|---:|
| 复制 | `Ctrl+C` | `Command+C` |
| 粘贴 | `Ctrl+V` | `Command+V` |
| 剪切 | `Ctrl+X` | `Command+X` |
| 保存 | `Ctrl+S` | `Command+S` |
| 撤销 | `Ctrl+Z` | `Command+Z` |
| 重做 | `Shift+Ctrl+Z` | `Shift+Command+Z` |
| 退出应用 | `Ctrl+Q` | `Command+Q` |

> 如果本文某行只写 `Ctrl`，表示 Blender 原生键位；macOS 用户应先尝试 `Control ⌃`。菜单右侧显示的键位和 `编辑 > 首选项 > 键位映射` 永远优先。

### 2.3 模态工具通用规则

在移动、旋转、缩放、挤出、倒角等工具运行中：

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 确认 | `LMB` 或 `Enter` | 接受当前结果 |
| 取消 | `RMB` 或 `Esc` | 恢复调用前状态 |
| 精细调整 | 按住 `Shift` | 降低鼠标变化速度 |
| 步进 / 吸附 | 按住 `Ctrl` | 按当前吸附或增量规则移动 |
| 精细步进 | `Shift+Ctrl` | 组合精细和步进 |
| 输入数值 | 直接键入数字 | 无需点击数值字段 |
| 负数 | `-` 后输入数字 | 沿相反方向 |
| 小数点 | `.` | 输入小数 |
| 删除一位 | `Backspace` | 删除最后输入字符 |
| 清空输入 | `Ctrl+Backspace` | 清除数值输入 |
| 表达式 | `#` 后输入 | 支持单位和部分数学表达式 |
| 切换单位 | 输入 `m`、`cm`、`mm` 等 | 取决于场景单位设置 |
| 再次执行 | `Shift+R` | 重复上一次操作 |
| 调整上次操作 | `F9` | 打开“调整上次操作”面板 |

### 2.4 轴向与平面约束

| 操作 | 按键序列 | 说明 |
|---|---|---|
| 约束到全局 X | `G/R/S` → `X` | 对相应变换生效 |
| 约束到全局 Y | `G/R/S` → `Y` | 同上 |
| 约束到全局 Z | `G/R/S` → `Z` | 同上 |
| 约束到局部 X | `G/R/S` → `X` → `X` | 再按一次切换到当前变换方向的局部轴 |
| 约束到局部 Y | `G/R/S` → `Y` → `Y` | 同上 |
| 约束到局部 Z | `G/R/S` → `Z` → `Z` | 同上 |
| 排除 X，限制在 YZ 平面 | `G/S` → `Shift+X` | 平面约束 |
| 排除 Y，限制在 XZ 平面 | `G/S` → `Shift+Y` | 平面约束 |
| 排除 Z，限制在 XY 平面 | `G/S` → `Shift+Z` | 平面约束 |
| 临时改变变换方向 | `,` | 打开变换方向饼菜单 |
| 改变枢轴点 | `.` | 主键盘句点打开枢轴点饼菜单 |

---
## 3. 全局、文件与窗口操作

### 3.1 文件

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 新建文件 | `Ctrl+N` | `Command+N` | 打开新建文件菜单 |
| 打开文件 | `Ctrl+O` | `Command+O` | 打开 `.blend` |
| 保存 | `Ctrl+S` | `Command+S` | 保存当前文件 |
| 另存为 | `Shift+Ctrl+S` | `Shift+Command+S` | 选择新路径 |
| 保存副本 | `Alt+Ctrl+S` | `Option+Command+S` | 保存副本，不切换当前文件 |
| 恢复上次会话 | `F3` 搜索 `Recover Last Session` | 同左 | 默认无独立固定键 |
| 恢复自动保存 | `F3` 搜索 `Recover Auto Save` | 同左 | 默认无独立固定键 |
| 退出 Blender | `Ctrl+Q` | `Command+Q` | 可能弹出保存确认 |
| 打开用户首选项 | `F4` → Preferences 或菜单 | 同左 | 也可 `Edit > Preferences` |
| 打开启动文件 | `Ctrl+N` 后选择 | `Command+N` 后选择 | General、2D Animation 等 |

### 3.2 撤销、重做与重复

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 撤销 | `Ctrl+Z` | `Command+Z` | 撤销一步 |
| 重做 | `Shift+Ctrl+Z` | `Shift+Command+Z` | 重做一步 |
| 撤销历史 | `Ctrl+Alt+Z` | `Command+Option+Z` | 打开历史列表，视上下文可用 |
| 重复上次操作 | `Shift+R` | `Shift+R` | Repeat Last |
| 重复历史 | `F3` 搜索 `Repeat History` | 同左 | 从历史中选择操作 |
| 调整上次操作 | `F9` | `F9` / `Fn+F9` | 显示参数面板 |

### 3.3 窗口与工作区

| 操作 | 按键 | 说明 |
|---|---|---|
| 最大化鼠标所在区域 | `Ctrl+Spacebar` | 在当前区域和最大化之间切换 |
| 全屏当前区域 | `Ctrl+Alt+Spacebar` | 隐藏顶栏等界面元素 |
| 切换到下一个工作区 | `Ctrl+PageDown` | 顶部工作区向右 |
| 切换到上一个工作区 | `Ctrl+PageUp` | 顶部工作区向左 |
| 新建主窗口 | `F3` 搜索 `New Main Window` | 默认无固定键 |
| 关闭窗口 | 系统窗口快捷键 | Windows `Alt+F4`；macOS `Command+W` |
| 截取当前窗口 | 系统快捷键 | 不是 Blender 内部键位 |

---
## 4. 界面、区域、菜单与搜索

### 4.1 全局界面

| 操作 | 按键 | 说明 |
|---|---|---|
| 操作搜索 | `F3` | 搜索操作、菜单命令与插件操作 |
| 工具栏 | `T` | 显示 / 隐藏左侧工具栏 |
| 侧栏 | `N` | 显示 / 隐藏右侧侧栏 |
| 当前区域最大化 | `Ctrl+Spacebar` | 常用于节点、时间线或视图 |
| 切换编辑器类型 | `Shift+F1` 至 `Shift+F12` | 旧式但仍可用，见下表 |
| 上下文菜单 | `RMB` | 对当前元素或区域 |
| 菜单搜索 | `F3` | 比逐级找菜单更稳定 |
| 快捷收藏 | `Q` | 打开 Quick Favorites |
| 添加到快捷收藏 | 在菜单项上 `RMB` | 选择 Add to Quick Favorites |
| 分配快捷键 | 在菜单项上 `RMB` | 选择 Assign Shortcut |
| 移除快捷键 | 在菜单项上 `RMB` | 选择 Remove Shortcut |

### 4.2 编辑器类型快速切换

| 按键 | 编辑器 |
|---|---|
| `Shift+F1` | 文件浏览器 |
| `Shift+F2` | 电影剪辑编辑器 |
| `Shift+F3` | 节点编辑器 |
| `Shift+F4` | Python 控制台 |
| `Shift+F5` | 3D 视图 |
| `Shift+F6` | 曲线编辑器 |
| `Shift+F7` | 属性编辑器 |
| `Shift+F8` | 视频序列编辑器 |
| `Shift+F9` | 大纲视图 |
| `Shift+F10` | 图像编辑器 |
| `Shift+F11` | 文本编辑器 |
| `Shift+F12` | 摄影表 / Dope Sheet |

> 某些功能键会被笔记本亮度、音量或系统手势占用，需要同时按 `Fn`。

### 4.3 区域与面板交互

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 滚动区域 | `Wheel` | 垂直滚动 |
| 水平滚动 | `Shift+Wheel` | 适用于多种列表和编辑器 |
| 平移编辑器内容 | `MMB` 拖动 | 3D 视图中为旋转观察 |
| 缩放编辑器内容 | `Ctrl+MMB` 或滚轮 | 视编辑器而定 |
| 折叠 / 展开面板 | 单击三角图标 | 属性和侧栏 |
| 单独展开当前面板 | `Ctrl+单击` 面板标题 | 折叠同组其他面板 |
| 关闭弹出菜单 | `Esc` 或移开后单击 | 不提交 |
| 搜索下拉列表 | 下拉打开后直接输入 | 筛选条目 |
| 重置属性默认值 | `Backspace` 悬停属性 | 部分数值字段可用 |
| 复制属性值 | `RMB` 属性 | Copy Data Path / Copy Value |
| 将属性复制到所选对象 | `Alt` 修改属性 | 多对象编辑时可用，依属性而定 |
| 插入关键帧 | `I` 悬停属性 | 对该属性插入关键帧 |
| 删除关键帧 | `Alt+I` 悬停属性 | 删除该属性关键帧 |
| 添加驱动器 | `Ctrl+D` 悬停属性 | 依版本和上下文；也可右键菜单 |

---
## 5. 选择、确认、取消与通用编辑

### 5.1 通用选择

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 选择单项 | `LMB` | 当前默认左键选择 |
| 添加 / 移除单项 | `Shift+LMB` | 切换选择 |
| 全选 | `A` | 当前上下文全部 |
| 取消全选 | `Alt+A` | 部分编辑器也可双击空白 |
| 反选 | `Ctrl+I` | 当前上下文反选 |
| 框选 | `B` | 拖出矩形 |
| 圈选 | `C` | 滚轮调整圆半径；`LMB` 选，`MMB` 取消 |
| 套索选择 | `Ctrl+RMB` 拖动 | 视上下文可用 |
| 套索取消选择 | `Shift+Ctrl+RMB` 拖动 | 从选择中移除 |
| 选择相似 | `Shift+G` | 对象或元素相似属性 |
| 按类型选择 | `Shift+G` 或选择菜单 | 依模式不同 |
| 选择链接 | `L` | 鼠标悬停元素；编辑模式常用 |
| 取消链接选择 | `Shift+L` | 编辑模式 |
| 选择更多 | `Ctrl+NumpadPlus` | 扩展一圈 |
| 选择更少 | `Ctrl+NumpadMinus` | 收缩一圈 |

### 5.2 通用剪贴板与删除

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 复制 | `Ctrl+C` | `Command+C` | 依编辑器复制对象、节点或文本 |
| 粘贴 | `Ctrl+V` | `Command+V` | 粘贴 |
| 剪切 | `Ctrl+X` | `Command+X` | 文本和部分编辑器 |
| 复制对象 | `Shift+D` | `Shift+D` | 独立复制 |
| 关联复制 | `Alt+D` | `Option+D` | 共享对象数据 |
| 删除 | `X` 或 `Delete` | `X` 或 `Delete` | 弹出删除菜单或确认 |
| 溶解 | `Ctrl+X` | `Ctrl+X` | 网格编辑上下文 |
| 重命名活动项 | `F2` | `F2` / `Fn+F2` | 对象、骨骼、集合等 |

### 5.3 确认与取消

| 操作 | 按键 |
|---|---|
| 确认操作 | `LMB` 或 `Enter` |
| 取消操作 | `RMB` 或 `Esc` |
| 接受对话框默认按钮 | `Enter` |
| 关闭对话框 / 菜单 | `Esc` |
| 切换字段 | `Tab` |
| 反向切换字段 | `Shift+Tab` |
| 勾选 / 取消当前复选框 | `Spacebar` |

---
## 6. 变换系统：移动、旋转、缩放

### 6.1 基础变换

| 操作 | 按键 | 说明 |
|---|---|---|
| 移动 | `G` | Grab / Move |
| 旋转 | `R` | Rotate |
| 缩放 | `S` | Scale |
| 轨迹球旋转 | `R` → `R` | 自由旋转 |
| 清除位置 | `Alt+G` | 位置归零 |
| 清除旋转 | `Alt+R` | 旋转归零 |
| 清除缩放 | `Alt+S` | 对对象为清除缩放；编辑网格时常为沿法线收缩/膨胀 |
| 清除原点 | `Alt+O` | 依对象/姿态上下文 |
| 应用变换 | `Ctrl+A` | 位置、旋转、缩放等 |
| 变换面板 | `N` | Item 标签显示数值 |
| 调整上次操作 | `F9` | 修改刚完成的变换参数 |

### 6.2 数值输入示例

| 目标 | 输入序列 | 结果 |
|---|---|---|
| 沿 X 移动 2 m | `G` → `X` → `2` → `Enter` | X +2 |
| 沿 Z 移动 -50 cm | `G` → `Z` → `-50cm` → `Enter` | Z -0.5 m |
| 绕 Y 旋转 45° | `R` → `Y` → `45` → `Enter` | Y 轴 45° |
| 沿局部 Z 移动 | `G` → `Z` → `Z` | 局部 Z |
| XY 平面整体缩放 2 倍 | `S` → `Shift+Z` → `2` | 排除 Z |
| 沿 X 缩放为 0 | `S` → `X` → `0` | 压平到同一 X 坐标 |
| 精确移动 1/3 | `G` → `X` → `1/3` | 数值字段支持表达式 |
| 使用单位表达式 | `G` → `Z` → `#2m+5cm` | 依单位设置解析 |

### 6.3 吸附与枢轴

| 操作 | 按键 | 说明 |
|---|---|---|
| 切换吸附 | `Shift+Tab` | 磁铁开关 |
| 变换时临时吸附 | 按住 `Ctrl` | 默认设置下临时吸附 |
| 反转吸附状态 | 按住 `Ctrl` | 若磁铁已开启则临时反转 |
| 吸附饼菜单 | `Shift+S` | 光标与选择吸附命令 |
| 枢轴点饼菜单 | `.` | 主键盘句点 |
| 变换方向饼菜单 | `,` | 主键盘逗号 |
| 设置 3D 光标 | `Shift+RMB` | 3D 视图 |
| 游标到世界原点 | `Shift+S` → Cursor to World Origin | 吸附菜单 |
| 所选到游标 | `Shift+S` → Selection to Cursor | 不保留偏移 |
| 所选到游标并保留偏移 | `Shift+S` → Selection to Cursor (Keep Offset) | 整体平移 |
| 游标到所选 | `Shift+S` → Cursor to Selected | 光标定位 |
| 所选到网格 | `Shift+S` → Selection to Grid | 吸附到网格 |

### 6.4 变换中的常用修饰键

| 工具 | 按键 | 作用 |
|---|---|---|
| 移动 / 旋转 / 缩放 | `X` / `Y` / `Z` | 轴向约束 |
| 移动 / 缩放 | `Shift+X/Y/Z` | 平面约束 |
| 移动 / 旋转 / 缩放 | 按住 `Shift` | 精细调整 |
| 移动 / 旋转 / 缩放 | 按住 `Ctrl` | 吸附 / 步进 |
| 旋转 | `R` 再按 `R` | 轨迹球 |
| 缩放 | `Shift+B` | 边界缩放，依编辑器 |
| 变换 | `M` | 约束到鼠标轴，依工具支持 |
| 变换 | `C` | 切换 Clamp / Clamp Overlap 等，依具体工具 |

---
## 7. 3D 视图导航、观察与显示

### 7.1 鼠标导航

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 环绕观察 | `MMB` 拖动 | 围绕视图中心 |
| 平移视图 | `Shift+MMB` 拖动 | 自由平移 |
| 缩放视图 | `Ctrl+MMB` 拖动 | 上下拖动 |
| 滚轮缩放 | `WheelUp/Down` | 步进缩放 |
| 飞行导航 | `Shift+`` ` | 波浪号键，依键盘布局 |
| 漫游 / Walk | `Shift+`` ` 后切换 | 在导航模式中选择 |
| 旋转视图步进 | `Numpad2/4/6/8` | 15° 步进 |
| 滚转视图 | `Numpad4/6` 配合设置 | 视导航方式而定 |
| 平移视图步进 | `Ctrl+Numpad2/4/6/8` | 固定步长 |
| 缩放视图步进 | `NumpadPlus/Minus` | 放大 / 缩小 |

### 7.2 标准视图

| 视图 | 按键 | 反向视图 |
|---|---:|---:|
| 前视图 | `Numpad1` | 后视图 `Ctrl+Numpad1` |
| 右视图 | `Numpad3` | 左视图 `Ctrl+Numpad3` |
| 顶视图 | `Numpad7` | 底视图 `Ctrl+Numpad7` |
| 相机视图 | `Numpad0` | 再按退出 |
| 透视 / 正交切换 | `Numpad5` | 切换 |
| 当前视角对齐相机 | `Ctrl+Alt+Numpad0` | 对齐活动相机 |
| 活动相机对齐所选 | `F3` 搜索 | 默认无单键 |
| 查看全部 | `Home` | Frame All |
| 聚焦所选 | `NumpadPeriod` | Frame Selected |

---
## 8. 对象模式

### 8.1 模式、添加与对象基础

| 操作 | 按键 | 说明 |
|---|---|---|
| 对象 / 编辑模式切换 | `Tab` | 适用于可编辑对象 |
| 模式切换饼菜单 | `Ctrl+Tab` | 对象、编辑、雕刻、绘制等 |
| 添加对象 | `Shift+A` | 打开 Add 菜单 |
| 删除对象 | `X` 或 `Delete` | 删除所选 |
| 复制对象 | `Shift+D` | 独立数据副本 |
| 关联复制 | `Alt+D` | 共享网格等对象数据 |
| 重命名活动对象 | `F2` | 就地命名 |
| 移动到集合 | `M` | Move to Collection |
| 链接到集合 | `Shift+M` | Link to Collection，依版本菜单 |
| 新建集合 | `M` 后 New Collection | 默认无单键 |
| 设为活动对象 | `Shift+LMB` 最后选择 | 最后选中的通常为活动对象 |
| 选择层级 | `[` / `]` | 依活动工具和键位设置 |
| 选择相同类型 | `Shift+G` | Select Grouped |
| 选择链接对象 | `Shift+L` 菜单 | Select Linked |
| 从活动项选择图案 | `Shift+G` | 类型、集合、对象数据等 |

### 8.2 复制、链接与数据

| 操作 | 按键 | 说明 |
|---|---|---|
| 复制 | `Shift+D` | 对象和数据均独立 |
| 关联复制 | `Alt+D` | 变换独立，数据共享 |
| 建立链接 | `Ctrl+L` | 材质、对象数据、动画等 |
| 使单用户 | `U` | Make Single User 菜单 |
| 转换对象类型 | `F3` 搜索 `Convert` | 默认无固定单键 |
| 对象数据转移 | `Ctrl+L` | 由活动对象向所选对象链接 |
| 复制变换 | `Ctrl+C` 菜单 | Copy Attributes，依启用功能与上下文 |
| 粘贴对象 | 系统粘贴键 | 跨 Blender 实例可用性依版本 |

### 8.3 父子、约束与关系

| 操作 | 按键 | 说明 |
|---|---|---|
| 设置父级 | `Ctrl+P` | 活动对象作为父级 |
| 清除父级 | `Alt+P` | 保留或清除变换可选 |
| 添加对象约束并带目标 | `Shift+Ctrl+C` | Constraint 菜单 |
| 清除对象约束 | `Alt+Ctrl+C` | Clear Object Constraints |
| 跟踪到目标 | `Ctrl+T` | Track 菜单，依对象关系 |
| 清除跟踪 | `Alt+T` | Clear Track |
| 设置集合实例等 | `Shift+A` | Add 菜单 |
| 建立 Hook | `Ctrl+H` | 编辑模式更常见 |

### 8.4 原点、应用与变换

| 操作 | 按键 | 说明 |
|---|---|---|
| 应用变换 | `Ctrl+A` | 位置、旋转、缩放、视觉变换 |
| 清除位置 | `Alt+G` | Location = 0 |
| 清除旋转 | `Alt+R` | Rotation = 0 |
| 清除缩放 | `Alt+S` | Scale = 1 |
| 增量旋转清零 | `Alt+R` 后调整 | 依旋转模式 |
| 设置原点 | `F3` 搜索 `Set Origin` | 默认无独立键 |
| 原点到几何体 | `F3` 搜索 | Set Origin > Origin to Geometry |
| 几何体到原点 | `F3` 搜索 | Set Origin > Geometry to Origin |
| 原点到 3D 光标 | `F3` 搜索 | Set Origin > Origin to 3D Cursor |
| 视觉变换应用 | `Ctrl+A` | Visual Transform |

### 8.5 显示、隔离与可见性

| 操作 | 按键 | 说明 |
|---|---|---|
| 隐藏所选 | `H` | 仅视图隐藏 |
| 隐藏未选 | `Shift+H` | 保留所选 |
| 显示全部 | `Alt+H` | 取消隐藏 |
| 局部视图 | `NumpadSlash` | 隔离所选 |
| X-Ray | `Alt+Z` | 透视显示 |
| 切换叠加层 | `Shift+Alt+Z` | Overlay |
| 移动到集合 | `M` | 可用集合控制大批对象可见性 |

### 8.6 阴影、合并与其他

| 操作 | 按键 | 说明 |
|---|---|---|
| 合并对象 | `Ctrl+J` | Join；活动对象决定类型和属性 |
| 分离 | 编辑模式 `P` | 按所选、材质或松散部件 |
| 平滑着色 | `F3` 搜索 `Shade Auto Smooth` / `Shade Smooth` | 版本名称可能变化 |
| 平直着色 | `F3` 搜索 `Shade Flat` | 默认无单键 |
| 快速效果 | `F3` 搜索 `Quick Effects` | 毛发、烟雾、液体等依版本 |
| 添加修改器 | `Ctrl+1` 至 `Ctrl+5` | 快速添加 / 设置细分曲面级别 |
| 细分级别 0 | `Ctrl+0` | 关闭视图细分级别 |
| 将对象设为活动相机 | `Ctrl+Numpad0` | 选中相机后 |

---
## 9. 网格编辑模式：选择

### 9.1 选择模式

| 操作 | 按键 | 说明 |
|---|---|---|
| 顶点选择 | `1` | 主键盘数字行 |
| 边选择 | `2` | 主键盘数字行 |
| 面选择 | `3` | 主键盘数字行 |
| 增加一种选择模式 | `Shift+1/2/3` | 多模式选择 |
| 全选 | `A` | 全部顶点 / 边 / 面 |
| 取消全选 | `Alt+A` | 清空选择 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 矩形 |
| 圈选 | `C` | 滚轮调半径 |
| 套索 | `Ctrl+RMB` 拖动 | 自由选择 |
| 选择最短路径 | `Ctrl+LMB` | 选中两点之间路径，依选择模式 |

### 9.2 环、并排环与边界

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 选择边环 | `Alt+LMB` 边 | Edge Loop |
| 增加 / 移除边环 | `Shift+Alt+LMB` | 切换到现有选择 |
| 选择并排边环 | `Ctrl+Alt+LMB` | Edge Ring |
| 增加并排边环 | `Shift+Ctrl+Alt+LMB` | 叠加选择 |
| 选择面环 | 面模式下 `Alt+LMB` | 取决于点击位置 |
| 选择边界环 | `Alt+LMB` 边界 | 开放边界 |
| 选择边界 | `Select > Loops > Boundary Loop` | 默认无独立键 |
| 将区域转换为环 | `Select > Loops` | 可用 `F3` 搜索 |

### 9.3 链接、相似与扩展

| 操作 | 按键 | 说明 |
|---|---|---|
| 选择链接几何 | 鼠标悬停后 `L` | 选择所属连通块 |
| 取消链接几何 | 鼠标悬停后 `Shift+L` | 从选择中减去连通块 |
| 选择全部链接 | `Ctrl+L` | 从已选元素扩展 |
| 选择相似 | `Shift+G` | 法线、面积、长度、材质等 |
| 选择更多 | `Ctrl+NumpadPlus` | 扩展一圈 |
| 选择更少 | `Ctrl+NumpadMinus` | 收缩一圈 |
| 下一活动元素 | `Shift+Ctrl+NumpadPlus` | Select Next Active |
| 上一活动元素 | `Shift+Ctrl+NumpadMinus` | Select Previous Active |
| 棋盘式取消选择 | `Select > Checker Deselect` | `F3` 搜索 |
| 随机选择 | `Select > Select Random` | `F3` 搜索 |
| 按特征选择 | `Select > Select All by Trait` | 非流形、松散几何、内侧面等 |
| 选择非流形 | `Shift+Ctrl+Alt+M` | 网格检查常用 |
| 选择尖锐边 | `Select > Select Sharp Edges` | 默认无固定键 |
| 选择面朝向相似 | `Shift+G` | Face Regions / Normal |
| 选择材质相同面 | 材质属性 Select | 默认无固定键 |

### 9.4 隐藏与显示

| 操作 | 按键 | 说明 |
|---|---|---|
| 隐藏所选 | `H` | 隐藏元素 |
| 隐藏未选 | `Shift+H` | 只显示所选 |
| 显示全部 | `Alt+H` | 恢复并通常选中 |
| 局部视图 | `NumpadSlash` | 对象级隔离；编辑选择表现依版本 |
| X-Ray | `Alt+Z` | 穿透选择背面元素 |

---
## 10. 网格编辑模式：建模与拓扑

### 10.1 挤出

| 操作 | 按键 | 说明 |
|---|---|---|
| 挤出区域 | `E` | Extrude Region |
| 沿法线挤出 | `Alt+E` 菜单 | Extrude Faces Along Normals |
| 挤出单个面 | `Alt+E` 菜单 | Extrude Individual Faces |
| 挤出到光标 | `Ctrl+RMB` | 连续挤出，依选择和模式 |
| 流形挤出 | `Alt+E` 菜单 | Extrude Manifold |
| 重复挤出 | `Shift+R` | 重复上一次操作 |
| 旋绕 | `F3` 搜索 `Spin` | 围绕 3D 光标 |
| 螺旋 | Spin 后调整参数 | 无独立默认键 |

### 10.2 内插、倒角与环切

| 操作 | 按键 | 工具中修饰键 |
|---|---|---|
| 内插面 | `I` | 再按 `I` 切换单独 / 区域 |
| 倒角边 | `Ctrl+B` | 滚轮改段数；`P` 改轮廓；`C` Clamp |
| 倒角顶点 | `Shift+Ctrl+B` | 滚轮改段数 |
| 环切 | `Ctrl+R` | 滚轮改切线数量；单击确认 |
| 环切后滑移 | `Ctrl+R` → `LMB` → 移动 | `RMB` 可居中 |
| 边滑移 | `G` → `G` | `C` Clamp；`E` 切换相邻边；`Alt` 镜像 |
| 顶点滑移 | `Shift+V` | 沿相邻边滑动 |
| 收缩 / 膨胀 | `Alt+S` | 沿法线移动 |
| 偏移边滑移 | `Shift+Ctrl+R` | Offset Edge Slide |

### 10.3 切割、撕裂与补面

| 操作 | 按键 | 说明 |
|---|---|---|
| 刀具 | `K` | 切割网格 |
| 刀具确认 | `Enter` 或 `Spacebar` | 完成切割 |
| 刀具取消 | `Esc` | 取消全部 |
| 刀具新切线 | `E` | 工具内开始新切段 |
| 刀具角度约束 | `C` | 工具内切换 |
| 刀具穿透切割 | `Z` | 工具内切换 Cut Through |
| 刀具忽略吸附 | 按住 `Shift` | 工具内 |
| 二等分 | `F3` 搜索 `Bisect` | 拖线切割 |
| 撕裂 | `V` | Rip |
| 撕裂并填充 | `Alt+V` | Rip Fill |
| 分离区域 | `Y` | Split |
| 分离为对象 | `P` | Selection / Material / Loose Parts |
| 填充面 | `F` | Make Edge / Face |
| 美化填充 | `Alt+F` | Beauty Fill |
| 网格填充 | `Ctrl+F` 菜单 | Grid Fill |
| 桥接循环边 | `Ctrl+E` 菜单 | Bridge Edge Loops |

### 10.4 合并、溶解与删除

| 操作 | 按键 | 说明 |
|---|---|---|
| 合并 | `M` | At Center、At Cursor、By Distance 等 |
| 按距离合并 | `M` → By Distance | 旧版 Remove Doubles |
| 删除菜单 | `X` 或 `Delete` | 顶点、边、面等 |
| 溶解菜单 | `Ctrl+X` | Dissolve Vertices / Edges / Faces |
| 溶解顶点 | `X` 菜单 | 保持周围面 |
| 溶解边 | `X` 菜单 | 保持面 |
| 溶解面 | `X` 菜单 | 合并区域 |
| 限制性溶解 | `X` 菜单 | Limited Dissolve |
| 仅删除面 | `X` 菜单 | Only Faces |
| 删除边与面 | `X` 菜单 | Edges & Faces |
| 删除顶点 | `X` 菜单 | 会删除相连边面 |

### 10.5 细分、三角化与四边化

| 操作 | 按键 | 说明 |
|---|---|---|
| 细分 | `RMB` 菜单或 `F3` | Subdivide |
| 取消细分 | `F3` 搜索 `Un-Subdivide` | 参数在 F9 |
| 三角化面 | `Ctrl+T` | Triangulate Faces |
| 三角面转四边面 | `Alt+J` | Tris to Quads |
| 旋转边 | `Ctrl+E` 菜单 | Rotate Edge CW / CCW |
| 拆分凹面 | `F3` 搜索 | Connect Vertex Path 等 |
| 连接顶点路径 | `J` | 在面中连接所选顶点 |
| 连接顶点对 | `F3` 搜索 | Connect Vertex Pairs |
| Poke Faces | `Ctrl+F` 菜单 | 面中心插点 |

### 10.6 法线与面方向

| 操作 | 按键 | 说明 |
|---|---|---|
| 法线菜单 | `Alt+N` | Recalculate、Flip 等 |
| 向外重算法线 | `Shift+N` | Recalculate Outside |
| 向内重算法线 | `Shift+Ctrl+N` | Recalculate Inside |
| 翻转法线 | `Alt+N` → Flip | 反向 |
| 设置自定义分离法线 | `Alt+N` 菜单 | 依对象数据 |
| 按面方向显示 | Overlays > Face Orientation | 默认无固定键 |

### 10.7 边、面与顶点菜单

| 菜单 | 按键 | 典型内容 |
|---|---|---|
| 顶点菜单 | `Ctrl+V` | 合并、平滑、倒角顶点、连接 |
| 边菜单 | `Ctrl+E` | 倒角、标记缝合边、锐边、桥接、旋转 |
| 面菜单 | `Ctrl+F` | 内插、挤出、三角化、网格填充、Poke |
| 网格菜单搜索 | `F3` | 适合查找低频命令 |

### 10.8 标记与数据层

| 操作 | 路径 / 快捷键 | 说明 |
|---|---|---|
| 标记缝合边 | `Ctrl+E` → Mark Seam | UV 接缝 |
| 清除缝合边 | `Ctrl+E` → Clear Seam | 取消接缝 |
| 标记锐边 | `Ctrl+E` → Mark Sharp | 锐边 |
| 清除锐边 | `Ctrl+E` → Clear Sharp | 取消 |
| 边折痕 | `Shift+E` | 调整 Crease |
| 顶点折痕 | `Shift+E` 或 N 面板 | 依选择模式和版本 |
| 边倒角权重 | `Ctrl+Shift+E` 或 N 面板 | 依版本键位 |
| 蒙皮半径 | `Ctrl+A` | Skin Resize；仅相关上下文 |
| 顶点权重 | `Ctrl+Shift+E` / 面板 | 依活动数据层 |

### 10.9 比例编辑

| 操作 | 按键 | 说明 |
|---|---|---|
| 切换比例编辑 | `O` | Connected / Projected 依设置 |
| 比例编辑衰减菜单 | `Shift+O` | Smooth、Sphere、Root 等 |
| 调整影响半径 | `WheelUp/Down` | 变换运行中 |
| 调整影响半径 | `PageUp/PageDown` | 某些设备可用 |
| 仅连接 | 工具栏弹出选项 | 默认无独立键 |
| 投影到 2D | 工具栏弹出选项 | 默认无独立键 |

### 10.10 顶点、边、面常用专项

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 顶点平滑 | `Ctrl+V` 菜单 | Smooth Vertices |
| 顶点随机化 | `F3` 搜索 | Randomize |
| 顶点沿活动项对齐 | `S` + 轴 + `0` | 常用技巧 |
| 边拆分 | `Ctrl+E` → Edge Split | 不等同修改器 |
| 边滑移 | `G` → `G` | Edge Slide |
| 边折痕 | `Shift+E` | Subdivision Crease |
| 面内插 | `I` | Inset |
| 面挤出 | `E` | Extrude |
| 单独面挤出 | `Alt+E` | Individual |
| 面沿法线缩放 | `Alt+S` | Shrink/Fatten |
| 面三角化 | `Ctrl+T` | Triangulate |
| 面区域转环 | `Select > Loops` | Region to Loop |

---
## 11. 曲线、曲面、文本、晶格与元球

### 11.1 曲线 / 曲面编辑

| 操作 | 按键 | 说明 |
|---|---|---|
| 编辑模式 | `Tab` | 对象与编辑切换 |
| 添加控制点 / 样条 | `Shift+A` | 曲线类型菜单 |
| 挤出控制点 | `E` | Extrude |
| 挤出到光标 | `Ctrl+RMB` | 连续创建点 |
| 复制 | `Shift+D` | 复制控制点 / 样条 |
| 删除 | `X` | 控制点、段或样条 |
| 分离 | `P` | 选中样条成为新对象 |
| 分割样条 | `Y` | Split |
| 切换循环 | `Alt+C` | Toggle Cyclic |
| 设置手柄类型 | `V` | Free、Aligned、Vector、Automatic |
| 倾斜 | `Ctrl+T` | Tilt |
| 清除倾斜 | `Alt+T` | Clear Tilt |
| 半径 | `Alt+S` | 控制点 Radius |
| 平滑 | `F3` 搜索 `Smooth` | 位置、半径或倾斜 |
| 细分 | `RMB` / `F3` | Subdivide |
| 切换方向 | `F3` 搜索 `Switch Direction` | 反转样条方向 |
| 设置样条类型 | `F3` 搜索 `Set Spline Type` | Poly / Bézier / NURBS |
| 合并控制点 | `M` | 依曲线类型 |
| 连接两条样条 | `F` | Make Segment |

### 11.2 文本对象编辑

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 进入 / 退出文本编辑 | `Tab` | `Tab` | 编辑字符串 |
| 全选文本 | `Ctrl+A` | `Command+A` | 文本上下文 |
| 复制 | `Ctrl+C` | `Command+C` | 复制文字 |
| 粘贴 | `Ctrl+V` | `Command+V` | 粘贴文字 |
| 剪切 | `Ctrl+X` | `Command+X` | 剪切文字 |
| 删除前一字符 | `Backspace` | `Delete` | 依键盘 |
| 删除后一字符 | `Delete` | `Fn+Delete` | macOS 前向删除 |
| 行首 / 行尾 | `Home` / `End` | `Command+Left/Right` 或 `Home/End` | 系统键盘差异 |
| 上 / 下移动光标 | `Up` / `Down` | 同左 | 多行文本 |
| 选择字符 | `Shift+方向键` | 同左 | 扩展选区 |
| 插入文本框换行 | `Enter` | `Return` | 新行 |
| 插入特殊字符 | Text 菜单 | Text 菜单 | 无统一单键 |
| 字符样式 | Text 菜单 | Text 菜单 | 粗体、斜体、下划线等 |
| 字距调整 | `Alt+Left/Right` | `Option+Left/Right` | 依文本编辑上下文 |

### 11.3 晶格

| 操作 | 按键 | 说明 |
|---|---|---|
| 编辑模式 | `Tab` | 编辑晶格点 |
| 全选 | `A` | 所有点 |
| 选择更多 / 更少 | `Ctrl+NumpadPlus/Minus` | 扩展 / 收缩 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | 常规变换 |
| 比例编辑 | `O` | 平滑变形 |
| 镜像 | `Ctrl+M` | 轴向镜像 |
| 使规则化 | `F3` 搜索 `Make Regular` | 恢复规则分布 |

### 11.4 元球

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加元球元素 | `Shift+A` | 编辑模式中加入同一族 |
| 复制元素 | `Shift+D` | 复制 |
| 删除元素 | `X` | 删除 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | 缩放改变半径 |
| 隐藏 / 显示 | `H` / `Alt+H` | 可见性 |
| 选择相似 | `Shift+G` | 类型、半径等依版本 |

---
## 12. 骨架编辑、姿态与权重

### 12.1 骨架编辑模式

| 操作 | 按键 | 说明 |
|---|---|---|
| 对象 / 编辑切换 | `Tab` | 骨架结构编辑 |
| 添加骨骼 | `Shift+A` | 在 3D 光标处 |
| 挤出骨骼 | `E` | 从选中端点 |
| 对称挤出 | `Shift+E` | 需 `.L` / `.R` 命名逻辑 |
| 细分骨骼 | `RMB` / `F3` | Subdivide |
| 复制骨骼 | `Shift+D` | 复制 |
| 删除骨骼 | `X` | 删除 |
| 分离骨架 | `P` | Separate Bones |
| 合并骨骼 | `F3` 搜索 `Merge Bones` | 方式依选择 |
| 父级 | `Ctrl+P` | Connected 或 Keep Offset |
| 清除父级 | `Alt+P` | Clear Parent |
| 切换连接 | `F3` 搜索 `Switch Direction` / Relations | 依结构 |
| 切换骨骼方向 | `F3` 搜索 `Switch Direction` | 交换头尾 |
| 骨骼滚转 | `Ctrl+R` | Roll |
| 清除滚转 | `Alt+R` | Clear Roll |
| 重算法向 / 滚转 | `Shift+N` | Recalculate Roll |
| 细化骨骼 | `F3` 搜索 `Subdivide` | 多段 |
| 自动命名左右 | `F3` 搜索 `Auto-Name Left/Right` | 命名 |
| 对称化 | `F3` 搜索 `Symmetrize` | 复制另一侧 |
| 选择父级 | `[` | 依默认键位和上下文 |
| 选择子级 | `]` | 依默认键位和上下文 |
| 选择层级 | `Shift+[` / `Shift+]` | 扩展层级选择 |

### 12.2 姿态模式

| 操作 | 按键 | 说明 |
|---|---|---|
| 模式饼菜单 | `Ctrl+Tab` | 切换 Pose Mode |
| 选择全部骨骼 | `A` | 全选 |
| 取消全选 | `Alt+A` | 清空 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | 姿态变换 |
| 清除位置 | `Alt+G` | Pose Location |
| 清除旋转 | `Alt+R` | Pose Rotation |
| 清除缩放 | `Alt+S` | Pose Scale |
| 清除全部变换 | `Alt+G`、`Alt+R`、`Alt+S` | 可用 Pose > Clear Transform |
| 应用姿态 | `Ctrl+A` | Pose as Rest Pose 等 |
| 复制姿态 | `Ctrl+C` | Copy Pose |
| 粘贴姿态 | `Ctrl+V` | Paste Pose |
| X 轴翻转粘贴 | `Shift+Ctrl+V` | Paste X-Flipped |
| 插入关键帧菜单 | `I` | LocRotScale 等 |
| 删除关键帧 | `Alt+I` | 当前姿态属性 |
| 添加约束并带目标 | `Shift+Ctrl+C` | Bone Constraint |
| 清除约束 | `Alt+Ctrl+C` | Clear Pose Constraints |
| 设置 IK | `Shift+I` | Add IK |
| 清除 IK | `Alt+I` 菜单 / 搜索 | 与删除关键帧有上下文冲突 |
| 推姿态 | `Ctrl+E` | Push Pose from Breakdown，依版本 |
| 放松姿态 | `Alt+E` | Relax Pose，依版本 |
| Breakdown | `Shift+E` | Breakdowner，依版本键位 |
| 传播姿态 | `Alt+P` 菜单 | Propagate |
| 镜像姿态 | `Ctrl+M` | 对称骨骼命名时 |
| 四元数翻转 | `F3` 搜索 | Flip Quats |
| 隐藏所选 | `H` | 骨骼可见性 |
| 隐藏未选 | `Shift+H` | 只显示所选 |
| 显示全部 | `Alt+H` | 恢复 |

### 12.3 权重与骨架绑定

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 对象设父级到骨架 | `Ctrl+P` | Object / Armature Deform |
| 自动权重 | `Ctrl+P` → With Automatic Weights | 常用绑定 |
| 空组权重 | `Ctrl+P` → With Empty Groups | 手动权重 |
| 包络权重 | `Ctrl+P` → With Envelope Weights | 骨骼包络 |
| 清除父级 | `Alt+P` | 可保留变换 |
| 进入权重绘制 | `Ctrl+Tab` 饼菜单 | 选中网格 |
| 骨骼间切换活动项 | `Ctrl+LMB` 骨骼 | 权重绘制中依选择设置 |
| 归一化全部 | Weights 菜单 | 默认无固定键 |
| 镜像权重 | Weights > Mirror | 默认无固定键 |
| 从骨骼指定权重 | Vertex Groups 面板 | 默认无固定键 |

---
## 13. 雕刻模式

> Blender 5.x 的雕刻画笔大量使用资产架（Asset Shelf）。部分旧教程中的数字画笔键位可能因版本、工作区或用户设置不同，不应当作 5.2 的通用默认表。

### 13.1 模式与画笔通用

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 模式切换饼菜单 | `Ctrl+Tab` | 进入 Sculpt Mode |
| 雕刻笔触 | `LMB` 拖动 | 当前画笔 |
| 反向画笔效果 | 按住 `Ctrl` 绘制 | 例如凸起变凹陷 |
| 临时平滑 | 按住 `Shift` 绘制 | Smooth |
| 精细控制 | 按住 `Shift` 配合部分模态调整 | 依工具 |
| 调整画笔半径 | `F` 后移动鼠标 | `LMB` 确认 |
| 调整画笔强度 | `Shift+F` 后移动 | Strength |
| 调整纹理角度 | `Ctrl+F` 后移动 | 有纹理画笔时 |
| 取样颜色 | `S` | 彩色雕刻 / 绘制上下文 |
| 交换主 / 次颜色 | `X` | 颜色画笔 |
| 颜色归默认黑白 | `D` | 绘制类上下文 |
| 打开资产架 | `Shift+T` 或界面按钮 | 键位可能随版本 / 区域设置 |
| 搜索画笔 | `F3` 或资产架搜索 | 低频画笔更稳定 |

### 13.2 遮罩与面组

| 操作 | 按键 | 说明 |
|---|---|---|
| 遮罩绘制 | `M` 或 Mask 工具 | 取决于活动工具 / 5.x 资产设置 |
| 反转遮罩 | `Ctrl+I` | Sculpt Mask 上下文 |
| 清除遮罩 | `Alt+M` | Clear Mask |
| 填满遮罩 | `F3` 搜索 `Fill Mask` | 默认键位依版本 |
| 羽化遮罩 | `F3` 搜索 `Feather Mask` | 扩展 / 收缩 |
| 遮罩滤镜 | `F3` 搜索 `Mask Filter` | Smooth、Sharpen 等 |
| 从遮罩创建面组 | `F3` 搜索 | Face Set from Masked |
| 显示全部面组 | `F3` 搜索 `Show All Face Sets` | 恢复 |
| 隐藏活动面组 | `H` | 光标所处 / 活动面组，依版本 |
| 显示全部 | `Alt+H` | 恢复隐藏几何 |
| 反转可见 | `Shift+H` | 依雕刻显示上下文 |

### 13.3 动态拓扑、多级精度与重网格

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 切换动态拓扑 | `Ctrl+D` | Dyntopo；可能弹出警告 |
| 细节尺寸取样 | `Shift+D` | Dyntopo Detail Size |
| 切换细节泛洪填充 | `F3` 搜索 | Detail Flood Fill |
| 体素尺寸调整 | `R` | Voxel Size，依雕刻上下文 |
| 体素重网格 | `Ctrl+R` | Voxel Remesh |
| 多级精度向上 | `PageUp` | Multires 更高层级，依键位 |
| 多级精度向下 | `PageDown` | 更低层级 |
| 重建较低细分 | `F3` 搜索 | Rebuild Subdivisions |
| 从雕刻应用基础 | `F3` 搜索 | Apply Base |

### 13.4 雕刻显示与枢轴

| 操作 | 按键 | 说明 |
|---|---|---|
| 线框 / 着色饼菜单 | `Z` | 与 3D 视图相同 |
| X-Ray | `Alt+Z` | 视显示设置 |
| 聚焦所选 / 活动区域 | `NumpadPeriod` | Frame Selected |
| 设置雕刻枢轴 | `Shift+RMB` 或 Sculpt 菜单 | 依版本设置 |
| 对称菜单 | Sculpt > Symmetry | 默认无统一单键 |
| 切换 X 对称 | `X` 在部分雕刻工具外 | 与颜色交换可能冲突，以状态栏为准 |
| 切换 Y / Z 对称 | Sculpt 菜单或自定义 | 默认键位依版本 |

---
## 14. 顶点绘制、权重绘制与纹理绘制

### 14.1 绘制类通用画笔

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 绘制 | `LMB` 拖动 | 当前画笔 |
| 反向 / 次级效果 | `Ctrl+LMB` 拖动 | 依画笔 |
| 临时平滑 | `Shift+LMB` 拖动 | 权重 / 顶点绘制常用 |
| 画笔半径 | `F` | 移动鼠标后确认 |
| 画笔强度 | `Shift+F` | 调整 Strength |
| 纹理角度 | `Ctrl+F` | Texture Angle |
| 取样颜色 / 权重 | `S` | Sample |
| 交换颜色 | `X` | 主 / 次颜色 |
| 默认颜色 | `D` | 恢复黑白 |
| 线条方法菜单 | `E` | Stroke Method，依绘制模式 |
| 画笔混合模式 | `Shift+E` | Blend Mode，依模式 |
| 隐藏所选 | `H` | 面选择遮罩启用时 |
| 显示全部 | `Alt+H` | 恢复 |

### 14.2 权重绘制

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 进入权重绘制 | `Ctrl+Tab` 饼菜单 | Weight Paint |
| 取样顶点组 / 骨骼 | `Ctrl+LMB` | 骨架姿态配合时 |
| 设置权重 | 直接绘制 | 当前 Weight 值 |
| 模糊权重 | 按住 `Shift` 绘制 | 临时 Blur / Smooth |
| 归一化全部 | Weights > Normalize All | 默认无固定键 |
| 归一化 | Weights > Normalize | 活动组 |
| 镜像 | Weights > Mirror | X 镜像 |
| 反转 | Weights > Invert | 当前顶点组 |
| 清理 | Weights > Clean | 移除小权重 |
| 量化 | Weights > Quantize | 权重量化 |
| 从骨骼生成 | Weights 菜单 | 依绑定 |
| 锁定相对 | 工具设置 | 默认无固定键 |

### 14.3 顶点绘制

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 进入顶点绘制 | `Ctrl+Tab` 饼菜单 | Vertex Paint |
| 取样颜色 | `S` | 从模型取样 |
| 设置顶点颜色 | `Shift+K` | Set Vertex Colors，依版本键位 |
| 模糊 | 按住 `Shift` 或选择 Blur 画笔 | 依活动画笔 |
| 填充 | Fill 工具 | 资产 / 工具栏 |
| 颜色滤镜 | Paint 菜单 | Brightness、Hue 等 |

### 14.4 纹理绘制

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 进入纹理绘制 | `Ctrl+Tab` 饼菜单 | Texture Paint |
| 取样颜色 | `S` | Sample Color |
| 克隆源 | `Ctrl+LMB` | Clone 画笔上下文 |
| 填充颜色 | Fill 工具 | 工具栏 |
| 遮罩切换 | `M` / 工具设置 | 依当前遮罩方式 |
| 图像保存 | Image > Save | 绘制结果必须保存到图像 |
| 保存所有图像 | `F3` 搜索 `Save All Images` | 默认无固定键 |
| 快速 UV 检查 | 切换 UV Editor | 建议拆分区域 |

---
## 15. Grease Pencil / 2D 动画

> Blender 4.3 起 Grease Pencil 内部架构发生较大变化；5.2 的操作名称和旧版教程可能不同。以下以新版 Grease Pencil 模式和通用默认键为准。

### 15.1 模式与绘制

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 模式切换饼菜单 | `Ctrl+Tab` | Draw、Edit、Sculpt 等 |
| 绘制笔触 | `LMB` 拖动 | Draw Mode |
| 橡皮擦 | `E` 或按住工具定义键 | 依活动工具 |
| 临时橡皮擦 | `Ctrl+LMB` | 依画笔设置 |
| 半径 | `F` | 调整画笔大小 |
| 强度 | `Shift+F` | 调整 Strength |
| 选择绘制工具 | 资产架 / 工具栏 | 5.x 推荐 |
| 直线 / 折线 / 圆弧 | 工具栏 | 默认未必有单键 |
| 切换笔刷材质 | 材质槽或资产架 | 默认无统一键 |

### 15.2 Grease Pencil 编辑模式

| 操作 | 按键 | 说明 |
|---|---|---|
| 点选择 | `1` | 主数字行 |
| 线段选择 | `2` | 依新版选择模式 |
| 笔画选择 | `3` | 依新版选择模式 |
| 全选 / 取消 | `A` / `Alt+A` | 当前图层 / 帧 |
| 框选 | `B` | 选择点或笔画 |
| 圈选 | `C` | 圆形选择 |
| 选择链接 | `L` | 鼠标悬停笔画 |
| 选择更多 / 更少 | `Ctrl+NumpadPlus/Minus` | 扩展 / 收缩 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | 通用变换 |
| 挤出点 | `E` | 端点挤出 |
| 复制 | `Shift+D` | 复制点 / 笔画 |
| 删除 | `X` | 删除菜单 |
| 分离 | `P` | 选中内容为新对象 |
| 拆分 | `Y` | 分割笔画 |
| 细分 | `F3` 搜索 `Subdivide` | 增加点 |
| 简化 | `F3` 搜索 `Simplify` | 减少点 |
| 平滑 | `F3` 搜索 `Smooth` | 位置、半径、不透明度 |
| 合并 | `M` | 点合并，依选择 |
| 闭合笔画 | `F3` 搜索 `Toggle Cyclic` | 循环 |
| 设置起点 | `F3` 搜索 | Set Start Point |
| 反转方向 | `F3` 搜索 | Switch Direction |
| 重投影 | `F3` 搜索 `Reproject` | 投影到视图 / 表面 |

### 15.3 帧与图层

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 插入空白关键帧 | `Shift+I` / Grease Pencil 菜单 | 依当前模式 |
| 插入复制帧 | `I` 菜单 | 复制上一帧内容 |
| 删除活动帧 | `X` 在 Dope Sheet | 时间线上下文 |
| 洋葱皮 | 数据属性 / Overlays | 默认无统一键 |
| 新建图层 | 图层面板 `+` | 默认无固定键 |
| 上 / 下移动图层 | 图层面板 | 默认无固定键 |
| 锁定 / 隐藏图层 | 图层面板图标 | 可自定义 |

---
## 16. UV 编辑器与图像编辑器

### 16.1 UV 选择

| 操作 | 按键 | 说明 |
|---|---|---|
| UV 顶点选择 | `1` | UV Sync 状态会影响 |
| UV 边选择 | `2` | 同上 |
| UV 面选择 | `3` | 同上 |
| UV 岛选择 | `4` | UV Editor |
| 全选 | `A` | 全部 UV |
| 取消全选 | `Alt+A` | 清空 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 矩形 |
| 圈选 | `C` | 圆形 |
| 选择链接 | `L` | 当前 UV 岛 |
| 选择更多 / 更少 | `Ctrl+NumpadPlus/Minus` | 扩展 / 收缩 |
| 选择重叠 | `Select > Select Overlap` | 默认无固定键 |
| 选择钉固 | `Select > Select Pinned` | 默认无固定键 |

### 16.2 UV 变换与展开

| 操作 | 按键 | 说明 |
|---|---|---|
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | UV 变换 |
| 约束 X / Y | 变换后 `X` / `Y` | UV 平面 |
| 剪切 UV | `Ctrl+X` | 依编辑上下文 |
| 复制 UV | `Ctrl+C` | UV Copy，系统键可能不同 |
| 粘贴 UV | `Ctrl+V` | UV Paste |
| 钉固 | `P` | Pin |
| 取消钉固 | `Alt+P` | Unpin |
| 展开菜单 | `U` | 3D 视图编辑模式中 |
| Unwrap | `U` → Unwrap | 使用缝合边 |
| Smart UV Project | `U` 菜单 | 智能投影 |
| Lightmap Pack | `U` 菜单 | 光照贴图 |
| Follow Active Quads | `U` 菜单 | 活动四边面展开 |
| Cube / Cylinder / Sphere Projection | `U` 菜单 | 投影 |
| Project from View | `U` 菜单 | 从当前视图 |
| 最小化拉伸 | `UV > Minimize Stretch` | 运行中 `LMB` 确认 |
| 平均岛缩放 | `UV > Average Islands Scale` | 统一纹理密度 |
| 打包 UV 岛 | `UV > Pack Islands` | F9 调边距等 |
| 缝合 | `V` | Stitch |
| 焊接 | `W` 或 UV 菜单 | 依当前键位 / 版本 |
| 对齐 | `Shift+W` / UV 菜单 | Align Auto 等，依版本 |
| 镜像 | `Ctrl+M` | 选择 X 或 Y |
| 捕捉 | `Shift+S` | 游标 / 网格 / 像素 |
| 比例编辑 | `O` | UV 比例编辑 |

### 16.3 UV 接缝

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 标记接缝 | 3D 编辑模式 `Ctrl+E` → Mark Seam | 在网格边上 |
| 清除接缝 | `Ctrl+E` → Clear Seam | 取消 |
| 从岛生成接缝 | UV > Seams from Islands | 默认无单键 |
| 实时展开 | UV > Live Unwrap | 切换 |

### 16.4 图像查看

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 平移图像 | `MMB` 拖动 | 查看 |
| 缩放 | `Wheel` 或 `NumpadPlus/Minus` | 放大 / 缩小 |
| 1:1 查看 | `Numpad1` | View at 100% |
| 查看全部 | `Home` | Fit |
| 聚焦所选 UV | `NumpadPeriod` | View Selected |
| 切换侧栏 | `N` | Image / View / Tool |
| 切换工具栏 | `T` | 工具 |
| 渲染槽切换 | `J` | Render Result 中循环 |
| 显示 Alpha | `A` 或通道按钮 | 依图像显示上下文 |
| 保存图像 | `Alt+S` / Image 菜单 | 以菜单显示为准 |
| 另存图像 | `Shift+Alt+S` / Image 菜单 | 以菜单显示为准 |
| 重新载入图像 | `Alt+R` / Image 菜单 | 可能与旋转冲突，以菜单为准 |

---
## 17. 节点编辑器

适用于 Shader Editor、Compositor、Geometry Node Editor 等；不同节点树会有少量专属命令。

### 17.1 添加、选择与布局

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加节点 | `Shift+A` | Add 菜单 |
| 搜索添加 | `Shift+A` 后搜索 | 直接输入节点名 |
| 全选 | `A` | 所有节点 |
| 取消全选 | `Alt+A` | 清空 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 选择节点 |
| 圈选 | `C` | 圆形选择 |
| 套索 | `Ctrl+RMB` 拖动 | 自由选择 |
| 选择链接来源 | `L` | Select Linked From |
| 选择链接目标 | `Shift+L` | Select Linked To，依版本 |
| 移动节点 | `G` | 节点布局 |
| 精细移动 | `G` 后按住 `Shift` | 减速 |
| 复制节点 | `Shift+D` | 复制 |
| 删除节点 | `X` 或 `Delete` | 删除并断开 |
| 删除但保持连接 | `Ctrl+X` | Delete with Reconnect |
| 静音节点 | `M` | Mute |
| 隐藏节点内容 | `H` | Collapse |
| 隐藏未选 | `Shift+H` | 依节点编辑上下文 |
| 显示全部 | `Alt+H` | 恢复 |
| 调整节点宽度 | 拖右边缘 | 无键盘默认 |
| 对齐节点 | `Shift+=` / Node 菜单 | 依版本 |

### 17.2 连线、切断与重定向

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 创建连线 | 从输出端口 `LMB` 拖到输入 | Link |
| 替换输入连线 | 拖新线到已有输入 | 自动替换 |
| 切断连线 | `Ctrl+RMB` 拖过连线 | Cut Links |
| 多线切断 | `Ctrl+RMB` 连续拖动 | Knife Links |
| 重新路由节点 | `Shift+A` → Reroute | Reroute |
| 插入节点到连线 | 拖节点覆盖连线 | 自动插入 |
| 从端口拖出搜索 | 从端口拖到空白 | 显示兼容节点搜索 |
| 移动并保持连接 | `G` | 普通移动 |
| 分离节点但保留连线 | `Alt` 拖动节点 | Detach Links，依版本 |
| 断开活动节点全部链接 | `Alt+L` | Detach Links |

### 17.3 节点组与框

| 操作 | 按键 | 说明 |
|---|---|---|
| 建立节点组 | `Ctrl+G` | Group |
| 进入节点组 | `Tab` | 光标 / 活动节点为组时 |
| 退出节点组 | `Tab` | 返回上层 |
| 取消分组 | `Alt+G` | Ungroup |
| 添加到框 | 选节点后 `Ctrl+J` | Join in New Frame |
| 从框中移除 | `Alt+P` | Remove from Frame |
| 编辑组接口 | `N` 侧栏 | Interface |
| 复制组节点 | `Shift+D` | 默认仍共享节点组数据 |
| 使节点组单用户 | 节点数据按钮 | 默认无固定键 |

### 17.4 视图与预览

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 平移 | `MMB` 拖动 | 画布平移 |
| 缩放 | `Wheel` / `Ctrl+MMB` | 缩放 |
| 查看全部 | `Home` | Frame All |
| 聚焦所选 | `NumpadPeriod` | Frame Selected |
| 切换侧栏 | `N` | 节点 / 工具 / 接口 |
| 切换工具栏 | `T` | 若该编辑器有工具栏 |
| 预览背景移动 | `Alt+MMB` | Compositor Backdrop |
| 预览背景缩放 | `V` / `Alt+V` | Compositor Backdrop 缩放 |
| 适配背景 | `Home` | 依 Compositor 上下文 |

### 17.5 Geometry Nodes 与 Node Wrangler

| 操作 | 按键 | 说明 |
|---|---|---|
| 连接到 Viewer | `Shift+Ctrl+LMB` 节点 | Node Wrangler / Viewer Shortcut，需功能可用 |
| Viewer 编号 | `Ctrl+1` 至 `Ctrl+9` | 选 Viewer 后分配，Geometry Nodes 5.2 |
| 切换 Viewer | 对应 `Ctrl+数字` | 依当前节点树 |
| Node Wrangler 快捷菜单 | `Shift+W` | 启用 Node Wrangler 扩展后 |
| 快速连接所选节点 | `F` | Make Links，依选择 |
| 交换链接 | Node Wrangler 快捷键 | 属扩展，不作为原生固定键收录 |
| 标签搜索 | `F3` / 资产搜索 | 5.x 节点资产 |

> Node Wrangler 已作为扩展 / 加载项提供，其键位可能随扩展版本变化。本文不把所有扩展键位冒充 Blender 核心默认键位。

---
## 18. 动画通用、时间线与摄影表

### 18.1 播放与帧跳转

| 操作 | 按键 | 说明 |
|---|---|---|
| 播放 / 暂停 | `Spacebar` | 取决于 Spacebar Action 设置 |
| 播放动画 | `Alt+A` | 默认 Blender Keymap |
| 反向播放 | `Shift+Ctrl+Spacebar` | Reverse Animation |
| 跳到下一帧 | `Right Arrow` | +1 帧 |
| 跳到上一帧 | `Left Arrow` | -1 帧 |
| 跳到下一关键帧 | `Up Arrow` | 当前上下文 |
| 跳到上一关键帧 | `Down Arrow` | 当前上下文 |
| 跳到起始帧 | `Shift+Left Arrow` | Start Frame |
| 跳到结束帧 | `Shift+Right Arrow` | End Frame |
| 跳到指定帧 | `Shift+Left Arrow` 后输入或 Timeline 字段 | 可用 `F3` 搜索 Jump to Keyframes |
| 设置当前帧 | `LMB` 时间标尺 | 拖动擦洗 |
| 拖动播放头 | `LMB` 拖动 | Scrub |

### 18.2 关键帧

| 操作 | 按键 | 说明 |
|---|---|---|
| 插入关键帧菜单 | `I` | 3D 视图中对所选对象 |
| 插入悬停属性关键帧 | `I` 悬停属性 | 单属性 |
| 删除关键帧 | `Alt+I` | 对当前关键集 / 属性 |
| 删除悬停属性关键帧 | `Alt+I` 悬停属性 | 单属性 |
| 更改关键帧类型 | `R` / Key 菜单 | 依动画编辑器 |
| 设置活动关键集 | Keying 菜单 | 默认无统一键 |
| 切换自动关键帧 | Timeline 录制按钮 | 默认无固定键 |
| 插入 Available 关键帧 | `I` 菜单 | Available |
| 插入 LocRotScale | `I` 菜单 | 位置旋转缩放 |
| 插入视觉变换关键帧 | `I` 菜单 | Visual LocRotScale |

### 18.3 时间线标记

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加标记 | `M` | 当前帧 |
| 重命名标记 | `Ctrl+M` | 活动标记 |
| 复制标记 | `Shift+D` | 时间线 / 动画编辑器 |
| 删除标记 | `X` | 活动标记 |
| 移动标记 | `G` | 改变帧位置 |
| 将相机绑定到标记 | `Ctrl+B` | 选中相机与标记，依上下文 |
| 跳到下一个标记 | `PageDown` | 依编辑器 |
| 跳到上一个标记 | `PageUp` | 依编辑器 |

### 18.4 Dope Sheet / Action Editor 选择与编辑

| 操作 | 按键 | 说明 |
|---|---|---|
| 全选 | `A` | 关键帧 |
| 取消全选 | `Alt+A` | 清空 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 矩形 |
| 圈选 | `C` | 圆形 |
| 列选择 | `K` | 同帧关键列 |
| 左侧关键帧 | `[` | Select Left |
| 右侧关键帧 | `]` | Select Right |
| 更多 / 更少 | `Ctrl+NumpadPlus/Minus` | 扩展通道 / 选择，依区域 |
| 移动关键帧 | `G` | 时间移动 |
| 缩放关键帧时间 | `S` | 围绕枢轴 |
| 复制关键帧 | `Shift+D` | 复制并移动 |
| 删除关键帧 | `X` 或 `Delete` | 删除 |
| 复制到剪贴板 | `Ctrl+C` | 关键帧 |
| 粘贴 | `Ctrl+V` | 可在 F9 调偏移 / 镜像 |
| X 翻转粘贴 | `Shift+Ctrl+V` | 适合骨骼动画 |
| 吸附 | `Shift+S` | 当前帧、最近帧、标记等 |
| 镜像 | `Ctrl+M` | 按当前帧、时间 0、标记等 |
| 设置插值模式 | `T` | Constant / Linear / Bézier |
| 设置关键帧类型 | `R` | Keyframe / Breakdown / Extreme 等 |
| 设置手柄类型 | `V` | 适用于支持曲线手柄的上下文 |
| 外推模式 | `Shift+E` | Constant / Linear / Cyclic 等 |
| 清理关键帧 | Key > Clean Keyframes | 默认无固定键 |
| 采样关键帧 | Key > Sample Keyframes | 默认无固定键 |
| 查看全部 | `Home` | Frame All |
| 聚焦所选 | `NumpadPeriod` | Frame Selected |

### 18.5 通道区域

| 操作 | 按键 | 说明 |
|---|---|---|
| 重命名通道 | `F2` | 活动通道 |
| 删除通道 | `X` | 鼠标需在通道区域 |
| 切换通道可见 | `H` | 依动画编辑器 |
| 隐藏未选通道 | `Shift+H` | 依上下文 |
| 显示全部通道 | `Alt+H` | 恢复 |
| 展开通道 | `NumpadPlus` | 层级展开 |
| 折叠通道 | `NumpadMinus` | 层级折叠 |
| 全部展开 / 折叠 | `Shift+NumpadPlus/Minus` | 层级 |
| 移动通道 | `PageUp/PageDown` 或菜单 | 依编辑器和通道类型 |

---
## 19. 曲线编辑器与非线性动画

### 19.1 Graph Editor 选择与变换

| 操作 | 按键 | 说明 |
|---|---|---|
| 全选 / 取消 | `A` / `Alt+A` | 关键帧 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 选择关键帧 |
| 圈选 | `C` | 圆形 |
| 列选择 | `K` | 同帧 |
| 移动 | `G` | 时间 / 数值 |
| 仅沿时间移动 | `G` → `X` | X 轴 |
| 仅沿数值移动 | `G` → `Y` | Y 轴 |
| 缩放 | `S` | 时间与数值 |
| 旋转 | `R` | 旋转关键点分布，较少用 |
| 复制 | `Shift+D` | 复制关键帧 |
| 删除 | `X` | 删除 |
| 查看全部 | `Home` | 全部曲线 |
| 聚焦所选 | `NumpadPeriod` | 所选关键帧 |
| 归一化曲线 | `Ctrl+N` | Normalize，依 Graph Editor 上下文 |
| 自动归一化 | Graph 视图菜单 | 默认无固定键 |

### 19.2 手柄、插值与外推

| 操作 | 按键 | 说明 |
|---|---|---|
| 插值模式 | `T` | Constant / Linear / Bézier |
| 手柄类型 | `V` | Free、Aligned、Vector、Auto 等 |
| 外推模式 | `Shift+E` | Constant、Linear、Make Cyclic 等 |
| 调整手柄 | `G` | 选中手柄后 |
| 镜像 | `Ctrl+M` | 时间或数值轴 |
| 吸附 | `Shift+S` | 最近帧、当前帧、游标值等 |
| 平滑关键帧 | `Alt+O` | Smooth Keys，依版本 |
| 平滑曲线 | `F3` 搜索 `Smooth` | Gaussian / Butterworth 等依版本 |
| 采样曲线 | Key > Sample Keyframes | 默认无固定键 |
| 烘焙曲线 | Channel / Key 菜单 | 默认无固定键 |
| 添加 F-Curve Modifier | `Shift+Ctrl+M` / 菜单 | 依版本键位 |
| 复制修改器 | 通道菜单 | 默认无固定键 |

### 19.3 Graph Editor 游标

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 设置 2D 游标 | `Shift+RMB` | 时间 / 数值位置 |
| 游标到所选 | `Shift+S` 菜单 | Cursor to Selected |
| 所选到游标值 | `Shift+S` 菜单 | Current Frame / Cursor Value |
| 枢轴点菜单 | `.` | Median、2D Cursor 等 |

### 19.4 NLA Editor

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加动作片段 | `Shift+A` | Add Action Strip |
| 全选 / 取消 | `A` / `Alt+A` | 片段 |
| 框选 | `B` | 选择 |
| 移动片段 | `G` | 时间移动 |
| 缩放片段 | `S` | 时间缩放 |
| 复制片段 | `Shift+D` | 复制 |
| 删除片段 | `X` | 删除 |
| 分割片段 | `Y` | Split Strips |
| 切换片段静音 | `H` | Mute / Hide 依上下文 |
| 进入 / 退出调整模式 | `Tab` | Tweak Mode |
| 吸附 | `Shift+S` | 帧、标记等 |
| 交换片段顺序 | `PageUp/PageDown` | 上 / 下轨道，依版本 |
| 添加过渡 | `Shift+T` | Add Transition |
| 添加声音 | `Shift+A` 菜单 | Sound Clip |
| 查看全部 | `Home` | Frame All |
| 聚焦所选 | `NumpadPeriod` | Frame Selected |
## 20. 大纲视图、属性、资产与文件浏览器

### 20.1 Outliner 大纲视图

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 选择条目 | `LMB` | 单选 |
| 添加 / 移除选择 | `Ctrl+LMB` | Outliner 的选择规则与多数编辑器不同 |
| 范围选择 | `Shift+LMB` | 连续范围 |
| 全选 | `A` | 当前层级 / 显示内容 |
| 取消全选 | `Alt+A` | 清空 |
| 框选 | `B` | 拖框选择 |
| 重命名 | `F2` 或双击名称 | Rename |
| 删除 | `X` 或 `Delete` | 删除对象 / 数据，注意确认内容 |
| 显示活动项 | `NumpadPeriod` | Show Active |
| 展开一级 | `NumpadPlus` | Show One Level |
| 折叠一级 | `NumpadMinus` | Hide One Level |
| 展开全部 | `Shift+NumpadPlus` | 展开层级 |
| 折叠全部 | `Shift+NumpadMinus` | 收起层级 |
| 展开 / 折叠单项 | 单击三角 | 层级树 |
| 递归展开 / 折叠 | `Shift+LMB` 三角 | 整个子树 |
| 打开上下文菜单 | `RMB` | 对象、集合或数据 |
| 拖动到集合 | `LMB` 拖动条目 | 改变层级 / 集合 |
| 链接到集合 | `Shift` 拖动 | 依拖放目标和版本 |
| 搜索 | 搜索框；`F3` 不能替代过滤框 | 按名称过滤 |
| 切换显示模式 | 左上模式菜单 | View Layer、Blender File、Orphan Data 等 |
| 清理孤立数据 | Orphan Data 模式 > Purge | 默认无固定键 |

### 20.2 属性编辑器与按钮

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 搜索属性 | 顶部搜索框 | 过滤当前上下文 |
| 插入关键帧 | `I` 悬停属性 | 变黄表示关键帧 |
| 删除关键帧 | `Alt+I` 悬停属性 | 移除 |
| 添加驱动器 | `RMB` 属性 | Add Driver |
| 复制为新驱动器 | `RMB` 属性 | Copy as New Driver |
| 复制数据路径 | `RMB` 属性 | 脚本常用 |
| 重置默认值 | `Backspace` 悬停数值 | 依按钮类型 |
| 恢复未编辑值 | `RMB` > Reset to Default Value | 稳定方式 |
| 精细拖动数值 | 按住 `Shift` 拖动 | 细调 |
| 步进拖动数值 | 按住 `Ctrl` 拖动 | 离散步进 |
| 直接输入 | `LMB` 数值后键入 | 支持表达式和单位 |
| 多对象共同修改 | `Alt` 修改属性 | 将值应用到所选兼容对象，依属性 |
| 复制单个属性到所选 | `RMB` > Copy to Selected | 默认无单键 |
| 展开 / 折叠面板 | 单击标题 | Panel |
| 只展开当前面板 | `Ctrl+LMB` 标题 | 折叠同级其他面板 |

### 20.3 Asset Browser 资产浏览器

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 选择资产 | `LMB` | 单选 |
| 多选 | `Shift+LMB` | 增加 / 移除 |
| 框选 | `B` | 多选 |
| 全选 / 取消 | `A` / `Alt+A` | 当前筛选结果 |
| 搜索 | 搜索框 | 标签与名称 |
| 打开侧栏 | `N` | 元数据、标签等 |
| 导入 / 放置资产 | 双击或拖入编辑器 | 取决于资产类型 |
| 打开包含文件 | `RMB` 资产菜单 | 依资产库 |
| 清除资产标记 | `RMB` | 对当前文件资产 |
| 设为资产 | 在数据块上 `RMB` > Mark as Asset | 可从 Outliner 操作 |
| 切换缩略图 / 列表 | 视图按钮 | 默认无统一键 |
| 放大缩略图 | `NumpadPlus` / `Ctrl+Wheel` | 依区域 |
| 缩小缩略图 | `NumpadMinus` / `Ctrl+Wheel` | 依区域 |

### 20.4 文件浏览器

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 确认打开 / 保存 | `Enter` | `Return` | 选中文件或确认文件名 |
| 取消 | `Esc` | `Esc` | 返回调用处 |
| 进入文件夹 | 双击或 `Enter` | 双击或 `Return` | 导航 |
| 上一级目录 | `P` / `Alt+Up` | `P` / `Option+Up` | 依键位和系统 |
| 后退 | `Backspace` | `Command+[` | 依系统 / 版本 |
| 前进 | `Shift+Backspace` | `Command+]` | 依系统 / 版本 |
| 搜索 | `Ctrl+F` | `Command+F` | 聚焦搜索 |
| 新建文件夹 | `I` / New Folder 按钮 | 同左 | 以界面提示为准 |
| 重命名 | `F2` | `F2` / `Fn+F2` | 选择文件后 |
| 删除 | `X` / `Delete` | `X` / `Delete` | 谨慎：属于文件系统操作 |
| 全选 | `A` | `A` | 当前目录文件 |
| 取消全选 | `Alt+A` | `Alt+A` | 清空 |
| 框选 | `B` | `B` | 缩略图视图 |
| 刷新 | `R` / Refresh 按钮 | 同左 | 以当前菜单为准 |
| 切换显示方式 | 右上视图按钮 | 同左 | 列表 / 缩略图 |
| 显示侧栏 | `N` | `N` | 最近位置等 |
| 显示区域 | `T` | `T` | 依文件浏览器布局 |

---
## 21. 渲染、材质预览与合成

### 21.1 渲染

| 操作 | 按键 | 说明 |
|---|---|---|
| 渲染静帧 | `F12` | Render Image |
| 渲染动画 | `Ctrl+F12` | Render Animation |
| 显示上次渲染 | `F11` | Render Result |
| 取消渲染 | `Esc` | 尽快停止 |
| 渲染视图区域 | `Ctrl+B` | 相机视图内设边界 |
| 清除渲染区域 | `Ctrl+Alt+B` | Clear Render Region |
| 视口渲染动画 | `F3` 搜索 `Viewport Render Animation` | Workbench / 预览 |
| 视口渲染关键帧 | `F3` 搜索 | 依版本 |
| 保存渲染结果 | Image > Save As | 在 Image Editor |
| 切换渲染槽 | `J` | Render Result 中循环槽 |

### 21.2 视口着色

| 操作 | 按键 | 说明 |
|---|---|---|
| 着色饼菜单 | `Z` | 四种视图着色 |
| 线框 | `Z` → Wireframe | 线框 |
| 实体 | `Z` → Solid | Workbench 实体 |
| 材质预览 | `Z` → Material Preview | HDRI 预览 |
| 渲染 | `Z` → Rendered | 当前渲染器 |
| X-Ray | `Alt+Z` | 透明显示 |
| 叠加层 | `Shift+Alt+Z` | Overlays |
| 切换场景灯光 | 着色弹出设置 | 默认无固定键 |
| 切换场景世界 | 着色弹出设置 | 默认无固定键 |

### 21.3 合成器补充

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加节点 | `Shift+A` | Compositor 节点 |
| Viewer 预览连接 | `Shift+Ctrl+LMB` 节点 | Node Wrangler / Viewer 功能 |
| 切换背景 | `Alt+V` / View 菜单 | Backdrop |
| 移动背景 | `Alt+MMB` 拖动 | Backdrop Move |
| 放大背景 | `V` | Backdrop Zoom In |
| 缩小背景 | `Alt+V` | Backdrop Zoom Out |
| 适配背景 | `Home` | View All |
| 切断连线 | `Ctrl+RMB` 拖动 | Cut Links |
| 静音节点 | `M` | Mute |
| 删除并重连 | `Ctrl+X` | Delete with Reconnect |
| 重新计算 | 更改节点 / 刷新渲染 | 无统一刷新键 |

---
## 22. 视频序列编辑器

### 22.1 编辑器与导航

| 操作 | 按键 | 说明 |
|---|---|---|
| Sequencer / Preview 切换 | `Ctrl+Tab` | 在两个视图间切换 |
| 播放 / 暂停 | `Spacebar` | 受 Spacebar Action 设置影响 |
| 上一 / 下一帧 | `Left/Right Arrow` | 单帧 |
| 起始 / 结束帧 | `Shift+Left/Right Arrow` | 场景范围 |
| 平移时间线 | `MMB` 拖动 | Sequencer 区域 |
| 缩放时间线 | `Wheel` / `Ctrl+MMB` | 时间缩放 |
| 查看全部条带 | `Home` | Frame All |
| 聚焦所选 | `NumpadPeriod` | Frame Selected |
| 侧栏 | `N` | Strip、Tool、View |
| 工具栏 | `T` | 显示 / 隐藏 |
| Sequencer / Preview / 两者 | 左上模式菜单 | 默认无统一单键 |

### 22.2 添加与选择条带

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加条带 | `Shift+A` | Movie、Image、Sound、Scene、Effect 等 |
| 全选 / 取消 | `A` / `Alt+A` | 当前可见条带 |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | 拖框 |
| 圈选 | `C` | 圆形 |
| 选择链接 | `L` | 依条带连接 / 相邻上下文 |
| 选择左右句柄 | 单击句柄 | 精确修剪 |
| 选择条带主体 | 单击中部 | 移动整条 |
| 选择当前帧两侧 | `[` / `]` | 依 VSE 默认键位 |
| 选择通道 | Select 菜单 | 默认无统一键 |

### 22.3 移动、修剪、切割与时间

| 操作 | 按键 | 说明 |
|---|---|---|
| 移动条带 | `G` | 时间 / 通道 |
| 仅时间移动 | `G` → `X` | 水平 |
| 仅通道移动 | `G` → `Y` | 垂直 |
| 复制条带 | `Shift+D` | 复制并移动 |
| 删除条带 | `X` 或 `Delete` | 删除 |
| 软切割 | `K` | Soft Cut，保留源媒体范围 |
| 硬切割 | `Shift+K` | Hard Cut，裁掉不可见内容 |
| 分割当前条带 | `K` | 在播放头处 |
| 修剪句柄 | `G` 拖动所选句柄 | 改变入 / 出点 |
| 滑移内容 | `S` / Strip 菜单 | Slip Strip Contents；键位依版本上下文 |
| 吸附 | `Shift+S` | 播放头或相邻边界 |
| 吸附到当前帧 | `Shift+S` 菜单 | Selection to Current Frame |
| 设置预览范围 | `P` | Set Preview Range |
| 清除预览范围 | `Alt+P` | Clear Preview Range |
| 设置场景帧范围到条带 | `Ctrl+Alt+P` / 菜单 | 依版本 |
| 交换输入 | Strip > Swap Inputs | 效果条带 |
| 重载条带 | Strip > Reload Strips | 媒体更新后 |

### 22.4 条带状态与效果

| 操作 | 按键 | 说明 |
|---|---|---|
| 静音所选 | `H` | VSE 中常为 Mute |
| 取消静音 | `Alt+H` | Unmute |
| 锁定条带 | `Ctrl+L` | Lock |
| 解锁条带 | `Ctrl+Alt+L` | Unlock |
| Meta Strip | `Ctrl+G` | 将所选组合 |
| 取消 Meta | `Alt+G` | 解组 |
| 添加转场 | `Shift+A` > Transition | Cross、Gamma Cross、Wipe 等 |
| 添加变换效果 | `Shift+A` > Effect Strip > Transform | 可关键帧 |
| 添加调整层 | `Shift+A` > Adjustment Layer | 影响下方通道 |
| 添加速度控制 | `Shift+A` > Effect Strip > Speed Control | 变速 |
| 设代理 | Strip > Set Up Proxies | 默认无固定键 |
| 重建代理 | Strip > Rebuild Proxy | 默认无固定键 |

### 22.5 Preview 变换

| 操作 | 按键 | 说明 |
|---|---|---|
| 选择预览条带 | `LMB` | 需启用预览选择 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | Preview 画面变换 |
| 枢轴点菜单 | `.` | 主键盘句点 |
| 框选 | `B` | 预览元素 |
| 查看全部 | `Home` | Fit Preview |
| 1:1 | `Numpad1` | 100% |
| 显示安全框 | View 菜单 | 默认无统一键 |

---
## 23. 电影剪辑、跟踪与遮罩

### 23.1 Movie Clip Editor 导航

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 打开剪辑 | `Alt+O` | Open Clip |
| 平移 | `MMB` 拖动 | 查看画面 |
| 缩放 | `Wheel` / `Ctrl+MMB` | 放大 / 缩小 |
| 1:1 | `Numpad1` | 100% |
| 查看全部 | `Home` | Fit |
| 聚焦所选轨迹 | `NumpadPeriod` | View Selected |
| 侧栏 | `N` | Track、View 等 |
| 工具栏 | `T` | 工具 |
| 上一 / 下一帧 | `Left/Right Arrow` | 单帧 |
| 播放 / 暂停 | `Spacebar` | 播放 |
| 设置场景帧范围 | Clip 菜单 | Set Scene Frames |

### 23.2 跟踪点选择与创建

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 添加跟踪标记 | `Ctrl+LMB` | 直接在画面放置 |
| 全选 / 取消 | `A` / `Alt+A` | Tracks |
| 反选 | `Ctrl+I` | 反转 |
| 框选 | `B` | Tracks |
| 圈选 | `C` | 圆选 |
| 套索 | `Ctrl+Alt+LMB` 拖动 | 依选择模式 |
| 选择链接 | `Ctrl+L` | 依跟踪 / 遮罩上下文 |
| 删除标记 / 轨迹 | `X` | 删除 |
| 隐藏所选 | `H` | Track Hide |
| 隐藏未选 | `Shift+H` | 保留所选 |
| 显示全部 | `Alt+H` | 恢复 |
| 锁定轨迹 | `Ctrl+L` / Track 菜单 | 与选择链接有上下文冲突 |
| 重命名轨迹 | `F2` | 活动轨迹 |

### 23.3 跟踪、检测与求解

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 向前跟踪一帧 | `Alt+Right Arrow` | 依默认键位 |
| 向后跟踪一帧 | `Alt+Left Arrow` | 依默认键位 |
| 向前跟踪序列 | `Ctrl+T` / Track 菜单 | Track Markers Forward |
| 向后跟踪序列 | `Shift+Ctrl+T` / 菜单 | Track Backwards，依版本 |
| 清除跟踪路径 | `Alt+T` | Clear Track Path |
| 检测特征 | Track > Detect Features | 默认无固定键 |
| 细化标记 | Track > Refine | 默认无固定键 |
| 连接轨迹 | Track > Join Tracks | 默认无固定键 |
| 相机求解 | Solve > Solve Camera Motion | 默认无固定键 |
| 对象运动求解 | Solve > Solve Object Motion | 默认无固定键 |
| 设置关键帧 A / B | Solve 菜单 | 默认无固定键 |
| 设置地面 / 原点 / 轴 | Orientation 菜单 | 默认无固定键 |
| 设置比例 | Orientation > Set Scale | 默认无固定键 |

### 23.4 遮罩编辑

| 操作 | 按键 | 说明 |
|---|---|---|
| 添加遮罩样条 | `Ctrl+LMB` | 逐点添加 |
| 添加圆 / 方形 | `Shift+A` | Mask Primitives |
| 全选 / 取消 | `A` / `Alt+A` | 控制点 |
| 选择链接样条 | `Ctrl+L` | 选择整个样条 |
| 移动 / 旋转 / 缩放 | `G` / `R` / `S` | 控制点 |
| 挤出点 | `E` | 继续样条 |
| 切换循环 | `Alt+C` | 闭合 / 打开 |
| 设置手柄类型 | `V` | Bézier handles |
| 羽化 | `Alt+S` | 调整 Feather |
| 切换羽化显示 | Mask 显示菜单 | 默认无统一键 |
| 新建父级 | `Ctrl+P` | 将遮罩点父级到轨迹 |
| 清除父级 | `Alt+P` | Clear Parent |
| 移到遮罩层 | `M` | Move to Layer |
| 复制 | `Shift+D` | 复制点 / 样条 |
| 删除 | `X` | 删除 |
| 切换动画关键帧 | `I` 悬停属性 / 点 | 依属性 |

---
## 24. 文本编辑器、Python 控制台与信息编辑器

### 24.1 Text Editor 文件与运行

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 新建文本 | `Alt+N` / Text 菜单 | `Option+N` / 菜单 | 以菜单显示为准 |
| 打开文本 | `Alt+O` | `Option+O` | Open Text |
| 保存 | `Alt+S` | `Option+S` | Save Text |
| 另存为 | `Shift+Alt+S` | `Shift+Option+S` | Save As |
| 运行脚本 | `Alt+P` | `Option+P` | Run Script |
| 重新载入 | `Alt+R` | `Option+R` | Reload |
| 跳到行 | `Ctrl+G` | `Command+G` | Go to Line |
| 查找 | `Ctrl+F` | `Command+F` | Find |
| 查找下一个 | `Ctrl+G` / Find 面板 | `Command+G` | 与跳行存在上下文差异 |
| 替换 | `Ctrl+H` | `Command+H` 可能被系统占用 | 建议使用 Find & Replace 面板 |
| 自动完成 | `Ctrl+Spacebar` | `Control+Spacebar` | Complete |
| 文档菜单搜索 | `F3` | `F3` | 搜索 Text 操作 |

### 24.2 Text Editor 文字编辑

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 全选 | `Ctrl+A` | `Command+A` | 全部文本 |
| 复制 | `Ctrl+C` | `Command+C` | 复制 |
| 粘贴 | `Ctrl+V` | `Command+V` | 粘贴 |
| 剪切 | `Ctrl+X` | `Command+X` | 剪切 |
| 撤销 | `Ctrl+Z` | `Command+Z` | 文本撤销 |
| 重做 | `Shift+Ctrl+Z` | `Shift+Command+Z` | 重做 |
| 缩进 | `Tab` | `Tab` | 选区或当前行 |
| 取消缩进 | `Shift+Tab` | `Shift+Tab` | 左移 |
| 注释 / 取消注释 | `Ctrl+/` | `Command+/` 或 `Control+/` | 依键盘布局 |
| 复制当前行 | `Shift+Ctrl+D` | `Shift+Command+D` | 依版本键位 |
| 删除当前行 | `Shift+Ctrl+K` | `Shift+Command+K` | 依版本 |
| 上 / 下移动行 | `Alt+Up/Down` | `Option+Up/Down` | 依版本 |
| 切换语法高亮 | View 菜单 | View 菜单 | 默认无固定键 |
| 字体放大 / 缩小 | `Ctrl+Wheel` | `Command+Wheel` | 编辑器显示 |

### 24.3 Python Console

| 操作 | 按键 | 说明 |
|---|---|---|
| 执行命令 | `Enter` | 运行当前行 |
| 自动完成 | `Tab` 或 `Ctrl+Spacebar` | 补全 |
| 上一条历史 | `Up Arrow` | 命令历史 |
| 下一条历史 | `Down Arrow` | 命令历史 |
| 清空当前行 | `Ctrl+A` 后 `Backspace` | 文本编辑 |
| 清空控制台显示 | `Ctrl+X` / Console 菜单 | 依版本 |
| 复制 | 系统复制键 | 选中文本后 |
| 粘贴 | 系统粘贴键 | 粘贴命令 |
| 缩放字体 | `Ctrl+Wheel` | 编辑器字号 |
| 切到 Console | `Shift+F4` | 鼠标所在区域 |

### 24.4 Info Editor

| 操作 | 按键 | 说明 |
|---|---|---|
| 全选报告 | `A` | 当前列表 |
| 取消全选 | `Alt+A` | 清空 |
| 框选 | `B` | 报告 |
| 复制选中报告 | `Ctrl+C` | macOS 用系统复制键 |
| 删除选中报告 | `X` | 清理显示，不撤销操作 |
| 重放选中操作 | `R` / Info 菜单 | Replay |
| 缩放字体 | `Ctrl+Wheel` | 显示 |

---
## 25. 电子表格、几何节点与其他编辑器

### 25.1 Spreadsheet 电子表格

| 操作 | 按键 / 鼠标 | 说明 |
|---|---|---|
| 平移 | `MMB` / 滚动条 | 表格浏览 |
| 垂直滚动 | `Wheel` | 行 |
| 水平滚动 | `Shift+Wheel` | 列 |
| 搜索 / 过滤 | 顶部过滤字段 | 条件依组件 |
| 固定列 | 列菜单 | 默认无固定键 |
| 列排序 | 单击列标题 | 升序 / 降序 |
| 复制单元格 | `Ctrl+C` / `Command+C` | 依版本支持 |
| 聚焦 Viewer 数据 | Geometry Nodes Viewer | 选择对应 Viewer |
| 切换组件域 | 顶部组件菜单 | Point、Edge、Face 等 |

### 25.2 Geometry Nodes 专属工作流

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 新建 Geometry Nodes 修改器 | 工作区 New 按钮 | 默认无单键 |
| 添加节点 | `Shift+A` | 节点菜单 |
| 添加节点组 | `Shift+A` > Group | 已有节点组 |
| 建立组 | `Ctrl+G` | 所选节点 |
| 进入 / 退出组 | `Tab` | 节点组 |
| 连接 Viewer | `Shift+Ctrl+LMB` | Viewer 快捷方式可用时 |
| 分配 Viewer 编号 | `Ctrl+1` 至 `Ctrl+9` | 选 Viewer 节点 |
| 检查几何 | Spreadsheet / Viewer | 无独立键 |
| 固定到编辑器 | Pin 图标 | 默认无固定键 |
| 切换修改器固定 | 图钉 | 让节点编辑器不随活动对象改变 |
| 打包未使用节点 | 资产 / 节点菜单 | 依 5.2 功能 |

### 25.3 Drivers Editor 驱动器

| 操作 | 按键 | 说明 |
|---|---|---|
| 切换 Graph Editor 模式 | 左上模式菜单 | Drivers |
| 添加驱动器 | 属性 `RMB` > Add Driver | 稳定入口 |
| 删除驱动器 | 属性 `RMB` > Delete Driver | 删除 |
| 复制驱动器 | `RMB` > Copy Driver | 复制 |
| 粘贴驱动器 | `RMB` > Paste Driver | 粘贴 |
| 编辑驱动器变量 | `N` 侧栏 | Drivers |
| 曲线编辑 | 与 Graph Editor 相同 | `G`、`S`、`T`、`V` 等 |

### 25.4 Image Paint、Clip、Mask 之间的共通

| 操作 | 按键 | 说明 |
|---|---|---|
| 侧栏 | `N` | 多编辑器通用 |
| 工具栏 | `T` | 多编辑器通用 |
| 查看全部 | `Home` | 内容适配 |
| 聚焦所选 | `NumpadPeriod` | 有选择对象时 |
| 平移 | `MMB` | 2D 画布 |
| 缩放 | `Wheel` / `Ctrl+MMB` | 2D 画布 |
| 枢轴点 | `.` | 支持变换的 2D 编辑器 |
| 吸附 | `Shift+S` | 支持时 |

---
## 26. 模拟工具中的通用按键

物理模拟的大多数参数没有默认快捷键，但以下模态和缓存操作经常使用。

### 26.1 通用

| 操作 | 按键 / 菜单 | 说明 |
|---|---|---|
| 播放模拟 | `Spacebar` / `Alt+A` | 时间线播放 |
| 停止 | `Spacebar` / `Esc` | 依当前任务 |
| 跳回起始帧 | `Shift+Left Arrow` | 重置实时模拟常用 |
| 烘焙 | Physics 属性 > Bake | 默认无固定键 |
| 释放烘焙 | Physics 属性 > Free Bake | 默认无固定键 |
| 烘焙全部动力学 | Scene > Rigid Body World 等 | 默认无固定键 |
| 取消后台计算 | `Esc` | 可能延迟响应 |
| 保存缓存前保存文件 | `Ctrl+S` / `Command+S` | 外部缓存依赖路径 |

### 26.2 布料、流体、刚体与粒子

| 场景 | 快捷操作 | 说明 |
|---|---|---|
| 刚体快速添加 | `F3` 搜索 `Add Active/Passive` | Object > Rigid Body |
| 复制刚体设置 | `F3` 搜索 `Copy Rigid Body Settings` | 活动对象为源 |
| 布料钉固组 | Weight Paint / Vertex Groups | 无单一默认键 |
| 流体 Quick Smoke | `F3` 搜索 `Quick Smoke` | 快速效果 |
| 流体 Quick Liquid | `F3` 搜索 `Quick Liquid` | 快速效果 |
| 毛发 / 曲线添加 | `Shift+A` | 版本对象类型不同 |
| 缓存失效后重算 | 回起始帧再播放 / 重烘焙 | 依模拟类型 |

---
## 27. Industry Compatible Keymap 速查

Blender 还提供 `Industry Compatible` 预设，目的是接近 Maya、3ds Max 等软件的常见输入习惯。它与本文前 26 章的 `Blender` 默认预设不是同一套键位。

### 27.1 常用差异

| 操作 | Industry Compatible 常见键位 |
|---|---|
| 选择工具 | `Q` |
| 移动工具 | `W` |
| 旋转工具 | `E` |
| 缩放工具 | `R` |
| 顶点选择模式 | `1` |
| 边选择模式 | `2` |
| 面选择模式 | `3` |
| 对象模式 | `4` |
| 切换工具栏 | `5` |
| 切换侧栏 | `Ctrl+]` |
| 环绕观察 | `Alt+LMB` 拖动 |
| 平移 | `Alt+MMB` 拖动 |
| 缩放 | `Alt+RMB` 拖动 |
| 全选 | `Ctrl+A` |
| 取消全选 | `Ctrl+Shift+A` |
| 搜索 | `Tab` 或预设定义键，依版本 |

### 27.2 macOS

官方说明：Industry Compatible 预设在 macOS 上多数情况下可以用 `Command` 代替 `Ctrl`，但与系统冲突的少数命令除外。

### 27.3 切换方式

```text
编辑 > 首选项 > 键位映射 > Keymap Preset > Industry Compatible
```

切换预设会让本文大部分键位失效。不要在同一张个人速查表里混用两套预设。

---
## 28. 自定义、查找、导入、导出与恢复

### 28.1 查看当前快捷键

```text
编辑 > 首选项 > 键位映射
```

可使用以下筛选方式：

| 筛选方式 | 用途 | 示例 |
|---|---|---|
| Name | 按操作名称查找 | 搜索 `Bevel` |
| Key-Binding | 按现有按键查找 | 按 `Ctrl+B` |
| 搜索框 | 输入操作 ID 或名称 | `mesh.bevel` |
| 展开编辑器分类 | 查看上下文 | 3D View、Mesh、Node Editor |

### 28.2 从菜单项直接修改

1. 找到界面中的菜单命令。
2. 在菜单项上按 `RMB`。
3. 选择 `Assign Shortcut`。
4. 输入新的组合键。
5. 如发生冲突，到“首选项 > 键位映射”按 Key-Binding 搜索并处理。

可用的右键项包括：

- Assign Shortcut
- Change Shortcut
- Remove Shortcut
- Add to Quick Favorites
- Remove from Quick Favorites

### 28.3 导入与导出

在 Keymap 首选项右上区域：

| 功能 | 作用 |
|---|---|
| Export | 导出当前用户键位为 Python 配置文件 |
| Import | 导入键位配置 |
| Restore | 恢复某条键位 |
| Restore All | 恢复预设默认 |
| Add New | 手动添加操作映射 |

导出前建议：

1. 保存首选项。
2. 记录当前 Keymap Preset。
3. 备份导出 `.py` 文件。
4. 升级 Blender 大版本后先保留旧配置，不要直接覆盖新默认键位。

### 28.4 常用的低冲突自定义思路

| 需求 | 建议 |
|---|---|
| 高频但无默认键位的操作 | 加入 `Q` 快捷收藏，先不占新键 |
| 单一工作区专属命令 | 使用该编辑器上下文的组合键 |
| 插件命令 | 优先使用三修饰键组合，避免覆盖建模核心键 |
| 笔记本无小键盘 | 使用 Emulate Numpad 或视图饼菜单 |
| 非英文键盘 | 避免依赖符号位置不稳定的键 |
| 团队统一键位 | 导出键位文件并记录 Blender 精确版本 |

---
## 29. 导出本机绝对完整键位表

Blender 官方默认键位页明确说明其列表“并非全面清单”。如果你需要 KeyFloat、团队文档或个人知识库使用的**真正完整列表**，应从自己的 Blender 实例读取当前活动 Keyconfig。

### 29.1 使用方法

1. 打开 Blender。
2. 切换到 `Scripting` 工作区。
3. 在 Text Editor 中新建文本。
4. 粘贴下面脚本。
5. 按 `Alt+P` 运行。
6. 脚本会在桌面生成 `Blender_当前键位完整导出.md`。

### 29.2 导出脚本

```python
import bpy
from pathlib import Path


def safe_text(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def event_text(kmi):
    parts = []
    if kmi.any:
        parts.append("Any")
    else:
        if kmi.shift:
            parts.append("Shift")
        if kmi.ctrl:
            parts.append("Ctrl")
        if kmi.alt:
            parts.append("Alt")
        if kmi.oskey:
            parts.append("OSKey")

    if kmi.key_modifier != "NONE":
        parts.append(kmi.key_modifier)

    parts.append(kmi.type)
    event = "+".join(parts)

    if kmi.value not in {"PRESS", "ANY"}:
        event += f" [{kmi.value}]"
    if getattr(kmi, "direction", "ANY") != "ANY":
        event += f" [{kmi.direction}]"
    if getattr(kmi, "repeat", False):
        event += " [Repeat]"
    return event


def property_text(kmi):
    result = []
    props = kmi.properties
    if not props:
        return ""

    for prop in props.bl_rna.properties:
        name = prop.identifier
        if name == "rna_type" or prop.is_readonly:
            continue
        try:
            if props.is_property_set(name):
                result.append(f"{name}={getattr(props, name)!r}")
        except Exception:
            pass
    return ", ".join(result)


wm = bpy.context.window_manager
keyconfig = wm.keyconfigs.active
rows = []

for keymap in keyconfig.keymaps:
    for kmi in keymap.keymap_items:
        if not kmi.active:
            continue
        rows.append({
            "keymap": keymap.name,
            "space": keymap.space_type,
            "region": keymap.region_type,
            "shortcut": event_text(kmi),
            "operation": kmi.name or kmi.idname,
            "idname": kmi.idname,
            "properties": property_text(kmi),
        })

rows.sort(
    key=lambda row: (
        row["keymap"].lower(),
        row["shortcut"].lower(),
        row["operation"].lower(),
    )
)

desktop = Path.home() / "Desktop"
if not desktop.exists():
    desktop = Path.home()
output = desktop / "Blender_当前键位完整导出.md"

lines = [
    "# Blender 当前活动键位完整导出",
    "",
    f"> Blender 版本：{bpy.app.version_string}",
    f"> Keyconfig：{keyconfig.name}",
    f"> 活动键位数量：{len(rows)}",
    "",
    "| Keymap | Space | Region | 快捷键 / 事件 | 操作 | Operator ID | 属性 |",
    "|---|---|---|---|---|---|---|",
]

for row in rows:
    lines.append(
        "| {keymap} | {space} | {region} | `{shortcut}` | "
        "{operation} | `{idname}` | {properties} |".format(
            **{key: safe_text(value) for key, value in row.items()}
        )
    )

output.write_text("\n".join(lines), encoding="utf-8")
print(f"已导出：{output}")
```

### 29.3 这份导出会包含什么

- 当前 Blender 精确版本的核心键位。
- Blender / Industry Compatible 中当前启用的预设。
- 用户修改后的键位。
- 已加载扩展和插件注册的键位。
- 鼠标点击、双击、拖动、滚轮、触笔等事件。
- 操作 ID 和该快捷项设置的属性。
- 编辑器、区域与 Keymap 上下文。

### 29.4 为什么导出的条目会比本文多很多

Blender 内部还会记录：

- 工具激活键位。
- 鼠标事件和拖动方向。
- 仅在弹窗、菜单、模态工具中生效的映射。
- 同一命令在多个编辑器中的重复映射。
- 插件操作与带不同参数的同一 Operator。

这些信息适合数据库或程序检索，但不适合全部直接背诵。本文前面的章节用于人类速查，第 29 章用于机器级完整性。

---
## 30. 冲突、版本差异与排错

### 30.1 按键无效的常见原因

| 现象 | 可能原因 | 处理 |
|---|---|---|
| 按键触发了别的功能 | 鼠标在错误编辑器上 | 将鼠标移到目标区域再按 |
| 教程键位完全不同 | 教程使用旧版或 Industry Compatible | 核对版本与 Keymap Preset |
| `1/2/3` 没切换点边面 | 开启 Emulate Numpad 或不在网格编辑模式 | 检查输入设置和模式 |
| `Numpad1/3/7` 无效 | 没有数字小键盘 | 开启 Emulate Numpad 或用视图饼菜单 |
| `Alt` 鼠标操作被系统截获 | Linux 窗口管理器 / macOS 手势冲突 | 调整系统快捷键或输入设置 |
| 功能键调亮度 / 音量 | 笔记本系统优先 | 同时按 `Fn` |
| `Spacebar` 不播放 | Spacebar Action 被设为 Search / Tools | Preferences > Keymap 检查 |
| `Ctrl` 与 `Command` 混淆 | macOS 原生与 Blender 建模键不同 | 以菜单显示为准 |
| 插件安装后键位冲突 | 插件注册相同事件 | 按 Key-Binding 搜索冲突 |
| 中文输入法截获字母 | 输入法处于中文状态 | 切到英文输入 |
| 数字符号键失效 | 非 QWERTY / 不同键盘布局 | 查看本机 Keymap 或重设 |

### 30.2 版本变化

- 本文基于 2026 年 7 月的 Blender 5.2 LTS。
- Blender 5.x 的 Grease Pencil、资产架、节点 Viewer、雕刻画笔和扩展系统与旧教程存在明显差异。
- Blender 官方的“Default Keymap”页面只列常见键，并明确不是全面清单。
- 新安装的插件可以动态增加键位；因此静态文档不会包含你未来安装的插件。
- 大版本升级后，系统可能保留旧用户配置。若某个新默认键位没有出现，可用干净配置对照。

### 30.3 恢复默认键位

优先在：

```text
编辑 > 首选项 > 键位映射
```

对单项使用 `Restore`，或对整个预设使用 `Restore All`。恢复全部会丢失个人键位修改，操作前先 Export。

### 30.4 查看操作的现场键位

最可靠的现场方法：

1. 看菜单项右侧显示的组合键。
2. 看底部状态栏显示的当前工具修饰键。
3. 在菜单项上 `RMB` 查看 Assign / Change Shortcut。
4. 按 `F3` 搜索操作名称。
5. 在 Preferences > Keymap 里按 Name 或 Key-Binding 搜索。

---
## 31. 官方资料与补充来源

### 31.1 版本与总览

- [Blender 5.2 LTS 下载页](https://www.blender.org/download/)
- [Blender 5.2 LTS Release Notes](https://developer.blender.org/docs/release_notes/5.2/)
- [Blender 5.2 LTS Manual](https://docs.blender.org/manual/en/latest/)
- [Default Keymap](https://docs.blender.org/manual/en/latest/interface/keymap/blender_default.html)
- [Keymap 总览](https://docs.blender.org/manual/en/latest/interface/keymap/index.html)
- [Keymap 首选项](https://docs.blender.org/manual/en/latest/editors/preferences/keymap.html)
- [Keymap Customization](https://docs.blender.org/manual/en/latest/advanced/keymap_editing.html)
- [Industry Compatible Keymap](https://docs.blender.org/manual/en/latest/interface/keymap/industry_compatible.html)

### 31.2 界面、导航与选择

- [3D Viewport Navigation](https://docs.blender.org/manual/en/latest/editors/3dview/navigate/navigation.html)
- [3D Viewport Modes](https://docs.blender.org/manual/en/latest/editors/3dview/modes.html)
- [Selecting](https://docs.blender.org/manual/en/latest/interface/selecting.html)
- [Undo & Redo](https://docs.blender.org/manual/en/latest/interface/undo_redo.html)
- [Input Preferences](https://docs.blender.org/manual/en/latest/editors/preferences/input.html)

### 31.3 建模、UV、动画与节点

- [Mesh Editing Introduction](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/introduction.html)
- [Mesh Selecting](https://docs.blender.org/manual/en/latest/modeling/meshes/selecting/introduction.html)
- [UV Editor](https://docs.blender.org/manual/en/latest/editors/uv/index.html)
- [Node Editors](https://docs.blender.org/manual/en/latest/interface/controls/nodes/node_editors.html)
- [Editing Nodes](https://docs.blender.org/manual/en/latest/interface/controls/nodes/editing.html)
- [Timeline](https://docs.blender.org/manual/en/latest/editors/timeline.html)
- [Dope Sheet](https://docs.blender.org/manual/en/latest/editors/dope_sheet/index.html)
- [Graph Editor](https://docs.blender.org/manual/en/latest/editors/graph_editor/index.html)
- [NLA Editor](https://docs.blender.org/manual/en/latest/editors/nla/index.html)

### 31.4 视频、跟踪与其他编辑器

- [Video Sequencer](https://docs.blender.org/manual/en/latest/editors/video_sequencer/index.html)
- [Movie Clip Editor](https://docs.blender.org/manual/en/latest/editors/clip/index.html)
- [Motion Tracking](https://docs.blender.org/manual/en/latest/movie_clip/tracking/index.html)
- [Masking](https://docs.blender.org/manual/en/latest/movie_clip/masking/index.html)
- [Outliner](https://docs.blender.org/manual/en/latest/editors/outliner/index.html)
- [Text Editor](https://docs.blender.org/manual/en/latest/editors/text_editor.html)
- [Python Console](https://docs.blender.org/manual/en/latest/editors/python_console.html)
- [File Browser](https://docs.blender.org/manual/en/latest/editors/file_browser.html)

---

## 快速结论

如果只先记一组 Blender 核心键：

| 类别 | 核心键 |
|---|---|
| 搜索与面板 | `F3`、`T`、`N`、`Q` |
| 模式 | `Tab`、`Ctrl+Tab` |
| 变换 | `G`、`R`、`S`、`X/Y/Z` |
| 添加与复制 | `Shift+A`、`Shift+D`、`Alt+D` |
| 选择 | `A`、`Alt+A`、`B`、`C`、`L` |
| 建模 | `E`、`I`、`Ctrl+R`、`Ctrl+B`、`K`、`M`、`X` |
| 视图 | `MMB`、`Shift+MMB`、`Z`、`` ` ``、`Numpad1/3/7` |
| 显示 | `H`、`Shift+H`、`Alt+H`、`Alt+Z` |
| 动画 | `I`、`Alt+I`、`Spacebar`、方向键 |
| 节点 | `Shift+A`、`G`、`M`、`Ctrl+G`、`Ctrl+X` |

要获得你电脑上包括所有插件在内的绝对完整表，请运行第 29 章的导出脚本。
| 聚焦全部 | `Home` | 受隐藏状态影响 |
| 局部视图 | `NumpadSlash` | 隔离所选 |
| 四视图 | `Ctrl+Alt+Q` | Toggle Quad View |

### 7.3 无数字小键盘时

| 方法 | 操作 |
|---|---|
| 模拟数字键盘 | `编辑 > 首选项 > 输入 > Emulate Numpad` |
| 视图饼菜单 | `` ` ``（波浪号 / Grave Accent） |
| 搜索命令 | `F3` 后输入 Front、Right、Top、Camera、Frame Selected |
| 鼠标导航 | 使用视图右上角导航轴与图标 |

### 7.4 着色与叠加显示

| 操作 | 按键 | 说明 |
|---|---|---|
| 着色饼菜单 | `Z` | 线框、实体、材质预览、渲染 |
| 线框显示 | `Z` → Wireframe | 饼菜单 |
| 实体显示 | `Z` → Solid | 饼菜单 |
| 材质预览 | `Z` → Material Preview | 饼菜单 |
| 渲染预览 | `Z` → Rendered | 饼菜单 |
| 切换 X-Ray | `Alt+Z` | 穿透选择 / 显示 |
| 切换叠加层 | `Shift+Alt+Z` | 网格、轮廓、骨骼等 |
| 切换 Gizmo | `Ctrl+`` ` | 依键盘布局与当前键位 |
| 隐藏所选 | `H` | 当前模式 |
| 隐藏未选 | `Shift+H` | 保留所选 |
| 显示全部 | `Alt+H` | 取消隐藏 |
| 局部视图 | `NumpadSlash` | 隔离 |
| 线框 / 实体快捷切换 | `Z` 饼菜单 | 不建议记旧版 `Z` 单独切换逻辑 |

### 7.5 相机视图

| 操作 | 按键 | 说明 |
|---|---|---|
| 进入活动相机 | `Numpad0` | 再按退出 |
| 当前视图对齐相机 | `Ctrl+Alt+Numpad0` | 改变活动相机 |
| 锁定相机到视图 | `N` 侧栏 > View | 默认无独立键 |
| 相机框内平移 | `G` | 相机对象移动 |
| 沿本地轴推拉相机 | `G` → `Z` → `Z` | 取决于相机方向 |
| 调整焦距 | `G` → `G`（相机数据上下文不固定） | 更建议在属性或导航中操作 |
| 相机视图边框缩放 | `Home` | 显示完整相机框 |
| 设置渲染区域 | `Ctrl+B` | 相机视图中拖框 |
| 清除渲染区域 | `Ctrl+Alt+B` | 清除边界 |

---
