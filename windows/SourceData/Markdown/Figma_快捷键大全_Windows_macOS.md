# Figma 快捷键大全（Windows / macOS）

> 版本基准：2026 年 7 月 25 日  
> 适用范围：Figma Design、Dev Mode、原型演示、FigJam；附 Figma Sites / Slides 常用入口  
> 键盘基准：US QWERTY / Figma「Generic」布局

---

## 目录

1. 使用说明与按键符号
2. 查看快捷键、操作菜单与键盘布局
3. 全局编辑与文件操作
4. 工具快捷键
5. 画布、缩放与页面导航
6. 界面、侧栏与显示模式
7. 选择、深层选择与层级导航
8. 移动、微调、缩放与旋转
9. 图层顺序、对齐、分布与整理
10. Frame、Section、Slice 与容器
11. Auto Layout 自动布局
12. 复制、粘贴、替换与属性复用
13. 填充、描边、透明度与外观
14. 矢量编辑、路径与节点
15. 布尔运算、蒙版与扁平化
16. 文字编辑与排版
17. 组件、实例、变体与资源库
18. 变量与样式管理
19. 原型设计与演示模式
20. 评论、协作与插件
21. Dev Mode 与标注
22. 无障碍键盘操作
23. FigJam 快捷键
24. Figma Slides、Sites 与其他产品
25. 浏览器 / 桌面客户端冲突
26. 当前版与旧版快捷键差异
27. 无默认快捷键的常用命令
28. 高频快捷键速查
29. 官方来源与核对说明

---

## 1. 使用说明与按键符号

### 1.1 符号对照

| 符号 | 名称 | Windows 对应 |
|---|---|---|
| `⌘` | Command | 通常对应 `Ctrl` |
| `⌥` | Option | `Alt` |
| `⌃` | Control | `Ctrl`，但不一定与 Windows 映射相同 |
| `⇧` | Shift | `Shift` |
| `↩` | Return | `Enter` |
| `⌫` | Delete / Backspace | `Backspace` |
| `⌦` | Forward Delete | `Delete` |
| `Space` | 空格键 | `Space` |
| `Click` | 单击 | 单击 |
| `Drag` | 拖动 | 拖动 |

### 1.2 阅读规则

- `⌘ + K` 表示同时按下两个键。
- `1`、`5`、`0` 等数字键用于透明度时，请使用主键盘数字区；是否支持小键盘取决于系统和浏览器。
- “拖动时按住”表示先开始拖动，再按住修饰键，或按住修饰键后拖动。
- 同一快捷键会因当前上下文改变作用，例如：
  - 未编辑文字时，`⌘/Ctrl + K` 打开操作菜单。
  - 编辑文字并选中文字时，`⌘/Ctrl + K` 可添加链接。
  - 原型演示中，`F` 是全屏，而设计画布中 `F` 是 Frame 工具。
- Figma 会持续更新产品。若本文与本机不一致，以应用内快捷键面板为最终准则。

---

## 2. 查看快捷键、操作菜单与键盘布局

### 2.1 快捷键与命令入口

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 打开快捷键面板 | `⌃ + ⇧ + ?` | `Ctrl + Shift + ?` | 官方当前入口 |
| 打开 Figma Design 操作菜单 | `⌘ + K` | `Ctrl + K` | 搜索命令、资源、插件与 AI 功能 |
| 打开 Quick actions | `⌘ + /` | `Ctrl + /` | FigJam 常用；Design 中可能作为兼容入口 |
| 打开 Quick actions 备用组合 | `⌘ + P` | `Ctrl + P` | FigJam 官方列出的备用入口 |
| 关闭菜单、对话框或当前工具 | `Esc` | `Esc` | 多次按下可逐层退出 |
| 执行选中的命令 | `Return` | `Enter` | 操作菜单、下拉菜单通用 |

### 2.2 修改键盘布局

进入：

```text
Help and resources
→ Keyboard shortcuts
→ Layout
```

Figma 默认按照 US QWERTY 键盘映射。官方支持多种语言键盘布局；非美式键盘上的 `/`、`\`、`[`、`]`、`<`、`>`、`'` 等键可能被重新映射。建议：

1. 中文输入法状态下无法触发单键工具时，先切换到英文输入法。
2. 若团队需要统一文档或 KeyFloat 配置，统一选择 `Generic`。
3. 不要只按键帽字符推测快捷键，直接查看 Layout 标签下的图示。

---

## 3. 全局编辑与文件操作

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 撤销 | `⌘ + Z` | `Ctrl + Z` | 适用于设计、FigJam、评论等多数场景 |
| 重做 | `⌘ + ⇧ + Z` | `Ctrl + Shift + Z` | Figma 默认 |
| 复制 | `⌘ + C` | `Ctrl + C` | 按当前选择上下文 |
| 剪切 | `⌘ + X` | `Ctrl + X` | 可用于移动组件、样式等 |
| 粘贴 | `⌘ + V` | `Ctrl + V` | 支持多选 Frame 的 Multi-paste |
| 删除 | `Delete` / `⌫` | `Delete` / `Backspace` | 删除图层、节点或表格行列 |
| 全选 | `⌘ + A` | `Ctrl + A` | 作用范围取决于当前层级和编辑状态 |
| 反向选择 | `⌘ + ⇧ + A` | `Ctrl + Shift + A` | 画布对象选择 |
| 取消选择 | `Esc` | `Esc` | 文字编辑中可能先退出文字编辑 |
| 复制页面链接 | `⌘ + L` | `Ctrl + L` | 桌面客户端更可靠；浏览器会与地址栏冲突 |
| 导出选择 | `⌘ + ⇧ + E` | `Ctrl + Shift + E` | 打开 Export 对话框 |
| 打开操作菜单 | `⌘ + K` | `Ctrl + K` | 搜索没有默认快捷键的功能 |
| 打开 Figma Agent 画布提示框 | `⌘ + Enter` | `Ctrl + Enter` | 需要账号、席位或功能权限 |

> Figma 自动保存云端文件，因此没有传统的 `⌘/Ctrl + S` 日常保存流程。

---

## 4. 工具快捷键

### 4.1 Figma Design 基础工具

| 工具 / 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Move / Select 移动选择工具 | `V` | `V` | 返回默认选择工具 |
| Frame 画框工具 | `F` 或 `A` | `F` 或 `A` | `A` 为官方支持的备用键 |
| Section 分区工具 | `⇧ + S` | `Shift + S` | 组织画布与开发状态 |
| Slice 切片工具 | `S` | `S` | 为导出创建 Slice |
| Scale 缩放工具 | `K` | `K` | 同时缩放对象与属性 |
| Pen 钢笔工具 | `P` | `P` | 创建矢量网络 |
| Pencil 铅笔工具 | `⇧ + P` | `Shift + P` | 自由绘制路径 |
| Text 文字工具 | `T` | `T` | 单击为自动宽度，拖动为固定尺寸 |
| Rectangle 矩形工具 | `R` | `R` | 按住 Shift 绘制正方形 |
| Ellipse 椭圆工具 | `O` | `O` | 按住 Shift 绘制圆形 |
| Line 直线工具 | `L` | `L` | 按住 Shift 约束角度 |
| Arrow 箭头工具 | `⇧ + L` | `Shift + L` | Figma Design 中创建箭头 |
| Hand 抓手工具 | `H` | `H` | 也可临时按住 Space |
| Comment 评论工具 | `C` | `C` | 添加或查看评论 |
| Eyedropper 吸管工具 | `I` | `I` | 选择颜色 |
| Place image / video 放置媒体 | `⌘ + ⇧ + K` | `Ctrl + Shift + K` | 图片、GIF、视频等 |
| Resources 资源面板 | `⇧ + I` | `Shift + I` | 组件、插件、组件库等 |
| Annotation 标注工具 | `⇧ + T` | `Shift + T` | Design / Dev Mode 标注 |
| 进入 Dev Mode | `⇧ + D` | `Shift + D` | 再按一次返回 Design |
| 切换 Design / Prototype | `⇧ + E` | `Shift + E` | 进入或退出原型编辑 |

### 4.2 绘制时的通用修饰键

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 绘制正方形、圆或等比例多边形 | 拖动时按 `⇧` | 拖动时按 `Shift` | 约束比例 |
| 从中心绘制 / 缩放 | 拖动时按 `⌥` | 拖动时按 `Alt` | 中心点不变 |
| 从中心等比例绘制 | 拖动时按 `⌥ + ⇧` | 拖动时按 `Alt + Shift` | 两种约束叠加 |
| 绘制时移动尚未完成的对象 | 拖动时按住 `Space` | 拖动时按住 `Space` | 不松开鼠标 |
| 直线、矢量段约束角度 | 绘制时按 `⇧` | 绘制时按 `Shift` | 常用于 45° 增量 |
| 退出当前绘制工具 | `Esc` | `Esc` | 某些工具按两次退出编辑状态 |
| 完成 / 关闭当前编辑状态 | `Return` | `Enter` | 依工具上下文生效 |

---

## 5. 画布、缩放与页面导航

### 5.1 缩放与平移

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 临时平移画布 | `Space + Drag` | `Space + Drag` | 不必切换 Hand 工具 |
| Hand 工具 | `H` | `H` | 持续平移 |
| 放大 | `+` 或 `⌘ + +` | `+` 或 `Ctrl + +` | 某些布局需同时按 Shift |
| 缩小 | `-` 或 `⌘ + -` | `-` 或 `Ctrl + -` | |
| 100% 显示 | `⇧ + 0` | `Shift + 0` | 1:1 像素 |
| 适合窗口 | `⇧ + 1` | `Shift + 1` | 查看全部内容 |
| 缩放到选择 | `⇧ + 2` | `Shift + 2` | 居中当前选择 |
| 上一个 Frame | `⇧ + N` | `Shift + N` | 按画布顺序 |
| 下一个 Frame | `N` | `N` | 按画布顺序 |
| 上一个页面 | `Page Up` | `Page Up` | 键盘无此键时使用系统组合 |
| 下一个页面 | `Page Down` | `Page Down` | |
| 定位上一个 Frame | `Home` | `Home` | 部分键盘需 `Fn + ←` |
| 定位下一个 Frame | `End` | `End` | 部分键盘需 `Fn + →` |
| 无选择时平移画布 | `Arrow` | `Arrow` | 官方无障碍键盘操作 |
| 无选择时快速平移 | `⇧ + Arrow` | `Shift + Arrow` | 距离随缩放比例变化 |

### 5.2 滚轮与触控板

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 触控板平移 | 双指滑动 | 双指滑动 | 系统触控板 |
| 捏合缩放 | 双指捏合 | 支持的触控板双指捏合 | |
| 鼠标滚轮垂直平移 | 滚轮 | 滚轮 | |
| 鼠标滚轮水平平移 | `⇧ + 滚轮` | `Shift + 滚轮` | 设备支持情况不同 |
| 鼠标滚轮缩放 | `⌘ + 滚轮` | `Ctrl + 滚轮` | 浏览器缩放设置可能影响 |

---

## 6. 界面、侧栏与显示模式

### 6.1 面板与界面

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 显示 / 隐藏全部 UI | `⌘ + \` | `Ctrl + \` | 专注画布 |
| 最小化 / 恢复 UI 面板 | `⌘ + ⇧ + \` | `Ctrl + Shift + \` | 当前新版界面 |
| File / Layers 标签 | `⌥ + 1` | `Alt + 1` | 新版左侧导航 |
| Assets 标签 | `⌥ + 2` | `Alt + 2` | 本地与库组件 |
| Libraries 对话框 | `⌥ + 3` | `Alt + 3` | 已启用 / 可添加的库 |
| Design 面板 | `⌥ + 8` | `Alt + 8` | 部分旧版或特定界面保留 |
| Prototype 面板 | `⌥ + 9` | `Alt + 9` | 部分旧版或特定界面保留 |
| Inspect 面板 | `⌥ + 0` | `Alt + 0` | 旧 Inspect 界面；新版优先 Dev Mode |

### 6.2 画布显示

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 显示 / 隐藏 Rulers 标尺 | `⇧ + R` | `Shift + R` | |
| 显示 / 隐藏 Layout guides / grids | `⇧ + G` | `Shift + G` | 仅对有布局网格的 Frame 显示 |
| 显示 / 隐藏 Pixel grid | `⇧ + '` | `Shift + '` | 受键盘布局影响 |
| 开关 Snap to pixel grid | `⌘ + ⇧ + '` | `Ctrl + Shift + '` | 受键盘布局影响 |
| 显示 / 隐藏多人光标 | `⌥ + ⌘ + \` | `Alt + Ctrl + \` | Multiplayer cursors |
| 显示 / 隐藏图层轮廓 | `⌘ + ⇧ + O` | `Ctrl + Shift + O` | 当前默认组合 |
| Pixel preview 像素预览 | 在 Actions 搜索 | 在 Actions 搜索 | 旧组合因布局和版本差异较大 |
| 打开快捷键面板 | `⌃ + ⇧ + ?` | `Ctrl + Shift + ?` | 可继续在画布上操作 |

---

## 7. 选择、深层选择与层级导航

### 7.1 基础选择

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 全选当前范围 | `⌘ + A` | `Ctrl + A` | 可能是当前容器或当前页面 |
| 反向选择 | `⌘ + ⇧ + A` | `Ctrl + Shift + A` | |
| 取消选择 | `Esc` | `Esc` | |
| 添加 / 移除某个对象 | `⇧ + Click` | `Shift + Click` | 对已选对象再点一次可移除 |
| 框选对象 | `Drag` | `Drag` | 从空白画布开始 |
| 深层框选嵌套对象 | `⌘ + Drag` | `Ctrl + Drag` | 忽略父容器层级 |
| 深层选择指针下对象 | `⌘ + Click` | `Ctrl + Click` | 直接选择嵌套层 |
| 打开 Select layer 菜单 | `⌘ + Right-click` | `Ctrl + Right-click` | 列出光标下所有层 |
| 选中子层 | `Return` | `Enter` | 可连续深入 |
| 选中父层 | `⇧ + Return` | `Shift + Enter` | 向上一级 |
| 下一个同级层 | `Tab` | `Tab` | |
| 上一个同级层 | `⇧ + Tab` | `Shift + Tab` | |

### 7.2 图层面板多选

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 选择连续范围 | `⇧ + Click` | `Shift + Click` | 从首层到末层 |
| 选择非连续图层 | `⌘ + Click` | `Ctrl + Click` | |
| 展开 / 折叠当前层 | `→` / `←` | `→` / `←` | 焦点在图层面板时 |
| 移到相邻图层 | `↑` / `↓` | `↑` / `↓` | 焦点在图层面板时 |
| 重命名选择 | `⌘ + R` | `Ctrl + R` | 支持批量重命名 |

### 7.3 分组与容器

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Group selection 编组 | `⌘ + G` | `Ctrl + G` | |
| Ungroup selection 取消编组 | `⌘ + ⇧ + G` | `Ctrl + Shift + G` | |
| Frame selection 为选择创建 Frame | `⌥ + ⌘ + G` | `Alt + Ctrl + G` | 与 Group 行为不同 |
| 显示 / 隐藏选择 | `⌘ + ⇧ + H` | `Ctrl + Shift + H` | |
| 锁定 / 解锁选择 | `⌘ + ⇧ + L` | `Ctrl + Shift + L` | |

---

## 8. 移动、微调、缩放与旋转

### 8.1 移动与复制

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 微移 1 个 nudge 单位 | `Arrow` | `Arrow` | 默认通常为 1 px，可在偏好中调整 |
| 大步微移 | `⇧ + Arrow` | `Shift + Arrow` | 默认通常为 10 px |
| 约束水平 / 垂直拖动 | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 拖动复制 | `⌥ + Drag` | `Alt + Drag` | |
| 重复上一次复制变换 | `⌘ + D` | `Ctrl + D` | 继续相同距离、旋转等变化 |
| 显示与其他对象的距离 | 指向时按 `⌥` | 指向时按 `Alt` | 选择对象后使用 |
| 测量到深层嵌套对象 | `⌘ + ⌥` | `Ctrl + Alt` | 指向目标对象时 |

### 8.2 调整尺寸

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 用键盘调整宽 / 高 | `⌘ + Arrow` | `Ctrl + Arrow` | 依方向改变 1 个 nudge |
| 大幅调整宽 / 高 | `⌘ + ⇧ + Arrow` | `Ctrl + Shift + Arrow` | 依方向改变大 nudge |
| 从中心缩放 | 拖动时按 `⌥` | 拖动时按 `Alt` | |
| 保持比例缩放 | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 从中心等比例缩放 | 拖动时按 `⌥ + ⇧` | 拖动时按 `Alt + Shift` | |
| 缩放时移动对象 | 拖动时按 `Space` | 拖动时按 `Space` | |
| 忽略 Frame constraints | 拖动时按 `⌘` | 拖动时按 `Ctrl` | Frame 场景 |
| Scale 工具 | `K` | `K` | 同时缩放描边、圆角、效果等 |

### 8.3 旋转与翻转

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 拖动旋转 | 光标靠近角点外侧拖动 | 同左 | |
| 约束旋转角度 | 旋转时按 `⇧` | 旋转时按 `Shift` | 以固定角度增量旋转 |
| 显示 / 移动旋转原点 | `⌥ + R` | `Alt + R` | 选择对象后使用 |
| 水平翻转 | `⇧ + H` | `Shift + H` | |
| 垂直翻转 | `⇧ + V` | `Shift + V` | |

### 8.4 数值输入框

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 增加 / 减少 1 | `↑` / `↓` | `↑` / `↓` | 焦点位于数值字段 |
| 增加 / 减少 10 | `⇧ + ↑` / `⇧ + ↓` | `Shift + ↑` / `Shift + ↓` | |
| 输入数学表达式 | 直接输入 `+ - * /` | 同左 | 例如 `100/2`、`24+8` |
| 输入百分比 | 数值后输入 `%` | 同左 | 仅支持百分比的字段 |

---

## 9. 图层顺序、对齐、分布与整理

### 9.1 图层顺序

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 前移一层 Bring forward | `⌘ + ]` | `Ctrl + ]` | 当前官方组合 |
| 后移一层 Send backward | `⌘ + [` | `Ctrl + [` | |
| 置于顶层 Bring to front | `⌘ + ⌥ + ]` | `Ctrl + Shift + ]` | macOS / Windows 修饰键不同 |
| 置于底层 Send to back | `⌘ + ⌥ + [` | `Ctrl + Shift + [` | macOS / Windows 修饰键不同 |

### 9.2 对齐

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 左对齐 | `⌥ + A` | `Alt + A` | |
| 右对齐 | `⌥ + D` | `Alt + D` | |
| 顶部对齐 | `⌥ + W` | `Alt + W` | |
| 底部对齐 | `⌥ + S` | `Alt + S` | |
| 水平中心对齐 | `⌥ + H` | `Alt + H` | |
| 垂直中心对齐 | `⌥ + V` | `Alt + V` | |

### 9.3 分布与整理

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 水平分布间距 | `⌃ + ⌥ + H` | `Ctrl + Alt + H` | 多选对象 |
| 垂直分布间距 | `⌃ + ⌥ + V` | `Ctrl + Alt + V` | 多选对象 |
| Tidy up 整理 | `⌃ + ⌥ + T` | `Ctrl + Alt + T` | 通常需选择至少 3 个对象 |
| 调整 Tidy up 间距 | 拖动粉色间距手柄 | 同左 | 按 Shift 使用大 nudge |
| 交换 Tidy up 中的对象位置 | 拖动对象 | 同左 | 保持整体间距 |

---

## 10. Frame、Section、Slice 与容器

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Frame 工具 | `F` 或 `A` | `F` 或 `A` | |
| 将选择包进 Frame | `⌥ + ⌘ + G` | `Alt + Ctrl + G` | Frame selection |
| Section 工具 | `⇧ + S` | `Shift + S` | |
| Slice 工具 | `S` | `S` | |
| 选择 Frame 子层 | `Return` | `Enter` | |
| 选择 Frame 父层 | `⇧ + Return` | `Shift + Enter` | |
| 下一个子层 / 同级层 | `Tab` | `Tab` | |
| 上一个子层 / 同级层 | `⇧ + Tab` | `Shift + Tab` | |
| 重命名 Frame / Section | `⌘ + R` | `Ctrl + R` | 也可双击画布标签 |
| 等比例调整 Frame | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 从中心调整 Frame | 拖动时按 `⌥` | 拖动时按 `Alt` | |
| 忽略子层 Constraints 调整 Frame | 拖动时按 `⌘` | 拖动时按 `Ctrl` | |
| 显示 / 隐藏 Frame 内容 | `⌘ + ⇧ + H` | `Ctrl + Shift + H` | 实际是当前选择可见性 |

---

## 11. Auto Layout 自动布局

### 11.1 创建与移除

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 添加 Auto layout | `⇧ + A` | `Shift + A` | 对 Frame 或选择生效 |
| Suggest auto layout | `⌃ + ⇧ + A` | `Ctrl + Alt + Shift + A` | 自动推断嵌套布局 |
| 移除 Auto layout | `⌥ + ⇧ + A` | `Alt + Shift + A` | 保留 Frame 与子层 |
| Frame selection 后添加布局 | `⌥ + ⌘ + G`，再 `⇧ + A` | `Alt + Ctrl + G`，再 `Shift + A` | 两步操作 |

### 11.2 画布手柄操作

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 调整相对两侧 Padding | 拖动时按 `⌥` | 拖动时按 `Alt` | 例如同时改左右 |
| 调整四边 Padding | 拖动时按 `⌥ + ⇧` | 拖动时按 `Alt + Shift` | |
| 大步调整 Padding / Gap | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 输入相对两侧 Padding | `⌥ + Click` Padding 区域 | `Alt + Click` | 打开数值输入 |
| 输入四边 Padding | `⌥ + ⇧ + Click` | `Alt + Shift + Click` | |
| 当前轴设为 Hug contents | 双击该轴边缘 | 双击该轴边缘 | |
| 当前轴设为 Fill container | `⌥ + 双击该轴边缘` | `Alt + 双击该轴边缘` | 子层需位于 Auto layout 中 |
| 在 Auto layout 中忽略布局流 | 拖入时按 `⌃` | 拖入时按 `S` | 官方当前平台差异 |

### 11.3 Alignment box 键盘操作

先点击右侧面板中的 Alignment box，再使用：

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 向上 / 下 / 左 / 右调整对齐 | `Arrow` | `Arrow` | |
| 对齐到上边缘 | `W` | `W` | |
| 对齐到左边缘 | `A` | `A` | |
| 对齐到下边缘 | `S` | `S` | |
| 对齐到右边缘 | `D` | `D` | |
| 切换 Baseline alignment | `B` | `B` | 文字基线 |
| 切换 Gap between | `X` | `X` | Packed / Space between |

### 11.4 Auto layout 内部对象

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 微调对象顺序 / 位置 | `Arrow` | `Arrow` | 行为取决于布局方向 |
| 大步微调 | `⇧ + Arrow` | `Shift + Arrow` | |
| 复制布局内对象 | `⌥ + Drag` 或 `⌘ + D` | `Alt + Drag` 或 `Ctrl + D` | |
| 显示对象间距 | `⌥` | `Alt` | 选中对象后指向其他对象 |
| 让对象脱离布局流 | 右栏 Ignore auto layout | 同左 | 无稳定单次默认组合 |
| 在绝对定位对象上使用 Constraints | 右栏设置 | 同左 | 需先 Ignore auto layout |

---

## 12. 复制、粘贴、替换与属性复用

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 复制 | `⌘ + C` | `Ctrl + C` | |
| 剪切 | `⌘ + X` | `Ctrl + X` | |
| 粘贴 | `⌘ + V` | `Ctrl + V` | |
| Paste over selection | `⌘ + ⇧ + V` | `Ctrl + Shift + V` | 粘贴到选择上方，不嵌套进去 |
| Paste to replace | `⌘ + ⇧ + R` | `Ctrl + Shift + R` | 用剪贴板对象替换当前选择 |
| Paste here | 右键 → Paste here | 右键 → Paste here | 无稳定默认组合 |
| Duplicate 复制 | `⌘ + D` | `Ctrl + D` | 可重复此前间距 / 变换 |
| 拖动复制 | `⌥ + Drag` | `Alt + Drag` | |
| Copy properties | `⌥ + ⌘ + C` | `Alt + Ctrl + C` | 复制填充、描边、效果等 |
| Paste properties | `⌥ + ⌘ + V` | `Alt + Ctrl + V` | |
| Copy as PNG | `⌘ + ⇧ + C` | `Ctrl + Shift + C` | 默认 2× 图像复制到剪贴板 |
| Place image / video | `⌘ + ⇧ + K` | `Ctrl + Shift + K` | |
| Export | `⌘ + ⇧ + E` | `Ctrl + Shift + E` | |
| 批量重命名 | `⌘ + R` | `Ctrl + R` | 支持 Current name 与编号规则 |

### Multi-paste

当选择多个 Frame 后执行普通 `⌘/Ctrl + V`：

- 复制一个对象：可同时粘贴到多个 Frame。
- 复制多个对象：可将多个对象按顺序分配或粘贴进多个 Frame。
- 是否嵌套进入 Frame，取决于选择状态与粘贴方式。

---

## 13. 填充、描边、透明度与外观

### 13.1 填充与描边

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Eyedropper 吸管 | `I` | `I` | |
| 移除 Fill | `⌥ + /` | `Alt + /` | 当前 Generic 布局 |
| 移除 Stroke | `⇧ + /` | `Shift + /` | 当前 Generic 布局 |
| 交换 Fill 与 Stroke | `⇧ + X` | `Shift + X` | |
| Copy properties | `⌥ + ⌘ + C` | `Alt + Ctrl + C` | |
| Paste properties | `⌥ + ⌘ + V` | `Alt + Ctrl + V` | |
| Outline stroke | `⌘ + ⌥ + O` | `Ctrl + Alt + O` | 当前默认；破坏性转换 |

### 13.2 透明度

选择对象且不在文字输入状态时：

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 10% | `1` | `1` | |
| 20% | `2` | `2` | |
| 30% | `3` | `3` | |
| 40% | `4` | `4` | |
| 50% | `5` | `5` | |
| 60% | `6` | `6` | |
| 70% | `7` | `7` | |
| 80% | `8` | `8` | |
| 90% | `9` | `9` | |
| 100% | `0` | `0` | |
| 精确两位透明度 | 快速输入两位数字 | 快速输入两位数字 | 例如 `25` 为 25% |

### 13.3 图像

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 放置图片 / GIF / 视频 | `⌘ + ⇧ + K` | `Ctrl + Shift + K` | |
| 进入图像编辑 / Crop | `Return` 或双击 | `Enter` 或双击 | 依图层类型 |
| 快速进入 Crop | `⌥ + 双击` | `Alt + 双击` | 部分界面 / 版本 |
| 退出图像编辑 | `Esc` | `Esc` | |
| 保持比例调整 Crop | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 从中心调整 Crop | 拖动时按 `⌥` | 拖动时按 `Alt` | |

---

## 14. 矢量编辑、路径与节点

### 14.1 进入与退出矢量编辑

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Pen 工具 | `P` | `P` | |
| Pencil 工具 | `⇧ + P` | `Shift + P` | |
| 编辑选择的矢量 / 形状 | `Return` | `Enter` | |
| 退出矢量编辑 | `Return` 或 `Esc` | `Enter` 或 `Esc` | 具体行为看当前状态 |
| 选择多个节点 | `⇧ + Click` | `Shift + Click` | |
| 框选节点 | `Drag` | `Drag` | |
| 移动节点 | `Arrow` | `Arrow` | |
| 大步移动节点 | `⇧ + Arrow` | `Shift + Arrow` | |
| 删除节点 | `Delete` | `Delete` / `Backspace` | |
| Delete and heal | `⇧ + Delete` | `Shift + Delete` | 删除并平滑修复路径 |
| Paint bucket 矢量填色 | `B` | `B` | 矢量编辑状态 |
| Bend tool 弯曲工具 | 按住 `⌘` | 按住 `Ctrl` | 矢量编辑状态 |

### 14.2 路径处理

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Join selection 连接端点 | `⌘ + J` | `Ctrl + J` | 选择两个开放端点 |
| Smooth join 平滑连接 | `⌘ + ⇧ + J` | `Ctrl + Shift + J` | |
| Flatten 扁平化 | `⌥ + ⇧ + F` | `Alt + Shift + F` | 当前默认 |
| Outline stroke 描边轮廓化 | `⌘ + ⌥ + O` | `Ctrl + Alt + O` | 当前默认 |
| 约束新路径角度 | 绘制时按 `⇧` | 绘制时按 `Shift` | |
| 暂时移动当前绘制点 / 对象 | 绘制时按 `Space` | 绘制时按 `Space` | |
| 断开 Bézier 手柄 | 拖手柄时按 `⌥` | 拖手柄时按 `Alt` | 可独立调整手柄 |
| 对称调整手柄 | 正常拖动手柄 | 正常拖动手柄 | |

> `Flatten` 是破坏性操作，会把对象合并为一个矢量层；若包含文字，文字将转为路径。

---

## 15. 布尔运算、蒙版与扁平化

### 15.1 布尔运算

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Union selection 联集 | `⌥ + ⇧ + U` | `Alt + Shift + U` | 非破坏性 Boolean group |
| Subtract selection 减去顶层 | `⌥ + ⇧ + S` | `Alt + Shift + S` | |
| Intersect selection 交集 | `⌥ + ⇧ + I` | `Alt + Shift + I` | |
| Exclude selection 排除重叠 | `⌥ + ⇧ + E` | `Alt + Shift + E` | |
| 取消布尔组 | `⌘ + ⇧ + G` | `Ctrl + Shift + G` | Ungroup |

### 15.2 蒙版、扁平化与轮廓

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Use as mask 创建蒙版 | `⌃ + ⌘ + M` | `Ctrl + Alt + M` | 最底层 / 指定层作为 Mask |
| 取消蒙版组 | `⌘ + ⇧ + G` | `Ctrl + Shift + G` | 视层级结构而定 |
| Flatten 扁平化选择 | `⌥ + ⇧ + F` | `Alt + Shift + F` | 当前默认 |
| Outline stroke | `⌘ + ⌥ + O` | `Ctrl + Alt + O` | 当前默认 |
| Show outlines | `⌘ + ⇧ + O` | `Ctrl + Shift + O` | 只改变视图，不修改对象 |

---

## 16. 文字编辑与排版

### 16.1 创建与基础格式

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Text 工具 | `T` | `T` | |
| 进入现有文字编辑 | 双击或 `Return` | 双击或 `Enter` | |
| 退出文字编辑 | `Esc` | `Esc` | |
| 粗体 | `⌘ + B` | `Ctrl + B` | 取决于字体是否有对应字重 |
| 斜体 | `⌘ + I` | `Ctrl + I` | 取决于字体 |
| 下划线 | `⌘ + U` | `Ctrl + U` | |
| 删除线 | `⌘ + ⇧ + X` | `Ctrl + Shift + X` | |
| 添加链接 | 编辑文字时 `⌘ + K` | 编辑文字时 `Ctrl + K` | 与操作菜单共享组合 |
| 添加 Code block | `⌘ + ⇧ + .` | `Ctrl + Shift + .` | 支持的文本上下文 |

### 16.2 列表与缩进

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Numbered list 编号列表 | `⌘ + ⇧ + 7` | `Ctrl + Shift + 7` | |
| Bulleted list 项目符号 | `⌘ + ⇧ + 8` | `Ctrl + Shift + 8` | |
| 增加列表缩进 | `⌘ + ]` | `Ctrl + ]` | 文字编辑状态 |
| 减少列表缩进 | `⌘ + [` | `Ctrl + [` | 文字编辑状态 |
| 新建同级列表项 | `Return` | `Enter` | |
| 结束空列表 | 空列表项再次 `Return` | 同左 | |

### 16.3 文本对齐

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 左对齐 | `⌥ + ⌘ + L` | `Alt + Ctrl + L` | |
| 居中对齐 | `⌥ + ⌘ + T` | `Alt + Ctrl + T` | |
| 右对齐 | `⌥ + ⌘ + R` | `Alt + Ctrl + R` | |
| 两端对齐 | `⌥ + ⌘ + J` | `Alt + Ctrl + J` | |

### 16.4 字号、字重、字距与行高

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 减小字号 | `⌘ + ⇧ + <` | `Ctrl + Shift + <` | 受键盘布局影响 |
| 增大字号 | `⌘ + ⇧ + >` | `Ctrl + Shift + >` | |
| 减小字重 | `⌥ + ⌘ + <` | `Alt + Ctrl + <` | 在可用字重间切换 |
| 增大字重 | `⌥ + ⌘ + >` | `Alt + Ctrl + >` | |
| 减小字距 | `⌥ + <` | `Alt + <` | |
| 增大字距 | `⌥ + >` | `Alt + >` | |
| 减小行高 | `⌥ + ⇧ + <` | `Alt + Shift + <` | |
| 增大行高 | `⌥ + ⇧ + >` | `Alt + Shift + >` | |

### 16.5 系统级文字导航

以下是操作系统标准组合，并非 Figma 独占：

| 操作 | macOS | Windows |
|---|---|---|
| 选择全部文字 | `⌘ + A` | `Ctrl + A` |
| 选择到行首 / 行尾 | `⇧ + ⌘ + ← / →` | `Shift + Home / End` |
| 按单词移动光标 | `⌥ + ← / →` | `Ctrl + ← / →` |
| 按单词选择 | `⌥ + ⇧ + ← / →` | `Ctrl + Shift + ← / →` |
| 删除前一个单词 | `⌥ + Delete` | `Ctrl + Backspace` |
| 新建一行 | `Return` | `Enter` |

---

## 17. 组件、实例、变体与资源库

### 17.1 创建与定位

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Create component 创建组件 | `⌥ + ⌘ + K` | `Alt + Ctrl + K` | |
| Detach instance 分离实例 | `⌥ + ⌘ + B` | `Alt + Ctrl + B` | |
| Go to main component | `⌃ + ⌥ + ⌘ + K` | `Ctrl + Alt + Shift + K` | 跨文件组件会打开库文件 |
| 打开 Assets | `⌥ + 2` | `Alt + 2` | |
| 打开 Libraries | `⌥ + 3` | `Alt + 3` | |
| 打开 Resources | `⇧ + I` | `Shift + I` | |
| 从 Main component 拖出实例 | `⌥ + Drag` | `Alt + Drag` | |
| Convert to slot | `⌘ + ⇧ + S` | `Ctrl + Shift + S` | 选择主组件内嵌套 Frame |

### 17.2 交换实例

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 用 Assets 中组件交换顶层实例 | `⌥ + Drag` 到实例上 | `Alt + Drag` 到实例上 | |
| 交换嵌套实例 | `⌥ + ⌘ + Drag` | `Alt + Ctrl + Drag` | 目标嵌套在 Frame / 组件内 |
| 创建而非移动组件实例 | `⌥ + Drag` | `Alt + Drag` | 从主组件复制 |

### 17.3 没有固定默认组合的组件命令

可使用 `⌘/Ctrl + K` 搜索：

- Add variant
- Combine as variants
- Reset all changes
- Reset specific property
- Push changes to main component
- Restore main component
- Expose nested instances
- Create component property
- Create instance swap property
- Publish library
- Review library updates

---

## 18. 变量与样式管理

### 18.1 Variables 弹窗中的选择

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 选择非连续变量 | `⌘ + Click` | `Ctrl + Click` | |
| 选择连续范围 | `⇧ + Click` | `Shift + Click` | |
| 全选当前列表 | `⌘ + A` | `Ctrl + A` | 焦点需在变量列表 |
| 复制变量 / 值 | `⌘ + C` | `Ctrl + C` | 依当前焦点 |
| 粘贴变量 / 值 | `⌘ + V` | `Ctrl + V` | |
| 删除选择 | `Delete` | `Delete` / `Backspace` | 可能弹出确认 |
| 移到下一个字段 | `Tab` | `Tab` | |
| 移到上一个字段 | `⇧ + Tab` | `Shift + Tab` | |
| 确认输入 | `Return` | `Enter` | |
| 取消输入 | `Esc` | `Esc` | |

### 18.2 Styles 样式

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 复制选中样式 | `⌘ + C` | `Ctrl + C` | 焦点位于 Styles 列表 |
| 剪切选中样式 | `⌘ + X` | `Ctrl + X` | 可跨文件移动已发布样式 |
| 粘贴样式 | `⌘ + V` | `Ctrl + V` | |
| 连续多选样式 | `⇧ + Click` | `Shift + Click` | |
| 非连续多选样式 | `⌘ + Click` | `Ctrl + Click` | |
| 删除样式 | `Delete` | `Delete` | |
| 打开 Libraries | `⌥ + 3` | `Alt + 3` | 管理已启用的库 |

> 变量创建、模式切换、发布、别名设置等大量命令没有稳定默认快捷键，优先使用 Actions 或右侧面板。

---

## 19. 原型设计与演示模式

### 19.1 原型编辑

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 切换 Design / Prototype | `⇧ + E` | `Shift + E` | |
| 选择多个触发对象 | `⇧ + Click` | `Shift + Click` | |
| 复制 / 粘贴交互对象 | `⌘ + C / V` | `Ctrl + C / V` | 交互通常随图层复制 |
| 删除连接 / 交互 | `Delete` | `Delete` | 需先选择连接 |
| 打开 Presentation view | `⌘ + ⌥ + Return` | `Ctrl + Alt + Enter` | |

### 19.2 Presentation view

需在演示选项中启用 Figma shortcuts：

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 全屏 | `F` | `F` | 演示上下文 |
| Scale view / 缩放显示 | `Z` | `Z` | |
| Restart prototype | `R` | `R` | 从 Flow 起点重启 |
| 评论 | `C` | `C` | |
| 上一屏 / 下一屏 | `←` / `→` | `←` / `→` | 仅在允许键盘导航时 |
| 退出全屏 / 关闭浮层 | `Esc` | `Esc` | 浏览器行为可能优先 |

---

## 20. 评论、协作与插件

### 20.1 评论

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 进入 Comment 模式 | `C` | `C` | |
| 发布评论 | `⌘ + Enter` | `Ctrl + Enter` | 焦点在评论框时 |
| 取消评论 / 退出工具 | `Esc` | `Esc` | |
| 评论中粗体 | `⌘ + B` | `Ctrl + B` | |
| 评论中斜体 | `⌘ + I` | `Ctrl + I` | |
| 评论中删除线 | `⌘ + ⇧ + X` | `Ctrl + Shift + X` | |
| 评论中添加 URL | `⌘ + K` | `Ctrl + K` | |
| 评论中编号列表 | `⌘ + ⇧ + 7` | `Ctrl + Shift + 7` | |
| @ 提及成员 | 输入 `@` | 输入 `@` | |

### 20.2 多人协作

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 显示 / 隐藏多人光标 | `⌥ + ⌘ + \` | `Alt + Ctrl + \` | |
| FigJam 光标临时聊天 | 输入 `/` 后输入文字 | 同左 | 多人光标消息 |
| 跟随某位协作者 | 点击其头像 | 同左 | 无固定默认组合 |
| Spotlight me | 头像菜单 | 同左 | 无固定默认组合 |

### 20.3 插件与资源

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Resources | `⇧ + I` | `Shift + I` | 组件、插件、Widgets |
| Run last plugin | `⌘ + ⌥ + P` | `Ctrl + Alt + P` | 官方插件快捷操作 |
| 搜索并运行插件 | `⌘ + K` | `Ctrl + K` | 输入插件名称 |
| FigJam Quick actions | `⌘ + /` 或 `⌘ + P` | `Ctrl + /` 或 `Ctrl + P` | |

---

## 21. Dev Mode 与标注

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 进入 / 退出 Dev Mode | `⇧ + D` | `Shift + D` | 需要相应席位时才显示完整功能 |
| Annotation 标注工具 | `⇧ + T` | `Shift + T` | Design 和 Dev Mode 可用 |
| 评论工具 | `C` | `C` | |
| 选择子层 | `Return` | `Enter` | |
| 选择父层 | `⇧ + Return` | `Shift + Enter` | |
| 下一个同级层 | `Tab` | `Tab` | |
| 上一个同级层 | `⇧ + Tab` | `Shift + Tab` | |
| 测量距离 | `⌥` | `Alt` | 指向其他层 |
| 测量到深层对象 | `⌘ + ⌥` | `Ctrl + Alt` | |
| 复制选择 | `⌘ + C` | `Ctrl + C` | 具体内容取决于 Inspect / Code 面板焦点 |
| 复制链接 | `⌘ + L` | `Ctrl + L` | 浏览器可能冲突 |
| 缩放到选择 | `⇧ + 2` | `Shift + 2` | |
| 适合窗口 | `⇧ + 1` | `Shift + 1` | |

下列 Dev Mode 功能通常没有默认组合，可在界面或 Actions 中执行：

- Mark as ready for dev
- Change dev status
- Compare changes
- Compare with main component
- Add dev resource
- Open component playground
- Copy CSS / iOS / Android code
- Download asset

---

## 22. 无障碍键盘操作

### 22.1 工具栏导航

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 将焦点移到工具栏 | `F6` | `Ctrl + F6` | 可重复按直到工具栏获得焦点 |
| 在工具栏项目间移动 | `Arrow` | `Arrow` | |
| 启用当前工具 | `Return` | `Enter` | |
| 移动十字光标 | `Arrow` | `Arrow` | 工具启用后 |
| 放置新对象 | `Return` | `Enter` | |
| 取消工具 | `Esc` | `Esc` | |

### 22.2 Keyboard box selection

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 启用键盘框选工具 | `⌥ + Space` | `Ctrl + Space` | 出现粉色键盘光标 |
| 移动键盘光标 | `Arrow` | `Arrow` | |
| 选择光标下对象 | `Return` | `Enter` | |
| 下一个 / 上一个子层 | `Tab` / `⇧ + Tab` | `Tab` / `Shift + Tab` | |
| 扩展框选范围 | `⌘ + Arrow` | `Ctrl + Arrow` | |
| 大步扩展框选范围 | `⌘ + ⇧ + Arrow` | `Ctrl + Shift + Arrow` | |
| 退出键盘框选 | `Esc` | `Esc` | |

### 22.3 画布键盘导航

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 无选择时平移 | `Arrow` | `Arrow` | |
| 快速平移 | `⇧ + Arrow` | `Shift + Arrow` | |
| 放大 / 缩小 | `⌘ + + / -` | `Ctrl + + / -` | |
| 适合窗口 | `⇧ + 1` | `Shift + 1` | |
| 缩放到选择 | `⇧ + 2` | `Shift + 2` | |

---

## 23. FigJam 快捷键

### 23.1 FigJam 工具

| 工具 / 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Move 工具 | `V` | `V` | |
| Sticky note 便签 | `S` | `S` | |
| Section 分区 | `⇧ + S` | `Shift + S` | |
| Text 文字 | `T` | `T` | |
| Table 表格 | `⇧ + T` | `Shift + T` | 拖动确定行列 |
| Straight connector / line | `L` | `L` | 当前官方 FigJam 指引 |
| Elbow connector | `X` 或 `⇧ + L` | `X` 或 `Shift + L` | |
| Marker 马克笔 | `M` | `M` | |
| Highlighter 荧光笔 | `⇧ + M` | `Shift + M` | |
| Washi tape 胶带 | `W` | `W` | |
| Stamp / Emote 印章 | `E` | `E` | |
| Comment 评论 | `C` | `C` | |
| 打开 Assets / Stickers | `⌥ + 2` | `Alt + 2` | |
| 放置图片 | `⌘ + ⇧ + K` | `Ctrl + Shift + K` | |
| Quick actions | `⌘ + /` 或 `⌘ + P` | `Ctrl + /` 或 `Ctrl + P` | |

### 23.2 FigJam 绘制与连接

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 绘制直线 Marker / Highlighter | 绘制时按 `⇧` | 绘制时按 `Shift` | |
| 创建直连接线 | `L` | `L` | |
| 创建肘形连接线 | `X` 或 `⇧ + L` | `X` 或 `Shift + L` | |
| 约束连接线或线段 | 拖动时按 `⇧` | 拖动时按 `Shift` | |
| 退出绘制 / Emote 工具 | `Esc` | `Esc` | |
| 连续释放 Emote | 按住鼠标 | 按住鼠标 | |
| 释放一组 Emote | `⇧ + Click` | `Shift + Click` | Stamp / Emote 上下文 |

### 23.3 FigJam 视图与选择

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 显示 / 隐藏 UI | `⌘ + \` | `Ctrl + \` | |
| 显示 / 隐藏多人光标 | `⌥ + ⌘ + \` | `Alt + Ctrl + \` | |
| 平移 | `Space + Drag` | `Space + Drag` | |
| 放大 | `+` | `+` | |
| 缩小 | `-` | `-` | |
| 100% | `⇧ + 0` | `Shift + 0` | |
| 适合窗口 | `⇧ + 1` | `Shift + 1` | |
| 缩放到选择 | `⇧ + 2` | `Shift + 2` | |
| 多选 / 取消某项 | `⇧ + Click` | `Shift + Click` | |
| 全选 | `⌘ + A` | `Ctrl + A` | |
| 取消选择 | `Esc` | `Esc` | |
| Group | `⌘ + G` | `Ctrl + G` | |
| Ungroup | `⌘ + ⇧ + G` 或 `⌘ + Delete` | `Ctrl + Shift + G` 或 `Ctrl + Backspace` | FigJam 官方组合 |
| 锁定 / 解锁 | `⌘ + ⇧ + L` | `Ctrl + Shift + L` | |

### 23.4 FigJam 排列

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 前移一层 | `⌘ + ]` | `Ctrl + ]` | |
| 后移一层 | `⌘ + [` | `Ctrl + [` | |
| 置于顶层 | `⌘ + ⌥ + ]` | `Ctrl + Alt + ]` | FigJam 当前上下文 |
| 置于底层 | `⌘ + ⌥ + [` | `Ctrl + Alt + [` | |
| 左对齐 | `⌥ + A` | `Alt + A` | |
| 右对齐 | `⌥ + D` | `Alt + D` | |
| 顶部对齐 | `⌥ + W` | `Alt + W` | |
| 底部对齐 | `⌥ + S` | `Alt + S` | |
| 水平中心 | `⌥ + H` | `Alt + H` | |
| 垂直中心 | `⌥ + V` | `Alt + V` | |
| Tidy up | `⌃ + ⌥ + T` | `Ctrl + Alt + T` | |
| 复制 | `⌘ + D` 或 `⌥ + Drag` | `Ctrl + D` 或 `Alt + Drag` | |
| 水平翻转 | `⇧ + H` | `Shift + H` | |
| 垂直翻转 | `⇧ + V` | `Shift + V` | |

### 23.5 FigJam 文字

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| 粗体 | `⌘ + B` | `Ctrl + B` | |
| 斜体 | `⌘ + I` | `Ctrl + I` | |
| 下划线 | `⌘ + U` | `Ctrl + U` | |
| 删除线 | `⌘ + ⇧ + X` | `Ctrl + Shift + X` | |
| 添加链接 | `⌘ + ⇧ + U` | `Ctrl + Shift + U` | FigJam 当前官方组合 |
| 编号列表 | `⌘ + ⇧ + 7` | `Ctrl + Shift + 7` | |
| 项目符号列表 | `⌘ + ⇧ + 8` | `Ctrl + Shift + 8` | |
| 增加缩进 | `⌘ + ]` | `Ctrl + ]` | 文字编辑上下文 |
| 减少缩进 | `⌘ + [` | `Ctrl + [` | |
| 左对齐 | `⌥ + ⌘ + L` | `Alt + Ctrl + L` | |
| 居中 | `⌥ + ⌘ + T` | `Alt + Ctrl + T` | |
| 右对齐 | `⌥ + ⌘ + R` | `Alt + Ctrl + R` | |
| 两端对齐 | `⌥ + ⌘ + J` | `Alt + Ctrl + J` | |
| @ 提及成员 | 输入 `@` | 输入 `@` | |
| 光标临时聊天 | 输入 `/` | 输入 `/` | 不在文字编辑状态 |

### 23.6 FigJam 表格

| 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Table 工具 | `⇧ + T` | `Shift + T` | |
| 选择非连续单元格 / 行 / 列 | `⌘ + Click` | `Ctrl + Click` | |
| 选择连续范围 | `⇧ + Click` | `Shift + Click` | |
| 下一个单元格 | `Tab` | `Tab` | |
| 上一个单元格 | `⇧ + Tab` | `Shift + Tab` | |
| 删除选择的行 / 列 | `Delete` | `Delete` | |
| 复制单元格 / 行 / 列 | `⌘ + C` | `Ctrl + C` | |
| 粘贴 | `⌘ + V` | `Ctrl + V` | |
| 复制行 / 列 | `⌘ + D` | `Ctrl + D` | |
| 导出表格 / 选择 | `⌘ + ⇧ + E` | `Ctrl + Shift + E` | 图片、PDF 或 CSV |
| Convert table to stickies | Quick actions 搜索 | Quick actions 搜索 | 无固定单键 |

---

## 24. Figma Slides、Sites 与其他产品

这些产品拥有各自的上下文快捷键。下表只收录官方明确、相对稳定的入口；完整列表以各产品内快捷键面板为准。

| 产品 / 操作 | macOS | Windows | 说明 |
|---|---|---|---|
| Figma Slides：进入 / 退出 Design mode | `⇧ + D` | `Shift + D` | 需要 Full seat 和编辑权限 |
| Figma Slides：创建组件 | `⌥ + ⌘ + K` | `Alt + Ctrl + K` | 仅 Design mode |
| Figma Sites：Inline preview | `⇧ + Space` | `Shift + Space` | |
| Figma Sites：Full-screen preview | `⌘ + ⌥ + Return` | `Ctrl + Alt + Enter` | |
| Figma Sites：复制 | `⌘ + C` | `Ctrl + C` | 可与 Design 互相复制 |
| Figma Sites：粘贴 | `⌘ + V` | `Ctrl + V` | |
| Figma Sites：复制 Webpage | `⌘ + D` | `Ctrl + D` | 选择 Webpage 时 |
| Figma Agent：画布 Prompt | `⌘ + Enter` | `Ctrl + Enter` | Figma Design 中 |

Figma Make、Buzz、Draw、Motion、Weave 等产品仍在快速变化，很多命令没有稳定的跨产品默认组合。建议直接：

```text
打开该产品文件
→ Control / Ctrl + Shift + ?
→ 查看该产品当前快捷键面板
```

---

## 25. 浏览器 / 桌面客户端冲突

| 组合 | 浏览器常见行为 | Figma 中的行为 / 建议 |
|---|---|---|
| `⌘/Ctrl + L` | 聚焦地址栏 | 复制页面链接在桌面客户端更可靠 |
| `⌘/Ctrl + K` | 搜索或地址栏 | Figma Actions；网页端可能被浏览器拦截 |
| `⌘/Ctrl + P` | 打印网页 | FigJam Quick actions 备用键；优先用 `⌘/Ctrl + /` |
| `⌘/Ctrl + + / -` | 浏览器页面缩放 | Figma 画布缩放；确保画布已获得焦点 |
| `Ctrl + Space` | 系统输入法切换 | Windows 键盘框选工具可能冲突 |
| `⌘ + Space` | macOS Spotlight | 不用于 Figma 的常规组合 |
| `Alt` 单独按下 | Windows 菜单焦点 | 拖动复制 / 测量时确保鼠标上下文已开始 |
| `Backspace` | 浏览器历史返回（部分旧浏览器） | 删除对象；优先使用 Delete |
| `F` | 浏览器查找无冲突 | Figma Design 为 Frame，演示中为全屏 |

建议优先使用 Figma Desktop App，以减少浏览器、扩展和系统快捷键抢占。

---

## 26. 当前版与旧版快捷键差异

以下是最容易被网上旧资料写错的项目：

| 操作 | 2026 当前默认 | 旧版 / 可选偏好 | 说明 |
|---|---|---|---|
| Flatten 扁平化 | Mac `⌥ + ⇧ + F`；Win `Alt + Shift + F` | 旧表常写 `⌘/Ctrl + E` | 以当前官方帮助为准 |
| Outline stroke | Mac `⌘ + ⌥ + O`；Win `Ctrl + Alt + O` | 开启 “Use old shortcuts for outlines” 后为 `⌘/Ctrl + Shift + O` | |
| Show outlines | Mac `⌘ + ⇧ + O`；Win `Ctrl + Shift + O` | 开启旧偏好后为 `Shift + O` | |
| Actions menu | Mac `⌘ + K`；Win `Ctrl + K` | 旧资料常写 `⌘/Ctrl + /` 或 `⌘/Ctrl + P` | FigJam 仍官方支持 Quick actions 组合 |
| Libraries | Mac `⌥ + 3`；Win `Alt + 3` | 旧资料常写 `⌥/Alt + ⌘/Ctrl + O` | 新版左侧导航 |
| Design / Inspect 面板 | 新版以 Design / Dev Mode 导航为主 | `⌥/Alt + 8/0` 多见于旧界面 | |
| FigJam Connector | `L` 为直线；`X` 或 `Shift + L` 为肘形 | 旧表常写 `Shift + C` | 以当前 FigJam 指引为准 |

如果你在旧文件、旧客户端或特定键盘布局中发现不同，检查：

```text
Main menu
→ Preferences
→ Use old shortcuts for outlines
```

以及：

```text
Keyboard shortcuts
→ Layout
```

---

## 27. 无默认快捷键的常用命令

以下高频功能通常没有稳定的默认组合。使用 `⌘/Ctrl + K`（Design）或 `⌘/Ctrl + /`（FigJam）后输入英文命令名最快：

| 分类 | 建议搜索的命令 |
|---|---|
| Auto layout | `Suggest auto layout`、`Ignore auto layout`、`Wrap` |
| Components | `Add variant`、`Combine as variants`、`Reset all changes` |
| Components | `Push changes to main component`、`Restore main component` |
| Variables | `Open variables`、`Create variable`、`Apply variable` |
| Libraries | `Publish library`、`Review library updates` |
| Layout | `Distribute horizontal spacing`、`Distribute vertical spacing` |
| Layout | `Tidy up`、`Pack`、`Space between` |
| View | `Pixel preview`、`Show outlines`、`Layout grids` |
| Image | `Crop image`、`Set image as fill`、`Replace image` |
| Vector | `Simplify path`、`Flatten`、`Outline stroke` |
| Prototype | `Set as flow starting point`、`Present` |
| Dev Mode | `Mark as ready for dev`、`Add annotation` |
| Plugin | 直接输入插件名称 |
| FigJam | `Convert table to stickies`、`Import from CSV` |

---

## 28. 高频快捷键速查

### 28.1 设计师最常用 30 组

| 操作 | macOS | Windows |
|---|---|---|
| Move | `V` | `V` |
| Frame | `F` | `F` |
| Rectangle | `R` | `R` |
| Ellipse | `O` | `O` |
| Text | `T` | `T` |
| Pen | `P` | `P` |
| Section | `⇧ + S` | `Shift + S` |
| Place image | `⌘ + ⇧ + K` | `Ctrl + Shift + K` |
| Resources | `⇧ + I` | `Shift + I` |
| Add auto layout | `⇧ + A` | `Shift + A` |
| Remove auto layout | `⌥ + ⇧ + A` | `Alt + Shift + A` |
| Group | `⌘ + G` | `Ctrl + G` |
| Ungroup | `⌘ + ⇧ + G` | `Ctrl + Shift + G` |
| Frame selection | `⌥ + ⌘ + G` | `Alt + Ctrl + G` |
| Create component | `⌥ + ⌘ + K` | `Alt + Ctrl + K` |
| Detach instance | `⌥ + ⌘ + B` | `Alt + Ctrl + B` |
| Duplicate | `⌘ + D` | `Ctrl + D` |
| Copy properties | `⌥ + ⌘ + C` | `Alt + Ctrl + C` |
| Paste properties | `⌥ + ⌘ + V` | `Alt + Ctrl + V` |
| Paste to replace | `⌘ + ⇧ + R` | `Ctrl + Shift + R` |
| Show / hide selection | `⌘ + ⇧ + H` | `Ctrl + Shift + H` |
| Lock / unlock | `⌘ + ⇧ + L` | `Ctrl + Shift + L` |
| Zoom to fit | `⇧ + 1` | `Shift + 1` |
| Zoom to selection | `⇧ + 2` | `Shift + 2` |
| Show / hide UI | `⌘ + \` | `Ctrl + \` |
| Measure spacing | `⌥` | `Alt` |
| Deep select | `⌘ + Click` | `Ctrl + Click` |
| Move 10 px | `⇧ + Arrow` | `Shift + Arrow` |
| Export | `⌘ + ⇧ + E` | `Ctrl + Shift + E` |
| Actions | `⌘ + K` | `Ctrl + K` |

### 28.2 Auto Layout 高频 10 组

| 操作 | macOS | Windows |
|---|---|---|
| 添加自动布局 | `⇧ + A` | `Shift + A` |
| 建议自动布局 | `⌃ + ⇧ + A` | `Ctrl + Alt + Shift + A` |
| 移除自动布局 | `⌥ + ⇧ + A` | `Alt + Shift + A` |
| 相对两侧 Padding | `⌥ + Drag` | `Alt + Drag` |
| 四边 Padding | `⌥ + ⇧ + Drag` | `Alt + Shift + Drag` |
| 大步 Padding / Gap | `⇧ + Drag` | `Shift + Drag` |
| Hug contents | 双击轴向边缘 | 双击轴向边缘 |
| Fill container | `⌥ + 双击轴向边缘` | `Alt + 双击轴向边缘` |
| Baseline alignment | Alignment box 中 `B` | 同左 |
| Space between | Alignment box 中 `X` | 同左 |

---

## 29. 官方来源与核对说明

### Figma 官方

1. [Use Figma products with a keyboard](https://help.figma.com/hc/en-us/articles/360040328653-Use-Figma-products-with-a-keyboard)
2. [Select keyboard layout](https://help.figma.com/hc/en-us/articles/5665442977431-Select-keyboard-layout)
3. [Use the actions menu in Figma Design](https://help.figma.com/hc/en-us/articles/23570416033943-Use-the-actions-menu-in-Figma-Design)
4. [Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)
5. [Select layers and objects](https://help.figma.com/hc/en-us/articles/360040449873-Select-layers-and-objects)
6. [Frames in Figma Design](https://help.figma.com/hc/en-us/articles/360041539473-Frames-in-Figma-Design)
7. [Adjust alignment, rotation, position, and dimensions](https://help.figma.com/hc/en-us/articles/360039956914-Adjust-alignment-rotation-position-and-dimensions)
8. [Copy and paste objects](https://help.figma.com/hc/en-us/articles/4409078832791-Copy-and-paste-objects)
9. [Boolean operations](https://help.figma.com/hc/en-us/articles/360039957534-Boolean-operations)
10. [Flatten layers](https://help.figma.com/hc/en-us/articles/30101373312279-Flatten-layers)
11. [Convert strokes to vector paths](https://help.figma.com/hc/en-us/articles/33052305733015-Convert-strokes-to-vector-paths)
12. [View layer outlines in Figma Design](https://help.figma.com/hc/en-us/articles/5724448965527-View-layer-outlines-in-Figma-Design)
13. [Explore text properties](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties)
14. [Create and insert component instances](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances)
15. [Swap components and instances](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances)
16. [Guide to prototyping in Figma](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma)
17. [Play your prototypes](https://help.figma.com/hc/en-us/articles/360040318013-Play-your-prototypes)
18. [Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
19. [Guide to FigJam](https://help.figma.com/hc/en-us/articles/1500004362321-Guide-to-FigJam)
20. [Tables in FigJam](https://help.figma.com/hc/en-us/articles/12583849250199-Tables-in-FigJam)
21. [Create text and links in FigJam](https://help.figma.com/hc/en-us/articles/1500004291281-Create-text-and-links-in-FigJam)
22. [Use plugins in files](https://help.figma.com/hc/en-us/articles/360042532714-Use-plugins-in-files)
23. [Explore Figma Sites](https://help.figma.com/hc/en-us/articles/31230436657815-Explore-Figma-Sites)
24. [Use design mode in Figma Slides](https://help.figma.com/hc/en-us/articles/25423848723863-Use-design-mode-in-Figma-Slides)

### 辅助核对

- [Shortcuts.design Figma 数据表](https://shortcuts.design/tools/toolspage-figma/)
- [Shortcuts.design 开源数据仓库](https://github.com/michelvanheest/shortcuts-design-data)

### 完整性说明

- Figma 官方没有维护一份固定的、可下载的跨产品完整总表；应用内快捷键面板会随版本、产品、权限和键盘布局动态变化。
- 本文以 2026-07-25 可访问的官方帮助中心为版本基准，合并了分散在 Design、Auto Layout、组件、Dev Mode、原型、无障碍和 FigJam 文档中的操作。
- 旧版第三方表中的冲突项已优先按官方当前文档修正。
- 插件、Widgets、组织内工具和自定义系统快捷键不属于 Figma 默认快捷键，未混入默认表。
- Figma 更新后，建议首先打开应用内快捷键面板核对新增或变更项。

---

## 一句话记忆

```text
V 选择，F 画框，R 矩形，O 圆形，T 文字，P 钢笔；
Shift A 自动布局，Option/Alt Command/Ctrl K 创建组件；
Shift 1 看全局，Shift 2 看选中，Option/Alt 看间距；
不知道快捷键时，Command/Ctrl K 搜索命令。
```

