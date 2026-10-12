# Cinema 4D（C4D）快捷键大全：Windows 与 macOS

> 整理日期：2026-07-25  
> 适用版本：Maxon Cinema 4D 2026.x，主体依据 Cinema 4D 2026.3.1 官方帮助  
> 适用平台：Windows、macOS  
> 键盘布局：以美式英文键盘为基准

## 目录

- [使用说明](#使用说明)
- [最值得先记住的 40 个快捷键](#最值得先记住的-40-个快捷键)
- [一、通用编辑、项目与帮助](#一通用编辑项目与帮助)
- [二、管理器与窗口](#二管理器与窗口)
- [三、视口与相机导航](#三视口与相机导航)
- [四、视口显示模式](#四视口显示模式)
- [五、坐标、变换与建模模式](#五坐标变换与建模模式)
- [六、多边形建模工具](#六多边形建模工具)
- [七、选择工具与选择命令](#七选择工具与选择命令)
- [八、对象管理器](#八对象管理器)
- [九、材质管理器](#九材质管理器)
- [十、节点编辑器](#十节点编辑器)
- [十一、时间线与动画播放](#十一时间线与动画播放)
- [十二、关键帧插值](#十二关键帧插值)
- [十三、属性管理器](#十三属性管理器)
- [十四、图片查看器](#十四图片查看器)
- [十五、结构管理器](#十五结构管理器)
- [十六、资源浏览器](#十六资源浏览器)
- [十七、BodyPaint 3D 与 UV](#十七bodypaint-3d-与-uv)
- [十八、运动跟踪](#十八运动跟踪)
- [十九、脚本管理器](#十九脚本管理器)
- [二十、渲染](#二十渲染)
- [二十一、Redshift RenderView](#二十一redshift-renderview)
- [二十二、Redshift Shader Graph](#二十二redshift-shader-graph)
- [二十三、雕刻](#二十三雕刻)
- [二十四、自定义快捷键、冲突与完整绑定查看](#二十四自定义快捷键冲突与完整绑定查看)
- [版本差异与易错项](#版本差异与易错项)
- [资料来源](#资料来源)

---

## 使用说明

### 1. Windows 与 Mac 的换键规则

Maxon 官方快捷键页明确说明：Mac 用户通常用 `Cmd` 替代 Windows 的 `Ctrl`。因此本文将两端分列：

| Windows | macOS | 含义 |
|---|---|---|
| `Ctrl` | `Cmd ⌘` | 主命令修饰键 |
| `Alt` | `Option ⌥` | 备用修饰键 |
| `Shift` | `Shift ⇧` | Shift |
| `Backspace` / `Delete` | `Delete ⌫` / `Fn+Delete` | 删除；具体方向取决于键盘 |
| `Enter` | `Return ↩` | 回车 |
| `Home` / `Pos 1` | `Home` 或 `Fn+←` | 行首 / 起点键，取决于键盘 |
| `PageUp` / `PageDown` | `Fn+↑` / `Fn+↓` | 翻页键，取决于键盘 |

### 2. 同时按与依次按

- `Ctrl+S`：同时按下两个键。
- `M, S`：先按 `M`，松开后再按 `S`；这是 C4D 常见的分层快捷键。
- `U, Shift+S`：先按 `U`，再按住 `Shift` 按 `S`。
- `1 + 拖动`：按住数字 `1`，同时用鼠标左键拖动。
- `Alt+MMB`：按住 `Alt`，同时用鼠标中键拖动。

### 3. 鼠标缩写

| 缩写 | 含义 |
|---|---|
| `LMB` | 鼠标左键 |
| `MMB` | 鼠标中键 / 按下滚轮 |
| `RMB` | 鼠标右键 |
| `Wheel` | 鼠标滚轮 |
| `Drag` | 拖动 |
| `Double-click` | 双击 |

### 4. C4D 快捷键的上下文特性

- 同一个按键在不同区域可执行不同命令。例如，鼠标位于视口时 `S` 会聚焦选中元素；位于对象管理器时 `S` 会滚动到第一个活动对象；位于节点编辑器时 `S` 会显示选中节点。
- 全局命令与管理器局部命令可以使用同一快捷键，局部命令在鼠标位于相应管理器时优先。
- 安装插件、切换快捷键预设或自行修改后，实际按键可能与本文不同。
- MacBook 顶排默认可能控制亮度、音量等系统功能，使用 `F1–F12` 时可能需要同时按 `Fn`。
- 符号键如 `#`、`,`、`.`、`[`、`]` 会受键盘语言和布局影响；不生效时请在 Command Manager 中搜索命令名称。

### 5. “选项模式”快捷键

部分建模命令带有参数选项窗口。直接执行快捷键会使用当前设置立即运行；在第二个按键上加 `Shift`，会先打开选项窗口。例如：

- `U, S`：直接执行 Subdivide。
- `U, Shift+S`：先打开 Subdivide 选项。

---

## 最值得先记住的 40 个快捷键

| 功能 | Windows | macOS | 说明 |
|---|---|---|---|
| 打开 Commander | `Shift+C` | `Shift+C` | 搜索任意命令、对象、标签或工具 |
| 上下文帮助 | `Ctrl+F1` | `Cmd+F1` | 鼠标指向参数或界面元素后使用 |
| 撤销 | `Ctrl+Z` | `Cmd+Z` | 撤销普通操作 |
| 重做 | `Ctrl+Y` | `Cmd+Y` | 重做普通操作 |
| 撤销建模动作 | `Shift+Z` | `Shift+Z` | 工具内 / 建模动作撤销 |
| 移动工具 | `E` | `E` |  |
| 旋转工具 | `R` | `R` |  |
| 缩放工具 | `T` | `T` |  |
| 在常用工具间切换 | `Space` | `Space` | 当前工具与选择工具间切换 |
| 切换建模模式 | `Enter` | `Return` | 在点、边、面等模式间循环 |
| 转为可编辑对象 | `C` | `C` | Make Editable |
| 挤压 | `D` 或 `M, T` | `D` 或 `M, T` | Extrude |
| 内部挤压 | `I` 或 `M, W` | `I` 或 `M, W` | Extrude Inner / Inset |
| 倒角 | `M, S` | `M, S` | Bevel |
| 线性切割 | `K, K` | `K, K` | Line Cut |
| 平面切割 | `K, J` | `K, J` | Plane Cut |
| 循环 / 路径切割 | `K, L` | `K, L` | Loop/Path Cut |
| 优化 | `U, O` | `U, O` | Optimize |
| 细分 | `U, S` | `U, S` | Subdivide |
| 连接点 / 边 | `M, M` | `M, M` | Connect Points/Edges |
| 实时选择 | `9` | `9` | Live Selection |
| 矩形选择 | `0` | `0` | Rectangle Selection |
| 全选 | `Ctrl+A` | `Cmd+A` |  |
| 取消全选 | `Ctrl+Shift+A` | `Cmd+Shift+A` |  |
| 循环选择 | `U, L` | `U, L` | Loop Selection |
| 环状选择 | `U, B` | `U, B` | Ring Selection |
| 选择连接 | `U, W` | `U, W` | Select Connected |
| 移动相机 | `1` + 拖动 / `Alt+MMB` | `1` + 拖动 / `Option+MMB` | 视口导航 |
| 推拉相机 | `2` + 拖动 / `Alt+RMB` | `2` + 拖动 / `Option+RMB` | Dolly / Zoom |
| 旋转相机 | `3` + 拖动 / `Alt+LMB` | `3` + 拖动 / `Option+LMB` | Orbit |
| 聚焦选中元素 | `S` | `S` | 鼠标需位于视口 |
| 聚焦选中对象 | `O` | `O` | 鼠标需位于视口 |
| 显示全部几何体 | `H` | `H` | 鼠标需位于视口 |
| 最大化 / 还原视口 | 在视口中按 `MMB` | 在视口中按 `MMB` | 四视图与单视图切换 |
| 切换坐标系 | `W` | `W` | 世界 / 对象坐标 |
| 显示 / 隐藏轴 | `Alt+D` | `Option+D` |  |
| 开关生成器 | `Q` | `Q` | 常用于细分曲面前后对比 |
| 渲染活动视口 | `Ctrl+R` | `Cmd+R` |  |
| 渲染到图片查看器 | `Shift+R` | `Shift+R` |  |
| 打开渲染设置 | `Ctrl+B` | `Cmd+B` |  |

---

# 一、通用编辑、项目与帮助

## 1. 项目与文件

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 新建项目 | New Project | `Ctrl+N` | `Cmd+N` |  |
| 打开项目 | Open Project | `Ctrl+O` | `Cmd+O` |  |
| 合并项目 | Merge Project | `Ctrl+Shift+O` | `Cmd+Shift+O` | 将其他项目合并到当前项目 |
| 保存项目 | Save Project | `Ctrl+S` | `Cmd+S` |  |
| 项目另存为 | Save Project As | `Ctrl+Shift+S` | `Cmd+Shift+S` |  |
| 增量保存 | Save Incremental | `Ctrl+Alt+S` | `Cmd+Option+S` | 生成递增版本文件 |
| 关闭当前窗口 / 项目 | Close Window / Project | `Ctrl+W` 或 `Shift+W` | `Cmd+W` 或 `Shift+W` | `Shift+W` 为 C4D 官方列出的关闭窗口命令 |
| 关闭全部项目 | Close All Projects | `Ctrl+Shift+F4` | `Cmd+Shift+F4` |  |
| 退出程序 | Quit / Exit | `Ctrl+Q` | `Cmd+Q` | macOS 通常由系统接管 `Cmd+Q` |

## 2. 基础编辑

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 剪切 | Cut | `Ctrl+X` | `Cmd+X` |
| 复制 | Copy | `Ctrl+C` | `Cmd+C` |
| 粘贴 | Paste | `Ctrl+V` | `Cmd+V` |
| 删除 | Delete | `Backspace` / `Delete` | `Delete ⌫` / `Fn+Delete` |
| 全选 | Select All | `Ctrl+A` | `Cmd+A` |
| 取消全选 | Deselect All | `Ctrl+Shift+A` | `Cmd+Shift+A` |
| 撤销 | Undo | `Ctrl+Z` | `Cmd+Z` |
| 重做 | Redo | `Ctrl+Y` | `Cmd+Y` |
| 撤销当前建模动作 | Undo Action | `Shift+Z` | `Shift+Z` |

## 3. 搜索、设置与帮助

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开 Commander | Commander | `Shift+C` | `Shift+C` | 搜索并执行命令、创建对象或标签 |
| 打开上下文帮助 | Context Help | `Ctrl+F1` | `Cmd+F1` | 鼠标先指向参数、属性名或界面元素 |
| 打开项目设置 | Project Settings | `Ctrl+D` | `Cmd+D` | 稳定常用快捷键 |
| 打开首选项 | Preferences | `Ctrl+E` | `Cmd+E` | 鼠标位于某些管理器时可能调用其局部设置 |
| 查看场景 / 项目信息 | Scene / Project Information | `Ctrl+I` | `Cmd+I` | 在对象管理器中也可使用 |
| 快速命令 / HUD 菜单 | Quick Command Selection | 按住 `V` | 按住 `V` | 打开圆盘式快捷菜单 |
| 切换坐标系统 | Change Coordinate System | `W` | `W` |  |
| 当前工具与选择工具切换 | Last Tool / Selection | `Space` | `Space` |  |
| 最近两个工具切换 | Switch Last Two Tools | `Shift+Space` | `Shift+Space` |  |
| 全屏模式 | Full-Screen Mode | `Ctrl+Tab` | `Cmd+Tab`* | macOS 的 `Cmd+Tab` 通常被系统应用切换占用 |

> `Ctrl+Tab` / `Cmd+Tab` 可能与操作系统冲突；以 C4D 当前菜单和 Command Manager 显示为准。

---

# 二、管理器与窗口

| 管理器 / 窗口 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 对象管理器 | Object Manager | `Shift+F1` | `Shift+F1` | MacBook 可能需 `Fn` |
| 材质管理器 | Material Manager | `Shift+F2` | `Shift+F2` |  |
| 节点编辑器 | Node Editor | `Shift+Alt+F2` | `Shift+Option+F2` |  |
| 时间线 | Timeline | `Shift+F3` | `Shift+F3` |  |
| 图层管理器 | Layer Manager | `Shift+F4` | `Shift+F4` |  |
| 属性管理器 | Attribute Manager | `Shift+F5` | `Shift+F5` |  |
| 图片查看器 | Picture Viewer | `Shift+F6` | `Shift+F6` |  |
| 坐标管理器 | Coordinate Manager | `Shift+F7` | `Shift+F7` |  |
| 结构管理器 | Structure Manager | `Shift+F9` | `Shift+F9` |  |
| 脚本管理器 | Script Manager | `Shift+F10` | `Shift+F10` | 2026 官方当前值 |
| 命令管理器 | Command Manager / Customize Commands | `Shift+F12` | `Shift+F12` | 查看和修改全部绑定 |
| 关闭当前窗口 | Close Window | `Shift+W` | `Shift+W` |  |

> 旧版资料常将 `Shift+F8` 标为 Content Browser / Asset Browser、将 `Shift+F10` 标为 Console、将 `Shift+F11` 标为 Script Manager。2026 官方当前总表已经改变，请以本表和本机 Command Manager 为准。

---

# 三、视口与相机导航

## 1. 相机移动

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 平移相机 | Move / Pan Camera | 按住 `1` + `LMB` 拖动 | 按住 `1` + `LMB` 拖动 | 数字键不是单独点击 |
| 平移相机（替代方式） | Pan Camera | `Alt+MMB` 拖动 | `Option+MMB` 拖动 |  |
| 推拉相机 | Dolly In / Out | 按住 `2` + `LMB` 拖动 | 按住 `2` + `LMB` 拖动 |  |
| 推拉相机（替代方式） | Dolly Camera | `Alt+RMB` 拖动 | `Option+RMB` 拖动 |  |
| 旋转相机 | Rotate / Orbit Camera | 按住 `3` + `LMB` 拖动 | 按住 `3` + `LMB` 拖动 |  |
| 旋转相机（替代方式） | Orbit Camera | `Alt+LMB` 拖动 | `Option+LMB` 拖动 |  |
| 绕视线轴旋转 | Rotate Around Viewing Axis | `3+RMB` 或 `Alt+RMB` | `3+RMB` 或 `Option+RMB` | 是否触发取决于当前导航模式 |
| 调整相机焦距 | Adjust Camera Focal Length | 按住 `2` + `RMB` 拖动 | 按住 `2` + `RMB` 拖动 | 常用高频鼠标操作 |
| 加速导航 | Faster Navigation | 导航时按住 `Shift` | 导航时按住 `Shift` | 官方说明速度加倍 |
| 精细导航 | Precise Navigation | 导航时按住 `Ctrl` | 导航时按住 `Cmd` | 官方说明横向移动速度减半 |
| 设置 / 取消相机枢轴 | Set Camera Pivot | `Insert` | `Home` | 2026 官方导航说明 |
| 锁定相机枢轴 | Lock Camera Pivot | 在 Command Manager 搜索 | 在 Command Manager 搜索 | 默认是否绑定取决于预设 |

## 2. 聚焦、缩放与视图切换

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 聚焦选中元素 | Frame Selected Elements | `S` 或 `Alt/Option+S` | 点、边、面等组件 |
| 聚焦选中对象 | Frame Selected Object | `O` 或 `Alt/Option+O` | 选中整个对象 |
| 显示全部几何体 | Frame Geometry / Frame All | `H` 或 `Alt/Option+H` |  |
| 最大化 / 还原当前视口 | Maximize / Restore Viewport | 鼠标位于视口时按 `MMB` |  |
| 切换活动视图 | Toggle Active View | `PageUp` 或 `MMB` | 取决于当前布局和焦点 |
| 透视视图 | Perspective View | `F1` | 默认布局 |
| 顶视图 | Top View | `F2` | 默认布局 |
| 右视图 | Right View | `F3` | 默认布局 |
| 前视图 | Front View | `F4` | 默认布局 |
| 四视图 / 全部视图 | All Views | `F5` |  |
| 打开当前视图配置 | Configure View | `Shift+V` |  |
| 打开全部视图配置 | Configure All Views | `Alt/Option+V` |  |
| 打开相似视图配置 | Configure Similar Views | `Shift+Alt/Option+V` |  |
| 撤销相机视图变化 | Undo View | `Ctrl/Cmd+Shift+Z` | 不撤销场景对象操作 |
| 恢复相机视图变化 | Redo / Restore View | `Ctrl/Cmd+Shift+Y` |  |
| 重绘视图 | Redraw | `A` |  |
| 显示 / 隐藏坐标轴 | Show / Hide Axis | `Alt/Option+D` |  |
| 从指针下重叠对象中选择 | Select Object Under Pointer | `Ctrl/Cmd+RMB` | 弹出指针下对象列表 |

---

# 四、视口显示模式

以下均为依次按键：先按 `N`，再按第二个键。

| 显示模式 | English | 快捷键 |
|---|---|---|
| Gouraud 着色 | Gouraud Shading | `N, A` |
| Gouraud 着色（线框） | Gouraud Shading (Lines) | `N, B` |
| 快速着色 | Quick Shading | `N, C` |
| 快速着色（线框） | Quick Shading (Lines) | `N, D` |
| 恒定着色 | Constant Shading | `N, E` |
| 隐藏线 | Hidden Lines | `N, F` |
| 线条 | Lines | `N, G` |
| 线框 | Wireframe | `N, H` |
| 等参线 | Isoparms | `N, I` |
| 包围盒 | Box | `N, K` |
| 骨架 | Skeleton | `N, L` |
| 显示标签 | Display Tags | `N, O` |
| 背面剔除 | Backface Culling | `N, P` |
| 纹理显示 | Textures | `N, Q` |
| X-Ray | X-Ray | `N, R` |
| 等参线编辑 | Isoline Editing | `Alt/Option+A` |

---

# 五、坐标、变换与建模模式

## 1. 变换工具

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 移动工具 | Move Tool | `E` |  |
| 旋转工具 | Rotate Tool | `R` | 时间线焦点下 `R` 可能是范围工具 |
| 缩放工具 | Scale Tool | `T` |  |
| 交互式移动对象 | Move Object | 按住 `4` + 拖动 | 热键操作 |
| 交互式缩放对象 | Scale Object | 按住 `5` + 拖动 | 热键操作 |
| 交互式旋转对象 | Rotate Object | 按住 `6` + 拖动 | 热键操作 |
| 移动父级且保持子级 | Move Parent | 按住 `7` + 拖动 | 常用于调整父级而不改变子级世界位置 |
| 切换当前工具 | Toggle Active Tool | `Space` |  |
| 最近两个工具切换 | Switch Last Two Tools | `Shift+Space` |  |
| 切换建模模式 | Switch Modeling Mode | `Enter` / `Return` | 点、边、面等模式循环 |
| 转为可编辑对象 | Make Editable | `C` | 参数对象转多边形 / 样条 |
| 撤销建模动作 | Undo Action | `Shift+Z` | 与普通 `Ctrl/Cmd+Z` 不同 |

## 2. 轴向、捕捉与工作平面

| 操作 | English | 快捷键 |
|---|---|---|
| 切换 X 轴 / Heading | X Axis / Heading | `X` |
| 切换 Y 轴 / Pitch | Y Axis / Pitch | `Y` |
| 切换 Z 轴 / Bank | Z Axis / Bank | `Z` |
| 切换坐标系统 | Change Coordinate System | `W` |
| 打开建模设置 | Modeling Settings | `Shift+M` |
| 开关捕捉 | Toggle Snapping | `Shift+S` |
| 开关量化 | Toggle Quantize | `Shift+Q` |
| 锁定 / 解锁工作平面 | Lock / Unlock Workplane | `Shift+X` |
| 全局开关对称 | Toggle Symmetry Globally | `Alt/Option+W` |

---

# 六、多边形建模工具

## 1. M 系列工具

以下组合通常是先按 `M`，再按第二个键。

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 创建点 | Create Point | `M, A` |  |
| 桥接 | Bridge | `B` 或 `M, B` |  |
| 笔刷 | Brush | `M, C` |  |
| 封闭多边形孔洞 | Close Polygon Hole | `M, D` |  |
| 创建多边形 | Create Polygon | `M, E` |  |
| 切割边 | Cut Edges | `M, F` |  |
| 平滑 / 熨平 | Smooth / Iron | `M, G` | 2026 官方英文为 Smoothing |
| 对称化 | Symmetrize | `M, H` | `M, Shift+H` 打开选项 |
| 磁铁 | Magnet | `M, I` |  |
| 平面切割 | Plane Cut | `K, J` 或 `M, J` |  |
| 线性切割 | Line Cut | `K, K` 或 `M, K` |  |
| 循环 / 路径切割 | Loop / Path Cut | `K, L` 或 `M, L` |  |
| 溶解 | Dissolve | `M, N` | 也可用 `Ctrl/Cmd+Backspace/Delete` |
| 滑动 | Slide | `M, O` |  |
| 缝合 | Stitch and Sew | `M, P` |  |
| 合并 | Merge / Weld | `M, Q` |  |
| 设置 SDS 权重 | Set SDS Weighting | `M, R` 或 `.` |  |
| 倒角 | Bevel | `M, S` |  |
| 挤压 | Extrude | `D` 或 `M, T` |  |
| 设置点值 | Set Point Value | `M, U` | 2026 官方当前值 |
| 旋转边 | Spin Edge | `M, V` |  |
| 内部挤压 / 内插 | Extrude Inner / Inset | `I` 或 `M, W` |  |
| 矩阵挤压 | Matrix Extrude | `M, X` |  |
| 平滑移位 | Smooth Shift | `M, Y` |  |
| 沿法线移动 | Move Along Normals | `M, -` | 符号键受键盘布局影响 |
| 沿法线缩放 | Scale Along Normals | `M, #` | 符号键受键盘布局影响 |
| 绕法线旋转 | Rotate Around Normals | `M, ,` | 逗号键 |
| 连接点 / 边 | Connect Points / Edges | `M, M` |  |

## 2. U 系列网格命令

| 操作 | English | 直接执行 | 打开选项 / 说明 |
|---|---|---|---|
| 优化 | Optimize | `U, O` | `U, Shift+O` |
| 分离到新对象 | Split | `U, P` | 旧英文资料常称 Split；2026 总表显示为 Disconnect |
| 反转法线 | Reverse Normals | `U, R` |  |
| 溶解 N-gon | Dissolve N-gons | `U, E` | 旧版常称 Remove N-gons |
| 细分 | Subdivide | `U, S` | `U, Shift+S` |
| 熔化 | Melt | `U, Z` | 也可用 `Alt/Option+Backspace/Delete` |
| 收缩 / 折叠 | Shrink / Collapse | `U, C` |  |
| N-gon 三角化 | N-Gon Triangulation | `U, T` |  |
| 断开 | Disconnect | `U, D` | `U, Shift+D` |
| 对齐法线 | Align Normals | `U, A` |  |
| 重新三角化 N-gon | Retriangulate N-Gons | `U, G` |  |
| 取消三角化 | Un-triangulate | `U, U` |  |
| 镜像选择 | Mirror Selection | `U, V` | `U, Shift+V` |

---

# 七、选择工具与选择命令

## 1. 选择工具

| 操作 | English | 快捷键 |
|---|---|---|
| 自由手选择 | Freehand Selection | `8` |
| 实时选择 | Live Selection | `9` |
| 矩形选择 | Rectangle Selection | `0` |
| 全选 | Select All | `Ctrl/Cmd+A` |
| 取消全选 | Deselect All | `Ctrl/Cmd+Shift+A` |
| 切换点 / 边 / 面模式 | Switch Modeling Mode | `Enter` / `Return` |

## 2. U 系列选择命令

| 操作 | English | 直接执行 | 打开选项 / 说明 |
|---|---|---|---|
| 选择连接 | Select Connected | `U, W` | 在节点编辑器中也可能用于选择连接节点 |
| 反选 | Invert Selection | `U, I` |  |
| 转换选择 | Convert Selection | `U, X` |  |
| 对称化选择 | Symmetrize Selection | `U, V` | `U, Shift+V`；与 Mirror Selection 名称依上下文而异 |
| 选择轮廓 | Outline Selection | `U, Q` |  |
| 填充选择 | Fill Selection | `U, F` |  |
| 扩大选择 | Grow / Enlarge Selection | `U, Y` | `U, Shift+Y` |
| 环状选择 | Ring Selection | `U, B` |  |
| 循环选择 | Loop Selection | `U, L` |  |
| 路径选择 | Path Selection | `U, M` |  |
| Phong 断开选择 | Phong Break Selection | `U, N` |  |
| 缩小选择 | Shrink Selection | `U, K` |  |
| 体积网格选择 | Volume Mesh | `U, H` | `U, Shift+H` |

## 3. 指针与层级选择技巧

| 操作 | 快捷键 / 操作 | 说明 |
|---|---|---|
| 从重叠对象列表中选择 | 视口中 `Ctrl/Cmd+RMB` | 显示指针下全部对象 |
| 选择对象及其子对象 | 对象管理器中 `MMB` 单击 | 选中整棵子层级 |
| 聚焦选中组件 | 视口中 `S` | 点、边、面 |
| 聚焦选中对象 | 视口中 `O` | 整个对象 |

---

# 八、对象管理器

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开对象管理器 | Object Manager | `Shift+F1` | `Shift+F1` |  |
| 合并对象 / 项目 | Merge Object | `Ctrl+Shift+O` | `Cmd+Shift+O` | 仅在对象管理器上下文中 |
| 滚动到第一个活动对象 | Scroll to First Active | `S` | `S` | 鼠标需位于对象管理器 |
| 显示搜索栏 | Show Search Bar | `Ctrl+F` | `Cmd+F` |  |
| 显示过滤器 | Show Filter | `Ctrl+U` | `Cmd+U` |  |
| 场景信息 | Scene Information | `Ctrl+I` | `Cmd+I` |  |
| 对象成组 | Group Objects | `Alt+G` | `Option+G` |  |
| 取消对象组 | Ungroup Objects | `Shift+G` | `Shift+G` |  |
| 开关父级生成器 | Toggle Parent Generator | `Q` | `Q` | 也可在视口焦点下使用 |
| 新建为选中对象的父级 | Create as Parent | 按住 `Alt` 创建对象 | 按住 `Option` 创建对象 |  |
| 新建为选中对象的子级 | Create as Child | 按住 `Shift` 创建对象 | 按住 `Shift` 创建对象 |  |
| 在相同层级创建多个对象 | Create at Same Hierarchy Level | 按住 `Ctrl` 创建对象 | 按住 `Cmd` 创建对象 | 具体行为与所用创建菜单有关 |
| 选择对象及其全部子级 | Select Object and Children | `MMB` 单击对象 | `MMB` 单击对象 |  |
| 在视口中开关生成器 | Toggle Generator Objects | `Q` | `Q` | 常用于细分曲面对比 |

---

# 九、材质管理器

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开材质管理器 | Material Manager | `Shift+F2` | `Shift+F2` |  |
| 加载材质 | Load Materials | `Ctrl+Shift+O` | `Cmd+Shift+O` | 局部快捷键 |
| 新建材质 | New Material | `Ctrl+N` 或双击空白处 | `Cmd+N` 或双击空白处 |  |
| 新建物理材质 | New Physical Material | `Ctrl+Shift+N` | `Cmd+Shift+N` |  |
| 新建节点材质 | New Node Material | `Ctrl+Alt+N` | `Cmd+Option+N` |  |
| 用另一材质替换 | Replace Material | `Alt` + 拖放 | `Option` + 拖放 | 将材质拖到目标材质上 |

---

# 十、节点编辑器

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开节点编辑器 | Node Editor | `Shift+Alt+F2` | `Shift+Option+F2` |  |
| 节点 Commander | Commander | `C` | `C` | 鼠标需位于节点编辑器 |
| 节点成组 | Group Nodes | `Alt+G` | `Option+G` |  |
| 取消节点组 | Ungroup Nodes | `Shift+G` | `Shift+G` |  |
| 排列全部节点 | Arrange All Nodes | `Shift+L` | `Shift+L` |  |
| 排列选中节点 | Arrange Selected Nodes | `L` | `L` |  |
| 选择后续节点 | Select Subsequent Nodes | `Shift+S` | `Shift+S` |  |
| 居中选中节点 | Center Selected | `Alt+S` | `Option+S` |  |
| 显示选中节点 | Show Selected | `S` | `S` |  |
| 显示全部节点 | Show All | `H` | `H` |  |
| 放大 / 缩小 | Zoom In / Out | `+` / `-` | `+` / `-` |  |
| 选择连接节点 | Select Connected Nodes | `U, W` | `U, W` |  |

---

# 十一、时间线与动画播放

## 1. 窗口、模式与记录

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开时间线 | Timeline | `Shift+F3` | `Shift+F3` |  |
| Dope Sheet / F-Curve 模式切换 | Dope Sheet / F-Curve Mode | `Tab` | `Tab` | 2026 官方当前值 |
| 记录活动对象 | Record Active Objects | `F9` | `F9` |  |
| 记录当前状态 | Record Current State | `Q` | `Q` |  |
| 开关自动关键帧 | Autokeying | `Ctrl+F9` | `Cmd+F9` |  |
| 搜索栏 | Show Search Bar | `Ctrl+F` | `Cmd+F` | 时间线局部命令 |
| 显示过滤器 | Show Filter | `Ctrl+U` | `Cmd+U` |  |
| 范围工具 | Range Tool | `R` | `R` |  |
| 波纹编辑 | Ripple Edit | `Alt+R` | `Option+R` |  |
| 自动模式 | Automatic Mode | `Alt+A` | `Option+A` |  |
| 交互式改变动画时间 | Interactive Animation Time | `J+LMB` 拖动 | `J+LMB` 拖动 | 可在编辑器中使用 |

## 2. 播放

| 操作 | English | 快捷键 |
|---|---|---|
| 向后播放 / 停止 | Play Backwards / Stop | `F6` |
| 停止 | Stop | `F7` |
| 向前播放 / 停止 | Play Forwards / Stop | `F8` |

## 3. 帧、关键帧与时间范围导航

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 跳到动画起点 | Go to Start | `Shift+F` | `Shift+F` |  |
| 上一个关键帧 | Go to Previous Key | `Ctrl+F` | `Cmd+F` |  |
| 上一帧 | Go to Previous Frame | `F` | `F` |  |
| 下一个关键帧 | Go to Next Key | `Ctrl+G` | `Cmd+G` |  |
| 下一帧 | Go to Next Frame | `G` | `G` |  |
| 跳到动画终点 | Go to End | `Shift+G` | `Shift+G` |  |
| 显示选中关键帧 / 轨道 | Show Selected | `S` | `S` |  |
| 显示全部 | Show All | `H` | `H` |  |
| 跳到当前帧 | Go to Current Frame | `O` | `O` |  |
| 显示时间线起点 | Frame Start | `Alt+F` | `Option+F` |  |
| 显示时间线终点 | Frame End | `Alt+G` | `Option+G` |  |
| 显示预览范围 | Show Preview Range | `Alt+H` | `Option+H` |  |

## 4. 标记导航

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 跳到第一个标记 | Jump to First Marker | `Ctrl+P` | `Cmd+P` |
| 跳到最后一个标记 | Jump to Last Marker | `Ctrl+O` | `Cmd+O` |
| 下一个标记 | Go to Next Marker | `Shift+N` | `Shift+N` |
| 上一个标记 | Go to Previous Marker | `Shift+P` | `Shift+P` |
| 第一个标记 | Go to First Marker | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| 最后一个标记 | Go to Last Marker | `Ctrl+Shift+O` | `Cmd+Shift+O` |
| 在时间线创建标记 | Create Marker in Timeline | `Ctrl+LMB` | `Cmd+LMB` |
| 在动画调板创建标记 | Marker in Animation Palette | `Ctrl+Shift+LMB` | `Cmd+Shift+LMB` |

> `Ctrl/Cmd+F` 在时间线中既可能是“上一个关键帧”，也可能是“显示搜索栏”，由鼠标位置和当前焦点决定。

---

# 十二、关键帧插值

每项通常有一个单键 / 组合键和一个 `T` 系列顺序键。鼠标焦点必须位于时间线或 F-Curve 区域。

| 插值 / 切线操作 | English | 快捷键 1 | 快捷键 2 |
|---|---|---|---|
| 自动切线 | Auto Tangents | `A` | `T, 1` |
| 断开切线 | Break Tangents | `B` | `T, 2` |
| 切线零角度 | Zero Angle | `0` | `T, 3` |
| 切线零长度 | Zero Length | `L` | `T, 4` |
| 钳制 | Clamp | `C` | `T, 5` |
| 线性 | Linear | `Alt/Option+L` | `T, 6` |
| 阶梯 | Step | `Alt/Option+T` | `T, 7` |
| 柔和 | Soft | `Alt/Option+S` | `T, 8` |
| Ease In | Ease In | `Alt/Option+I` | `T, I` |
| Ease Ease | Ease Ease | `Alt/Option+E` | `T, 9` |
| Ease Out | Ease Out | `Alt/Option+O` | `T, O` |

---

# 十三、属性管理器

| 操作 | English | 快捷键 / 操作 | 说明 |
|---|---|---|---|
| 打开新属性管理器 | New Attribute Manager | `Shift+F5` |  |
| 更快改变数值 | Change Values Faster | 拖动数值箭头时按 `Shift` | 步长变大 |
| 更慢 / 更精细改变数值 | Change Values Slower | 拖动数值箭头时按 `Alt/Option` | 步长变小 |
| 恢复参数默认值 | Set Parameter to Default | 在参数箭头上 `RMB` | 官方当前说明 |
| 删除参数上的动画轨道 / 关键帧 | Remove Keyframes / Track | `Ctrl/Cmd+Shift` + 单击动画圆点 | 不同参数类型下表现可能不同 |

---

# 十四、图片查看器

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 打开图片 | Open Image | `Ctrl+O` | `Cmd+O` |
| 图片另存为 | Save Image As | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| 全屏模式 | Full-Screen Mode | `Ctrl+F` | `Cmd+F` |
| 向前播放 | Play Forward | `Space` | `Space` |
| 设为 A | Define as A | `A` | `A` |
| 设为 B | Define as B | `B` | `B` |
| 交换 A / B | Swap A/B | `S` | `S` |
| 设置预览起点 | Set Preview Start | `I` | `I` |
| 设置预览终点 | Set Preview End | `O` | `O` |
| 放大 / 缩小 | Zoom In / Out | `+` / `-` | `+` / `-` |
| 自动缩放 | Auto-Zoom Mode | `H` | `H` |
| 100% 与适合窗口切换 | 100% / Fit Window | 双击图像 | 双击图像 |

---

# 十五、结构管理器

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 打开结构管理器 | Structure Manager | `Shift+F9` | `Shift+F9` |
| 添加 ASCII 文件 | Add ASCII File | `Ctrl+Shift+O` | `Cmd+Shift+O` |
| 跳到上一个选择 | Jump Previous Selection | `Shift+N` | `Shift+N` |
| 跳到下一个选择 | Jump Next Selection | `N` | `N` |
| 上一页 | Page Up | `PageUp` | `Fn+↑` 或 `PageUp` |
| 下一页 | Page Down | `PageDown` | `Fn+↓` 或 `PageDown` |
| 跳到末尾 | Jump to End | `End` | `End` 或 `Fn+→` |
| 跳到开头 | Jump to Start | `Home` / `Pos 1` | `Home` 或 `Fn+←` |
| 顶点贴图模式 | Vertex Map | `V` | `V` |
| 点模式 | Points | `P` | `P` |
| 多边形模式 | Polygons | `O` | `O` |
| UVW 模式 | UVW | `U` | `U` |

---

# 十六、资源浏览器

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开资源浏览器默认设置 | Browser Default Settings | `Ctrl+E` | `Cmd+E` | 鼠标焦点需位于 Asset Browser |
| 转到搜索栏 | Go to Search Bar | `Ctrl+F` | `Cmd+F` |  |

### 旧版资源浏览器常见局部键

以下按键见于旧版 Asset / Content Browser 资料，2026 中是否存在取决于布局与快捷键预设，应在本机验证：

| 位置 | 旧版快捷键 |
|---|---|
| Computer | `U` |
| Desktop | `D` |
| Home Directory | `H` |
| Presets | `P` |
| Catalogs | `C` |
| Recent Items | `R` |
| Search Results | `S` |
| Favorites | `F` |

---

# 十七、BodyPaint 3D 与 UV

## 1. 画笔

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 顺时针旋转画笔 | Rotate Brush Clockwise | `Alt+.` 或 `Alt+]` | `Option+.` 或 `Option+]` |
| 逆时针旋转画笔 | Rotate Brush Counterclockwise | `Alt+[` 或 `Alt+,` | `Option+[` 或 `Option+,` |
| 增大画笔尺寸 | Increase Brush Size | `,` 或 `[` | `,` 或 `[` |
| 减小画笔尺寸 | Reduce Brush Size | `.` 或 `]` | `.` 或 `]` |
| 增大画笔硬度 | Increase Brush Hardness | `Shift+.` 或 `Shift+]` | `Shift+.` 或 `Shift+]` |
| 减小画笔硬度 | Reduce Brush Hardness | `Shift+,` 或 `Shift+[` | `Shift+,` 或 `Shift+[` |
| 增大画笔不透明度 | Increase Brush Opacity | `Ctrl+.` 或 `Ctrl+]` | `Cmd+.` 或 `Cmd+]` |
| 减小画笔不透明度 | Reduce Brush Opacity | `Ctrl+,` 或 `Ctrl+[` | `Cmd+,` 或 `Cmd+[` |

## 2. UV 与纹理视图

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 非均匀缩放 | Non-Uniform Scale | `Shift+T` | `Shift+T` |
| UV 变换 | UV Transform | `Ctrl+T` | `Cmd+T` |
| 纹理视图显示全部 | Texture View: Show All | `H` | `H` |
| UV 编辑器聚焦选中元素 | Frame Selected UV Elements | `S` | `S` |

> UV 编辑器中的移动、旋转、缩放与大多数选择工具沿用普通 3D 视口和建模快捷键。

---

# 十八、运动跟踪

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 移动素材 | Move Footage | `Alt+MMB` | `Option+MMB` |
| 缩放素材 | Scale Footage | `Alt+RMB` | `Option+RMB` |
| 素材全屏 | Footage Full-Screen | `H` | `H` |
| 创建用户轨道 | Create User Track | `Ctrl+LMB` | `Cmd+LMB` |
| 轨道移动 1 像素 | Move Track by 1 Pixel | 方向键 | 方向键 |
| 显示选中 | Show Selected | `S` | `S` |
| 临时放大镜 | Magnifying Glass | 按住 `Alt` | 按住 `Option` |

---

# 十九、脚本管理器

| 操作 | English | Windows | macOS |
|---|---|---|---|
| 打开脚本管理器 | Script Manager | `Shift+F10` | `Shift+F10` |
| 新建脚本 | New Script | `Ctrl+N` | `Cmd+N` |
| 打开脚本 | Open Script | `Ctrl+O` | `Cmd+O` |
| 保存脚本 | Save Script | `Ctrl+S` | `Cmd+S` |
| 脚本另存为 | Save Script As | `Ctrl+Shift+S` | `Cmd+Shift+S` |

---

# 二十、渲染

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 渲染活动视口 | Render Viewport | `Ctrl+R` | `Cmd+R` |  |
| 渲染到图片查看器 | Render in Picture Viewer | `Shift+R` | `Shift+R` |  |
| 交互渲染到图片查看器 | Render to Picture Viewer (Interactive / TR) | `Ctrl+Shift+R` | `Cmd+Shift+R` | 官方缩写随渲染器 / 版本显示不同 |
| 交互式渲染区域 | Interactive Render Region | `Alt+R` | `Option+R` |  |
| 创建预览 | Make / Create Preview | `Alt+B` | `Option+B` |  |
| 打开渲染设置 | Render Settings / Presets | `Ctrl+B` | `Cmd+B` |  |

---

# 二十一、Redshift RenderView

以下为 Redshift RenderView 自身的默认局部快捷键，鼠标焦点必须位于 RenderView。它们可在 Redshift 的 Customize > Controls 中修改。

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 打开快照栏 | Snapshots | `S` | `S` |  |
| 打开设置页 | Settings | `O` | `O` |  |
| 开关区域渲染 | Region | `R` | `R` |  |
| 适配全部画面 | Frame All | `F` | `F` |  |
| 适配当前区域 | Frame Region | `Ctrl+F` | `Cmd+F` |  |
| 常规渲染模式 | Regular | `Ctrl+R` | `Cmd+R` |  |
| Clay 模式 | Clay | `Ctrl+L` | `Cmd+L` |  |
| Samples 可视化 | Samples | `Ctrl+M` | `Cmd+M` |  |
| 缩放至 100% | Zoom 100% | `Ctrl+1` | `Cmd+1` |  |
| 重置缩放 | Zoom Reset | `Ctrl+9` | `Cmd+9` | 官方说明为重置到 100% |
| 水平翻转 | Flip Horizontal | `H` | `H` |  |
| 垂直翻转 | Flip Vertical | `V` | `V` |  |
| 复制帧缓冲 | Copy Frame Buffer | `Ctrl+C` | `Cmd+C` |  |
| 创建快照 | Take Snapshot | `=` | `=` |  |

---

# 二十二、Redshift Shader Graph

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 复制节点 | Duplicate Node(s) | `Ctrl` + 单击并拖动 | `Cmd` + 单击并拖动 | Redshift 官方 Shader Graph 文档 |
| 快速调整节点大小 | Resize Node | `Ctrl` + 双击节点 | `Cmd` + 双击节点 | 具体结果取决于当前节点状态 |
| 搜索 / 创建节点 | Search / Create Node | 使用节点树搜索 | 使用节点树搜索 | Shader Graph 与 C4D Node Editor 的 `C` Commander 不完全相同 |
| 拖入纹理并创建节点 | Create Texture Node | 从文件管理器拖入图像 | 从 Finder 拖入图像 |  |

> Redshift Shader Graph、C4D Node Editor 和旧版 XPresso 是不同的节点环境；同一按键不一定通用。

---

# 二十三、雕刻

| 操作 | English | Windows | macOS | 说明 |
|---|---|---|---|---|
| 所有画笔临时平滑 | Smooth with All Brushes | 按住 `Shift` | 按住 `Shift` |  |
| 反转画笔效果 | Invert Brush Effect | 按住 `Ctrl` | 按住 `Cmd` |  |
| 切换 X / Y / Z 对称 | Switch Symmetry Mode | `Alt+X` / `Alt+Y` / `Alt+Z` | `Option+X` / `Option+Y` / `Option+Z` |  |
| 开关线框 | Toggle Wireframe | `W` | `W` | 雕刻上下文 |
| 显示 / 隐藏模板 | Show / Hide Stencil | `Q` | `Q` |  |
| 移动 / 缩放 / 旋转模板 | Move / Scale / Rotate Stencil | `T` + `LMB` / `RMB` / `MMB` | 同 Windows | 三种鼠标键对应不同变换 |
| 调整画笔大小 | Brush Size | `MMB` + 水平拖动 | `MMB` + 水平拖动 | 通用于多数雕刻画笔 |
| 调整硬度 / 不透明度 | Brush Hardness / Opacity | `MMB` + 垂直拖动 | `MMB` + 垂直拖动 |  |

---

# 二十四、自定义快捷键、冲突与完整绑定查看

## 1. 打开 Command Manager

按 `Shift+F12` 打开 Command Manager（某些界面语言中称 Customize Commands）。

Command Manager 会列出：

- C4D 自带的全部命令；
- 已安装插件提供的命令；
- 标签与导出格式命令；
- 当前命令已经分配的全部快捷键；
- 命令属于全局还是某个管理器的局部命令；
- 命令 ID、类别、类型和帮助信息。

## 2. 查看本机“真正完整”的快捷键

1. 打开 `Window > Customization > Customize Commands`，或按 `Shift+F12`。
2. 清空命令名称搜索框。
3. 在快捷键过滤框中输入按键，可查找占用该组合的命令。
4. 点击列标题按快捷键排序，可连续检查全部已绑定命令。
5. 选择命令后，下方列表会显示它的全部绑定及作用范围。
6. 对插件或自定义布局，应以这里显示的结果为最终依据。

> C4D 的“所有命令”远多于“默认有快捷键的命令”。没有默认绑定的命令不属于快捷键表，但可以自行绑定。

## 3. 新建或修改快捷键

1. 在 Command Manager 中搜索目标命令。
2. 点击快捷键输入框。
3. 按下希望分配的组合键。
4. 设置 `Restriction to`，决定它是全局命令还是仅在某个管理器中生效。
5. 需要每次先显示参数窗口时，启用 `Option Mode`。
6. 点击 `Assign` 覆盖当前绑定，或点击 `Add` 保留旧绑定并增加一个新绑定。

## 4. 创建多级顺序快捷键

C4D 支持两个或更多依次按下的键，例如 `M, S`。自定义时：

1. 在快捷键输入框中快速依次按下多个键。
2. Command Manager 会用 `~` 表示层级，例如 `M~S`。
3. 点击 `Assign` 或 `Add` 保存。

## 5. 全局与局部冲突

- 全局命令可在整个 C4D 中生效。
- 局部命令只在鼠标位于指定管理器或窗口时生效。
- 相同按键同时存在全局和局部绑定时，当前管理器的局部命令优先。
- 这就是 `S`、`H`、`Ctrl/Cmd+F`、`Ctrl/Cmd+N` 等组合在不同区域作用不同的原因。
- 快捷键完全失效时，先确认 `Preferences > Interface > Keyboard Shortcuts` 已启用。

## 6. 保存、迁移与备份

- 自定义快捷键集合保存在用户首选项目录的 `prefs/shortcuts` 文件夹。
- Windows 常见路径形式：`Users\用户名\AppData\Roaming\Maxon\C4D版本\prefs\shortcuts`。
- 快捷键预设通常为 `.res` 文件。
- 在 Command Manager 的预设菜单中可 Duplicate、Load、Rename 或切换快捷键集。
- 升级大版本前建议复制整套自定义预设；旧版本预设可以加载，但新增、删除或改名的命令可能需要手动修复。

---

# 版本差异与易错项

## 1. 2026 官方值与旧教程常见差异

| 功能 | 2026 官方当前值 | 旧资料中常见写法 | 建议 |
|---|---|---|---|
| Dope Sheet / F-Curve 切换 | `Tab` | `Space` | 以 `Tab` 为准 |
| Soft 切线 | `Alt/Option+S` 或 `T, 8` | `Alt+5` | 以 2026 官方值为准 |
| Ease In | `Alt/Option+I` 或 `T, I` | `Alt+1` | 以 2026 官方值为准 |
| 沿法线移动 | `M, -` | `M, Z` | 以 2026 官方值为准 |
| 设置点值 | `M, U` | `M, L` | 以 2026 官方值为准 |
| 切割工具 | `K, K` / `K, J` / `K, L` | 旧 Knife 单键 `K` | 使用当前细分后的切割工具 |
| Script Manager | `Shift+F10` | `Shift+F11` | 以本机 2026 Command Manager 为准 |
| Asset Browser | 当前总表未列固定打开键 | `Shift+F8` | 旧布局中可能仍有绑定 |
| 最后一个标记 | `Ctrl/Cmd+O`、`Ctrl/Cmd+Shift+O` | 有资料误写数字 `0` | 字母 `O` |

## 2. 符号键问题

- `M, #`、`M, ,`、`Alt/Option+.`、`[`、`]` 等以美式键盘为基准。
- 中文输入法通常不影响字母键，但全角标点或非美式布局可能使符号键失效。
- 可临时切换到 ABC / U.S. 输入源，或在 Command Manager 中重新绑定更顺手的按键。

## 3. 功能键问题

- MacBook 常需按 `Fn+F1` 才能向应用发送标准 `F1`。
- Windows 笔记本也可能需要 `Fn` 或开启 Fn Lock。
- 若 `F1–F12` 控制亮度、音量而非 C4D，请检查系统键盘设置。

## 4. 不能简单合并成单一“绝对完整表”的原因

- C4D 允许每个管理器拥有独立快捷键。
- 不同版本会新增、删除或重命名命令。
- 插件会加入自己的命令和默认绑定。
- 用户可为同一命令分配多个快捷键，也可覆盖默认预设。
- 因此本文是 Cinema 4D 2026 官方公开默认快捷键的完整中文整理；本机安装环境的最终全集必须以 Command Manager 为准。

---

# 资料来源

## Maxon 官方资料

1. [Cinema 4D 2026 — Keyboard Shortcuts](https://help.maxon.net/c4d/en-us/Content/html/Shortcuts.html)  
   本文主体来源，包含动画、BodyPaint、管理器、文件、视口、建模、选择、渲染与雕刻等默认快捷键。

2. [Cinema 4D — The Command Manager](https://help.maxon.net/c4d/en-us/Content/html/5224.html)  
   用于核对全局 / 局部快捷键、顺序快捷键、Option Mode、自定义预设、保存路径和冲突规则。

3. [Cinema 4D — Camera Navigation](https://help.maxon.net/c4d/en-us/Content/html/PREFSNAVIGATION-PREF_NAVIGATION_MAIN_GROUP.html)  
   用于核对 `1 / 2 / 3` 相机热键、Shift 加速、Ctrl/Cmd 精细移动和相机枢轴。

4. [Redshift — Render View: Shortcuts & Navigation](https://help.maxon.net/c4d/en-us/Content/_REDSHIFT_/html/Render%2BView.html)  
   用于核对 Redshift RenderView 的默认局部快捷键。

5. [Redshift — Cinema 4D Shader Graph](https://help.maxon.net/c4d/en-us/Content/_REDSHIFT_/html/Cinema%2B4D%2BShaderGraph.html)  
   用于核对 Shader Graph 中复制、拖动和节点编辑操作。

6. [Cinema 4D 2026.3.1 — June 24, 2026 Release Notes](https://support.maxon.net/hc/en-us/articles/8658038724124-Cinema-4D-2026-3-1-June-24-2026)  
   用于确认整理时的当前 2026 版本基准。

## 交叉核对资料

7. [School of Motion — Cinema 4D Shortcut Keys](https://schoolofmotion.com/blog/cinema-4d-shortcut-keys)  
   用于交叉核对通用命令、管理器、视口、建模和旧版差异；出现冲突时以 2026 Maxon 官方帮助为准。

8. [School of Motion — 15 Must-Know Shortcut Keys in Cinema 4D](https://schoolofmotion.com/blog/15-must-know-shortcut-keys-in-cinema-4d)  
   用于核对对象层级、指针下重叠对象选择、相机焦距及属性动画等高频实际操作。

---

## 快速结论

- 日常建模优先记：`E / R / T`、`C`、`D`、`I`、`M, S`、`K, K`、`K, L`、`U, O`、`U, S`。
- 日常选择优先记：`8 / 9 / 0`、`U, L`、`U, B`、`U, W`、`Ctrl/Cmd+A`、`Ctrl/Cmd+Shift+A`。
- 日常视图优先记：`1 / 2 / 3` + 拖动、`S / O / H`、`F1–F5`、`Alt/Option+D`。
- 查不到功能时直接按 `Shift+C` 使用 Commander。
- 想确认本机真实绑定时按 `Shift+F12` 打开 Command Manager。
