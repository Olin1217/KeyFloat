# KeyFloat Win V1.04 上线检查表

## 自动化检查

- [x] 209 个软件条目均有唯一 ID。
- [x] Windows 可用软件均有非空快捷键。
- [x] Windows 不可用软件不暴露伪快捷键。
- [x] 运行时数据不包含 `⌘`、`⌥`、`⌃`、`⇧` 或 macOS 键名。
- [x] 英文快捷键标题不混入中文。
- [x] 209 个软件均有优化 PNG 图标。
- [x] 主窗口尺寸、圆角和 Windows 搜索提示保持固定设计参数。
- [x] Core 数据、搜索和激活冒烟测试。
- [x] macOS 主机上的 Windows 目标交叉编译。
- [x] x64 / ARM64 self-contained 发布脚本。
- [x] Inno Setup 安装和卸载脚本。
- [x] Windows runner 自动发布工作流。

## 上线前必须在真实 Windows 设备完成

- [ ] Windows 10 x64：激活、托盘、展开/收起、拖动、置顶、缩放和多屏检查。
- [ ] Windows 11 x64：125%、150%、200% DPI 视觉检查。
- [ ] Windows 11 ARM64：安装、启动和休眠唤醒检查。
- [ ] 安装、覆盖升级和卸载检查。
- [ ] 使用正式代码签名证书签名 EXE 与 Setup。
- [ ] Microsoft Defender SmartScreen 和主流杀毒软件误报检查。
- [ ] 从官网真实下载链路完成一次全流程购买、安装和券码激活。

真实 Windows 设备、正式证书及官网生产支付环境不在本机工作区内，因此这些项目不能由 macOS 交叉编译代替。
