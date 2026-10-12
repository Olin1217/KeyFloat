# Adobe After Effects 快捷键大全：Windows 与 macOS

> 整理日期：2026-07-25  
> 适用范围：当前版 Adobe After Effects（Windows、macOS）  
> 资料基准：Adobe 官方快捷键参考页（更新于 2026-05-11），并与 Adobe 新版桌面帮助及专业教学资料交叉核对  
> 键盘布局：以美式英文键盘为基准

## 目录

- [使用说明](#使用说明)
- [最值得先记住的 50 个快捷键](#最值得先记住的-50-个快捷键)
- [一、通用编辑、项目与首选项](#一通用编辑项目与首选项)
- [二、面板、查看器、工作区与窗口](#二面板查看器工作区与窗口)
- [三、工具](#三工具)
- [四、合成与工作区域](#四合成与工作区域)
- [五、时间导航](#五时间导航)
- [六、预览](#六预览)
- [七、视图、显示、缩放、网格与参考线](#七视图显示缩放网格与参考线)
- [八、素材与项目面板](#八素材与项目面板)
- [九、图层](#九图层)
- [十、时间轴属性显示与筛选](#十时间轴属性显示与筛选)
- [十一、修改图层属性](#十一修改图层属性)
- [十二、效果与动画预设](#十二效果与动画预设)
- [十三、关键帧与图表编辑器](#十三关键帧与图表编辑器)
- [十四、3D 图层、相机与灯光](#十四3d-图层相机与灯光)
- [十五、文本](#十五文本)
- [十六、蒙版与路径](#十六蒙版与路径)
- [十七、形状图层](#十七形状图层)
- [十八、绘画、画笔、仿制图章与橡皮擦](#十八绘画画笔仿制图章与橡皮擦)
- [十九、标记](#十九标记)
- [二十、运动跟踪](#二十运动跟踪)
- [二十一、保存、导出与渲染](#二十一保存导出与渲染)
- [二十二、自定义快捷键、冲突与恢复](#二十二自定义快捷键冲突与恢复)
- [二十三、高频工作流速查](#二十三高频工作流速查)
- [版本差异与易错项](#版本差异与易错项)
- [资料来源](#资料来源)

---

## 使用说明

### 1. Windows 与 macOS 修饰键

| Windows | macOS | 含义 |
|---|---|---|
| `Ctrl` | `Command ⌘` | 大多数主命令修饰键 |
| `Alt` | `Option ⌥` | 备用修饰键 |
| `Shift` | `Shift ⇧` | 扩展、反向或大步进 |
| `Backspace` / `Delete` | `Delete ⌫` / `Fn+Delete` | 删除；方向取决于键盘 |
| `Enter` | `Return ↩` | 主键盘回车，常用于重命名 |
| 数字小键盘 `Enter` | 数字小键盘 `Enter` | 在 AE 中与主键盘回车是两个不同按键 |
| `Home` / `End` | `Home` / `End`，或 `Fn+←` / `Fn+→` | 跳到开始 / 结束 |
| `Page Up` / `Page Down` | `Page Up` / `Page Down`，或 `Fn+↑` / `Fn+↓` | 前后移动帧 |

### 2. 快捷键写法

- `Ctrl+S`：同时按下。
- `A`：单击一次字母键。
- `AA`、`EE`、`LL`、`MM`、`PP`、`RR`、`SS`、`TT`、`UU`：快速连续按两次同一个字母，不是同时按。
- `Shift+A`：当已有属性显示时，将 Anchor Point 加入或移出当前显示集合；同理适用于其他属性字母。
- `Alt+Shift+P`：Windows 在当前时间为 Position 添加 / 删除关键帧；macOS 为 `Option+P`。这是 Adobe 官方两端写法并不完全对称的一组命令。
- “主键盘数字”和“数字小键盘数字”不是同一按键，本文会明确标注。

### 3. 上下文与焦点

- 同一按键会因当前面板、选中对象和编辑状态而变化。例如 `F` 在普通时间轴中显示 Mask Feather；选择相机工具后，`F` 会让相机看向所选 3D 图层。
- 文本编辑时，字母键用于输入文字，不会触发工具或属性快捷键。
- `V` 通常激活选择工具；在 3D Gizmo 场景中也用于切换 Universal Gizmo。
- `0–9` 在主键盘上用于跳转合成标记；数字小键盘 `0–9` 可用于按图层编号选层。
- 安装扩展、载入自定义快捷键集或更改键盘布局后，实际绑定可能不同。

### 4. MacBook、功能键与数字小键盘

- macOS 的 `F5–F12` 可能被亮度、媒体控制、调度中心等系统功能占用；必要时按住 `Fn`，或在系统设置中启用“将 F1、F2 等键用作标准功能键”。
- Adobe 为部分 macOS 无数字小键盘场景提供主键盘替代键：

| 功能 | 数字小键盘 | macOS 主键盘替代 |
|---|---|---|
| 仅预览音频 | 小键盘 `.` | `Control+.` |
| 预览工作区域音频 | `Option+小键盘 .` | `Control+Command+.` |
| 备用预览帧数 | `Option+小键盘 0` | `Control+Option+0` |
| 切换 Mercury Transmit | 小键盘 `/` | `Control+/` |
| 添加标记 | 小键盘 `*` | `Control+8` |
| 添加标记并打开对话框 | `Option+小键盘 *` | `Control+Option+8` |

- Windows 笔记本若无数字小键盘，Adobe 当前参考页没有为所有命令提供统一替代键。建议在快捷键编辑器中重新绑定。

### 5. 打开可视化快捷键编辑器

| 功能 | Windows | macOS |
|---|---|---|
| 打开 Keyboard Shortcuts | `Ctrl+Alt+'` | `Option+Command+'` |
| 菜单路径 | Edit > Keyboard Shortcuts | Edit > Keyboard Shortcuts |

编辑器可以按“应用级快捷键”和“面板级快捷键”查看绑定、搜索命令、检查冲突并保存自定义快捷键集。紫色键表示应用级绑定，绿色键表示面板级绑定，灰色键表示未分配。

---

## 最值得先记住的 50 个快捷键

| 功能 | Windows | macOS | 说明 |
|---|---|---|---|
| 新建合成 | `Ctrl+N` | `Cmd+N` | New Composition |
| 合成设置 | `Ctrl+K` | `Cmd+K` | Composition Settings |
| 导入素材 | `Ctrl+I` | `Cmd+I` | 单文件或图像序列 |
| 保存项目 | `Ctrl+S` | `Cmd+S` |  |
| 撤销 / 重做 | `Ctrl+Z` / `Ctrl+Shift+Z` | `Cmd+Z` / `Cmd+Shift+Z` |  |
| 复制所选内容 | `Ctrl+D` | `Cmd+D` | 图层、效果、蒙版、合成等 |
| 选择工具 | `V` | `V` | Selection |
| 手形工具 | `H` | `H` | Hand |
| 缩放工具 | `Z` | `Z` | Zoom |
| 旋转工具 | `W` | `W` | Rotation |
| 锚点工具 | `Y` | `Y` | Pan Behind / Anchor Point |
| 形状 / 蒙版工具 | `Q` | `Q` | 循环矩形、椭圆、多边形、星形等 |
| 钢笔 / 蒙版羽化工具 | `G` | `G` | 循环切换 |
| 文字工具 | `Ctrl+T` | `Cmd+T` | 横排 / 直排循环 |
| 相机工具 | `C` | `C` | 循环相机控制工具 |
| 新建纯色层 | `Ctrl+Y` | `Cmd+Y` | Solid |
| 新建空对象 | `Ctrl+Alt+Shift+Y` | `Cmd+Option+Shift+Y` | Null |
| 新建调整图层 | `Ctrl+Alt+Y` | `Cmd+Option+Y` | Adjustment Layer |
| 新建文本层 | `Ctrl+Alt+Shift+T` | `Cmd+Option+Shift+T` |  |
| 预合成 | `Ctrl+Shift+C` | `Cmd+Shift+C` | Pre-compose |
| 拆分图层 | `Ctrl+Shift+D` | `Cmd+Shift+D` | 当前时间处切开 |
| 图层入点移到当前时间 | `[` | `[` | 移动，不裁剪 |
| 图层出点移到当前时间 | `]` | `]` | 移动，不裁剪 |
| 裁剪图层入点 | `Alt+[` | `Option+[` | 当前时间处裁剪 |
| 裁剪图层出点 | `Alt+]` | `Option+]` | 当前时间处裁剪 |
| 时间反向图层 | `Ctrl+Alt+R` | `Cmd+Option+R` | Time-Reverse Layer |
| 启用时间重映射 | `Ctrl+Alt+T` | `Cmd+Option+T` | Time Remapping |
| Anchor Point | `A` | `A` | 显示锚点 |
| Position | `P` | `P` | 显示位置 |
| Scale | `S` | `S` | 显示缩放 |
| Rotation | `R` | `R` | 显示旋转与方向 |
| Opacity | `T` | `T` | 显示不透明度 |
| Audio Levels | `L` | `L` | 显示音频电平 |
| 所有带关键帧属性 | `U` | `U` | 含关键帧 / 表达式 |
| 所有已修改属性 | `UU` | `UU` | 快速连按两次 |
| 所有效果 | `E` | `E` | Effects |
| 所有表达式 | `EE` | `EE` | 快速连按两次 |
| 所有音频波形 | `LL` | `LL` | 快速连按两次 |
| 只显示蒙版组 | `MM` | `MM` | 快速连按两次 |
| 添加 / 删除表达式 | `Alt+单击秒表` | `Option+单击秒表` |  |
| 下一 / 上一关键帧或标记 | `K` / `J` | `K` / `J` | 沿时间标尺可见项目跳转 |
| 前后移动 1 帧 | `Page Down` / `Page Up` | `Page Down` / `Page Up` | 也可用 `Ctrl/Cmd+→/←` |
| Easy Ease | `F9` | `F9` | 选中关键帧 |
| Easy Ease In | `Shift+F9` | `Shift+F9` |  |
| Easy Ease Out | `Ctrl+Shift+F9` | `Cmd+Shift+F9` |  |
| 图表编辑器 | `Shift+F3` | `Shift+F3` | 时间轴 / Graph Editor 切换 |
| 开始 / 停止预览 | `Space` | `Space` | 也可用小键盘 `0` |
| 工作区域开始 / 结束 | `B` / `N` | `B` / `N` |  |
| 时间轴缩放 | `=` / `-` | `=` / `-` |  |
| 最大化鼠标下的面板 | `` ` `` | `` ` `` | 重音符 / Accent Grave |

---

# 一、通用编辑、项目与首选项

## 1. 基础编辑

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 剪切 | Cut | `Ctrl+X` | `Cmd+X` | 系统通用命令 |
| 复制 | Copy | `Ctrl+C` | `Cmd+C` | 系统通用命令 |
| 粘贴 | Paste | `Ctrl+V` | `Cmd+V` |  |
| 全选 | Select All | `Ctrl+A` | `Cmd+A` | 作用于当前焦点区域 |
| 取消全选 | Deselect All | `F2` 或 `Ctrl+Shift+A` | `F2` 或 `Cmd+Shift+A` |  |
| 重命名所选图层、合成、文件夹、效果、组或蒙版 | Rename Selected Item | 主键盘 `Enter` | `Return` | 不要与数字小键盘 Enter 混淆 |
| 打开所选图层、合成或素材 | Open Selected Item | 数字小键盘 `Enter` | 数字小键盘 `Enter` |  |
| 将所选项目下移 / 上移一层 | Move Backward / Forward | `Ctrl+Alt+↓` / `Ctrl+Alt+↑` | `Cmd+Option+↓` / `Cmd+Option+↑` | 图层、蒙版、效果、渲染项等 |
| 将所选项目移到底部 / 顶部 | Move to Back / Front | `Ctrl+Alt+Shift+↓` / `Ctrl+Alt+Shift+↑` | `Cmd+Option+Shift+↓` / `Cmd+Option+Shift+↑` |  |
| 将选择扩展到下一项 | Extend Selection to Next Item | `Shift+↓` | `Shift+↓` | 项目、渲染队列或效果控件面板 |
| 将选择扩展到上一项 | Extend Selection to Previous Item | `Shift+↑` | `Shift+↑` |  |
| 复制所选内容 | Duplicate | `Ctrl+D` | `Cmd+D` | 支持图层、蒙版、效果、形状、合成等 |
| 撤销 | Undo | `Ctrl+Z` | `Cmd+Z` |  |
| 重做 | Redo | `Ctrl+Shift+Z` | `Cmd+Shift+Z` |  |
| 清除全部内存 | Purge All Memory | `Ctrl+Alt+小键盘 /` | `Cmd+Option+小键盘 /` | 会清除缓存，不是普通撤销 |
| 中断正在运行的脚本 | Interrupt Running Script | `Esc` | `Esc` |  |
| 在 Info 面板显示当前帧对应文件名 | Display Current Frame Filename | `Ctrl+Alt+E` | `Cmd+Option+E` |  |
| 退出 After Effects | Quit | `Ctrl+Q` | `Cmd+Q` |  |

## 2. 项目

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建项目 | New Project | `Ctrl+Alt+N` | `Cmd+Option+N` |  |
| 打开项目 | Open Project | `Ctrl+O` | `Cmd+O` |  |
| 打开最近项目 | Open Most Recent Project | `Ctrl+Alt+Shift+P` | `Cmd+Option+Shift+P` |  |
| 在项目面板新建文件夹 | New Folder in Project Panel | `Ctrl+Alt+Shift+N` | `Cmd+Option+Shift+N` |  |
| 打开项目设置 | Project Settings | `Ctrl+Alt+Shift+K` | `Cmd+Option+Shift+K` |  |
| 在项目面板查找 | Find in Project Panel | `Ctrl+F` | `Cmd+F` |  |
| 循环切换项目色彩位深 | Cycle Project Bit Depth | `Alt+单击`项目面板底部位深按钮 | `Option+单击`位深按钮 | 8 / 16 / 32 bpc 等 |
| 通过位深按钮打开项目设置 | Open Project Settings via Bit-Depth Button | 单击位深按钮 | 单击位深按钮 |  |

## 3. 首选项

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开首选项 | Preferences | `Ctrl+Alt+;` | `Cmd+Option+;` | 分号键 |
| 启动时恢复默认首选项 | Restore Default Preferences | 启动 AE 时按住 `Ctrl+Alt+Shift` | 启动 AE 时按住 `Cmd+Option+Shift` | 会重置设置，确认后再操作 |

---

# 二、面板、查看器、工作区与窗口

## 1. 打开 / 关闭常用面板

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 项目面板 | Project | `Ctrl+0` | `Cmd+0` |
| 渲染队列面板 | Render Queue | `Ctrl+Alt+0` | `Cmd+Option+0` |
| 工具面板 | Tools | `Ctrl+1` | `Cmd+1` |
| 信息面板 | Info | `Ctrl+2` | `Cmd+2` |
| 预览面板 | Preview | `Ctrl+3` | `Cmd+3` |
| 音频面板 | Audio | `Ctrl+4` | `Cmd+4` |
| 效果和预设面板 | Effects & Presets | `Ctrl+5` | `Cmd+5` |
| 字符面板 | Character | `Ctrl+6` | `Cmd+6` |
| 段落面板 | Paragraph | `Ctrl+7` | `Cmd+7` |
| 绘画面板 | Paint | `Ctrl+8` | `Cmd+8` |
| 画笔面板 | Brushes | `Ctrl+9` | `Cmd+9` |
| 所选图层的效果控件面板 | Effect Controls | `F3` 或 `Ctrl+Shift+T` | `F3` 或 `Cmd+Option+T` |
| 项目流程图面板 | Project Flowchart | `Ctrl+F11` | `Cmd+F11` |

## 2. 面板、查看器与窗口控制

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 切换工作区 | Switch Workspace | `Shift+F10` / `Shift+F11` / `Shift+F12` | 同 Windows | 对应已分配的工作区 |
| 关闭活动查看器或面板 | Close Active Viewer or Panel | `Ctrl+W` | `Cmd+W` | 先关闭其中内容 |
| 关闭活动面板或同类全部查看器 | Close Active Panel / All Viewers of Type | `Ctrl+Shift+W` | `Cmd+Shift+W` | 如关闭全部 Timeline 查看器 |
| 拆分活动查看器所在框架 | Split Active Viewer Frame | `Ctrl+Alt+Shift+N` | `Cmd+Option+Shift+N` | 新查看器采用相反锁定状态 |
| 最大化 / 还原鼠标下方的面板 | Maximize / Restore Panel Under Pointer | `` ` `` | `` ` `` | 重音符键 |
| 将应用或浮动窗口适配屏幕 | Fit Window to Screen | `Ctrl+\` | `Cmd+\` | 再按一次让内容填满 |
| 移到主显示器并适配屏幕 | Move Window to Main Monitor and Fit | `Ctrl+Alt+\` | `Cmd+Option+\` |  |
| 在当前合成的 Composition 与 Timeline 面板间切换焦点 | Toggle Composition / Timeline Activation | `\` | `\` | 反斜杠 |
| 切换活动查看器中的上一 / 下一项 | Previous / Next Item in Active Viewer | `Shift+,` / `Shift+.` | 同 Windows | 如多个已打开合成 |
| 切换活动框架中的上一 / 下一面板 | Previous / Next Panel in Active Frame | `Alt+Shift+,` / `Alt+Shift+.` | `Option+Shift+,` / `Option+Shift+.` |  |
| 在多视图布局中激活某个视图且不改变图层选择 | Activate View Without Changing Selection | 鼠标中键单击 | 鼠标中键单击 |  |

---

# 三、工具

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 循环切换同组工具 | Cycle Through Tools | `Alt+单击`工具按钮 | `Option+单击`工具按钮 |  |
| 选择工具 | Selection Tool | `V` | `V` |  |
| 手形工具 | Hand Tool | `H` | `H` |  |
| 临时启用手形工具 | Temporarily Activate Hand Tool | 按住 `Space` 或鼠标中键 | 同 Windows |  |
| 放大工具 | Zoom In Tool | `Z` | `Z` |  |
| 临时切为缩小工具 | Zoom Out Tool | 放大工具激活时按住 `Alt` | 按住 `Option` |  |
| 旋转工具 | Rotation Tool | `W` | `W` |  |
| Roto Brush 工具 | Roto Brush Tool | `Alt+W` | `Option+W` | 与 Refine Edge 循环 |
| 优化边缘工具 | Refine Edge Tool | `Alt+W` | `Option+W` | 与 Roto Brush 循环 |
| 循环相机工具 | Camera Tools | `C` | `C` | Unified、Orbit、Track XY、Track Z |
| 锚点工具 | Pan Behind / Anchor Point Tool | `Y` | `Y` | 移动锚点 |
| 循环蒙版与形状工具 | Mask / Shape Tools | `Q` | `Q` | 矩形、圆角矩形、椭圆、多边形、星形 |
| 循环横排 / 直排文字工具 | Type Tools | `Ctrl+T` | `Cmd+T` |  |
| 钢笔与蒙版羽化工具循环 | Pen / Mask Feather Tools | `G` | `G` | 可在首选项关闭循环 |
| 钢笔激活时临时使用选择工具 | Temporary Selection Tool | 按住 `Ctrl` | 按住 `Cmd` |  |
| 选择工具下临时使用钢笔 / 加点 / 转换顶点 | Temporary Pen / Add / Convert Vertex | `Ctrl+Alt` | `Cmd+Option` | 指针需位于路径或顶点上 |
| 循环画笔、仿制图章、橡皮擦 | Brush / Clone Stamp / Eraser | `Ctrl+B` | `Cmd+B` |  |
| 循环 Puppet 工具 | Puppet Tools | `Ctrl+P` | `Cmd+P` |  |
| 临时将选择工具变为形状复制工具 | Shape Duplication Tool | 形状图层中按住 `Alt` | 按住 `Option` |  |
| 临时将选择工具变为直接选择工具 | Direct Selection Tool | 形状图层中按住 `Ctrl` | 按住 `Cmd` |  |

---

# 四、合成与工作区域

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建合成 | New Composition | `Ctrl+N` | `Cmd+N` |  |
| 打开所选合成的合成设置 | Composition Settings | `Ctrl+K` | `Cmd+K` |  |
| 将工作区域开始设为当前时间 | Set Work Area Beginning | `B` | `B` | Beginning |
| 将工作区域结束设为当前时间 | Set Work Area End | `N` | `N` | eNd |
| 工作区域适配所选图层时长；无选择时适配合成时长 | Set Work Area to Selected Layers / Comp | `Ctrl+Alt+B` | `Cmd+Option+B` |  |
| 打开当前合成 Mini-Flowchart | Composition Mini-Flowchart | `Tab` | `Tab` |  |
| 激活同一嵌套层级中最近使用的合成 | Activate Recent Related Composition | `Shift+Esc` | `Shift+Esc` |  |
| 将合成裁剪到工作区域 | Trim Composition to Work Area | `Ctrl+Shift+X` | `Cmd+Shift+X` | 会改变合成时长 |
| 从所选项目新建合成 | New Composition from Selection | `Alt+\` | `Cmd+\` |  |

---

# 五、时间导航

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 跳到指定时间 | Go to Time | `Alt+Shift+J` | `Option+Shift+J` |  |
| 跳到工作区域开始 / 结束 | Work Area Beginning / End | `Shift+Home` / `Shift+End` | 同 Windows |  |
| 跳到上一 / 下一可见时间项目 | Previous / Next Visible Time Item | `J` / `K` | `J` / `K` | 关键帧、图层标记、工作区域边界等 |
| 跳到合成、图层或素材开头 | Go to Beginning | `Home` 或 `Ctrl+Alt+←` | `Home` 或 `Cmd+Option+←` |  |
| 跳到合成、图层或素材结尾 | Go to End | `End` 或 `Ctrl+Alt+→` | `End` 或 `Cmd+Option+→` |  |
| 前进 1 帧 | Go Forward 1 Frame | `Page Down` 或 `Ctrl+→` | `Page Down` 或 `Cmd+→` |  |
| 前进 10 帧 | Go Forward 10 Frames | `Shift+Page Down` 或 `Ctrl+Shift+→` | `Shift+Page Down` 或 `Cmd+Shift+→` |  |
| 后退 1 帧 | Go Backward 1 Frame | `Page Up` 或 `Ctrl+←` | `Page Up` 或 `Cmd+←` |  |
| 后退 10 帧 | Go Backward 10 Frames | `Shift+Page Up` 或 `Ctrl+Shift+←` | `Shift+Page Up` 或 `Cmd+Shift+←` |  |
| 跳到图层入点 | Go to Layer In Point | `I` | `I` |  |
| 跳到图层出点 | Go to Layer Out Point | `O` | `O` |  |
| 跳到上一个入点 / 出点 | Previous In / Out Point | `Ctrl+Alt+Shift+←` | `Cmd+Option+Shift+←` |  |
| 跳到下一个入点 / 出点 | Next In / Out Point | `Ctrl+Alt+Shift+→` | `Cmd+Option+Shift+→` |  |
| 让时间轴滚动到当前时间 | Scroll Timeline to Current Time | `D` | `D` |  |

---

# 六、预览

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 开始 / 停止预览 | Start / Stop Preview | `Space`、小键盘 `0` 或 `Shift+小键盘 0` | 同 Windows | 不同按键可在 Preview 面板配置不同预览行为 |
| 将预览设置恢复为传统 RAM / Standard Preview 行为 | Reset Preview Behaviors | `Alt+单击 Reset` | `Option+单击 Reset` | Preview 面板 |
| 从当前时间仅预览音频 | Audio-Only Preview from Current Time | 小键盘 `.` | 小键盘 `.` 或 `Control+.` |  |
| 仅预览工作区域音频 | Audio-Only Preview in Work Area | `Alt+小键盘 .` | `Option+小键盘 .` 或 `Control+Cmd+.` |  |
| 手动擦洗视频 | Scrub Video | 拖动或 `Alt+拖动`当前时间指示器 | 拖动或 `Option+拖动` | 取决于 Live Update |
| 手动擦洗音频 | Scrub Audio | `Ctrl+拖动`当前时间指示器 | `Cmd+拖动` |  |
| 预览 Alternate Preview 指定帧数 | Alternate Preview Frames | `Alt+小键盘 0` | `Option+小键盘 0` 或 `Control+Option+0` | 默认 5 帧 |
| 切换 Mercury Transmit 视频预览 | Toggle Mercury Transmit | 小键盘 `/` | 小键盘 `/` 或 `Control+/` |  |
| 拍摄快照 1–4 | Take Snapshot | `Shift+F5` / `Shift+F6` / `Shift+F7` / `Shift+F8` | 同 Windows |  |
| 显示快照 1–4 | Display Snapshot | `F5` / `F6` / `F7` / `F8` | 同 Windows |  |
| 清除快照 1–4 | Purge Snapshot | `Ctrl+Shift+F5–F8` | `Cmd+Shift+F5–F8` |  |
| 快速预览：关闭 | Fast Previews > Off | `Ctrl+Alt+1` | `Cmd+Option+1` |  |
| 快速预览：自适应分辨率 | Adaptive Resolution | `Ctrl+Alt+2` | `Cmd+Option+2` |  |
| 快速预览：草稿 | Draft | `Ctrl+Alt+3` | `Cmd+Option+3` |  |
| 快速预览：快速草稿 | Fast Draft | `Ctrl+Alt+4` | `Cmd+Option+4` |  |
| 快速预览：线框 | Wireframe | `Ctrl+Alt+5` | `Cmd+Option+5` |  |

---

# 七、视图、显示、缩放、网格与参考线

## 1. 通道与显示

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 开关活动视图的显示色彩管理 | Toggle Display Color Management | `Shift+小键盘 /` | `Shift+小键盘 /` |  |
| 以灰度显示 R / G / B / Alpha 通道 | Show Channel as Grayscale | `Alt+1` / `Alt+2` / `Alt+3` / `Alt+4` | `Option+1` / `Option+2` / `Option+3` / `Option+4` |  |
| 彩色显示 R / G / B 通道 | Show Colorized Channel | `Alt+Shift+1` / `2` / `3` | `Option+Shift+1` / `2` / `3` |  |
| 开关 Straight RGB 显示 | Toggle Straight RGB | `Alt+Shift+4` | `Option+Shift+4` |  |
| 在 Layer 面板显示 Alpha 边界 | Show Alpha Boundary | `Alt+5` | `Option+5` | 透明 / 不透明边界 |
| 在 Layer 面板显示 Alpha 叠加 | Show Alpha Overlay | `Alt+6` | `Option+6` |  |
| 显示 Refine Edge X-ray | Show Refine Edge X-ray | `Alt+X` | `Option+X` |  |
| 禁止查看器为预览渲染图像 | Prevent Preview Rendering | `Caps Lock` | `Caps Lock` | 常用于只刷新参数、不刷新画面 |
| 显示 / 隐藏图层控件 | Show / Hide Layer Controls | `Ctrl+Shift+H` | `Cmd+Shift+H` | 蒙版、运动路径、控制点、图层手柄等 |

## 2. 画面缩放与分辨率

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 将合成居中于面板 | Center Composition in Panel | 双击手形工具 | 双击手形工具 |  |
| 放大 Composition / Layer / Footage | Zoom In | 主键盘 `.` | 主键盘 `.` |  |
| 缩小 Composition / Layer / Footage | Zoom Out | 主键盘 `,` | 主键盘 `,` |  |
| 缩放到 100% | Zoom to 100% | 主键盘 `/` | 主键盘 `/` |  |
| 适合面板 | Zoom to Fit | `Shift+主键盘 /` | 同 Windows |  |
| 最高以 100% 适合面板 | Zoom Up to 100% to Fit | `Alt+主键盘 /` | `Option+主键盘 /` | 不会放大超过 100% |
| 合成分辨率：Full | Resolution > Full | `Ctrl+J` | `Cmd+J` |  |
| 合成分辨率：Half | Resolution > Half | `Ctrl+Shift+J` | `Cmd+Shift+J` |  |
| 合成分辨率：Custom | Resolution > Custom | `Ctrl+Alt+J` | `Cmd+Option+J` |  |
| 打开活动合成的 View Options | View Options | `Ctrl+Alt+U` | `Cmd+Option+U` |  |

## 3. 时间轴缩放

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 放大时间轴 | Zoom In Time | 主键盘 `=` | 主键盘 `=` |
| 缩小时间轴 | Zoom Out Time | 主键盘 `-` | 主键盘 `-` |
| 放大到单帧单位；再次按恢复 | Zoom to Single-Frame Units | `;` | `;` |
| 显示整个合成时长；再次按恢复 | Show Entire Composition Duration | `Shift+;` | `Shift+;` |

## 4. 安全区、网格、标尺与参考线

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 显示 / 隐藏安全区 | Toggle Safe Zones | `'` | `'` | 单引号 |
| 显示 / 隐藏网格 | Toggle Grid | `Ctrl+'` | `Cmd+'` |  |
| 显示 / 隐藏比例网格 | Toggle Proportional Grid | `Alt+'` | `Option+'` | Adobe 2026 网页将 macOS 误列为与普通网格相同的 `Cmd+'`；以菜单与既有默认绑定为准 |
| 显示 / 隐藏标尺 | Toggle Rulers | `Ctrl+R` | `Cmd+R` |  |
| 显示 / 隐藏参考线 | Toggle Guides | `Ctrl+;` | `Cmd+;` |  |
| 开关吸附到网格 | Snap to Grid | `Ctrl+Shift+'` | `Cmd+Shift+'` |  |
| 开关吸附到参考线 | Snap to Guides | `Ctrl+Shift+;` | `Cmd+Shift+;` |  |
| 锁定 / 解锁参考线 | Lock / Unlock Guides | `Ctrl+Alt+Shift+;` | `Cmd+Option+Shift+;` |  |

---

# 八、素材与项目面板

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 导入一个文件或图像序列 | Import One File / Image Sequence | `Ctrl+I` | `Cmd+I` |  |
| 导入多个文件或图像序列 | Import Multiple Files / Sequences | `Ctrl+Alt+I` | `Cmd+Option+I` |  |
| 在 Footage 面板打开影片 | Open Movie in Footage Panel | 在项目面板双击素材 | 同 Windows |  |
| 将所选项目添加到最近激活的合成 | Add Selected Items to Active Composition | `Ctrl+主键盘 /` | `Cmd+主键盘 /` |  |
| 用项目面板所选素材替换所选图层的源 | Replace Source Footage for Selected Layers | `Ctrl+Alt+主键盘 /` | `Cmd+Option+主键盘 /` |  |
| 拖放替换单个所选图层的源 | Replace Source by Dragging | `Alt+拖动`项目素材到图层 | `Option+拖动` | 保留图层变换、效果等 |
| 不显示警告地删除素材 | Delete Footage Without Warning | `Ctrl+Backspace` | `Cmd+Delete` | 谨慎使用 |
| 打开解释素材对话框 | Interpret Footage | `Ctrl+Alt+G` | `Cmd+Option+G` |  |
| 记住素材解释 | Remember Footage Interpretation | `Ctrl+Alt+C` | `Cmd+Option+C` |  |
| 在关联应用中编辑原始素材 | Edit Original | `Ctrl+E` | `Cmd+E` |  |
| 替换所选素材项目 | Replace Selected Footage Item | `Ctrl+H` | `Cmd+H` |  |
| 重新载入所选素材 | Reload Selected Footage | `Ctrl+Alt+L` | `Cmd+Option+L` |  |
| 为所选素材设置代理 | Set Proxy | `Ctrl+Alt+P` | `Cmd+Option+P` |  |

---

# 九、图层

## 1. 新建、选择与管理

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建纯色图层 | New Solid Layer | `Ctrl+Y` | `Cmd+Y` |  |
| 新建空对象图层 | New Null Layer | `Ctrl+Alt+Shift+Y` | `Cmd+Option+Shift+Y` |  |
| 新建调整图层 | New Adjustment Layer | `Ctrl+Alt+Y` | `Cmd+Option+Y` |  |
| 按编号选择图层 1–999 | Select Layer by Number | 数字小键盘 `0–9` | 数字小键盘 `0–9` | 两位 / 三位编号需快速输入 |
| 按编号切换图层选择 | Toggle Layer Selection by Number | `Shift+小键盘 0–9` | 同 Windows |  |
| 选择堆叠顺序中的下一图层 | Select Next Layer | `Ctrl+↓` | `Cmd+↓` |  |
| 选择堆叠顺序中的上一图层 | Select Previous Layer | `Ctrl+↑` | `Cmd+↑` |  |
| 将选择扩展到下一图层 | Extend Selection to Next Layer | `Ctrl+Shift+↓` | `Cmd+Shift+↓` |  |
| 将选择扩展到上一图层 | Extend Selection to Previous Layer | `Ctrl+Shift+↑` | `Cmd+Shift+↑` |  |
| 取消所有图层选择 | Deselect All Layers | `Ctrl+Shift+A` | `Cmd+Shift+A` |  |
| 将最上方所选图层滚动到时间轴顶部 | Scroll Selected Layer to Top | `X` | `X` |  |
| 显示 / 隐藏 Parent 列 | Toggle Parent Column | `Shift+F4` | `Shift+F4` |  |
| 显示 / 隐藏 Switches 与 Modes 列 | Toggle Switches / Modes Columns | `F4` | `F4` |  |
| 所选图层采样方式：Best / Bilinear | Sampling: Best / Bilinear | `Alt+B` | `Option+B` | 循环 |
| 所选图层采样方式：Best / Bicubic | Sampling: Best / Bicubic | `Alt+Shift+B` | `Option+Shift+B` | 循环 |
| 关闭其他全部 Solo 开关 | Turn Off All Other Solo Switches | `Alt+单击 Solo` | `Option+单击 Solo` |  |
| 开关所选图层 Video / 眼睛 | Toggle Video Switch | `Ctrl+Alt+Shift+V` | `Cmd+Option+Shift+V` |  |
| 打开所选特殊图层设置 | Open Layer Settings | `Ctrl+Shift+Y` | `Cmd+Shift+Y` | 纯色、灯光、相机、空对象、调整层 |
| 锁定所选图层 | Lock Selected Layers | `Ctrl+L` | `Cmd+L` |  |
| 解锁全部图层 | Unlock All Layers | `Ctrl+Shift+L` | `Cmd+Shift+L` |  |
| 在时间轴面板中查找 | Find in Timeline | `Ctrl+F` | `Cmd+F` |  |

## 2. 编辑、打开与预合成

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 在当前时间粘贴图层 | Paste Layers at Current Time | `Ctrl+Alt+V` | `Cmd+Option+V` | 与普通粘贴位置不同 |
| 在当前时间拆分所选图层 | Split Selected Layers | `Ctrl+Shift+D` | `Cmd+Shift+D` | 未选图层时拆分全部 |
| 预合成所选图层 | Pre-compose | `Ctrl+Shift+C` | `Cmd+Shift+C` |  |
| 打开所选图层的效果控件 | Open Effect Controls | `Ctrl+Shift+T` | `Cmd+Shift+T` | macOS 官方面板通用项另列 `Cmd+Option+T`，以当前上下文菜单显示为准 |
| 在 Layer 面板打开图层 | Open Layer in Layer Panel | 双击图层 | 双击图层 | 预合成图层从 Composition 双击会打开源合成 |
| 在 Footage 面板打开图层源 | Open Layer Source in Footage Panel | `Alt+双击`图层 | `Option+双击`图层 | 预合成图层会在 Layer 面板打开 |
| 给所选图层添加效果 | Apply Selected Effect(s) | 在 Effects & Presets 面板双击效果 | 同 Windows | 支持多选效果 |
| 复制图层 | Duplicate Layer | `Ctrl+D` | `Cmd+D` | 通用 Duplicate |

## 3. 时间、入点、出点与混合模式

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 将所选图层时间反向 | Time-Reverse Layer | `Ctrl+Alt+R` | `Cmd+Option+R` |  |
| 为所选图层启用时间重映射 | Enable Time Remapping | `Ctrl+Alt+T` | `Cmd+Option+T` |  |
| 将图层入点移到当前时间 | Move In Point to Current Time | `[` | `[` | 移动整层，不改变时长 |
| 将图层出点移到当前时间 | Move Out Point to Current Time | `]` | `]` |  |
| 将入点裁剪到当前时间 | Trim In Point to Current Time | `Alt+[` | `Option+[` | 改变可见时长 |
| 将出点裁剪到当前时间 | Trim Out Point to Current Time | `Alt+]` | `Option+]` |  |
| 通过时间伸缩设置入点 | Set In Point by Time-Stretching | `Ctrl+Shift+,` | `Cmd+Shift+,` |  |
| 通过时间伸缩设置出点 | Set Out Point by Time-Stretching | `Ctrl+Alt+,` | `Cmd+Option+,` |  |
| 将所选图层入点移到合成开始 | Move In Point to Comp Beginning | `Alt+Home` | `Option+Home` |  |
| 将所选图层出点移到合成结束 | Move Out Point to Comp End | `Alt+End` | `Option+End` |  |
| 图层质量设为 Best | Quality > Best | `Ctrl+U` | `Cmd+U` |  |
| 图层质量设为 Draft | Quality > Draft | `Ctrl+Shift+U` | `Cmd+Shift+U` |  |
| 图层质量设为 Wireframe | Quality > Wireframe | `Ctrl+Alt+Shift+U` | `Cmd+Option+Shift+U` |  |
| 向前 / 向后循环混合模式 | Cycle Blending Modes | `Shift+=` / `Shift+-` | 同 Windows | 需选中图层且焦点不在文本编辑 |

## 4. 表达式

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 为属性添加 / 删除表达式 | Add / Remove Expression | `Alt+单击`属性秒表 | `Option+单击`属性秒表 |  |
| 只显示含表达式属性 | Show Expressions Only | `EE` | `EE` | 快速连按两次 |
| 显示含关键帧或表达式的属性 | Show Animated Properties | `U` | `U` |  |
| 收起 / 展开表达式字段 | Expand / Collapse Expression Field | 单击表达式左侧三角形 | 同 Windows | 无统一默认键 |
| 在表达式中换行 | New Line in Expression Editor | `Enter` | `Return` | 焦点必须在表达式编辑器 |

---

# 十、时间轴属性显示与筛选

> 下列单字母快捷键要求焦点不在文本或表达式编辑框内。双字母命令需快速连续按两次。

## 1. 时间轴展开与搜索

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 在时间轴查找属性 / 图层 | Find in Timeline | `Ctrl+F` | `Cmd+F` |  |
| 展开 / 收起所选图层的全部属性 | Toggle Expansion of Selected Layers | `` Ctrl+` `` | `` Cmd+` `` | 重音符 |
| 展开属性组及全部子组 | Expand Property Group and Children | `Ctrl+单击`属性组三角形 | `Cmd+单击`三角形 |  |
| 在效果控件中展开所选效果的全部属性 | Expand Selected Effects | `` Ctrl+` `` | `` Cmd+` `` | 焦点需在 Effect Controls |
| 在效果控件中展开属性组及全部子组 | Expand Effect Property Group | `Ctrl+单击`三角形 | `Cmd+单击`三角形 |  |

## 2. 显示单项或属性组

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 锚点；灯光 / 相机为 Point of Interest | Anchor Point / Point of Interest | `A` |  |
| 音频电平 | Audio Levels | `L` |  |
| 蒙版羽化 | Mask Feather | `F` |  |
| 蒙版路径 | Mask Path | `M` |  |
| 蒙版不透明度 | Mask Opacity | `TT` |  |
| 不透明度；灯光为 Intensity | Opacity / Intensity | `T` |  |
| 位置 | Position | `P` |  |
| 旋转与方向 | Rotation / Orientation | `R` |  |
| 缩放 | Scale | `S` |  |
| 时间重映射 | Time Remap | `RR` |  |
| 缺失效果实例 | Missing Effects | `FF` |  |
| 效果属性组 | Effects | `E` |  |
| 蒙版属性组 | Masks | `MM` |  |
| 材质选项属性组 | Material Options | `AA` | 3D 图层 |
| 表达式 | Expressions | `EE` |  |
| 带关键帧或表达式的属性 | Properties with Keyframes / Expressions | `U` |  |
| 所有已修改属性 | Modified Properties | `UU` | 相对默认值有修改 |
| 绘画笔触、Roto Brush 笔触与 Puppet Pins | Paint / Roto / Puppet | `PP` |  |
| 音频波形 | Audio Waveform | `LL` |  |
| 仅所选属性与组 | Selected Properties and Groups | `SS` |  |

## 3. 组合显示、隐藏与快速打关键帧

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 将属性加入 / 移出当前显示集合 | Add / Remove Property from Shown Set | `Shift+属性快捷键` | 同 Windows | 例如先按 `P`，再按 `Shift+S` |
| 隐藏指定属性或属性组 | Hide Property / Group | `Alt+Shift+单击`属性名 | `Option+Shift+单击`属性名 |  |
| 在当前时间添加 / 删除该属性关键帧 | Add / Remove Keyframe at Current Time | `Alt+Shift+属性快捷键` | `Option+属性快捷键` | 例如 Position：Win `Alt+Shift+P`；Mac `Option+P` |

---

# 十一、修改图层属性

## 1. 数值输入与对话框

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 按默认增量修改属性值 | Default Increment | 拖动属性值 | 拖动属性值 |  |
| 按 10 倍默认增量修改 | 10× Increment | `Shift+拖动`属性值 | 同 Windows |  |
| 按 1/10 默认增量修改 | 1/10 Increment | `Ctrl+拖动`属性值 | `Cmd+拖动`属性值 |  |
| 打开自动定向对话框 | Auto-Orientation | `Ctrl+Alt+O` | `Cmd+Alt+O` | Adobe 官方 macOS 写作 `Command+Alt+O` |
| 打开不透明度对话框 | Opacity | `Ctrl+Shift+O` | `Cmd+Shift+O` |  |
| 打开旋转对话框 | Rotation | `Ctrl+Shift+R` | `Cmd+Shift+R` |  |
| 打开位置对话框 | Position | `Ctrl+Shift+P` | `Cmd+Shift+P` |  |

## 2. 居中、移动与时间偏移

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 将所选图层锚点置于当前视图中心 | Center Selected Layers in View | `Ctrl+Home` | `Cmd+Home` | 修改 Position |
| 将锚点居中到图层可见内容 | Center Anchor Point in Layer Content | `Ctrl+Alt+Home` | `Cmd+Option+Home` | 高频命令 |
| 将所选图层移动 1 像素 | Move 1 Pixel | `方向键` | `方向键` | 按当前放大倍率 |
| 将所选图层移动 10 像素 | Move 10 Pixels | `Shift+方向键` | 同 Windows |  |
| 将所选图层提前 / 延后 1 帧 | Move Layer 1 Frame | `Alt+Page Up` / `Alt+Page Down` | `Option+Page Up` / `Option+Page Down` |  |
| 将所选图层提前 / 延后 10 帧 | Move Layer 10 Frames | `Alt+Shift+Page Up` / `Alt+Shift+Page Down` | `Option+Shift+Page Up` / `Option+Shift+Page Down` |  |

## 3. 旋转、不透明度与缩放的数字小键盘微调

| 操作 | English | Windows | macOS |
|---|---|---|---|
| Z Rotation 增 / 减 1° | Rotation ±1° | 小键盘 `+` / `-` | 小键盘 `+` / `-` |
| Z Rotation 增 / 减 10° | Rotation ±10° | `Shift+小键盘 +` / `-` | 同 Windows |
| Opacity / Light Intensity 增 / 减 1% | Opacity ±1% | `Ctrl+Alt+小键盘 +` / `-` | `Control+Option+小键盘 +` / `-` |
| Opacity / Light Intensity 增 / 减 10% | Opacity ±10% | `Ctrl+Alt+Shift+小键盘 +` / `-` | `Control+Option+Shift+小键盘 +` / `-` |
| Scale 增加 1% | Scale +1% | `Ctrl+小键盘 +` 或 `Alt+小键盘 +` | `Cmd+小键盘 +` 或 `Option+小键盘 +` |
| Scale 减少 1% | Scale -1% | `Ctrl+小键盘 -` 或 `Alt+小键盘 -` | `Cmd+小键盘 -` 或 `Option+小键盘 -` |
| Scale 增加 10% | Scale +10% | `Ctrl+Shift+小键盘 +` 或 `Alt+Shift+小键盘 +` | `Cmd+Shift+小键盘 +` 或 `Option+Shift+小键盘 +` |
| Scale 减少 10% | Scale -10% | `Ctrl+Shift+小键盘 -` 或 `Alt+Shift+小键盘 -` | `Cmd+Shift+小键盘 -` 或 `Option+Shift+小键盘 -` |

## 4. 变换工具与适配合成

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 以 15° 增量旋转 / 改变方向 | Constrain Rotation / Orientation | 使用旋转工具时 `Shift+拖动` | 同 Windows |  |
| 按素材画幅比例约束缩放 | Constrain Scale to Footage Aspect | 选择工具拖手柄时按住 `Shift` | 同 Windows |  |
| 将旋转重置为 0° | Reset Rotation | 双击旋转工具 | 双击旋转工具 |  |
| 将缩放重置为 100% | Reset Scale | 双击选择工具 | 双击选择工具 |  |
| 缩放并重新定位以适合合成 | Fit to Comp | `Ctrl+Alt+F` | `Cmd+Option+F` | 可能改变长宽比 |
| 适合合成宽度并保持图像比例 | Fit to Comp Width | `Ctrl+Alt+Shift+H` | `Cmd+Option+Shift+H` |  |
| 适合合成高度并保持图像比例 | Fit to Comp Height | `Ctrl+Alt+Shift+G` | `Cmd+Option+Shift+G` |  |

---

# 十二、效果与动画预设

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 删除所选图层的全部效果 | Remove All Effects | `Ctrl+Shift+E` | `Cmd+Shift+E` | 谨慎：不是仅删除当前选中效果 |
| 将最近使用的效果应用到所选图层 | Apply Most Recent Effect | `Ctrl+Alt+Shift+E` | `Cmd+Option+Shift+E` |  |
| 将最近使用的动画预设应用到所选图层 | Apply Most Recent Animation Preset | `Ctrl+Alt+Shift+F` | `Cmd+Option+Shift+F` |  |
| 将 Effects & Presets 中所选效果应用到图层 | Apply Selected Effect(s) | 双击效果 | 双击效果 | 需先选中目标图层 |
| 打开所选图层的效果控件 | Open Effect Controls | `F3` 或 `Ctrl+Shift+T` | `F3` 或 `Cmd+Option+T` | 具体绑定以菜单 / 编辑器为准 |
| 在效果控件中展开所选效果全部属性 | Expand Selected Effects | `` Ctrl+` `` | `` Cmd+` `` |  |
| 复制所选效果 | Duplicate Effect | `Ctrl+D` | `Cmd+D` | 焦点需在效果控件或相应属性 |

---

# 十三、关键帧与图表编辑器

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 在图表编辑器与图层条模式间切换 | Toggle Graph Editor | `Shift+F3` | `Shift+F3` |  |
| 选择某属性的全部关键帧 | Select All Keyframes for Property | 单击属性名 | 单击属性名 |  |
| 选择全部可见关键帧与属性 | Select All Visible Keyframes / Properties | `Ctrl+Alt+A` | `Cmd+Option+A` |  |
| 取消全部关键帧、属性与属性组选择 | Deselect All Keyframes / Properties | `Shift+F2` 或 `Ctrl+Alt+Shift+A` | `Shift+F2` 或 `Cmd+Option+Shift+A` |  |
| 将关键帧向前 / 后移动 1 帧 | Move Keyframe 1 Frame | `Alt+←` / `Alt+→` | `Option+←` / `Option+→` |  |
| 将关键帧向前 / 后移动 10 帧 | Move Keyframe 10 Frames | `Alt+Shift+←` / `Alt+Shift+→` | `Option+Shift+←` / `Option+Shift+→` |  |
| 设置所选关键帧插值 | Keyframe Interpolation | `Ctrl+Alt+K` | `Cmd+Option+K` | 图层条模式 |
| 在 Hold 与 Auto Bezier 间切换 | Hold / Auto Bezier | `Ctrl+Alt+H` | `Cmd+Option+H` |  |
| 在 Linear 与 Auto Bezier 间切换 | Linear / Auto Bezier | 图层条模式 `Ctrl+单击` | `Cmd+单击` |  |
| 在 Linear 与 Hold 间切换 | Linear / Hold | 图层条模式 `Ctrl+Alt+单击` | `Cmd+Option+单击` |  |
| Easy Ease | Easy Ease | `F9` | `F9` |  |
| Easy Ease In | Easy Ease In | `Shift+F9` | `Shift+F9` |  |
| Easy Ease Out | Easy Ease Out | `Ctrl+Shift+F9` | `Cmd+Shift+F9` |  |
| 设置所选关键帧速度 | Keyframe Velocity | `Ctrl+Shift+K` | `Cmd+Shift+K` |  |
| 在当前时间为属性添加 / 删除关键帧 | Add / Remove Keyframe | `Alt+Shift+属性快捷键` | `Option+属性快捷键` |  |
| 在时间轴反向粘贴已复制关键帧 | Reverse Paste Keyframes | `Ctrl+Shift+V` | `Cmd+Shift+V` | Adobe 2026 官方新增 / 当前列出项 |

---

# 十四、3D 图层、相机与灯光

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 切换到 3D View 1（默认 Front） | 3D View 1 | `F10` | `F10` |  |
| 切换到 3D View 2（默认 Custom View 1） | 3D View 2 | `F11` | `F11` |  |
| 切换到 3D View 3（默认 Active Camera） | 3D View 3 | `F12` | `F12` | Adobe 2026 网页的 macOS 单元格异常显示为 `b`；菜单与历年官方表均为 `F12` |
| 返回上一个视图 | Previous View | `Esc` | `Esc` |  |
| 新建灯光 | New Light | `Ctrl+Alt+Shift+L` | `Cmd+Option+Shift+L` |  |
| 切换 Orbit 相机控制 | Orbit Camera Control | `1` | `1` |  |
| 切换 Pan 相机控制 | Pan Camera Control | `2` | `2` |  |
| 切换 Dolly 相机控制 | Dolly Camera Control | `3` | `3` |  |
| 新建相机 | New Camera | `Ctrl+Alt+Shift+C` | `Cmd+Option+Shift+C` |  |
| 切换 Universal Gizmo | Universal Gizmo | `V` | `V` |  |
| 切换 Position Gizmo | Position Gizmo | `4` | `4` |  |
| 切换 Scale Gizmo | Scale Gizmo | `5` | `5` |  |
| 切换 Rotation Gizmo | Rotation Gizmo | `6` | `6` |  |
| 让相机及兴趣点看向所选 3D 图层 | Look at Selected 3D Layers | `Ctrl+Alt+Shift+\` | `Cmd+Option+Shift+\` |  |
| 相机工具已选时看向所选 3D 图层 | Look at Selected with Camera Tool | `F` | `F` |  |
| 相机工具已选时看向所有 3D 图层 | Look at All with Camera Tool | `Ctrl+Shift+F` | `Cmd+Shift+F` |  |
| 开关所选 3D 图层 Casts Shadows | Toggle Casts Shadows | `Alt+Shift+C` | `Option+Shift+C` |  |
| 显示材质选项 | Material Options | `AA` | `AA` | 快速连按两次 |

---

# 十五、文本

> 本节的格式快捷键仅在文字工具激活、文字层处于编辑状态或已选中文字时生效。部分组合键在其他上下文有其他用途。

## 1. 新建、对齐与选择

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建文本图层 | New Text Layer | `Ctrl+Alt+Shift+T` | `Cmd+Option+Shift+T` | 非文字编辑上下文 |
| 横排文字左 / 中 / 右对齐 | Align Horizontal Text | `Ctrl+Shift+L` / `C` / `R` | `Cmd+Shift+L` / `C` / `R` |  |
| 直排文字上 / 中 / 下对齐 | Align Vertical Text | `Ctrl+Shift+L` / `C` / `R` | `Cmd+Shift+L` / `C` / `R` |  |
| 横排文字按 1 个字符扩展 / 缩减选择 | Select by Character | `Shift+←` / `Shift+→` | 同 Windows |  |
| 横排文字按 1 个单词扩展 / 缩减选择 | Select by Word | `Ctrl+Shift+←` / `→` | `Cmd+Shift+←` / `→` |  |
| 横排文字按 1 行扩展 / 缩减选择 | Select by Line | `Shift+↑` / `Shift+↓` | 同 Windows |  |
| 直排文字向左 / 右按 1 行扩展 / 缩减选择 | Select Vertical Text by Line | `Shift+←` / `Shift+→` | 同 Windows |  |
| 直排文字向上 / 下按 1 个单词扩展 / 缩减选择 | Select Vertical Text by Word | `Ctrl+Shift+↑` / `↓` | `Cmd+Shift+↑` / `↓` |  |
| 直排文字向上 / 下按 1 个字符扩展 / 缩减选择 | Select Vertical Text by Character | `Shift+↑` / `Shift+↓` | 同 Windows |  |
| 从插入点选到行首 / 行尾 | Select to Beginning / End of Line | `Shift+Home` / `Shift+End` | 同 Windows |  |
| 将插入点移到行首 / 行尾 | Go to Beginning / End of Line | `Home` / `End` | 同 Windows |  |
| 选择图层中的全部文字 | Select All Text on Layer | 双击文本图层 | 双击文本图层 | 使用文字工具 |
| 从插入点选到文本框开始 / 结束 | Select to Beginning / End of Text Frame | `Ctrl+Shift+Home` / `End` | `Cmd+Shift+Home` / `End` |  |
| 从插入点选择到鼠标点击处 | Select to Mouse-Click Point | `Shift+单击` | `Shift+单击` |  |
| 选择单词 / 行 / 段落 / 整个文本框 | Select Word / Line / Paragraph / Frame | 文字工具双击 / 三击 / 四击 / 五击 | 同 Windows |  |

## 2. 插入点移动

| 场景 | 移动单位 | Windows | macOS |
|---|---|---|---|
| 横排文字 | 左 / 右 1 字符 | `←` / `→` | `←` / `→` |
| 横排文字 | 上 / 下 1 行 | `↑` / `↓` | `↑` / `↓` |
| 横排文字 | 左 / 右 1 单词 | `Ctrl+←` / `Ctrl+→` | `Cmd+←` / `Cmd+→` |
| 横排文字 | 上 / 下 1 段落 | `Ctrl+↑` / `Ctrl+↓` | `Cmd+↑` / `Cmd+↓` |
| 直排文字 | 上 / 下 1 字符 | `↑` / `↓` | `↑` / `↓` |
| 直排文字 | 左 / 右 1 行 | `←` / `→` | `←` / `→` |
| 直排文字 | 上 / 下 1 单词 | `Ctrl+↑` / `Ctrl+↓` | `Cmd+↑` / `Cmd+↓` |
| 直排文字 | 左 / 右 1 段落 | `Ctrl+←` / `Ctrl+→` | `Cmd+←` / `Cmd+→` |

## 3. 字符样式与比例

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 开关全大写 | Toggle All Caps | `Ctrl+Shift+K` | `Cmd+Shift+K` |
| 开关小型大写字母 | Toggle Small Caps | `Ctrl+Alt+Shift+K` | `Cmd+Option+Shift+K` |
| 开关上标 | Toggle Superscript | `Ctrl+Shift+=` | `Cmd+Shift+=` |
| 开关下标 | Toggle Subscript | `Ctrl+Alt+Shift+=` | `Cmd+Option+Shift+=` |
| 将所选文字水平缩放重置为 100% | Horizontal Scale 100% | `Ctrl+Shift+X` | `Cmd+Shift+X` |
| 将所选文字垂直缩放重置为 100% | Vertical Scale 100% | `Ctrl+Alt+Shift+X` | `Cmd+Option+Shift+X` |
| 自动行距 | Auto Leading | `Ctrl+Alt+Shift+A` | `Cmd+Option+Shift+A` |
| 字距 / 跟踪重置为 0 | Reset Tracking to 0 | `Ctrl+Shift+Q` | `Cmd+Shift+Control+Q` |

## 4. 段落、字号、行距、基线与字距

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 两端对齐，末行左对齐 | Justify; Last Line Left | `Ctrl+Shift+J` | `Cmd+Shift+J` |  |
| 两端对齐，末行右对齐 | Justify; Last Line Right | `Ctrl+Alt+Shift+J` | `Cmd+Option+Shift+J` |  |
| 强制末行两端对齐 | Force Justify Last Line | `Ctrl+Shift+F` | `Cmd+Shift+F` |  |
| 字号减 / 增 2 单位 | Font Size ±2 | `Ctrl+Shift+,` / `Ctrl+Shift+.` | `Cmd+Shift+,` / `Cmd+Shift+.` |  |
| 字号减 / 增 10 单位 | Font Size ±10 | `Ctrl+Alt+Shift+,` / `Ctrl+Alt+Shift+.` | `Cmd+Option+Shift+,` / `Cmd+Option+Shift+.` |  |
| 行距增 / 减 2 单位 | Leading ±2 | `Alt+↓` / `Alt+↑` | `Option+↓` / `Option+↑` | Adobe 以“增 / 减”顺序描述 |
| 行距增 / 减 10 单位 | Leading ±10 | `Ctrl+Alt+↓` / `Ctrl+Alt+↑` | `Cmd+Option+↓` / `Cmd+Option+↑` |  |
| 基线偏移减 / 增 2 单位 | Baseline Shift ±2 | `Alt+Shift+↓` / `Alt+Shift+↑` | `Option+Shift+↓` / `Option+Shift+↑` |  |
| 基线偏移减 / 增 10 单位 | Baseline Shift ±10 | `Ctrl+Alt+Shift+↓` / `↑` | `Cmd+Option+Shift+↓` / `↑` |  |
| 字偶距 / 跟踪减 / 增 20 | Kerning / Tracking ±20 | `Alt+←` / `Alt+→` | `Option+←` / `Option+→` | 单位为 1/1000 em |
| 字偶距 / 跟踪减 / 增 100 | Kerning / Tracking ±100 | `Ctrl+Alt+←` / `Ctrl+Alt+→` | `Cmd+Option+←` / `Cmd+Option+→` |  |
| 切换段落排版器 | Toggle Paragraph Composer | `Ctrl+Alt+Shift+T` | `Cmd+Option+Shift+T` | 文字编辑上下文；与新建文本层同键 |

---

# 十六、蒙版与路径

## 1. 创建、选择与自由变换

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建蒙版 | New Mask | `Ctrl+Shift+N` | `Cmd+Shift+N` |  |
| 选择蒙版中的全部点 | Select All Points in Mask | `Alt+单击`蒙版 | `Option+单击`蒙版 |  |
| 选择下一 / 上一个蒙版 | Next / Previous Mask | `` Alt+` `` / `` Alt+Shift+` `` | `` Option+` `` / `` Option+Shift+` `` |  |
| 进入蒙版自由变换 | Free-Transform Mask | 选择工具双击蒙版，或选中蒙版后 `Ctrl+T` | 双击蒙版，或 `Cmd+T` |  |
| 退出蒙版自由变换 | Exit Free Transform | `Esc` | `Esc` |  |
| 自由变换时围绕中心缩放 | Scale Around Center | `Ctrl+拖动` | `Cmd+拖动` |  |
| 路径点移动 1 像素 | Move Path Point 1 Pixel | `方向键` | `方向键` | 按当前放大倍率 |
| 路径点移动 10 像素 | Move Path Point 10 Pixels | `Shift+方向键` | 同 Windows |  |
| 平滑点 / 角点切换 | Toggle Smooth / Corner Point | `Ctrl+Alt+单击`顶点 | `Cmd+Option+单击`顶点 |  |
| 重绘贝塞尔手柄 | Redraw Bezier Handles | `Ctrl+Alt+拖动`顶点 | `Cmd+Option+拖动`顶点 |  |
| 反转所选蒙版 | Invert Selected Mask | `Ctrl+Shift+I` | `Cmd+Shift+I` |  |
| 打开蒙版羽化对话框 | Mask Feather | `Ctrl+Shift+F` | `Cmd+Shift+F` |  |
| 打开蒙版形状对话框 | Mask Shape | `Ctrl+Shift+M` | `Cmd+Shift+M` |  |

## 2. 蒙版模式

| 模式 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 相减 | Subtract | `S` | `S` |  |
| 变暗 | Darken | `D` | `D` |  |
| 差值 | Difference | `F` | `F` |  |
| 相加 | Add | `A` | `A` | Adobe 2026 网页的 macOS 单元格误列为 `S`；与 Subtract 冲突，实际默认为 `A` |
| 交集 | Intersect | `I` | `I` |  |
| 无 | None | `N` | `N` |  |

---

# 十七、形状图层

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 将所选形状编组 | Group Selected Shapes | `Ctrl+G` | `Cmd+G` |  |
| 取消形状编组 | Ungroup Selected Shapes | `Ctrl+Shift+G` | `Cmd+Shift+G` |  |
| 进入路径自由变换 | Free-Transform Path | 选中 Timeline 中 Path 后 `Ctrl+T` | 选中 Path 后 `Cmd+T` |  |
| 创建时增加星形内圆度 | Increase Star Inner Roundness | 拖动创建时按 `Page Up` | 同 Windows |  |
| 创建时减少星形内圆度 | Decrease Star Inner Roundness | 拖动创建时按 `Page Down` | 同 Windows |  |
| 增加星形 / 多边形点数；增加圆角矩形圆度 | Increase Points / Roundness | 拖动创建时按 `↑` | 同 Windows |  |
| 减少星形 / 多边形点数；减少圆角矩形圆度 | Decrease Points / Roundness | 拖动创建时按 `↓` | 同 Windows |  |
| 创建过程中重新定位形状 | Reposition Shape While Creating | 拖动创建时按住 `Space` | 同 Windows |  |
| 圆角矩形设为尖角；减小多边形 / 星形外圆度 | Sharp Corners / Decrease Outer Roundness | 拖动创建时按 `←` | 同 Windows |  |
| 圆角矩形圆度最大；增加多边形 / 星形外圆度 | Maximum Roundness / Increase Outer Roundness | 拖动创建时按 `→` | 同 Windows |  |
| 将矩形约束为正方形、椭圆约束为圆；多边形 / 星形约束为零旋转 | Constrain Shape | 拖动创建时按住 `Shift` | 同 Windows |  |
| 改变星形外半径 | Change Star Outer Radius | 拖动创建时按住 `Ctrl` | 按住 `Cmd` |  |
| 临时启用形状复制工具 | Shape Duplication Tool | 形状图层中按住 `Alt` | 按住 `Option` | 选择工具激活时 |
| 临时启用直接选择工具 | Direct Selection Tool | 形状图层中按住 `Ctrl` | 按住 `Cmd` | 选择工具激活时 |

---

# 十八、绘画、画笔、仿制图章与橡皮擦

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 交换绘画前景色与背景色 | Swap Foreground / Background Colors | `X` | `X` |  |
| 前景色设为黑、背景色设为白 | Default Paint Colors | `D` | `D` |  |
| 取指针下的颜色作为前景色 | Sample Foreground Color | `Alt+单击` | `Option+单击` | 任意绘画工具 |
| 取指针下 4×4 像素平均色 | Sample 4×4 Average Color | `Ctrl+Alt+单击` | `Cmd+Option+单击` |  |
| 设置画笔大小 | Set Brush Size | `Ctrl+拖动` | `Cmd+拖动` |  |
| 设置画笔硬度 | Set Brush Hardness | 先 `Ctrl+拖动`，拖动中松开 `Ctrl` | Mac 用 `Cmd` | 继续拖动调整 |
| 将当前笔触连接到上一笔触 | Join Stroke to Previous Stroke | 开始绘制时按住 `Shift` | 同 Windows |  |
| 设置仿制图章初始采样点 | Set Clone Stamp Sample Point | `Alt+单击` | `Option+单击` |  |
| 临时启用“仅上一笔触”橡皮擦 | Eraser: Last Stroke Only | `Ctrl+Shift` | `Cmd+Shift` |  |
| 显示并移动仿制图章叠加 | Show / Move Clone Stamp Overlay | 使用仿制图章时 `Alt+Shift+拖动` | `Option+Shift+拖动` | 改变 Offset / Source Position |
| 激活指定仿制图章预设 | Activate Clone Stamp Preset | 主键盘 `3` / `4` / `5` / `6` / `7` | 同 Windows |  |
| 复制仿制图章预设 | Duplicate Clone Stamp Preset | `Alt+单击`预设按钮 | `Option+单击` | Paint 面板 |
| 设置绘画工具不透明度 | Set Paint Opacity | 数字小键盘数字 | 同 Windows | `9=90%`、`1=10%` |
| 不透明度设为 100% | Paint Opacity 100% | 小键盘 `.` | 小键盘 `.` |  |
| 设置绘画工具流量 | Set Paint Flow | `Shift+小键盘数字` | 同 Windows | `Shift+9=90%` |
| 流量设为 100% | Paint Flow 100% | `Shift+小键盘 .` | 同 Windows |  |
| 按笔触 Duration 帧数前移 / 后移 | Move by Stroke Duration | `Ctrl+Page Up` / `Ctrl+Page Down`，或主键盘 `1` / `2` | `Cmd+Page Up` / `Cmd+Page Down`，或 `1` / `2` |  |

---

# 十九、标记

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 在当前时间添加标记 | Set Marker | 小键盘 `*` | 小键盘 `*` 或 `Control+8` | 预览和纯音频预览中也有效；未选图层时为合成标记 |
| 添加标记并打开标记对话框 | Set Marker and Open Dialog | `Alt+小键盘 *` | `Option+小键盘 *` 或 `Control+Option+8` |  |
| 在当前时间添加带编号合成标记 0–9 | Set Numbered Composition Marker | `Shift+主键盘 0–9` | 同 Windows |  |
| 跳到编号合成标记 0–9 | Go to Composition Marker | 主键盘 `0–9` | 同 Windows |  |
| 在 Info 面板显示两个图层标记 / 关键帧间时长 | Display Duration Between Items | `Alt+单击`两个标记或关键帧 | `Option+单击` |  |
| 删除标记 | Remove Marker | `Ctrl+单击`标记 | `Cmd+单击`标记 |  |

---

# 二十、运动跟踪

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 特征区域、搜索区域与附着点移动 1 像素 | Move All Tracking Regions 1 Pixel | `方向键` | `方向键` |
| 特征区域、搜索区域与附着点移动 10 像素 | Move All Tracking Regions 10 Pixels | `Shift+方向键` | 同 Windows |
| 仅特征区域与搜索区域移动 1 像素 | Move Feature / Search Regions 1 Pixel | `Alt+方向键` | `Option+方向键` |
| 仅特征区域与搜索区域移动 10 像素 | Move Feature / Search Regions 10 Pixels | `Alt+Shift+方向键` | `Option+Shift+方向键` |

---

# 二十一、保存、导出与渲染

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 保存项目 | Save Project | `Ctrl+S` | `Cmd+S` |  |
| 递增版本并保存 | Increment and Save | `Ctrl+Alt+Shift+S` | `Cmd+Option+Shift+S` | 自动增加文件名版本号 |
| 另存为 | Save As | `Ctrl+Shift+S` | `Cmd+Shift+S` |  |
| 将活动合成或所选项目加入渲染队列 | Add to Render Queue | `Ctrl+Shift+主键盘 /` | `Cmd+Shift+主键盘 /` |  |
| 将当前帧加入渲染队列 | Add Current Frame to Render Queue | `Ctrl+Alt+S` | `Cmd+Option+S` |  |
| 复制渲染项并保留相同输出文件名 | Duplicate Render Item with Same Filename | `Ctrl+Shift+D` | `Cmd+Shift+D` | 焦点需在 Render Queue |
| 将合成加入 Adobe Media Encoder 队列 | Add to Adobe Media Encoder Queue | `Ctrl+Alt+M` | `Cmd+Option+M` | 需已安装兼容版 AME |

---

# 二十二、自定义快捷键、冲突与恢复

## 1. 快捷键编辑器

| 操作 | Windows | macOS |
|---|---|---|
| 打开编辑器 | `Ctrl+Alt+'` | `Option+Cmd+'` |
| 菜单路径 | Edit > Keyboard Shortcuts | Edit > Keyboard Shortcuts |

在编辑器中可以：

1. 切换应用级与面板级命令。
2. 按命令名搜索。
3. 选择键盘上的按键，查看不同修饰键组合。
4. 识别冲突；同一上下文中重复绑定会显示警告。
5. 将命令拖到按键上，或把按键从命令中移除。
6. 使用 **Save As** 保存为新的快捷键集，避免直接覆盖默认集。
7. 在 **Keyboard Layout Preset** 中切换快捷键集。

## 2. 推荐的自定义原则

- 保留 `A/P/S/R/T`、`U/UU`、`J/K`、`B/N` 等 AE 核心肌肉记忆。
- 无数字小键盘时，优先重绑定预览、音频预览、标记和图层编号选择。
- 不要把文本输入常用字母设为需要在文字编辑状态触发的面板快捷键。
- 为第三方脚本和扩展绑定前，先在编辑器搜索目标组合键。
- 将自定义集另存为有版本号的名称，例如 `Hualong_AE_2026_v1`。
- After Effects 大版本升级后，先复制旧快捷键集，再检查新增命令和冲突。

## 3. 常见冲突排查

| 症状 | 可能原因 | 处理 |
|---|---|---|
| `F9–F12` 控制系统功能 | macOS 顶排键被系统占用 | 按 `Fn`；或把功能键设为标准 F 键 |
| 单字母属性键变成输入文字 | 焦点仍在文本层 / 搜索框 / 表达式编辑器 | 按 `Esc` 或单击 Timeline 空白处再试 |
| 主键盘数字无法选择图层 | 图层编号选择要求数字小键盘 | 使用小键盘，或在编辑器中改绑 |
| `0–9` 跳到标记而不是选图层 | 使用了主键盘数字 | 主键盘数字对应合成标记 |
| `Space` 只平移或无法预览 | 鼠标拖动、查看器焦点或预览配置不同 | 松开鼠标，激活 Composition / Timeline，并检查 Preview 面板 |
| `Ctrl/Cmd+T` 行为不同 | 当前是文本、蒙版、路径或工具上下文 | 先确认当前选区和焦点 |
| 双字母命令不生效 | 输入过慢或键盘重复设置异常 | 更快连按；在编辑器核对绑定 |
| 符号键不生效 | 非美式键盘布局 | 以菜单显示和可视化编辑器中的物理键为准 |
| 插件快捷键覆盖默认命令 | 扩展注册了同一组合键 | 在编辑器搜索冲突并重新分配 |
| 某个快捷键在新版发生变化 | 载入了旧自定义集或 Adobe 更新了默认集 | 切回默认集对照，再迁移必要绑定 |

## 4. 恢复与备份

- **恢复默认快捷键**：在 Keyboard Layout Preset 中选择 Adobe 默认集，或创建新的默认副本。
- **恢复默认首选项**：退出 AE，重新启动时按住 Windows `Ctrl+Alt+Shift` / macOS `Cmd+Option+Shift`。此操作不仅影响快捷键，可能同时重置其他首选项，应先备份。
- **备份自定义快捷键**：优先使用编辑器的 **Save As** 保留独立集合；迁移电脑或升级大版本前，复制对应版本的快捷键集。

---

# 二十三、高频工作流速查

## 1. 快速创建合成并开始动画

| 步骤 | Windows | macOS |
|---|---|---|
| 导入素材 | `Ctrl+I` | `Cmd+I` |
| 从所选素材新建合成 | `Alt+\` | `Cmd+\` |
| 显示 Position | `P` | `P` |
| 在当前时间添加 Position 关键帧 | `Alt+Shift+P` | `Option+P` |
| 前进 10 帧 | `Ctrl+Shift+→` | `Cmd+Shift+→` |
| 修改位置并自动生成第二个关键帧 | 拖动图层或改数值 | 同 Windows |
| 选中关键帧并 Easy Ease | `F9` | `F9` |
| 打开图表编辑器 | `Shift+F3` | `Shift+F3` |
| 预览 | `Space` | `Space` |

## 2. 快速裁剪与排列图层

| 目标 | 快捷键 |
|---|---|
| 将图层整体移到当前时间开始 | `[` |
| 将图层整体移到当前时间结束 | `]` |
| 在当前时间裁剪入点 | Windows `Alt+[`；macOS `Option+[` |
| 在当前时间裁剪出点 | Windows `Alt+]`；macOS `Option+]` |
| 在当前时间拆分 | Windows `Ctrl+Shift+D`；macOS `Cmd+Shift+D` |
| 提前 / 延后 1 帧 | Windows `Alt+Page Up/Down`；macOS `Option+Page Up/Down` |
| 提前 / 延后 10 帧 | 在上一项基础上再加 `Shift` |
| 将所选层预合成 | Windows `Ctrl+Shift+C`；macOS `Cmd+Shift+C` |

## 3. 一组常用属性同时显示

1. 选中图层，按 `P` 显示 Position。
2. 按 `Shift+S` 加入 Scale。
3. 按 `Shift+R` 加入 Rotation。
4. 按 `Shift+T` 加入 Opacity。
5. 再按同一组 `Shift+属性键` 可将该属性移出显示集合。
6. 按 `UU` 查看所有已修改属性；按 `U` 查看带关键帧或表达式的属性。

## 4. 复制动画并反向粘贴

1. 选择关键帧，`Ctrl/Cmd+C`。
2. 移到目标图层和目标时间。
3. 普通粘贴使用 `Ctrl/Cmd+V`。
4. 需要把关键帧时间顺序反过来时，使用 Windows `Ctrl+Shift+V` / macOS `Cmd+Shift+V`。

## 5. 替换素材但保留动画与效果

1. 在 Timeline 选中要替换源的图层。
2. 在 Project 面板选中新素材。
3. Windows 按住 `Alt`、macOS 按住 `Option`，把新素材拖到旧图层上。
4. 图层的变换、关键帧、效果、蒙版和大部分时间设置会保留，源素材被替换。

## 6. 快速检查透明度与边缘

| 目标 | Windows | macOS |
|---|---|---|
| 灰度查看 Alpha | `Alt+4` | `Option+4` |
| 查看 Alpha 边界 | `Alt+5` | `Option+5` |
| 查看 Alpha 叠加 | `Alt+6` | `Option+6` |
| 显示 Refine Edge X-ray | `Alt+X` | `Option+X` |
| 隐藏图层控件以干净查看画面 | `Ctrl+Shift+H` | `Cmd+Shift+H` |

---

## 版本差异与易错项

1. **本文以 2026 年 Adobe 当前版为时间基准。** 旧版教程常使用“RAM Preview”一词；当前版 Preview 面板允许为空格、小键盘 `0`、`Shift+小键盘 0` 分别配置行为，不应简单理解为固定的一套 RAM Preview 键。
2. **数字小键盘与主键盘必须区分。** 小键盘 `0` 通常预览，主键盘 `0` 跳到合成标记 0；小键盘 `*` 添加标记，主键盘 `8` 则不是同一命令。
3. **Mac 功能键冲突不是 AE 故障。** `F9–F12` 可能被 macOS 接管，需使用 `Fn` 或修改系统设置。
4. **Adobe 2026 网页有少数明显数据异常。** 当前页面把 macOS 的 3D View 3 显示成 `b`，把 Mask Add 显示成与 Subtract 相同的 `S`，并把比例网格写成与普通网格相同的 `Cmd+'`。本文依据 AE 菜单、可视化编辑器、历年 Adobe 表与多份交叉资料，分别采用 `F12`、`A`、`Option+'`。
5. **Effect Controls 的 macOS 组合存在官方页面内部不一致。** 同一 Adobe 页面在“Panels”段落列 `Cmd+Option+T`，在“Layers”段落列 `Cmd+Shift+T`；`F3` 最稳定，最终以当前 AE 菜单和快捷键编辑器显示为准。
6. **macOS 的 Auto-Orientation 官方单元格写作 `Command+Alt+O`。** Mac 键盘中的 Alt 即 Option，因此可理解为 `Cmd+Option+O`。
7. **双字母快捷键必须快速连按。** `UU` 是所有已修改属性，`U` 是含关键帧或表达式属性；`TT` 是 Mask Opacity，而 `T` 是图层 Opacity。
8. **`Ctrl/Cmd+D` 是上下文命令。** 在 Timeline 复制图层，在 Effect Controls 复制效果，在 Render Queue 复制渲染项；它不会永远只复制图层。
9. **`Ctrl/Cmd+Shift+D` 也依赖上下文。** Timeline 中拆分图层，Render Queue 中复制渲染项。
10. **第三方插件快捷键不属于 AE 默认键。** 例如 Video Copilot FX Console 常用 `Ctrl+Space`，但它只有安装插件后才有效，因此没有混入官方默认表。
11. **键盘语言会影响符号键。** 单引号、分号、反斜杠、重音符、方括号、加减号在中文、日文、欧洲键盘上位置可能不同；请以可视化快捷键编辑器显示的物理键为准。
12. **本文列的是默认快捷键，而不是所有可分配命令。** After Effects 快捷键编辑器的 Command List 还包含没有默认按键的命令。要获得当前安装版本、当前键盘布局、当前扩展环境下的绝对完整绑定，应打开编辑器搜索并查看。

---

## 资料来源

### 官方资料

1. [Adobe After Effects：Preset and customizable keyboard shortcuts（新版桌面帮助）](https://helpx.adobe.com/after-effects/desktop/get-started/keyboard-shortcuts/keyboard-shortcuts-reference.html)  
   本文主体来源；包含 Windows、macOS 默认快捷键、可视化编辑器、自定义集合和冲突说明。
2. [Adobe After Effects：Keyboard shortcuts in After Effects（经典帮助入口）](https://helpx.adobe.com/after-effects/using/keyboard-shortcuts-reference.html)  
   用于交叉核对完整分类、旧入口兼容与更新日期。
3. [Adobe After Effects：Modifying and using views](https://helpx.adobe.com/after-effects/desktop/view-and-preview/preview-video-and-audio/modifying-using-views.html)  
   用于核对 3D View 快捷键的分配与修改方式。

### 交叉核对资料

4. [School of Motion：30 Essential Keyboard Shortcuts in After Effects](https://schoolofmotion.com/blog/30-essential-keyboard-shortcuts-in-after-effects)  
   用于核对业内高频 APSRT、属性组合显示、图层裁剪等工作流。
5. [Noble Desktop：After Effects Keyboard Shortcuts for Mac](https://www.nobledesktop.com/shortcuts/after-effects/mac)  
   用于交叉核对 macOS 工具、图层、时间轴与渲染快捷键。
6. [Frame.io：Over 30 After Effects Shortcuts You Should Be Using](https://blog.frame.io/2019/06/17/after-effects-shortcuts/)  
   用于复核专业工作流中的常用组合；遇到版本差异时以 Adobe 2026 官方值为准。

---

## 文档范围说明

- 已覆盖 Adobe 2026 官方参考页的全部 24 类默认快捷键：General、Projects、Preferences、Panels / Viewers / Workspaces、Tools、Compositions、Time Navigation、Previews、Views、Footage、Effects、Layers、Timeline Properties、Effect Controls、Layer Property Modification、3D Layers、Keyframes / Graph Editor、Text、Masks、Paint、Shape Layers、Markers、Motion Tracking、Saving / Exporting / Rendering。
- 表中同时保留操作语义、英文命令名、Windows、macOS 与必要上下文说明，便于在英文界面的 Keyboard Shortcuts 编辑器中搜索。
- 未把第三方插件、脚本或个人自定义绑定冒充为 AE 默认快捷键。
- 对 Adobe 当前网页的明显异常已做交叉核对并明确标注，避免照抄后无法使用。

