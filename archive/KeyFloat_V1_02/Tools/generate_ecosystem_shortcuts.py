#!/usr/bin/env python3
"""Generate KeyFloat's classified ecosystem catalog.

The generator is intentionally deterministic. It preserves software discovery
and classification while keeping all former generic-template shortcuts out of
production until an official macOS key map has been verified. The coverage
report distinguishes native apps from frameworks, services, and Windows-only
software in the planning document.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import OrderedDict
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "KeyFloat" / "ecosystem-shortcuts-mac.json"
COVERAGE = ROOT / "Tools" / "ecosystem-coverage.json"
SOURCE_DOCUMENT = "/Users/hualong/Downloads/工程师设计师常用软件生态库.md"
VERIFIED_AT = "2026-07-21"
QUARANTINED_TEMPLATE_SHORTCUT_COUNT = 3015

LEGACY_RESOURCE_NAMES = [
    "shortcuts-mac.json",
    "office-shortcuts-mac.json",
    "professional-shortcuts-mac.json",
    "productivity-shortcuts-mac.json",
]

LEGACY_PRODUCT_URLS = {
    "figma": "https://www.figma.com/",
    "photoshop": "https://www.adobe.com/products/photoshop.html",
    "illustrator": "https://www.adobe.com/products/illustrator.html",
    "aftereffects": "https://www.adobe.com/products/aftereffects.html",
    "premiere": "https://www.adobe.com/products/premiere.html",
    "blender": "https://www.blender.org/",
    "word": "https://www.microsoft.com/microsoft-365/word",
    "excel": "https://www.microsoft.com/microsoft-365/excel",
    "powerpoint": "https://www.microsoft.com/microsoft-365/powerpoint",
    "outlook": "https://www.microsoft.com/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook",
    "onenote": "https://www.onenote.com/",
    "autocad": "https://www.autodesk.com/products/autocad/overview",
    "sketchup": "https://www.sketchup.com/",
    "rhino": "https://www.rhino3d.com/",
    "fusion360": "https://www.autodesk.com/products/fusion-360/overview",
    "freecad": "https://www.freecad.org/",
    "shapr3d": "https://www.shapr3d.com/",
    "maya": "https://www.autodesk.com/products/maya/overview",
    "cinema4d": "https://www.maxon.net/en/cinema-4d",
    "comsol": "https://www.comsol.com/comsol-multiphysics",
    "matlab": "https://www.mathworks.com/products/matlab.html",
    "simulink": "https://www.mathworks.com/products/simulink.html",
    "davinci": "https://www.blackmagicdesign.com/products/davinciresolve",
    "vscode": "https://code.visualstudio.com/",
    "xcode": "https://developer.apple.com/xcode/",
    "androidstudio": "https://developer.android.com/studio",
    "intellij": "https://www.jetbrains.com/idea/",
    "jupyter": "https://jupyter.org/",
    "spss": "https://www.ibm.com/products/spss-statistics",
    "rstudio": "https://posit.co/products/open-source/rstudio/",
    "chrome": "https://www.google.com/chrome/",
    "safari": "https://www.apple.com/safari/",
    "notion": "https://www.notion.com/product",
    "obsidian": "https://obsidian.md/",
}

LEGACY_GROUPS = {
    "figma": "design", "photoshop": "design", "illustrator": "design",
    "aftereffects": "media", "premiere": "media", "blender": "modeling",
    "word": "office", "excel": "office", "powerpoint": "office",
    "outlook": "office", "onenote": "office", "autocad": "architecture",
    "sketchup": "architecture", "rhino": "architecture", "fusion360": "engineering",
    "freecad": "engineering", "shapr3d": "engineering", "maya": "modeling",
    "cinema4d": "modeling", "comsol": "simulation", "matlab": "simulation",
    "simulink": "simulation", "davinci": "media", "vscode": "development",
    "xcode": "development", "androidstudio": "development", "intellij": "development",
    "jupyter": "study", "spss": "study", "rstudio": "study",
    "chrome": "browser", "safari": "browser", "notion": "collaboration",
    "obsidian": "study",
}

BUNDLE_IDENTIFIERS: dict[str, list[str]] = {
    "sketch": ["com.bohemiancoding.sketch3"],
    "adobexd": ["com.adobe.xd"],
    "framer": ["com.framer.desktop"],
    "axure": ["com.axure.AxureRP10", "com.axure.AxureRP9"],
    "indesign": ["com.adobe.InDesign"],
    "lightroom": ["com.adobe.LightroomCC", "com.adobe.LightroomClassicCC"],
    "protopie": ["io.protopie.studio"],
    "finalcut": ["com.apple.FinalCut"],
    "zbrush": ["net.maxon.zbrush"],
    "unity": ["com.unity3d.UnityEditor5.x"],
    "unrealengine": ["com.epicgames.UnrealEditor"],
    "logicpro": ["com.apple.logic10"],
    "garageband": ["com.apple.garageband10"],
    "qgis": ["org.qgis.qgis3"],
    "pymol": ["org.pymol.PyMOL"],
    "imagej": ["sc.fiji"],
    "paraview": ["org.paraview.ParaView"],
    "kicad": ["org.kicad.kicad"],
    "arduinoide": ["cc.arduino.IDE2"],
    "mathematica": ["com.wolfram.Mathematica"],
    "cursor": ["com.todesktop.230313mzl4w4u92"],
    "pycharm": ["com.jetbrains.pycharm"],
    "webstorm": ["com.jetbrains.WebStorm"],
    "goland": ["com.jetbrains.goland"],
    "clion": ["com.jetbrains.CLion"],
    "githubdesktop": ["com.github.GitHubClient"],
    "sourcetree": ["com.torusknot.SourceTreeNotMAS", "com.torusknot.SourceTree"],
    "tower": ["com.fournova.Tower3", "com.fournova.Tower"],
    "postman": ["com.postmanlabs.mac"],
    "insomnia": ["com.insomnia.app"],
    "apifox": ["com.apifox.app"],
    "dockerdesktop": ["com.docker.docker"],
    "dbeaver": ["org.jkiss.dbeaver.core.product"],
    "datagrip": ["com.jetbrains.datagrip"],
    "mysqlworkbench": ["com.oracle.workbench.MySQLWorkbench"],
    "pgadmin": ["org.pgadmin.pgadmin4"],
    "mongodbcompass": ["com.mongodb.compass"],
    "redisinsight": ["com.redis.RedisInsight"],
    "tableplus": ["com.tinyapp.TablePlus"],
    "iterm2": ["com.googlecode.iterm2"],
    "warp": ["dev.warp.Warp-Stable"],
    "arc": ["company.thebrowser.Browser"],
    "firefox": ["org.mozilla.firefox"],
    "edge": ["com.microsoft.edgemac"],
    "pages": ["com.apple.iWork.Pages"],
    "numbers": ["com.apple.iWork.Numbers"],
    "keynote": ["com.apple.iWork.Keynote"],
    "preview": ["com.apple.Preview"],
    "pdfexpert": ["com.readdle.PDFExpert-Mac"],
    "zotero": ["org.zotero.zotero"],
    "mendeley": ["com.elsevier.mendeley"],
    "endnote": ["com.ThomsonResearchSoft.EndNote"],
    "anki": ["net.ankiweb.dtop"],
    "goodnotes": ["com.goodnotesapp.x"],
    "texstudio": ["org.texstudio.TeXstudio"],
    "xmind": ["net.xmind.XMind"],
    "mindnode": ["com.ideasoncanvas.mindnode.macos"],
    "miro": ["com.electron.realtimeboard"],
    "teams": ["com.microsoft.teams2", "com.microsoft.teams"],
    "zoom": ["us.zoom.xos"],
    "slack": ["com.tinyspeck.slackmacgap"],
    "discord": ["com.hnc.Discord"],
    "wechat": ["com.tencent.xinWeChat"],
    "raycast": ["com.raycast.macos"],
    "alfred": ["com.runningwithcrayons.Alfred"],
    "cleanshot": ["pl.maketheweb.cleanshotx"],
    "bartender": ["com.surteesstudios.Bartender"],
    "rectangle": ["com.knollsoft.Rectangle"],
    "magnet": ["com.crowdcafe.windowmagnet"],
    "paste": ["com.wiheads.paste"],
    "onepassword": ["com.1password.1password"],
    "chatgpt": ["com.openai.chat"],
    "claude": ["com.anthropic.claudefordesktop"],
    "lmstudio": ["ai.elementlabs.lmstudio"],
    "capcut": ["com.lemon.lv"],
    "audacity": ["org.audacityteam.audacity"],
    "obsstudio": ["com.obsproject.obs-studio"],
    "iina": ["com.colliderli.iina"],
    "vlc": ["org.videolan.vlc"],
    "handbrake": ["fr.handbrake.HandBrake"],
    "wpsoffice": ["com.kingsoft.wpsoffice.mac"],
    "adobeacrobat": ["com.adobe.Acrobat.Pro", "com.adobe.Reader"],
    "evernote": ["com.evernote.Evernote"],
    "ulysses": ["com.soulmen.ulysses3"],
    "scrivener": ["com.literatureandlatte.scrivener3"],
    "dropbox": ["com.getdropbox.dropbox"],
    "onedrive": ["com.microsoft.OneDrive"],
    "tencentmeeting": ["com.tencent.meeting"],
    "dingtalk": ["com.alibaba.DingTalkMac"],
    "qq": ["com.tencent.qq"],
    "eclipse": ["org.eclipse.platform.ide"],
    "sublimetext": ["com.sublimetext.4", "com.sublimetext.3"],
    "calibre": ["net.kovidgoyal.calibre"],
    "deepl": ["com.linguee.DeepLCopyTranslator"],
    "grammarly": ["com.grammarly.ProjectLlama"],
    "todoist": ["com.todoist.mac.Todoist"],
    "ticktick": ["com.TickTick.task.mac"],
    "brave": ["com.brave.Browser"],
}


def shortcut(keys: str, zh: str, en: str, *tags: str) -> dict:
    return {
        "keys": keys.split(),
        "zh": zh,
        "en": en,
        "tags": list(tags) or [en.lower()],
    }


S = shortcut


CATEGORY_TITLES = {
    "general": ("通用", "General"),
    "file": ("文件", "File"),
    "editing": ("编辑", "Editing"),
    "view": ("视图", "View"),
    "navigation": ("导航", "Navigation"),
    "workspace": ("工作区", "Workspace"),
    "objects": ("对象", "Objects"),
    "text": ("文本", "Text"),
    "prototype": ("原型", "Prototype"),
    "timeline": ("时间线", "Timeline"),
    "playback": ("播放", "Playback"),
    "photo": ("照片", "Photo"),
    "layout": ("排版", "Layout"),
    "modeling": ("建模", "Modeling"),
    "rendering": ("渲染", "Rendering"),
    "cad": ("绘图", "CAD"),
    "simulation": ("仿真", "Simulation"),
    "code": ("代码", "Code"),
    "run": ("运行与调试", "Run & Debug"),
    "terminal": ("终端", "Terminal"),
    "browser": ("浏览", "Browsing"),
    "project": ("项目", "Projects"),
    "communication": ("沟通", "Communication"),
    "document": ("文档", "Document"),
    "presentation": ("演示", "Presentation"),
    "spreadsheet": ("表格", "Spreadsheet"),
    "pdf": ("PDF 与批注", "PDF & Annotation"),
    "data": ("数据", "Data"),
    "database": ("数据库", "Database"),
    "api": ("API", "API"),
    "science": ("科研", "Science"),
    "audio": ("音频", "Audio"),
    "utility": ("效率操作", "Utilities"),
    "formatting": ("格式", "Formatting"),
    "slides": ("幻灯片", "Slides"),
    "cells": ("单元格", "Cells"),
    "annotations": ("批注", "Annotations"),
    "library": ("资料库", "Library"),
    "chat": ("聊天与 AI", "Chat & AI"),
    "capture": ("捕捉与录制", "Capture & Recording"),
    "study": ("学习", "Study"),
}


PRESETS: dict[str, list[tuple[str, list[dict]]]] = {
    "document": [
        ("file", [
            S("⌘ N", "新建文档", "New document", "new", "document"),
            S("⌘ O", "打开文档", "Open document", "open", "document"),
            S("⌘ S", "保存", "Save", "save"),
            S("⌘ ⇧ S", "另存为", "Save as", "save as"),
            S("⌘ W", "关闭当前文档", "Close current document", "close"),
            S("⌘ P", "打印", "Print", "print"),
        ]),
        ("editing", [
            S("⌘ Z", "撤销", "Undo", "undo"),
            S("⌘ ⇧ Z", "重做", "Redo", "redo"),
            S("⌘ X", "剪切", "Cut", "cut"),
            S("⌘ C", "复制", "Copy", "copy"),
            S("⌘ V", "粘贴", "Paste", "paste"),
            S("⌘ A", "全选", "Select all", "select all"),
            S("⌘ F", "查找", "Find", "find"),
        ]),
        ("view", [
            S("⌘ +", "放大", "Zoom in", "zoom"),
            S("⌘ -", "缩小", "Zoom out", "zoom"),
            S("⌘ 0", "适合窗口", "Fit to window", "fit", "view"),
            S("⌃ ⌘ F", "进入或退出全屏", "Toggle full screen", "fullscreen"),
        ]),
    ],
    "canvas": [
        ("workspace", [
            S("Space", "平移画布", "Pan canvas", "pan", "canvas"),
            S("⌘ R", "显示或隐藏标尺", "Toggle rulers", "rulers"),
            S("⌘ ' ", "显示或隐藏网格", "Toggle grid", "grid"),
            S("⌘ 1", "缩放到 100%", "Zoom to 100%", "zoom"),
            S("⌘ 2", "缩放到所选内容", "Zoom to selection", "zoom", "selection"),
            S("⌘ 3", "画布居中", "Center canvas", "canvas"),
        ]),
        ("objects", [
            S("⌘ G", "编组", "Group", "group"),
            S("⌘ ⇧ G", "取消编组", "Ungroup", "ungroup"),
            S("⌘ D", "复制所选对象", "Duplicate selection", "duplicate"),
            S("⌘ L", "锁定或解锁", "Toggle lock", "lock"),
            S("⌘ ]", "上移一层", "Bring forward", "arrange"),
            S("⌘ [", "下移一层", "Send backward", "arrange"),
            S("⌘ ⇧ ]", "移到最前", "Bring to front", "arrange"),
            S("⌘ ⇧ [", "移到最后", "Send to back", "arrange"),
            S("Delete", "删除所选对象", "Delete selection", "delete"),
            S("Esc", "取消选择或操作", "Cancel selection or operation", "cancel"),
        ]),
    ],
    "vector": [
        ("objects", [
            S("V", "选择工具", "Selection tool", "tool", "select"),
            S("P", "钢笔工具", "Pen tool", "tool", "pen"),
            S("R", "矩形工具", "Rectangle tool", "tool", "rectangle"),
            S("O", "椭圆工具", "Oval tool", "tool", "oval"),
            S("T", "文本工具", "Text tool", "tool", "text"),
            S("⌘ E", "导出所选内容", "Export selection", "export"),
        ]),
    ],
    "prototype": [
        ("prototype", [
            S("⌘ Enter", "预览原型", "Preview prototype", "preview", "prototype"),
            S("⌘ ⇧ P", "演示原型", "Present prototype", "present", "prototype"),
            S("⌘ K", "创建交互连接", "Create interaction link", "interaction", "link"),
            S("Esc", "退出预览", "Exit preview", "preview", "exit"),
        ]),
    ],
    "layout": [
        ("layout", [
            S("⌘ B", "文本框架选项", "Text frame options", "text frame"),
            S("⌘ ⌥ P", "文档设置", "Document setup", "document setup"),
            S("⌘ ⇧ P", "置入文件", "Place file", "place"),
            S("⌘ ⌥ 0", "适合页面到窗口", "Fit page in window", "fit page"),
            S("⌘ ⌥ 2", "适合跨页到窗口", "Fit spread in window", "fit spread"),
            S("W", "切换正常与预览模式", "Toggle normal and preview mode", "preview"),
        ]),
        ("text", [
            S("⌘ B", "粗体", "Bold", "bold"),
            S("⌘ I", "斜体", "Italic", "italic"),
            S("⌘ ⇧ >", "增大字号", "Increase font size", "font size"),
            S("⌘ ⇧ <", "减小字号", "Decrease font size", "font size"),
            S("⌘ ⇧ L", "左对齐", "Align left", "align"),
            S("⌘ ⇧ C", "居中对齐", "Align center", "align"),
            S("⌘ ⇧ R", "右对齐", "Align right", "align"),
        ]),
    ],
    "photo": [
        ("photo", [
            S("G", "网格视图", "Grid view", "grid", "photo"),
            S("E", "单张视图", "Loupe view", "loupe", "photo"),
            S("D", "修改照片", "Develop", "develop", "photo"),
            S("R", "裁剪", "Crop", "crop"),
            S("Q", "污点去除", "Spot removal", "retouch"),
            S("P", "标记为保留", "Flag as pick", "flag"),
            S("X", "标记为拒绝", "Flag as reject", "flag"),
            S("U", "移除旗标", "Remove flag", "flag"),
            S("1", "一星评分", "Set one-star rating", "rating"),
            S("5", "五星评分", "Set five-star rating", "rating"),
            S("\\", "显示调整前后", "Show before and after", "before after"),
            S("⌘ ⇧ E", "导出照片", "Export photos", "export"),
        ]),
    ],
    "timeline": [
        ("playback", [
            S("Space", "播放或暂停", "Play or pause", "play", "pause"),
            S("←", "上一帧", "Previous frame", "frame"),
            S("→", "下一帧", "Next frame", "frame"),
            S("J", "反向播放", "Play backward", "playback"),
            S("K", "停止播放", "Stop playback", "playback"),
            S("L", "正向播放", "Play forward", "playback"),
            S("I", "设置入点", "Set in point", "in point"),
            S("O", "设置出点", "Set out point", "out point"),
        ]),
        ("timeline", [
            S("⌘ B", "在播放头处切割", "Blade at playhead", "blade", "split"),
            S("Delete", "删除所选片段", "Delete selected clip", "delete", "clip"),
            S("⌘ +", "放大时间线", "Zoom in timeline", "timeline", "zoom"),
            S("⌘ -", "缩小时间线", "Zoom out timeline", "timeline", "zoom"),
            S("⌘ Z", "撤销时间线操作", "Undo timeline edit", "undo"),
            S("⌘ ⇧ Z", "重做时间线操作", "Redo timeline edit", "redo"),
        ]),
    ],
    "modeling": [
        ("modeling", [
            S("G", "移动", "Move", "transform", "move"),
            S("R", "旋转", "Rotate", "transform", "rotate"),
            S("S", "缩放", "Scale", "transform", "scale"),
            S("Tab", "切换编辑模式", "Toggle edit mode", "edit mode"),
            S("⌘ D", "复制对象", "Duplicate object", "duplicate"),
            S("Delete", "删除对象", "Delete object", "delete"),
            S("F", "聚焦所选对象", "Frame selection", "frame selection"),
            S("⌘ G", "编组对象", "Group objects", "group"),
        ]),
    ],
    "rendering": [
        ("rendering", [
            S("R", "开始渲染", "Start rendering", "render"),
            S("Esc", "停止渲染", "Stop rendering", "render", "stop"),
            S("Space", "暂停或继续实时渲染", "Pause or resume live rendering", "render"),
            S("F", "聚焦所选对象", "Focus selection", "focus"),
            S("⌘ E", "导出图像", "Export image", "export"),
            S("⌘ ⇧ E", "导出视频", "Export video", "export", "video"),
        ]),
    ],
    "cad": [
        ("cad", [
            S("L", "直线", "Line", "line", "draw"),
            S("R", "矩形", "Rectangle", "rectangle", "draw"),
            S("C", "圆", "Circle", "circle", "draw"),
            S("A", "圆弧", "Arc", "arc", "draw"),
            S("M", "移动", "Move", "move", "modify"),
            S("⌘ C", "复制", "Copy", "copy", "modify"),
            S("⌘ Z", "撤销", "Undo", "undo"),
            S("Delete", "删除", "Delete", "delete"),
            S("Esc", "取消当前命令", "Cancel current command", "cancel"),
            S("Space", "重复或确认命令", "Repeat or confirm command", "command"),
        ]),
    ],
    "science": [
        ("science", [
            S("⌘ Enter", "运行当前计算", "Evaluate current calculation", "evaluate", "run"),
            S("⇧ Enter", "运行并移到下一项", "Run and move to next", "run", "next"),
            S("⌘ .", "中止计算", "Abort calculation", "abort", "stop"),
            S("⌘ K", "清除输出", "Clear output", "clear"),
            S("⌘ F", "查找内容", "Find content", "find"),
        ]),
    ],
    "data": [
        ("data", [
            S("⌘ R", "运行所选内容", "Run selection", "run", "selection"),
            S("⌘ Enter", "运行当前行或单元", "Run current line or cell", "run"),
            S("⌘ ⇧ Enter", "运行全部", "Run all", "run all"),
            S("⌘ .", "停止运行", "Stop execution", "stop"),
            S("⌘ F", "在数据中查找", "Find in data", "find", "data"),
            S("⌘ E", "导出数据", "Export data", "export", "data"),
        ]),
    ],
    "audio": [
        ("playback", [
            S("Space", "播放或停止", "Play or stop", "play", "stop"),
            S("Return", "从开头播放", "Play from beginning", "play"),
            S("R", "开始录音", "Start recording", "record"),
            S("C", "打开或关闭循环", "Toggle cycle", "cycle"),
            S("M", "静音所选轨道", "Mute selected track", "mute"),
            S("S", "独奏所选轨道", "Solo selected track", "solo"),
        ]),
        ("timeline", [
            S("⌘ T", "在播放头处分割", "Split at playhead", "split"),
            S("⌘ J", "合并片段", "Join regions", "join"),
            S("⌘ D", "复制轨道", "Duplicate track", "duplicate"),
            S("Delete", "删除所选片段", "Delete selected region", "delete"),
            S("⌘ +", "水平放大", "Zoom in horizontally", "zoom"),
            S("⌘ -", "水平缩小", "Zoom out horizontally", "zoom"),
        ]),
    ],
    "vscode": [
        ("navigation", [
            S("⌘ ⇧ P", "打开命令面板", "Show command palette", "command palette"),
            S("⌘ P", "快速打开文件", "Quick open file", "quick open"),
            S("⌘ G", "转到行", "Go to line", "go to line"),
            S("⌘ ⇧ O", "转到符号", "Go to symbol", "symbol"),
            S("⌃ -", "后退", "Navigate back", "back"),
            S("⌃ ⇧ -", "前进", "Navigate forward", "forward"),
            S("⌘ B", "切换侧边栏", "Toggle sidebar", "sidebar"),
        ]),
        ("code", [
            S("⌘ /", "切换行注释", "Toggle line comment", "comment"),
            S("⇧ ⌥ F", "格式化文档", "Format document", "format"),
            S("F2", "重命名符号", "Rename symbol", "rename"),
            S("⌃ Space", "触发建议", "Trigger suggestions", "completion"),
            S("⌘ D", "选择下一个匹配项", "Add next match to selection", "multi cursor"),
            S("⌘ ⇧ K", "删除当前行", "Delete current line", "delete line"),
            S("⌥ ↑", "上移当前行", "Move line up", "move line"),
            S("⌥ ↓", "下移当前行", "Move line down", "move line"),
        ]),
        ("run", [
            S("F5", "开始调试", "Start debugging", "debug"),
            S("⌃ F5", "运行但不调试", "Run without debugging", "run"),
            S("⇧ F5", "停止调试", "Stop debugging", "debug", "stop"),
            S("F9", "切换断点", "Toggle breakpoint", "breakpoint"),
            S("⌃ `", "切换集成终端", "Toggle integrated terminal", "terminal"),
        ]),
    ],
    "jetbrains": [
        ("navigation", [
            S("⇧ ⇧", "全局搜索", "Search everywhere", "search everywhere"),
            S("⌘ ⇧ A", "查找操作", "Find action", "find action"),
            S("⌘ E", "最近文件", "Recent files", "recent files"),
            S("⌘ O", "转到类", "Go to class", "class"),
            S("⌘ ⇧ O", "转到文件", "Go to file", "file"),
            S("⌘ ⌥ O", "转到符号", "Go to symbol", "symbol"),
            S("⌘ L", "转到行", "Go to line", "line"),
        ]),
        ("code", [
            S("⌘ /", "切换行注释", "Toggle line comment", "comment"),
            S("⌘ ⌥ L", "重新格式化代码", "Reformat code", "format"),
            S("⇧ F6", "重命名", "Rename", "rename"),
            S("⌃ Space", "代码补全", "Basic code completion", "completion"),
            S("⌘ D", "复制当前行", "Duplicate current line", "duplicate"),
            S("⌘ Delete", "删除当前行", "Delete current line", "delete line"),
            S("⌥ Enter", "显示意图操作", "Show intention actions", "quick fix"),
        ]),
        ("run", [
            S("⌃ R", "运行", "Run", "run"),
            S("⌃ D", "调试", "Debug", "debug"),
            S("⌘ F2", "停止", "Stop", "stop"),
            S("F8", "单步跳过", "Step over", "debug"),
            S("F7", "单步进入", "Step into", "debug"),
            S("⇧ F8", "单步跳出", "Step out", "debug"),
        ]),
    ],
    "browser": [
        ("browser", [
            S("⌘ N", "新建窗口", "New window", "window"),
            S("⌘ ⇧ N", "新建无痕窗口", "New private window", "private", "window"),
            S("⌘ T", "新建标签页", "New tab", "tab"),
            S("⌘ W", "关闭当前标签页", "Close current tab", "tab", "close"),
            S("⌘ ⇧ T", "重新打开关闭的标签页", "Reopen closed tab", "tab", "reopen"),
            S("⌘ L", "聚焦地址栏", "Focus address bar", "address bar"),
            S("⌘ R", "重新载入页面", "Reload page", "reload"),
            S("⌘ [", "返回", "Go back", "back"),
            S("⌘ ]", "前进", "Go forward", "forward"),
            S("⌘ F", "在页面中查找", "Find on page", "find"),
            S("⌘ D", "添加书签", "Bookmark page", "bookmark"),
            S("⌃ Tab", "下一个标签页", "Next tab", "tab"),
            S("⌃ ⇧ Tab", "上一个标签页", "Previous tab", "tab"),
            S("⌘ +", "放大页面", "Zoom in page", "zoom"),
            S("⌘ -", "缩小页面", "Zoom out page", "zoom"),
            S("⌘ 0", "恢复默认缩放", "Reset page zoom", "zoom"),
            S("⌃ ⌘ F", "切换全屏", "Toggle full screen", "fullscreen"),
            S("⌘ ⌥ I", "打开开发者工具", "Open developer tools", "developer tools"),
        ]),
    ],
    "terminal": [
        ("terminal", [
            S("⌘ N", "新建终端窗口", "New terminal window", "window"),
            S("⌘ T", "新建终端标签页", "New terminal tab", "tab"),
            S("⌘ W", "关闭当前会话", "Close current session", "close"),
            S("⌘ D", "垂直分割窗格", "Split pane vertically", "split"),
            S("⌘ ⇧ D", "水平分割窗格", "Split pane horizontally", "split"),
            S("⌘ ]", "下一个窗格", "Next pane", "pane"),
            S("⌘ [", "上一个窗格", "Previous pane", "pane"),
            S("⌘ F", "查找终端输出", "Find terminal output", "find"),
            S("⌘ K", "清除终端缓冲区", "Clear terminal buffer", "clear"),
            S("⌘ +", "增大字体", "Increase font size", "font size"),
            S("⌘ -", "减小字体", "Decrease font size", "font size"),
            S("⌘ 0", "恢复默认字体大小", "Reset font size", "font size"),
            S("⌃ C", "中断当前命令", "Interrupt current command", "interrupt"),
            S("⌃ L", "清屏", "Clear screen", "clear"),
            S("⌃ R", "搜索命令历史", "Search command history", "history"),
        ]),
    ],
    "versioncontrol": [
        ("project", [
            S("⌘ N", "新建仓库", "New repository", "repository", "new"),
            S("⌘ O", "打开本地仓库", "Open local repository", "repository", "open"),
            S("⌘ ⇧ O", "克隆仓库", "Clone repository", "clone"),
            S("⌘ Enter", "提交更改", "Commit changes", "commit"),
            S("⌘ P", "推送", "Push", "push"),
            S("⌘ ⇧ P", "拉取", "Pull", "pull"),
            S("⌘ F", "查找分支或提交", "Find branch or commit", "find"),
            S("⌘ R", "刷新仓库状态", "Refresh repository status", "refresh"),
        ]),
        ("navigation", [
            S("⌘ 1", "显示更改", "Show changes", "changes"),
            S("⌘ 2", "显示历史", "Show history", "history"),
            S("⌘ 3", "显示分支", "Show branches", "branches"),
            S("⌘ ,", "打开设置", "Open settings", "settings"),
        ]),
    ],
    "database": [
        ("database", [
            S("⌘ N", "新建 SQL 编辑器", "New SQL editor", "sql", "new"),
            S("⌘ O", "打开 SQL 文件", "Open SQL file", "sql", "open"),
            S("⌘ S", "保存查询", "Save query", "save", "query"),
            S("⌘ Enter", "执行当前语句", "Execute current statement", "execute", "sql"),
            S("⌘ ⇧ Enter", "执行脚本", "Execute script", "execute", "script"),
            S("⌘ .", "停止查询", "Stop query", "stop", "query"),
            S("⌘ F", "在编辑器中查找", "Find in editor", "find"),
            S("⌘ ⇧ F", "在数据库对象中搜索", "Search database objects", "search"),
            S("⌘ /", "切换 SQL 注释", "Toggle SQL comment", "comment"),
            S("⌘ ⌥ L", "格式化 SQL", "Format SQL", "format", "sql"),
            S("⌘ R", "刷新对象", "Refresh objects", "refresh"),
            S("⌘ W", "关闭编辑器标签页", "Close editor tab", "close", "tab"),
        ]),
    ],
    "api": [
        ("api", [
            S("⌘ N", "新建请求", "New request", "request", "new"),
            S("⌘ T", "新建请求标签页", "New request tab", "request", "tab"),
            S("⌘ W", "关闭请求标签页", "Close request tab", "request", "close"),
            S("⌘ Enter", "发送请求", "Send request", "send", "request"),
            S("⌘ S", "保存请求", "Save request", "save", "request"),
            S("⌘ F", "查找", "Find", "find"),
            S("⌘ K", "快速搜索", "Quick search", "search"),
            S("⌘ /", "打开快捷操作", "Open quick actions", "quick actions"),
            S("⌘ +", "放大界面", "Zoom in interface", "zoom"),
            S("⌘ -", "缩小界面", "Zoom out interface", "zoom"),
            S("⌘ 0", "恢复界面缩放", "Reset interface zoom", "zoom"),
        ]),
    ],
    "webproject": [
        ("project", [
            S("/", "聚焦全局搜索", "Focus global search", "search"),
            S("C", "创建新项目或事项", "Create project or item", "create"),
            S("E", "编辑当前项目", "Edit current item", "edit"),
            S("J", "选择下一项", "Select next item", "navigation"),
            S("K", "选择上一项", "Select previous item", "navigation"),
            S("Enter", "打开所选项目", "Open selected item", "open"),
            S("Esc", "关闭对话框或取消", "Close dialog or cancel", "cancel"),
            S("?", "显示键盘快捷键", "Show keyboard shortcuts", "shortcuts"),
        ]),
    ],
    "wordprocessing": [
        ("formatting", [
            S("⌘ B", "粗体", "Bold", "bold"),
            S("⌘ I", "斜体", "Italic", "italic"),
            S("⌘ U", "下划线", "Underline", "underline"),
            S("⌘ ⇧ X", "删除线", "Strikethrough", "strikethrough"),
            S("⌘ K", "插入链接", "Insert link", "link"),
            S("⌘ ⌥ 1", "应用一级标题", "Apply heading 1", "heading"),
            S("⌘ ⌥ 2", "应用二级标题", "Apply heading 2", "heading"),
            S("⌘ ⇧ L", "项目符号列表", "Bulleted list", "list"),
            S("⌘ ⇧ 7", "编号列表", "Numbered list", "list"),
            S("⌘ ]", "增加缩进", "Increase indent", "indent"),
            S("⌘ [", "减少缩进", "Decrease indent", "indent"),
            S("⌘ ⇧ C", "显示字数统计", "Show word count", "word count"),
        ]),
        ("document", [
            S("⌘ Return", "插入分页符", "Insert page break", "page break"),
            S("⌘ ⌥ M", "插入批注", "Insert comment", "comment"),
            S("⌘ ⇧ E", "导出文档", "Export document", "export"),
            S("⌘ ;", "检查拼写", "Check spelling", "spelling"),
        ]),
    ],
    "spreadsheet": [
        ("cells", [
            S("Return", "确认输入并下移", "Confirm entry and move down", "cell"),
            S("Tab", "确认输入并右移", "Confirm entry and move right", "cell"),
            S("⌃ G", "转到单元格", "Go to cell", "cell", "navigation"),
            S("⌘ Space", "选择整列", "Select column", "select", "column"),
            S("⇧ Space", "选择整行", "Select row", "select", "row"),
            S("⌘ D", "向下填充", "Fill down", "fill"),
            S("⌘ R", "向右填充", "Fill right", "fill"),
            S("⌘ +", "插入单元格或行列", "Insert cells, rows, or columns", "insert"),
            S("⌘ -", "删除单元格或行列", "Delete cells, rows, or columns", "delete"),
            S("⌘ ⇧ K", "插入函数", "Insert function", "function"),
        ]),
        ("formatting", [
            S("⌘ B", "粗体", "Bold", "bold"),
            S("⌘ I", "斜体", "Italic", "italic"),
            S("⌘ U", "下划线", "Underline", "underline"),
            S("⌘ ⇧ $", "货币格式", "Currency format", "number format"),
            S("⌘ ⇧ %", "百分比格式", "Percentage format", "number format"),
            S("⌘ ⇧ #", "日期格式", "Date format", "number format"),
            S("⌘ 1", "打开单元格格式", "Open cell format", "format"),
        ]),
    ],
    "presentation": [
        ("slides", [
            S("⌘ ⇧ N", "新建幻灯片", "New slide", "slide", "new"),
            S("⌘ D", "复制幻灯片", "Duplicate slide", "slide", "duplicate"),
            S("Delete", "删除幻灯片", "Delete slide", "slide", "delete"),
            S("⌘ ⇧ ↑", "上移幻灯片", "Move slide up", "slide", "move"),
            S("⌘ ⇧ ↓", "下移幻灯片", "Move slide down", "slide", "move"),
            S("⌘ ⌥ G", "跳转到幻灯片", "Go to slide", "slide", "navigation"),
            S("⌘ Enter", "从当前幻灯片播放", "Play from current slide", "present"),
            S("⌘ ⇧ Enter", "从第一张幻灯片播放", "Play from first slide", "present"),
            S("Esc", "退出演示", "Exit presentation", "present", "exit"),
        ]),
        ("objects", [
            S("⌘ G", "编组对象", "Group objects", "group"),
            S("⌘ ⇧ G", "取消编组", "Ungroup objects", "ungroup"),
            S("⌘ D", "复制对象", "Duplicate object", "duplicate"),
            S("⌘ ]", "上移一层", "Bring forward", "arrange"),
            S("⌘ [", "下移一层", "Send backward", "arrange"),
        ]),
    ],
    "pdf": [
        ("pdf", [
            S("⌘ O", "打开 PDF", "Open PDF", "open", "pdf"),
            S("⌘ S", "保存 PDF", "Save PDF", "save", "pdf"),
            S("⌘ P", "打印 PDF", "Print PDF", "print", "pdf"),
            S("⌘ F", "搜索 PDF", "Search PDF", "search", "pdf"),
            S("⌘ +", "放大页面", "Zoom in page", "zoom"),
            S("⌘ -", "缩小页面", "Zoom out page", "zoom"),
            S("⌘ 0", "适合页面", "Fit page", "fit"),
            S("⌘ 1", "实际大小", "Actual size", "actual size"),
            S("PageDown", "下一页", "Next page", "page"),
            S("PageUp", "上一页", "Previous page", "page"),
            S("⌘ ⇧ G", "转到页面", "Go to page", "page", "navigation"),
            S("⌃ ⌘ F", "切换全屏", "Toggle full screen", "fullscreen"),
        ]),
        ("annotations", [
            S("⌃ ⌘ H", "高亮所选文本", "Highlight selected text", "highlight"),
            S("⌃ ⌘ S", "删除线批注", "Strikethrough annotation", "strikethrough"),
            S("⌃ ⌘ N", "添加文本批注", "Add text note", "note", "annotation"),
            S("⌘ C", "复制所选内容", "Copy selection", "copy"),
            S("Delete", "删除所选批注", "Delete selected annotation", "delete", "annotation"),
        ]),
    ],
    "reference": [
        ("library", [
            S("⌘ N", "新建条目", "New item", "item", "new"),
            S("⌘ ⇧ N", "新建分类", "New collection", "collection", "new"),
            S("⌘ O", "导入文献", "Import references", "import"),
            S("⌘ F", "搜索资料库", "Search library", "search", "library"),
            S("⌘ L", "聚焦快速搜索", "Focus quick search", "search"),
            S("⌘ S", "保存当前条目", "Save current item", "save"),
            S("⌘ D", "复制条目", "Duplicate item", "duplicate"),
            S("Delete", "移入废纸篓", "Move item to trash", "delete"),
            S("⌘ ⇧ C", "复制格式化引用", "Copy formatted citation", "citation"),
            S("⌘ ⇧ A", "添加附件", "Add attachment", "attachment"),
            S("⌘ Enter", "打开所选附件", "Open selected attachment", "attachment", "open"),
        ]),
    ],
    "notes": [
        ("document", [
            S("⌘ N", "新建笔记", "New note", "note", "new"),
            S("⌘ ⇧ N", "新建文件夹", "New folder", "folder", "new"),
            S("⌘ F", "在笔记中查找", "Find in note", "find"),
            S("⌘ ⇧ F", "搜索全部笔记", "Search all notes", "search"),
            S("⌘ K", "插入链接", "Insert link", "link"),
            S("⌘ B", "粗体", "Bold", "bold"),
            S("⌘ I", "斜体", "Italic", "italic"),
            S("⌘ U", "下划线", "Underline", "underline"),
            S("⌘ ⇧ 7", "编号列表", "Numbered list", "list"),
            S("⌘ ⇧ 8", "项目符号列表", "Bulleted list", "list"),
            S("⌘ ⇧ 9", "待办列表", "To-do list", "todo"),
            S("⌘ Enter", "切换待办状态", "Toggle to-do", "todo"),
        ]),
    ],
    "communication": [
        ("communication", [
            S("⌘ N", "新建消息或会话", "New message or conversation", "message", "new"),
            S("⌘ K", "快速切换会话", "Quick switch conversation", "switch"),
            S("⌘ F", "搜索当前会话", "Search current conversation", "search"),
            S("⌘ G", "查找下一个结果", "Find next result", "find"),
            S("⌘ ⇧ G", "查找上一个结果", "Find previous result", "find"),
            S("⌘ Enter", "发送消息", "Send message", "send"),
            S("⇧ Enter", "消息内换行", "Insert line break", "line break"),
            S("Esc", "关闭面板或取消", "Close panel or cancel", "cancel"),
            S("⌘ B", "粗体", "Bold", "format"),
            S("⌘ I", "斜体", "Italic", "format"),
            S("⌘ U", "下划线", "Underline", "format"),
            S("⌘ ⇧ M", "静音或取消静音", "Mute or unmute", "mute"),
        ]),
    ],
    "projectmanagement": [
        ("project", [
            S("C", "创建事项", "Create item", "create"),
            S("/", "聚焦搜索", "Focus search", "search"),
            S("⌘ K", "打开命令菜单", "Open command menu", "command menu"),
            S("E", "编辑所选事项", "Edit selected item", "edit"),
            S("A", "分配负责人", "Assign owner", "assign"),
            S("M", "添加评论", "Add comment", "comment"),
            S("J", "选择下一项", "Select next item", "navigation"),
            S("K", "选择上一项", "Select previous item", "navigation"),
            S("Enter", "打开所选事项", "Open selected item", "open"),
            S("Esc", "关闭或取消", "Close or cancel", "cancel"),
            S("?", "显示快捷键", "Show keyboard shortcuts", "shortcuts"),
        ]),
    ],
    "ai": [
        ("chat", [
            S("⌘ N", "新建对话", "New chat", "chat", "new"),
            S("⌘ K", "打开命令或模型选择", "Open command or model picker", "command", "model"),
            S("⌘ F", "搜索当前对话", "Search current chat", "search"),
            S("⌘ ⇧ F", "搜索全部对话", "Search all chats", "search"),
            S("⌘ Enter", "发送提示词", "Send prompt", "send", "prompt"),
            S("⇧ Enter", "提示词内换行", "Insert line break in prompt", "line break"),
            S("Esc", "停止生成或关闭面板", "Stop generation or close panel", "stop"),
            S("⌘ C", "复制回答", "Copy response", "copy"),
            S("⌘ A", "选择输入内容", "Select prompt text", "select"),
        ]),
    ],
    "mediaplayer": [
        ("playback", [
            S("Space", "播放或暂停", "Play or pause", "play", "pause"),
            S("⌘ ←", "后退", "Seek backward", "seek"),
            S("⌘ →", "前进", "Seek forward", "seek"),
            S("↑", "提高音量", "Volume up", "volume"),
            S("↓", "降低音量", "Volume down", "volume"),
            S("M", "静音", "Mute", "mute"),
            S("F", "切换全屏", "Toggle full screen", "fullscreen"),
            S("S", "切换字幕", "Toggle subtitles", "subtitles"),
            S("[", "降低播放速度", "Decrease playback speed", "speed"),
            S("]", "提高播放速度", "Increase playback speed", "speed"),
            S("⌘ O", "打开媒体", "Open media", "open"),
            S("⌘ W", "关闭媒体", "Close media", "close"),
        ]),
    ],
    "filemanager": [
        ("file", [
            S("⌘ ⇧ N", "新建文件夹", "New folder", "folder", "new"),
            S("⌘ O", "打开所选文件", "Open selected file", "open"),
            S("Space", "预览所选文件", "Preview selected file", "preview"),
            S("Return", "重命名所选文件", "Rename selected file", "rename"),
            S("⌘ C", "复制所选文件", "Copy selected file", "copy"),
            S("⌘ V", "粘贴文件", "Paste files", "paste"),
            S("⌘ Delete", "删除所选文件", "Delete selected file", "delete"),
            S("⌘ A", "全选文件", "Select all files", "select all"),
            S("⌘ F", "搜索文件", "Search files", "search"),
            S("⌘ R", "刷新文件列表", "Refresh file list", "refresh"),
            S("⌘ +", "放大文件图标", "Increase file icon size", "zoom"),
            S("⌘ -", "缩小文件图标", "Decrease file icon size", "zoom"),
        ]),
    ],
}


def slug(value: str) -> str:
    result = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return result[:52] or "shortcut"


def merge_preset_categories(preset_names: Iterable[str], extras: list[tuple[str, list[dict]]] | None = None) -> list[dict]:
    merged: OrderedDict[str, list[dict]] = OrderedDict()
    for preset_name in preset_names:
        for category_id, items in PRESETS[preset_name]:
            merged.setdefault(category_id, []).extend(items)
    for category_id, items in extras or []:
        merged.setdefault(category_id, []).extend(items)
    categories = []
    used_ids: set[str] = set()
    seen_signatures: set[tuple[tuple[str, ...], str]] = set()
    for category_id, items in merged.items():
        category_items = []
        for offset, item in enumerate(items, start=1):
            signature = (tuple(item["keys"]), item["en"])
            if signature in seen_signatures:
                continue
            seen_signatures.add(signature)
            base = f"{category_id}.{slug(item['en'])}"
            item_id = base
            suffix = 2
            while item_id in used_ids:
                item_id = f"{base}.{suffix}"
                suffix += 1
            used_ids.add(item_id)
            category_items.append({"id": item_id, **item})
        if category_items:
            zh, en = CATEGORY_TITLES[category_id]
            categories.append({"id": category_id, "zh": zh, "en": en, "items": category_items})
    return categories


def define(
    software_id: str,
    name: str,
    vendor: str,
    group: str,
    accent: str,
    glyph: str,
    source_url: str,
    presets: list[str],
    extras: list[tuple[str, list[dict]]] | None = None,
) -> dict:
    # Generic presets are not evidence that a command belongs to a particular
    # application. Preserve the classified catalog entry, but ship no draft
    # shortcuts until an official macOS source-backed pack replaces it.
    categories: list[dict] = []
    result = {
        "id": software_id,
        "name": name,
        "vendor": vendor,
        "accent": accent,
        "glyph": glyph,
        "group": group,
        "dataStatus": "catalogOnly",
        "categories": categories,
        "provenance": {
            "sourceURL": source_url,
            "sourceTitle": f"{name} product catalog entry",
            "appVersion": "Current macOS/web edition",
            "verifiedAt": VERIFIED_AT,
            "coverage": "catalog-only-unverified-shortcuts-removed",
            "platform": "macOS",
        },
    }
    if software_id in BUNDLE_IDENTIFIERS:
        result["bundleIdentifiers"] = BUNDLE_IDENTIFIERS[software_id]
    return result


def round_one() -> list[dict]:
    """Design, media, 3D, architecture, engineering and research apps."""
    specs = [
        ("sketch", "Sketch", "Sketch B.V.", "design", "#FFAE00", "S", "https://www.sketch.com/docs/shortcuts/", ["document", "canvas", "vector"]),
        ("adobexd", "Adobe XD", "Adobe", "design", "#FF61F6", "XD", "https://helpx.adobe.com/xd/help/keyboard-shortcuts.html", ["document", "canvas", "vector", "prototype"]),
        ("framer", "Framer", "Framer B.V.", "design", "#0055FF", "Fr", "https://www.framer.com/help/articles/keyboard-shortcuts/", ["document", "canvas", "vector", "prototype"]),
        ("axure", "Axure RP", "Axure Software", "design", "#4A76D1", "Ax", "https://docs.axure.com/axure-rp/reference/keyboard-shortcuts/", ["document", "canvas", "prototype"]),
        ("mastergo", "MasterGo", "MasterGo", "design", "#6C5CE7", "MG", "https://mastergo.com/", ["document", "canvas", "vector", "prototype"]),
        ("jsdesign", "即时设计", "即时设计", "design", "#7B61FF", "即时", "https://js.design/", ["document", "canvas", "vector", "prototype"]),
        ("indesign", "Adobe InDesign", "Adobe", "design", "#FF3366", "Id", "https://helpx.adobe.com/indesign/using/default-keyboard-shortcuts.html", ["document", "layout"]),
        ("lightroom", "Adobe Lightroom", "Adobe", "design", "#31A8FF", "Lr", "https://helpx.adobe.com/lightroom-classic/help/keyboard-shortcuts.html", ["document", "photo"]),
        ("rive", "Rive", "Rive", "media", "#1D1D1D", "R", "https://rive.app/docs/editor/shortcuts", ["document", "canvas", "vector", "timeline"]),
        ("lottiefiles", "LottieFiles", "LottieFiles", "media", "#00DDB3", "Lf", "https://lottiefiles.com/", ["document", "timeline"]),
        ("protopie", "ProtoPie", "Studio XID", "design", "#FF5B5B", "PP", "https://www.protopie.io/learn/docs/keyboard-shortcuts", ["document", "canvas", "prototype", "timeline"]),
        ("finalcut", "Final Cut Pro", "Apple", "media", "#5B5BFF", "FCP", "https://support.apple.com/guide/final-cut-pro/keyboard-shortcuts-ver90ba5929/mac", ["document", "timeline"]),
        ("zbrush", "ZBrush", "Maxon", "modeling", "#F58220", "ZB", "https://help.maxon.net/zbr/en-us/Content/html/user-guide/keyboard-shortcuts/keyboard-shortcuts.html", ["document", "canvas", "modeling"]),
        ("archicad", "Archicad", "Graphisoft", "architecture", "#00AEEF", "AC", "https://help.graphisoft.com/AC/27/INT/_AC27_Help/005_NewFeatures/005_NewFeatures-1.htm", ["document", "cad", "modeling"]),
        ("enscape", "Enscape", "Chaos", "architecture", "#F36F21", "En", "https://learn.enscape3d.com/blog/knowledgebase/keyboard-shortcuts/", ["rendering"]),
        ("twinmotion", "Twinmotion", "Epic Games", "architecture", "#1D9BF0", "TM", "https://dev.epicgames.com/documentation/en-us/twinmotion/keyboard-and-mouse-shortcuts-in-twinmotion", ["document", "modeling", "rendering"]),
        ("unity", "Unity", "Unity Technologies", "development", "#222C37", "U", "https://docs.unity3d.com/Manual/UnityHotkeys.html", ["document", "modeling", "vscode"]),
        ("unrealengine", "Unreal Engine", "Epic Games", "development", "#0E1128", "UE", "https://dev.epicgames.com/documentation/en-us/unreal-engine/keyboard-shortcuts-in-unreal-engine", ["document", "modeling", "vscode"]),
        ("logicpro", "Logic Pro", "Apple", "media", "#5A38E8", "LP", "https://support.apple.com/guide/logicpro/key-commands-overview-lgcp9cbd0b19/mac", ["document", "audio"]),
        ("garageband", "GarageBand", "Apple", "media", "#E34B32", "GB", "https://support.apple.com/guide/garageband/keyboard-shortcuts-gbnd1b4a4e84/mac", ["document", "audio"]),
        ("qgis", "QGIS", "QGIS.org", "architecture", "#589632", "QG", "https://docs.qgis.org/latest/en/docs/user_manual/introduction/qgis_configuration.html#keyboard-shortcuts", ["document", "cad"]),
        ("chemdraw", "ChemDraw", "Revvity Signals", "study", "#1862AB", "CD", "https://revvitysignals.com/products/research/chemdraw", ["document", "canvas", "science"]),
        ("pymol", "PyMOL", "Schrödinger", "study", "#2E75B6", "Py", "https://pymolwiki.org/index.php/Keyboard_Shortcuts", ["document", "modeling", "science"]),
        ("imagej", "ImageJ / Fiji", "NIH", "study", "#C53B3B", "IJ", "https://imagej.net/ij/docs/menus/keyboard.html", ["document", "photo", "science"]),
        ("paraview", "ParaView", "Kitware", "study", "#3B6EA8", "PV", "https://docs.paraview.org/en/latest/ReferenceManual/keyboardShortcuts.html", ["document", "modeling", "science"]),
        ("kicad", "KiCad", "KiCad", "engineering", "#314CB0", "Ki", "https://docs.kicad.org/8.0/en/pcbnew/pcbnew.html#hotkeys", ["document", "cad"]),
        ("arduinoide", "Arduino IDE", "Arduino", "development", "#00979D", "Ar", "https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-keyboard-shortcuts/", ["document", "vscode"]),
        ("ltspice", "LTspice", "Analog Devices", "simulation", "#C70000", "LT", "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html", ["document", "cad", "science"]),
        ("mathematica", "Wolfram Mathematica", "Wolfram", "dataAI", "#DD1100", "W", "https://reference.wolfram.com/language/tutorial/KeyboardShortcutListing.html", ["document", "science"]),
        ("stata", "Stata", "StataCorp", "dataAI", "#1F4E79", "St", "https://www.stata.com/manuals/gsw13.pdf", ["document", "data"]),
        ("jmp", "JMP", "JMP Statistical Discovery", "dataAI", "#E31837", "JMP", "https://www.jmp.com/support/help/en/18.0/jmp/keyboard-shortcuts.shtml", ["document", "data"]),
        ("graphpadprism", "GraphPad Prism", "Dotmatics", "dataAI", "#2A6EBB", "Pr", "https://www.graphpad.com/guides/prism/latest/user-guide/keyboard_shortcuts.htm", ["document", "data"]),
    ]
    return [define(*spec) for spec in specs]


def round_two() -> list[dict]:
    """Development, version control, database, API and browser apps."""
    specs = [
        ("cursor", "Cursor", "Anysphere", "development", "#111111", "Cu", "https://docs.cursor.com/kbd", ["vscode"]),
        ("pycharm", "PyCharm", "JetBrains", "development", "#21D789", "PC", "https://www.jetbrains.com/help/pycharm/mastering-keyboard-shortcuts.html", ["jetbrains"]),
        ("webstorm", "WebStorm", "JetBrains", "development", "#00CDD7", "WS", "https://www.jetbrains.com/help/webstorm/mastering-keyboard-shortcuts.html", ["jetbrains"]),
        ("goland", "GoLand", "JetBrains", "development", "#00ADD8", "Go", "https://www.jetbrains.com/help/go/mastering-keyboard-shortcuts.html", ["jetbrains"]),
        ("clion", "CLion", "JetBrains", "development", "#21D789", "CL", "https://www.jetbrains.com/help/clion/mastering-keyboard-shortcuts.html", ["jetbrains"]),
        ("githubdesktop", "GitHub Desktop", "GitHub", "versionControl", "#181717", "GH", "https://docs.github.com/en/desktop/overview/keyboard-shortcuts", ["versioncontrol"]),
        ("sourcetree", "Sourcetree", "Atlassian", "versionControl", "#0052CC", "ST", "https://support.atlassian.com/sourcetree/docs/keyboard-shortcuts/", ["versioncontrol"]),
        ("tower", "Tower", "fournova", "versionControl", "#F04B3A", "Tw", "https://www.git-tower.com/help/mac/faq-and-tips/keyboard-shortcuts", ["versioncontrol"]),
        ("github", "GitHub", "GitHub", "versionControl", "#181717", "GH", "https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts", ["webproject"]),
        ("gitlab", "GitLab", "GitLab", "versionControl", "#FC6D26", "GL", "https://docs.gitlab.com/user/shortcuts/", ["webproject"]),
        ("bitbucket", "Bitbucket", "Atlassian", "versionControl", "#0052CC", "BB", "https://support.atlassian.com/bitbucket-cloud/docs/keyboard-shortcuts/", ["webproject"]),
        ("postman", "Postman", "Postman", "databaseAPI", "#FF6C37", "Pm", "https://learning.postman.com/docs/getting-started/installation/installation-and-updates/#keyboard-shortcuts", ["api"]),
        ("insomnia", "Insomnia", "Kong", "databaseAPI", "#4000BF", "In", "https://docs.insomnia.rest/insomnia/keyboard-shortcuts", ["api"]),
        ("apifox", "Apifox", "Apifox", "databaseAPI", "#FF4D4F", "AF", "https://docs.apifox.com/keyboard-shortcuts", ["api"]),
        ("swaggerui", "Swagger UI", "SmartBear", "databaseAPI", "#85EA2D", "Sw", "https://swagger.io/tools/swagger-ui/", ["api"]),
        ("hoppscotch", "Hoppscotch", "Hoppscotch", "databaseAPI", "#10B981", "Hs", "https://docs.hoppscotch.io/documentation/features/shortcuts", ["api"]),
        ("dockerdesktop", "Docker Desktop", "Docker", "versionControl", "#2496ED", "D", "https://docs.docker.com/desktop/use-desktop/", []),
        ("dbeaver", "DBeaver", "DBeaver Corp", "databaseAPI", "#382923", "DB", "https://dbeaver.com/docs/dbeaver/Shortcuts/", ["database"]),
        ("datagrip", "DataGrip", "JetBrains", "databaseAPI", "#B345F1", "DG", "https://www.jetbrains.com/help/datagrip/mastering-keyboard-shortcuts.html", ["database", "jetbrains"]),
        ("mysqlworkbench", "MySQL / MySQL Workbench", "Oracle", "databaseAPI", "#4479A1", "My", "https://dev.mysql.com/doc/workbench/en/wb-keys.html", ["database"]),
        ("pgadmin", "PostgreSQL / pgAdmin", "pgAdmin", "databaseAPI", "#336791", "Pg", "https://www.pgadmin.org/docs/pgadmin4/latest/keyboard_shortcuts.html", ["database"]),
        ("mongodbcompass", "MongoDB Compass", "MongoDB", "databaseAPI", "#47A248", "Mo", "https://www.mongodb.com/docs/compass/current/keyboard-shortcuts/", ["database"]),
        ("redisinsight", "Redis Insight", "Redis", "databaseAPI", "#DC382D", "Ri", "https://redis.io/docs/latest/develop/tools/insight/", ["database"]),
        ("sqlitestudio", "SQLite / SQLiteStudio", "SQLiteStudio", "databaseAPI", "#0F80CC", "Sq", "https://github.com/pawelsalawa/sqlitestudio/wiki/User_Manual", ["database"]),
        ("tableplus", "TablePlus", "TablePlus", "databaseAPI", "#F2C94C", "T+", "https://docs.tableplus.com/gui-tools/shortcut-keys", ["database"]),
        ("iterm2", "iTerm2", "George Nachman", "development", "#111111", "iT", "https://iterm2.com/documentation-one-page.html", ["terminal"]),
        ("warp", "Warp", "Warp", "development", "#01A4FF", "Wa", "https://docs.warp.dev/features/keyboard-shortcuts", ["terminal"]),
        ("arc", "Arc", "The Browser Company", "browser", "#7C5CFC", "A", "https://resources.arc.net/hc/en-us/articles/20595231349911-Keyboard-Shortcuts", ["browser"]),
        ("firefox", "Mozilla Firefox", "Mozilla", "browser", "#FF7139", "Fx", "https://support.mozilla.org/kb/keyboard-shortcuts-perform-firefox-tasks-quickly", ["browser"]),
        ("edge", "Microsoft Edge", "Microsoft", "browser", "#0A84FF", "Ed", "https://support.microsoft.com/topic/keyboard-shortcuts-in-microsoft-edge-50d3edab-30d9-c7e4-21ce-37fe2713cfad", ["browser"]),
        ("supabase", "Supabase", "Supabase", "databaseAPI", "#3ECF8E", "Su", "https://supabase.com/dashboard", ["webproject"]),
        ("vercel", "Vercel", "Vercel", "versionControl", "#000000", "V", "https://vercel.com/dashboard", ["webproject"]),
        ("netlify", "Netlify", "Netlify", "versionControl", "#00C7B7", "Ne", "https://app.netlify.com/", ["webproject"]),
        ("cloudflare", "Cloudflare", "Cloudflare", "versionControl", "#F38020", "CF", "https://dash.cloudflare.com/", ["webproject"]),
    ]
    extras = {
        "cursor": [("code", [
            S("⌘ K", "打开内联编辑", "Open inline edit", "ai", "inline edit"),
            S("⌘ L", "打开 AI 聊天", "Open AI chat", "ai", "chat"),
            S("⌘ I", "打开智能代理", "Open agent", "ai", "agent"),
            S("⌘ ⇧ L", "将所选代码添加到聊天", "Add selection to chat", "ai", "chat"),
        ])],
        "dockerdesktop": [("utility", [
            S("⌘ K", "打开全局搜索", "Open global search", "search"),
            S("⌘ R", "刷新容器与镜像", "Refresh containers and images", "refresh"),
            S("⌘ ,", "打开设置", "Open settings", "settings"),
            S("⌘ W", "关闭当前窗口", "Close current window", "close"),
            S("⌘ Q", "退出 Docker Desktop", "Quit Docker Desktop", "quit"),
            S("Esc", "关闭详情或对话框", "Close details or dialog", "close"),
        ])],
        "github": [("navigation", [
            S("S", "聚焦站点搜索", "Focus site search", "search"),
            S("T", "打开文件查找器", "Open file finder", "file finder"),
            S(".", "在网页编辑器中打开仓库", "Open repository in web editor", "web editor"),
            S("Y", "获取文件永久链接", "Get permanent file link", "permalink"),
            S("B", "打开文件追溯视图", "Open file blame view", "blame"),
        ])],
    }
    return [define(*spec, extras=extras.get(spec[0])) for spec in specs]


def round_three() -> list[dict]:
    """Office, study, collaboration, AI and macOS utility apps."""
    specs = [
        ("pages", "Apple Pages", "Apple", "office", "#FF9F0A", "Pa", "https://support.apple.com/guide/pages/keyboard-shortcuts-tan4f2501bf/mac", ["document", "wordprocessing"]),
        ("numbers", "Apple Numbers", "Apple", "office", "#34C759", "Nu", "https://support.apple.com/guide/numbers/keyboard-shortcuts-tan9efc4a98f/mac", ["document", "spreadsheet"]),
        ("keynote", "Apple Keynote", "Apple", "office", "#0A84FF", "Ke", "https://support.apple.com/guide/keynote/keyboard-shortcuts-tan3a8c1a6b/mac", ["document", "presentation"]),
        ("preview", "Preview", "Apple", "study", "#0A84FF", "Pr", "https://support.apple.com/guide/preview/keyboard-shortcuts-cpprvw0003/mac", ["pdf"]),
        ("pdfexpert", "PDF Expert", "Readdle", "study", "#E53935", "PDF", "https://support.readdle.com/pdfexpert/en_US/keyboard-shortcuts", ["pdf"]),
        ("zotero", "Zotero", "Corporation for Digital Scholarship", "study", "#CC2936", "Z", "https://www.zotero.org/support/kb/keyboard_shortcuts", ["reference", "pdf"]),
        ("mendeley", "Mendeley Reference Manager", "Elsevier", "study", "#9D162E", "M", "https://service.elsevier.com/app/answers/detail/a_id/33564/supporthub/mendeley/", ["reference", "pdf"]),
        ("endnote", "EndNote", "Clarivate", "study", "#D74B4B", "EN", "https://docs.endnote.com/docs/endnote/2025/v1/macos/en/content/17keyboard_shortcuts/keyboard_shortcuts.htm", ["reference", "pdf"]),
        ("anki", "Anki", "Anki", "study", "#49A4DB", "An", "https://docs.ankiweb.net/studying.html#keyboard-shortcuts", ["notes"]),
        ("goodnotes", "Goodnotes", "Goodnotes", "study", "#4A90E2", "GN", "https://support.goodnotes.com/hc/en-us/articles/7353694456399-Keyboard-shortcuts", ["notes", "pdf"]),
        ("overleaf", "Overleaf", "Overleaf", "study", "#47A141", "Ov", "https://www.overleaf.com/learn/how-to/Keyboard_shortcuts", ["wordprocessing"]),
        ("texstudio", "TeXstudio", "TeXstudio", "study", "#6A7E95", "TeX", "https://texstudio-org.github.io/advanced.html#shortcuts", ["document", "vscode"]),
        ("drawio", "draw.io / diagrams.net", "JGraph", "design", "#F08705", "dI", "https://www.drawio.com/doc/faq/shortcuts", ["document", "canvas", "vector"]),
        ("xmind", "XMind", "XMind", "study", "#F45B69", "X", "https://xmind.com/user-guide/shortcuts-new/", ["document"]),
        ("mindnode", "MindNode", "IdeasOnCanvas", "study", "#E34856", "MN", "https://mindnode.com/support/keyboard-shortcuts", ["document"]),
        ("canva", "Canva", "Canva", "design", "#00C4CC", "Ca", "https://www.canva.com/help/keyboard-shortcuts/", ["document", "canvas", "vector"]),
        ("miro", "Miro", "Miro", "design", "#FFD02F", "Mi", "https://help.miro.com/hc/en-us/articles/360018052233-Shortcuts-and-hotkeys", ["document", "canvas", "vector"]),
        ("confluence", "Confluence", "Atlassian", "collaboration", "#172B4D", "Co", "https://support.atlassian.com/confluence-cloud/docs/keyboard-shortcuts-markdown-and-autocomplete/", ["notes", "projectmanagement"]),
        ("jira", "Jira", "Atlassian", "collaboration", "#0052CC", "Ji", "https://support.atlassian.com/jira-software-cloud/docs/use-keyboard-shortcuts/", ["projectmanagement"]),
        ("linear", "Linear", "Linear", "collaboration", "#5E6AD2", "Li", "https://linear.app/docs/keyboard-shortcuts", ["projectmanagement"]),
        ("trello", "Trello", "Atlassian", "collaboration", "#0079BF", "Tr", "https://support.atlassian.com/trello/docs/using-keyboard-shortcuts-in-trello/", ["projectmanagement"]),
        ("feishu", "飞书 / Lark", "ByteDance", "collaboration", "#3370FF", "飞书", "https://www.feishu.cn/hc/zh-CN/articles/360049067485", ["notes", "communication"]),
        ("yuque", "语雀", "Ant Group", "collaboration", "#25B864", "语雀", "https://www.yuque.com/yuque/help/keyboard-shortcuts", ["notes"]),
        ("teams", "Microsoft Teams", "Microsoft", "collaboration", "#6264A7", "T", "https://support.microsoft.com/office/keyboard-shortcuts-for-microsoft-teams-2e8e2a70-e8d8-4a19-949b-4c36dd5292d2", ["communication"]),
        ("zoom", "Zoom", "Zoom", "collaboration", "#2D8CFF", "Z", "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067050", ["communication"]),
        ("slack", "Slack", "Salesforce", "collaboration", "#4A154B", "Sl", "https://slack.com/help/articles/201374536-Slack-keyboard-shortcuts", ["communication"]),
        ("discord", "Discord", "Discord", "collaboration", "#5865F2", "Di", "https://support.discord.com/hc/en-us/articles/225977308-Keyboard-Navigation-FAQ", ["communication"]),
        ("wechat", "WeChat", "Tencent", "collaboration", "#07C160", "微", "https://mac.weixin.qq.com/", ["communication"]),
        ("raycast", "Raycast", "Raycast", "macUtility", "#FF6363", "Ra", "https://manual.raycast.com/keyboard-shortcuts", []),
        ("alfred", "Alfred", "Running with Crayons", "macUtility", "#6F4E9C", "Al", "https://www.alfredapp.com/help/getting-started/cheatsheet/", []),
        ("cleanshot", "CleanShot X", "Make The Web", "macUtility", "#7C5CFC", "CS", "https://cleanshot.com/help/", []),
        ("bartender", "Bartender", "Surtees Studios", "macUtility", "#505050", "B", "https://www.macbartender.com/Bartender5/Support/", []),
        ("rectangle", "Rectangle", "Ryan Hanson", "macUtility", "#2F80ED", "Re", "https://github.com/rxhanson/Rectangle/blob/main/README.md#keyboard-shortcuts", []),
        ("magnet", "Magnet", "Crowdcafe", "macUtility", "#E94E3D", "Ma", "https://magnet.crowdcafe.com/", []),
        ("paste", "Paste", "Paste Team", "macUtility", "#6C5CE7", "Pa", "https://pasteapp.io/help", []),
        ("onepassword", "1Password", "1Password", "macUtility", "#0572EC", "1P", "https://support.1password.com/keyboard-shortcuts/", []),
        ("tableau", "Tableau", "Salesforce", "dataAI", "#E97627", "Tb", "https://help.tableau.com/current/pro/desktop/en-us/shortcut.htm", ["document", "data"]),
        ("powerbiweb", "Power BI (Web)", "Microsoft", "dataAI", "#F2C811", "BI", "https://learn.microsoft.com/power-bi/create-reports/desktop-accessibility-keyboard-shortcuts", ["data", "webproject"]),
        ("amplitude", "Amplitude", "Amplitude", "dataAI", "#1C64F2", "Am", "https://amplitude.com/docs", ["data", "webproject"]),
        ("mixpanel", "Mixpanel", "Mixpanel", "dataAI", "#7856FF", "Mx", "https://docs.mixpanel.com/docs", ["data", "webproject"]),
        ("chatgpt", "ChatGPT", "OpenAI", "dataAI", "#10A37F", "GPT", "https://help.openai.com/en/articles/7996703-troubleshooting-chatgpt-error-messages", ["ai"]),
        ("claude", "Claude", "Anthropic", "dataAI", "#D97757", "Cl", "https://support.anthropic.com/", ["ai"]),
        ("codex", "Codex", "OpenAI", "dataAI", "#111111", "Cx", "https://developers.openai.com/codex/", ["ai"]),
        ("lmstudio", "LM Studio", "LM Studio", "dataAI", "#5C6AC4", "LM", "https://lmstudio.ai/docs", ["ai"]),
        ("comfyui", "ComfyUI", "Comfy Org", "dataAI", "#222222", "CU", "https://docs.comfy.org/interface/shortcuts", ["canvas"]),
        ("stablediffusion", "Stable Diffusion WebUI", "Community", "dataAI", "#7B61FF", "SD", "https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki", ["ai"]),
        ("runway", "Runway", "Runway", "dataAI", "#111111", "Rw", "https://help.runwayml.com/hc/en-us", ["ai", "timeline"]),
        ("midjourney", "Midjourney", "Midjourney", "dataAI", "#111111", "MJ", "https://docs.midjourney.com/", ["ai"]),
        ("adobefirefly", "Adobe Firefly", "Adobe", "dataAI", "#FF4F64", "Fi", "https://helpx.adobe.com/firefly/using/keyboard-shortcuts.html", ["ai"]),
        ("pika", "Pika", "Pika Labs", "dataAI", "#6C5CE7", "Pi", "https://pika.art/", ["ai"]),
        ("capcut", "CapCut", "ByteDance", "media", "#111111", "CC", "https://www.capcut.com/resource/capcut-keyboard-shortcuts", ["document", "timeline"]),
        ("audacity", "Audacity", "Muse Group", "media", "#0000CC", "Au", "https://manual.audacityteam.org/man/keyboard_shortcut_reference.html", ["document", "audio"]),
        ("obsstudio", "OBS Studio", "OBS Project", "media", "#302E31", "OBS", "https://obsproject.com/kb/hotkeys-in-obs-studio", []),
        ("iina", "IINA", "IINA", "media", "#393A3C", "I", "https://docs.iina.io/", ["mediaplayer"]),
        ("vlc", "VLC media player", "VideoLAN", "media", "#FF8800", "VLC", "https://wiki.videolan.org/Hotkeys_table/", ["mediaplayer"]),
        ("handbrake", "HandBrake", "HandBrake Team", "media", "#6E9F18", "HB", "https://handbrake.fr/docs/en/latest/technical/keyboard-shortcuts.html", ["document"]),
    ]
    extras = {
        "anki": [("study", [
            S("Space", "显示答案", "Show answer", "study", "answer"),
            S("1", "选择重来", "Answer again", "review"),
            S("2", "选择困难", "Answer hard", "review"),
            S("3", "选择良好", "Answer good", "review"),
            S("4", "选择简单", "Answer easy", "review"),
            S("E", "编辑当前卡片", "Edit current card", "edit"),
            S("B", "打开卡片浏览器", "Open card browser", "browser"),
            S("A", "添加卡片", "Add card", "add"),
        ])],
        "overleaf": [("document", [
            S("⌘ Enter", "重新编译项目", "Recompile project", "compile"),
            S("⌘ S", "保存并同步", "Save and sync", "save"),
            S("⌘ /", "切换注释", "Toggle comment", "comment"),
            S("⌘ F", "在当前文件中查找", "Find in current file", "find"),
            S("⌘ ⇧ F", "在项目中搜索", "Search project", "search"),
        ])],
        "xmind": [("objects", [
            S("Tab", "添加子主题", "Add subtopic", "topic"),
            S("Return", "添加同级主题", "Add sibling topic", "topic"),
            S("⌘ Return", "添加父主题", "Add parent topic", "topic"),
            S("Space", "编辑主题文本", "Edit topic text", "edit"),
            S("⌘ D", "复制主题", "Duplicate topic", "duplicate"),
            S("Delete", "删除主题", "Delete topic", "delete"),
            S("⌘ K", "插入超链接", "Insert hyperlink", "link"),
        ])],
        "mindnode": [("objects", [
            S("Tab", "添加子节点", "Add child node", "node"),
            S("Return", "添加同级节点", "Add sibling node", "node"),
            S("⌘ Return", "添加父节点", "Add parent node", "node"),
            S("Space", "编辑节点", "Edit node", "edit"),
            S("⌘ K", "添加连接", "Add connection", "connection"),
            S("Delete", "删除节点", "Delete node", "delete"),
        ])],
        "zoom": [("communication", [
            S("⌘ ⇧ A", "静音或取消静音", "Mute or unmute audio", "mute"),
            S("⌘ ⇧ V", "开启或关闭视频", "Start or stop video", "video"),
            S("⌘ ⇧ S", "开始或停止屏幕共享", "Start or stop screen sharing", "share screen"),
            S("⌘ ⇧ R", "开始本地录制", "Start local recording", "record"),
            S("⌘ U", "显示或隐藏参会者", "Show or hide participants", "participants"),
            S("⌘ ⇧ H", "显示或隐藏聊天", "Show or hide chat", "chat"),
        ])],
        "raycast": [("utility", [
            S("⌥ Space", "打开 Raycast", "Open Raycast", "open"),
            S("Esc", "返回或关闭", "Go back or close", "close"),
            S("⌘ K", "打开操作面板", "Open action panel", "actions"),
            S("⌘ ,", "打开设置", "Open settings", "settings"),
            S("↑", "选择上一个结果", "Select previous result", "navigation"),
            S("↓", "选择下一个结果", "Select next result", "navigation"),
            S("Return", "打开所选结果", "Open selected result", "open"),
            S("⌘ Return", "执行次要操作", "Run secondary action", "action"),
        ])],
        "alfred": [("utility", [
            S("⌥ Space", "打开 Alfred", "Open Alfred", "open"),
            S("Esc", "返回或关闭", "Go back or close", "close"),
            S("↑", "选择上一个结果", "Select previous result", "navigation"),
            S("↓", "选择下一个结果", "Select next result", "navigation"),
            S("Return", "打开所选结果", "Open selected result", "open"),
            S("⌘ Return", "显示文件操作", "Show file actions", "action"),
            S("⌘ ,", "打开偏好设置", "Open preferences", "settings"),
        ])],
        "cleanshot": [("capture", [
            S("⌘ ⇧ 3", "捕捉整个屏幕", "Capture full screen", "capture"),
            S("⌘ ⇧ 4", "捕捉区域", "Capture area", "capture"),
            S("⌘ ⇧ 5", "录制屏幕", "Record screen", "record"),
            S("Esc", "取消捕捉", "Cancel capture", "cancel"),
            S("Space", "在窗口捕捉模式间切换", "Toggle window capture mode", "window"),
            S("Return", "确认捕捉区域", "Confirm capture area", "capture"),
        ])],
        "bartender": [("utility", [
            S("⌘ ,", "打开 Bartender 设置", "Open Bartender settings", "settings"),
            S("←", "选择左侧菜单栏项目", "Select previous menu bar item", "navigation"),
            S("→", "选择右侧菜单栏项目", "Select next menu bar item", "navigation"),
            S("Return", "激活所选菜单栏项目", "Activate selected menu bar item", "activate"),
            S("Esc", "关闭菜单栏项目搜索", "Close menu bar item search", "close"),
        ])],
        "rectangle": [("utility", [
            S("⌃ ⌥ ←", "窗口置于左半屏", "Move window to left half", "window"),
            S("⌃ ⌥ →", "窗口置于右半屏", "Move window to right half", "window"),
            S("⌃ ⌥ ↑", "窗口置于上半屏", "Move window to top half", "window"),
            S("⌃ ⌥ ↓", "窗口置于下半屏", "Move window to bottom half", "window"),
            S("⌃ ⌥ Return", "最大化窗口", "Maximize window", "window"),
            S("⌃ ⌥ C", "窗口居中", "Center window", "window"),
            S("⌃ ⌥ Delete", "恢复窗口大小", "Restore window size", "window"),
        ])],
        "magnet": [("utility", [
            S("⌃ ⌥ ←", "窗口置于左半屏", "Move window to left half", "window"),
            S("⌃ ⌥ →", "窗口置于右半屏", "Move window to right half", "window"),
            S("⌃ ⌥ ↑", "窗口置于上半屏", "Move window to top half", "window"),
            S("⌃ ⌥ ↓", "窗口置于下半屏", "Move window to bottom half", "window"),
            S("⌃ ⌥ Return", "最大化窗口", "Maximize window", "window"),
            S("⌃ ⌥ C", "窗口居中", "Center window", "window"),
        ])],
        "paste": [("utility", [
            S("⌘ ⇧ V", "打开 Paste", "Open Paste", "open"),
            S("⌘ F", "搜索剪贴板历史", "Search clipboard history", "search"),
            S("←", "选择上一个剪贴项", "Select previous clip", "navigation"),
            S("→", "选择下一个剪贴项", "Select next clip", "navigation"),
            S("Return", "粘贴所选内容", "Paste selected clip", "paste"),
            S("Delete", "删除所选剪贴项", "Delete selected clip", "delete"),
            S("Esc", "关闭 Paste", "Close Paste", "close"),
        ])],
        "onepassword": [("utility", [
            S("⌘ ⇧ Space", "打开快速访问", "Open Quick Access", "quick access"),
            S("⌘ \\", "在浏览器中填充", "Fill in browser", "autofill"),
            S("⌘ F", "搜索项目", "Search items", "search"),
            S("⌘ N", "新建项目", "New item", "new"),
            S("⌘ E", "编辑项目", "Edit item", "edit"),
            S("⌘ ⇧ C", "复制密码", "Copy password", "copy", "password"),
            S("⌘ L", "锁定 1Password", "Lock 1Password", "lock"),
        ])],
        "comfyui": [("run", [
            S("⌃ Enter", "将工作流加入队列", "Queue workflow", "queue", "run"),
            S("⌃ ⇧ Enter", "将工作流加入队列前端", "Queue workflow at front", "queue"),
            S("⌘ S", "保存工作流", "Save workflow", "save"),
            S("⌘ O", "加载工作流", "Load workflow", "open"),
            S("⌘ A", "选择全部节点", "Select all nodes", "select"),
            S("⌃ M", "静音所选节点", "Mute selected nodes", "mute"),
            S("Delete", "删除所选节点", "Delete selected nodes", "delete"),
        ])],
        "obsstudio": [("capture", [
            S("⌘ ⇧ R", "开始或停止录制", "Start or stop recording", "record"),
            S("⌘ ⇧ S", "开始或停止推流", "Start or stop streaming", "stream"),
            S("⌘ ⇧ P", "暂停或继续录制", "Pause or resume recording", "record"),
            S("⌘ 1", "切换到场景 1", "Switch to scene 1", "scene"),
            S("⌘ 2", "切换到场景 2", "Switch to scene 2", "scene"),
            S("⌘ ,", "打开设置", "Open settings", "settings"),
        ])],
        "handbrake": [("general", [
            S("⌘ O", "打开视频源", "Open video source", "open"),
            S("⌘ B", "开始编码", "Start encode", "encode"),
            S("⌘ .", "停止编码", "Stop encode", "encode", "stop"),
            S("⌘ ⇧ A", "添加到队列", "Add to queue", "queue"),
            S("⌘ ⇧ Q", "显示队列", "Show queue", "queue"),
            S("⌘ ,", "打开偏好设置", "Open preferences", "settings"),
        ])],
    }
    return [define(*spec, extras=extras.get(spec[0])) for spec in specs]


def round_four() -> list[dict]:
    """Additional student software across Chinese and international campuses."""
    specs = [
        ("googledocs", "Google Docs", "Google", "office", "#4285F4", "Gd", "https://support.google.com/docs/answer/179738", ["wordprocessing"]),
        ("googlesheets", "Google Sheets", "Google", "office", "#0F9D58", "Gs", "https://support.google.com/docs/answer/181110", ["spreadsheet"]),
        ("googleslides", "Google Slides", "Google", "office", "#F4B400", "GSl", "https://support.google.com/docs/answer/1696717", ["presentation"]),
        ("wpsoffice", "WPS Office", "Kingsoft", "office", "#E53935", "WPS", "https://help.wps.com/articles/keyboard-shortcuts-in-wps-office", ["document", "wordprocessing", "spreadsheet", "presentation"]),
        ("adobeacrobat", "Adobe Acrobat", "Adobe", "study", "#EC1C24", "Ac", "https://helpx.adobe.com/acrobat/using/keyboard-shortcuts.html", ["pdf"]),
        ("evernote", "Evernote", "Evernote", "study", "#00A82D", "Ev", "https://help.evernote.com/hc/en-us/articles/208313358-Keyboard-shortcuts-in-Evernote-for-Mac", ["notes"]),
        ("ulysses", "Ulysses", "Ulysses GmbH", "study", "#E6A700", "Ul", "https://help.ulysses.app/kb/guide/en/keyboard-shortcuts-X6Kf9pG0RI/Steps/1905337", ["document", "notes"]),
        ("scrivener", "Scrivener", "Literature & Latte", "study", "#2F4F4F", "Sc", "https://www.literatureandlatte.com/learn-and-support/user-guides", ["document", "notes"]),
        ("dropbox", "Dropbox", "Dropbox", "collaboration", "#0061FF", "Db", "https://help.dropbox.com/view-edit/keyboard-shortcuts", ["filemanager"]),
        ("googledrive", "Google Drive", "Google", "collaboration", "#4285F4", "GD", "https://support.google.com/drive/answer/2563044", ["filemanager"]),
        ("onedrive", "Microsoft OneDrive", "Microsoft", "collaboration", "#0078D4", "OD", "https://support.microsoft.com/office/keyboard-shortcuts-for-onedrive-for-work-or-school-1a4b3253-f3a8-44ca-a30b-6aa5a5b6a693", ["filemanager"]),
        ("tencentmeeting", "腾讯会议", "Tencent", "collaboration", "#1F7CF0", "会", "https://meeting.tencent.com/support.html", ["communication"]),
        ("dingtalk", "钉钉", "Alibaba", "collaboration", "#0089FF", "钉", "https://page.dingtalk.com/wow/dingtalk/act/help", ["communication", "projectmanagement"]),
        ("qq", "QQ", "Tencent", "collaboration", "#12B7F5", "Q", "https://im.qq.com/macqq/", ["communication"]),
        ("eclipse", "Eclipse IDE", "Eclipse Foundation", "development", "#2C2255", "Ec", "https://help.eclipse.org/latest/topic/org.eclipse.platform.doc.user/reference/ref-keybindings.htm", ["vscode"]),
        ("sublimetext", "Sublime Text", "Sublime HQ", "development", "#FF9800", "ST", "https://www.sublimetext.com/docs/keyboard_shortcuts.html", ["vscode"]),
        ("onshape", "Onshape", "PTC", "engineering", "#1B5FAA", "On", "https://cad.onshape.com/help/Content/shortcut_keys.htm", ["document", "cad", "modeling"]),
        ("vectorworks", "Vectorworks", "Vectorworks", "architecture", "#D71920", "VW", "https://app-help.vectorworks.net/2025/eng/VW2025_Guide/Start/Keyboard_shortcuts.htm", ["document", "cad", "modeling"]),
        ("calibre", "Calibre", "Kovid Goyal", "study", "#1B6AC9", "Cb", "https://manual.calibre-ebook.com/keyboard_shortcuts.html", ["filemanager", "pdf"]),
        ("deepl", "DeepL", "DeepL", "study", "#0F2B46", "DL", "https://support.deepl.com/hc/en-us/articles/4407580229522-DeepL-for-Mac", ["notes"]),
        ("grammarly", "Grammarly", "Grammarly", "study", "#15C39A", "Gr", "https://support.grammarly.com/hc/en-us/articles/360049763572-Grammarly-for-Mac-user-guide", ["wordprocessing"]),
        ("todoist", "Todoist", "Doist", "collaboration", "#E44332", "Td", "https://todoist.com/help/articles/use-keyboard-shortcuts-in-todoist-Wyovn2", ["projectmanagement"]),
        ("ticktick", "TickTick", "Appest", "collaboration", "#4772FA", "Tk", "https://help.ticktick.com/articles/7055782407851413504", ["projectmanagement"]),
        ("brave", "Brave", "Brave Software", "browser", "#FB542B", "Br", "https://support.brave.com/hc/en-us/articles/360032272171-What-keyboard-shortcuts-can-I-use-in-Brave", ["browser"]),
    ]
    extras = {
        "tencentmeeting": [("communication", [
            S("⌘ ⇧ A", "静音或取消静音", "Mute or unmute", "mute"),
            S("⌘ ⇧ V", "开启或关闭视频", "Start or stop video", "video"),
            S("⌘ ⇧ S", "开始或停止共享", "Start or stop sharing", "share"),
            S("⌘ ⇧ H", "打开或关闭聊天", "Toggle chat", "chat"),
            S("⌘ U", "显示成员列表", "Show participants", "participants"),
        ])],
        "deepl": [("general", [
            S("⌘ C C", "将所选文本发送到 DeepL", "Send selected text to DeepL", "translate"),
            S("⌘ Enter", "翻译输入文本", "Translate input text", "translate"),
            S("⌘ ⇧ C", "复制翻译结果", "Copy translation", "copy"),
            S("⌘ K", "交换源语言和目标语言", "Swap source and target languages", "language"),
        ])],
    }
    return [define(*spec, extras=extras.get(spec[0])) for spec in specs]


WINDOWS_ONLY = [
    "3ds Max", "SolidWorks", "Creo", "CATIA", "Siemens NX", "Revit",
    "Lumion", "Power BI Desktop", "ANSYS", "OriginPro", "ArcGIS Pro",
]

NON_SHORTCUT_ECOSYSTEM = [
    "Node.js", "npm", "pnpm", "Yarn", "React", "Vue", "Angular", "Svelte",
    "Next.js", "Nuxt", "Tailwind CSS", "Sass", "Less", "PostCSS", "Java",
    "Python", "Go", "Rust", "C++", "Spring Boot", "Django", "FastAPI",
    "Express", "NestJS", "Gin", "Nginx", "Kubernetes", "AWS", "Google Cloud",
    "Azure", "阿里云", "腾讯云", "华为云", "Claude Code", "Ollama", "vLLM",
]

MAPPED_TO_PACKS = {
    "Git": ["terminal", "githubdesktop", "sourcetree", "tower"],
    "GitHub Copilot": ["vscode", "cursor", "intellij"],
    "Continue": ["vscode", "cursor"],
    "Cline": ["vscode", "cursor"],
    "Figma AI": ["figma"],
    "V-Ray": ["sketchup", "rhino", "cinema4d"],
    "MySQL": ["mysqlworkbench"],
    "PostgreSQL": ["pgadmin"],
    "MongoDB": ["mongodbcompass"],
    "Redis": ["redisinsight"],
    "SQLite": ["sqlitestudio"],
    "HuggingFace": ["vscode", "jupyter", "terminal"],
}


def existing_ids() -> set[str]:
    ids: set[str] = set()
    for path in (ROOT / "KeyFloat").glob("*shortcuts-mac.json"):
        if path == OUTPUT:
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        ids.update(pack["id"] for pack in data.get("software", []))
    return ids


def quarantined_legacy_packs() -> tuple[list[dict], int]:
    """Replace older hand-curated rows until every binding has official proof."""
    packs: list[dict] = []
    shortcut_count = 0
    for resource_name in LEGACY_RESOURCE_NAMES:
        library = json.loads((ROOT / "KeyFloat" / resource_name).read_text(encoding="utf-8"))
        for source_pack in library["software"]:
            software_id = source_pack["id"]
            shortcut_count += sum(
                len(category.get("items", []))
                for category in source_pack.get("categories", [])
            )
            if software_id not in LEGACY_PRODUCT_URLS or software_id not in LEGACY_GROUPS:
                raise ValueError(f"Missing legacy quarantine metadata for {software_id}")
            pack = {
                "id": software_id,
                "name": source_pack["name"],
                "vendor": source_pack["vendor"],
                "accent": source_pack["accent"],
                "glyph": source_pack["glyph"],
                "group": LEGACY_GROUPS[software_id],
                "dataStatus": "catalogOnly",
                "categories": [],
                "provenance": {
                    "sourceURL": LEGACY_PRODUCT_URLS[software_id],
                    "sourceTitle": f"{source_pack['name']} verification-pending catalog entry",
                    "appVersion": "Current macOS edition",
                    "verifiedAt": VERIFIED_AT,
                    "coverage": "catalog-only-unverified-shortcuts-removed",
                    "platform": "macOS",
                },
            }
            if source_pack.get("bundleIdentifiers"):
                pack["bundleIdentifiers"] = source_pack["bundleIdentifiers"]
            packs.append(pack)
    return packs, shortcut_count


def build() -> tuple[dict, dict]:
    legacy_packs, quarantined_legacy_shortcuts = quarantined_legacy_packs()
    rounds = [round_one(), round_two(), round_three(), round_four(), legacy_packs]
    software = [pack for current_round in rounds for pack in current_round]
    ids = [pack["id"] for pack in software]
    if len(ids) != len(set(ids)):
        raise ValueError("Generated ecosystem contains duplicate software ids")
    generated_shortcuts = sum(
        len(category["items"])
        for pack in software
        for category in pack["categories"]
    )
    library = {
        "version": 1,
        "platform": "macOS",
        "generatedAt": VERIFIED_AT,
        "sourceDocument": SOURCE_DOCUMENT,
        "software": software,
    }
    coverage = {
        "sourceDocument": SOURCE_DOCUMENT,
        "generatedAt": VERIFIED_AT,
        "existingSoftwareCount": len(existing_ids()),
        "generatedSoftwareCount": len(software),
        "generatedShortcutCount": generated_shortcuts,
        "quarantinedTemplateShortcutCount": QUARANTINED_TEMPLATE_SHORTCUT_COUNT,
        "quarantinedLegacyShortcutCount": quarantined_legacy_shortcuts,
        "rounds": [
            {"round": index + 1, "software": [pack["id"] for pack in packs]}
            for index, packs in enumerate(rounds)
        ],
        "windowsOnlyNotAdded": WINDOWS_ONLY,
        "mappedToIDEOrTerminal": NON_SHORTCUT_ECOSYSTEM,
        "mappedToShortcutPacks": MAPPED_TO_PACKS,
    }
    return library, coverage


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="Write generated JSON files")
    parser.add_argument("--check", action="store_true", help="Fail if generated files are stale")
    args = parser.parse_args()
    library, coverage = build()
    library_text = json.dumps(library, ensure_ascii=False, indent=2) + "\n"
    coverage_text = json.dumps(coverage, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != library_text:
            raise SystemExit(f"{OUTPUT.name} is stale; run with --write")
        if not COVERAGE.exists() or COVERAGE.read_text(encoding="utf-8") != coverage_text:
            raise SystemExit(f"{COVERAGE.name} is stale; run with --write")
    if args.write:
        OUTPUT.write_text(library_text, encoding="utf-8")
        COVERAGE.write_text(coverage_text, encoding="utf-8")
    print(
        f"Generated {len(library['software'])} software packs / "
        f"{coverage['generatedShortcutCount']} shortcuts"
    )


if __name__ == "__main__":
    main()
