# Sketch 快捷键大全（macOS 应用与 Web App）

> 整理日期：2026-07-25  
> 适用范围：当前版 Sketch macOS 应用、Sketch Web App  
> 资料基准：Sketch 官方文档；macOS 快捷键页更新于 2026-06-22，Web App 快捷键页更新于 2026-07-15。

## 使用说明

- Sketch 的原生设计应用仅支持 macOS，因此桌面端快捷键以 Mac 键盘为准。
- Web App 支持 macOS、Windows 和 Linux；Windows/Linux 通常以 `Ctrl` 替代 `⌘ Command`。
- 官方列表以美式英文键盘布局为基准。其他键盘布局下，macOS 可能自动调整符号键快捷键；如组合键无效，请以 Sketch 菜单中显示的当前快捷键为准。
- 很多快捷键依赖当前上下文。同一组合键在画布、文本编辑、组件浏览、评论或原型预览中可能执行不同操作。
- 安装插件、修改 macOS“App 快捷键”或更改 Sketch 设置后，默认快捷键可能被覆盖。

## 按键符号

| 符号 | 按键 |
|---|---|
| `⌘` | Command |
| `⌥` | Option / Alt |
| `⌃` | Control |
| `⇧` | Shift |
| `fn` | Function |
| `⏎` / `↵` | Return / Enter |
| `⌫` | Delete / Backspace |
| `⇥` | Tab |
| `Esc` / `⎋` | Escape |
| `Space` | 空格键 |
| Secondary-click | 右键或双指点按 |

---

# 一、Sketch macOS 应用快捷键

## 1. 通用与应用

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 打开命令栏 | Open Command Bar | `S` 或 `⌘ K` | 可在 Settings > General 中修改 `⌘ K` |
| 打开设置 | Open Settings | `⌘ ,` | Sketch 全局设置 |
| 打开文档设置 | Open Document Settings | `⇧ ⌘ ,` | 当前文档设置 |
| 打开原型预览窗口 | Open Prototype Preview | `⌘ P` | 与组件替换场景中的 `⌘ P` 含义不同 |
| 运行脚本 | Run Script | `⌃ ⇧ K` | 运行脚本命令 |
| 运行上一个插件 | Run Last Plugin | `⌃ ⇧ R` | 重复执行最近一次插件 |
| 以安全模式启动 | Open in Safe Mode | 启动时按住 `⇧` | 暂时禁用插件 |

## 2. 文档、标签页与页面

| 操作 | English | 快捷键 | 说明 |
|---|---|---|---|
| 新建文档 | New Document | `⌘ N` |  |
| 打开 Workspace 文档 | Open Workspace Document | `⌘ O` | 如果 Open & Save 设为 Your Mac，会与下一项互换 |
| 打开本地文档 | Open Local Document | `⇧ ⌘ O` | 受 Open & Save 设置影响 |
| 关闭文档 | Close Document | `⌘ W` |  |
| 下一个标签页 | Show Next Tab | `⌃ ⇥` |  |
| 上一个标签页 | Show Previous Tab | `⌃ ⇧ ⇥` |  |
| 保存新文档或本地文档 | Save | `⌘ S` | Workspace 文档通常自动保存 |
| 为 Workspace 文档创建版本 | Create Version | `⌃ ⌘ S` | 创建可回溯版本 |
| 描述字段中换行 | Line Break in Description | `⌥ ⏎` | 避免直接提交 |
| 复制当前文档 | Duplicate Current Document | `⇧ ⌘ S` | 关闭 Auto Save 后，菜单行为可能变为 Save As |
| 另存为 | Save As | `⌥ ⇧ ⌘ S` |  |
| 新建页面 | New Page | `⇧ ⌘ N` |  |
| 上一页 / 下一页 | Previous / Next Page | `fn ↑` / `fn ↓` |  |
| 复制页面或顶层 Frame 链接 | Copy Link to Page or Frame | `⇧ ⌘ C` | 单选一个顶层 Frame 时复制其链接，否则复制当前页面链接 |

## 3. 界面视图

| 操作 | English | 快捷键 |
|---|---|---|
| 切换到画布视图 | Switch to Canvas View | `⌃ 1` |
| 切换到组件视图 | Switch to Components View | `⌃ 2` |
| 显示 / 隐藏界面 | Toggle Interface | `⌘ .` |
| 进入 / 退出全屏 | Toggle Full Screen | `⌃ ⌘ F` |

## 4. 画布缩放与导航

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 放大 | Zoom In | `⌘ +` |
| 缩小 | Zoom Out | `⌘ -` |
| 缩放到 100% | Zoom to 100% | `⌘ 0` |
| 适合画布中的全部图层 | Zoom to Fit All Layers | `⌘ 1` |
| 适合当前选区 | Zoom to Fit Selection | `⌘ 2` |
| 将选区置于画布中央 | Center Selection | `⌘ 3` |
| 适合顶层 Frame | Zoom to Fit Top-level Frame | `⌘ 4` |
| 临时缩小至 100% | Temporarily Zoom Out to 100% | 按住 `~`；部分键盘为 `§` |
| 平移画布 | Pan Canvas | 按住 `Space` 拖动 |
| 使用鼠标中键平移 | Pan with Middle Mouse Button | 按住鼠标中键拖动 |
| 临时隐藏选区高亮、控制柄、网格和参考线 | Hide Selection Highlights, Handles, Grids and Guides | 空闲时按住 `Space` |
| 显示 / 隐藏小地图 | Show/Hide Minimap | `⌃ M` |
| 显示 / 隐藏标尺 | Show/Hide Rulers | `⌃ R` |
| 缩放时显示 / 隐藏像素 | Show/Hide Pixels on Zoom | `⌃ P` |
| 显示 / 隐藏像素网格 | Show/Hide Pixel Grid | `⌃ X` |
| 显示 / 隐藏网格 | Show/Hide Grid | `⌃ G` |
| 打开网格设置 | Grid Settings | `⌃ ⌘ G` |
| 显示 / 隐藏布局网格 | Show/Hide Layout Grid | `⌃ L` |
| 打开布局网格设置 | Layout Grid Settings | `⌃ ⌘ L` |

## 5. 评论

| 操作 | English | 快捷键 |
|---|---|---|
| 插入评论 | Insert Comment | `N` |
| 提交评论 | Submit Comment | `⌘ ⏎` |
| 显示 / 隐藏评论 | Show/Hide Comments | `⌃ N` |
| 显示 / 隐藏已解决评论 | Show/Hide Resolved Comments | `⌃ ⇧ N` |

## 6. 插入工具

| 插入内容 | English | 快捷键 |
|---|---|---|
| Frame | Frame | `F` |
| Graphic | Graphic | `G` |
| 矩形 | Rectangle | `R` |
| 椭圆 | Oval | `O` |
| 直线 | Line | `L` |
| 矢量路径 | Vector | `V` |
| 铅笔 | Pencil | `P` |
| 文本 | Text | `T` |
| 切片 | Slice | `E` |
| 交互 | Interaction | `I` |
| Symbol | Symbol | `Y` |
| 文本样式 | Text Style | `⌃ T` |

### 绘制时的辅助键

| 操作 | 快捷键 / 操作 |
|---|---|
| 从中心向外绘制 | 绘制时按住 `⌥` |
| 以正方形比例绘制 | 绘制时按住 `⇧` |
| 放置前移动正在绘制的图层 | `Space` + 拖动 |
| 从中心绘制正圆 / 正方形 | 绘制时同时按住 `⌥ ⇧` |

## 7. 图层选择与层级深入

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 框选工具 | Marquee | `X` |
| 深入当前容器 | Dive Deeper into Container | `⏎` |
| 选择父级容器 | Select Parent Container | `Esc` |
| 选择根 Symbol | Select Root Symbol | `⇧ Esc` |
| 清除选区 | Clear Selection | `⌃ Esc` |
| 选择全部非隐藏、非锁定图层 | Select All Except Hidden/Locked | `⌘ A` |
| 选择全部图层，包括隐藏和锁定图层 | Select All Including Hidden/Locked | `⌃ ⌘ A` |
| 选择全部顶层 Frame 和 Graphic | Select All Top-level Frames and Graphics | `⇧ ⌘ A` |
| 查找图层 | Find Layer | `⌥ ⌘ F` |
| 在图层列表中显示当前选区 | Reveal Selection in Layer List | `⇧ ⌘ J` |
| 选择容器中的下一个 / 上一个图层 | Select Next / Previous Layer | `⇥` / `⇧ ⇥` |
| 选择上一个 / 下一个顶层 Frame | Previous / Next Top-level Frame | `fn ←` / `fn →` |
| 打开“选择图层”菜单 | Open Select Layer Menu | `⇧` + 右键 |

### 点击选择修饰键

| 操作 | 快捷键 / 操作 |
|---|---|
| 穿透容器，直接选择内部图层 | `⌘` + 点击 |
| 添加或移除选区中的图层 | `⇧` + 点击 |
| 组合穿透选择与增减选区 | `⇧ ⌘` + 点击 |

### 框选修饰键

| 操作 | 快捷键 / 操作 |
|---|---|
| 穿透容器框选内部图层 | 框选时按住 `⌘` |
| 添加或移除框选范围内的图层 | 框选时按住 `⇧` |
| 只选择完全位于框选范围内的图层 | 框选时按住 `⌥` |
| 组合穿透框选与增减选区 | 框选时按住 `⇧ ⌘` |
| 组合“完全包含”与增减选区 | 框选时按住 `⇧ ⌥` |

## 8. 基础编辑

| 操作 | English | 快捷键 |
|---|---|---|
| 撤销 | Undo | `⌘ Z` |
| 重做 | Redo | `⇧ ⌘ Z` |
| 剪切 | Cut | `⌘ X` |
| 复制 | Copy | `⌘ C` |
| 粘贴 | Paste | `⌘ V` |
| 粘贴到选区上方 | Paste Over Selection | `⇧ ⌘ V` |
| 粘贴并替换选区 | Paste and Replace Selection | `⇧ ⌘ R` |
| 复制图层 | Duplicate | `⌘ D` |
| 在后方复制 | Duplicate Behind | `⇧ ⌘ D` |
| 重命名图层 | Rename Layer(s) | `⌘ R` |
| 删除图层 | Delete Layer | `⌫` |
| 编辑 Frame、组、Graphic、Symbol、文本、图像或矢量 | Edit Selected Layer | `⌘ ⏎` |
| 替换模板、图层、Symbol 或样式 | Replace Template, Layer, Symbol or Style | `⌥ ⌘ R` |
| 隐藏 / 显示图层 | Hide/Show Layer | `⇧ ⌘ H` |
| 锁定 / 解锁图层 | Lock/Unlock Layer | `⇧ ⌘ L` |
| 旋转 | Rotate | `⌃ ⌘ R` |
| 旋转时吸附到 15° 增量 | Snap Rotation to 15° | 旋转时按住 `⇧` |
| 水平翻转 | Flip Horizontally | `⇧ H` |
| 垂直翻转 | Flip Vertically | `⇧ V` |
| 用作蒙版 | Use as Mask | `⌃ ⌘ M` |
| 刷新数据 | Refresh Data | `⌃ ⇧ D` |

## 9. 样式与颜色

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 复制属性 | Copy Properties | `⌥ ⌘ C` |
| 粘贴样式 | Paste Style | `⌥ ⌘ V` |
| 粘贴样式但不包含圆角 | Paste Style Without Corners | `⌃ ⌥ ⌘ V` |
| 更新共享样式 | Update Shared Style | `⌃ S` |
| 重置共享样式 | Reset Shared Style | `⌃ ⌥ S` |
| 开启 / 关闭填充 | Toggle Fills | `⇧ F` |
| 开启 / 关闭边框 | Toggle Borders | `⇧ B` |
| 交换填充与边框 | Swap Fills and Borders | `⇧ X` |
| 吸取颜色 | Pick Color | `⌃ C` |
| 用吸管选择 Color Variable | Pick Color Variable | 使用吸管时 `⇧` + 点击 |
| 修改不透明度 | Change Opacity | `0`–`9` |

### 不透明度数字规则

| 数字 | 不透明度 |
|---|---|
| `1`–`9` | 10%–90% |
| `0` | 100% |

### 渐变色标编辑

| 操作 | 快捷键 |
|---|---|
| 将色标放到 0%–100% 对应位置 | `0`–`9` |
| 将色标放在相邻两个色标正中间 | `=` |

> “粘贴样式但不包含圆角”的实际行为受 Settings 中 Include Corners 设置影响。关闭该设置后，菜单命令会相应反转。

## 10. 导出

| 操作 | English | 快捷键 |
|---|---|---|
| 标记为可导出 / 导出选区 | Mark as Exportable / Export Selection | `⌘ E` |
| 导出全部资源 | Export All Assets | `⇧ ⌘ E` |

## 11. 移动与缩放

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 移动时不改变父级 | Move Without Reparenting | 移动时按住 `Space` |
| 沿 X 或 Y 轴移动 | Move Along X or Y Axis | 移动时按住 `⇧` |
| 移动时关闭吸附 | Move Without Snapping | 移动时按住 `⌃` |
| 移动 1 px | Move by 1 px | `←` `→` `↑` `↓` |
| 移动 10 px | Move by 10 px | `⇧` + 方向键 |
| 鼠标不位于图层上也可移动选区 | Move Selection from Anywhere | 按住 `⌥ ⌘` 并拖动 |
| 拖动复制 | Duplicate While Moving | 移动时按住 `⌥` |
| 保持宽高比缩放 | Resize Maintaining Aspect Ratio | 缩放时按住 `⇧` |
| 从中心缩放 | Resize from Center | 缩放时按住 `⌥` |
| 缩放时关闭吸附 | Resize Without Snapping | 缩放时按住 `⌃` |
| 尺寸增减 1 px | Resize by 1 px | `⌘` + 方向键 |
| 尺寸增减 10 px | Resize by 10 px | `⇧ ⌘` + 方向键 |
| 让选区尺寸适应内容 | Resize Selection to Fit Contents | `⇧ ⌘ F` 或双击边缘 |
| 让 Stack 中的图层填满父级 | Fill Parent in Stack | `⌥` + 双击边缘 |
| 调整容器但不调整内部内容 | Resize Container Without Contents | 缩放时按住 `⌘` |
| 容器尺寸增减 1 px，不调整内容 | Resize Container by 1 px | `⌘ ⌥` + 方向键 |
| 容器尺寸增减 10 px，不调整内容 | Resize Container by 10 px | `⇧ ⌘ ⌥` + 方向键 |
| 按比例缩放图层 | Scale Layer | `K` |
| 将图层位置 / 尺寸取整到像素 | Round Layer to Pixel | `⇧ ⌘ P` |
| 适应像素边界 | Fit Layers to Pixel Bounds | `⌃ ⌘ X` |

> 1 px 和 10 px 是默认微移量，可在 Settings > Canvas > Nudging 中修改。  
> 使用 `⌥` 拖动复制时，还可组合 `Space`、`⇧`、`⌃` 控制父级、方向和吸附。

## 12. 组织与图层顺序

| 操作 | English | 快捷键 |
|---|---|---|
| 用 Frame 编组 | Group in a Frame | `⌘ F` |
| 用 Group 编组 | Group in a Group | `⌘ G` |
| 取消容器编组 | Ungroup Container | `⇧ ⌘ G` |
| 上移一层 | Bring Forward | `⌘ ]` |
| 移到最前 | Bring to Front | `⌥ ⌘ ]` |
| 下移一层 | Send Backward | `⌘ [` |
| 移到最后 | Send to Back | `⌥ ⌘ [` |
| 向上移出父级容器 | Move Up, Out of Parent | `⌥ ⇧ ⌘ ↑` |

## 13. 对齐、约束与 Stack Layout

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 左对齐 | Align Left | `⌃ ⌘ ←` |
| 右对齐 | Align Right | `⌃ ⌘ →` |
| 顶部对齐 | Align Top | `⌃ ⌘ ↑` |
| 底部对齐 | Align Bottom | `⌃ ⌘ ↓` |
| 水平居中 | Align Horizontally | `⌃ ⌘ H` |
| 垂直居中 | Align Vertically | `⌃ ⌘ V` |
| 相对于顶层 Frame 对齐 | Align to Top-level Frame | `⌥` + 点击对齐按钮 |
| 自动固定约束 | Auto-pin | `⇧ A` |
| 自动固定容器的所有子层 | Auto-pin All Children | `⌥ ⇧ A` |
| 添加 Stack Layout | Add Stack Layout | `⌘ L` 或 `⇧ S` |
| 移除 Stack Layout | Remove Stack Layout | `⌥ ⌘ L` 或 `⌥ ⇧ S` |
| 在 Stack 中调整图层顺序 | Reorder Layer in Stack | 方向键 |
| 将图层移到 Stack 开头 / 结尾 | Move Layer to Start/End of Stack | `⇧` + 方向键 |
| 忽略 Stack Layout | Ignore Stack Layout | `⇧ ⌘ I`；或拖入 Stack 时按住 `⌘` |
| 测量与另一图层的距离 | Measure Distance to Layer | `⌥` + 悬停目标图层 |
| 测量到文本基线 / 大写字高线的距离 | Measure to Text Baseline/Cap | `⌃ ⌥` + 悬停文本图层 |

## 14. 形状与布尔运算

| 操作 | English | 快捷键 |
|---|---|---|
| 变换形状 | Transform Shape | `⌃ ⌘ T` |
| 合并形状路径 | Add Shapes | `⌥ ⌘ A` |
| 联集 | Union | `⌥ ⌘ U` |
| 减去顶层 | Subtract | `⌥ ⌘ S` |
| 交集 | Intersect | `⌥ ⌘ I` |
| 差集 | Difference | `⌥ ⌘ X` |

## 15. 矢量编辑

以下操作需先进入矢量编辑模式。可双击矢量图层，或选中图层后按 `⏎` / `⌘ ⏎`。

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 选择下一个 / 上一个锚点 | Select Next / Previous Point | `⇥` / `⇧ ⇥` |
| 显示所有控制柄 | Show All Handle Control Points | 按住 `⌥` |
| 设为直角点 | Set Point to Straight | `1` |
| 设为角度与长度镜像点 | Mirror Angle and Length | `2` |
| 设为独立控制点 | Independent | `3` |
| 设为仅角度镜像点 | Mirror Angle | `4` |
| 在直角点与角度、长度镜像点间切换 | Toggle Straight / Mirror Angle and Length | 双击锚点 |
| 将镜像控制点改为独立控制 | Change to Independent | `⌘` + 拖动控制柄 |
| 沿 X 或 Y 轴移动锚点 | Move Point Along X or Y Axis | 拖动时按住 `⇧` |
| 移动锚点时关闭吸附 | Move Point Without Snapping | 官方快捷键页列为拖动时按住 `⇧`，见下方说明 |
| 新建锚点时关闭吸附 | Place Point Without Snapping | `⌃` + 点击 |
| 以 45° 角新增锚点 | Place Point at 45° Angle | `⇧` + 点击 |
| 在现有两点中间新增锚点 | Place Point Between Existing Points | `⇧` + 点击路径段 |
| 弯曲路径段 | Curve Path Segment | `⌘` + 点击并拖动路径段 |
| 不进行像素吸附 | No Pixel Snapping | `⌥ 1` |
| 吸附到整数像素 | Snap to Full Pixels | `⌥ 2` |
| 吸附到半像素 | Snap to Half Pixels | `⌥ 3` |
| 吸附到四分之一像素 | Snap to Quarter Pixels | `⌥ 4` |
| 打开 / 闭合路径 | Open / Close Path | `⌥ ⌘ O` |
| 删除锚点或控制柄 | Delete Point / Handle | `⌫` |
| 选择当前路径全部锚点 | Select All Points | `⌘ A` |

> 官方“Mac app shortcuts”页同时把“沿 X/Y 轴移动锚点”和“移动锚点时关闭吸附”列为 `⇧` + 拖动。由于这可能是当前版本的复合行为，也可能是文档中的重复标注，本文保留官方写法；若实际操作不符，请以当前 Sketch 版本的菜单和画布反馈为准。新增锚点时关闭吸附的官方组合明确为 `⌃` + 点击。

## 16. 文本编辑与格式

| 操作 | English | 快捷键 |
|---|---|---|
| 粘贴为富文本 | Paste as Rich Text | `⌥ ⇧ ⌘ V` |
| 更换字体 | Change Typeface | `⌘ T` |
| 加粗 | Bold | `⌘ B` |
| 斜体 | Italic | `⌘ I` |
| 下划线 | Underline | `⌘ U` |
| 增大字号 | Increase Font Size | `⌥ ⌘ +` |
| 减小字号 | Decrease Font Size | `⌥ ⌘ -` |
| 增大字符间距 | Loosen Character Spacing | `⌃ ⌥ L` |
| 减小字符间距 | Tighten Character Spacing | `⌃ ⌥ T` |
| 左对齐 | Align Left | `⇧ ⌘ {` |
| 居中对齐 | Align Center | `⇧ ⌘ \|` |
| 右对齐 | Align Right | `⇧ ⌘ }` |
| 转换为轮廓 | Convert to Outlines | `⌥ ⌘ O` |

## 17. 组件

| 操作 | English | 快捷键 |
|---|---|---|
| 插入 Symbol | Insert Symbol | `Y` |
| 插入文本样式 | Insert Text Style | `⌃ T` |
| 替换 Symbol、样式或模板 | Replace Symbol, Style or Template | `⌥ ⌘ R` |
| 创建 Symbol | Create Symbol | `⌘ Y` |
| 与 Symbol 分离 | Detach from Symbol | `⇧ ⌘ Y` |
| 将 Symbol 中的全部内容分离 | Detach All Contents | `⌥ ⇧ ⌘ Y` |
| 前往 Symbol Source | Go to Symbol Source | `⌘ ⏎` |

## 18. 组件视图

仅在 Components View 中使用：

| 操作 | English | 快捷键 |
|---|---|---|
| 查找组件 | Find Component | `⌥ ⌘ F` |
| 显示 Symbols | Symbols | `⌘ 1` |
| 显示 Text Styles | Text Styles | `⌘ 2` |
| 显示 Layer Styles | Layer Styles | `⌘ 3` |
| 显示 Color Variables | Color Variables | `⌘ 4` |
| 显示 Frame Templates | Frame Templates | `⌘ 5` |
| 显示 Graphic Templates | Graphic Templates | `⌘ 6` |

> Sketch 的快捷键汇总页把 `⌘ 5` 的分类重复写成了 Color Variables；官方 Components View 专页明确列为 Frame Templates，本文按组件专页修正。

## 19. 使用命令栏 / 弹窗浏览组件

| 操作 | English | 快捷键 |
|---|---|---|
| 选择组件 | Select Component | `←` `→` `↑` `↓` |
| 确认组件 | Choose Component | `⏎` |
| 打开筛选菜单 | Open Filter Menu | `⌘ F`，仅命令栏 |
| 在当前位置打开筛选菜单 | Open Filter at Current Location | `⌘ ↓`，仅命令栏 |
| 返回父级分组 | Go to Parent Group | `⌘ ↑` |
| 前往当前 Library | Go to Current Library | `⌥ ⌘ ↑` |
| 前往全部组件 | Go to All Components | `⌃ ⌥ ⌘ ↑` |
| 替换 Symbol 时保留当前尺寸 | Preserve Current Symbol Dimensions | `⌘ P` |
| 替换时隐藏嵌套组件 | Hide Nested Component | `⇧ ⌘ H` |

## 20. Inspector 数值字段

### 数学运算符

适用于 Inspector 中的数值字段，可直接输入表达式。

| 操作 | 运算符 | 示例 |
|---|---|---|
| 加法 | `+` | `100+16` |
| 减法 | `-` | `100-16` |
| 乘法 | `*` | `24*3` |
| 除法 | `/` | `320/2` |
| 分组运算 | `()` | `(200+16)/2` |

### 数值微调

| 操作 | 快捷键 / 操作 |
|---|---|
| 增加 / 减少 1 | `↑` / `↓` |
| 增加 / 减少 10 | `⇧ ↑` / `⇧ ↓` |
| 增加 / 减少 0.1 | `⌥ ↑` / `⌥ ↓` |
| 拖动字段标签，按 1 调整 | 拖动标签 |
| 拖动字段标签，按 10 调整 | `⇧` + 拖动标签 |
| 拖动字段标签，按 0.1 调整 | `⌥` + 拖动标签 |

### Width / Height 字段后缀

在数值后输入后缀，例如 `80r`。

| 作用 | 后缀 |
|---|---|
| 从左侧调整宽度 | `l` |
| 从右侧调整宽度 | `r` |
| 从顶部调整高度 | `t` |
| 从底部调整高度 | `b` |
| 从中心调整宽度 / 高度 | `c` 或 `m` |
| 设置为父容器尺寸的百分比 | `%` |

### 字段变量与常用计算

Sketch 的尺寸字段还可使用 `w`、`h`、`x`、`y` 代表当前图层的宽、高、X、Y 值。例如，在 Height 中输入 `w` 可快速把矩形变为正方形。

### Export Size 字段后缀

| 作用 | 输入示例 |
|---|---|
| 倍率导出 | `2x`、`3x` |
| 指定导出宽度 | `512w` |
| 指定导出高度 | `512h` |

---

# 二、Sketch Web App 快捷键

> 在 Windows 和 Linux 上，下列快捷键中的 `⌘` 通常替换为 `Ctrl`。

## 1. 通用

| 操作 | English | macOS | Windows / Linux |
|---|---|---|---|
| 打开命令栏 | Open Command Bar | `⌘ K` | `Ctrl K` |

## 2. 文档列表

| 操作 | English | 快捷键 |
|---|---|---|
| 显示 / 隐藏搜索 | Toggle Search | `/` |
| 切换为网格视图 | Switch to Grid View | `[` |
| 切换为列表视图 | Switch to List View | `]` |

## 3. Inbox 通知详情

以下快捷键仅在 Inbox 的通知详情面板打开时有效。

| 操作 | English | 快捷键 |
|---|---|---|
| 固定 / 取消固定 | Pin / Unpin | `P` |
| 前往文档 | Go to Document | `O` |
| 下载 | Download | `D` |
| 接受邀请 | Accept Invite | `A` |
| 取消关注 | Unfollow | `U` |

## 4. Web 画布

| 操作 | English | 快捷键 / 操作 |
|---|---|---|
| 放大，美式键盘 | Zoom In, US Keyboard | `+` |
| 放大，非美式键盘 | Zoom In, Non-US Keyboard | `=` |
| 缩小 | Zoom Out | `-` |
| 画布缩放到 100% | Show Canvas at 100% | `⇧ 0` |
| 让全部内容适合浏览器窗口 | Fit All Contents in Viewport | `⇧ 1` |
| 打开上下文菜单 | Show Contextual Menu | 右键 / Secondary-click |
| Frame View 中切换 Frame | Navigate Frames | `←` / `→` |
| 显示 / 隐藏文档详情面板 | Document Details Panel | `D` |
| 显示 / 隐藏版本面板 | Versions Panel | `V` |
| 显示 / 隐藏 Inspector | Inspector Panel | `I` |
| 显示 / 隐藏评论面板 | Comments Panel | `C` |
| 显示 / 隐藏网格 | Show/Hide Grid | `⇧ G` |
| 显示 / 隐藏布局 | Show/Hide Layout | `⇧ L` |
| 新增评论 | Add Comment | `N` |
| 显示 / 隐藏评论 | Show/Hide Comments | `⇧ N` |
| 提交评论 | Submit Comment | macOS：`⌘ ⏎`；Windows/Linux：`Ctrl ⏎` |
| 复制链接 | Copy Link | macOS：`⇧ ⌘ C`；Windows/Linux：`⇧ Ctrl C` |

## 5. Web 原型播放器

仅在 Web App 中播放原型时有效。

| 操作 | English | 快捷键 |
|---|---|---|
| 重新开始原型 | Restart Prototype | `R` |
| 返回 / 前进到已访问 Frame | Back / Forward | `←` / `→` |
| 让原型适合浏览器窗口 | Fit Prototype in Viewport | `⇧ 0` |
| 让原型填满浏览器宽度 | Fill Browser Width | `⇧ 1` |
| 按实际尺寸显示 | Actual Size | `Z` |
| 新增评论 | Add Comment | `N` |

---

# 三、常见上下文冲突

同一快捷键在不同模式中可以有不同含义，这不是冲突，而是 Sketch 的上下文设计。

| 快捷键 | 画布 / 通用 | 其他上下文 |
|---|---|---|
| `⌘ P` | 打开原型预览 | 替换 Symbol 时保留原尺寸 |
| `⌘ ⏎` | 编辑选中容器或图层 | 评论中提交；Symbol 上前往 Source |
| `⌘ F` | 将选区放入 Frame | 命令栏中打开组件筛选 |
| `⌘ T` | 文本编辑时更换字体 | `T` 是插入文本工具 |
| `⌃ T` | 插入 Text Style | `⌃ ⌘ T` 是变换形状 |
| `0`–`9` | 修改图层不透明度 | 编辑渐变色标时修改色标位置 |
| 方向键 | 移动图层 | Stack 中排序；组件浏览；Web Frame 导航 |
| `⇧ ⌘ H` | 显示 / 隐藏图层 | 替换组件时隐藏嵌套组件 |
| `S` | 打开命令栏 | 文本输入状态下会正常输入字母 |

---

# 四、旧版快捷键兼容提醒

网络上仍有大量旧版 Sketch 速查表，常见差异包括：

| 功能 | 当前版本 | 旧资料中常见写法 |
|---|---|---|
| 打开命令栏 | `S` 或 `⌘ K` | 仅 `S` |
| 按比例缩放图层 | `K` | `⌘ K` |
| 插入 Frame | `F` | 旧版 Artboard 常见为 `A` |
| 插入交互 | `I` | 旧资料可能把 Hotspot 写作 `H` |
| 矩形圆角 | 在 Inspector 设置 | 旧资料可能列 `U` 为 Rounded Rectangle |
| Stack Layout | `⌘ L` / `⇧ S` | 旧版无当前 Stack Layout 体系 |
| 组件分类 | 增加 Frame / Graphic Templates | 旧版组件视图分类较少 |

因此，本文不混入已过时的旧版绑定。若你使用的是老版本 Sketch，应以该版本菜单栏显示的快捷键为准。

---

# 五、最常用快捷键速查

| 场景 | 操作 | 快捷键 |
|---|---|---|
| 命令 | 打开命令栏 | `S` / `⌘ K` |
| 插入 | Frame / Graphic | `F` / `G` |
| 插入 | 矩形 / 椭圆 / 直线 | `R` / `O` / `L` |
| 插入 | 矢量 / 文本 | `V` / `T` |
| 选择 | 穿透选择内部图层 | `⌘` + 点击 |
| 选择 | 查找图层 | `⌥ ⌘ F` |
| 编辑 | 复制图层 | `⌘ D` |
| 编辑 | 重命名 | `⌘ R` |
| 编辑 | 隐藏 / 锁定 | `⇧ ⌘ H` / `⇧ ⌘ L` |
| 样式 | 复制属性 / 粘贴样式 | `⌥ ⌘ C` / `⌥ ⌘ V` |
| 画布 | 100% / 全部 / 选区 | `⌘ 0` / `⌘ 1` / `⌘ 2` |
| 画布 | 平移 | `Space` + 拖动 |
| 移动 | 1 px / 10 px | 方向键 / `⇧` + 方向键 |
| 缩放 | 尺寸增减 1 px / 10 px | `⌘` + 方向键 / `⇧ ⌘` + 方向键 |
| 测量 | 查看图层间距 | `⌥` + 悬停 |
| 编组 | Frame / Group | `⌘ F` / `⌘ G` |
| 层级 | 前移 / 后移 | `⌘ ]` / `⌘ [` |
| 布局 | 添加 / 移除 Stack Layout | `⌘ L` / `⌥ ⌘ L` |
| 组件 | 插入 / 创建 Symbol | `Y` / `⌘ Y` |
| 导出 | 导出选区 / 全部资源 | `⌘ E` / `⇧ ⌘ E` |

---

# 六、自定义快捷键

Sketch 支持通过 macOS 为菜单命令新增或修改快捷键：

1. 打开 **系统设置（System Settings）**。
2. 进入 **键盘 > 键盘快捷键 > App 快捷键**。
3. 点击 `+`，应用选择 Sketch。
4. 输入与 Sketch 菜单完全一致的命令名称。
5. 录入希望使用的组合键并保存。

通常只需填写菜单项名称，例如 `Auto Link to Right Frame`。如果多个菜单中存在同名命令，可写完整路径：

```text
Prototype->Interaction->Auto Link to Right Frame
```

如果 Sketch 更新后自定义快捷键失效：

1. 在 Sketch 的 Help 菜单中搜索目标命令；
2. 确认菜单项名称是否已变化；
3. 回到 macOS 的 App 快捷键设置，使用新名称更新绑定。

---

# 七、资料来源

以下均为 Sketch 官方资料：

1. [Mac app shortcuts](https://www.sketch.com/docs/shortcuts/mac/) — macOS 应用完整快捷键
2. [Web app shortcuts](https://www.sketch.com/docs/shortcuts/web/) — Web App 完整快捷键
3. [Shortcuts](https://www.sketch.com/docs/shortcuts/) — 官方快捷键文档入口
4. [The Command Bar](https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-command-bar/) — 命令栏与组件浏览快捷键
5. [The Components View](https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-components-view/) — 组件视图分类快捷键
6. [Vector editing](https://www.sketch.com/docs/designing/vector-editing/) — 矢量绘制与锚点操作
7. [Text](https://www.sketch.com/docs/designing/text/) — 文本创建、编辑与富文本粘贴
8. [Selecting layers](https://www.sketch.com/docs/designing/layer-basics/selecting-layers/) — 图层点击、框选和穿透选择
9. [Resizing and rotating layers](https://www.sketch.com/docs/designing/layer-basics/resizing-and-rotating-layers/) — 尺寸调整、字段运算与像素微调
10. [Importing & exporting](https://www.sketch.com/docs/designing/importing-and-exporting/) — 导出操作
11. [The best keyboard shortcuts to get started with Sketch](https://www.sketch.com/blog/the-best-keyboard-shortcuts-to-get-started-with-sketch/) — 官方旧版速查文章，仅用于识别版本差异

---

## 更新建议

Sketch 会随着界面、Frame、Stack Layout、Components 和原型功能迭代而调整快捷键。建议在下列情况重新核对官方快捷键页：

- Sketch 大版本升级后；
- 旧快捷键突然无效；
- 菜单名称发生变化；
- 安装新插件后出现冲突；
- 从旧版 Artboard / Smart Layout 工作流迁移到新版 Frame / Stack Layout。

