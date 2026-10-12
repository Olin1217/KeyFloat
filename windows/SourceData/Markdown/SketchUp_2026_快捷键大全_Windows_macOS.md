# SketchUp 2026 快捷键大全（Windows / macOS / Web / LayOut）

> 整理日期：2026-07-25  
> 适用范围：SketchUp 2026 桌面版（Windows / macOS），并附 SketchUp for Web 与 LayOut 2026 差异  
> 键位基准：英文版默认键位；中文界面的命令名称可能不同，但默认字母键通常一致

---

## 目录

1. [使用前必读](#1-使用前必读)
2. [符号、触发方式与测量框规则](#2-符号触发方式与测量框规则)
3. [SketchUp 桌面版默认工具快捷键总表](#3-sketchup-桌面版默认工具快捷键总表)
4. [文件、编辑与通用操作](#4-文件编辑与通用操作)
5. [鼠标导航与视图控制](#5-鼠标导航与视图控制)
6. [推断、轴向与绘图平面锁定](#6-推断轴向与绘图平面锁定)
7. [选择与套索选择](#7-选择与套索选择)
8. [直线与手绘线](#8-直线与手绘线)
9. [矩形与旋转矩形](#9-矩形与旋转矩形)
10. [圆与多边形](#10-圆与多边形)
11. [圆弧工具全集](#11-圆弧工具全集)
12. [移动、复制与阵列](#12-移动复制与阵列)
13. [旋转、翻转与旋转阵列](#13-旋转翻转与旋转阵列)
14. [缩放](#14-缩放)
15. [推拉、偏移与路径跟随](#15-推拉偏移与路径跟随)
16. [橡皮擦、柔化、隐藏与几何清理](#16-橡皮擦柔化隐藏与几何清理)
17. [材质、标签、分类器与吸附点](#17-材质标签分类器与吸附点)
18. [卷尺、量角器与精确输入](#18-卷尺量角器与精确输入)
19. [相机、标准视图与漫游](#19-相机标准视图与漫游)
20. [群组、组件与上下文操作](#20-群组组件与上下文操作)
21. [默认没有快捷键的工具与命令](#21-默认没有快捷键的工具与命令)
22. [SketchUp for Web 快捷键与差异](#22-sketchup-for-web-快捷键与差异)
23. [LayOut 2026 默认快捷键](#23-layout-2026-默认快捷键)
24. [LayOut 2026 工具内修饰键](#24-layout-2026-工具内修饰键)
25. [SketchUp for iPad 键盘说明](#25-sketchup-for-ipad-键盘说明)
26. [自定义、导入、导出与迁移](#26-自定义导入导出与迁移)
27. [建议自定义键位](#27-建议自定义键位)
28. [冲突、版本差异与排错](#28-冲突版本差异与排错)
29. [官方资料与补充来源](#29-官方资料与补充来源)

---

## 1. 使用前必读

### 1.1 本文收录什么

- SketchUp 2026 桌面版官方默认工具快捷键。
- 工具运行中的修饰键，例如复制、锁轴、锁面、取样和切换模式。
- 测量框（Measurements）中的长度、角度、坐标、分段和阵列语法。
- 鼠标导航、选择方式、标准视图、相机和漫游操作。
- SketchUp for Web 的浏览器差异和自定义方式。
- LayOut 2026 的默认工具快捷键与工具内修饰键。
- 官方没有默认键位、但经常需要自定义的命令。

### 1.2 本文不混入什么

- 不把插件快捷键当作 SketchUp 原生默认键位。
- 不把个人模板或工作室自定义 `.dat` 键位当作系统默认。
- 不把旧版本、旧论坛帖子中的键位直接覆盖到 2026 版。
- 不把 Windows 和 macOS 的 `Ctrl`、`Alt`、`Option`、`Command` 简单机械互换。

### 1.3 为什么同一个键会有不同作用

SketchUp 的按键高度依赖当前状态：

- 未激活工具时，字母键通常用于切换工具。
- 工具激活后，`Ctrl`、`Option`、`Alt`、`Command`、`Shift` 常用于切换该工具的模式。
- 数字键在大多数绘图工具运行时会输入测量值，而不是触发快捷键。
- 方向键会锁定轴向、绘图平面或平行/垂直推断。
- 在文本框、搜索框或测量框中，按键作用又会改变。

> 最可靠的现场提示是 SketchUp 窗口底部的状态栏。切换工具后，状态栏会显示当前可用的修饰键。

---

## 2. 符号、触发方式与测量框规则

### 2.1 平台按键对照

| 本文写法 | Windows | macOS |
|---|---|---|
| 复制修饰键 | `Ctrl` | `Option ⌥` |
| 常见工具模式修饰键 | `Alt` 或 `Ctrl`，视工具而定 | `Command ⌘` 或 `Option ⌥`，视工具而定 |
| 切换选择 | `Shift` | `Shift ⇧` |
| 回车确认 | `Enter` | `Return ↩` |
| 删除 | `Delete` / `Backspace` | `Delete ⌫` |
| 取消 | `Esc` | `Esc` |
| 鼠标中键 | 滚轮按下 | 滚轮按下 |

### 2.2 “点按”与“按住”

| 方式 | 含义 | 例子 |
|---|---|---|
| 点按一次 | 切换一种持续模式 | 移动工具中点按 `Ctrl` / `Option`，切换复制模式 |
| 按住 | 仅在按住期间临时生效 | 按住 `Shift`，锁定当前推断 |
| 点按后输入 | 不必点击测量框 | 画线后直接键入 `2000` 再按 `Enter` |
| 双击 | 重复上一次参数或操作 | 推拉工具双击另一面，应用上一次推拉距离 |

### 2.3 测量框的核心规则

| 操作 | 输入示例 | 结果 |
|---|---|---|
| 输入长度 | `2500` + `Enter` | 使用当前模型单位输入 2500 |
| 指定毫米 | `2500mm` + `Enter` | 输入 2500 毫米 |
| 指定厘米 | `250cm` + `Enter` | 输入 250 厘米 |
| 指定米 | `2.5m` + `Enter` | 输入 2.5 米 |
| 指定英寸 | `10"` + `Enter` | 输入 10 英寸 |
| 指定英尺 | `8'` + `Enter` | 输入 8 英尺 |
| 负值 | `-500` + `Enter` | 沿相反方向输入 500 |
| 矩形尺寸 | `3000,2000` + `Enter` | 长 3000、宽 2000 |
| 旋转角度 | `45` + `Enter` | 旋转 45° |
| 坡度 | `1:12` + `Enter` | 按升高:水平距离指定斜率 |
| 外部阵列 | `4x` 或 `4*` + `Enter` | 以相同间距创建 4 份复制品 |
| 内部等分阵列 | `4/` + `Enter` | 在原件与复制件之间等分 4 份 |
| 圆弧半径 | `250r` + `Enter` | 将圆弧半径设为 250 |
| 曲线分段 | `24s` + `Enter` | 将圆、圆弧等设为 24 段 |

> 不需要先点击测量框。完成一次工具点击后，直接键入数值即可；在数值确认前不要切换工具。

---

## 3. SketchUp 桌面版默认工具快捷键总表

以下 22 项来自 SketchUp 2026 官方默认快捷键表。

| 工具 / 命令 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 选择（Select） | `Space` | `Space` | 普通选择工具 |
| 套索选择（Lasso Select） | `Shift+Space` | `Shift+Space` | 自由绘制选择边界 |
| 材质 / 油漆桶（Paint Bucket） | `B` | `B` | 涂材质、取样和替换材质 |
| 橡皮擦（Eraser） | `E` | `E` | 删除、隐藏、柔化边线 |
| 直线（Line） | `L` | `L` | 绘制边线 |
| 矩形（Rectangle） | `R` | `R` | 绘制矩形 |
| 圆（Circle） | `C` | `C` | 绘制圆 |
| 两点圆弧（2 Point Arc） | `A` | `A` | 先定弦长，再定鼓起量 |
| 移动（Move） | `M` | `M` | 移动、复制、阵列 |
| 推拉（Push/Pull） | `P` | `P` | 面拉伸或凹进 |
| 旋转（Rotate） | `Q` | `Q` | 旋转、复制、环形阵列 |
| 缩放（Scale） | `S` | `S` | 比例缩放 |
| 偏移（Offset） | `F` | `F` | 面或共面线的等距轮廓 |
| 卷尺（Tape Measure） | `T` | `T` | 测量、辅助线、整体缩放 |
| 环绕观察（Orbit） | `O` | `O` | 也可按住鼠标中键拖动 |
| 平移（Pan） | `H` | `H` | 也可 `Shift+鼠标中键拖动` |
| 缩放（Zoom） | `Z` | `Z` | 也可滚动滚轮 |
| 充满视窗（Zoom Extents） | `Shift+Z` | `Shift+Z` | 显示全部可见模型 |
| 创建组件（Make Component） | `G` | `G` | 将选择集创建为组件 |
| Image Igloo | `I` | `I` | 进入 Image Igloo 工具 |
| 后边线（Back Edges） | `K` | `K` | 显示/隐藏被面遮挡的边线 |
| 搜索（Search） | `Shift+S` | `Shift+S` | 搜索工具、菜单命令和扩展命令 |

---

## 4. 文件、编辑与通用操作

### 4.1 常见文件操作

这些属于系统和菜单层面的常用键位，不在官方“22 个默认工具”表中；如键位被系统、插件或用户方案占用，请以当前菜单显示为准。

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 新建模型 | `Ctrl+N` | `Command+N` | 新建文档 |
| 打开 | `Ctrl+O` | `Command+O` | 打开模型 |
| 保存 | `Ctrl+S` | `Command+S` | 保存当前模型 |
| 另存为 | `Ctrl+Shift+S` | `Command+Shift+S` | 另存副本或新文件 |
| 打印 | `Ctrl+P` | `Command+P` | 打印 |
| 关闭窗口 | `Ctrl+W` | `Command+W` | 关闭当前文档窗口 |
| 退出应用 | `Alt+F4` | `Command+Q` | 系统级退出 |

### 4.2 编辑与剪贴板

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 撤销 | `Ctrl+Z` | `Command+Z` | 官方还列出 `Alt+Backspace` 作为撤销默认键 |
| 重做 | `Ctrl+Y` | `Command+Shift+Z` | 以当前“编辑”菜单显示为准 |
| 剪切 | `Ctrl+X` | `Command+X` | 剪切所选对象 |
| 复制 | `Ctrl+C` | `Command+C` | 复制所选对象 |
| 粘贴 | `Ctrl+V` | `Command+V` | 粘贴 |
| 全选 | `Ctrl+A` | `Command+A` | 选择当前编辑上下文内全部对象 |
| 取消选择 | `Ctrl+T` | `Command+T` | 某些自定义方案可能不同 |
| 反选 | `Ctrl+Shift+I` | `Command+Shift+I` | 选择当前上下文内其余对象 |
| 删除所选对象 | `Delete` / `Backspace` | `Delete` | 删除选中对象 |
| 取消当前操作 | `Esc` | `Esc` | 取消当前步骤；多按一次可退出连续操作 |

### 4.3 编辑上下文

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 进入群组/组件 | 双击对象 | 双击对象 | 进入编辑上下文 |
| 退出群组/组件 | 点击上下文外空白处 | 点击上下文外空白处 | 也可按 `Esc` |
| 连续退出嵌套上下文 | 多次按 `Esc` | 多次按 `Esc` | 每次退出一层 |
| 打开右键菜单 | 右键 | `Control+单击` 或右键 | 显示上下文命令 |
| 重复上一次菜单命令 | 视命令而定 | 视命令而定 | 优先使用右键菜单或搜索 |

---

## 5. 鼠标导航与视图控制

### 5.1 三键鼠标

| 操作 | 鼠标 / 键盘 | 说明 |
|---|---|---|
| 环绕观察 | 按住鼠标中键拖动 | 无需先切换到 Orbit |
| 平移 | `Shift+按住鼠标中键拖动` | 临时平移 |
| 缩放 | 滚动滚轮 | 以光标附近为缩放中心 |
| 重新居中视图 | 双击鼠标中键 | 将点击位置移向视图中心 |
| 临时环绕后返回当前工具 | 按住中键环绕，松开 | 松开后恢复先前工具 |
| 临时平移后返回当前工具 | `Shift+中键` 平移，松开 | 松开后恢复先前工具 |

### 5.2 Orbit、Pan 与 Zoom 工具内操作

| 工具 | Windows | macOS | 作用 |
|---|---:|---:|---|
| Orbit | `O` | `O` | 切换环绕观察工具 |
| Orbit 中临时平移 | 按住 `Shift` | 按住 `Shift` | 转为 Pan |
| Orbit 中关闭重力/滚转相机 | 按住 `Ctrl` | 按住 `Option` | 允许相机侧向滚转 |
| Pan | `H` | `H` | 切换平移工具 |
| Zoom | `Z` | `Z` | 上拖放大、下拖缩小 |
| Zoom 中改变视野角 | 按住 `Shift` 拖动 | 按住 `Shift` 拖动 | 改变 FOV，而不是普通缩放 |
| Zoom Extents | `Shift+Z` | `Shift+Z` | 显示所有可见几何体 |
| Zoom Window | 无默认键 | 无默认键 | 框选需要放大的区域 |

### 5.3 缩放与视野角精确输入

| 当前工具 | 输入 | 结果 |
|---|---|---|
| Zoom | `35deg` 或 `35` | 设置视野角度 |
| Zoom | `35mm` | 以相机焦距表示视野 |
| Field of View | 数值 + `Enter` | 精确设定 FOV |
| Position Camera / Look Around | 高度值 + `Enter` | 设置观察者眼高 |

---

## 6. 推断、轴向与绘图平面锁定

### 6.1 方向键锁定

| 按键 | 锁定方向 / 平面 | 颜色提示 |
|---|---|---|
| `↑` | 蓝轴或蓝轴法向平面 | 蓝色 |
| `→` | 红轴或红轴法向平面 | 红色 |
| `←` | 绿轴或绿轴法向平面 | 绿色 |
| `↓` | 平行/垂直于当前推断的边线或平面 | 洋红色 |

> 口诀：上蓝、右红、左绿、下平行/垂直。

### 6.2 Shift 推断锁定

| 操作 | Windows / macOS | 说明 |
|---|---|---|
| 锁定当前方向 | 按住 `Shift` | 光标出现有效轴向或推断后按住 |
| 锁定当前绘图平面 | 按住 `Shift` | 适用于多种绘图、旋转和测量工具 |
| 解锁 | 松开 `Shift` | 恢复自动推断 |
| 重新采样推断 | 松开后悬停参考对象，再按住 `Shift` | 建立新的参考方向 |

### 6.3 直线推断模式切换

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 循环切换线性推断状态 | 点按 `Alt` | 点按 `Command` | 在“全部开启 / 全部关闭 / 仅平行与垂直”之间切换 |
| 临时锁定当前推断 | 按住 `Shift` | 按住 `Shift` | 不等同于上面的模式切换 |

### 6.4 旋转与量角器的平面技巧

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 锁定当前旋转平面 | 按住 `Shift` | 按住 `Shift` | 先取得目标平面，再按住 |
| 保持平面方向、自由移动中心点 | 保持 `Shift` 后点按/按住 `Alt` | 保持 `Shift` 后点按/按住 `Command` | 旋转中心可脱离锁定平面 |
| 锁蓝轴旋转平面 | `↑` | `↑` | 旋转平面法向沿蓝轴 |
| 锁红轴旋转平面 | `→` | `→` | 旋转平面法向沿红轴 |
| 锁绿轴旋转平面 | `←` | `←` | 旋转平面法向沿绿轴 |

---

## 7. 选择与套索选择

### 7.1 普通选择工具

| 操作 | Windows | macOS | 结果 |
|---|---:|---:|---|
| 激活选择工具 | `Space` | `Space` | 进入 Select |
| 单击面 | 单击 | 单击 | 仅选择该面 |
| 单击边 | 单击 | 单击 | 仅选择该边 |
| 双击面 | 双击 | 双击 | 选择该面及其边界边 |
| 双击边 | 双击 | 双击 | 选择边及相邻的面 |
| 三击几何体 | 三击 | 三击 | 选择当前上下文内所有相连几何体 |
| 添加到选择 | 按住 `Ctrl` 单击 | 按住 `Option` 单击 | 只添加，不移除 |
| 切换选择状态 | 按住 `Shift` 单击 | 按住 `Shift` 单击 | 已选则移除，未选则添加 |
| 从选择中减去 | 按住 `Ctrl+Shift` 单击 | 按住 `Option+Shift` 单击 | 只移除 |
| 取消全部选择 | 点击空白处 | 点击空白处 | 清空选择 |

### 7.2 框选方向

| 拖动方向 | 选择规则 | 框线外观 |
|---|---|---|
| 从左向右 | 仅选择完全包含在框内的对象 | 实线选择框 |
| 从右向左 | 选择框内对象及被边界碰到的对象 | 虚线选择框 |

### 7.3 套索选择

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活套索 | `Shift+Space` | `Shift+Space` | 绘制自由形状选择边界 |
| 切换添加/减去 | `Shift` | `Shift` | 依当前选择状态切换 |
| 添加 | `Alt`（2026 QRC） | `Option` | 套索追加选择 |
| 减去 | `Shift+Alt`（2026 QRC） | `Shift+Option` | 从选择中减去 |

> Windows 普通 Select 的“添加”键是 `Ctrl`，但 2026 官方快速参考卡把 Lasso 的添加键标为 `Alt`。请以套索激活后的状态栏提示为准。

### 7.4 选择层级与隐藏对象

| 场景 | 行为 |
|---|---|
| 在群组/组件外选择 | 选中整个群组或组件，不直接选内部裸几何体 |
| 进入编辑上下文后选择 | 只操作当前上下文的可编辑内容 |
| 锁定的群组/组件 | 无法普通移动或编辑，需先解锁 |
| 隐藏几何体未显示 | 无法直接框选；先开启“隐藏的几何图形”或“隐藏对象” |

---

## 8. 直线与手绘线

### 8.1 直线（Line）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活直线工具 | `L` | `L` | 绘制边线 |
| 锁定当前推断 | 按住 `Shift` | 按住 `Shift` | 锁方向或平面 |
| 切换线性推断模式 | 点按 `Alt` | 点按 `Command` | 全开 / 全关 / 仅平行垂直 |
| 锁蓝轴 | `↑` | `↑` | 沿蓝轴 |
| 锁红轴 | `→` | `→` | 沿红轴 |
| 锁绿轴 | `←` | `←` | 沿绿轴 |
| 锁平行/垂直 | `↓` | `↓` | 参照已推断的边 |
| 精确长度 | 数值 + `Enter` | 数值 + `Enter` | 完成第二点后输入 |
| 重设刚画线段长度 | 新数值 + `Enter` | 新数值 + `Enter` | 未切换工具前可改 |
| 取消当前线段 | `Esc` | `Esc` | 保留此前完成的线段 |

### 8.2 坐标输入

| 输入方式 | 示例 | 含义 |
|---|---|---|
| 绝对坐标 | `[1000,2000,3000]` | 相对于当前坐标原点 |
| 相对坐标 | `<1000,0,500>` | 相对于上一点 |
| 负坐标 | `[-500,0,0]` | 沿坐标轴负方向 |

> 坐标分隔符会受操作系统区域设置影响；使用小数逗号的地区可能需要分号分隔坐标。

### 8.3 手绘线（Freehand）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 从工具栏或 Search 启动 |
| 在红轴平面绘制 | `→` | `→` | 锁定对应平面 |
| 在绿轴平面绘制 | `←` | `←` | 锁定对应平面 |
| 在蓝轴平面绘制 | `↑` | `↑` | 锁定对应平面 |
| 降低分段数 | `Ctrl+-` | `Command+-` | 绘制后调整 |
| 增加分段数 | `Ctrl++` | `Command++` | 不可超过初始采样上限 |
| 生成曲线实体 | 拖动绘制后松开 | 拖动绘制后松开 | 结果通常为曲线段集合 |

---

## 9. 矩形与旋转矩形

### 9.1 矩形（Rectangle）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活矩形 | `R` | `R` | 普通矩形 |
| 从中心绘制 | 按住/点按 `Alt` | 按住/点按 `Option` | 第一点击为中心 |
| 锁定正方形或黄金比例推断 | 按住 `Shift` | 按住 `Shift` | 出现相应推断时锁定 |
| 输入长和宽 | `长度,宽度` + `Enter` | 同左 | 例如 `3000,2000` |
| 只修改第一维 | `3000,` + `Enter` | 同左 | 保留另一维的当前值 |
| 只修改第二维 | `,2000` + `Enter` | 同左 | 保留第一维的当前值 |
| 反向绘制 | 使用负尺寸 | 使用负尺寸 | 例如 `-3000,2000` |
| 锁定绘图平面 | `Shift` 或方向键 | `Shift` 或方向键 | 先取得目标平面 |

### 9.2 旋转矩形（Rotated Rectangle）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 锁定当前方向/平面 | 按住 `Shift` | 按住 `Shift` | 第一条边或绘图平面 |
| 锁定第一边的绘图平面 | `Alt` | `Command` | 保持基线所在平面 |
| 输入第一边长度 | 数值 + `Enter` | 数值 + `Enter` | 完成第二点后输入 |
| 输入宽度与角度 | `宽度,角度` + `Enter` | 同左 | 例如 `2000,30` |
| 输入宽度 | 数值 + `Enter` | 数值 + `Enter` | 按当前角度确定 |
| 方向键锁轴 | `↑` `→` `←` `↓` | 同左 | 与常规推断锁定一致 |

---

## 10. 圆与多边形

### 10.1 圆（Circle）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活圆 | `C` | `C` | 绘制圆 |
| 锁定当前推断 | 按住 `Shift` | 按住 `Shift` | 锁定圆所在平面 |
| 锁定平面 | 方向键 | 方向键 | 按轴向锁定 |
| 指定半径 | 数值 + `Enter` | 数值 + `Enter` | 从圆心到圆周 |
| 绘制前指定边数 | 输入整数 + `Enter` | 同左 | 激活工具后、第一次点击前输入 |
| 绘制后修改分段 | `24s` + `Enter` | `24s` + `Enter` | 未切换工具前 |
| 重设刚画圆的半径 | 新数值 + `Enter` | 新数值 + `Enter` | 未切换工具前 |

### 10.2 多边形（Polygon）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 绘制前设边数 | 整数 + `Enter` | 同左 | 例如 `6` |
| 设外接半径 | 数值 + `Enter` | 同左 | 默认从中心到顶点 |
| 绘制后改边数 | `8s` + `Enter` | 同左 | 未切换工具前 |
| 锁定平面 | `Shift` 或方向键 | 同左 | 锁定多边形所在平面 |

---

## 11. 圆弧工具全集

### 11.1 两点圆弧（2 Point Arc）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | `A` | `A` | 默认圆弧工具 |
| 第一步 | 点击起点、终点 | 同左 | 确定弦长 |
| 第二步 | 移动并点击 | 同左 | 确定鼓起量 |
| 输入弦长 | 数值 + `Enter` | 同左 | 第二点前后依状态输入 |
| 输入鼓起量 | 数值 + `Enter` | 同左 | 第三点后直接输入 |
| 指定半径 | `数值r` + `Enter` | 同左 | 例如 `500r` |
| 指定分段数 | `数值s` + `Enter` | 同左 | 例如 `24s` |
| 重复上次圆弧 | 双击 | 双击 | 在新位置重复相同参数 |
| 锁轴/锁平面 | `Shift` 或方向键 | 同左 | 遵循通用推断规则 |

### 11.2 三点圆弧（3 Point Arc）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 三点定义 | 依次点击三个点 | 同左 | 三点确定圆弧 |
| 增加分段 | `Alt++` | `Option++` | 官方 2026 QRC 标示的工具内调节 |
| 减少分段 | `Alt+-` | `Option+-` | 官方 2026 QRC 标示的工具内调节 |
| 锁定切线推断 | `Alt` | `Command` | 取得切线推断后使用 |
| 锁蓝/红/绿轴 | `↑` / `→` / `←` | 同左 | 锁定相应方向或平面 |
| 锁平行/垂直 | `↓` | `↓` | 参考当前推断 |

### 11.3 圆心圆弧（Arc）与扇形（Pie）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 定义 | 圆心 → 起点 → 终点 | 同左 | 半径和夹角定义 |
| 精确半径 | 数值 + `Enter` | 同左 | 第二点后输入 |
| 精确角度 | 数值 + `Enter` | 同左 | 第三点后输入 |
| 修改分段 | `20s` + `Enter` | 同左 | 指定曲线段数 |
| 按整圆分段定义 | `20c` + `Enter` | 同左 | 以完整圆的分段数控制弧段 |
| 增加分段 | `Ctrl++` | `Option++` | 键盘布局可能影响 `+` 的输入方式 |
| 减少分段 | `Ctrl+-` | `Option+-` | 不同语言键盘请看状态栏 |

> 法语加拿大等键盘布局可能使用不同的 `+` / `-` 组合；以当前工具状态栏为准。

---

## 12. 移动、复制与阵列

### 12.1 移动（Move）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活移动 | `M` | `M` | 移动对象或几何体 |
| 切换复制模式 | 点按 `Ctrl` | 点按 `Option` | 光标出现 `+` |
| 锁定当前推断 | 按住 `Shift` | 按住 `Shift` | 保持移动方向 |
| 自动折叠（Auto-Fold） | 按住/点按 `Alt` | 按住/点按 `Command` | 允许通过自动折边移动面 |
| 锁蓝轴 | `↑` | `↑` | 沿蓝轴移动 |
| 锁红轴 | `→` | `→` | 沿红轴移动 |
| 锁绿轴 | `←` | `←` | 沿绿轴移动 |
| 锁平行/垂直 | `↓` | `↓` | 参考已推断对象 |
| 精确距离 | 数值 + `Enter` | 同左 | 移动后输入 |
| 负向移动 | 负数 + `Enter` | 同左 | 沿相反方向 |

### 12.2 线性阵列

| 操作 | 输入 | 说明 |
|---|---|---|
| 先制作一份复制品 | `Ctrl` / `Option` 切换复制后移动 | 阵列必须从复制操作开始 |
| 外部阵列 | `4x` 或 `4*` + `Enter` | 按相同间距继续生成；总份数的解释以测量框预览为准 |
| 修改外部阵列数量 | 新数字 + `x` + `Enter` | 未开始其他操作前可反复修改 |
| 内部等分阵列 | `4/` + `Enter` | 在原件和第一份复制件之间均匀插入 |
| 修改内部等分数 | 新数字 + `/` + `Enter` | 未开始其他操作前可改 |

### 12.3 移动的高效技巧

| 技巧 | 操作 |
|---|---|
| 从明确基点移动 | 在角点、端点或参考点上开始拖动 |
| 参照另一对象定位 | 先锁定轴向，再把光标移到参考端点 |
| 移动整个对象 | 先把裸几何体做成群组或组件 |
| 避免粘连 | 不要直接移动未成组、且与周围相连的面 |
| 精确复制到固定距离 | 切换复制模式，点击方向，再键入距离 |

---

## 13. 旋转、翻转与旋转阵列

### 13.1 旋转（Rotate）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活旋转 | `Q` | `Q` | 旋转选择集 |
| 切换复制模式 | 点按 `Ctrl` | 点按 `Option` | 用于旋转复制 |
| 锁定旋转平面 | 按住 `Shift` | 按住 `Shift` | 先取得目标平面 |
| 保持平面、自由放中心 | `Shift` + `Alt` | `Shift` + `Command` | 旋转中心可离开平面 |
| 锁蓝轴平面 | `↑` | `↑` | 蓝轴法向 |
| 锁红轴平面 | `→` | `→` | 红轴法向 |
| 锁绿轴平面 | `←` | `←` | 绿轴法向 |
| 输入角度 | 数值 + `Enter` | 同左 | 正值通常顺时针，负值反向 |
| 输入坡度 | `rise:run` + `Enter` | 同左 | 例如 `8:12` |
| 循环对象中心/边中点/角点推断 | `Alt` | `Command` | 适用于特定角部推断抓点 |

### 13.2 旋转阵列

| 操作 | 输入 | 说明 |
|---|---|---|
| 创建一份旋转复制 | Rotate 中点按 `Ctrl` / `Option` | 先得到第一份复制件 |
| 等角度继续复制 | `5x` 或 `5*` + `Enter` | 以相同角度间隔继续复制 |
| 在总角度内均分 | `5/` + `Enter` | 在原件和第一份复制件之间等分 |
| 修改阵列数量 | 新数字 + `x` 或 `/` | 切换工具前可反复修改 |

### 13.3 翻转（Flip）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏、右键菜单或 Search |
| 翻转并保留原件 | 点按 `Ctrl` | 点按 `Option` | 切换复制模式 |
| 切换对象轴/父级轴模式 | 点按 `Alt` | 点按 `Command` | 决定翻转基于哪套轴 |
| 绿平面翻转 | `←` | `←` | 选择绿色平面 |
| 红平面翻转 | `→` | `→` | 选择红色平面 |
| 蓝平面翻转 | `↑` | `↑` | 选择蓝色平面 |

---

## 14. 缩放

### 14.1 Scale 工具

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活缩放 | `S` | `S` | 显示缩放抓点 |
| 从中心缩放 | 按住/点按 `Ctrl` | 按住/点按 `Option` | 以中心为缩放基点 |
| 切换等比缩放 | 按住 `Shift` | 按住 `Shift` | 角点、边点行为依抓点而定 |
| 输入比例 | `2` + `Enter` | 同左 | 放大到 2 倍 |
| 输入缩小比例 | `0.5` + `Enter` | 同左 | 缩小到一半 |
| 按实际长度缩放 | `2000mm` + `Enter` | 同左 | 为当前缩放方向指定绝对长度 |
| 多轴比例 | `2,1,0.5` + `Enter` | 同左 | 分别输入各轴缩放比例 |
| 镜像 | 输入 `-1` | 输入 `-1` | 沿当前缩放方向翻转；优先使用 Flip 更直观 |

### 14.2 卷尺整体缩放

| 步骤 | 操作 |
|---|---|
| 1 | 激活卷尺 `T` |
| 2 | 测量模型中一个已知距离 |
| 3 | 直接键入该距离应有的真实值 |
| 4 | 按 `Enter` |
| 5 | 确认是否调整模型或当前编辑上下文大小 |

> 在群组或组件编辑上下文内执行，可只缩放该上下文；在模型顶层执行，可能缩放整个模型。

---

## 15. 推拉、偏移与路径跟随

### 15.1 推拉（Push/Pull）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活推拉 | `P` | `P` | 推拉平面 |
| 保留原始面/创建新起始面 | 点按 `Ctrl` | 点按 `Option` | 切换复制面模式 |
| 精确推拉距离 | 数值 + `Enter` | 同左 | 可输入单位 |
| 反向推拉 | 负值 + `Enter` | 同左 | 沿相反方向 |
| 重复上一次距离 | 双击另一个面 | 双击另一个面 | 应用相同推拉距离 |
| 重复并堆叠复制 | 切换复制模式后双击 | 同左 | 创建相同高度的连续段 |
| 推拉到参考面 | 将光标移动到参考面后单击 | 同左 | 用推断匹配高度 |

### 15.2 偏移（Offset）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活偏移 | `F` | `F` | 面或共面边线偏移 |
| 允许轮廓重叠 | 按住/点按 `Alt` | 按住/点按 `Command` | 允许产生重叠几何 |
| 精确偏移距离 | 数值 + `Enter` | 同左 | 未切换工具前可重输 |
| 向内/向外切换 | 将光标移到另一侧 | 同左 | 点击前决定方向 |
| 重复上次偏移 | 双击另一面 | 双击另一面 | 适用于兼容的面 |

### 15.3 路径跟随（Follow Me）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 沿预选路径拉伸 | 先选路径 → 启动工具 → 单击截面 | 同左 | 最稳定的工作流 |
| 使用面的周界作为路径 | 按住 `Alt` | 按住 `Command` | 官方 QRC 标注的周界路径模式 |
| 手动跟随 | 单击截面后沿路径拖动 | 同左 | 适合局部路径 |
| 生成旋转体 | 以圆/弧作为路径 | 同左 | 截面应垂直于路径起点 |

---

## 16. 橡皮擦、柔化、隐藏与几何清理

### 16.1 橡皮擦（Eraser）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活橡皮擦 | `E` | `E` | 擦除边线 |
| 擦除多条边 | 按住鼠标左键扫过 | 同左 | 松开后执行 |
| 切换柔化/平滑 | 点按或按住 `Ctrl` | 点按或按住 `Option` | 对扫过的边进行柔化/平滑 |
| 取消柔化/平滑 | 按住 `Alt` | 按住 `Command` | 恢复被柔化的边 |
| 隐藏边线 | 按住 `Shift` | 按住 `Shift` | 隐藏而不删除 |
| 取消尚未完成的擦除 | `Esc` | `Esc` | 结束当前连续操作 |

### 16.2 删除、隐藏、柔化的区别

| 操作 | 几何是否存在 | 是否影响相邻面 | 常见用途 |
|---|---|---|---|
| 删除边线 | 不存在 | 可能删除依赖该边的面 | 真正清除多余几何 |
| 隐藏边线 | 存在但不可见 | 面通常保留 | 临时清理视图 |
| 柔化边线 | 存在、显示被弱化 | 相邻面视觉连续 | 曲面显示 |
| 平滑法线 | 存在 | 改变着色过渡 | 圆柱、曲面 |

### 16.3 显示与检查

| 命令 | 默认键 | 用途 |
|---|---:|---|
| 后边线（Back Edges） | `K` | 显示被面遮住的边 |
| 隐藏的几何图形（Hidden Geometry） | 无默认键 | 显示被隐藏或柔化的边线网格 |
| 隐藏对象（Hidden Objects） | 无默认键 | 显示被隐藏的群组/组件 |
| X-Ray | 无默认键 | 透视面以检查内部几何 |

---

## 17. 材质、标签、分类器与吸附点

### 17.1 材质 / 油漆桶（Paint Bucket）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活材质工具 | `B` | `B` | 涂抹当前材质 |
| 取样材质 | 按住 `Alt` 单击 | 按住 `Command` 单击 | 从模型中吸取材质 |
| 填充相邻匹配面 | 按住 `Ctrl` | 按住 `Option` | 填充相连且材质匹配的面 |
| 替换模型内全部匹配材质 | 按住 `Shift` | 按住 `Shift` | 全局替换匹配材质 |
| 替换当前对象内匹配材质 | `Ctrl+Shift` | `Option+Shift` | 限定到对象/编辑上下文 |
| 使用默认材质 | 在材质面板选默认材质 | 同左 | 清除面上的显式材质 |

### 17.2 标签工具（Tag）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 将当前标签赋给对象 | 单击对象 | 单击对象 | 建议只给群组/组件分配标签 |
| 取样对象标签 | 按住 `Alt` 单击 | 按住 `Command` 单击 | 取样为当前标签 |
| 替换同源标签 | 按住 `Shift` | 按住 `Shift` | 对共享源标签的对象批量替换 |
| 为所有组件实例分配标签 | 按住 `Ctrl` | 按住 `Option` | 应用于该组件的全部实例 |
| 标签面板多选 | `Ctrl+单击` | `Command+单击` | 选择不连续标签 |
| 标签面板连续多选 | `Shift+单击` | `Shift+单击` | 选择连续范围 |

> 裸边和裸面通常应保持在 Untagged；用标签控制群组和组件的可见性。

### 17.3 分类器（Classifier）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 需要已载入分类体系 |
| 应用当前分类 | 单击对象 | 单击对象 | 为群组/组件分类 |
| 取样已有分类 | 按住 `Alt` 单击 | 按住 `Command` 单击 | 从已分类对象取样 |

### 17.4 吸附点（Snaps）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 在修改与擦除模式间切换 | `Ctrl` | `Option` | Make/Edit Snaps 工具中 |
| 反转吸附点方向 | `Alt` | `Command` | 翻转吸附朝向 |
| 锁定轴向 | 方向键 | 方向键 | 遵循通用轴向规则 |

---

## 18. 卷尺、量角器与精确输入

### 18.1 卷尺（Tape Measure）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活卷尺 | `T` | `T` | 测量距离 |
| 切换“仅测量 / 创建辅助线” | 点按 `Ctrl` | 点按 `Option` | 光标图标会变化 |
| 锁定当前推断 | 按住 `Shift` | 按住 `Shift` | 保持测量方向 |
| 锁蓝/红/绿轴 | `↑` / `→` / `←` | 同左 | 固定测量方向 |
| 锁平行/垂直 | `↓` | `↓` | 参照已推断对象 |
| 精确放置辅助线 | 数值 + `Enter` | 同左 | 从参考边偏移 |
| 缩放整个模型/上下文 | 测量已知距离后输入真实值 | 同左 | 确认缩放提示 |

### 18.2 量角器（Protractor）

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 激活 | 无默认键 | 无默认键 | 工具栏或 Search |
| 切换创建辅助线 | 点按 `Ctrl` | 点按 `Option` | 开关量角辅助线 |
| 锁定平面 | 按住 `Shift` | 按住 `Shift` | 先取得目标平面 |
| 自由移动中心、保留平面 | `Shift` + `Alt` | `Shift` + `Command` | 与 Rotate 相同 |
| 锁定轴向平面 | 方向键 | 方向键 | 蓝/红/绿轴 |
| 输入角度 | 数值 + `Enter` | 同左 | 创建精确角度辅助线 |
| 输入坡度 | `rise:run` + `Enter` | 同左 | 例如 `1:12` |

### 18.3 常用精确输入速查

| 工具 | 可输入内容 | 示例 |
|---|---|---|
| Line | 长度、坐标 | `2500`、`[0,0,3000]` |
| Rectangle | 长,宽 | `3000,2000` |
| Rotated Rectangle | 长度、宽度,角度 | `3000`、`2000,30` |
| Circle / Polygon | 半径、分段/边数 | `500`、`24s` |
| Arc | 弦长、鼓起量、半径、分段 | `1000`、`500r`、`24s` |
| Move | 距离、阵列 | `1200`、`5x`、`4/` |
| Rotate | 角度、坡度、阵列 | `45`、`1:12`、`6x` |
| Scale | 比例或绝对尺寸 | `2`、`2000mm` |
| Push/Pull | 距离 | `2800` |
| Offset | 距离 | `200` |
| Tape Measure | 距离、整体缩放目标 | `1000`、`2.4m` |
| Protractor | 角度或坡度 | `30`、`1:10` |
| Zoom / FOV | 角度或焦距 | `35deg`、`35mm` |

---

## 19. 相机、标准视图与漫游

### 19.1 标准视图

以下命令在桌面版默认没有字母快捷键，可通过 Camera 菜单、工具栏或 Search 使用。

| 视图命令 | 默认键 | 用途 |
|---|---:|---|
| Iso（等轴测） | 无 | 回到常用三维观察角度 |
| Top（顶视图） | 无 | 沿蓝轴向下看 |
| Bottom（底视图） | 无 | 沿蓝轴向上看 |
| Front（前视图） | 无 | 正视前方 |
| Back（后视图） | 无 | 正视后方 |
| Left（左视图） | 无 | 左侧正投影 |
| Right（右视图） | 无 | 右侧正投影 |
| Perspective（透视） | 无 | 消失点透视 |
| Parallel Projection（平行投影） | 无 | 轴测/正投影工作流 |
| Two-Point Perspective（两点透视） | 无 | 建筑表现常用 |

### 19.2 前一视图与下一视图

| 命令 | 默认键 | 说明 |
|---|---:|---|
| Previous（前一视图） | 无 | 回到上一相机状态 |
| Next（后一视图） | 无 | 在已回退的视图历史中前进 |
| Zoom Extents | `Shift+Z` | 显示全部可见模型 |
| Zoom Selection | 无桌面默认键 | 将当前选择充满视窗 |

### 19.3 Position Camera、Look Around 与 Walk

| 工具 / 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| Position Camera | 无默认键 | 无默认键 | 单击放置相机 |
| 设置眼高 | 数值 + `Enter` | 同左 | 默认常见值为约 5'6" |
| Look Around | 无默认键 | 无默认键 | 点击拖动环视 |
| Look Around 中重设眼高 | 数值 + `Enter` | 同左 | 精确设置观察高度 |
| Walk | 无默认键 | 无默认键 | 点击并拖动漫游 |
| Walk 中垂直移动 | 按住 `Shift` | 按住 `Shift` | 上下移动而非前后走 |
| Walk 中加速 | 按住 `Ctrl` | 按住 `Option` | “跑步”模式 |
| Walk 中穿墙/关闭碰撞 | 按住 `Alt` | 按住 `Alt` | 临时禁用碰撞检测 |

### 19.4 场景与动画

| 操作 | 默认键 | 说明 |
|---|---:|---|
| 添加场景 | 无 | 保存相机、样式、标签可见性等状态 |
| 更新场景 | 无 | 将当前状态写回已有场景 |
| 上一场景 / 下一场景 | 无 | 可自行分配快捷键 |
| 播放动画 | 无 | 依场景顺序播放 |

---

## 20. 群组、组件与上下文操作

### 20.1 群组与组件

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| 创建组件 | `G` | `G` | 官方默认工具快捷键 |
| 创建群组 | 无默认键 | 无默认键 | 右键“创建群组”或自定义 |
| 编辑群组/组件 | 双击 | 双击 | 进入上下文 |
| 退出上下文 | `Esc` | `Esc` | 每次退出一层 |
| 打开组件选项 | 无默认键 | 无默认键 | 适用于动态组件 |
| 使组件唯一 | 无默认键 | 无默认键 | 当前实例独立于其他实例 |
| 重新载入组件 | 无默认键 | 无默认键 | 从文件更新组件 |
| 爆炸 | 无默认键 | 无默认键 | 解除一层群组/组件包装 |
| 锁定 / 解锁 | 无默认键 | 无默认键 | 防止误编辑 |

### 20.2 组件轴与镜像

| 操作 | 默认键 | 说明 |
|---|---:|---|
| 更改组件轴 | 无 | 右键组件后选择 Change Axes |
| Flip 工具 | 无 | 2026 独立翻转工具 |
| 沿组件红/绿/蓝轴翻转 | 无 | 右键 Flip Along 或使用 Flip 工具方向键 |
| 替换所选组件 | 无 | 从 Components 面板替换 |

### 20.3 粘连与编辑范围

| 场景 | 建议 |
|---|---|
| 裸几何体与裸几何体相接 | 会粘连、切割和共享边 |
| 群组/组件与外部几何体相接 | 不会直接粘连 |
| 同一组件的多个实例 | 编辑一个通常更新全部实例 |
| 只改一个组件实例 | 先执行“使组件唯一” |
| 只缩放当前组件内容 | 进入组件编辑上下文后使用 Tape Measure |

---

## 21. 默认没有快捷键的工具与命令

### 21.1 绘图与修改工具

| 工具 / 命令 | 桌面版 2026 默认键 | 推荐调用方式 |
|---|---:|---|
| 旋转矩形 | 无 | Search、工具栏或自定义 |
| 多边形 | 无 | Search、工具栏或自定义 |
| 三点圆弧 | 无 | Search、工具栏 |
| 圆心圆弧 | 无 | Search、工具栏 |
| 扇形 | 无 | Search、工具栏 |
| 手绘线 | 无 | Search、工具栏 |
| 路径跟随 | 无 | Search、工具栏或自定义 |
| 翻转 | 无 | Search、右键菜单或自定义 |
| 量角器 | 无 | Search、工具栏或自定义 |
| 文本 | 无 | Search、工具栏 |
| 三维文字 | 无 | Tools 菜单 |
| 尺寸标注 | 无 | Search、工具栏 |
| 轴 | 无 | Search、工具栏 |
| 剖切面 | 无 | Search、工具栏或自定义 |
| 标签工具 | 无 | Search、工具栏 |
| 分类器 | 无 | Search、工具栏 |
| 吸附点工具 | 无 | Search、工具栏 |

### 21.2 相机、视图和样式

| 工具 / 命令 | 默认键 | 说明 |
|---|---:|---|
| Zoom Window | 无 | 框选放大 |
| Zoom Selection | 无 | 放大当前选择 |
| Previous / Next View | 无 | 相机历史 |
| Position Camera | 无 | 放置相机 |
| Look Around | 无 | 原地环视 |
| Walk | 无 | 第一人称漫游 |
| Field of View | 无 | 调整视野角 |
| 标准视图 | 无 | Top / Front / Right 等 |
| 透视 / 平行投影 / 两点透视 | 无 | 相机投影模式 |
| X-Ray | 无 | 透视显示 |
| Hidden Geometry | 无 | 显示隐藏/柔化网格 |
| Hidden Objects | 无 | 显示隐藏对象 |
| Monochrome | 无 | 单色面样式 |

### 21.3 建模与管理命令

| 命令 | 默认键 | 说明 |
|---|---:|---|
| Make Group | 无 | 高频，适合自定义 |
| Explode | 无 | 解除一层包装 |
| Hide | 无 | 隐藏所选对象 |
| Unhide Last / All | 无 | 取消隐藏 |
| Paste in Place | 无 | 原坐标粘贴 |
| Reverse Faces | 无 | 反转正反面 |
| Orient Faces | 无 | 统一相邻面方向 |
| Intersect Faces | 无 | 求交线 |
| Hide Rest of Model | 无 | 编辑上下文时隔离 |
| Hide Similar Components | 无 | 隔离同类组件 |
| Add Location | 无 | 地理定位 |
| Send to LayOut | 无 | 发送到 LayOut |
| 3D Warehouse / Extension Warehouse | 无 | 打开资源库 |
| Solid Tools 各命令 | 无 | Trim、Union、Subtract 等 |
| Sandbox 各命令 | 无 | 地形工具 |

---

## 22. SketchUp for Web 快捷键与差异

### 22.1 Web 版常用默认键

Web 版大多数工具字母键与桌面版相同。

| 工具 / 命令 | Web 默认键 | 与桌面版关系 |
|---|---:|---|
| Select | `Space` | 相同 |
| Lasso Select | `Shift+Space` | 相同 |
| Paint Bucket | `B` | 相同 |
| Eraser | `E` | 相同 |
| Line | `L` | 相同 |
| Rectangle | `R` | 相同 |
| Circle | `C` | 相同 |
| 2 Point Arc | `A` | 相同 |
| Move | `M` | 相同 |
| Push/Pull | `P` | 相同 |
| Rotate | `Q` | 相同 |
| Scale | `S` | 相同 |
| Offset | `F` | 相同 |
| Tape Measure | `T` | 相同 |
| Orbit | `O` | 相同 |
| Pan | `H` | 相同 |
| Zoom | `Z` | 相同 |
| Zoom Extents | `Ctrl+Shift+E` / `Command+Shift+E` | **不同于桌面版 `Shift+Z`** |
| Zoom Window | `Shift+W` | Web 扩展工具集提供 |
| Search | `Shift+S` 或 `?`（`Shift+/`） | Web 版可用两个入口 |

### 22.2 Web 版鼠标导航

| 操作 | Web 版 |
|---|---|
| Orbit | 按住滚轮拖动 |
| Pan | 按住滚轮并配合左键拖动，或使用 Pan 工具 |
| Zoom | 滚动滚轮 |
| 触控板 | 行为受浏览器和系统手势设置影响 |

### 22.3 Web 版自定义快捷键

| 操作 | 方法 |
|---|---|
| 打开 Search | `Shift+S` 或 `?` |
| 指定快捷键 | 悬停搜索结果，点击右侧快捷键框，然后输入按键 |
| 删除自定义键 | 打开相同快捷键框并清除 |
| 重置全部 | Search 面板帮助/设置入口中选择重置 |
| 可用修饰键 | `Shift`、`Alt` / `Option` |
| 受限修饰键 | `Ctrl` 和 `Command` 不可作为 Web 自定义组合的一部分 |
| 数字键 | 不能单独作为快捷键起始；通常需要修饰键 |

> 浏览器会优先拦截一部分系统组合键，例如新标签页、关闭标签页、地址栏和开发者工具快捷键。

### 22.4 Web 版注意事项

- 浏览器、操作系统和输入法可能先于 SketchUp 接收按键。
- 进入文本输入框后，工具字母键会被当作文字。
- 与桌面版相比，部分工具位于 Expanded Toolset。
- Web 版自定义键保存在用户环境中，不应假定能与桌面 `.dat` 文件互通。

---

## 23. LayOut 2026 默认快捷键

LayOut 是 SketchUp Pro 工作流中的排版与施工图工具。它的键位体系与 SketchUp 不完全相同。

### 23.1 LayOut 默认工具键

| LayOut 工具 | Windows | macOS | 说明 |
|---|---:|---:|---|
| Select | `Space` | `Space` | 选择、移动和调整对象 |
| Move | `M` | `M` | 移动 |
| Scale | `S` | `S` | 缩放 |
| Rotate | `Q` | `Q` | 旋转 |
| Rectangle | `R` | `R` | 矩形 |
| Circle | `C` | `C` | 圆 |
| 2 Point Arc | `A` | `A` | 两点圆弧 |
| Line | `L` | `L` | 线 |
| Style | `B` | `B` | 样式工具 |
| Text | `T` | `T` | 文本 |
| Linear Dimension | `D` | `D` | 线性标注 |
| Zoom to Page | `P` | `P` | 页面充满视窗 |
| Zoom Window | `Z` | `Z` | 框选缩放 |
| Trim | `Shift+T` | `Shift+T` | 修剪 |
| Extend | `Shift+E` | `Shift+E` | 延伸 |
| Fillet | `Shift+F` | `Shift+F` | 圆角 |
| Chamfer | `Shift+C` | `Shift+C` | 倒角 |

### 23.2 LayOut 默认无快捷键的工具

| 类别 | 工具 |
|---|---|
| 形状 | Rounded Rectangle、Bulged Rectangle、Lozenge、Ellipse、Polygon |
| 线与弧 | Freehand、Pie、3 Point Arc、Arc |
| 路径编辑 | Join、Split、Offset |
| 标注 | Angular Dimension、Label |
| 文档 | Table |
| 删除 | Erase |

### 23.3 LayOut 其他常用命令

| 操作 | Windows / macOS | 说明 |
|---|---:|---|
| Zoom Selection | `Alt+Z` / `Option+Z` | 放大所选对象 |
| Bring Forward | `Shift+=` | 向前一层 |
| Send Backward | `Shift+-` | 向后一层 |
| 鼠标缩放 | 滚轮 | 缩放页面 |
| 鼠标平移 | 按住滚轮拖动 | 平移画布 |

> 其余页面、排列、对齐和演示命令可在 LayOut 的 Preferences > Shortcuts 中查看或分配。

---

## 24. LayOut 2026 工具内修饰键

### 24.1 选择、移动、缩放与旋转

| 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| Move 中复制 | `Ctrl` | `Option` | 移动复制 |
| Move 中锁定推断 | `Shift` | `Shift` | 锁定当前方向 |
| Move 锁绿轴 | `↑` | `↑` | LayOut QRC：上方向键为绿色 |
| Move 锁红轴 | `→` 或 `←` | `→` 或 `←` | 两个水平方向键锁红色 |
| Move 锁平行/垂直 | `↓` | `↓` | 参考其他对象 |
| Scale 中复制 | `Ctrl` | `Option` | 缩放复制 |
| Scale 中等比 | `Shift` | `Shift` | 保持比例 |
| Scale 中心缩放 | `Alt` | `Command` | 以中心缩放 |
| Rotate 中复制 | `Ctrl` | `Option` | 旋转复制 |
| Rotate 第二点锁轴 | `Shift` 或方向键 | 同左 | 约束旋转参考 |
| 拖动时只框选、不移动 | 依状态栏使用 `Ctrl` | `Command` | 避免拖动对象 |

### 24.2 形状与线条

| 工具 / 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| Rectangle 从中心 | `Ctrl` | `Option` | 第一点击为中心 |
| Rectangle 正方形 | `Shift` | `Shift` | 保持等宽高 |
| Rectangle 精确尺寸 | `宽,高` | 同左 | 测量框输入 |
| Rectangle 调整圆角/鼓起 | `↑` / `↓` | 同左 | 适用于相应矩形变体 |
| Ellipse 从中心 | `Ctrl` | `Option` | 中心绘制 |
| Ellipse 约束为圆 | `Shift` | `Shift` | 等宽高 |
| Circle / Ellipse 重复相同尺寸 | 双击 | 双击 | 在新位置重复 |
| Line 锁水平/垂直 | `Shift` | `Shift` | 约束方向 |
| Line 精确长度 | 数值 + `Enter` | 同左 | 测量框 |
| Polygon 锁定推断 | `Shift` | `Shift` | 锁方向 |
| Polygon 设置边数 | `数值s` | 同左 | 例如 `6s` |
| Polygon 重复 | 双击 | 双击 | 重复相同参数 |
| Offset 开放路径两侧偏移 | `Alt` | `Command` | 两侧生成 |
| Offset 曲线分段 | `↑` / `↓` | 同左 | 调整曲线段数 |

### 24.3 文本、标签、表格和标注

| 工具 / 操作 | Windows | macOS | 说明 |
|---|---:|---:|---|
| Text 单击 | 单击 | 单击 | 创建不限定宽度文本框 |
| Text 拖动左→右 | 拖动 | 拖动 | 创建左对齐文本框 |
| Text 拖动右→左 | 拖动 | 拖动 | 创建右对齐文本框 |
| Text 拖动时居中对齐 | `Ctrl` | `Option` | 创建居中对齐文本框 |
| Label 翻转文字侧 | `Ctrl` | `Command` | 切换标签文字侧 |
| Label 解除第二段约束 | `Alt` | `Option` | 自由放置第二段 |
| Label 一段引线 | 单击后双击 | 同左 | 快速结束 |
| Label 两段引线 | 单击三次 | 同左 | 创建折线引线 |
| Label 曲线引线 | 单击后拖动 | 同左 | 创建曲线段 |
| Linear Dimension 解除方向约束 | `Alt` | `Option` | 自由标注方向 |
| Linear Dimension 切换引线方向 | `Ctrl` | `Command` | 翻转标注布局 |
| Linear Dimension 重复偏移 | 双击 | 双击 | 复用上次偏移 |
| Table 指定列、行 | `列,行` + `Enter` | 同左 | 例如 `4,8` |
| Table 重复 | 双击 | 双击 | 重复相同表格 |

---

## 25. SketchUp for iPad 键盘说明

- iPad 版支持多种外接键盘快捷键，但还包含 Apple Pencil、触控和专用工具盘交互。
- 长按 `Command` 可查看当前上下文可用的键盘快捷键。
- Omnibar 可搜索命令，并可用于查看或设置快捷方式。
- 桌面版的所有鼠标中键操作不能原样映射到触控设备。
- 方向键锁轴、工具字母键和部分修饰键可用性取决于当前 iPad 版本和外接键盘布局。

> iPad 是独立交互体系。本文不把触控手势混入 Windows / macOS 默认键位表。

---

## 26. 自定义、导入、导出与迁移

### 26.1 桌面版创建或修改快捷键

| 平台 | 路径 |
|---|---|
| Windows | Window > Preferences > Shortcuts |
| macOS | SketchUp > Settings / Preferences > Shortcuts |

操作步骤：

1. 在 Filter / Search 中搜索工具或菜单命令。
2. 选中目标命令。
3. 在快捷键输入框中直接按下希望使用的按键组合。
4. Windows 点击添加按钮；macOS 按界面提示完成分配。
5. 如果键位已被占用，先确认是否要重新分配。

### 26.2 自定义限制

| 规则 | 说明 |
|---|---|
| 不能用数字开头 | 数字主要保留给测量框输入 |
| 可使用修饰键 | `Shift`、`Alt`、`Ctrl` 等，实际可用性由系统决定 |
| 系统保留键不可用 | 例如操作系统、输入法或浏览器已占用的组合 |
| 插件命令也可出现 | 已安装扩展可能向快捷键列表添加命令 |
| 不要在快捷键输入框中按 `Enter` | 官方说明中，`Enter` 可能清除刚输入的值，而不是确认 |
| Reset All | 恢复默认并清除自定义分配 |

### 26.3 Windows 导入与导出

| 操作 | 方法 |
|---|---|
| 导出 | Preferences > Shortcuts > Export |
| 默认文件名 | 通常为 `Preferences.dat` |
| 导入 | Preferences > Shortcuts > Import |
| 用途 | 在设备间迁移或备份自定义键位 |
| 限制 | 官方当前说明：传统快捷键导入/导出只适用于 Windows |

### 26.4 macOS 限制

- macOS 当前不能使用 Windows 式的快捷键 `.dat` 导入/导出功能。
- 可通过系统迁移、SketchUp 版本迁移功能或手动重建键位。
- 跨平台迁移时，即使命令相同，`Ctrl` / `Option` / `Command` 也需重新检查。

### 26.5 版本迁移

SketchUp 新版本优先使用：

```text
File > Migrate Preferences
```

迁移后应检查：

- 自定义快捷键是否完整。
- 扩展命令是否仍存在。
- 被删除或改名的旧命令是否留下空绑定。
- 系统级组合键是否与新版冲突。

---

## 27. 建议自定义键位

以下仅是效率建议，**不是 SketchUp 官方默认键位**。分配前请先在 Preferences > Shortcuts 中检查冲突。

| 命令 | 建议键位示例 | 理由 |
|---|---:|---|
| Make Group | `Ctrl+G` / `Command+G` | 高频防粘连 |
| Hide | `H` 以外的组合键 | `H` 已被 Pan 占用 |
| Unhide Last | `Shift+U` | 快速恢复最近隐藏对象 |
| Unhide All | `Ctrl+Shift+U` / `Command+Shift+U` | 恢复全部 |
| Paste in Place | `Ctrl+Shift+V` / `Command+Shift+V` | 保持原坐标 |
| Follow Me | `Shift+F` | 与 Offset `F` 形成记忆组 |
| Polygon | `Shift+C` | 与 Circle `C` 形成记忆组 |
| Rotated Rectangle | `Shift+R` | 与 Rectangle `R` 形成记忆组 |
| Protractor | `Shift+T` | 与 Tape Measure `T` 形成记忆组 |
| Dimension | `D` | 标注高频用户常用 |
| Text | `Shift+T` 或其他空闲键 | 注意与 Protractor 建议冲突，二选一 |
| Section Plane | `Shift+P` | 剖面工作流 |
| Zoom Selection | `Shift+F` 以外的空闲组合 | 快速聚焦选择 |
| Previous View | `Alt+Left` / 自定 | 快速回到上一相机 |
| Next View | `Alt+Right` / 自定 | 配合 Previous |
| Top / Front / Right / Iso | 一组统一组合键 | 正投影建模效率高 |
| X-Ray | `X` | 快速透视检查 |
| Hidden Geometry | `Shift+K` | 与 Back Edges `K` 形成记忆组 |
| Hide Rest of Model | 自定组合键 | 组件深层编辑常用 |
| Reverse Faces | 自定组合键 | 导出/渲染前清理 |
| Orient Faces | 自定组合键 | 批量统一面方向 |

> 同一建议表中的键位可能互相冲突，例如 `Shift+T`。请根据自己的工作类型择一分配。

---

## 28. 冲突、版本差异与排错

### 28.1 常见冲突

| 症状 | 可能原因 | 处理方法 |
|---|---|---|
| 按字母键却输入文字 | 光标仍在搜索框、文本框或数值字段 | 按 `Esc`，点击建模区后重试 |
| 按数字没有切换工具 | 数字被测量框接收 | SketchUp 默认不允许数字作为普通单键快捷键 |
| 组合键无反应 | 被操作系统、输入法、浏览器或扩展占用 | 检查系统快捷键和 Preferences |
| 快捷键变成别的命令 | 导入了自定义 `.dat` 或插件重绑定 | 在 Shortcuts 中搜索该键 |
| macOS 与 Windows 修饰键不一致 | 工具逻辑不是机械互换 | 查本文对应工具行或状态栏 |
| Web 版桌面键无反应 | 浏览器拦截或 Web 键位不同 | 查看 Web 差异表 |
| 圆弧 `+/-` 无反应 | 键盘布局不同 | 尝试主键盘、数字键盘或看状态栏 |
| Shift 锁定失败 | 尚未取得有效推断 | 先悬停目标边/轴/面，出现提示后再按住 |
| 阵列语法无效 | 尚未完成第一份复制或已切换工具 | 先完成复制，再输入 `nx` / `n/` |

### 28.2 容易被旧资料写错的项目

| 项目 | 2026 建议 |
|---|---|
| 桌面 Zoom Extents | 默认 `Shift+Z` |
| Web Zoom Extents | 当前扩展工具集列为 `Ctrl/Command+Shift+E` |
| Search | 桌面 `Shift+S`；Web 还可用 `?` |
| Orbit 关闭重力/相机滚转 | Windows `Ctrl`，macOS `Option` |
| Line 锁当前方向 | `Shift`；`Alt` / `Command` 是线性推断模式切换 |
| Eraser 柔化 | Windows `Ctrl`，macOS `Option` |
| Eraser 取消柔化 | Windows `Alt`，macOS `Command` |
| Move / Rotate / Scale 复制 | Windows `Ctrl`，macOS `Option` |
| Windows 快捷键导入/导出 | 支持 `.dat` |
| macOS 快捷键导入/导出 | 官方当前说明为不支持传统导入/导出 |
| Web 自定义快捷键 | 当前支持，但 `Ctrl` / `Command` 不能用于自定义组合 |

### 28.3 发生疑问时的核对顺序

1. 先看窗口底部状态栏。
2. 打开 Search，搜索命令并查看显示的键位。
3. 打开 Preferences > Shortcuts，检查是否被重分配。
4. 暂时停用可能抢占按键的扩展。
5. 检查操作系统、输入法和键盘布局。
6. 对照当前版本的官方 Quick Reference Card。
7. 必要时执行 Reset All，再逐项恢复自定义键位。

---

## 29. 官方资料与补充来源

### 29.1 主要官方资料

1. [SketchUp 2026 默认键盘快捷键](https://help.sketchup.com/en/default-keyboard-shortcuts)
2. [SketchUp 官方快捷键总览](https://help.sketchup.com/en/sketchup/shortcuts)
3. [SketchUp 2026 Quick Reference Cards 下载页](https://help.sketchup.com/en/quick-reference-cards)
4. [SketchUp 2026 Windows Quick Reference Card（PDF）](https://download.sketchup.com/QRC2026/HC-QRC2026-en-SU-windows.pdf)
5. [SketchUp 2026 macOS Quick Reference Card（PDF）](https://download.sketchup.com/QRC2026/HC-QRC2026-en-SU-mac.pdf)
6. [LayOut 2026 Windows Quick Reference Card（PDF）](https://download.sketchup.com/QRC2026/HC-QRC2026-en-LO-windows.pdf)
7. [LayOut 2026 macOS Quick Reference Card（PDF）](https://download.sketchup.com/QRC2026/HC-QRC2026-en-LO-mac.pdf)
8. [创建和编辑快捷键](https://help.sketchup.com/en/creating-and-editing-shortcuts)
9. [导入和导出快捷键](https://help.sketchup.com/en/importing-and-exporting-shortcuts)
10. [SketchUp for Web 快捷键](https://help.sketchup.com/en/sketchup-web-shortcuts)
11. [SketchUp for Web Expanded Toolset](https://help.sketchup.com/en/sketchup-web/sketchup-web-expanded-toolbar)
12. [SketchUp for Web 搜索工具与命令](https://help.sketchup.com/en/sketchup-web/search-tools-and-commands)

### 29.2 官方工具操作资料

- [绘图基础、推断和方向锁定](https://help.sketchup.com/en/sketchup/introducing-drawing-basics-and-concepts)
- [选择几何体](https://help.sketchup.com/en/sketchup/selecting-geometry)
- [绘制基本形状](https://help.sketchup.com/en/sketchup/drawing-basic-shapes)
- [绘制圆弧](https://help.sketchup.com/en/sketchup/drawing-arcs)
- [绘制手绘形状](https://help.sketchup.com/en/sketchup/drawing-freehand-shapes)
- [推拉形状](https://help.sketchup.com/en/sketchup/pushing-and-pulling-shapes-3d)
- [使用测量框](https://help.sketchup.com/en/using-measurements-box)
- [缩放模型或模型的一部分](https://help.sketchup.com/en/sketchup/scaling-your-model-or-parts-your-model)
- [翻转、镜像、旋转和阵列](https://help.sketchup.com/en/sketchup/flipping-mirroring-rotating-and-arrays)
- [查看模型](https://help.sketchup.com/en/sketchup/viewing-model)
- [在模型中漫游](https://help.sketchup.com/en/sketchup/walking-through-model)
- [控制标签可见性](https://help.sketchup.com/en/sketchup/controlling-visibility-tags)
- [分类对象](https://help.sketchup.com/en/sketchup/classifying-objects-sketchup)
- [吸附点](https://help.sketchup.com/en/sketchup/snaps)
- [柔化、平滑与隐藏几何体](https://help.sketchup.com/en/sketchup/softening-smoothing-and-hiding-geometry)
- [删除与撤销](https://help.sketchup.com/en/sketchup/erasing-and-undoing)
- [LayOut 选择对象](https://help.sketchup.com/en/layout/selecting-things)
- [LayOut 添加和编辑快捷键](https://help.sketchup.com/en/layout/adding-and-editing-keyboard-shortcuts)

### 29.3 使用建议

- 将本文作为默认键位基线，不要替代应用内状态栏。
- 第一次自定义前先导出 Windows 快捷键备份。
- 团队共享键位时，同时记录 SketchUp 版本、操作系统、语言和插件清单。
- 新版本升级后，优先查看新版 Quick Reference Card，再迁移自定义方案。

---

## 速记卡

```text
核心工具：
Space 选择   B 材质   E 橡皮擦   L 直线   R 矩形
C 圆        A 两点弧 M 移动     P 推拉   Q 旋转
S 缩放      F 偏移   T 卷尺     O 环绕   H 平移
Z 缩放      Shift+Z 充满视窗    G 创建组件
K 后边线    Shift+S 搜索         Shift+Space 套索

方向锁定：
↑ 蓝轴   → 红轴   ← 绿轴   ↓ 平行/垂直
Shift 锁定当前推断

复制：
Windows Ctrl   macOS Option

阵列：
nX / n*  外部等距复制
n/       原件与复制件之间等分

精确输入：
长度 Enter
长,宽 Enter
角度 Enter
rise:run Enter
24s Enter（分段）
500r Enter（半径）
```

