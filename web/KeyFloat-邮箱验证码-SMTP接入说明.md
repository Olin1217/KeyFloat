# KeyFloat 邮箱验证码与 SMTP 接入说明

## 当前状态

KeyFloat 官网正在配置邮箱验证码登录。

目前项目已经具备验证码生成、验证码校验、登录会话和订单查询相关逻辑，但尚未接入阿里云 SMTP 邮件发送服务。线上邮件发送功能当前处于安全关闭状态。

## Web 项目位置

```text
/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Web
```

## 项目结构检查结果

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| `package.json` | 已存在 | 项目依赖和运行脚本配置文件 |
| `api/` | 已存在 | 登录、订单和付款等后端接口 |
| `server/` | 不存在 | 当前项目不使用该目录结构 |
| `backend/` | 不存在 | 当前项目不使用该目录结构 |
| `next.config.js` | 不存在 | 当前项目不是 Next.js 项目 |
| `vite.config.js` | 不存在 | 当前项目不是 Vite 项目 |
| `.env` | 不存在 | 未使用通用 `.env` 文件 |
| `.env.example` | 已存在 | 环境变量示例文件 |
| `.env.local` | 已存在 | 本地私密配置文件，不应公开或提交 |
| `.env.admin.local` | 已存在 | 管理员私密配置文件，不应公开或提交 |

## 项目技术结构

这是一个使用原生 Node.js 后端接口的 Web 项目，不是 Next.js 或 Vite 项目。

与邮箱验证码有关的现有接口包括：

```text
api/auth/request-code.js
api/auth/verify-code.js
api/auth/session.js
api/auth/logout.js
api/_lib/mailer.js
api/_lib/auth.js
```

## SMTP 主要接入位置

### `api/_lib/mailer.js`

邮件发送的核心接入文件。需要在这里增加阿里云 SMTP Provider，实现验证码邮件和订单相关邮件的发送。

当前邮件模块支持：

- Resend
- Webhook
- 本地开发环境 Console 输出

当前尚未实现 SMTP Provider。

### `api/auth/request-code.js`

负责：

- 接收用户邮箱
- 生成验证码
- 设置验证码有效期
- 控制验证码重复发送频率
- 调用邮件发送模块

### `api/auth/verify-code.js`

负责：

- 校验用户提交的验证码
- 检查验证码有效期
- 限制错误尝试次数
- 验证成功后创建登录会话

### `package.json`

目前项目没有 SMTP 邮件依赖。建议增加：

```text
nodemailer
```

使用成熟邮件库可以更稳定地处理 SMTP 连接、TLS、身份验证、连接超时和邮件编码。

### `.env.example`

需要补充阿里云 SMTP 环境变量示例，例如：

```dotenv
KEYFLOAT_AUTH_EMAIL_PROVIDER=smtp
KEYFLOAT_AUTH_FROM_EMAIL=no-reply@example.com
KEYFLOAT_SMTP_HOST=smtp.example.com
KEYFLOAT_SMTP_PORT=465
KEYFLOAT_SMTP_SECURE=true
KEYFLOAT_SMTP_USER=no-reply@example.com
KEYFLOAT_SMTP_PASSWORD=replace-with-smtp-authorization-password
```

真实 SMTP 密码只能配置在服务器私密环境变量中，不能写入代码、`.env.example` 或提交到代码仓库。

## 完成接入需要的阿里云信息

需要从阿里云邮件推送控制台确认以下信息：

1. SMTP 服务器地址
2. SMTP 端口
3. 是否使用 SSL/TLS
4. 发信地址
5. SMTP 用户名
6. SMTP 授权密码
7. 已配置并通过验证的发信域名

## 后续接入流程

1. 在 `package.json` 中加入 SMTP 邮件依赖
2. 在 `api/_lib/mailer.js` 中实现 SMTP Provider
3. 在 `.env.example` 中增加无敏感数据的 SMTP 配置示例
4. 在服务器私密环境配置中填写真实 SMTP 参数
5. 更新自动化检查，覆盖验证码邮件发送逻辑
6. 在本地运行完整项目检查
7. 部署新版 Web 后端
8. 使用真实邮箱测试验证码发送、错误验证码、过期验证码和重复发送限制
9. 验证登录成功后的订单查询流程
10. 检查服务器日志，确保不会输出验证码或 SMTP 密码

## 安全注意事项

- 不要把 SMTP 授权密码发送到公开聊天、截图或代码仓库
- 不要在前端 JavaScript 中保存 SMTP 配置
- 不要在生产日志中输出验证码
- 验证码必须设置有效期、发送间隔和错误尝试次数限制
- 登录 Cookie 应继续使用 `HttpOnly`、`Secure` 和 `SameSite` 安全属性
- SMTP 发送失败时不能向用户暴露服务器地址、账户或错误堆栈

## 结论

KeyFloat 官网的邮箱验证码登录框架已经存在。当前缺少的是阿里云 SMTP 邮件发送驱动和生产服务器 SMTP 环境配置。补齐以上两部分后，即可完成真实邮箱验证码登录闭环。
