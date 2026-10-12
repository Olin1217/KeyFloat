# KeyFloat

KeyFloat 是一个置于桌面最前方的双语快捷键助手。首版以 Figma 为完整首发库，同时内置 Photoshop、Illustrator、After Effects、Premiere Pro 与 Blender 快捷键包。产品默认中文，可随时切换英文和 macOS / Windows 键位。

## 已实现

- 点击展开 / `Esc` 收起的无边框悬浮窗
- 可拖动、可置顶，并记忆窗口位置与用户偏好
- 6 个软件、442 条双平台快捷键（其中 Figma 177 条）
- 中文 / 英文界面与命令名称即时切换
- 全文搜索：支持中英文、分类、工具别名、`Cmd/Ctrl/Alt/Shift` 与符号键
- 分类筛选、收藏常用命令、macOS / Windows 键位切换
- 数据驱动的软件包结构，新增软件无需修改界面代码

## 本地运行

```bash
npm install
npm start
```

检查 JavaScript 语法和快捷键数据完整性：

```bash
npm run check
```

构建 macOS 安装包：

```bash
npm run dist
```

输出位于 `dist/`。未签名的本地构建首次打开时，macOS 可能要求在“系统设置 → 隐私与安全性”中确认。

## 目录

```text
.
├── main.js                 Electron 主进程与悬浮窗行为
├── preload.js              安全的窗口控制桥
├── index.html              应用结构
├── styles.css              视觉与悬浮窗口布局
├── renderer.js             搜索、筛选、收藏、双语等交互
├── data/shortcuts.js       多软件快捷键数据库
└── scripts/validate-data.js 数据完整性检查
```

## 扩展新的软件包

在 `data/shortcuts.js` 的 `SHORTCUT_LIBRARY` 中添加软件对象即可。每条快捷键都需要稳定的 `id`、中英文说明，以及显式的 `mac` / `win` 键位数组。完成后执行 `npm run check`，校验器会检查重复 ID、缺失语言和缺失平台键位。

## 产品方向

当前架构已经按“常用创意软件快捷键中枢”设计，而不是 Figma 专用工具。后续适合继续补充 Sketch、Framer、Affinity、DaVinci Resolve、Cinema 4D、Maya、3ds Max、Rhino、Fusion 360 等软件包，并增加快捷键冲突检测、团队自定义键位、系统托盘与全局唤起。
