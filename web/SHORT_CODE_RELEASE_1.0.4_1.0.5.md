# KeyFloat 短激活码发布说明

## 用户激活码

新激活码格式：

```text
KF1-XXXXX-XXXXX-XXXXX-XXXXX
```

- 全部使用大写字符
- 排除易混淆字符 `I`、`L`、`O`、`0`、`1`
- 首次激活联网兑换，成功后离线验签
- 原有 `KF1.` 长券码继续有效
- 默认每枚短码最多记录 3 个安装实例
- 客户端只发送随机安装 UUID，不采集硬件序列号

## 发布文件

### macOS 1.0.5

```text
downloads/KeyFloat-macOS-1.0.5-universal.dmg
SHA-256: aba17b39fa010cd996f2cfba78376d3fe8e9354509c7bdccbf2096e1ed59e04d
```

兼容 Apple 芯片与 Intel 芯片，最低 macOS 13。

此版本开始支持联网检查更新。已安装的 `1.0.4` 没有更新检查代码，需要用户手动更新一次；安装 `1.0.5` 后，后续版本会在右下角 KeyFloat Logo 显示更新红点。

### Windows 1.0.5 x64

```text
downloads/KeyFloat-Windows-1.0.5-x64-Setup.exe
SHA-256: 98d16b6dcff14b9541a43ab230feb425b23184f0499986b19c32988a2c2777a8
```

适用于 Windows 10 build 19041 及以上 64 位系统。

## 服务器配置

先部署接口和新版安装包，并保持：

```text
KEYFLOAT_SHORT_CODES_ENABLED=false
KEYFLOAT_LICENSE_DEVICE_LIMIT=3
```

验证新版下载和 `/api/license/redeem` 后，再将：

```text
KEYFLOAT_SHORT_CODES_ENABLED=true
```

修改环境变量后需要重启 KeyFloat Web 服务。

## 已完成验证

- 网站 143 项双语 UI 键检查
- 支付申请、人工审核、短码签发与订单找回
- 短码大小写归一化及格式拒绝
- 短码兑换为 Ed25519 长凭证
- 同一安装重复兑换幂等
- 默认 3 个安装实例限制
- 旧长券码兼容
- macOS Swift 类型检查与授权冒烟测试
- macOS 双架构、应用签名和 DMG 复检
- Windows Release 编译：0 警告、0 错误
- Windows 核心冒烟测试
- Windows 安装包完整解包及内部主程序哈希一致性检查

## 上线状态

本地代码、官网文件和安装包均已准备完成。生产服务器尚未更新，线上仍使用原有长券码流程。
