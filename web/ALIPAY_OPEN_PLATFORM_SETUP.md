# KeyFloat 支付宝开放平台接入说明

KeyFloat 官网已经预留支付宝“当面付”扫码支付后端。申请完成后，不需要改业务代码，只需要在服务器配置环境变量并开启开关。

## 支付完成后支付宝返回什么

支付宝会向 KeyFloat 的公网回调地址发送一条 `POST` 异步通知，内容类型为 `application/x-www-form-urlencoded`。KeyFloat 使用以下字段确认付款：

- `out_trade_no`：KeyFloat 创建的商户订单号，用于找到对应用户和订单。
- `trade_no`：支付宝生成的交易号，用于对账。
- `trade_status`：`TRADE_SUCCESS` 或 `TRADE_FINISHED` 表示支付成功。
- `total_amount`：实际支付金额，必须与服务器保存的 `6.00` 完全一致。
- `app_id`、`seller_id`：必须属于 KeyFloat 配置的支付宝应用和收款商户。
- `sign`、`sign_type`：支付宝的 RSA2 签名。

官网不会只相信浏览器的“我已完成支付”按钮，也不会只相信回调里的文字。后端会依次执行：RSA2 验签、核对应用和商户、核对订单和金额、调用 `alipay.trade.query` 主动向支付宝确认交易，再幂等签发一个激活码。同一订单的重复通知只会返回原激活码。

自动成交会进入现有管理员后台的“已发码”和“最近记录”，但不会进入“待人工核验”，因此不会出现管理员再次手工发码的入口。邮件发送失败时，管理员可以从该记录重新发送同一个激活码。

## 支付宝后台申请

1. 在支付宝开放平台创建网页/移动应用，并取得 App ID。
2. 申请并开通“当面付”产品，接口需要支持 `alipay.trade.precreate` 和 `alipay.trade.query`。
3. 选择普通公钥方式和 RSA2。当前后端使用“应用私钥 + 支付宝公钥”模式，不使用证书模式。
4. 保存应用私钥 PEM，并从支付宝后台取得“支付宝公钥”。不要误填应用公钥。
5. 确认签约收款主体和 `seller_id`（通常是 `2088` 开头的 PID）。

## 服务器配置

将下列配置加入服务器的 `/etc/keyfloat-web.env` 或部署平台的私密环境变量。真实密钥不能写入 `site-config.js`、前端代码或公开仓库。

```dotenv
KEYFLOAT_ALIPAY_ENABLED=false
KEYFLOAT_ALIPAY_APP_ID=支付宝应用AppID
KEYFLOAT_ALIPAY_PRIVATE_KEY_BASE64=完整应用私钥PEM的Base64
KEYFLOAT_ALIPAY_PUBLIC_KEY_BASE64=完整支付宝公钥PEM的Base64
KEYFLOAT_ALIPAY_SELLER_ID=2088开头的商户PID
KEYFLOAT_ALIPAY_GATEWAY_URL=https://openapi.alipay.com/gateway.do
KEYFLOAT_PUBLIC_BASE_URL=https://keyfloat.cn
KEYFLOAT_ALIPAY_SUBJECT=KeyFloat activation code
KEYFLOAT_ALIPAY_TIMEOUT_EXPRESS=30m
```

macOS 可以用下面的命令把完整 PEM 转为单行 Base64。输出只应放入服务器私密配置：

```bash
base64 < app_private_key.pem | tr -d '\n'
base64 < alipay_public_key.pem | tr -d '\n'
```

同时必须配置并验证现有生产依赖：

- `KEYFLOAT_LICENSE_PRIVATE_KEY_BASE64`：KeyFloat Ed25519 激活签名私钥。
- `KEYFLOAT_SHORT_CODES_ENABLED=true`：确认 1.0.5 安装包支持短激活码后开启。
- Redis/Upstash，或单机部署的 `KEYFLOAT_DATA_FILE` 持久化存储。
- 邮件服务，用于把网页显示的同一个激活码发送到已验证邮箱。
- `KEYFLOAT_SESSION_SECRET`、`KEYFLOAT_AUTH_CODE_SECRET` 和管理员配置。

只有以上条件完整，且 `KEYFLOAT_ALIPAY_ENABLED=true` 时，前端才会自动切换到支付宝开放平台的动态订单二维码。配置不完整时仍保留当前人工核验流程，避免用户误付款。

## 公网回调

默认回调地址由 `KEYFLOAT_PUBLIC_BASE_URL` 自动组成：

```text
https://keyfloat.cn/api/alipay/notify
```

该地址必须允许支付宝公网直接发起 HTTPS `POST`，不能要求用户登录、验证码或浏览器 Cookie。反向代理必须保留表单请求体。KeyFloat 只有在通知验签和主动查单均通过后才回复纯文本 `success`；其他结果会返回失败状态，让支付宝按规则重试。

## 上线顺序

1. 先保持 `KEYFLOAT_ALIPAY_ENABLED=false` 部署全部代码。
2. 配置 RSA2 密钥、App ID、PID、公网域名、持久化存储、激活签名和邮件。
3. 在支付宝沙箱完成：创建订单、扫码、成功回调、主动查单、重复回调和错误金额测试。
4. 用一笔真实小额订单核对支付宝账单、网页激活码、订单记录和邮箱激活码。
5. 最后设置 `KEYFLOAT_ALIPAY_ENABLED=true` 并重启服务。

本地自动测试命令：

```bash
npm run check
```

其中 `scripts/check-alipay.mjs` 使用本地模拟支付宝网关，不读取或泄露真实商户密钥。
