# KeyFloat Win V1.04

KeyFloat Win V1.04 是从当前 macOS KeyFloat 只读基准重新构建的原生 Windows 桌面版本。项目使用 **C#、.NET 8 和 WPF**，没有复用 SwiftUI/AppKit 运行层，也不依赖 Electron 或内嵌网页。

## Windows 版本能力

- `230 × 62` 桌面悬浮小窗，展开默认尺寸 `432 × 716`。
- 展开窗口可在 `360 × 520` 至 `640 × 900` 之间调整大小。
- 小窗内容 180 ms 淡出，外壳同时在 140 ms 内展开；收起后小窗内容 140 ms 淡入。
- 深色、浅色两套纯黑白灰主题，软件品牌图标保留原色。
- 默认英文，可完整切换简体中文。
- 软件分类、模糊软件搜索、命令/按键搜索、分类筛选和收藏。
- `Ctrl+K`、`Ctrl+F` 聚焦搜索，`Esc` 可重复收起。
- 置顶时禁止拖动；取消置顶后顶部非功能区及小窗内容区均可拖动。
- 关闭按钮仅隐藏窗口，程序继续驻留系统托盘；托盘可以重新显示或退出。
- 监听 Windows 前台进程，在收起状态自动切换对应软件快捷键库。
- 保留激活券码、管理员代码、本地加密激活记录和联系开发者流程。
- 保留添加软件、问题反馈和轻量提交提示。
- 单实例运行，避免重复开启多个悬浮窗。

## 数据适配

当前目录保留 209 个软件条目：

- 185 款具有 Windows 版本，合计 10,969 条 Windows 快捷键。
- 24 款没有受支持 Windows 版本，仍显示在软件目录中，但不会展示由 macOS 机械伪造的快捷键。
- 完成 3,459 次现有条目的 Windows 专栏精确匹配，并额外补入 145 条仅 Windows 存在且具有可靠双语名称的命令。
- 10 条来自早期 KeyFloat 已整理的 Windows 对照数据。
- 其余跨平台条目使用显式 Windows 修饰键规则转换，并逐条保留 `windows-convention-mapped` 来源标签，方便后续继续用官方 Windows 文档替换。

生成与审计文件：

- `WINDOWS_SHORTCUT_ADAPTATION_REPORT.json`
- `WINDOWS_SHORTCUT_VALIDATION_REPORT.json`
- `WINDOWS_ICON_REPORT.json`
- `SOURCE_BASELINE_MANIFEST.json`

## 系统要求

- Windows 10 版本 2004（build 19041）或更高版本。
- Windows 11 推荐。
- x64 或 ARM64 处理器。

发布包为 self-contained，不要求最终用户预先安装 .NET Runtime。

## 使用 Visual Studio 打开

1. 安装 Visual Studio 2022。
2. 勾选“.NET 桌面开发”工作负载和 .NET 8 SDK。
3. 打开 `KeyFloat.Win.sln`。
4. 将 `KeyFloat.Win` 设置为启动项目。
5. 选择 x64 或 ARM64 后运行。

## 本地验证

```powershell
node Tools/build-windows-data.js
node Tools/validate-windows-data.js
node Tools/validate-project.mjs
dotnet build KeyFloat.Win.sln -c Release
dotnet run --project tests/KeyFloat.Core.Smoke/KeyFloat.Core.Smoke.csproj -c Release -- src/KeyFloat.Win/Data/shortcuts-windows.json
```

## 生成 Windows 安装包

安装 Inno Setup 6 后执行：

```powershell
.\scripts\build-release.ps1 -Architecture all
```

输出：

```text
artifacts/
├── publish/
│   ├── win-x64/
│   └── win-arm64/
└── installer/
    ├── KeyFloat-Win-1.0.5-x64-Setup.exe
    └── KeyFloat-Win-1.0.5-arm64-Setup.exe
```

项目包含 Windows GitHub Actions 发布工作流，可在 Windows runner 上自动完成数据重建、图标处理、编译、测试、双架构发布和安装包生成。

## 上线签名

对外下载前需要使用受信任的 Windows 代码签名证书同时签名：

1. `KeyFloat.exe`
2. `KeyFloat-Win-1.0.5-*-Setup.exe`

未签名安装包会触发 Microsoft Defender SmartScreen 警告。签名证书和时间戳服务属于开发者账户资产，因此没有写入当前工程。

## 源项目保护

Windows 工程只读取 `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode` 并将必要数据复制到自身 `SourceData`。构建、生成、测试和安装脚本都不会写入原 KeyFloat、V1.01、V1.02、V1.03 或 V1.04 备份。
