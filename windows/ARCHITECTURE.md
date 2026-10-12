# KeyFloat Windows 架构说明

## 技术选择

KeyFloat 的关键场景是长期驻留的轻量悬浮窗，而不是内容型网页应用。Windows 版本采用 WPF 的原因：

- Win32 窗口句柄可直接支持无边框命中测试、拖动、缩放和前台进程监听。
- `Topmost`、系统托盘、单实例和每用户安装均有成熟稳定实现。
- .NET 8 self-contained 发布不要求用户安装运行环境。
- 相比 Electron 不需要捆绑 Chromium，常驻内存和安装体积更可控。
- WPF 在 Windows 10/11 上的兼容面比 WinUI 3 的透明悬浮窗和托盘组合更成熟。

## 分层

```text
KeyFloat.Core
├── ShortcutModels          JSON 数据模型与双语展示
├── ShortcutRepository      加载、校验、搜索排序和分类
└── LicenseValidator        Ed25519 券码、管理员代码和激活证明

KeyFloat.Win
├── Views                   激活页、悬浮窗和提交弹窗
├── ViewModels              状态、本地化、筛选、收藏与交互命令
├── Services                设置、DPAPI 激活存储、托盘、主题和反馈
└── Interop                 Windows 前台进程与原生窗口命中测试
```

## 关键边界

- `KeyFloat.Core` 不依赖 Windows UI，可在 macOS 构建机运行数据和激活冒烟测试。
- `KeyFloat.Win` 目标为 `net8.0-windows10.0.19041.0`。
- 激活凭据使用当前 Windows 用户的 DPAPI 加密，无法复制到其他用户账户直接复用。
- 前台软件自动切换只在面板收起时生效，展开阅读不会被打断。
- 置顶同时锁定窗口拖动，但不会禁止大窗口边缘缩放。
- 所有设置写入 `%LocalAppData%\KeyFloat`，程序目录保持只读。
