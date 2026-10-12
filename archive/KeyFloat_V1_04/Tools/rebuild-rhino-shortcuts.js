#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const dataFiles = [
  path.join(projectRoot, "KeyFloat", "professional-shortcuts-mac.json"),
  path.join(projectRoot, "KeyFloat", "curated-shortcuts-mac.json"),
];

function shortcut(id, keys, zh, en, tags = [], localizedKeys = {}) {
  return {
    id: `rhino.${id}`,
    keys,
    ...(localizedKeys.zh ? { keysZh: localizedKeys.zh } : {}),
    ...(localizedKeys.en ? { keysEn: localizedKeys.en } : {}),
    zh,
    en,
    tags,
  };
}

function gesture(id, keysEn, keysZh, zh, en, tags = []) {
  return shortcut(id, keysEn, zh, en, tags, { zh: keysZh, en: keysEn });
}

function command(id, name, zh, en, tags = []) {
  return shortcut(id, [name, "Space"], zh, en, ["Rhino command", name, ...tags]);
}

function category(id, zh, en, items) {
  return { id: `rhino.${id}`, zh, en, items };
}

const rhino = {
  id: "rhino",
  name: "Rhino",
  vendor: "McNeel",
  accent: "#777777",
  glyph: "R",
  bundleIdentifiers: ["com.mcneel.rhinoceros"],
  group: "architecture",
  dataStatus: "curated",
  categories: [
    category("file-window", "文件与窗口", "File & Window", [
      shortcut("file.new", ["⌘", "N"], "新建文件", "Create a new document", ["file", "New"]),
      shortcut("file.new-template", ["⇧", "⌘", "N"], "使用模板新建文件", "Create a new document from a template", ["file", "template"]),
      shortcut("file.open", ["⌘", "O"], "打开文件", "Open a document", ["file", "Open"]),
      shortcut("file.save", ["⌘", "S"], "保存文件", "Save the document", ["file", "Save"]),
      shortcut("file.save-as", ["⌥", "⇧", "⌘", "S"], "另存为", "Save the document as", ["file", "SaveAs"]),
      shortcut("file.duplicate", ["⇧", "⌘", "S"], "复制当前文档", "Duplicate the current document", ["file", "duplicate"]),
      shortcut("file.print", ["⌘", "P"], "打印", "Print the document", ["file", "Print"]),
      shortcut("app.quit", ["⌘", "Q"], "退出 Rhino", "Quit Rhino", ["application"]),
      shortcut("window.close", ["⌘", "W"], "关闭当前窗口", "Close the current window", ["window"]),
      shortcut("window.close-all", ["⌥", "⌘", "W"], "关闭所有窗口", "Close all windows", ["window"]),
      shortcut("window.minimize", ["⌘", "M"], "最小化窗口", "Minimize the window", ["window"]),
      shortcut("app.settings", ["⌘", ","], "打开 Rhino 设置", "Open Rhino Settings", ["settings", "preferences"]),
      shortcut("window.full-screen", ["⌃", "⌘", "F"], "进入或退出全屏", "Enter or exit full screen", ["window", "full screen"]),
    ]),

    category("edit-objects", "编辑与对象", "Edit & Objects", [
      shortcut("edit.select-all", ["⌘", "A"], "全选", "Select all objects", ["edit", "SelAll"]),
      shortcut("edit.copy-clipboard", ["⌘", "C"], "复制到剪贴板", "Copy to the Clipboard", ["edit", "CopyToClipboard"]),
      shortcut("edit.cut", ["⌘", "X"], "剪切", "Cut the selection", ["edit", "Cut"]),
      shortcut("edit.paste", ["⌘", "V"], "粘贴", "Paste from the Clipboard", ["edit", "Paste"]),
      shortcut("edit.undo", ["⌘", "Z"], "撤销", "Undo the last action", ["edit", "Undo"]),
      shortcut("edit.redo", ["⇧", "⌘", "Z"], "重做", "Redo the last action", ["edit", "Redo"]),
      shortcut("edit.delete", ["⌘", "Delete"], "删除选中对象", "Delete selected objects", ["edit", "Delete"]),
      shortcut("object.block", ["⌘", "B"], "创建块", "Create a block", ["object", "Block"]),
      shortcut("object.insert", ["⌘", "I"], "插入文件或块", "Insert a file or block", ["object", "Insert"]),
      shortcut("object.join", ["⌘", "J"], "连接对象", "Join objects", ["object", "Join"]),
      shortcut("object.group", ["⌘", "G"], "编组", "Group objects", ["object", "Group"]),
      shortcut("object.ungroup", ["⇧", "⌘", "G"], "取消编组", "Ungroup objects", ["object", "Ungroup"]),
      shortcut("object.lock", ["⌘", "L"], "锁定选中对象", "Lock selected objects", ["object", "Lock"]),
      shortcut("object.unlock-selected", ["⇧", "⌘", "L"], "解锁选中对象", "Unlock selected objects", ["object", "UnlockSelected"]),
      shortcut("object.unlock-all", ["⌥", "⌘", "L"], "解锁全部对象", "Unlock all objects", ["object", "Unlock"]),
      shortcut("object.hide", ["⌥", "H"], "隐藏选中对象", "Hide selected objects", ["object", "Hide"]),
      shortcut("object.show-selected", ["⌥", "⇧", "H"], "显示指定隐藏对象", "Show selected hidden objects", ["object", "ShowSelected"]),
      shortcut("object.show-all", ["⌃", "⌥", "H"], "显示全部隐藏对象", "Show all hidden objects", ["object", "Show"]),
      shortcut("app.hide", ["⌘", "H"], "隐藏 Rhino 应用", "Hide the Rhino application", ["application"]),
      shortcut("app.hide-others", ["⌥", "⌘", "H"], "隐藏其他应用", "Hide other applications", ["application"]),
      shortcut("object.trim", ["⌘", "T"], "修剪对象", "Trim objects", ["object", "Trim"]),
      shortcut("object.split", ["⌃", "⇧", "S"], "分割对象", "Split objects", ["object", "Split"]),
      shortcut("command.search", ["⌘", "K"], "搜索命令", "Search commands", ["command", "search"]),
      shortcut("help.topics", ["⌘", "?"], "打开帮助主题", "Open Help topics", ["help"]),
    ]),

    category("panels-tools", "侧栏、面板与工具", "Sidebars, Panels & Tools", [
      shortcut("panel.left-sidebar", ["⌘", "0"], "显示或隐藏左侧栏", "Show or hide the left sidebar", ["panel", "sidebar"]),
      shortcut("panel.right-sidebar", ["⌥", "⌘", "0"], "显示或隐藏右侧栏", "Show or hide the right sidebar", ["panel", "sidebar"]),
      shortcut("panel.layers", ["⌃", "L"], "显示或隐藏图层面板", "Show or hide the Layers panel", ["panel", "layers"]),
      shortcut("panel.osnap", ["⌃", "U"], "显示或隐藏对象捕捉面板", "Show or hide the Osnap panel", ["panel", "object snap"]),
      shortcut("panel.osnap-pointer", ["⌃", "⌥", "U"], "在指针位置显示对象捕捉面板", "Show the Osnap panel under the pointer", ["panel", "object snap"]),
      shortcut("panel.active-tools", ["⌥", "⇧", "⌘", "K"], "显示或隐藏活动工具面板", "Show or hide active tool palettes", ["panel", "tool palettes"]),
      shortcut("panel.characters", ["⌥", "⌘", "T"], "打开字符面板", "Open the Character palette", ["panel", "characters"]),
      shortcut("text.spelling-grammar", ["⌘", ":"], "显示拼写和语法", "Show Spelling and Grammar", ["text", "spelling"]),
      shortcut("text.check-spelling", ["⌘", ";"], "检查拼写", "Check spelling", ["text", "spelling"]),
    ]),

    category("viewports-display", "视口与显示", "Viewports & Display", [
      shortcut("viewport.maximize", ["⌥", "⌘", "M"], "最大化或恢复当前视口", "Maximize or restore the active viewport", ["viewport", "MaxViewport"]),
      shortcut("viewport.top", ["⌘", "F1"], "最大化顶视图", "Maximize the Top viewport", ["viewport", "Top"]),
      shortcut("viewport.front", ["⌘", "F2"], "最大化前视图", "Maximize the Front viewport", ["viewport", "Front"]),
      shortcut("viewport.right", ["⌘", "F3"], "最大化右视图", "Maximize the Right viewport", ["viewport", "Right"]),
      shortcut("viewport.perspective", ["⌘", "F4"], "最大化透视视图", "Maximize the Perspective viewport", ["viewport", "Perspective"]),
      shortcut("viewport.zoom-extents", ["⇧", "⌘", "E"], "当前视口缩放至全部对象", "Zoom the active viewport to all objects", ["viewport", "Zoom Extents"]),
      shortcut("viewport.zoom-all-extents", ["⌥", "⌘", "E"], "所有视口缩放至全部对象", "Zoom all viewports to all objects", ["viewport", "Zoom All Extents"]),
      shortcut("display.artistic", ["⌃", "⌘", "A"], "切换为艺术显示模式", "Set Artistic display mode", ["display", "Artistic"]),
      shortcut("display.ghosted", ["⌃", "⌘", "G"], "切换为幽灵显示模式", "Set Ghosted display mode", ["display", "Ghosted"]),
      shortcut("display.pen", ["⌃", "⌘", "P"], "切换为钢笔显示模式", "Set Pen display mode", ["display", "Pen"]),
      shortcut("display.rendered", ["⌃", "⌘", "R"], "切换为渲染显示模式", "Set Rendered display mode", ["display", "Rendered"]),
      shortcut("display.shaded", ["⌃", "⌘", "S"], "切换为着色显示模式", "Set Shaded display mode", ["display", "Shaded"]),
      shortcut("display.technical", ["⌃", "⌘", "T"], "切换为技术显示模式", "Set Technical display mode", ["display", "Technical"]),
      shortcut("display.wireframe", ["⌃", "⌘", "W"], "切换为线框显示模式", "Set Wireframe display mode", ["display", "Wireframe"]),
      shortcut("display.xray", ["⌃", "⌘", "X"], "切换为 X-Ray 显示模式", "Set X-Ray display mode", ["display", "XRay"]),
      shortcut("view.undo", ["Home"], "撤销上一次视图变化", "Undo the last view change", ["view", "UndoView"]),
      shortcut("view.redo", ["End"], "重做上一次视图变化", "Redo the last view change", ["view", "RedoView"]),
      shortcut("cplane.previous", ["⇧", "Home"], "切换到上一个构造平面", "Switch to the previous construction plane", ["CPlane", "Undo"]),
      shortcut("cplane.next", ["⇧", "End"], "切换到下一个构造平面", "Switch to the next construction plane", ["CPlane", "Redo"]),
      shortcut("view.pan-in", ["⌘", "Page Up"], "视图向内平移", "Pan the view inward", ["view", "Pan In"]),
      shortcut("view.pan-out", ["⌘", "Page Down"], "视图向外平移", "Pan the view outward", ["view", "Pan Out"]),
      shortcut("view.lens-in", ["⇧", "Page Up"], "增大镜头焦距", "Increase the camera lens length", ["view", "ZoomLens In"]),
      shortcut("view.lens-out", ["⇧", "Page Down"], "减小镜头焦距", "Decrease the camera lens length", ["view", "ZoomLens Out"]),
      shortcut("view.tilt-left", ["⇧", "⌘", "Page Up"], "向左倾斜视图", "Tilt the view left", ["view", "TiltView Left"]),
      shortcut("view.tilt-right", ["⇧", "⌘", "Page Down"], "向右倾斜视图", "Tilt the view right", ["view", "TiltView Right"]),
      shortcut("autocplane.cycle", ["⌘", "R"], "循环切换自动构造平面对齐模式", "Cycle Auto CPlane alignment modes", ["Rhino 8", "Auto CPlane"]),
      shortcut("autocplane.lock", ["⌘", "1"], "锁定或解锁当前自动构造平面", "Lock or unlock the active Auto CPlane", ["Rhino 8", "Auto CPlane"]),
    ]),

    category("function-modeling-aids", "功能键与建模辅助", "Function Keys & Modeling Aids", [
      shortcut("function.command-history", ["F2"], "打开命令历史", "Open Command History", ["interface", "CommandHistory"]),
      shortcut("function.properties", ["F3"], "打开对象属性", "Open Object Properties", ["interface", "Properties"]),
      shortcut("function.camera", ["F6"], "显示或隐藏相机", "Show or hide the camera", ["view", "Camera"]),
      shortcut("function.grid", ["F7"], "显示或隐藏网格", "Show or hide the grid", ["view", "ShowGrid"]),
      shortcut("function.ortho", ["F8"], "切换正交模式", "Toggle Ortho mode", ["modeling aid", "Ortho"]),
      shortcut("function.snap", ["F9"], "切换网格捕捉", "Toggle grid snap", ["modeling aid", "Snap"]),
      shortcut("function.points-on", ["F10"], "打开控制点", "Turn control points on", ["control point", "PointsOn"]),
      shortcut("function.points-off", ["F11"], "关闭控制点", "Turn control points off", ["control point", "PointsOff"]),
    ]),

    category("navigation-nudge", "鼠标导航与微移", "Mouse Navigation & Nudge", [
      gesture("nav.rotate-perspective", ["Right-drag"], ["右键拖动"], "旋转透视视图", "Rotate a perspective view", ["mouse", "viewport"]),
      gesture("nav.pan-parallel", ["Right-drag"], ["右键拖动"], "平移平行视图", "Pan a parallel view", ["mouse", "viewport"]),
      gesture("nav.pan-any", ["⇧", "Right-drag"], ["⇧", "右键拖动"], "平移任意视图", "Pan any view", ["mouse", "viewport"]),
      gesture("nav.constrain-drag", ["⇧", "Right-drag"], ["⇧", "右键拖动"], "将视图旋转或平移约束为水平或垂直方向", "Constrain view rotation or panning horizontally or vertically", ["mouse", "constraint"]),
      gesture("nav.zoom-pointer", ["Mouse wheel"], ["鼠标滚轮"], "以鼠标位置为焦点缩放", "Zoom around the pointer", ["mouse", "zoom"]),
      gesture("nav.zoom-center-drag", ["⌘", "Right-drag vertically"], ["⌘", "右键上下拖动"], "以视图中心为焦点缩放", "Zoom around the view center", ["mouse", "zoom"]),
      gesture("nav.zoom-center-wheel", ["⌘", "Mouse wheel"], ["⌘", "鼠标滚轮"], "以视图中心为焦点缩放", "Zoom around the view center with the wheel", ["mouse", "zoom"]),
      shortcut("nav.zoom-page", ["Page Up / Page Down"], "放大或缩小视图", "Zoom the view in or out", ["view", "zoom"]),
      gesture("nav.dolly-drag", ["⌥", "Right-drag vertically"], ["⌥", "右键上下拖动"], "在透视视图中向内或向外移动", "Dolly in or out in a perspective view", ["mouse", "dolly"]),
      gesture("nav.dolly-wheel", ["⌥", "Mouse wheel"], ["⌥", "鼠标滚轮"], "使用滚轮在透视视图中向内或向外移动", "Dolly in or out with the wheel", ["mouse", "dolly"]),
      gesture("nav.tilt-drag", ["⇧", "⌥", "Right-drag"], ["⇧", "⌥", "右键拖动"], "倾斜视图", "Tilt the view", ["mouse", "TiltView"]),
      gesture("nav.adjust-lens", ["⌘", "⇧", "⌥", "Right-drag"], ["⌘", "⇧", "⌥", "右键拖动"], "调整透视相机镜头焦距", "Adjust the perspective camera lens length", ["mouse", "camera"]),
      gesture("nav.rotate-camera", ["⌘", "⌥", "Right-drag"], ["⌘", "⌥", "右键拖动"], "旋转相机", "Rotate the camera", ["mouse", "RotateCamera"]),
      gesture("nav.rotate-camera-constrained", ["⌘", "⌥", "⇧", "Right-drag"], ["⌘", "⌥", "⇧", "右键拖动"], "水平或垂直约束相机旋转", "Constrain camera rotation horizontally or vertically", ["mouse", "camera", "constraint"]),
      gesture("nav.force-parallel-rotate", ["⌘", "⇧", "Right-drag"], ["⌘", "⇧", "右键拖动"], "强制旋转平行视图", "Force a parallel view to rotate", ["mouse", "viewport"]),
      gesture("toolbar.popup", ["Middle click"], ["中键单击"], "显示弹出工具栏", "Show the popup toolbar", ["mouse", "toolbar"]),
      gesture("nudge.view-arrows", ["Arrow keys"], ["方向键"], "在默认模式下旋转透视视图或平移平行视图", "Rotate a perspective view or pan a parallel view in the default mode", ["nudge", "default mode"]),
      gesture("nudge.pan-perspective", ["⇧", "Arrow keys"], ["⇧", "方向键"], "在默认模式下平移透视视图", "Pan a perspective view in the default mode", ["nudge", "default mode"]),
      gesture("nudge.object-default", ["⌥", "Arrow keys"], ["⌥", "方向键"], "在默认模式下微移选中对象", "Nudge selected objects in the default mode", ["nudge", "default mode"]),
      shortcut("nudge.object-z-default", ["⌥", "Page Up / Page Down"], "在默认模式下沿 Z 方向微移选中对象", "Nudge selected objects along Z in the default mode", ["nudge", "default mode"]),
      gesture("nudge.object-mode", ["Arrow keys"], ["方向键"], "在微移模式下微移选中对象", "Nudge selected objects in Nudge mode", ["nudge", "nudge mode"]),
      shortcut("nudge.object-z-mode", ["Page Up / Page Down"], "在微移模式下沿 Z 方向微移选中对象", "Nudge selected objects along Z in Nudge mode", ["nudge", "nudge mode"]),
      gesture("nudge.view-mode", ["⌥", "Arrow keys"], ["⌥", "方向键"], "在微移模式下操作视图", "Manipulate the view in Nudge mode", ["nudge", "nudge mode"]),
      gesture("nudge.command-step", ["⌘", "Nudge key"], ["⌘", "微移键"], "使用设置中的 Command 微移步长", "Use the configured Command nudge distance", ["nudge", "distance"]),
      gesture("nudge.shift-step", ["⇧", "Nudge key"], ["⇧", "微移键"], "使用设置中的 Shift 微移步长", "Use the configured Shift nudge distance", ["nudge", "distance"]),
    ]),

    category("selection", "选择与子对象", "Selection & Sub-objects", [
      gesture("selection.object", ["Left click object"], ["左键单击对象"], "选择对象并替换现有选择", "Select an object and replace the current selection", ["selection", "mouse"]),
      gesture("selection.add", ["⇧", "Left click object"], ["⇧", "左键单击对象"], "将对象加入当前选择", "Add an object to the current selection", ["selection", "mouse"]),
      gesture("selection.remove", ["⌘", "Left click object"], ["⌘", "左键单击对象"], "从当前选择中移除对象", "Remove an object from the current selection", ["selection", "mouse"]),
      gesture("selection.subobject", ["⌘", "⇧", "Left click"], ["⌘", "⇧", "左键单击"], "选择面、边或其他子对象", "Select a face, edge, or other sub-object", ["selection", "sub-object"]),
      gesture("selection.add-box", ["⇧", "Box select"], ["⇧", "框选"], "将框中的对象加入选择", "Add objects in a selection box", ["selection", "box"]),
      gesture("selection.remove-box", ["⌘", "Box select"], ["⌘", "框选"], "从选择中移除框选对象或子对象", "Remove boxed objects or sub-objects from the selection", ["selection", "box"]),
      gesture("selection.subobject-box", ["⌘", "⇧", "Box select"], ["⌘", "⇧", "框选"], "框选子对象", "Box-select sub-objects", ["selection", "sub-object", "box"]),
      gesture("selection.overlap", ["⌥", "Left click"], ["⌥", "左键单击"], "启动重叠对象候选选择", "Open overlapping-object candidate selection", ["selection", "overlap"]),
      gesture("selection.window", ["Drag left to right"], ["从左向右拖框"], "执行窗口选择", "Select only objects fully inside the window", ["selection", "window"]),
      gesture("selection.crossing", ["Drag right to left"], ["从右向左拖框"], "执行交叉选择", "Select objects inside or crossing the window", ["selection", "crossing"]),
      gesture("selection.tangent-chain", ["Double-click tangent curve"], ["双击相切曲线"], "选择相切连续的连接曲线", "Select a tangent chain of joined curves", ["selection", "Rhino 8", "curve"]),
      gesture("selection.remove-tangent-chain", ["⌘", "Double-click curve"], ["⌘", "双击曲线"], "取消选择相切连续的连接曲线", "Deselect a tangent chain of joined curves", ["selection", "Rhino 8", "curve"]),
      gesture("selection.remove-vertex-chain", ["⌘", "⇧", "Double-click selected vertex"], ["⌘", "⇧", "双击已选顶点"], "取消选择整条 SubD 或网格顶点链", "Deselect an entire SubD or mesh vertex chain", ["selection", "Rhino 8", "SubD", "mesh"]),
      shortcut("selection.confirm", ["Space"], "确认选择并继续命令", "Confirm the selection and continue the command", ["selection", "command"]),
    ]),

    category("command-line", "命令行与精确建模", "Command Line & Precision Modeling", [
      shortcut("command.cancel-active", ["Esc"], "取消当前命令", "Cancel the active command", ["command line", "cancel"]),
      shortcut("command.clear-selection", ["Esc"], "在没有活动命令时取消全部选择", "Clear the selection when no command is active", ["command line", "selection"]),
      shortcut("command.points-off", ["Esc"], "关闭控制点或编辑点显示", "Turn off control-point or edit-point display", ["command line", "control point"]),
      shortcut("command.exit-full-screen", ["Esc"], "退出 Rhino 全屏", "Exit Rhino full screen", ["command line", "full screen"]),
      shortcut("command.accept", ["Space"], "接受当前输入或选项", "Accept the current input or option", ["command line", "confirm"]),
      gesture("command.right-click-accept", ["Right click"], ["右键单击"], "确认当前输入或选项", "Accept the current input or option with the right mouse button", ["command line", "confirm"]),
      gesture("command.repeat", ["Right click"], ["右键单击"], "空闲时重复上一命令", "Repeat the previous command when idle", ["command line", "repeat"]),
      shortcut("constraint.temporary-ortho", ["⇧"], "拾取点或绘制时临时切换正交模式", "Temporarily toggle Ortho while picking or drawing", ["constraint", "Ortho"]),
      gesture("constraint.view-axis", ["⇧", "Right-drag"], ["⇧", "右键拖动"], "将视图或相机旋转约束为水平或垂直方向", "Constrain view or camera rotation horizontally or vertically", ["constraint", "view"]),
      shortcut("constraint.direction-lock", ["Tab"], "锁定当前光标移动方向", "Lock the current cursor direction", ["constraint", "direction"]),
      shortcut("constraint.circular-lock", ["Tab", "Tab"], "启用圆形方向锁定或锁定半径", "Enable circular direction lock or lock a radius", ["constraint", "direction"]),
      shortcut("subd.toggle-display", ["Tab"], "切换 SubD 平滑与盒状显示", "Toggle SubD smooth and box display", ["SubD", "display"]),
      gesture("elevator.start", ["⌘", "Left click"], ["⌘", "左键单击"], "拾取点时启动垂直模式", "Start Elevator mode while picking a point", ["modeling aid", "Elevator"]),
      gesture("elevator.drag", ["⌘", "Drag object"], ["⌘", "拖动对象"], "沿构造平面法线方向拖动对象", "Drag an object along the construction-plane normal", ["modeling aid", "Elevator"]),
      gesture("copy.drag", ["⌥", "Tap while dragging"], ["⌥", "拖动时轻按"], "拖动对象时复制", "Copy an object while dragging", ["copy", "drag"]),
      shortcut("copy.option", ["⌥"], "切换命令行复制选项", "Toggle the command-line Copy option", ["command line", "Copy"]),
      shortcut("curve.pause-auto-close", ["⌥"], "暂停多段线或曲线自动闭合", "Pause automatic closing for polylines and curves", ["curve", "Polyline", "InterpCrv"]),
      shortcut("coordinate.origin", ["0"], "输入世界或构造平面原点", "Enter the world or construction-plane origin", ["coordinate", "0,0,0"]),
      shortcut("coordinate.cplane", ["x,y,z"], "输入构造平面坐标", "Enter construction-plane coordinates", ["coordinate", "Cartesian"]),
      shortcut("coordinate.world", ["wx,y,z"], "输入世界坐标", "Enter world coordinates", ["coordinate", "world"]),
      shortcut("coordinate.relative", ["@distance / rdistance"], "输入相对坐标或相对距离", "Enter relative coordinates or distance", ["coordinate", "relative"]),
      shortcut("constraint.angle", ["<angle"], "输入角度约束", "Enter an angle constraint", ["constraint", "angle"]),
      shortcut("coordinate.relative-angle", ["@distance<angle"], "同时输入相对距离与角度", "Enter a relative distance and angle", ["coordinate", "relative", "angle"]),
      shortcut("constraint.multiple-distance", ["-distance"], "使用整数倍增量距离约束", "Constrain distance to integer multiples", ["constraint", "distance"]),
      shortcut("command.option-letter", ["Underlined option letter"], "直接选择命令行选项", "Choose a command-line option by its underlined letter", ["command line", "option"]),
    ]),

    category("gumball", "Gumball 操纵器", "Gumball Manipulator", [
      gesture("gumball.numeric", ["Click handle"], ["单击手柄"], "输入移动距离、旋转角度或缩放倍数", "Enter a distance, angle, or scale value", ["Gumball", "numeric"]),
      gesture("gumball.copy-toggle", ["⌥", "Tap while dragging handle"], ["⌥", "拖动手柄时轻按"], "切换 Gumball 复制模式", "Toggle Gumball copy mode", ["Gumball", "copy"]),
      gesture("gumball.copy-numeric", ["⌥", "Click handle"], ["⌥", "单击手柄"], "复制并输入数值", "Copy and enter a numeric value", ["Gumball", "copy"]),
      gesture("gumball.extrude-arrow", ["⌘", "Drag move arrow"], ["⌘", "拖动移动箭头"], "创建封闭挤出", "Create a capped extrusion", ["Gumball", "extrude"]),
      gesture("gumball.extrude-plane", ["⌘", "Drag plane handle"], ["⌘", "拖动平面手柄"], "沿平面方向约束挤出", "Extrude constrained to a plane direction", ["Gumball", "extrude"]),
      gesture("gumball.scale2d", ["⇧", "Drag plane handle"], ["⇧", "拖动平面手柄"], "执行二维等比缩放", "Scale uniformly in two dimensions", ["Gumball", "Scale2D"]),
      gesture("gumball.scale2d-numeric", ["⇧", "Click plane handle"], ["⇧", "单击平面手柄"], "输入二维缩放倍数", "Enter a two-dimensional scale factor", ["Gumball", "Scale2D"]),
      gesture("gumball.straight-loft", ["⌘", "Drag rotation arc"], ["⌘", "拖动旋转弧"], "在起止角度之间直线放样", "Create a straight loft between rotation angles", ["Gumball", "loft"]),
      gesture("gumball.scale3d", ["⇧", "Drag scale handle"], ["⇧", "拖动缩放手柄"], "执行三维等比缩放", "Scale uniformly in three dimensions", ["Gumball", "Scale3D"]),
      gesture("gumball.extrude-scale", ["⌘", "Drag scale handle"], ["⌘", "拖动缩放手柄"], "向内或向外挤出", "Extrude inward or outward", ["Gumball", "extrude"]),
      gesture("gumball.force-open", ["⌘", "Drag extrude handle"], ["⌘", "拖动挤出手柄"], "强制创建开放挤出", "Force an open extrusion", ["Gumball", "extrude"]),
      gesture("gumball.extrude-both-sides", ["⇧", "Drag extrude handle"], ["⇧", "拖动挤出手柄"], "创建双向挤出", "Extrude in both directions", ["Gumball", "extrude"]),
      gesture("gumball.extend-plane", ["⇧", "Drag extrude handle"], ["⇧", "拖动挤出手柄"], "延伸或缩短相邻平面", "Extend or shorten an adjacent planar face", ["Gumball", "surface"]),
      gesture("gumball.boss", ["⌘", "Drag cut handle"], ["⌘", "拖动切割手柄"], "执行凸台或布尔并集式添加", "Create a boss or Boolean-union addition", ["Gumball", "Boolean"]),
      gesture("gumball.cut-both-sides", ["⇧", "Drag cut handle"], ["⇧", "拖动切割手柄"], "执行双向切割或挤出", "Cut or extrude in both directions", ["Gumball", "cut"]),
      gesture("gumball.relocate", ["Double-click handle"], ["双击手柄"], "移动、旋转或缩放 Gumball 本身", "Move, rotate, or scale the Gumball itself", ["Gumball", "relocate"]),
      gesture("gumball.relocate-numeric", ["⌘", "Double-click handle"], ["⌘", "双击手柄"], "以数值移动、旋转或缩放 Gumball 本身", "Move, rotate, or scale the Gumball numerically", ["Gumball", "relocate"]),
      shortcut("gumball.reverse-space", ["⇧", "Space"], "输入移动距离时反方向移动", "Move in the opposite direction after entering a distance", ["Gumball", "direction"]),
      shortcut("gumball.reverse-tab", ["⇧", "Tab"], "输入移动距离时反方向移动", "Move in the opposite direction with Tab after entering a distance", ["Gumball", "direction"]),
      gesture("gumball.reverse-rmb", ["⇧", "Right click"], ["⇧", "右键单击"], "输入移动距离时反方向移动", "Move in the opposite direction with the right mouse button", ["Gumball", "direction"]),
      gesture("gumball.menu", ["Hold and release right button"], ["按住并释放右键"], "打开 Gumball 菜单", "Open the Gumball menu", ["Gumball", "menu"]),
    ]),

    category("object-snaps", "对象捕捉与点过滤", "Object Snaps & Point Filters", [
      shortcut("osnap.temporary-toggle", ["⌥"], "拾取点时临时反转对象捕捉状态", "Temporarily invert object snaps while picking a point", ["Osnap", "temporary"]),
      gesture("osnap.one-shot", ["⇧", "Click Osnap"], ["⇧", "单击捕捉项"], "使用一次性对象捕捉", "Use a one-shot object snap", ["Osnap", "one-shot"]),
      gesture("osnap.isolate", ["Right click Osnap"], ["右键单击捕捉项"], "仅启用指定对象捕捉", "Enable only the selected object snap", ["Osnap", "isolate"]),
      gesture("osnap.toggle-all", ["Right click Disable"], ["右键单击禁用项"], "启用或禁用全部持久对象捕捉", "Enable or disable all persistent object snaps", ["Osnap", "Disable"]),
      gesture("osnap.drag-from", ["Hold 0.25 s and drag"], ["按住左键约 0.25 秒后拖动"], "从捕捉位置开始拖动", "Start dragging from a snapped location", ["Osnap", "drag"]),
      command("osnap.end", "End / E", "捕捉到端点", "Snap to an endpoint", ["Osnap", "endpoint"]),
      command("osnap.near", "Near", "捕捉到最近点", "Snap to the nearest point", ["Osnap", "near"]),
      command("osnap.mid", "Mid / Midpoint / MidPt", "捕捉到中点", "Snap to a midpoint", ["Osnap", "midpoint"]),
      command("osnap.center", "Cen / Center", "捕捉到圆心或中心", "Snap to a center", ["Osnap", "center"]),
      command("osnap.intersection", "Int / Intersection", "捕捉到交点", "Snap to an intersection", ["Osnap", "intersection"]),
      command("osnap.perpendicular", "Perp / Perpendicular", "捕捉到垂直点", "Snap perpendicular to an object", ["Osnap", "perpendicular"]),
      command("osnap.tangent", "Tan / Tangent", "捕捉到切点", "Snap tangent to an object", ["Osnap", "tangent"]),
      command("osnap.quadrant", "Quad / Quadrant", "捕捉到象限点", "Snap to a quadrant", ["Osnap", "quadrant"]),
      command("osnap.knot", "Knot", "捕捉到节点", "Snap to a knot", ["Osnap", "knot"]),
      command("osnap.point", "Point / Pt", "捕捉到点对象", "Snap to a point object", ["Osnap", "point"]),
      command("osnap.on-curve", "OnCrv / OnCurve", "约束到曲线上", "Constrain the pick to a curve", ["Osnap", "curve"]),
      command("osnap.on-surface", "OnSrf / OnSurface", "约束到曲面上", "Constrain the pick to a surface", ["Osnap", "surface"]),
      command("osnap.on-polysurface", "OnPolySrf / OnPolySurface", "约束到多重曲面上", "Constrain the pick to a polysurface", ["Osnap", "polysurface"]),
      command("osnap.no-snap", "NoSnap", "下一次拾取不使用持久对象捕捉", "Disable persistent object snaps for the next pick", ["Osnap", "temporary"]),
      command("osnap.from", "From / BasePoint", "从指定基点开始", "Start from a specified base point", ["Osnap", "base point"]),
      command("osnap.between", "Between", "捕捉到两点之间", "Snap between two points", ["Osnap", "between"]),
      command("osnap.along", "Along", "沿指定方向约束", "Constrain along a specified direction", ["Osnap", "direction"]),
      command("osnap.along-perpendicular", "AlongPerp / PerpFrom", "沿垂直方向约束", "Constrain along a perpendicular direction", ["Osnap", "perpendicular"]),
      command("osnap.along-tangent", "AlongTan / TanFrom", "沿切线方向约束", "Constrain along a tangent direction", ["Osnap", "tangent"]),
      command("osnap.along-parallel", "AlongParallel", "沿平行方向约束", "Constrain along a parallel direction", ["Osnap", "parallel"]),
      command("osnap.infinite-plane", "IP / InfinitePlane", "启用无限平面选择", "Enable infinite-plane picking", ["Osnap", "plane"]),
      command("filter.single-axis", ".x / .y / .z", "使用单轴点过滤", "Use a single-axis point filter", ["point filter", "axis"]),
      command("filter.multi-axis", ".xy / .yz / .zx", "使用多轴点过滤", "Use a multi-axis point filter", ["point filter", "axis"]),
    ]),

    category("layers", "图层面板", "Layers Panel", [
      shortcut("layer.previous", ["↑"], "向上移动图层选择", "Move the layer selection up", ["layers", "panel"]),
      shortcut("layer.next", ["↓"], "向下移动图层选择", "Move the layer selection down", ["layers", "panel"]),
      shortcut("layer.page-up", ["Page Up"], "图层选择向上移动一页", "Move the layer selection up one page", ["layers", "panel"]),
      shortcut("layer.page-down", ["Page Down"], "图层选择向下移动一页", "Move the layer selection down one page", ["layers", "panel"]),
      shortcut("layer.first", ["Home"], "移至第一个图层", "Move to the first layer", ["layers", "panel"]),
      shortcut("layer.last", ["End"], "移至最后一个图层", "Move to the last layer", ["layers", "panel"]),
      gesture("layer.add-selection", ["⌘", "Click layer"], ["⌘", "单击图层"], "添加单个图层到选择", "Add one layer to the selection", ["layers", "selection"]),
      gesture("layer.range-selection", ["⇧", "Click layer"], ["⇧", "单击图层"], "选择连续范围的图层", "Select a continuous range of layers", ["layers", "selection"]),
      shortcut("layer.rename", ["F2"], "重命名选中图层", "Rename the selected layer", ["layers", "rename"]),
      shortcut("layer.refresh", ["F5"], "刷新图层列表", "Refresh the layer list", ["layers", "refresh"]),
      shortcut("layer.insert", ["Insert"], "在选中图层下方新建图层", "Create a layer below the selected layer", ["layers", "Rhino 8"]),
      shortcut("layer.accept-new-tab", ["Tab"], "接受当前图层名称并新建图层", "Accept the layer name and create another layer", ["layers", "edit name"]),
      shortcut("layer.accept-new-insert", ["Insert"], "编辑名称时接受当前名称并新建图层", "Accept the layer name and create another layer while editing", ["layers", "edit name"]),
      shortcut("layer.expand", ["+"], "展开选中图层", "Expand the selected layer", ["layers", "expand"]),
      shortcut("layer.expand-all-command", ["⌘", "Numpad +"], "展开选中图层的全部子图层", "Expand all child layers", ["layers", "expand"]),
      shortcut("layer.expand-all-shift", ["⇧", "Numpad +"], "展开选中图层的全部子图层", "Expand all child layers with Shift", ["layers", "expand"]),
      shortcut("layer.collapse", ["-"], "折叠选中图层", "Collapse the selected layer", ["layers", "collapse"]),
      shortcut("layer.collapse-all-command", ["⌘", "Numpad -"], "折叠选中图层的全部子图层", "Collapse all child layers", ["layers", "collapse"]),
      shortcut("layer.collapse-all-shift", ["⇧", "Numpad -"], "折叠选中图层的全部子图层", "Collapse all child layers with Shift", ["layers", "collapse"]),
    ]),

    category("curve-commands", "曲线绘制指令", "Curve Drawing Commands", [
      command("command.line", "Line", "绘制直线", "Draw a line", ["curve", "draw"]),
      command("command.polyline", "Polyline", "绘制多段线", "Draw a polyline", ["curve", "draw"]),
      command("command.rectangle", "Rectangle", "绘制矩形", "Draw a rectangle", ["curve", "draw"]),
      command("command.circle", "Circle", "绘制圆", "Draw a circle", ["curve", "draw"]),
      command("command.arc", "Arc", "绘制圆弧", "Draw an arc", ["curve", "draw"]),
      command("command.curve", "Curve", "绘制控制点曲线", "Draw a control-point curve", ["curve", "draw"]),
      command("command.interp-crv", "InterpCrv", "绘制插值点曲线", "Draw an interpolated curve", ["curve", "draw"]),
      command("command.polygon", "Polygon", "绘制多边形", "Draw a polygon", ["curve", "draw"]),
      command("command.ellipse", "Ellipse", "绘制椭圆", "Draw an ellipse", ["curve", "draw"]),
      command("command.helix", "Helix", "绘制螺旋线", "Draw a helix", ["curve", "draw"]),
    ]),

    category("transform-commands", "变换与编辑指令", "Transform & Edit Commands", [
      command("command.move", "Move", "移动对象", "Move objects", ["transform"]),
      command("command.copy", "Copy", "复制对象", "Copy objects", ["transform"]),
      command("command.rotate", "Rotate", "二维旋转对象", "Rotate objects in two dimensions", ["transform"]),
      command("command.rotate3d", "Rotate3D", "三维旋转对象", "Rotate objects in three dimensions", ["transform"]),
      command("command.scale", "Scale", "三维缩放对象", "Scale objects in three dimensions", ["transform"]),
      command("command.scale1d", "Scale1D", "单轴缩放对象", "Scale objects in one dimension", ["transform"]),
      command("command.scale2d", "Scale2D", "二维缩放对象", "Scale objects in two dimensions", ["transform"]),
      command("command.mirror", "Mirror", "镜像对象", "Mirror objects", ["transform"]),
      command("command.array", "Array", "创建矩形阵列", "Create a rectangular array", ["transform", "array"]),
      command("command.array-polar", "ArrayPolar", "创建环形阵列", "Create a polar array", ["transform", "array"]),
      command("command.align", "Align", "对齐对象", "Align objects", ["transform"]),
      command("command.offset", "Offset", "偏移对象", "Offset objects", ["edit"]),
      command("command.extend", "Extend", "延伸对象", "Extend objects", ["edit"]),
      command("command.fillet", "Fillet", "为曲线创建圆角", "Fillet curves", ["edit", "curve"]),
      command("command.chamfer", "Chamfer", "为曲线创建倒角", "Chamfer curves", ["edit", "curve"]),
      command("command.explode", "Explode", "炸开或分解对象", "Explode objects", ["edit"]),
    ]),

    category("surface-solid-commands", "曲面、实体与布尔指令", "Surface, Solid & Boolean Commands", [
      command("command.extrude-crv", "ExtrudeCrv", "挤出曲线", "Extrude curves", ["surface", "solid"]),
      command("command.extrude-srf", "ExtrudeSrf", "挤出曲面", "Extrude surfaces", ["surface", "solid"]),
      command("command.loft", "Loft", "创建放样曲面", "Create a lofted surface", ["surface"]),
      command("command.sweep1", "Sweep1", "创建单轨扫掠曲面", "Create a one-rail sweep", ["surface"]),
      command("command.sweep2", "Sweep2", "创建双轨扫掠曲面", "Create a two-rail sweep", ["surface"]),
      command("command.revolve", "Revolve", "旋转成形", "Revolve a profile", ["surface", "solid"]),
      command("command.planar-srf", "PlanarSrf", "从平面曲线创建曲面", "Create a surface from planar curves", ["surface"]),
      command("command.edge-srf", "EdgeSrf", "从边界曲线创建曲面", "Create a surface from edge curves", ["surface"]),
      command("command.patch", "Patch", "创建嵌面", "Create a patch surface", ["surface"]),
      command("command.offset-srf", "OffsetSrf", "偏移曲面", "Offset a surface", ["surface"]),
      command("command.fillet-srf", "FilletSrf", "创建曲面圆角", "Fillet surfaces", ["surface"]),
      command("command.fillet-edge", "FilletEdge", "创建实体边缘圆角", "Fillet solid edges", ["solid"]),
      command("command.blend-srf", "BlendSrf", "创建混接曲面", "Blend surfaces", ["surface"]),
      command("command.cap", "Cap", "封闭平面洞口", "Cap planar holes", ["surface", "solid"]),
      command("command.shell", "Shell", "为实体抽壳", "Shell a solid", ["solid"]),
      command("command.boolean-union", "BooleanUnion", "执行布尔并集", "Boolean union", ["solid", "Boolean"]),
      command("command.boolean-difference", "BooleanDifference", "执行布尔差集", "Boolean difference", ["solid", "Boolean"]),
      command("command.boolean-intersection", "BooleanIntersection", "执行布尔交集", "Boolean intersection", ["solid", "Boolean"]),
    ]),

    category("analysis-commands", "分析与检查指令", "Analysis & Inspection Commands", [
      command("command.distance", "Distance", "测量距离", "Measure distance", ["analysis", "measure"]),
      command("command.length", "Length", "测量长度", "Measure length", ["analysis", "measure"]),
      command("command.area", "Area", "计算面积", "Calculate area", ["analysis", "measure"]),
      command("command.volume", "Volume", "计算体积", "Calculate volume", ["analysis", "measure"]),
      command("command.radius", "Radius", "测量半径", "Measure radius", ["analysis", "measure"]),
      command("command.angle", "Angle", "测量角度", "Measure angle", ["analysis", "measure"]),
      command("command.show-edges", "ShowEdges", "显示裸边或非流形边", "Show naked or non-manifold edges", ["analysis", "edge"]),
      command("command.check", "Check", "检查对象", "Check objects", ["analysis", "inspect"]),
      command("command.dir", "Dir", "查看或修改对象方向", "View or modify object direction", ["analysis", "direction"]),
      command("command.what", "What", "查看对象信息", "View object information", ["analysis", "inspect"]),
    ]),
  ],
  provenance: {
    sourceURL: "https://docs.mcneel.com/rhino/8/help/en-us/user_interface/shortcuts.htm",
    sourceTitle: "Rhino 8 official shortcuts, modifiers, Gumball, object snaps, layers, and command reference",
    appVersion: "Rhino 8.33 for macOS",
    verifiedAt: "2026-07-25",
    coverage: "curated-comprehensive-defaults",
    platform: "macOS",
  },
};

function findSoftwareObjectRange(source, id) {
  const marker = new RegExp(`\\"id\\"\\s*:\\s*\\"${id}\\"`, "g");
  const match = marker.exec(source);
  if (!match) throw new Error(`Could not find software '${id}'.`);

  let start = source.lastIndexOf("{", match.index);
  if (start < 0) throw new Error(`Could not find the start of '${id}'.`);

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return { start, end: index + 1 };
    }
  }
  throw new Error(`Could not find the end of '${id}'.`);
}

function lineIndent(source, offset) {
  const lineStart = source.lastIndexOf("\n", offset) + 1;
  return source.slice(lineStart, offset).match(/^\s*/)[0];
}

for (const file of dataFiles) {
  const source = fs.readFileSync(file, "utf8");
  const range = findSoftwareObjectRange(source, "rhino");
  const indent = lineIndent(source, range.start);
  const formatted = JSON.stringify(rhino, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `${indent}${line}`))
    .join("\n");
  const updated = source.slice(0, range.start) + formatted + source.slice(range.end);
  JSON.parse(updated);
  fs.writeFileSync(file, updated);
  console.log(`Updated ${path.relative(projectRoot, file)}`);
}

const itemCount = rhino.categories.reduce((total, section) => total + section.items.length, 0);
console.log(`Rhino now has ${itemCount} entries in ${rhino.categories.length} categories.`);
