# 技术与协作软件快捷键批次进度

- 生成及复核日期：2026-07-22
- 平台：macOS
- 数据状态：`curated`
- 覆盖标记：`curated-comprehensive-defaults`
- 最终空包审计：按 `ShortcutStore.swift` 的实际资源顺序合并后，本批次负责的六组共有 73 款仍为 `catalogOnly` / 0 条，已全部补齐；Safari 在后续资源中已有非空覆盖，因此明确排除，未重写。
- 第 1 轮基线：73 款软件，975 条快捷键。
- 第 2 轮深度补全：新增 483 条，当前合计 1,458 条。新增条目 ID 使用稳定的 `r2-` 前缀，方便后续审计。

## 第 2 轮统计

| 分组 | 软件数 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|---:|
| 开发工具 | 16 | 194 | 562 |
| 版本控制与部署 | 10 | 24 | 95 |
| 数据库与接口 | 14 | 69 | 211 |
| 浏览器 | 5 | 59 | 188 |
| macOS 效率工具 | 8 | 32 | 95 |
| 协作与任务 | 20 | 105 | 307 |

- Tower 在第 1 轮已有明确的仓库、提交、抓取、拉取、推送、分支、搜索与设置默认键；第 2 轮没有为不确定的视图命令另造键位。
- Docker Desktop、Vercel 与 Supabase 公开且稳定的专用默认键较少，第 2 轮复核后保持原条目，不把网页、浏览器或命令行操作冒充产品快捷键。
- 第 2 轮曾候选但最终撤回了无法可靠确认或会与已有序列冲突的 Docker Desktop 视图键、DataGrip/Redis Insight 查询历史键、第二套 1Password 锁定键，以及 GitLab/Bitbucket 冲突导航序列。

## 开发工具（development）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| Visual Studio Code | 20 | 50 |
| Cursor | 22 | 55 |
| Xcode | 12 | 36 |
| Android Studio | 16 | 44 |
| IntelliJ IDEA | 16 | 44 |
| PyCharm | 16 | 44 |
| WebStorm | 16 | 44 |
| GoLand | 16 | 44 |
| CLion | 16 | 44 |
| Unity | 5 | 23 |
| Unreal Engine | 8 | 19 |
| Arduino IDE | 5 | 20 |
| iTerm2 | 6 | 20 |
| Warp | 6 | 18 |
| Eclipse IDE | 6 | 28 |
| Sublime Text | 8 | 29 |

## 版本控制与部署（versionControl）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| GitHub Desktop | 6 | 16 |
| Sourcetree | 4 | 12 |
| Tower | 0 | 10 |
| GitHub | 5 | 14 |
| GitLab | 4 | 14 |
| Bitbucket | 1 | 10 |
| Docker Desktop | 0 | 4 |
| Vercel | 0 | 3 |
| Netlify | 2 | 6 |
| Cloudflare | 2 | 6 |

## 数据库与接口（databaseAPI）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| Postman | 6 | 17 |
| Insomnia | 5 | 13 |
| Apifox | 4 | 10 |
| Hoppscotch | 4 | 10 |
| Swagger UI | 2 | 8 |
| DBeaver | 6 | 23 |
| DataGrip | 18 | 49 |
| MySQL / MySQL Workbench | 5 | 18 |
| PostgreSQL / pgAdmin | 3 | 11 |
| MongoDB Compass | 5 | 10 |
| Redis Insight | 1 | 7 |
| SQLite / SQLiteStudio | 3 | 15 |
| TablePlus | 7 | 16 |
| Supabase | 0 | 4 |

## 浏览器（browser）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| Google Chrome | 12 | 39 |
| Microsoft Edge | 12 | 39 |
| Brave | 12 | 39 |
| Mozilla Firefox | 12 | 41 |
| Arc | 11 | 30 |

## macOS 效率工具（macUtility）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| Raycast | 4 | 12 |
| Alfred | 4 | 12 |
| CleanShot X | 3 | 10 |
| Bartender | 2 | 8 |
| Rectangle | 9 | 18 |
| Magnet | 5 | 15 |
| Paste | 2 | 8 |
| 1Password | 3 | 12 |

## 协作与任务（collaboration）

| 软件 | 第 2 轮新增 | 当前总数 |
|---|---:|---:|
| Notion | 12 | 28 |
| Confluence | 5 | 17 |
| Jira | 4 | 16 |
| Linear | 6 | 19 |
| Trello | 8 | 20 |
| 飞书 / Lark | 5 | 14 |
| 语雀 | 2 | 11 |
| Microsoft Teams | 8 | 18 |
| Zoom | 4 | 16 |
| Slack | 10 | 24 |
| Discord | 4 | 17 |
| WeChat | 2 | 8 |
| Dropbox | 3 | 9 |
| Google Drive | 6 | 16 |
| Microsoft OneDrive | 4 | 11 |
| 腾讯会议 | 3 | 9 |
| 钉钉 | 2 | 10 |
| QQ | 2 | 8 |
| Todoist | 8 | 20 |
| TickTick | 7 | 16 |

## 真实边界与复核说明

- 本批次整理的是可显示、可执行的 macOS 默认快捷键集合，不宣称穷尽软件内部所有命令。插件、扩展、自定义键位、实验功能、企业策略与无默认绑定的命令不在覆盖范围内。
- 第 2 轮重点补齐了 IDE/编辑器的工作区搜索、代码导航、补全、重构、调试、终端、窗口与标签页；浏览器的文件、打印、开发者工具和页面导航；数据库客户端的查询编辑、补全、数据表与标签页；协作产品的消息、任务、会议和键盘导航。
- VS Code、Cursor 与 JetBrains 系列按产品默认 macOS 键位整理；Vim/Emacs 模拟、IdeaVim、扩展命令和用户键位方案会覆盖或改变结果。Android Studio、IntelliJ IDEA、PyCharm、WebStorm、GoLand、CLion 与 DataGrip 共用 JetBrains macOS 默认键位基线，但产品或插件独有动作没有据此类推。
- Xcode、Eclipse、Unity、Unreal Engine、Arduino IDE 的部分键位只在编辑器、项目、调试器或场景视图获得焦点时生效。功能键还可能受 macOS“将 F1、F2 等键用作标准功能键”设置影响。
- iTerm2、Warp、Raycast、Alfred、CleanShot X、Bartender、Rectangle、Magnet、Paste 与 1Password 都允许用户改键；全局热键还可能因辅助功能、录屏权限或与其他应用冲突而失效。第 2 轮没有为可自定义但无固定默认值的动作编造键位。
- Chrome、Edge、Brave 采用 Chromium 的 macOS 默认键位基线；Firefox 和 Arc 单独处理差异。扩展、网页拦截、输入框焦点、系统级标签页设置及网站自身快捷键可能改变实际响应。
- GitHub、GitLab、Bitbucket、Google Drive、Confluence、Jira、Todoist 等网页产品的双键导航属于顺序按键，JSON 中通过 `keysZh` / `keysEn` 显示“再按 / then”；在文本输入框、代码编辑器或快捷键被账户设置禁用时不会触发。
- 网页产品只收录确实存在的网页按键、命令菜单或标准键盘导航；未把 Git、Docker、Vercel、数据库命令行或浏览器通用命令当作产品快捷键。
- DBeaver、DataGrip、MySQL Workbench、pgAdmin、Redis Insight、SQLiteStudio、TablePlus 等查询快捷键依赖查询编辑器焦点、选区和当前键位方案；数据库服务器、命令行客户端及第三方查询编辑器键位不在本批次范围内。MongoDB Compass 没有把嵌入式命令行的回车行为推断成应用快捷键。
- Notion、语雀及其他富文本编辑器的格式键只在可编辑文本或块获得焦点时生效。Jira、Linear、Trello、Todoist 等单字母键在输入框内通常被抑制。
- Teams、Zoom、飞书、腾讯会议、钉钉、Slack 与 Discord 的会议或语音键受会议状态、主办方权限、当前焦点和客户端版本限制；浏览器版与原生 macOS 客户端可能存在差异。
- Dropbox、Google Drive、OneDrive 等同时存在桌面客户端和网页端。本批次只收录各自明确存在的应用级或网页端默认操作，不把访达自身快捷键扩展为云盘软件快捷键。
- 软件官网会随版本更新快捷键页；每个包保留官方快捷键页或官网主页作为 `sourceURL`，`verifiedAt` 固定为 2026-07-22。后续若产品改版，应以该版本的官方键位表和应用内快捷键面板复核。

## 自动校验

- JSON 可由标准解析器读取。
- 73 个软件 ID 与预期最终空包清单一致，无重复软件包。
- 1,458 个快捷键 ID 全局唯一；与现有全部快捷键资源的 ID 冲突数为 0。
- 第 2 轮新增 483 条；软件内“相同动作 + 相同键位”语义重复数为 0。
- 每条快捷键均有非空 `keys`、中文动作、英文动作和 `tags` 数组。
- 英文动作不含中文字符；`keys`、`keysZh`、`keysEn` 均未包含 Windows、Ctrl、Alt、Win 或 `⊞` 表记。
- 所有包的 `dataStatus`、`provenance.platform`、`verifiedAt` 与 `coverage` 均符合本批次要求。
