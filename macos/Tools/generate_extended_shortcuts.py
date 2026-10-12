#!/usr/bin/env python3
"""Generate source-backed macOS shortcuts from the extended university catalog.

Unlike the broad ecosystem draft, this layer never creates shortcuts from a
generic application template. Every emitted row is transcribed from an
official manual, official help article, or the application's official source
tree. The coverage report records products that cannot yet be represented
without inventing a macOS key map.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "KeyFloat" / "extended-shortcuts-mac.json"
COVERAGE = ROOT / "Tools" / "extended-coverage.json"
SOURCE_DOCUMENT = "/Users/hualong/Downloads/工程师设计师常用软件生态库_扩展版.md"
VERIFIED_AT = "2026-07-21"


def slug(value: str) -> str:
    result = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return result or "shortcut"


def shortcut(
    keys: str | list[str],
    zh: str,
    en: str,
    *,
    item_id: str | None = None,
    keys_zh: list[str] | None = None,
    keys_en: list[str] | None = None,
) -> dict:
    item = {
        "id": item_id or slug(en),
        "keys": keys.split() if isinstance(keys, str) else keys,
        "zh": zh,
        "en": en,
        "tags": [slug(en).replace("-", " ")],
    }
    if keys_zh is not None:
        item["keysZh"] = keys_zh
    if keys_en is not None:
        item["keysEn"] = keys_en
    return item


S = shortcut


CATEGORY_TITLES = {
    "file": ("文件", "File"),
    "editing": ("编辑", "Editing"),
    "navigation": ("导航与视图", "Navigation & View"),
    "layout": ("对象与布局", "Objects & Layout"),
    "run": ("运行与调试", "Run & Debug"),
    "text": ("文本与代码", "Text & Code"),
    "notebook": ("实验记录", "Notebook"),
    "table": ("表格", "Tables"),
    "sequence": ("序列", "Sequences"),
    "tools": ("工具", "Tools"),
    "selection": ("选择", "Selection"),
    "templates": ("结构模板", "Templates"),
    "molecule": ("分子视图", "Molecule View"),
    "animation": ("动画", "Animation"),
    "slices": ("切片视图", "Slice Views"),
    "volume3d": ("三维视图", "3D Views"),
    "console": ("控制台", "Console"),
    "scene": ("场景与节点", "Scenes & Nodes"),
    "script": ("脚本编辑", "Script Editing"),
    "simulation": ("仿真", "Simulation"),
}


def category(category_id: str, items: list[dict]) -> dict:
    zh, en = CATEGORY_TITLES[category_id]
    used: dict[str, int] = {}
    normalized: list[dict] = []
    for raw in items:
        item = dict(raw)
        base = item["id"]
        used[base] = used.get(base, 0) + 1
        if used[base] > 1:
            item["id"] = f"{base}-{used[base]}"
        normalized.append(item)
    return {"id": category_id, "zh": zh, "en": en, "items": normalized}


def pack(
    software_id: str,
    name: str,
    vendor: str,
    group: str,
    accent: str,
    glyph: str,
    source_url: str,
    source_title: str,
    coverage: str,
    categories: list[dict],
    *,
    app_version: str,
    bundle_identifiers: list[str] | None = None,
) -> dict:
    result = {
        "id": software_id,
        "name": name,
        "vendor": vendor,
        "accent": accent,
        "glyph": glyph,
        "group": group,
        "dataStatus": "sourceBacked",
        "categories": categories,
        "provenance": {
            "sourceURL": source_url,
            "sourceTitle": source_title,
            "appVersion": app_version,
            "verifiedAt": VERIFIED_AT,
            "coverage": coverage,
            "platform": "macOS",
        },
    }
    if bundle_identifiers:
        result["bundleIdentifiers"] = bundle_identifiers
    return result


def catalog_pack(
    software_id: str,
    name: str,
    vendor: str,
    group: str,
    accent: str,
    glyph: str,
    source_url: str,
    source_title: str,
) -> dict:
    """Keep a macOS-capable product discoverable without inventing shortcuts."""
    return {
        "id": software_id,
        "name": name,
        "vendor": vendor,
        "accent": accent,
        "glyph": glyph,
        "group": group,
        "dataStatus": "catalogOnly",
        "categories": [],
        "provenance": {
            "sourceURL": source_url,
            "sourceTitle": source_title,
            "appVersion": "Current macOS or web edition",
            "verifiedAt": VERIFIED_AT,
            "coverage": "catalog-only-unverified-shortcuts-removed",
            "platform": "macOS",
        },
    }


def labview() -> dict:
    source = "https://www.ni.com/docs/en-US/bundle/labview/page/keyboard-shortcuts.html"
    return pack(
        "labview", "LabVIEW", "National Instruments", "electronics", "#FFDB00", "LV",
        source, "NI LabVIEW Keyboard Shortcuts", "official-table-macos-normalized",
        [
            category("file", [
                S("⌘ N", "新建空白虚拟仪器", "Open a blank VI"),
                S("⌘ O", "打开虚拟仪器", "Open an existing VI"),
                S("⌘ ⇧ O", "打开快速打开对话框", "Open Quick Open"),
                S("⌘ W", "关闭虚拟仪器", "Close VI"),
                S("⌘ S", "保存虚拟仪器", "Save VI"),
                S("⌘ ⇧ S", "保存全部文件", "Save all open files"),
                S("⌘ P", "打印窗口", "Print window"),
                S("⌘ Q", "退出应用", "Quit application"),
            ]),
            category("editing", [
                S("⌘ Z", "撤销", "Undo"),
                S("⌘ ⇧ Z", "重做", "Redo"),
                S("⌘ X", "剪切所选对象", "Cut selected objects"),
                S("⌘ C", "复制所选对象", "Copy selected objects"),
                S("⌘ V", "粘贴对象", "Paste objects"),
                S("⌘ A", "选择全部对象", "Select all objects"),
                S("⌘ U", "重新连接并整理程序框图", "Rewire and clean up diagram"),
            ]),
            category("layout", [
                S("⌘ K", "将所选对象前移一层", "Move selected objects forward"),
                S("⌘ J", "将所选对象后移一层", "Move selected objects backward"),
                S("⌘ ⇧ K", "将所选对象移至顶层", "Move selected objects to front"),
                S("⌘ ⇧ J", "将所选对象移至底层", "Move selected objects to back"),
                S("⌘ R", "旋转所选对象", "Rotate selected objects"),
                S("⌘ F", "翻转所选对象", "Flip selected objects"),
                S("⌘ =", "放大程序框图", "Zoom in block diagram"),
                S("⌘ -", "缩小程序框图", "Zoom out block diagram"),
                S("⌘ 0", "恢复实际大小", "Zoom to actual size"),
                S("F2", "切换完整程序框图视图", "Toggle full diagram view"),
            ]),
            category("navigation", [
                S("⌘ F", "搜索对象或文本", "Search objects or text"),
                S("⌘ ⇧ F", "显示搜索结果", "Show search results"),
                S("⌘ G", "查找下一个结果", "Find next result"),
                S("⌘ ⇧ G", "查找上一个结果", "Find previous result"),
                S("⌘ Tab", "切换至下一个窗口", "Cycle to next window"),
                S("⌘ ⇧ Tab", "切换至上一个窗口", "Cycle to previous window"),
                S("⌘ L", "显示错误列表", "Show error list"),
                S("⌘ ⇧ E", "在项目中显示当前虚拟仪器", "Show current VI in project"),
                S("⌘ ⇧ W", "显示全部窗口", "Show all windows"),
                S("⌘ E", "切换前面板与程序框图", "Toggle front panel and block diagram"),
                S("⌘ ⇧ Space", "显示快速放置对话框", "Show Quick Drop"),
                S("⌘ /", "最大化或还原窗口", "Maximize or restore window"),
                S("⌘ T", "分栏显示前面板与程序框图", "Tile front panel and block diagram"),
                S("⌘ I", "显示虚拟仪器属性", "Show VI properties"),
                S("⌘ Y", "显示历史窗口", "Show history window"),
                S("⌘ ⇧ H", "显示即时帮助", "Show context help"),
                S("F1", "显示应用帮助", "Show application help"),
            ]),
            category("run", [
                S("⌘ R", "运行虚拟仪器", "Run VI"),
                S("⌘ .", "停止运行", "Abort execution"),
                S("⌘ M", "切换运行与编辑模式", "Toggle run and edit mode"),
                S("⌘ D", "打开调试窗口", "Open debugging window"),
                S("⌘ ↓", "单步步入", "Step into"),
                S("⌘ →", "单步步过", "Step over"),
                S("⌘ ↑", "单步步出", "Step out"),
                S("⌘ B", "删除所有断线", "Remove all broken wires"),
                S("Esc", "取消当前连线", "Cancel wiring"),
                S("Space", "切换连线方向", "Toggle wiring direction"),
            ]),
            category("text", [
                S("⌘ A", "选择当前文本字段的全部文本", "Select all text in field"),
                S("⌘ →", "向前移动一个词", "Move forward one word"),
                S("⌘ ←", "向后移动一个词", "Move backward one word"),
                S("⌘ Home", "移至文本开始位置", "Move to start of text"),
                S("⌘ End", "移至文本结束位置", "Move to end of text"),
                S("⌘ Enter", "结束字符串输入", "Finish string entry"),
                S("⌘ B", "加粗文本", "Bold text"),
                S("⌘ I", "设为斜体", "Italicize text"),
                S("⌘ U", "添加下划线", "Underline text"),
            ]),
        ],
        app_version="LabVIEW current documentation",
    )


def plecs() -> dict:
    return pack(
        "plecs", "PLECS", "Plexim", "electronics", "#00A6D6", "PL",
        "https://www.plexim.com/sites/default/files/plecsmanual.pdf",
        "PLECS User Manual", "official-manual-explicit-macos-selection",
        [
            category("layout", [
                S("⌘ R", "旋转所选元件", "Rotate selected components"),
                S("⌘ F", "水平翻转所选元件", "Flip selected components horizontally"),
            ]),
            category("simulation", [
                S("⌘ T", "开始仿真", "Start simulation"),
                S("⌘ E", "打开仿真参数", "Open simulation parameters"),
            ]),
            category("editing", [
                S("⌘ V", "粘贴图像快照", "Paste image snapshot"),
            ]),
        ],
        app_version="PLECS manual, 2026-04-01",
    )


def benchling() -> dict:
    return pack(
        "benchling", "Benchling", "Benchling", "biology", "#6A5AE0", "Be",
        "https://help.benchling.com/hc/en-us/articles/39971013709965-Plan-experiments-and-collect-data-in-the-Notebook",
        "Benchling Notebook Shortcuts", "complete-official-macos-tables",
        [
            category("notebook", [
                S("⌘ C", "复制", "Copy"), S("⌘ X", "剪切", "Cut"),
                S("⌘ V", "粘贴", "Paste"), S("⌘ Z", "撤销", "Undo"),
                S("⌘ Y", "重做", "Redo", item_id="redo-command-y"),
                S("⌘ ⇧ Z", "重做", "Redo", item_id="redo-command-shift-z"),
                S("⌘ B", "粗体", "Bold"), S("⌘ I", "斜体", "Italic"),
                S("⌘ U", "下划线", "Underline"),
                S("⌘ ⇧ X", "删除线", "Strikethrough"),
                S("⌘ K", "插入链接", "Hyperlink"),
                S("⌘ ⇧ K", "等宽文本", "Monospace"),
                S("⌘ ;", "插入符号", "Insert symbol"),
                S("⌘ .", "上标", "Superscript"),
                S("⌘ ⇧ .", "下标", "Subscript"),
                S(["⌘", "\\"], "插入章节或日期", "Insert section or day"),
                S("⌃ `", "切换标题样式", "Cycle header style"),
                S("⌘ ⇧ 0", "切换到下一个标签页", "Switch to next tab"),
                S("⌘ ⇧ 9", "切换到上一个标签页", "Switch to previous tab"),
            ]),
            category("table", [
                S("Tab", "移动到右侧单元格", "Move to next cell"),
                S("⇧ Tab", "移动到左侧单元格", "Move to previous cell"),
                S("Return", "编辑单元格或向下移动", "Edit cell or move down"),
                S("⇧ Return", "完成编辑并向上移动", "Finish edit and move up"),
                S("F2", "编辑单元格", "Edit cell"),
                S("Esc", "取消编辑或清除选择", "Cancel editing or clear selection"),
                S("方向键", "按方向移动选择", "Move selection in arrow direction", keys_zh=["方向键"], keys_en=["Arrow keys"]),
                S("⇧ 方向键", "按方向扩展选择", "Extend selection in arrow direction", keys_zh=["⇧", "方向键"], keys_en=["⇧", "Arrow keys"]),
                S("⌘ 方向键", "移动到数据区域边缘", "Move to edge of data region", keys_zh=["⌘", "方向键"], keys_en=["⌘", "Arrow keys"]),
                S("⌘ ⇧ 方向键", "将选择扩展到数据区域边缘", "Extend selection to edge of data region", keys_zh=["⌘", "⇧", "方向键"], keys_en=["⌘", "⇧", "Arrow keys"]),
                S("⌘ A", "选择全部单元格", "Select all cells"),
            ]),
        ],
        app_version="Benchling web, article updated 2026",
    )


def geneious() -> dict:
    return pack(
        "geneious", "Geneious Prime", "Dotmatics", "biology", "#7CC043", "Ge",
        "https://manual.geneious.com/en/latest/GettingStarted.html#keyboard-shortcuts",
        "Geneious Prime User Manual", "official-manual-explicit-macos-selection",
        [
            category("editing", [
                S("⌘ X", "剪切文档或序列", "Cut document or sequence"),
                S("⌘ C", "复制文档或序列", "Copy document or sequence"),
                S("⌘ V", "粘贴文档或序列", "Paste document or sequence"),
                S("⌘ ⇧ V", "粘贴但不包含注释", "Paste without annotations"),
                S("⌘ Z", "撤销序列编辑", "Undo sequence edit"),
                S("⌘ A", "选择当前面板的全部内容", "Select all in current panel"),
            ]),
            category("navigation", [
                S("⌘ ⇧ P", "打开用户偏好设置", "Open user preferences"),
                S("⌥ 点击", "放大序列视图", "Zoom in sequence view", keys_zh=["⌥", "点击"], keys_en=["⌥", "Click"]),
                S("⌥ ⇧ 点击", "缩小序列视图", "Zoom out sequence view", keys_zh=["⌥", "⇧", "点击"], keys_en=["⌥", "⇧", "Click"]),
                S("⌘ ⌥ 点击拖动", "平移序列视图", "Pan sequence view", keys_zh=["⌘", "⌥", "点击拖动"], keys_en=["⌘", "⌥", "Click-drag"]),
                S("⌥ 滚轮", "缩放序列视图", "Zoom sequence view with wheel", keys_zh=["⌥", "滚轮"], keys_en=["⌥", "Wheel"]),
            ]),
        ],
        app_version="Geneious Prime latest manual",
    )


def vmd() -> dict:
    mouse = [
        ("R", "进入旋转模式或停止旋转", "Enter rotate mode or stop rotation"),
        ("T", "进入平移模式", "Enter translate mode"),
        ("S", "进入缩放模式", "Enter scale mode"),
        ("0", "查询项目", "Query item"), ("C", "设置旋转中心", "Set rotation center"),
        ("1", "拾取原子", "Pick atom"), ("2", "拾取化学键", "Pick bond"),
        ("3", "拾取键角", "Pick angle"), ("4", "拾取二面角", "Pick dihedral"),
        ("5", "移动原子", "Move atom"), ("6", "移动残基", "Move residue"),
        ("7", "移动片段", "Move fragment"), ("8", "移动分子", "Move molecule"),
        ("9", "移动高亮表示", "Move highlighted representation"),
        ("%", "对原子施加力", "Apply force to atom"),
        ("^", "对残基施加力", "Apply force to residue"),
        ("&", "对片段施加力", "Apply force to fragment"),
    ]
    view = [
        ("X", "绕横轴连续旋转", "Spin about X axis"),
        ("⇧ X", "绕横轴往复旋转", "Rock about X axis"),
        ("Y", "绕纵轴连续旋转", "Spin about Y axis"),
        ("⇧ Y", "绕纵轴往复旋转", "Rock about Y axis"),
        ("Z", "绕深度轴连续旋转", "Spin about Z axis"),
        ("⇧ Z", "绕深度轴往复旋转", "Rock about Z axis"),
        ("J", "沿横轴正向旋转", "Rotate positively about X"),
        ("K", "沿横轴反向旋转", "Rotate negatively about X"),
        ("L", "沿纵轴正向旋转", "Rotate positively about Y"),
        ("H", "沿纵轴反向旋转", "Rotate negatively about Y"),
        ("G", "沿深度轴正向旋转", "Rotate positively about Z"),
        ("⇧ G", "沿深度轴反向旋转", "Rotate negatively about Z"),
        ("⌃ A", "放大百分之十", "Enlarge by ten percent"),
        ("⌃ Z", "缩小百分之十", "Shrink by ten percent"),
        ("⌃ R", "重置显示", "Reset display"),
    ]
    menus = [
        ("⌥ M", "显示主菜单", "Show main menu"),
        ("⌥ F", "显示文件菜单", "Show files menu"),
        ("⌥ G", "显示图形菜单", "Show graphics menu"),
        ("⌥ L", "显示标签菜单", "Show labels menu"),
        ("⌥ R", "显示渲染菜单", "Show render menu"),
        ("⌥ D", "显示显示设置菜单", "Show display menu"),
        ("⌥ C", "显示颜色菜单", "Show color menu"),
        ("⌥ Q", "确认后退出", "Quit with confirmation"),
        ("⌥ ⇧ Q", "直接退出", "Quit immediately"),
        ("⌥ H", "切换超文本模式", "Toggle hypertext mode"),
    ]
    animation = [
        ("+", "移动到下一帧", "Move to next frame"),
        ("-", "移动到上一帧", "Move to previous frame"),
        (".", "正向播放动画", "Play animation forward"),
        (",", "反向播放动画", "Play animation in reverse"),
        ("/", "暂停动画", "Pause animation"),
    ]
    return pack(
        "vmd", "VMD", "University of Illinois", "biology", "#315C9B", "VMD",
        "https://www.ks.uiuc.edu/Research/vmd/current/ug/node34.html",
        "VMD User's Guide - Hot Keys", "complete-official-hotkey-tables",
        [
            category("molecule", [S(k, zh, en) for k, zh, en in mouse]),
            category("navigation", [S(k, zh, en) for k, zh, en in view + menus]),
            category("animation", [S(k, zh, en) for k, zh, en in animation]),
        ],
        app_version="VMD current user guide",
    )


def avogadro() -> dict:
    tool_names = [
        (1, "导航工具", "Navigation tool"), (2, "绘制工具", "Draw tool"),
        (3, "模板工具", "Template tool"), (4, "选择工具", "Selection tool"),
        (5, "操作工具", "Manipulation tool"), (6, "化学键中心操作工具", "Bond-centric manipulation tool"),
        (7, "自动优化工具", "Auto-optimization tool"), (8, "测量工具", "Measure tool"),
        (9, "动画工具", "Animation tool"),
    ]
    geometry = [
        ("1", "线形端点", "Linear terminal geometry"), ("2", "线形", "Linear geometry"),
        ("3", "平面三角形", "Trigonal planar geometry"), ("4", "四面体", "Tetrahedral geometry"),
        ("4 4", "平面正方形", "Square planar geometry"), ("5", "三角双锥", "Trigonal bipyramidal geometry"),
        ("5 5", "四方锥", "Square pyramidal geometry"), ("6", "八面体", "Octahedral geometry"),
        ("6 6", "三棱柱", "Trigonal prismatic geometry"), ("7", "五角双锥", "Pentagonal bipyramidal geometry"),
        ("8", "四方反棱柱", "Square antiprismatic geometry"),
    ]
    ligands = [
        ("A", "水配体", "Aqua ligand"), ("C O", "羰基配体", "Carbonyl ligand"),
        ("C N", "氰基配体", "Cyano ligand"), ("N", "氨配体", "Ammine ligand"),
        ("P", "膦配体", "Phosphine ligand"), ("P Y R", "吡啶基配体", "Pyridyl ligand"),
        ("S", "硫醇配体", "Thiol ligand"), ("A C A C", "乙酰丙酮配体", "Acetylacetonate ligand"),
        ("B P Y", "联吡啶配体", "Bipyridine ligand"), ("E N", "乙二胺配体", "Ethylenediamine ligand"),
        ("O X", "草酸配体", "Oxalate ligand"), ("P H E N", "邻菲罗啉配体", "Phenanthroline ligand"),
        ("T P Y", "三联吡啶配体", "Terpyridine ligand"), ("E D T A", "乙二胺四乙酸配体", "EDTA ligand"),
        ("E 2", "乙烯配体", "Ethylene ligand"), ("E 5", "环戊二烯基配体", "Cyclopentadienyl ligand"),
        ("E 6", "苯配体", "Benzene ligand"),
    ]
    groups = [
        ("C 1", "甲基", "Methyl group"), ("C 2", "乙基", "Ethyl group"),
        ("C 3", "丙基", "Propyl group"), ("C 4", "丁基", "Butyl group"),
        ("C 5", "戊基", "Pentyl group"), ("C 6", "己基", "Hexyl group"),
        ("C 7", "庚基", "Heptyl group"), ("C 8", "辛基", "Octyl group"),
        ("C 9", "壬基", "Nonyl group"), ("C 0", "癸基", "Decyl group"),
        ("I", "异丙基", "Isopropyl group"), ("K", "叔丁基", "Tert-butyl group"),
        ("B O C", "叔丁氧羰基保护基", "BOC protecting group"),
        ("C B Z", "苄氧羰基保护基", "CBZ protecting group"),
        ("F M O C", "芴甲氧羰基保护基", "FMOC protecting group"),
        ("T O S", "对甲苯磺酰保护基", "Tosyl protecting group"),
    ]
    return pack(
        "avogadro", "Avogadro", "Open Chemistry", "chemistry", "#2D7DD2", "Av",
        "https://raw.githubusercontent.com/avogadro/two.avogadro.cc/main/source/docs/tools/keyboard-shortcuts.md",
        "Avogadro Official Keyboard Shortcuts", "official-page-selection",
        [
            category("tools", [S(f"⌘ {n}", zh, en) for n, zh, en in tool_names]),
            category("selection", [
                S("⌘ A", "选择全部原子", "Select all atoms"),
                S("⌘ ⇧ A", "取消选择全部原子", "Deselect all atoms"),
                S("⌘ ⌥ O", "优化几何结构", "Optimize geometry"),
                S("1", "设置单键", "Set single bond order"),
                S("2", "设置双键", "Set double bond order"),
                S("3", "设置三键", "Set triple bond order"),
                S("←", "切换到上一个模板标签", "Previous template tab"),
                S("→", "切换到下一个模板标签", "Next template tab"),
                S("+", "增加形式电荷", "Increase formal charge"),
                S("-", "减少形式电荷", "Decrease formal charge"),
            ]),
            category("navigation", [
                S("方向键", "旋转分子", "Rotate molecule", keys_zh=["方向键"], keys_en=["Arrow keys"]),
                S("⇧ ←", "绕深度轴向左旋转", "Rotate left about Z axis"),
                S("⇧ →", "绕深度轴向右旋转", "Rotate right about Z axis"),
                S("⌘ 方向键", "平移分子", "Pan molecule", keys_zh=["⌘", "方向键"], keys_en=["⌘", "Arrow keys"]),
                S("⇧ ↑", "放大分子", "Zoom in molecule"),
                S("⇧ ↓", "缩小分子", "Zoom out molecule"),
                S("X", "沿横轴对齐", "Align to X axis"),
                S("Y", "沿纵轴对齐", "Align to Y axis"),
                S("Z", "沿深度轴对齐", "Align to Z axis"),
                S("Return", "确认标签", "Confirm label"),
            ]),
            category("templates", [S(k, zh, en) for k, zh, en in geometry + ligands + groups]),
        ],
        app_version="Avogadro 2 documentation main branch",
        bundle_identifiers=["org.openchemistry.Avogadro2"],
    )


def slicer() -> dict:
    return pack(
        "slicer", "3D Slicer", "Slicer Community", "medical", "#F37C20", "3D",
        "https://slicer.readthedocs.io/en/latest/user_guide/user_interface.html#mouse-keyboard-shortcuts",
        "3D Slicer Mouse & Keyboard Shortcuts", "complete-official-macos-section",
        [
            category("navigation", [
                S("⌘ F", "按名称查找模块", "Find module by name"),
                S("⌘ O", "从文件添加数据", "Add data from file"),
                S("⌘ S", "将数据保存到文件", "Save data to files"),
                S("⌘ W", "关闭场景", "Close scene"),
                S("⌘ 0", "显示错误日志", "Show error log"),
                S("⌘ 1", "显示应用帮助", "Show application help"),
                S("⌘ 2", "显示应用设置", "Show application settings"),
                S("⌘ 3", "显示或隐藏脚本控制台", "Toggle script console"),
                S("⌘ 4", "显示扩展管理器", "Show extensions manager"),
                S("⌘ 5", "显示或隐藏模块面板", "Toggle module panel"),
                S("⌘ H", "打开默认启动模块", "Open default startup module"),
            ]),
            category("slices", [
                S("⌘ 滚轮", "缩放切片图像", "Zoom slice image", keys_zh=["⌘", "滚轮"], keys_en=["⌘", "Wheel"]),
                S("中键拖动", "平移切片视图", "Pan slice view", keys_zh=["中键拖动"], keys_en=["Middle-drag"]),
                S("⇧ 点击拖动", "平移切片视图", "Pan slice view with modifier", keys_zh=["⇧", "点击拖动"], keys_en=["⇧", "Click-drag"]),
                S("←", "移动到上一个切片", "Move to previous slice"),
                S("→", "移动到下一个切片", "Move to next slice"),
                S("⇧ 移动鼠标", "在全部视图中移动十字线", "Move crosshair in all views", keys_zh=["⇧", "移动鼠标"], keys_en=["⇧", "Move pointer"]),
                S("V", "切换切片在三维视图中的可见性", "Toggle slice visibility in 3D"),
                S("R", "重置缩放和平移", "Reset zoom and pan"),
                S("G", "切换分割或标签图可见性", "Toggle segmentation or labelmap"),
                S("T", "切换前景体数据可见性", "Toggle foreground volume"),
                S("[", "选择上一个背景体数据", "Previous background volume"),
                S("]", "选择下一个背景体数据", "Next background volume"),
                S("{", "选择上一个前景体数据", "Previous foreground volume"),
                S("}", "选择下一个前景体数据", "Next foreground volume"),
                S("双击", "最大化视图或还原布局", "Maximize view or restore layout", keys_zh=["双击"], keys_en=["Double click"]),
            ]),
            category("volume3d", [
                S("⇧ 移动鼠标", "从三维视图移动全部视图的十字线", "Move crosshair in all views from 3D view", keys_zh=["⇧", "移动鼠标"], keys_en=["⇧", "Move pointer"]),
                S("点击拖动", "旋转三维视图", "Rotate 3D view", keys_zh=["点击拖动"], keys_en=["Click-drag"]),
                S("←", "向左旋转视图", "Rotate view left"),
                S("→", "向右旋转视图", "Rotate view right"),
                S("↑", "向上旋转视图", "Rotate view up"),
                S("↓", "向下旋转视图", "Rotate view down"),
                S("End", "切换到前侧视图", "View from anterior"),
                S("⇧ End", "切换到后侧视图", "View from posterior"),
                S("PageDown", "切换到左侧视图", "View from left"),
                S("⇧ PageDown", "切换到右侧视图", "View from right"),
                S("Home", "切换到上侧视图", "View from superior"),
                S("⇧ Home", "切换到下侧视图", "View from inferior"),
                S("⌘ B", "切换倾斜锁定", "Toggle tilt lock"),
                S("+", "放大三维视图", "Zoom in 3D view"),
                S("-", "缩小三维视图", "Zoom out 3D view"),
                S("⇧ ←", "向左平移视图", "Pan view left"),
                S("⇧ →", "向右平移视图", "Pan view right"),
                S("⇧ ↑", "向上平移视图", "Pan view up"),
                S("⇧ ↓", "向下平移视图", "Pan view down"),
                S("Insert", "重置三维视图", "Reset 3D view"),
                S("双击", "最大化三维视图或还原布局", "Maximize 3D view or restore layout", keys_zh=["双击"], keys_en=["Double click"]),
            ]),
            category("console", [
                S("Tab", "自动补全", "Auto-complete"),
                S("↑", "上一条命令", "Previous command"),
                S("↓", "下一条命令", "Next command"),
                S("Esc", "清除当前命令行", "Clear current command line"),
                S("⌘ G", "从文件运行脚本", "Run script from file"),
                S("⌘ V", "粘贴并运行脚本", "Paste and run script"),
            ]),
        ],
        app_version="3D Slicer latest documentation",
        bundle_identifiers=["org.slicer.slicer"],
    )


def godot() -> dict:
    source = "https://github.com/godotengine/godot/blob/master/editor/editor_node.cpp"
    scene = [
        ("⌘ L", "锁定所选节点", "Lock selected nodes"),
        ("⌘ ⇧ L", "解锁所选节点", "Unlock selected nodes"),
        ("⌘ G", "组合所选节点", "Group selected nodes"),
        ("⌘ ⇧ G", "取消组合所选节点", "Ungroup selected nodes"),
        ("H", "切换所选节点可见性", "Toggle selected nodes visibility"),
        ("Space", "平移视图", "Pan view"),
        ("⌘ A", "添加子节点", "Add child node"),
        ("⌘ ⇧ A", "实例化子场景", "Instantiate child scene"),
        ("⌘ D", "复制节点", "Duplicate node"),
        ("⌘ ↑", "向上移动节点", "Move node up"),
        ("⌘ ↓", "向下移动节点", "Move node down"),
        ("Delete", "删除节点", "Delete node"),
        ("Return", "重命名节点", "Rename node"),
    ]
    editor = [
        ("⌘ ⇧ P", "打开命令面板", "Open command palette"),
        ("⌘ F", "聚焦搜索栏", "Focus search bar"),
        ("⌘ W", "关闭场景", "Close scene"),
        ("⌘ ⌃ F", "切换全屏模式", "Toggle full screen mode"),
        ("⌘ ⇧ D", "切换无干扰模式", "Toggle distraction-free mode"),
        ("⌘ ⌃ 1", "切换到二维编辑器", "Switch to 2D editor"),
        ("⌘ ⌃ 2", "切换到三维编辑器", "Switch to 3D editor"),
        ("⌘ ⌃ 3", "切换到脚本编辑器", "Switch to script editor"),
        ("⌘ ⌃ 4", "切换到游戏视图", "Switch to game view"),
        ("⌘ ⌃ 5", "切换到资源商店", "Switch to asset store"),
    ]
    run = [
        ("⌘ B", "运行项目", "Run project"),
        ("⌘ R", "运行当前场景", "Run current scene"),
        ("⌘ ⇧ R", "运行指定场景", "Run specific scene"),
        ("⌘ .", "停止运行项目", "Stop running project"),
        ("⌘ ⌃ Y", "暂停运行项目", "Pause running project"),
        ("F10", "单步步过", "Step over"),
        ("F11", "单步步入", "Step into"),
        ("⌥ F11", "单步步出", "Step out"),
        ("F12", "继续调试", "Continue debugging"),
    ]
    script = [
        ("⌘ L", "转到指定行", "Go to line"),
        ("⌘ G", "查找下一个", "Find next"),
        ("⌘ ⇧ G", "查找上一个", "Find previous"),
        ("⌘ ⌥ F", "替换", "Replace"),
        ("⌘ ⇧ B", "切换断点", "Toggle breakpoint"),
        ("⌘ ⇧ C", "复制所选内容", "Duplicate selection"),
        ("⌘ ⇧ ↓", "复制当前行", "Duplicate line"),
    ]
    return pack(
        "godot", "Godot Engine", "Godot Foundation", "gameDevelopment", "#478CBF", "Go",
        source, "Godot official editor source shortcuts and macOS overrides",
        "official-source-macos-selection",
        [
            category("scene", [S(k, zh, en) for k, zh, en in scene]),
            category("navigation", [S(k, zh, en) for k, zh, en in editor]),
            category("run", [S(k, zh, en) for k, zh, en in run]),
            category("script", [S(k, zh, en) for k, zh, en in script]),
        ],
        app_version="Godot master source, 2026-07-21 snapshot",
        bundle_identifiers=["org.godotengine.godot"],
    )


def catalog_only_packs() -> list[dict]:
    """Products from the extended catalog whose macOS defaults are not proven."""
    C = catalog_pack
    return [
        C(
            "eagle", "Eagle", "Autodesk", "electronics", "#F5A623", "Ea",
            "https://help.autodesk.com/view/fusion360/ENU/?guid=ECD-OVERVIEW",
            "Autodesk Eagle and Fusion Electronics documentation",
        ),
        C(
            "stm32cubeide", "STM32CubeIDE", "STMicroelectronics", "electronics", "#03234B", "ST",
            "https://www.st.com/en/development-tools/stm32cubeide.html",
            "STM32CubeIDE product page",
        ),
        C(
            "mplabx", "MPLAB X IDE", "Microchip Technology", "electronics", "#EE1C25", "MX",
            "https://www.microchip.com/en-us/tools-resources/develop/mplab-x-ide",
            "MPLAB X IDE product page",
        ),
        C(
            "snapgene", "SnapGene", "Dotmatics", "biology", "#2C9AB7", "SG",
            "https://www.snapgene.com/",
            "SnapGene product page",
        ),
        C(
            "mega", "MEGA", "MEGA Software", "biology", "#21409A", "ME",
            "https://www.megasoftware.net/",
            "MEGA molecular evolutionary genetics analysis",
        ),
        C(
            "clcgenomics", "CLC Genomics Workbench", "QIAGEN", "biology", "#5C2483", "CLC",
            "https://digitalinsights.qiagen.com/products-overview/discovery-insights-portfolio/analysis-and-visualization/qiagen-clc-genomics-workbench/",
            "QIAGEN CLC Genomics Workbench product page",
        ),
        C(
            "chimerax", "ChimeraX", "UCSF RBVI", "biology", "#3D8C40", "CX",
            "https://www.cgl.ucsf.edu/chimerax/",
            "UCSF ChimeraX product page",
        ),
        C(
            "flowjo", "FlowJo", "BD Biosciences", "biology", "#F58220", "FJ",
            "https://www.flowjo.com/",
            "FlowJo product page",
        ),
        C(
            "marvinsketch", "MarvinSketch", "Chemaxon", "chemistry", "#008BD2", "MS",
            "https://chemaxon.com/marvin",
            "Chemaxon Marvin product page",
        ),
        C(
            "maple", "Maple", "Maplesoft", "dataAI", "#D71920", "Mp",
            "https://www.maplesoft.com/products/Maple/",
            "Maplesoft Maple product page",
        ),
        C(
            "sasstudio", "SAS Studio", "SAS", "dataAI", "#007CC3", "SAS",
            "https://www.sas.com/en_us/software/studio.html",
            "SAS Studio product page",
        ),
        C(
            "osirix", "OsiriX", "Pixmeo", "medical", "#00A7E1", "OX",
            "https://www.osirix-viewer.com/",
            "OsiriX product page",
        ),
        C(
            "horos", "Horos", "Horos Project", "medical", "#3B8CFF", "Ho",
            "https://horosproject.org/",
            "Horos Project product page",
        ),
        C(
            "envi", "ENVI", "NV5 Geospatial", "architecture", "#4A8F3A", "EN",
            "https://www.nv5geospatialsoftware.com/Products/ENVI",
            "NV5 ENVI product page",
        ),
        C(
            "substancepainter", "Substance 3D Painter", "Adobe", "gameDevelopment", "#FF8A00", "SP",
            "https://www.adobe.com/products/substance3d/apps/painter.html",
            "Adobe Substance 3D Painter product page",
        ),
        C(
            "houdini", "Houdini", "SideFX", "gameDevelopment", "#FF5A00", "Ho",
            "https://www.sidefx.com/products/houdini/",
            "SideFX Houdini product page",
        ),
    ]


def build() -> tuple[dict, dict]:
    source_backed = [labview(), plecs(), benchling(), geneious(), vmd(), avogadro(), slicer(), godot()]
    catalog_only = catalog_only_packs()
    software = source_backed + catalog_only
    shortcut_count = sum(len(c["items"]) for s in software for c in s["categories"])
    coverage = {
        "sourceDocument": SOURCE_DOCUMENT,
        "generatedAt": VERIFIED_AT,
        "policy": "Only source-backed macOS shortcuts are emitted; no generic templates.",
        "addedSoftware": [s["id"] for s in software],
        "addedSoftwareCount": len(software),
        "addedSourceBackedSoftware": [s["id"] for s in source_backed],
        "addedCatalogOnlySoftware": [s["id"] for s in catalog_only],
        "addedShortcutCount": shortcut_count,
        "alreadyCovered": [
            "KiCad", "LTspice", "Arduino IDE", "MATLAB", "Simulink", "PyMOL",
            "ImageJ / Fiji", "GraphPad Prism", "ChemDraw", "Wolfram Mathematica",
            "RStudio", "JupyterLab", "IBM SPSS Statistics", "QGIS", "Unity",
            "Unreal Engine", "Zotero", "EndNote", "Mendeley Reference Manager", "Overleaf",
        ],
        "mappedToExistingHosts": {
            "PlatformIO": ["vscode"],
            "OpenFOAM": ["terminal", "vscode"],
            "Gaussian": ["terminal"],
            "ORCA": ["terminal"],
            "GROMACS": ["terminal"],
            "LAMMPS": ["terminal"],
            "Anaconda": ["terminal", "jupyter"],
            "PyTorch": ["jupyter", "vscode"],
            "TensorFlow": ["jupyter", "vscode"],
            "Keras": ["jupyter", "vscode"],
            "Pandas": ["jupyter", "vscode"],
            "NumPy": ["jupyter", "vscode"],
            "Matplotlib": ["jupyter", "vscode"],
            "Google Colab": ["jupyter", "chrome"],
            "LaTeX": ["texstudio", "overleaf"],
            "ArcGIS Online": ["chrome", "safari"],
        },
        "windowsOnlyNotAdded": [
            "Altium Designer", "Cadence OrCAD", "Cadence Allegro", "Proteus", "Multisim",
            "Keil MDK", "IAR Embedded Workbench", "PSIM", "Solid Edge", "Autodesk Inventor",
            "Adams", "HyperMesh", "ANSYS Fluent", "STAR-CCM+", "Materials Studio",
            "ERDAS Imagine", "ArcGIS Pro", "OriginPro",
        ],
        "noIndependentKeyboardUI": [
            "MSC Nastran", "OpenFOAM", "Gaussian", "ORCA", "GROMACS", "LAMMPS",
            "PyTorch", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib", "LaTeX",
        ],
        "macOSDefaultMapNotPubliclyVerifiable": [s["name"] for s in catalog_only],
    }
    return {"software": software}, coverage


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write generated JSON files")
    parser.add_argument("--check", action="store_true", help="verify generated files are current")
    args = parser.parse_args()
    library, coverage = build()
    library_text = json.dumps(library, ensure_ascii=False, indent=2) + "\n"
    coverage_text = json.dumps(coverage, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != library_text:
            raise SystemExit(f"{OUTPUT.name} is out of date; run with --write")
        if not COVERAGE.exists() or COVERAGE.read_text(encoding="utf-8") != coverage_text:
            raise SystemExit(f"{COVERAGE.name} is out of date; run with --write")
    if args.write:
        OUTPUT.write_text(library_text, encoding="utf-8")
        COVERAGE.write_text(coverage_text, encoding="utf-8")
    print(
        f"Generated {len(coverage['addedSourceBackedSoftware'])} source-backed packs, "
        f"{len(coverage['addedCatalogOnlySoftware'])} catalog-only packs / "
        f"{coverage['addedShortcutCount']} shortcuts"
    )


if __name__ == "__main__":
    main()
