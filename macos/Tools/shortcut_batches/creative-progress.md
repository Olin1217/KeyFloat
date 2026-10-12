# Creative shortcut batch progress

- 验证日期：2026-07-22
- 输出：\`creative.json\`
- 软件包：45
- 快捷键：1177
- 状态：全部为 \`curated\`；平台全部为 \`macOS\`；覆盖标记全部为 \`curated-comprehensive-defaults\`。

## 判定口径

按 \`ShortcutStore.swift\` 的资源顺序逐层判断。\`ecosystem-shortcuts-mac.json\` 使用 replace，因此会覆盖它之前的旧专业包；随后 \`verified\`、\`supplemental\`、\`browser-reviewed\` 的非空覆盖继续生效，最后 \`extended\` 使用 merge。这里只补负责分组中最终仍为 \`catalogOnly\` 且为 0 条的软件，未重写 Figma、Photoshop、Illustrator、After Effects、Affinity 三件套和 Godot 等最终已有内容的软件。

## 软件清单与条数

### 设计创意（design）

- Sketch（\`sketch\`）：34 条
- Adobe XD（\`adobexd\`）：30 条
- Framer（\`framer\`）：24 条
- Axure RP（\`axure\`）：23 条
- MasterGo（\`mastergo\`）：23 条
- 即时设计（\`jsdesign\`）：23 条
- Adobe InDesign（\`indesign\`）：30 条
- Adobe Lightroom（\`lightroom\`）：25 条
- ProtoPie（\`protopie\`）：28 条
- draw.io / diagrams.net（\`drawio\`）：22 条
- Canva（\`canva\`）：22 条
- Miro（\`miro\`）：27 条

### 媒体制作（media）

- Rive（\`rive\`）：21 条
- LottieFiles（\`lottiefiles\`）：15 条
- Final Cut Pro（\`finalcut\`）：33 条
- Logic Pro（\`logicpro\`）：27 条
- GarageBand（\`garageband\`）：22 条
- CapCut（\`capcut\`）：20 条
- Audacity（\`audacity\`）：24 条
- OBS Studio（\`obsstudio\`）：5 条
- IINA（\`iina\`）：19 条
- VLC media player（\`vlc\`）：19 条
- HandBrake（\`handbrake\`）：9 条
- Premiere Pro（\`premiere\`）：45 条
- DaVinci Resolve（\`davinci\`）：50 条

### 建筑设计（architecture）

- Archicad（\`archicad\`）：19 条
- Enscape（\`enscape\`）：10 条
- Twinmotion（\`twinmotion\`）：19 条
- QGIS（\`qgis\`）：18 条
- Vectorworks（\`vectorworks\`）：21 条
- AutoCAD（\`autocad\`）：44 条
- SketchUp（\`sketchup\`）：35 条
- Rhino（\`rhino\`）：35 条
- ENVI（\`envi\`）：13 条

### 工程制图（engineering）

- KiCad（\`kicad\`）：20 条
- Onshape（\`onshape\`）：24 条
- Fusion 360（\`fusion360\`）：33 条
- FreeCAD（\`freecad\`）：29 条
- Shapr3D（\`shapr3d\`）：26 条

### 三维与动画（modeling）

- ZBrush（\`zbrush\`）：26 条
- Blender（\`blender\`）：56 条
- Maya（\`maya\`）：42 条
- Cinema 4D（\`cinema4d\`）：34 条

### 游戏开发（gameDevelopment）

- Substance 3D Painter（\`substancepainter\`）：24 条
- Houdini（\`houdini\`）：29 条

## 第 2 轮深度补全

- 本轮复核全部 45 款软件，21 款新增 150 条：Sketch +9、Framer +5、Adobe Lightroom +7、ProtoPie +5、draw.io / diagrams.net +7、Canva +4、Miro +8、Rive +4、Final Cut Pro +11、Logic Pro +9、GarageBand +5、CapCut +5、Audacity +8、IINA +6、VLC media player +5、Twinmotion +4、KiCad +6、Onshape +9、ZBrush +8、Substance 3D Painter +13、Houdini +12。
- 同时清理 Fusion 360 与 Shapr3D 中 2 条和建模命令占用相同按键、无法作为独立默认键成立的旧视图项，并修正 Framer 与 InDesign 的组合键冲突；本轮净增 148 条，总量由 1029 条增至 1177 条。
- 新增内容重点覆盖图层与视图、时间线选择、音频轨道与编辑器、原理图、标准三维视图、节点网络、材质绘制和播放器面板。
- AutoCAD、SketchUp、Rhino、Fusion 360、FreeCAD、Shapr3D、Blender、Maya、Cinema 4D、Premiere Pro 与 DaVinci Resolve 的现有包已覆盖主要文件、编辑、工具、视图、选择、变换、时间线或播放分类，本轮未加入重复命令。
- Adobe XD、Axure RP、MasterGo、即时设计、InDesign、LottieFiles、Archicad、Enscape、QGIS、Vectorworks、ENVI 与 HandBrake 未发现足够确定且不与现有内容重复的 macOS 默认键，因此保持原数。
- OBS Studio 继续保持 5 条：录制、直播、场景、虚拟摄像机等操作默认没有统一绑定，不能为了数量补造热键。

## 真实边界

本批是“可显示的、经整理的 macOS 默认快捷键集合”，不是对所有版本、所有工作区和全部可自定义命令的穷举。没有把未分配快捷键、仅 Windows 修饰键写法或由 Windows Ctrl/Alt/Win 机械换算的组合补进来。

- Sketch、Framer、MasterGo、即时设计、Rive、LottieFiles、ProtoPie、draw.io、Canva、Miro 与 Onshape 会随网页编辑器或桌面壳版本持续发布；浏览器保留键、输入焦点及非美式键盘布局可能改变组合的可达性。
- Adobe XD 已进入维护状态；InDesign、Lightroom、Premiere Pro、Substance 3D Painter 的版本、工作区与用户键盘集均可改写默认值。Lightroom 条目以当前 Lightroom Classic 文档中的稳定默认命令为主，不把移动版或云端专属手势混入。
- Final Cut Pro、Logic Pro 与 GarageBand 支持自定义命令集；这里记录出厂命令集中的稳定常用命令，不枚举未绑定菜单命令、控制器映射或触控板手势。
- OBS Studio 的开始/停止直播、录制、虚拟摄像机、场景切换等操作默认大多没有全局热键，因此只收录 5 条确定的 macOS 应用级默认命令，没有伪造“全面”的录制热键。
- Enscape 与 Twinmotion 的移动键依赖导航模式、速度预设和键盘布局；Archicad、QGIS、Vectorworks、AutoCAD、SketchUp、Rhino 与 ENVI 还会受版本、工作环境、扩展以及用户工作区影响。ENVI 因扩展命令差异较大，仅保留稳定的文件、编辑和视图命令。
- KiCad、Fusion 360、FreeCAD、Shapr3D 的命令会随编辑器上下文变化；单键命令只在相应草图、印制电路板或建模画布取得焦点时成立。Onshape 同时受浏览器保留键影响。
- ZBrush、Blender、Maya、Cinema 4D、Houdini 都允许改键并有模式/编辑器上下文；本批不把特定插件、行业键位预设或鼠标手势宣称为全局默认。
- IINA、VLC、CapCut、Audacity、HandBrake 与 DaVinci Resolve 的部分键只在播放器、时间线或文本控件未获焦时生效；DaVinci Resolve 还支持 Premiere、Avid 等替代键盘预设，本批以其 macOS 默认预设为准。

## 校验

- JSON 已通过 \`jq empty\`。
- 45 个软件包、1177 个快捷键项目；软件、分类和项目共 1388 个 ID 全局唯一。
- 每个项目均含中英文 action 与 tags；英文 action 未检出汉字。
- 未检出 Windows、Win、Ctrl、Alt 或 ⊞ 键标签。
- 每包均有非空来源 URL；优先使用官方快捷键文档，缺少稳定快捷键页时使用软件官网或官方手册入口。
