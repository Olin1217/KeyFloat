# KeyFloat Win V1.04 最终验证报告

验证日期：2026-07-26

## 已完成

- 原生 Windows 技术栈：C#、.NET 8、WPF。
- 支持 Windows 10 build 19041+ 与 Windows 11。
- 支持 x64 与 ARM64，自包含发布，无需用户预装 .NET。
- 209 个软件目录条目，185 款 Windows 可用软件，10,969 条 Windows 快捷键。
- 24 款没有 Windows 版本的软件只保留目录状态，不展示伪造快捷键。
- 209 个软件均提供 128 × 128 优化 PNG 图标，发布包图标总量约 1.05 MB。
- Windows 数据中 macOS 修饰键、键名残留为 0。
- Release 编译结果：0 个警告，0 个错误。
- 核心数据、双语搜索、不可用软件隔离、管理员激活、Ed25519 券码验证和篡改拒绝测试均通过。
- 发布产物的 PE 架构、运行数据、图标数量和调试符号策略均通过验证。
- Windows 10/11 通用图标字体已统一为 Segoe MDL2 Assets，避免 Windows 10 图标缺字。
- GitHub Actions 会显式安装 Inno Setup 6，并要求 x64、ARM64 两个安装包均生成后才允许发布任务通过。
- 源 macOS KeyFloat 的 295 个基准文件逐字节哈希复核通过，未发生修改。

## 发布产物

| 架构 | 可执行文件 | 文件大小 | SHA-256 |
| --- | --- | ---: | --- |
| x64 | `artifacts/publish/win-x64/KeyFloat.exe` | 194,309,053 bytes | `a506d64be6beee8c579e066a4587b7e7ff196f61bff208d9ba9bd66386a369e7` |
| ARM64 | `artifacts/publish/win-arm64/KeyFloat.exe` | 207,326,021 bytes | `f67b7cfb65b2f11366889b0a7096d62fc1801bf2f795fd2a428484e34f72c064` |

快捷键数据 SHA-256：`e07ee235cbbc158f6d4079a5c90d61ee013e4307733041f5dda6fe750b8e85b3`

## 真实 Windows 上线门禁

macOS 可以交叉编译并检查 Windows PE 文件，但不能替代真实 Windows 的窗口、托盘、DPI、安装和安全信誉检查。正式公开下载前仍须在 Windows 设备或 Windows CI runner 完成：

1. Windows 10 x64、Windows 11 x64、Windows 11 ARM64 启动和交互回归。
2. 100%、125%、150%、200% DPI 与多屏切换检查。
3. Inno Setup 安装、覆盖升级、卸载和残留检查。
4. 使用正式证书签名 `KeyFloat.exe` 和两个 Setup 文件。
5. Microsoft Defender SmartScreen、杀毒软件误报及官网真实下载链路检查。

对应人工步骤见 `WINDOWS_RELEASE_CHECKLIST.md`。
