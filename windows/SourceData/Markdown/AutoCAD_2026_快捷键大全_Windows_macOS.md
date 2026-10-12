# AutoCAD 2026 快捷键大全（Windows / macOS）

> 整理日期：2026-07-25  
> 适用范围：AutoCAD 2026 桌面版，以英文默认配置为基准，兼顾 Windows 与 macOS  
> 字段说明：`快捷键`是直接按键；`命令别名`需要在命令行输入后按 `Enter` 或空格执行

---

## 目录

1. [使用前必读](#1-使用前必读)
2. [一键命令别名](#2-一键命令别名)
3. [Windows 功能键](#3-windows-功能键)
4. [Windows 通用组合快捷键](#4-windows-通用组合快捷键)
5. [macOS 通用组合快捷键](#5-macos-通用组合快捷键)
6. [临时替代键](#6-临时替代键)
7. [默认命令别名 A–Z](#7-默认命令别名-az)
8. [macOS 专属或不同的命令别名](#8-macos-专属或不同的命令别名)
9. [对象捕捉与点过滤](#9-对象捕捉与点过滤)
10. [选择对象快捷输入](#10-选择对象快捷输入)
11. [坐标、距离与精确输入](#11-坐标距离与精确输入)
12. [鼠标与视图导航](#12-鼠标与视图导航)
13. [夹点编辑与上下文按键](#13-夹点编辑与上下文按键)
14. [命令行与文本输入](#14-命令行与文本输入)
15. [多行文字编辑器](#15-多行文字编辑器)
16. [常用标注命令速查](#16-常用标注命令速查)
17. [图层、块、外部参照速查](#17-图层块外部参照速查)
18. [三维建模与视图速查](#18-三维建模与视图速查)
19. [自定义、备份与恢复](#19-自定义备份与恢复)
20. [版本与平台差异](#20-版本与平台差异)
21. [资料来源](#21-资料来源)

---

## 1. 使用前必读

AutoCAD 中经常被统称为“快捷键”的内容，实际分为四类：

| 类型 | 示例 | 使用方式 |
|---|---|---|
| 组合快捷键 | `Ctrl + S` | 直接按键，立即保存 |
| 功能键 | `F8` | 直接按键，切换正交模式 |
| 命令别名 | `L` | 输入 `L`，再按 `Enter` 或空格，启动 `LINE` |
| 临时替代键 | 按住 `Shift` | 仅按住期间临时反转正交模式 |

重要说明：

- 本文以英文版默认 `acad.pgp`、主 CUIx 和 Autodesk 官方快捷键页为基准。
- 中文版 AutoCAD 仍可使用英文全局命令和默认英文别名；如命令受本地化影响，可在完整命令名前加下划线，例如 `_LINE`。
- 企业模板、插件、迁移设置、个人 `acad.pgp` 或 `acaduser.pgp` 都可能覆盖默认别名。
- AutoCAD 与 AutoCAD LT、Windows 与 macOS、不同键盘布局之间存在差异。
- macOS 上若功能键被系统用于亮度、音量等功能，通常需要按 `Fn + F1`～`Fn + F12`，或在系统设置中改为标准功能键。
- `Ctrl` 在 macOS 中不能一律机械替换成 `Command`；请以本文 macOS 表为准。

---

## 2. 一键命令别名

以下是一组最高频的一键命令别名。输入字母后按 `Enter` 或空格。

| 别名 | 完整命令 | 中文功能 | 平台 |
|---|---|---|---|
| `A` | `ARC` | 创建圆弧 | Windows / macOS |
| `B` | `BLOCK` | 创建块定义 | Windows / macOS |
| `C` | `CIRCLE` | 创建圆 | Windows / macOS |
| `D` | `DIMSTYLE` | 创建或修改标注样式 | Windows / macOS |
| `E` | `ERASE` | 删除对象 | Windows / macOS |
| `F` | `FILLET` | 圆角或圆边 | Windows / macOS |
| `G` | `GROUP` | 创建和管理编组 | Windows / macOS |
| `H` | `HATCH` | 图案填充、实体填充或渐变填充 | Windows / macOS |
| `I` | `INSERT` | 插入块或图形 | Windows / macOS |
| `J` | `JOIN` | 合并同类对象 | Windows / macOS |
| `L` | `LINE` | 创建直线段 | Windows / macOS |
| `M` | `MOVE` | 移动对象 | Windows / macOS |
| `O` | `OFFSET` | 偏移对象 | Windows / macOS |
| `P` | `PAN` | 平移视图 | Windows / macOS |
| `Q` | `QSAVE` | 快速保存当前图形 | Windows 常见默认 |
| `R` | `REDRAW` | 重画当前视口 | Windows / macOS |
| `S` | `STRETCH` | 拉伸交叉窗口选中的对象 | Windows / macOS |
| `T` | `MTEXT` | 创建多行文字 | Windows / macOS |
| `U` | `U` / `UNDO` | 撤销最近一次操作 | macOS 官方页列出；Windows 可直接输入 `U` |
| `V` | `VIEW` | 保存和恢复命名视图 | Windows / macOS |
| `W` | `WBLOCK` | 将对象或块写入新 DWG | Windows / macOS |
| `X` | `EXPLODE` | 分解复合对象 | Windows / macOS |
| `Z` | `ZOOM` | 缩放视图 | Windows / macOS |

默认没有稳定一键别名的字母：`K`、`N`、`Y`。

---

## 3. Windows 功能键

| 快捷键 | 功能 | 关联命令或变量 |
|---|---|---|
| `F1` | 显示帮助 | `HELP` |
| `F2` | 展开或折叠文字窗口 / 命令历史 | `TEXTSCR` / `GRAPHSCR` |
| `F3` | 切换二维对象捕捉 | `OSNAP` / `OSMODE` |
| `F4` | 切换三维对象捕捉 | `3DOSNAP` |
| `F5` | 循环切换等轴测平面 | `ISOPLANE` |
| `F6` | 切换动态 UCS | `UCSDETECT` |
| `F7` | 切换栅格显示 | `GRIDMODE` |
| `F8` | 切换正交模式 | `ORTHOMODE` |
| `F9` | 切换捕捉模式 | `SNAPMODE` |
| `F10` | 切换极轴追踪 | `POLARMODE` |
| `F11` | 切换对象捕捉追踪 | `OTRACK` |
| `F12` | 切换动态输入 | `DYNMODE` |
| `Alt + F8` | 打开“宏”对话框 | 仅完整 AutoCAD；需要相应组件 |
| `Alt + F11` | 打开 Visual Basic 编辑器 | 需安装 VBA 模块；不是所有安装均可用 |
| `Ctrl + F2` | 显示文字窗口 | Windows |

---

## 4. Windows 通用组合快捷键

### 4.1 绘图辅助与状态切换

| 快捷键 | 功能 | 说明 |
|---|---|---|
| `Ctrl + B` | 切换捕捉模式 | 等同 `F9` |
| `Ctrl + D` | 切换坐标显示 | 状态栏坐标读数 |
| `Ctrl + E` | 循环切换等轴测平面 | 等同 `F5` |
| `Ctrl + F` | 切换执行对象捕捉 | 等同 `F3`；文字编辑时可能为“查找” |
| `Ctrl + G` | 切换栅格 | 等同 `F7` |
| `Ctrl + H` | 切换编组选择 | 控制 `PICKSTYLE` |
| `Ctrl + I` | 切换坐标显示模式 | 与坐标显示相关 |
| `Ctrl + L` | 切换正交模式 | 等同 `F8` |
| `Ctrl + T` | 切换数字化仪模式 | 需数字化仪配置 |
| `Ctrl + W` | 切换选择循环 | 重叠对象选择 |
| `Ctrl + Shift + I` | 切换推断约束 | Infer Constraints |
| `Ctrl + Shift + P` | 切换快捷特性 | Quick Properties |
| `Ctrl + Shift + H` | 隐藏或恢复所有选项板 | `HIDEPALETTES` / `SHOWPALETTES` |

### 4.2 界面与选项板

| 快捷键 | 功能 | 对应界面 |
|---|---|---|
| `Ctrl + 0` | 全屏显示 / 清理屏幕 | Clean Screen |
| `Ctrl + 1` | 显示或隐藏“特性”选项板 | Properties |
| `Ctrl + 2` | 显示或隐藏“设计中心” | DesignCenter |
| `Ctrl + 3` | 显示或隐藏“工具选项板” | Tool Palettes |
| `Ctrl + 4` | 显示或隐藏“图纸集管理器” | Sheet Set Manager |
| `Ctrl + 6` | 显示数据库连接管理器 | DBConnect |
| `Ctrl + 7` | 显示标记集管理器 | Markup Set Manager |
| `Ctrl + 8` | 打开快速计算器 | QuickCalc |
| `Ctrl + 9` | 显示或隐藏命令行 | Command Line |

### 4.3 剪贴板、撤销与命令

| 快捷键 | 功能 | 说明 |
|---|---|---|
| `Ctrl + C` | 复制对象 | `COPYCLIP` |
| `Ctrl + Shift + C` | 带基点复制 | `COPYBASE` |
| `Ctrl + X` | 剪切对象 | `CUTCLIP` |
| `Ctrl + V` | 粘贴 | `PASTECLIP` |
| `Ctrl + Shift + V` | 粘贴为块 | `PASTEBLOCK` |
| `Ctrl + Z` | 撤销 | Undo |
| `Ctrl + Y` | 重做 | Redo |
| `Ctrl + J` | 重复上一命令 | 与 `Enter` / 空格类似 |
| `Ctrl + M` | 重复上一命令 | 与 `Enter` / 空格类似 |
| `Ctrl + K` | 插入超链接 | `HYPERLINK` |
| `Ctrl + [` | 取消当前命令 | 类似 `Esc` |
| `Ctrl + \` | 取消当前命令 | 类似 `Esc` |
| `Esc` | 取消当前命令或清除夹点选择 | 连按两次通常退出嵌套状态 |
| `Enter` | 确认输入或重复上一命令 | 命令提示中使用 |
| `Space` | 确认输入或重复上一命令 | 编辑文字时为空格，不作为 Enter |

### 4.4 文件与图形管理

| 快捷键 | 功能 |
|---|---|
| `Ctrl + N` | 新建图形 |
| `Ctrl + O` | 打开图形 |
| `Ctrl + S` | 保存图形 |
| `Ctrl + Shift + S` | 另存为 |
| `Ctrl + P` | 打印 / 出图 |
| `Ctrl + Q` | 退出 AutoCAD |
| `Ctrl + A` | 选择当前空间中的所有对象 |
| `Ctrl + Tab` | 切换到下一个打开的图形 |
| `Ctrl + Shift + Tab` | 切换到上一个打开的图形 |
| `Ctrl + Page Up` | 当前图形中切换到上一个模型/布局选项卡 |
| `Ctrl + Page Down` | 当前图形中切换到下一个模型/布局选项卡 |
| `Ctrl + R` | 循环切换当前布局中的视口 |

---

## 5. macOS 通用组合快捷键

### 5.1 功能键与绘图状态

| 快捷键 | 功能 |
|---|---|
| `Fn + F1` 或 `Command + /` | 显示帮助 |
| `Fn + F2` | 展开或折叠命令窗口 |
| `Fn + F3`、`Control + F` 或 `Control + Shift + F` | 切换对象捕捉 |
| `Fn + F4` | 切换三维对象捕捉 |
| `Fn + F5` | 切换等轴测平面 |
| `Fn + F6`、`Command + D` 或 `Control + D` | 切换动态 UCS |
| `Fn + F7`、`Control + G` 或 `Control + Shift + G` | 切换栅格 |
| `Fn + F8`、`Command + L` 或 `Command + Shift + O` | 切换正交 |
| `Fn + F9`、`Command + B` 或 `Control + B` | 切换捕捉 |
| `Fn + F10`、`Command + U` 或 `Control + U` | 切换极轴追踪 |
| `Command + Shift + D` | 切换动态输入 |
| `Command + Shift + T` | 切换对象捕捉追踪 |
| `Command + Shift + I` 或 `Control + Shift + I` | 切换推断约束 |
| `Control + I` | 切换坐标显示模式 |
| `Control + W` 或 `Control + Shift + W` | 切换选择循环 |
| `Control + H` | 切换 `PICKSTYLE` |
| `Command + Shift + H` | 隐藏或恢复全部选项板 |

### 5.2 文件、编辑与窗口

| 快捷键 | 功能 |
|---|---|
| `Command + N` 或 `Control + N` | 新建图形 |
| `Command + O` 或 `Control + O` | 打开图形 |
| `Command + S` 或 `Control + S` | 保存图形 |
| `Command + Shift + S` 或 `Control + Shift + S` | 另存为 |
| `Command + P` 或 `Control + P` | 打印 / 出图 |
| `Command + Q` 或 `Control + Q` | 退出 AutoCAD |
| `Command + W` | 关闭当前图形 |
| `Command + Option + W` | 关闭全部图形 |
| `Command + A` 或 `Control + A` | 全选 |
| `Command + C` 或 `Control + C` | 复制 |
| `Command + Shift + C` 或 `Control + Shift + C` | 带基点复制 |
| `Command + X` 或 `Control + X` | 剪切 |
| `Command + V` 或 `Control + V` | 粘贴 |
| `Command + Z` 或 `Control + Z` | 撤销 |
| `Command + Y`、`Control + Y` 或 `Command + Shift + Z` | 重做 |
| `Control + [` 或 `Control + \` | 取消当前命令 |
| `Control + J` 或 `Control + M` | 重复上一命令 |
| `Command + G` | 编组选定对象 |
| `Command + Shift + G` | 取消编组 |
| `Command + H` | 隐藏 AutoCAD |
| `Command + M` | 最小化当前图形窗口 |
| `Command + Option + M` | 最小化全部窗口 |
| `Command + R` | 重生成当前视口 |
| `Command + Shift + R` | 重生成全部视口 |
| `Command + Shift + P` | 打开页面设置管理器 |
| `Command + F` | 查找和替换 |
| `Command + E` | 打开“输出数据”对话框 |
| `Command + Shift + ;` | 拼写检查 |

### 5.3 macOS 选项板与屏幕

| 快捷键 | 功能 |
|---|---|
| `Command + 0` 或 `Control + 0` | 切换全屏显示 / Clean Screen |
| `Command + 1` 或 `Control + 3` | 打开或关闭“工具集”选项板 |
| `Command + 2` 或 `Control + 2` | 打开或关闭“内容”选项板 |
| `Command + 3` 或 `Control + 9` | 显示或隐藏命令窗口 |
| `Command + 4` | 打开或关闭“图层”选项板 |
| `Command + 5`、`Command + I` 或 `Control + 1` | 打开或关闭“特性检查器” |
| `Command + 6` | 切换状态栏 |
| `Command + 7` | 打开或关闭“参照管理器” |
| `Command + 8` 或 `Control + 4` | 打开“项目管理器” |
| `Command + 9` | 打开“材质浏览器” |
| `Command + +` | 放大 2 倍 |
| `Command + -` | 缩小 0.5 倍 |
| `Command + ,` | 应用程序偏好设置 |
| `Command + .` | 快速查看 |
| `Command + Shift + F` | 切换 Clean Screen |
| `Command + Option + T` | 切换工具集选项板 |
| `Command + Option + I` | 打开特性 |
| `Command + Shift + C` | 打开颜色选项板；与 COPYBASE 的分配可能受版本/CUI 影响 |

---

## 6. 临时替代键

临时替代键通常需要在命令正要求输入点时按住；松开后恢复原状态。下表基于英文美式键盘的默认 CUIx。

| 临时替代键 | 功能 |
|---|---|
| 按住 `Shift` | 临时反转正交模式 `ORTHOMODE` |
| `Shift + '` | 临时切换对象捕捉 |
| `Shift + A` | 临时切换对象捕捉 |
| `Shift + ,` | 临时对象捕捉：圆心 |
| `Shift + C` | 临时对象捕捉：圆心 |
| `Shift + .` | 临时切换极轴追踪 |
| `Shift + X` | 临时切换极轴追踪 |
| `Shift + /` | 临时切换动态 UCS |
| `Shift + Z` | 临时切换动态 UCS |
| `Shift + ;` | 启用强制对象捕捉 |
| `Shift + S` | 启用强制对象捕捉 |
| `Shift + ]` | 临时切换对象捕捉追踪 |
| `Shift + Q` | 临时切换对象捕捉追踪 |
| `Shift + D` | 暂时禁用全部捕捉与追踪 |
| `Shift + L` | 暂时禁用全部捕捉与追踪 |
| `Shift + E` | 临时对象捕捉：端点 |
| `Shift + P` | 临时对象捕捉：端点 |
| `Shift + M` | 临时对象捕捉：中点 |
| `Shift + V` | 临时对象捕捉：中点 |

补充：

- `TEMPOVERRIDES = 1` 时临时替代键可用。
- 双键组合通常要先松开字母键，再松开 `Shift`，避免字母进入命令行。
- 不同键盘布局的标点键位置可能不同。

---

## 7. 默认命令别名 A–Z

以下为 Autodesk 官方 Windows 快捷键指南与默认 PGP 中的主要 A–Z 别名。输入别名后按 `Enter` 或空格。

### A

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `A` | `ARC` | 创建圆弧 |
| `AA` | `AREA` | 计算面积和周长 |
| `ADC` | `ADCENTER` | 打开设计中心 |
| `AL` | `ALIGN` | 在二维或三维中对齐对象 |
| `AP` | `APPLOAD` | 加载应用程序 |
| `AR` | `ARRAY` | 创建阵列 |
| `ARR` | `ACTRECORD` | 启动动作录制器 |
| `ARM` | `ACTUSERMESSAGE` | 在动作宏中插入用户消息 |
| `ARU` | `ACTUSERINPUT` | 暂停动作宏并等待用户输入 |
| `ARS` | `ACTSTOP` | 停止并保存动作录制 |
| `ATI` | `ATTIPEDIT` | 编辑块内属性文字 |
| `ATT` | `ATTDEF` | 定义属性 |
| `ATE` | `ATTEDIT` | 编辑块属性信息 |

### B

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `B` | `BLOCK` | 创建块定义 |
| `BC` | `BCLOSE` | 关闭块编辑器 |
| `BE` | `BEDIT` | 打开块编辑器 |
| `BH` | `HATCH` | 创建填充 |
| `BO` | `BOUNDARY` | 从封闭区域创建边界 |
| `BR` | `BREAK` | 在两点之间打断对象 |
| `BS` | `BSAVE` | 保存当前块定义 |
| `BVS` | `BVSTATE` | 管理动态块可见性状态 |

### C

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `C` | `CIRCLE` | 创建圆 |
| `CAM` | `CAMERA` | 设置相机和目标位置 |
| `CBAR` | `CONSTRAINTBAR` | 显示几何约束栏 |
| `CH` | `PROPERTIES` | 控制对象特性 |
| `CHA` | `CHAMFER` | 创建倒角 |
| `CHK` | `CHECKSTANDARDS` | 检查标准冲突 |
| `CLI` | `COMMANDLINE` | 显示命令行 |
| `COL` | `COLOR` | 设置当前颜色 |
| `CO` | `COPY` | 复制对象 |
| `CT` | `CTABLESTYLE` | 设置当前表格样式 |
| `CUBE` | `NAVVCUBE` | 控制 ViewCube |
| `CYL` | `CYLINDER` | 创建三维圆柱体 |

### D

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `D` | `DIMSTYLE` | 创建和修改标注样式 |
| `DAN` | `DIMANGULAR` | 创建角度标注 |
| `DAR` | `DIMARC` | 创建弧长标注 |
| `DBA` | `DIMBASELINE` | 创建基线标注 |
| `DBC` | `DBCONNECT` | 打开数据库连接 |
| `DCE` | `DIMCENTER` | 创建圆心标记或中心线 |
| `DCO` | `DIMCONTINUE` | 创建连续标注 |
| `DCON` | `DIMCONSTRAINT` | 应用标注约束 |
| `DDA` | `DIMDISASSOCIATE` | 解除标注关联 |
| `DDI` | `DIMDIAMETER` | 创建直径标注 |
| `DED` | `DIMEDIT` | 编辑标注 |
| `DI` | `DIST` | 测量两点距离和角度 |
| `DIV` | `DIVIDE` | 沿对象等分布置点或块 |
| `DJL` | `DIMJOGLINE` | 添加或删除折弯线 |
| `DJO` | `DIMJOGGED` | 创建折弯半径标注 |
| `DL` | `DATALINK` | 管理数据链接 |
| `DLU` | `DATALINKUPDATE` | 更新数据链接 |
| `DO` | `DONUT` | 创建圆环 |
| `DOR` | `DIMORDINATE` | 创建坐标标注 |
| `DOV` | `DIMOVERRIDE` | 替代所选标注的系统变量 |
| `DR` | `DRAWORDER` | 更改绘制次序 |
| `DRA` | `DIMRADIUS` | 创建半径标注 |
| `DRE` | `DIMREASSOCIATE` | 重新关联标注 |
| `DRM` | `DRAWINGRECOVERY` | 打开图形修复管理器 |
| `DS` | `DSETTINGS` | 打开草图设置 |
| `DT` | `TEXT` | 创建单行文字 |
| `DV` | `DVIEW` | 定义平行或透视视图 |
| `DX` | `DATAEXTRACTION` | 提取图形数据 |

### E–F

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `E` | `ERASE` | 删除对象 |
| `ED` | `DDEDIT` | 编辑文字、标注或属性 |
| `EL` | `ELLIPSE` | 创建椭圆或椭圆弧 |
| `EPDF` | `EXPORTPDF` | 输出 PDF |
| `ER` | `EXTERNALREFERENCES` | 打开外部参照选项板 |
| `EX` | `EXTEND` | 延伸对象 |
| `EXIT` | `QUIT` | 退出 AutoCAD |
| `EXP` | `EXPORT` | 输出其他文件格式 |
| `EXT` | `EXTRUDE` | 拉伸二维对象或三维面 |
| `F` | `FILLET` | 创建圆角 |
| `FI` | `FILTER` | 创建对象选择过滤器 |
| `FS` | `FSMODE` | 选择与指定对象接触的对象 |
| `FSHOT` | `FLATSHOT` | 从当前视图创建二维投影 |

### G–I

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `G` | `GROUP` | 创建和管理编组 |
| `GCON` | `GEOCONSTRAINT` | 应用几何约束 |
| `GD` | `GRADIENT` | 创建渐变填充 |
| `GEO` | `GEOGRAPHICLOCATION` | 指定地理位置 |
| `H` | `HATCH` | 创建填充 |
| `HE` | `HATCHEDIT` | 修改填充 |
| `HI` | `HIDE` | 隐藏三维线框中的不可见线 |
| `I` | `INSERT` | 插入块或图形 |
| `IAD` | `IMAGEADJUST` | 调整图像亮度、对比度和淡入度 |
| `IAT` | `IMAGEATTACH` | 附着图像参照 |
| `ICL` | `IMAGECLIP` | 裁剪图像参照 |
| `ID` | `ID` | 显示指定点的 UCS 坐标 |
| `IM` | `IMAGE` | 打开外部参照选项板 |
| `IMP` | `IMPORT` | 输入其他格式文件 |
| `IN` | `INTERSECT` | 创建交集实体、曲面或面域 |
| `INF` | `INTERFERE` | 检查三维实体干涉 |
| `IO` | `INSERTOBJ` | 插入 OLE 对象 |

### J–L

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `J` | `JOIN` | 合并相似对象 |
| `JOG` | `DIMJOGGED` | 创建折弯半径标注 |
| `L` | `LINE` | 创建直线 |
| `LA` | `LAYER` | 管理图层 |
| `LAS` | `LAYERSTATE` | 管理图层状态 |
| `LE` | `QLEADER` | 创建快速引线 |
| `LEN` | `LENGTHEN` | 更改对象长度或圆弧夹角 |
| `LESS` | `MESHSMOOTHLESS` | 降低网格平滑度 |
| `LI` | `LIST` | 列出对象特性数据 |
| `LO` | `LAYOUT` | 创建和修改布局 |
| `LT` | `LINETYPE` | 加载和管理线型 |
| `LTS` | `LTSCALE` | 设置全局线型比例 |
| `LW` | `LWEIGHT` | 设置线宽 |

### M–O

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `M` | `MOVE` | 移动对象 |
| `MA` | `MATCHPROP` | 匹配对象特性 |
| `MAT` | `MATERIALS` | 显示或隐藏材质浏览器 |
| `ME` | `MEASURE` | 沿对象按间距布置点或块 |
| `MEA` | `MEASUREGEOM` | 测量距离、半径、角度、面积和体积 |
| `MI` | `MIRROR` | 镜像对象 |
| `ML` | `MLINE` | 创建多线 |
| `MLA` | `MLEADERALIGN` | 对齐多重引线 |
| `MLC` | `MLEADERCOLLECT` | 整理含块的多重引线 |
| `MLD` | `MLEADER` | 创建多重引线 |
| `MLE` | `MLEADEREDIT` | 编辑多重引线 |
| `MLS` | `MLEADERSTYLE` | 管理多重引线样式 |
| `MO` | `PROPERTIES` | 打开特性 |
| `MORE` | `MESHSMOOTHMORE` | 提高网格平滑度 |
| `MS` | `MSPACE` | 从图纸空间进入模型空间视口 |
| `MSM` | `MARKUP` | 打开标记集管理器 |
| `MT` | `MTEXT` | 创建多行文字 |
| `MV` | `MVIEW` | 创建和控制布局视口 |
| `NORTH` | `GEOGRAPHICLOCATION` | 设置地理位置 |
| `NSHOT` | `NEWSHOT` | 创建带运动的命名视图 |
| `NVIEW` | `NEWVIEW` | 创建命名视图 |
| `O` | `OFFSET` | 偏移对象 |
| `OP` | `OPTIONS` | 打开选项 |
| `ORBIT` | `3DORBIT` | 三维动态观察 |
| `OS` | `OSNAP` | 设置执行对象捕捉 |

### P–R

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `P` | `PAN` | 平移当前视图 |
| `PA` | `PASTESPEC` | 选择格式粘贴 |
| `PAR` | `PARAMETERS` | 管理参数 |
| `PARAM` | `BPARAMETER` | 向动态块添加参数 |
| `PATCH` | `SURFPATCH` | 创建修补曲面 |
| `PC` | `POINTCLOUD` | 点云选项 |
| `PCATTACH` | `POINTCLOUDATTACH` | 附着点云 |
| `PCINDEX` | `POINTCLOUDINDEX` | 创建点云索引 |
| `PE` | `PEDIT` | 编辑多段线 |
| `PL` | `PLINE` | 创建二维多段线 |
| `PO` | `POINT` | 创建点对象 |
| `POFF` | `HIDEPALETTES` | 隐藏选项板 |
| `POL` | `POLYGON` | 创建正多边形 |
| `PON` | `SHOWPALETTES` | 恢复选项板 |
| `PR` | `PROPERTIES` | 打开特性选项板 |
| `PRE` | `PREVIEW` | 打印预览 |
| `PRINT` | `PLOT` | 打印 / 出图 |
| `PS` | `PSPACE` | 从模型视口切换到图纸空间 |
| `PSOLID` | `POLYSOLID` | 创建多段体 |
| `PU` | `PURGE` | 清理未使用项目 |
| `PYR` | `PYRAMID` | 创建三维棱锥体 |
| `QC` | `QUICKCALC` | 打开快速计算器 |
| `QCUI` | `QUICKCUI` | 打开精简 CUI 编辑器 |
| `QP` | `QUICKPROPERTIES` | 切换快捷特性 |
| `Q` / `QSAVE` | `QSAVE` | 快速保存 |
| `QVD` | `QVDRAWING` | 显示打开图形预览 |
| `QVDC` | `QVDRAWINGCLOSE` | 关闭图形预览 |
| `QVL` | `QVLAYOUT` | 显示模型和布局预览 |
| `QVLC` | `QVLAYOUTCLOSE` | 关闭布局预览 |
| `R` | `REDRAW` | 重画当前视口 |
| `RA` | `REDRAWALL` | 重画全部视口 |
| `RC` | `RENDERCROP` | 渲染裁剪区域 |
| `RE` | `REGEN` | 重生成当前视口 |
| `REA` | `REGENALL` | 重生成全部视口 |
| `REC` | `RECTANG` | 创建矩形 |
| `REG` | `REGION` | 创建面域 |
| `REN` | `RENAME` | 重命名图层、样式等项目 |
| `REV` | `REVOLVE` | 创建旋转实体或曲面 |
| `RO` | `ROTATE` | 旋转对象 |
| `RP` | `RENDERPRESETS` | 管理渲染预设 |
| `RPR` | `RPREF` | 高级渲染设置 |
| `RR` | `RENDER` | 渲染 |
| `RW` | `RENDERWIN` | 显示渲染窗口 |

### S–U

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `S` | `STRETCH` | 拉伸对象 |
| `SC` | `SCALE` | 缩放对象 |
| `SCR` | `SCRIPT` | 执行脚本 |
| `SEC` | `SECTION` | 创建截面面域 |
| `SET` | `SETVAR` | 查看或设置系统变量 |
| `SHA` | `SHADEMODE` / `VSCURRENT` | 设置视觉样式 |
| `SL` | `SLICE` | 剖切实体或曲面 |
| `SN` | `SNAP` | 设置捕捉间距和模式 |
| `SO` | `SOLID` | 创建实体填充三角形或四边形 |
| `SP` | `SPELL` | 拼写检查 |
| `SPE` | `SPLINEDIT` | 编辑样条曲线 |
| `SPL` | `SPLINE` | 创建样条曲线 |
| `SPLANE` | `SECTIONPLANE` | 创建截面平面 |
| `SPLAY` | `SEQUENCEPLAY` | 播放命名视图序列 |
| `SPLIT` | `MESHSPLIT` | 拆分网格面 |
| `SSM` | `SHEETSET` | 打开图纸集管理器 |
| `ST` | `STYLE` | 管理文字样式 |
| `STA` | `STANDARDS` | 管理 CAD 标准 |
| `SU` | `SUBTRACT` | 三维实体、曲面或面域差集 |
| `T` | `MTEXT` | 创建多行文字 |
| `TA` | `TEXTALIGN` | 对齐多个文字对象 |
| `TB` | `TABLE` | 创建表格 |
| `TEDIT` | `TEXTEDIT` | 编辑文字或标注 |
| `TH` | `THICKNESS` | 设置默认三维厚度 |
| `TI` | `TILEMODE` | 控制模型/图纸空间访问 |
| `TO` | `TOOLBAR` | 显示、隐藏或自定义工具栏 |
| `TOL` | `TOLERANCE` | 创建几何公差 |
| `TOR` | `TORUS` | 创建圆环体 |
| `TP` | `TOOLPALETTES` | 打开工具选项板 |
| `TR` | `TRIM` | 修剪对象 |
| `TS` | `TABLESTYLE` | 管理表格样式 |
| `U` | `U` / `UNDO` | 撤销最近操作 |
| `UC` | `UCSMAN` | 管理命名 UCS |
| `UN` | `UNITS` | 设置单位、角度和精度 |
| `UNHIDE` / `UNISOLATE` | `UNISOLATEOBJECTS` | 恢复隐藏对象 |
| `UNI` | `UNION` | 并集 |

### V–Z

| 别名 | 完整命令 | 中文功能 |
|---|---|---|
| `V` | `VIEW` | 管理命名视图 |
| `VGO` | `VIEWGO` | 恢复命名视图 |
| `VP` | `DDVPOINT` / `VPOINT` | 设置三维观察方向 |
| `VPLAY` | `VIEWPLAY` | 播放命名视图动画 |
| `VS` | `VSCURRENT` | 设置当前视觉样式 |
| `VSM` | `VISUALSTYLES` | 管理视觉样式 |
| `W` | `WBLOCK` | 写块到新图形文件 |
| `WE` | `WEDGE` | 创建楔体 |
| `WHEEL` | `NAVSWHEEL` | 显示导航控制盘 |
| `X` | `EXPLODE` | 分解对象 |
| `XA` | `XATTACH` | 附着 DWG 外部参照 |
| `XB` | `XBIND` | 绑定外部参照命名对象 |
| `XC` | `XCLIP` | 裁剪外部参照或块 |
| `XL` | `XLINE` | 创建无限长构造线 |
| `XR` | `XREF` | 打开外部参照 |
| `Z` | `ZOOM` | 缩放视图 |
| `ZEBRA` | `ANALYSISZEBRA` | 斑马纹曲面连续性分析 |
| `ZIP` | `ETRANSMIT` | 创建电子传递包 |

---

## 8. macOS 专属或不同的命令别名

大多数常用短别名与 Windows 相同。以下是 Autodesk 的 Mac 快捷键页额外列出或映射不同的项目。部分长别名来自较早的 Mac 默认 PGP，安装后应以 `ALIASEDIT` 中的实际列表为准。

| macOS 别名 | 完整命令 | 中文功能 / 差异 |
|---|---|---|
| `AC` | `BACTION` | 向动态块定义添加动作 |
| `ATTE` | `ATTEDIT` | 编辑块属性 |
| `BLENDSRF` | `SURFBLEND` | 创建过渡曲面 |
| `BPUB` | `PUBLISH` | 发布图形集 |
| `CL` | `COMMANDLINE` | 显示命令行 |
| `CLIPVIEWPORT` | `VPCLIP` | 裁剪布局视口 |
| `COMMANDHIDE` | `COMMANDLINEHIDE` | 隐藏命令行 |
| `CREASE` | `MESHCREASE` | 为网格子对象添加锐化 |
| `CREATESOLID` | `SURFSCULPT` | 将封闭曲面转换为实体 |
| `CSETTINGS` | `CONSTRAINTSETTINGS` | 约束设置 |
| `CURVATUREANALYSIS` | `ANALYSISCURVATURE` | 曲率分析 |
| `CUSTOMIZE` | `CUI` | 自定义用户界面 |
| `DAL` | `DIMALIGNED` | 创建对齐标注 |
| `DDPTYPE` | `PTYPE` | 设置点样式和大小 |
| `DDVPOINT` | `VPOINT` | 设置三维观察方向 |
| `DELCON` | `DELCONSTRAINT` | 删除几何和标注约束 |
| `DLI` | `DIMLINEAR` | 创建线性标注 |
| `DRAFTANGLEANALYSIS` | `ANALYSISDRAFTANGLE` | 拔模角分析 |
| `EXTENDSRF` | `SURFEXTEND` | 延伸曲面 |
| `FILLETSRF` | `SURFFILLET` | 曲面圆角；旧网页存在命令文本错误，以应用内为准 |
| `FREEPOINT` | `POINTLIGHT` | 创建点光源 |
| `FULLSCREEN` | `CLEANSCREENON` | 开启 Clean Screen |
| `FULLSCREENOFF` | `CLEANSCREENOFF` | 关闭 Clean Screen |
| `GENERATESECTION` | `SECTIONPLANETOBLOCK` | 将截面保存为块 |
| `HB` | `HATCHTOBACK` | 将全部填充置于底层 |
| `ISOLATE` | `ISOLATEOBJECTS` | 隔离选定对象 |
| `JOGSECTION` | `SECTIONPLANEJOG` | 创建带折弯的截面平面 |
| `LAYERFREEZE` | `LAYFRZ` | 冻结选定对象所在图层 |
| `LAYERHIDE` | `LAYOFF` | 关闭选定对象所在图层 |
| `LAYERISOLATE` | `LAYISO` | 隔离图层 |
| `LAYERLOCK` | `LAYLCK` | 锁定图层 |
| `LAYERMAKECURRENT` | `LAYMCUR` | 将对象所在图层设为当前 |
| `LAYERMATCH` | `LAYMCH` | 匹配图层 |
| `LAYERUNISOLATE` | `LAYUNISO` | 结束图层隔离 |
| `LAYERUNLOCK` | `LAYULK` | 解锁图层 |
| `ME` | `JOIN` | Mac 官方旧页将 `ME` 映射为合并；与 Windows 的 `MEASURE` 不同 |
| `NETWORKSRF` | `SURFNETWORK` | 创建网络曲面 |
| `NEWPROJECT` | `NEWSHEETSET` | 新建项目/图纸集 |
| `NVIEW` | `VIEW` | Mac 页映射到视图管理 |
| `OFFSETSRF` | `SURFOFFSET` | 偏移曲面 |
| `PA` | `PASTECLIP` | Mac 页映射为普通粘贴；Windows 官方页为 `PASTESPEC` |
| `PGP` | `ALIASEDIT` | 管理命令别名 |
| `PM` | `SHEETSET` | 打开项目管理器 |
| `POINTOFF` | `CVHIDE` | 隐藏 NURBS 控制点 |
| `POINTON` | `CVSHOW` | 显示 NURBS 控制点 |
| `PRCLOSE` | `PROPERTIESCLOSE` | 关闭特性检查器 |
| `PREF` | `OPTIONS` | 打开偏好设置 |
| `QVD` | `QUICKVIEW` | 显示已打开图形和布局列表 |
| `REBUILD` | `CVREBUILD` | 重建 NURBS 曲面和曲线 |
| `REFINE` | `MESHREFINE` | 细化网格 |
| `SE` | `DSETTINGS` | 打开草图设置 |
| `SMOOTH` | `MESHSMOOTH` | 转换并平滑网格 |
| `TEXTSTYLEEDIT` | `STYLE` | 编辑文字样式 |
| `TO` | `TOOLSETS` | 打开工具集选项板 |
| `TP` | `CONTENT` | 打开内容选项板 |
| `UNCREASE` | `MESHUNCREASE` | 移除网格锐化 |
| `VIEWPORTCLIP` | `VPCLIP` | 裁剪布局视口 |
| `VPORT` | `VPORTS` | 创建多个视口 |
| `3A` | `3DARRAY` | 创建三维阵列 |
| `3AL` | `3DALIGN` | 三维对齐 |
| `3DMIRROR` | `MIRROR3D` | 三维镜像 |
| `3DO` | `3DORBIT` | 三维动态观察 |
| `3F` | `3DFACE` | 创建三维面 |
| `3M` | `3DMOVE` | 三维移动 |
| `3P` | `3DPOLY` | 创建三维多段线 |
| `3R` | `3DROTATE` | 三维旋转 |
| `3S` | `3DSCALE` | 三维缩放 |

---

## 9. 对象捕捉与点过滤

### 9.1 一次性对象捕捉

在命令要求指定点时输入以下覆盖词，再选择对象。也可按 `Shift + 右键` 打开对象捕捉菜单。

| 输入 | 对象捕捉 | 说明 |
|---|---|---|
| `END` | Endpoint | 端点 |
| `MID` | Midpoint | 中点 |
| `CEN` | Center | 圆心 |
| `GCE` | Geometric Center | 封闭多段线或样条曲线的几何中心 |
| `NOD` | Node | 点对象、标注定义点等 |
| `QUA` | Quadrant | 象限点 |
| `INT` | Intersection | 交点 |
| `EXT` | Extension | 延伸线 |
| `INS` | Insertion | 块、属性、文字等插入点 |
| `PER` | Perpendicular | 垂足 |
| `TAN` | Tangent | 切点 |
| `NEA` | Nearest | 最近点 |
| `APP` | Apparent Intersection | 外观交点 |
| `PAR` | Parallel | 平行 |
| `NONE` | None | 临时关闭全部对象捕捉 |
| `FROM` | From | 从基点按偏移确定点 |
| `M2P` / `MTP` | Mid Between 2 Points | 两点之间的中点 |
| `TT` | Temporary Track Point | 临时追踪点 |

### 9.2 三维对象捕捉

| 类型 | 功能 |
|---|---|
| Vertex | 顶点 |
| Midpoint on Edge | 边中点 |
| Center of Face | 面中心 |
| Knot | 样条或 NURBS 节点 |
| Perpendicular | 垂足 |
| Nearest to Face | 面上最近点 |

三维对象捕捉总开关：`F4`。

### 9.3 坐标点过滤器

在指定点时可输入：

| 输入 | 功能 |
|---|---|
| `.X` | 取已有点的 X 坐标，再补 Y、Z |
| `.Y` | 取已有点的 Y 坐标 |
| `.Z` | 取已有点的 Z 坐标 |
| `.XY` | 取已有点的 X、Y，再补 Z |
| `.XZ` | 取已有点的 X、Z，再补 Y |
| `.YZ` | 取已有点的 Y、Z，再补 X |

---

## 10. 选择对象快捷输入

以下选项在命令提示“选择对象”时输入。

| 输入 | 英文 | 功能 |
|---|---|---|
| `W` | Window | 完全位于矩形窗口内的对象 |
| `C` | Crossing | 位于或穿过矩形窗口的对象 |
| `WP` | Window Polygon | 完全位于多边形窗口内的对象 |
| `CP` | Crossing Polygon | 位于或穿过多边形窗口的对象 |
| `F` | Fence | 与折线围栏相交的对象 |
| `L` | Last | 最近创建的可见对象 |
| `P` | Previous | 上一个选择集 |
| `ALL` | All | 当前空间中未冻结图层上的全部对象 |
| `G` | Group | 按编组名称选择 |
| `A` | Add | 切换为添加选择 |
| `R` | Remove | 切换为移除选择 |
| `M` | Multiple | 多次选择而不高亮 |
| `U` | Undo | 撤销上一步选择 |
| `AU` | Auto | 自动选择方式 |
| `SI` | Single | 只允许一次选择 |

常用选择按键：

| 按键 | 功能 |
|---|---|
| `Shift + 单击` | 从当前选择集中移除对象；具体行为受选择设置影响 |
| `Ctrl + 单击` | 选择三维实体的面、边、顶点等子对象 |
| `Ctrl + W` | 开关选择循环 |
| `Shift + Space` | 在重叠对象之间循环选择 |
| `Tab` | 在光标附近可用捕捉点或对象之间循环 |
| `Esc` | 清除当前选择或取消命令 |

窗口方向：

- 从左向右拖动：Window，仅选择完全包含的对象。
- 从右向左拖动：Crossing，选择包含或穿过的对象。
- 按住鼠标拖动形成套索；通过移动方向切换窗口/交叉套索。

---

## 11. 坐标、距离与精确输入

| 输入形式 | 示例 | 含义 |
|---|---|---|
| 绝对笛卡尔坐标 | `100,50` | 相对于当前 UCS 原点 |
| 相对笛卡尔坐标 | `@100,50` | 相对于上一个点 |
| 绝对极坐标 | `100<30` | 从 UCS 原点，距离 100、角度 30° |
| 相对极坐标 | `@100<30` | 从上一个点，距离 100、角度 30° |
| 三维笛卡尔坐标 | `100,50,20` | X、Y、Z 坐标 |
| 三维相对坐标 | `@100,50,20` | 相对上一点的 X、Y、Z |
| 柱坐标 | `@100<30,20` | 平面距离、角度、Z 高度 |
| 球坐标 | `@100<30<45` | 距离、XY 角、与 XY 平面的角 |
| 直接距离输入 | 光标指向后输入 `100` | 沿光标方向取长度 100 |
| 距离计算 | `'CAL` | 在命令中透明调用计算器 |

说明：

- 动态输入开启时，绝对/相对坐标的默认解释可能由设置决定。
- 在脚本、教学或跨配置数据中，显式写出 `@` 更不容易产生歧义。
- 角度默认以当前 UCS 的 X 正方向为 0°，逆时针为正；可在 `UNITS` 中修改。

---

## 12. 鼠标与视图导航

| 操作 | 功能 | 说明 |
|---|---|---|
| 滚动滚轮 | 连续缩放 | 以光标位置为中心 |
| 按住中键拖动 | 实时平移 | `MBUTTONPAN = 1` |
| 双击中键 | 缩放至图形范围 | Zoom Extents |
| `Shift + 中键拖动` | 三维动态观察 | 完整 AutoCAD |
| `Shift + 右键` | 对象捕捉快捷菜单 | 仅在点提示时最有用 |
| 右键 | 快捷菜单或 Enter | 由 `SHORTCUTMENU` 与右键自定义决定 |
| 按住左键拖动空白区 | 套索选择 | 根据拖动方向决定窗口/交叉 |
| `Z` → `E` | 缩放到图形范围 | `ZOOM` → `Extents` |
| `Z` → `A` | 缩放到全部 | `ZOOM` → `All` |
| `Z` → `W` | 窗口缩放 | `ZOOM` → `Window` |
| `Z` → `P` | 返回上一个视图 | `ZOOM` → `Previous` |
| `Z` → `O` | 缩放到选定对象 | `ZOOM` → `Object` |
| `Z` → `C` | 指定中心和比例缩放 | `ZOOM` → `Center` |
| `Z` → `D` | 动态缩放 | `ZOOM` → `Dynamic` |
| `Z` → `S` | 指定比例因子 | `ZOOM` → `Scale` |

---

## 13. 夹点编辑与上下文按键

选中对象后单击夹点，使其成为热夹点：

| 按键 / 输入 | 功能 |
|---|---|
| `Space` 或 `Enter` | 循环切换拉伸、移动、旋转、缩放、镜像等夹点模式 |
| `Ctrl` | 在多功能夹点的可用操作间循环 |
| `Shift + 单击夹点` | 选择多个夹点 |
| 输入 `B` | 指定新的基点 |
| 输入 `C` | 复制对象并继续夹点编辑 |
| 输入 `R` | 进入参照选项 |
| 输入 `X` | 退出夹点编辑 |
| `Esc` | 退出当前夹点模式或清除夹点 |

常用上下文技巧：

| 场景 | 按键 | 功能 |
|---|---|---|
| `TRIM` 中 | 按住 `Shift` | 临时切换为延伸 |
| `EXTEND` 中 | 按住 `Shift` | 临时切换为修剪 |
| `FILLET` 选择第二个对象时 | 按住 `Shift` | 临时以半径 0 修剪/延伸形成尖角 |
| 选择三维实体时 | `Ctrl + 单击` | 选择面、边或顶点子对象 |

---

## 14. 命令行与文本输入

| 快捷键 | 命令行功能 |
|---|---|
| `Enter` / `Space` | 确认当前输入；无活动命令时重复上一命令 |
| `Esc` | 取消当前命令 |
| `↑` / `↓` | 浏览命令历史 |
| `Tab` | 循环自动完成命令、系统变量或可选项 |
| `Backspace` | 删除前一字符 |
| `Delete` | 删除后一字符 |
| `Home` / `End` | 跳到输入开头 / 结尾 |
| `Ctrl + A` | 命令行获得焦点时选择全部输入文字 |
| `Ctrl + C` | 复制选中文字；无文字选择时可能复制对象 |
| `Ctrl + V` | 粘贴文字或对象 |
| `Ctrl + 9` | 显示或隐藏命令行 |
| `F2` | 查看扩展命令历史 |
| `'命令名` | 透明命令，在另一个命令中临时调用；仅部分命令支持 |
| `_命令名` | 调用全局英文命令，适合跨语言脚本 |
| `-命令名` | 调用命令行版本，避免弹出对话框 |
| `.` + 命令名 | 调用产品内置定义，绕过同名重定义 |

可组合前缀示例：

```text
_.-LAYER
```

含义：使用全局英文、内置、纯命令行版本的 `LAYER`。

---

## 15. 多行文字编辑器

在 `MTEXT`、表格单元格或其他文字编辑上下文中，许多标准编辑键会接管原本的绘图快捷键。

| Windows | macOS | 功能 |
|---|---|---|
| `Ctrl + B` | `Command + B` | 粗体；仅支持相应字体 |
| `Ctrl + I` | `Command + I` | 斜体 |
| `Ctrl + U` | `Command + U` | 下划线 |
| `Ctrl + C` | `Command + C` | 复制文字 |
| `Ctrl + X` | `Command + X` | 剪切文字 |
| `Ctrl + V` | `Command + V` | 粘贴文字 |
| `Ctrl + Z` | `Command + Z` | 撤销文字编辑 |
| `Ctrl + Y` | `Command + Shift + Z` | 重做 |
| `Ctrl + A` | `Command + A` | 全选当前编辑器文字 |
| `Ctrl + F` | `Command + F` | 查找和替换 |
| `Enter` | `Return` | 新建段落 |
| `Shift + Enter` | `Shift + Return` | 换行但不创建新段落 |
| `Tab` | `Tab` | 插入制表位或在表格单元格间移动 |
| `Esc` | `Esc` | 退出或取消当前编辑状态 |

堆叠文字输入：

| 输入示例 | 结果倾向 |
|---|---|
| `1/2` 后执行堆叠 | 水平分数 |
| `1#2` 后执行堆叠 | 斜分数 |
| `+0.1^-0.1` 后执行堆叠 | 公差形式 |

---

## 16. 常用标注命令速查

| 别名 / 命令 | 完整命令 | 中文功能 |
|---|---|---|
| `DIM` | `DIM` | 智能创建多种标注 |
| `D` | `DIMSTYLE` | 标注样式 |
| `DLI` | `DIMLINEAR` | 线性标注；Mac 官方别名，Windows 可输完整命令 |
| `DAL` | `DIMALIGNED` | 对齐标注；Mac 官方别名 |
| `DAN` | `DIMANGULAR` | 角度标注 |
| `DAR` | `DIMARC` | 弧长标注 |
| `DRA` | `DIMRADIUS` | 半径标注 |
| `DDI` | `DIMDIAMETER` | 直径标注 |
| `DOR` | `DIMORDINATE` | 坐标标注 |
| `DBA` | `DIMBASELINE` | 基线标注 |
| `DCO` | `DIMCONTINUE` | 连续标注 |
| `DJO` | `DIMJOGGED` | 折弯半径标注 |
| `DJL` | `DIMJOGLINE` | 添加/删除折弯线 |
| `DED` | `DIMEDIT` | 编辑标注 |
| `DRE` | `DIMREASSOCIATE` | 重新关联标注 |
| `DDA` | `DIMDISASSOCIATE` | 解除标注关联 |
| `DOV` | `DIMOVERRIDE` | 替代标注变量 |
| `TOL` | `TOLERANCE` | 几何公差 |
| `MLD` | `MLEADER` | 多重引线 |
| `MLS` | `MLEADERSTYLE` | 多重引线样式 |

---

## 17. 图层、块、外部参照速查

### 图层

| 输入 | 完整命令 | 功能 |
|---|---|---|
| `LA` | `LAYER` | 图层特性管理器 |
| `LAS` | `LAYERSTATE` | 图层状态 |
| `LAYISO` | `LAYISO` | 隔离选定对象所在图层 |
| `LAYUNISO` | `LAYUNISO` | 结束图层隔离 |
| `LAYOFF` | `LAYOFF` | 关闭图层 |
| `LAYON` | `LAYON` | 打开全部图层 |
| `LAYFRZ` | `LAYFRZ` | 冻结图层 |
| `LAYTHW` | `LAYTHW` | 解冻全部图层 |
| `LAYLCK` | `LAYLCK` | 锁定图层 |
| `LAYULK` | `LAYULK` | 解锁图层 |
| `LAYMCUR` | `LAYMCUR` | 将对象所在图层设为当前 |
| `LAYMCH` | `LAYMCH` | 将对象移至匹配图层 |
| `LAYMRG` | `LAYMRG` | 合并图层 |
| `LAYDEL` | `LAYDEL` | 删除图层；破坏性操作，谨慎使用 |

### 块与属性

| 输入 | 完整命令 | 功能 |
|---|---|---|
| `B` | `BLOCK` | 创建块 |
| `W` | `WBLOCK` | 写块 |
| `I` | `INSERT` | 插入块 |
| `BE` | `BEDIT` | 编辑块 |
| `BC` | `BCLOSE` | 关闭块编辑器 |
| `BS` | `BSAVE` | 保存块 |
| `X` | `EXPLODE` | 分解块 |
| `ATT` | `ATTDEF` | 定义属性 |
| `ATE` | `ATTEDIT` | 编辑属性 |
| `BATTMAN` | `BATTMAN` | 块属性管理器 |
| `ATTSYNC` | `ATTSYNC` | 同步块属性 |
| `BATTORDER` | `BATTORDER` | 属性顺序 |

### 外部参照与图像

| 输入 | 完整命令 | 功能 |
|---|---|---|
| `XR` | `XREF` | 外部参照管理 |
| `XA` | `XATTACH` | 附着 DWG |
| `XB` | `XBIND` | 绑定命名对象 |
| `XC` | `XCLIP` | 裁剪外部参照或块 |
| `ER` | `EXTERNALREFERENCES` | 外部参照选项板 |
| `IAT` | `IMAGEATTACH` | 附着图像 |
| `IAD` | `IMAGEADJUST` | 调整图像 |
| `ICL` | `IMAGECLIP` | 裁剪图像 |
| `PDFATTACH` | `PDFATTACH` | 附着 PDF 参考底图 |
| `PDFIMPORT` | `PDFIMPORT` | 输入 PDF 几何和文字 |

---

## 18. 三维建模与视图速查

| 别名 / 命令 | 完整命令 | 中文功能 |
|---|---|---|
| `EXT` | `EXTRUDE` | 拉伸 |
| `REV` | `REVOLVE` | 旋转 |
| `PRESSPULL` | `PRESSPULL` | 按住并拖动封闭边界或面 |
| `SWEEP` | `SWEEP` | 扫掠 |
| `LOFT` | `LOFT` | 放样 |
| `SL` | `SLICE` | 剖切 |
| `UNI` | `UNION` | 并集 |
| `SU` | `SUBTRACT` | 差集 |
| `IN` | `INTERSECT` | 交集 |
| `INF` | `INTERFERE` | 干涉检查 |
| `CYL` | `CYLINDER` | 圆柱体 |
| `PYR` | `PYRAMID` | 棱锥体 |
| `TOR` | `TORUS` | 圆环体 |
| `WE` | `WEDGE` | 楔体 |
| `BOX` | `BOX` | 长方体 |
| `SPHERE` | `SPHERE` | 球体 |
| `POLYSOLID` | `POLYSOLID` | 多段体 |
| `3DO` / `ORBIT` | `3DORBIT` | 三维动态观察 |
| `3M` | `3DMOVE` | 三维移动 |
| `3R` | `3DROTATE` | 三维旋转 |
| `3S` | `3DSCALE` | 三维缩放 |
| `3AL` | `3DALIGN` | 三维对齐 |
| `3DMIRROR` | `MIRROR3D` | 三维镜像 |
| `VP` | `VPOINT` / `DDVPOINT` | 三维观察方向 |
| `VS` | `VSCURRENT` | 当前视觉样式 |
| `VSM` | `VISUALSTYLES` | 视觉样式管理 |
| `FSHOT` | `FLATSHOT` | 三维视图生成二维投影 |
| `SPLANE` | `SECTIONPLANE` | 截面平面 |

---

## 19. 自定义、备份与恢复

### 19.1 Windows：修改命令别名

1. 输入 `AI_EDITCUSTFILE`。
2. 输入 `acad.pgp`；AutoCAD LT 使用 `acadlt.pgp`。
3. 在文件底部的用户自定义别名区域新增定义。
4. 保存文件。
5. 输入 `REINIT`，重新加载 PGP 文件；或重启 AutoCAD。

PGP 语法示例：

```text
CC, *COPY
RR, *ROTATE
```

不要直接覆盖系统默认段；将自定义别名放在文件末尾。若同一别名重复，后加载的定义通常生效。

### 19.2 macOS：修改命令别名

1. 选择“工具 → 自定义 → 编辑命令别名”，或输入 `ALIASEDIT`。
2. 添加、删除或修改别名。
3. 点击“应用”或“确定”。
4. 自定义通常写入 `acaduser.pgp`；AutoCAD LT 为 `acadltuser.pgp`。

### 19.3 自定义组合快捷键

Windows：

1. 输入 `CUI`。
2. 展开“键盘快捷键”。
3. 在“快捷键”或“临时替代键”下查找命令。
4. 分配组合键并检查冲突。
5. 应用并测试。

macOS：

- 使用 `CUI` / `CUSTOMIZE` 管理可用界面项。
- 组合键还可能与 macOS 系统快捷键冲突，应先检查“系统设置 → 键盘 → 键盘快捷键”。

### 19.4 查看当前机器真实配置

“网上最全列表”不能覆盖个人机器的覆盖项。最终应以安装实例为准：

- Windows 命令别名：查看 `acad.pgp`。
- macOS 命令别名：运行 `ALIASEDIT`，查看 `acaduser.pgp`。
- Windows 组合键：运行 `CUI`，查看“键盘快捷键”。
- 临时替代键：`CUI` →“键盘快捷键”→“临时替代键”。
- 若快捷键异常：检查插件、企业 CUIx、语言包、迁移设置和操作系统级快捷键。

---

## 20. 版本与平台差异

1. Autodesk 当前 AutoCAD 快捷键官网对应 2026 产品，但其可下载英文 PDF 的封面仍标注 AutoCAD 2024；本文用 2026 帮助中心交叉核验组合键、临时替代键和自定义方法。
2. Windows 官方 A–Z 表以 `acad.pgp` 主要默认别名为核心，并不代表每一个 AutoCAD 命令都有别名。
3. macOS 官方快捷键网页包含少量旧命令、拼写和映射错误；本文对明显错误作了修正或风险标注，但最终仍应以应用内 `ALIASEDIT` 为准。
4. AutoCAD LT 不含部分三维、数据库、动作录制、VBA 和其他完整 AutoCAD 功能；相应快捷键可能无效。
5. 行业专用工具集（Architecture、Mechanical、Electrical、Map 3D、Plant 3D 等）会增加专属命令和别名，本文不把插件/工具集命令混入核心 AutoCAD 默认表。
6. 中文、日文、德文等本地化版本的命令显示名称可能不同；脚本中建议使用 `_` 前缀调用全局英文命令。
7. 键盘布局会影响 `Shift + 标点` 类临时替代键。
8. `ME`、`PA`、`NVIEW`、`TO`、`TP` 等在 Windows 与 Mac 官方表中的映射存在差异，不能跨平台盲目复用。

---

## 21. 资料来源

主要官方来源：

1. Autodesk AutoCAD 2026 中文快捷键与命令页  
   https://www.autodesk.com.cn/shortcuts/autocad
2. Autodesk AutoCAD Shortcut & Hotkey Guide  
   https://www.autodesk.com/shortcuts/autocad
3. Autodesk AutoCAD Keyboard Shortcuts PDF（官网当前下载文件，封面标注 2024）  
   https://damassets.autodesk.net/content/dam/autodesk/www/shortcuts/autocad/autocad-shortcut-guide-en.pdf
4. Autodesk AutoCAD 2026 Shortcut Keys Reference  
   https://help.autodesk.com/view/ACD/2026/ENU/?guid=GUID-B6A9C126-230D-47F5-8973-464BC80E3736
5. Autodesk AutoCAD 2026 Temporary Override Keys Reference  
   https://help.autodesk.com/view/ACD/2026/ENU/?guid=GUID-B4AC255C-DF3E-44BB-9235-6E91D53CBA90
6. Autodesk AutoCAD 2026 About Creating Command Aliases  
   https://help.autodesk.com/view/ACD/2026/ENU/?guid=GUID-FE9AE544-F537-4D3B-8F75-B76484513787
7. Autodesk AutoCAD for Mac Shortcuts & Hotkey Guide  
   https://www.autodesk.com/asean/shortcuts/autocad-for-mac
8. Autodesk AutoCAD 2026 Object Snap Settings  
   https://help.autodesk.com/view/ACD/2026/ENU/?guid=GUID-50383F73-4F23-4F70-B4FC-52D5748D80AF
9. Autodesk AutoCAD 2026 Object Snap Menu  
   https://help.autodesk.com/view/ACD/2026/ENU/?guid=GUID-FC70F16E-0A40-4342-94DC-163CC231D3B3

---

## 快速结论

- 高频绘图：`L`、`PL`、`REC`、`C`、`A`、`H`。
- 高频修改：`M`、`CO`、`RO`、`SC`、`O`、`TR`、`EX`、`F`、`CHA`、`X`。
- 高频管理：`LA`、`MA`、`PR`、`B`、`I`、`XR`。
- 高频视图：滚轮、按住中键、`Z`、`P`、`RE`。
- 高频精确绘图：`F3`、`F8`、`F10`、`F11`、`F12`、`Shift + 右键`。
- 记住：命令别名必须输入后按 `Enter` 或空格；组合快捷键直接按下即可。

