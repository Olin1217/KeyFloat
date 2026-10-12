# KeyFloat Xcode

这是 KeyFloat 的独立原生 macOS Xcode 版本。原 Electron 工程保持不变；此目录使用 SwiftUI/AppKit 创建悬浮窗口，不依赖 Electron 或 WKWebView。快捷键数据库仅保留 macOS 键位。

## 工程结构

```text
KeyFloat-Xcode/
├── KeyFloat.xcodeproj/
├── KeyFloat/
│   ├── KeyFloatApp.swift
│   ├── AppDelegate.swift
│   ├── FloatingWindowController.swift
│   ├── KeyFloatView.swift
│   ├── ShortcutModels.swift
│   ├── ShortcutStore.swift
│   ├── KeyFloat.entitlements
│   └── shortcuts-mac.json
└── README.md
```

## 打开与运行

1. 从 App Store 安装完整的 Xcode。
2. 双击 `KeyFloat.xcodeproj`。
3. 在 Xcode 顶部 Scheme 中选择 `KeyFloat` 和 `My Mac`。
4. 按 `⌘R` 运行。

如果命令行仍指向 Command Line Tools，安装 Xcode 后执行：

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

## 签名与归档

在 Target → Signing & Capabilities 中选择自己的 Team，并保持 Automatically manage signing 开启。随后使用 Product → Archive 创建可分发归档。

本地自用可以在 Organizer 中选择 Distribute App → Copy App；对外发布需要 Apple Developer 的 Developer ID 签名与公证。
