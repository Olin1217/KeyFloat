# Creative existing-pack completion progress

- 验证日期：2026-07-22
- 输出：`creative-existing.json`
- 处理软件：2
- 仅新增条目：134
- 状态：`curated`
- 平台：`macOS`
- 覆盖标记：`curated-comprehensive-defaults`

## 范围与合并口径

本文件只补最终后置覆盖后仍属低覆盖的软件，不复制现有条目。Figma 的比较基线为 `browser-reviewed-shortcuts-mac.json` 最终替换包中的 8 条；Photoshop 的比较基线为 `supplemental-shortcuts-mac.json` 最终替换包中的 52 条。Illustrator、After Effects、Affinity Designer、Affinity Photo、Affinity Publisher 等高覆盖包未改动。

所有新增分类和项目 ID 均带 `completion` 命名空间，供后续以 merge 方式并入现有包。

## 新增统计

- Figma（`figma`）：新增 68 条；现有 8 条，合并后 76 条。
  - 新增分类：文件、编辑与选择 14；工具 12；对象、图层与组件 17；自动布局、对齐与布尔运算 15；视图与原型 10。
- Photoshop（`photoshop`）：新增 66 条；现有 52 条，合并后 118 条。
  - 新增分类：文件与应用 9；编辑与历史 7；图层与选择 8；图像与调整 12；滤镜 4；绘画与工具 12；视图与面板 14。

## 第 1 轮自审：集合去重

- 比较 134 条新增内容与最终 Figma 8 条、Photoshop 52 条。
- 新增项目 ID 134 个且全部唯一；与现有项目 ID 无交集。
- 未发现同软件“相同英文动作 + 相同按键”重复。
- 未发现新增包内部相同按键组合，也未发现新增组合与对应最终现有包的按键组合冲突。
- Figma 已有的 V、F、R、T、⌘G、⌘D、⌘⌥K、⇧1 未重复；Photoshop 已有文件、工具、编辑、选择、图层和视图组合未重复。

## 第 2 轮自审：语义与平台

- 逐类复核 macOS 修饰键顺序与动作语义，并修正 Photoshop“在 Bridge 中浏览”为 ⌘⌥O、“打开为”为 ⌘⌥⇧O。
- 未使用 Windows、Ctrl、Alt、Win 或 ⊞ 键标签；Control 仅以 ⌃ 表示，Option 仅以 ⌥ 表示。
- 英文 action 未检出汉字；中文 action 中保留的 Figma、Photoshop、Bridge、Camera Raw 等均为必要产品或功能专名。
- 每条均有非空按键、中英文 action 与 tags；每包 metadata 沿用现有值，只将 `dataStatus` 设为 `curated`，并按要求更新验证日期与覆盖标记。
- 未增加 Photoshop 中没有统一默认绑定的命令，也没有拆分会造成同键冲突的同组循环工具。

## 真实边界

- Figma 同时存在桌面端和浏览器端，浏览器保留键、输入焦点、团队灰度发布及键盘布局会影响少量组合；本包以当前 macOS 桌面/网页编辑器共同稳定的设计快捷键为主。
- Photoshop 支持自定义键盘集，部分工具键会在同一工具组内循环；文字编辑、路径编辑和面板焦点还会改变按键上下文。本包不把这些上下文命令重复包装为全局动作。
- 这里的“comprehensive”表示对稳定、可显示的默认快捷键进行全面整理，不代表覆盖未绑定菜单项、插件命令、动作脚本、触控板手势或用户自定义键盘集。

## 最终校验

- JSON 可解析，根结构为 `{software:[...]}`。
- 2 个软件包、134 条新增快捷键。
- 所有软件、分类和项目 ID 唯一；新增 ID 与当前全部快捷键资源无交集。
- 无同软件重复按键组合，无新增与最终现有包按键冲突。
- 来源、日期、覆盖范围、平台、双语 action、tags 与按键字段均通过检查。

