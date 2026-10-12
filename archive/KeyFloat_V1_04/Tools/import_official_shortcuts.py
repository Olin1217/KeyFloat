#!/usr/bin/env python3
"""Build KeyFloat's bilingual macOS supplemental library from official help pages.

The importer writes JSON to stdout by default. ``--write`` updates only the
supplemental data resource, and ``--check`` keeps that generated file reproducible.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from copy import deepcopy
from collections import OrderedDict
from html.parser import HTMLParser
from pathlib import Path


VERIFIED_AT = "2026-07-21"
OUTPUT = Path(__file__).resolve().parents[1] / "KeyFloat" / "supplemental-shortcuts-mac.json"
PHOTOSHOP_EXPORT = Path(__file__).resolve().parents[2] / "photoshop-default-shortcuts.html"
PHOTOSHOP_HELP_URL = "https://helpx.adobe.com/photoshop/desktop/get-started/settings-and-preferences/view-keyboard-shortcuts.html"
SOURCES = {
    "terminal_en": "https://support.apple.com/guide/terminal/keyboard-shortcuts-trmlshtcts/mac",
    "terminal_zh": "https://support.apple.com/zh-cn/guide/terminal/keyboard-shortcuts-trmlshtcts/mac",
    "safari_en": "https://support.apple.com/guide/safari/keyboard-and-other-shortcuts-cpsh003/mac",
    "safari_zh": "https://support.apple.com/zh-cn/guide/safari/keyboard-and-other-shortcuts-cpsh003/mac",
    "finder_en": "https://support.apple.com/en-us/102650",
    "finder_zh": "https://support.apple.com/zh-cn/102650",
    "illustrator_en": "https://helpx.adobe.com/illustrator/using/default-keyboard-shortcuts.html",
    "illustrator_zh": "https://helpx.adobe.com/cn/illustrator/using/default-keyboard-shortcuts.html",
    "matlab_en": "https://www.mathworks.com/help/matlab/matlab_prog/editor-keyboard-shortcuts.html",
    "word_en": "https://support.microsoft.com/en-US/accessibility/word/keyboard-shortcuts-in-word",
    "word_zh": "https://support.microsoft.com/zh-cn/accessibility/word/keyboard-shortcuts-in-word",
    "excel_en": "https://support.microsoft.com/en-US/accessibility/excel/keyboard-shortcuts-in-excel",
    "excel_zh": "https://support.microsoft.com/zh-cn/accessibility/excel/keyboard-shortcuts-in-excel",
    "powerpoint_en": "https://support.microsoft.com/en-US/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations",
    "powerpoint_zh": "https://support.microsoft.com/zh-cn/accessibility/powerpoint/use-keyboard-shortcuts-to-create-powerpoint-presentations",
    "onenote_en": "https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-onenote-44b8b3f4-c274-4bcc-a089-e80fdcc87950",
    "onenote_zh": "https://support.microsoft.com/zh-cn/office/keyboard-shortcuts-in-onenote-44b8b3f4-c274-4bcc-a089-e80fdcc87950",
    "pages_en": "https://support.apple.com/guide/pages/keyboard-shortcuts-tanc0ffef022/mac",
    "pages_zh": "https://support.apple.com/zh-cn/guide/pages/keyboard-shortcuts-tanc0ffef022/mac",
    "numbers_en": "https://support.apple.com/guide/numbers/keyboard-shortcuts-tana45192591/mac",
    "numbers_zh": "https://support.apple.com/zh-cn/guide/numbers/keyboard-shortcuts-tana45192591/mac",
    "keynote_en": "https://support.apple.com/guide/keynote/keyboard-shortcuts-tanfde4a3e6d/mac",
    "keynote_zh": "https://support.apple.com/zh-cn/guide/keynote/keyboard-shortcuts-tanfde4a3e6d/mac",
    "affinity_en": "https://affinity.help/designer2/en-US.lproj/pages/Workspace/shortcuts.html",
    "affinity_zh": "https://affinity.help/designer2/zh-Hans.lproj/pages/Workspace/shortcuts.html",
    "affinity_photo_en": "https://affinity.help/photo2/en-US.lproj/pages/Workspace/shortcuts.html",
    "affinity_photo_zh": "https://affinity.help/photo2/zh-Hans.lproj/pages/Workspace/shortcuts.html",
    "affinity_publisher_en": "https://affinity.help/publisher2/en-US.lproj/pages/Workspace/shortcuts.html",
    "affinity_publisher_zh": "https://affinity.help/publisher2/zh-Hans.lproj/pages/Workspace/shortcuts.html",
}

SPAN_KEYS = {
    "SHIFT-TAG": "⇧",
    "ALT-TAG": "⌥",
    "CMD-TAG": "⌘",
    "CTRL-TAG": "⌃",
    "BACKSPACE-TAG": "Delete",
    "CLICK-TAG": "Click",
    "DOWN-TAG": "↓",
    "ESC-TAG": "Esc",
    "FN-TAG": "Fn",
    "LEFT-TAG": "←",
    "RETURN-TAG": "Return",
    "RIGHT-TAG": "→",
    "SPACEBAR-TAG": "Space",
    "TAB-TAG": "Tab",
    "UP-TAG": "↑",
}


def fetch(url: str) -> str:
    completed = subprocess.run(
        ["/usr/bin/curl", "-L", "--max-time", "30", "-sS", url],
        check=True,
        capture_output=True,
    )
    return completed.stdout.decode("utf-8")


def compact(value: str) -> str:
    return " ".join(html.unescape(value).split())


def slug(value: str, fallback: str) -> str:
    result = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return result[:54] or fallback


def stable_item_id(
    software_id: str,
    category_id: str,
    action: str,
    key_description: str,
    used_ids: set[str],
) -> str:
    action_part = slug(action, "shortcut")[:42]
    key_part = slug(key_description, "key")[:24]
    base = f"{software_id}.{category_id}.{action_part}.{key_part}"
    candidate = base
    suffix = 2
    while candidate in used_ids:
        candidate = f"{base}.{suffix}"
        suffix += 1
    used_ids.add(candidate)
    return candidate


def normalize_zh_title(value: str) -> str:
    replacements = [
        (r"Pixel Persona", "像素角色"),
        (r"Unicode", "统一码"),
        (r"Retina", "视网膜"),
        (r"\bStudio\b", "工作室"),
        (r"\bUI\b", "界面"),
        (r"\bURL\b", "网址"),
        (r"\bOption\b", "⌥"),
        (r"\bMeta\b", "元"),
        (r"\bman 页面", "手册页面"),
    ]
    for pattern, replacement in replacements:
        value = re.sub(pattern, replacement, value)
    return value


class AppleTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.table_title: str | None = None
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.row_number = 0
        self.rows: list[tuple[str, str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "table":
            self.table_title = attributes.get("aria-label") or "Shortcuts"
            self.row_number = 0
        elif self.table_title and tag == "tr":
            self.row = []
        elif self.table_title and self.row is not None and tag in ("td", "th"):
            self.cell = []
        elif self.cell is not None and tag == "br":
            self.cell.append(" / ")

    def handle_data(self, data: str) -> None:
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if self.cell is not None and tag in ("td", "th"):
            assert self.row is not None
            self.row.append(compact("".join(self.cell)))
            self.cell = None
        elif self.table_title and tag == "tr":
            if self.row_number > 0 and self.row and len(self.row) >= 2:
                self.rows.append((self.table_title, self.row[0], self.row[1]))
            self.row_number += 1
            self.row = None
        elif tag == "table":
            self.table_title = None


class AppleIWorkTableParser(HTMLParser):
    """Parse iWork tables while preserving paragraph-separated alternatives."""

    def __init__(self) -> None:
        super().__init__()
        self.table_title: str | None = None
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.row_number = 0
        self.rows: list[tuple[str, str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "table":
            self.table_title = attributes.get("aria-label") or "Shortcuts"
            self.row_number = 0
        elif self.table_title and tag == "tr":
            self.row = []
        elif self.table_title and self.row is not None and tag in ("td", "th"):
            self.cell = []
        elif self.cell is not None and tag == "br":
            self.cell.append(" / ")
        elif self.cell is not None and tag == "p" and self.cell and self.row:
            self.cell.append(" / ")

    def handle_data(self, data: str) -> None:
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if self.cell is not None and tag in ("td", "th"):
            assert self.row is not None
            value = compact("".join(self.cell))
            value = re.sub(r"(?:\s*/\s*)+", " / ", value).strip(" / ")
            self.row.append(value)
            self.cell = None
        elif self.table_title and tag == "tr":
            if self.row_number > 0 and self.row and len(self.row) >= 2:
                self.rows.append((self.table_title, self.row[0], self.row[1]))
            self.row_number += 1
            self.row = None
        elif tag == "table":
            self.table_title = None


class AffinityParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.category: str | None = None
        self.heading: list[str] | str | None = None
        self.in_heading = False
        self.in_table = False
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.row_number = 0
        self.skip_windows_depth = 0
        self.rows: list[tuple[str, str, str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        classes = (attributes.get("class") or "").split()
        if tag == "x-win32":
            self.skip_windows_depth += 1
            return
        if self.skip_windows_depth:
            return
        if tag == "div" and attributes.get("data-category"):
            self.category = attributes["data-category"]
        elif tag == "h2" and "table" in classes:
            self.in_heading = True
            self.heading = []
        elif tag == "table" and "shortcut" in classes:
            self.in_table = True
            self.row_number = 0
        elif self.in_table and tag == "tr":
            self.row = []
        elif self.in_table and self.row is not None and tag in ("td", "th"):
            self.cell = []
        elif self.cell is not None and tag == "span":
            for class_name in classes:
                if class_name in SPAN_KEYS:
                    self.cell.append(SPAN_KEYS[class_name])
        elif self.cell is not None and tag == "br":
            self.cell.append(" / ")

    def handle_data(self, data: str) -> None:
        if self.skip_windows_depth:
            return
        if self.in_heading:
            assert isinstance(self.heading, list)
            self.heading.append(data)
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "x-win32":
            self.skip_windows_depth = max(0, self.skip_windows_depth - 1)
            return
        if self.skip_windows_depth:
            return
        if tag == "h2" and self.in_heading:
            self.in_heading = False
            assert isinstance(self.heading, list)
            self.heading = compact("".join(self.heading))
        elif self.cell is not None and tag in ("td", "th"):
            assert self.row is not None
            self.row.append(compact("".join(self.cell)))
            self.cell = None
        elif self.in_table and tag == "tr":
            if self.row_number > 0 and self.row and len(self.row) >= 2:
                self.rows.append(
                    (self.category or "misc", str(self.heading or "Shortcuts"), self.row[0], self.row[1])
                )
            self.row_number += 1
            self.row = None
        elif tag == "table":
            self.in_table = False


class AppleArticleSectionParser(HTMLParser):
    def __init__(self, section_id: str) -> None:
        super().__init__()
        self.section_id = section_id
        self.active = False
        self.in_item = False
        self.in_first_bold = False
        self.item_text: list[str] = []
        self.key_text: list[str] = []
        self.has_key = False
        self.rows: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "h2":
            self.active = attributes.get("id") == self.section_id
        elif self.active and tag == "li":
            self.in_item = True
            self.item_text = []
            self.key_text = []
            self.has_key = False
        elif self.in_item and tag == "b" and not self.has_key:
            self.in_first_bold = True
            self.has_key = True
        elif self.in_item and tag == "br":
            self.item_text.append(" ")

    def handle_data(self, data: str) -> None:
        if not self.in_item:
            return
        self.item_text.append(data)
        if self.in_first_bold:
            self.key_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "b" and self.in_first_bold:
            self.in_first_bold = False
        elif tag == "li" and self.in_item:
            full_text = compact("".join(self.item_text))
            key = compact("".join(self.key_text)).rstrip(":")
            if key and full_text.startswith(key):
                action = full_text[len(key):].lstrip(": ")
                if action:
                    self.rows.append((key, action))
            self.in_item = False


class AdobeShortcutTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.heading: list[str] | str = "Shortcuts"
        self.in_heading = False
        self.in_table = False
        self.rows: list[list[str]] = []
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.tables: list[tuple[str, list[list[str]]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        classes = (attributes.get("class") or "").split()
        if tag in ("h2", "h3") and "section-title" in classes:
            self.in_heading = True
            self.heading = []
        elif tag == "table":
            self.in_table = True
            self.rows = []
        elif self.in_table and tag == "tr":
            self.row = []
        elif self.in_table and self.row is not None and tag in ("td", "th"):
            self.cell = []
        elif self.cell is not None and tag == "br":
            self.cell.append(" / ")

    def handle_data(self, data: str) -> None:
        if self.in_heading:
            assert isinstance(self.heading, list)
            self.heading.append(data)
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag in ("h2", "h3") and self.in_heading:
            self.in_heading = False
            assert isinstance(self.heading, list)
            self.heading = compact("".join(self.heading))
        elif self.cell is not None and tag in ("td", "th"):
            assert self.row is not None
            self.row.append(compact("".join(self.cell)))
            self.cell = None
        elif self.in_table and tag == "tr":
            if self.row:
                self.rows.append(self.row)
            self.row = None
        elif tag == "table" and self.in_table:
            self.in_table = False
            if len(self.rows) > 1:
                self.tables.append((str(self.heading), self.rows))


class MicrosoftMacTableParser(HTMLParser):
    """Extract only the macOS tab from a Microsoft Support shortcut page."""

    def __init__(self) -> None:
        super().__init__()
        self.section_depth = 0
        self.heading: list[str] | str = "Shortcuts"
        self.in_heading = False
        self.in_table = False
        self.rows: list[list[str]] = []
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.tables: list[tuple[str, list[list[str]]]] = []

    @property
    def in_macos_section(self) -> bool:
        return self.section_depth > 0

    @staticmethod
    def image_key(alt: str) -> str:
        lowered = alt.lower()
        if "delete" in lowered or "删除" in alt:
            return "Delete"
        if "command" not in lowered and "命令" not in alt:
            return ""
        modifiers: list[str] = []
        if "control" in lowered:
            modifiers.append("Control")
        if "alt" in lowered or "option" in lowered:
            modifiers.append("Option")
        if "shift" in lowered:
            modifiers.append("Shift")
        modifiers.append("Command")
        return "+".join(modifiers)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "section" and attributes.get("data-tab") == "macos":
            self.section_depth = 1
            return
        if not self.in_macos_section:
            return
        if tag == "section":
            self.section_depth += 1
        if tag in ("h2", "h3", "h4"):
            self.in_heading = True
            self.heading = []
        elif tag == "table":
            self.in_table = True
            self.rows = []
        elif self.in_table and tag == "tr":
            self.row = []
        elif self.in_table and self.row is not None and tag in ("td", "th"):
            self.cell = []
        elif self.cell is not None and tag == "img":
            key = self.image_key(attributes.get("alt") or "")
            if key:
                self.cell.append(f" {key} ")
        elif self.cell is not None and tag == "br":
            self.cell.append(" / ")
        elif self.cell is not None and tag in ("p", "div") and self.cell:
            # Paragraphs in key cells commonly separate alternatives. Paragraphs
            # in action cells are only explanatory formatting.
            self.cell.append(" / " if self.row else " ")

    def handle_data(self, data: str) -> None:
        if self.in_heading:
            assert isinstance(self.heading, list)
            self.heading.append(data)
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if not self.in_macos_section:
            return
        if tag in ("h2", "h3", "h4") and self.in_heading:
            self.in_heading = False
            assert isinstance(self.heading, list)
            self.heading = compact("".join(self.heading))
        elif self.cell is not None and tag in ("td", "th"):
            assert self.row is not None
            value = compact("".join(self.cell))
            value = re.sub(r"(?:\s*/\s*)+", " / ", value).strip(" / ")
            self.row.append(value)
            self.cell = None
        elif self.in_table and tag == "tr":
            if self.row:
                self.rows.append(self.row)
            self.row = None
        elif tag == "table" and self.in_table:
            self.in_table = False
            if len(self.rows) > 1:
                self.tables.append((str(self.heading), self.rows))
        if tag == "section":
            self.section_depth -= 1


def parse_apple(source: str) -> list[tuple[str, str, str]]:
    parser = AppleTableParser()
    parser.feed(source)
    return parser.rows


def parse_iwork(source: str) -> list[tuple[str, str, str]]:
    parser = AppleIWorkTableParser()
    parser.feed(source)
    return parser.rows


def parse_affinity(source: str) -> list[tuple[str, str, str, str]]:
    parser = AffinityParser()
    parser.feed(source)
    return parser.rows


def parse_apple_article_section(source: str, section_id: str) -> list[tuple[str, str]]:
    parser = AppleArticleSectionParser(section_id)
    parser.feed(source)
    return parser.rows


def parse_adobe_tables(source: str) -> list[tuple[str, list[list[str]]]]:
    parser = AdobeShortcutTableParser()
    parser.feed(source)
    return parser.tables


def parse_microsoft_macos_tables(source: str) -> list[tuple[str, list[list[str]]]]:
    parser = MicrosoftMacTableParser()
    parser.feed(source)
    return parser.tables


def split_key_text(value: str, language: str) -> list[str]:
    value = compact(value)
    value = value.replace("。", ".").replace("，", ",").replace("（", "(").replace("）", ")")
    # Adobe writes this key as ``\ (backslash)`` (and ``\(反斜线)`` on the
    # Chinese page). Normalize the explanatory label before the single-key
    # fast path so the UI receives the actual key instead of prose.
    value = re.sub(
        r"\\\s*\(\s*(?:backslash|反斜线)\s*\)",
        lambda _match: "\\",
        value,
        flags=re.I,
    )
    symbol_explanations = {
        "+": r"plus|加",
        "-": r"minus|减",
        "]": r"right\s+square\s+bracket|右方括号",
        "[": r"left\s+square\s+bracket|左方括号",
        "/": r"forward\s+slash|正斜线",
        "`": r"above\s+the\s+tab\s+key|tab\s*键上方",
    }
    for symbol, explanation in symbol_explanations.items():
        value = re.sub(
            rf"{re.escape(symbol)}\s*\(\s*(?:{explanation})\s*\)",
            lambda _match, symbol=symbol: symbol,
            value,
            flags=re.I,
        )
    if value in {"+", "-", ".", ",", "/", "\\", "[", "]", ";", "=", "~", "`"}:
        return [value]

    lowered = value.lower()
    if language == "en":
        if lowered.startswith("numeric keys"):
            return ["Number"]
        if "international and selected keyboards" in lowered:
            return ["/"]
        if "mouse scroll wheel" in lowered:
            modifiers = [symbol for symbol in "⌥⇧⌃⌘" if symbol in value]
            return modifiers + ["Wheel"]
        if "while rotating the document view" in lowered:
            modifiers = [symbol for symbol in "⌥⇧⌃⌘" if symbol in value]
            return modifiers + ["Drag"]
        if "option key while moving the pointer" in lowered:
            return ["⌥", "Click"]
        if "shift and command keys and double-click" in lowered:
            return ["⇧", "⌘", "Double click"]
        if "triple-click" in lowered:
            return ["Triple click"]
        if "double-click" in lowered and "command" not in lowered:
            return ["Double click"]
        if "option key and drag" in lowered:
            return ["⌥", "Drag"]
        if "hold down the command key and double-click" in lowered:
            return ["⌘", "Double click"]
        if "drag the file" in lowered:
            return ["Drag"]
        if "press tab twice" in lowered:
            return ["Tab", "Tab"]
        if "then press tab" in lowered:
            return ["Tab"]
        if "typing command-period" in lowered:
            return ["⌘", "."]
    else:
        if value.startswith("数字键"):
            return ["数字"]
        if "仅限国际键盘" in value:
            return ["/"]
        if "鼠标滚轮" in value:
            modifiers = [symbol for symbol in "⌥⇧⌃⌘" if symbol in value]
            return modifiers + ["滚轮"]
        if "旋转文档视图" in value:
            modifiers = [symbol for symbol in "⌥⇧⌃⌘" if symbol in value]
            return modifiers + ["拖动"]
        if "按住 option" in lowered and "指针" in value:
            return ["⌥", "点击"]
        if "shift" in lowered and "command" in lowered and "连按两下" in value:
            return ["⇧", "⌘", "双击"]
        if "连按三下" in value:
            return ["三击"]
        if "连按两下" in value and "command" not in lowered:
            return ["双击"]
        if "按住 option" in lowered and ("拖移" in value or "拖动" in value):
            return ["⌥", "拖动"]
        if "按住 command" in lowered and "连按两下" in value:
            return ["⌘", "双击"]
        if "从“访达”拖" in value or "从访达拖" in value:
            return ["拖动"]
        if "按下两次 tab" in lowered:
            return ["Tab", "Tab"]
        if "然后按下 tab" in lowered:
            return ["Tab"]
        if "command-句点" in lowered:
            return ["⌘", "."]

    replacements = [
        (r"(?i)forward delete", "ForwardDelete"),
        (r"(?i)page up", "PageUp"),
        (r"(?i)page down", "PageDown"),
        (r"(?i)up arrow", "↑"),
        (r"(?i)down arrow", "↓"),
        (r"(?i)left arrow", "←"),
        (r"(?i)right arrow", "→"),
        (r"(?i)command", "⌘"),
        (r"(?i)option", "⌥"),
        (r"(?i)control", "⌃"),
        (r"(?i)shift", "⇧"),
        (r"(?i)grave accent\s*\(`\)", "`"),
        (r"(?i)tilde\s*\(~\)", "~"),
        (r"(?i)backslash\s*\(\\\)", "\\"),
        (r"(?i)plus\s*\(\+\)", "+"),
        (r"(?i)minus\s*\([–-]\)", "-"),
        (r"(?i)comma\s*\(,\)", ","),
        (r"(?i)period\s*\(\.\)", "."),
        (r"(?i)question mark\s*\(\?\)", "?"),
        (r"(?i)slash\s*\(/\)", "/"),
    ]
    for pattern, replacement in replacements:
        value = re.sub(pattern, lambda _match, replacement=replacement: replacement, value)

    value = re.sub(r"\s*\([^)]*(available|equivalent|or use|可用)[^)]*\)\s*", "", value, flags=re.I)
    modifiers = list(dict.fromkeys(re.findall(r"[⌘⌥⌃⇧]", value)))
    remainder = re.sub(r"[⌘⌥⌃⇧]", "", value)
    if remainder.strip() in {"+", "-", ".", ",", "/", "\\", "[", "]", ";", "=", "~", "`"}:
        return modifiers + [remainder.strip()]
    # Capture punctuation before separator cleanup. Without this,
    # ``Command + -`` was reduced to the modifier alone.
    punctuation_key = re.search(r"\+\s*([+\-.,/\\\[\];=~`?])\s*$", remainder)
    if punctuation_key:
        return modifiers + [punctuation_key.group(1)]
    remainder = re.sub(r"^[\s\-–—+]+|[\s\-–—+]+$", "", remainder)
    remainder = re.sub(r"\s*[\-–—+]\s*", " ", remainder)
    remainder = compact(remainder)

    canonical = {
        "ForwardDelete": "Forward Delete",
        "PageUp": "Page Up",
        "PageDown": "Page Down",
        "Space bar": "Space",
        "Spacebar": "Space",
    }
    remainder = canonical.get(remainder, remainder)
    if len(remainder) > 30:
        if language == "en" and "drag" in remainder.lower():
            remainder = "Drag"
        elif language == "zh" and ("拖动" in remainder or "拖移" in remainder):
            remainder = "拖动"
    return modifiers + ([remainder] if remainder else [])


def make_item(item_id: str, action_en: str, action_zh: str, key_en: str, key_zh: str) -> dict:
    keys_en = split_key_text(key_en, "en")
    keys_zh = split_key_text(key_zh, "zh")
    if not keys_en:
        raise ValueError(f"No parsed key for {item_id}: {key_en}")
    item = {
        "id": item_id,
        "keys": keys_zh or keys_en,
        "zh": normalize_zh_title(action_zh),
        "en": action_en,
        "tags": ["official", "macOS"],
    }
    if keys_en != item["keys"]:
        item["keysEn"] = keys_en
    return item


def make_direct_item(
    item_id: str,
    action_en: str,
    action_zh: str,
    keys_en: list[str],
    keys_zh: list[str],
) -> dict:
    item = {
        "id": item_id,
        "keys": keys_zh,
        "zh": normalize_zh_title(action_zh),
        "en": action_en,
        "tags": ["official", "macOS"],
    }
    if keys_en != keys_zh:
        item["keysEn"] = keys_en
    return item


MICROSOFT_KEY_LABELS = {
    "PageUp": ("Page Up", "向上翻页"),
    "PageDown": ("Page Down", "向下翻页"),
    "ArrowKeys": ("Arrow keys", "方向键"),
    "LeftArrow": ("←", "←"),
    "RightArrow": ("→", "→"),
    "UpArrow": ("↑", "↑"),
    "DownArrow": ("↓", "↓"),
    "ForwardDelete": ("Forward Delete", "向前删除"),
    "Delete": ("Delete", "删除"),
    "Home": ("Home", "起始键"),
    "End": ("End", "结束键"),
    "Return": ("Return", "回车"),
    "Tab": ("Tab", "制表"),
    "Esc": ("Esc", "退出"),
    "Space": ("Space", "空格"),
    "Help": ("Help", "帮助"),
    "Clear": ("Clear", "清除"),
    "NumberPad": ("Number pad", "数字键盘"),
    "Click": ("Click", "点击"),
    "DoubleClick": ("Double click", "双击"),
    "TripleClick": ("Triple click", "三击"),
    "Drag": ("Drag", "拖动"),
    "Wheel": ("Wheel", "滚轮"),
    "Repeat": ("Repeat", "重复"),
    "Type": ("Type", "输入"),
    "Number": ("Number", "数字"),
}


def canonical_microsoft_key_text(value: str) -> str:
    value = compact(value).replace("⁠", "")
    value = re.sub(r"\b(?:Cmd|Command)\s+Command\b", "Command", value, flags=re.I)
    value = re.sub(r"\bCommand\s+Shift\s*\+", "Command+Shift+", value, flags=re.I)
    value = re.sub(r"\b(?:Ctrl|Control)\s+Control\b", "Control", value, flags=re.I)
    value = re.sub(r"\b(?:Option|Alt)\s+Option\b", "Option", value, flags=re.I)
    value = re.sub(
        r"(?i)Inch\s+mark\s*/\s*Straight\s+double\s+quote\s*\(\"\)",
        "DoubleQuoteKey",
        value,
    )
    value = re.sub(r"(?i)Forward\s+slash\s*\(\s*/\s*\)", "ForwardSlashKey", value)
    value = re.sub(r"\s*\(for example,.*$", "", value, flags=re.I)
    return value


def microsoft_key_parts(value: str) -> list[str]:
    value = canonical_microsoft_key_text(value)
    # Microsoft sometimes abbreviates a shared modifier, for example
    # ``⌘+Up or Down arrow key``. Expand it before splitting alternatives so
    # neither the arrow nor the modifier is lost from either binding.
    value = re.sub(
        r"(?P<modifiers>(?:(?:Command|Cmd|Option|Alt|Control|Ctrl|Shift|Fn|[⌘⌥⌃⇧])\s*\+\s*)+)"
        r"(?P<first>Up|Down|Left|Right)\s+or\s+(?P<second>Up|Down|Left|Right)\s+arrow\s+key",
        lambda match: (
            f"{match.group('modifiers')}{match.group('first')} arrow key / "
            f"{match.group('modifiers')}{match.group('second')} arrow key"
        ),
        value,
        flags=re.I,
    )
    lowered = value.lower()
    if "move the focus to the page list" in lowered and "previous or next page" in lowered:
        return [
            "Command+Control+G",
            "Control+Option+Up arrow key",
            "Control+Option+Down arrow key",
            "Command+Page up",
            "Command+Page down",
        ]
    if "mouse click" in lowered or "mouse-click" in lowered:
        return [value]
    if "drag" in lowered or "scroll the mouse wheel" in lowered:
        return [value]
    press_matches = list(re.finditer(r"\bpress\s+", value, flags=re.I))
    if press_matches and ("first or last cell" in lowered or "first or last" in lowered):
        value = value[press_matches[-1].end():]
    value = re.sub(
        r"\s*/\s*(?:on a macbook|on macbook),?\s*(?:press\s*)?",
        " / ",
        value,
        flags=re.I,
    )
    value = re.sub(r"\s*/\s*(?:or|或者|或)?\s*/?\s*", " / ", value, flags=re.I)
    value = re.sub(r"\s+(?:or|或者|或)\s+", " / ", value, flags=re.I)
    value = re.sub(r"\s*\((?:not the forward delete key|不使用向前删除键)[^)]*\)", "", value, flags=re.I)
    value = re.sub(r"\s*\(not available[^)]*\)", "", value, flags=re.I)
    parts = [part.strip(" ,.;") for part in value.split(" / ") if part.strip(" ,.;")]
    key_hint = re.compile(
        r"[⌘⌥⌃⇧]|\b(?:command|cmd|option|alt|control|ctrl|shift|fn|f\d{1,2}|home|end|"
        r"return|enter|tab|esc|escape|space|spacebar|delete|help|clear|arrow|page|press|drag|scroll|"
        r"click|type|hyphen|sign|bracket|parenthesis|tilde|caret|zero|doublequotekey|"
        r"forwardslashkey)\b",
        flags=re.I,
    )
    return [
        part for part in parts
        if not part.startswith("(")
        and (key_hint.search(part) or len(part) == 1)
    ]


def microsoft_key_tokens(value: str) -> list[str]:
    value = canonical_microsoft_key_text(value)
    lowered = value.lower()
    modifier_tokens: list[str] = []
    modifier_patterns = [
        (r"\b(?:command|cmd)\b|命令|⌘", "⌘"),
        (r"\b(?:option|alt)\b|选项|⌥", "⌥"),
        (r"\b(?:control|ctrl)\b|控制|⌃", "⌃"),
        (r"\bshift\b|换档|上档|⇧", "⇧"),
    ]
    for pattern, symbol in modifier_patterns:
        if re.search(pattern, value, flags=re.I):
            modifier_tokens.append(symbol)

    if re.fullmatch(r"(?i)press\s*\(\s*,\s*C\s*,\s*\)", value):
        return ["(", "→", "C", "→", ")"]

    if "mouse click" in lowered or "mouse-click" in lowered:
        return modifier_tokens + ["Click"]
    if "triple-click" in lowered or "triple click" in lowered:
        return modifier_tokens + ["TripleClick"]
    if "double-click" in lowered or "double click" in lowered:
        return modifier_tokens + ["DoubleClick"]
    if "scroll the mouse wheel" in lowered or "mouse wheel" in lowered or re.search(r"\bscroll\b", lowered):
        return modifier_tokens + ["Wheel"]
    if "drag" in lowered:
        return modifier_tokens + ["Drag"]
    if re.search(r"\bclick\b", lowered):
        return modifier_tokens + ["Click"]
    if lowered.startswith("type "):
        return modifier_tokens + ["Type"]
    if "slide number" in lowered:
        return modifier_tokens + ["Number"]

    phrase_replacements = [
        (r"(?i)asterisk\s*\(\*\)", " AsteriskKey "),
        (r"(?i)question\s+mark\s*\(\?\)", " QuestionKey "),
        (r"(?i)colon\s*\(:\)", " ColonKey "),
        (r"(?i)1\s+through\s+7", " NumberRange "),
        (r"(?i)right\s+angle\s+bracket\s*\(>\)", " RightAngle "),
        (r"(?i)left\s+angle\s+bracket\s*\(<\)", " LeftAngle "),
        (r"(?i)right\s+bracket\s*\(\]\)", " RightBracket "),
        (r"(?i)left\s+bracket\s*\(\[\)", " LeftBracket "),
        (r"(?i)right parenthesis\s*\(\)\)", " RightParen "),
        (r"(?i)left parenthesis\s*\(\(\)", " LeftParen "),
        (r"(?i)forward delete", " ForwardDelete "),
        (r"(?i)page\s+up", " PageUp "),
        (r"(?i)page\s+down", " PageDown "),
        (r"(?i)up\s+arrow(?:\s+key)?", " UpArrow "),
        (r"(?i)down\s+arrow(?:\s+key)?", " DownArrow "),
        (r"(?i)left\s+arrow(?:\s+key)?", " LeftArrow "),
        (r"(?i)right\s+arrow(?:\s+key)?", " RightArrow "),
        (r"(?i)arrow\s+keys?", " ArrowKeys "),
        (r"(?i)plus(?:\s+sign)?\s*\(\s*\+\s*\)", " PlusKey "),
        (r"(?i)minus(?:\s+sign)?\s*\(\s*[–-]\s*\)", " MinusKey "),
        (r"(?i)plus\s+sign\b", " PlusKey "),
        (r"(?i)minus\s+sign\b", " MinusKey "),
        (r"(?i)vertical\s+bar\s*\(\s*\|\s*\)", " VerticalBarKey "),
        (r"(?i)equal\s+sign\s*\(\s*=\s*\)", " EqualsKey "),
        (r"(?i)hyphen(?:\s*\(\s*-\s*\))?", " MinusKey "),
        (r"(?i)tilde(?:\s+sign)?\s*\(~\)", " TildeKey "),
        (r"(?i)dollar\s+sign\s*\(\$\)", " DollarKey "),
        (r"(?i)percent\s+sign\s*\(%\)", " PercentKey "),
        (r"(?i)caret\s*\(\^\)", " CaretKey "),
        (r"(?i)number\s+sign\s*\(#\)", " NumberSignKey "),
        (r"(?i)at\s+symbol\s*\(@\)", " AtKey "),
        (r"(?i)exclamation\s+point\s*\(!\)", " ExclamationKey "),
        (r"(?i)zero\s*\(0\)", " ZeroKey "),
        (r"(?i)comma\s*\(,\)", " CommaKey "),
        (r"(?i)period\s*\(\.\)", " PeriodKey "),
        (r"(?i)semicolon\s*\(;\)", " SemicolonKey "),
        (r"(?i)apostrophe\s*\('\)", " ApostropheKey "),
        (r"(?i)grave\s+accent\s*\(`\)", " GraveKey "),
        (r"(?i)backslash\s*\(\\\)", " BackslashKey "),
        (r"(?i)slash\s*\(/\)", " SlashKey "),
        (r"(?i)space\s*bar|spacebar", " Space "),
        (r"(?i)tab\s+key", " Tab "),
        (r"(?i)return\s+key|enter\s+key", " Return "),
        (r"(?i)numeric\s+keypad|number\s+pad", " NumberPad "),
    ]
    normalized = value
    for pattern, replacement in phrase_replacements:
        normalized = re.sub(pattern, replacement, normalized)
    normalized = re.sub(r"\b(?:Command|Cmd|Option|Alt|Control|Ctrl|Shift)\b", " ", normalized, flags=re.I)
    normalized = re.sub(r"\band\s+press\s+", " Then ", normalized, flags=re.I)
    normalized = re.sub(
        r"(F\d{1,2})\s*,\s*(?=(?:LeftArrow|RightArrow|UpArrow|DownArrow|ArrowKeys))",
        r"\1 Then ",
        normalized,
        flags=re.I,
    )
    normalized = re.sub(r"(?:and\s+)?then\s+(?:press\s+)?", " Then ", normalized, flags=re.I)
    normalized = re.sub(r",\s*(?:and\s+)?then\s+(?:press\s+)?", " Then ", normalized, flags=re.I)
    normalized = re.sub(r",?\s+when\s+.*$", "", normalized, flags=re.I)
    normalized = re.sub(r"\s+until\s+.*$", "", normalized, flags=re.I)
    normalized = re.sub(r"\s+on a macbook.*$", "", normalized, flags=re.I)

    key_pattern = re.compile(
        r"ForwardDelete|PageUp|PageDown|ArrowKeys|LeftArrow|RightArrow|UpArrow|DownArrow|"
        r"AsteriskKey|QuestionKey|ColonKey|NumberRange|RightAngle|LeftAngle|RightBracket|LeftBracket|"
        r"RightParen|LeftParen|PlusKey|MinusKey|VerticalBarKey|"
        r"EqualsKey|TildeKey|DollarKey|PercentKey|CaretKey|NumberSignKey|AtKey|ExclamationKey|"
        r"ZeroKey|DoubleQuoteKey|ForwardSlashKey|CommaKey|PeriodKey|SemicolonKey|"
        r"ApostropheKey|GraveKey|BackslashKey|SlashKey|NumberPad|Then|Repeat|"
        r"\b(?:Fn|F\d{1,2}|Home|End|Return|Enter|Tab|Esc|Escape|Space|Delete|Help|Clear)\b|"
        r"(?<![A-Za-z])(?:[A-Z]|\d)(?![A-Za-z0-9])|[\[\]{}\\/;'`=.]|[←→↑↓]|\bDel\b"
    )
    found = key_pattern.findall(normalized)
    if "repeatedly" in lowered and "Repeat" not in found:
        found.append("Repeat")
    key_map = {
        "Enter": "Return", "Escape": "Esc", "AsteriskKey": "*", "QuestionKey": "?",
        "ColonKey": ":", "NumberRange": "1–7", "RightAngle": ">", "LeftAngle": "<",
        "RightBracket": "]", "LeftBracket": "[", "RightParen": ")", "LeftParen": "(",
        "PlusKey": "+", "MinusKey": "-", "EqualsKey": "=", "CommaKey": ",",
        "PeriodKey": ".", "SemicolonKey": ";", "ApostropheKey": "'", "GraveKey": "`",
        "BackslashKey": "\\", "SlashKey": "/", "TildeKey": "~", "DollarKey": "$",
        "PercentKey": "%", "CaretKey": "^", "NumberSignKey": "#", "AtKey": "@",
        "ExclamationKey": "!", "ZeroKey": "0", "DoubleQuoteKey": "\"",
        "ForwardSlashKey": "/", "VerticalBarKey": "|", "Del": "Delete", "Then": "→",
    }
    found = [key_map.get(token, token) for token in found]
    result = modifier_tokens[:]
    for token in found:
        if token not in result:
            result.append(token)
    if not result:
        raise ValueError(f"Unable to parse Microsoft key description: {value}")
    return result


def localized_microsoft_keys(tokens: list[str], language: str) -> list[str]:
    index = 0 if language == "en" else 1
    return [MICROSOFT_KEY_LABELS.get(token, (token, token))[index] for token in tokens]


WORD_FUNCTION_BINDING = re.compile(
    r"(?P<key>(?:(?:Command|Cmd|Option|Alt|Control|Ctrl|Shift)\s*(?:\+\s*)?)*F\d{1,2})"
    r"(?:\s+alone|（单独使用）)?\s*\*?\s*[:：]",
    flags=re.I,
)


def parse_word_function_bindings(value: str, language: str) -> list[tuple[str, str]]:
    value = re.sub(
        r"\b(Command|Cmd|Option|Alt|Control|Ctrl|Shift)\s+"
        r"(?=(?:Command|Cmd|Option|Alt|Control|Ctrl|Shift)\s*\+)",
        r"\1+",
        canonical_microsoft_key_text(value),
        flags=re.I,
    )
    matches = list(WORD_FUNCTION_BINDING.finditer(value))
    bindings: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(value)
        action = value[match.end():end].strip()
        sentence_separator = "。" if language == "zh" else "."
        if sentence_separator in action:
            action = action.split(sentence_separator, 1)[0].strip()
        action = action.rstrip("。.* ")
        if action:
            bindings.append((match.group("key"), action))
    return bindings


def build_microsoft_office(
    en_source: str,
    zh_source: str,
    software_id: str,
    name: str,
    accent: str,
    glyph: str,
    source_key: str,
    bundle_identifier: str,
) -> dict:
    tables_en = parse_microsoft_macos_tables(en_source)
    tables_zh = parse_microsoft_macos_tables(zh_source)
    if len(tables_en) != len(tables_zh):
        raise ValueError(f"{name} locale table mismatch: {len(tables_en)} != {len(tables_zh)}")

    categories = []
    used_ids: set[str] = set()
    seen_shortcuts: set[tuple[tuple[str, ...], str]] = set()
    for table_index, ((heading_en, rows_en), (heading_zh, rows_zh)) in enumerate(zip(tables_en, tables_zh)):
        if len(rows_en) != len(rows_zh):
            raise ValueError(f"{name} row mismatch in {heading_en}: {len(rows_en)} != {len(rows_zh)}")
        category_id = slug(heading_en, f"section-{table_index}")
        items = []
        is_word_function_table = software_id == "word" and heading_en == "Use function key shortcuts"
        for row_index, (row_en, row_zh) in enumerate(zip(rows_en[1:], rows_zh[1:]), start=1):
            if len(row_en) < 2 or len(row_zh) < 2:
                raise ValueError(f"{name} malformed row {heading_en}/{row_index}")
            if is_word_function_table:
                bindings_en = parse_word_function_bindings(row_en[1], "en")
                bindings_zh = parse_word_function_bindings(row_zh[1], "zh")
                if len(bindings_en) != len(bindings_zh):
                    raise ValueError(
                        f"{name} function binding mismatch for {row_en[0]}: "
                        f"{len(bindings_en)} != {len(bindings_zh)}"
                    )
                pairs = [
                    (action_en, action_zh, key_en)
                    for (key_en, action_en), (_key_zh, action_zh) in zip(bindings_en, bindings_zh)
                ]
            else:
                if not row_en[0].strip() and not row_zh[0].strip():
                    # Microsoft's current macOS Excel table contains one blank
                    # action paired with Ctrl+E. Do not guess its meaning from
                    # a Windows/Web table; keep it out until Microsoft labels it.
                    continue
                if not row_en[0].strip() or not row_zh[0].strip():
                    raise ValueError(f"{name} locale action mismatch in {heading_en}/{row_index}")
                pairs = [
                    (row_en[0].rstrip(" *"), row_zh[0].rstrip(" *"), part)
                    for part in microsoft_key_parts(row_en[1])
                ]
            if not pairs:
                raise ValueError(f"{name} emitted no shortcuts for {heading_en}/{row_index}")
            for alternative_index, (action_en, action_zh, key_text) in enumerate(pairs, start=1):
                tokens = microsoft_key_tokens(key_text)
                keys_en = localized_microsoft_keys(tokens, "en")
                keys_zh = localized_microsoft_keys(tokens, "zh")
                signature = (tuple(keys_en), action_en)
                if signature in seen_shortcuts:
                    continue
                seen_shortcuts.add(signature)
                item_id = stable_item_id(software_id, category_id, action_en, key_text, used_ids)
                item = make_direct_item(item_id, action_en, action_zh, keys_en, keys_zh)
                item["tags"].extend(["Microsoft Support", heading_en, "official macOS tab"])
                if len(pairs) > 1:
                    item["tags"].append(f"alternative {alternative_index}")
                items.append(item)
        categories.append({"id": category_id, "zh": heading_zh, "en": heading_en, "items": items})

    return {
        "id": software_id,
        "name": name,
        "vendor": "Microsoft",
        "accent": accent,
        "glyph": glyph,
        "group": "office",
        "bundleIdentifiers": [bundle_identifier],
        "categories": categories,
        "provenance": {
            "sourceURL": SOURCES[source_key],
            "sourceTitle": f"{name} keyboard shortcuts — macOS tab",
            "appVersion": "Microsoft 365 for Mac current documentation",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-macos-tab",
            "platform": "macOS",
        },
    }


def build_iwork(
    en_source: str,
    zh_source: str,
    software_id: str,
    name: str,
    accent: str,
    glyph: str,
    source_key: str,
    bundle_identifier: str,
) -> dict:
    rows_en = parse_iwork(en_source)
    rows_zh = parse_iwork(zh_source)
    if len(rows_en) != len(rows_zh):
        raise ValueError(f"{name} locale row mismatch: {len(rows_en)} != {len(rows_zh)}")

    categories: OrderedDict[str, dict] = OrderedDict()
    used_ids: set[str] = set()
    seen_shortcuts: set[tuple[tuple[str, ...], str]] = set()
    for row_index, (row_en, row_zh) in enumerate(zip(rows_en, rows_zh), start=1):
        category_en, action_en, key_en = row_en
        category_zh, action_zh, _key_zh = row_zh
        category_id = slug(category_en, f"section-{row_index}")
        category = categories.setdefault(
            category_id,
            {"id": category_id, "zh": category_zh, "en": category_en, "items": []},
        )
        if not action_en.strip() or not action_zh.strip():
            raise ValueError(f"{name} has an empty localized action at row {row_index}")
        if key_en.strip().lower() in {"assign a shortcut key", "assign a keyboard shortcut"}:
            continue
        parts = microsoft_key_parts(key_en)
        if not parts:
            raise ValueError(f"{name} emitted no shortcut for {category_en}/{action_en}: {key_en}")
        for alternative_index, part in enumerate(parts, start=1):
            tokens = microsoft_key_tokens(part)
            keys_en = localized_microsoft_keys(tokens, "en")
            keys_zh = localized_microsoft_keys(tokens, "zh")
            signature = (tuple(keys_en), action_en)
            if signature in seen_shortcuts:
                continue
            seen_shortcuts.add(signature)
            item_id = stable_item_id(software_id, category_id, action_en, part, used_ids)
            item = make_direct_item(item_id, action_en, action_zh, keys_en, keys_zh)
            item["tags"].extend(["Apple Support", category_en, "official macOS table"])
            if len(parts) > 1:
                item["tags"].append(f"alternative {alternative_index}")
            category["items"].append(item)

    empty_categories = [category["en"] for category in categories.values() if not category["items"]]
    if empty_categories:
        raise ValueError(f"{name} contains empty categories after import: {empty_categories}")
    return {
        "id": software_id,
        "name": name,
        "vendor": "Apple",
        "accent": accent,
        "glyph": glyph,
        "group": "office",
        "bundleIdentifiers": [bundle_identifier],
        "categories": list(categories.values()),
        "provenance": {
            "sourceURL": SOURCES[source_key],
            "sourceTitle": f"Keyboard shortcuts for {name} on Mac",
            "appVersion": "Apple current macOS documentation",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-page",
            "platform": "macOS",
        },
    }


def build_terminal(en_source: str, zh_source: str) -> dict:
    rows_en = parse_apple(en_source)
    rows_zh = parse_apple(zh_source)
    if len(rows_en) != len(rows_zh):
        raise ValueError(f"Terminal locale row mismatch: {len(rows_en)} != {len(rows_zh)}")

    categories: OrderedDict[str, dict] = OrderedDict()
    used_ids: set[str] = set()
    for index, (en_row, zh_row) in enumerate(zip(rows_en, rows_zh)):
        category_en, action_en, key_en = en_row
        category_zh, action_zh, key_zh = zh_row
        category_id = slug(category_en.replace("Action", ""), f"section-{index}")
        category = categories.setdefault(
            category_id,
            {"id": category_id, "zh": category_zh, "en": category_en, "items": []},
        )
        item_id = stable_item_id("terminal", category_id, action_en, key_en, used_ids)
        category["items"].append(make_item(item_id, action_en, action_zh, key_en, key_zh))

    return {
        "id": "terminal",
        "name": "Terminal",
        "vendor": "Apple",
        "accent": "#2F2F2F",
        "glyph": ">_",
        "categories": list(categories.values()),
        "provenance": {
            "sourceURL": SOURCES["terminal_en"],
            "sourceTitle": "Keyboard shortcuts in Terminal on Mac",
            "appVersion": "macOS 26",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-page",
            "platform": "macOS",
        },
    }


def build_affinity(
    en_source: str,
    zh_source: str,
    software_id: str,
    name: str,
    accent: str,
    glyph: str,
    source_key: str,
) -> dict:
    rows_en = parse_affinity(en_source)
    rows_zh = parse_affinity(zh_source)
    if len(rows_en) != len(rows_zh):
        raise ValueError(f"Affinity locale row mismatch: {len(rows_en)} != {len(rows_zh)}")

    categories: OrderedDict[str, dict] = OrderedDict()
    seen_rows: set[tuple[str, str]] = set()
    used_ids: set[str] = set()
    for index, (en_row, zh_row) in enumerate(zip(rows_en, rows_zh)):
        category_id, heading_en, action_en, key_en = en_row
        zh_category_id, heading_zh, action_zh, key_zh = zh_row
        if category_id != zh_category_id:
            raise ValueError(f"Affinity locale category mismatch at row {index}")
        category = categories.setdefault(
            category_id,
            {"id": category_id, "zh": heading_zh, "en": heading_en, "items": []},
        )
        signature = (action_en, key_en)
        if signature in seen_rows:
            continue
        seen_rows.add(signature)
        item_id = stable_item_id(software_id, category_id, action_en, key_en, used_ids)
        if action_en.startswith("Setting brush properties on page"):
            category["items"].extend([
                make_direct_item(
                    f"{item_id}-nozzle-shape",
                    "Adjust brush nozzle shape on the page",
                    "在页面上调整画笔喷嘴形状",
                    ["⌃", "⌥", "Horizontal drag"],
                    ["⌃", "⌥", "水平拖动"],
                ),
                make_direct_item(
                    f"{item_id}-nozzle-spacing",
                    "Adjust brush nozzle spacing on the page",
                    "在页面上调整画笔喷嘴间距",
                    ["⌃", "⌥", "Vertical drag"],
                    ["⌃", "⌥", "垂直拖动"],
                ),
                make_direct_item(
                    f"{item_id}-nozzle-rotation",
                    "Adjust brush nozzle rotation on the page",
                    "在页面上调整画笔喷嘴旋转",
                    ["⌃", "⌥", "Horizontal drag"],
                    ["⌃", "⌥", "水平拖动"],
                ),
            ])
            continue
        if action_en.startswith("Setting brush hardness and flow"):
            category["items"].extend([
                make_direct_item(
                    f"{item_id}-hardness",
                    "Adjust brush hardness",
                    "调整画笔硬度",
                    ["⇧", "[ / ]"],
                    ["⇧", "[ / ]"],
                ),
                make_direct_item(
                    f"{item_id}-flow",
                    "Set brush flow percentage",
                    "设置画笔流量百分比",
                    ["Number"],
                    ["数字"],
                ),
            ])
            continue
        item = make_item(item_id, action_en, action_zh, key_en, key_zh)
        longest_key = max(len(key) for key in item["keys"] + item.get("keysEn", []))
        if longest_key > 30:
            raise ValueError(f"{name} key label needs a concise mapping: {key_en} / {action_en}")
        category["items"].append(item)

    return {
        "id": software_id,
        "name": name,
        "vendor": "Serif",
        "accent": accent,
        "glyph": glyph,
        "categories": list(categories.values()),
        "provenance": {
            "sourceURL": SOURCES[source_key],
            "sourceTitle": f"{name} keyboard shortcuts",
            "appVersion": "2",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-page",
            "platform": "macOS",
        },
    }


def build_safari(en_source: str, zh_source: str) -> dict:
    rows_en = parse_apple(en_source)
    rows_zh = parse_apple(zh_source)
    if len(rows_en) != len(rows_zh):
        raise ValueError(f"Safari locale row mismatch: {len(rows_en)} != {len(rows_zh)}")

    base_path = Path(__file__).resolve().parents[1] / "KeyFloat" / "productivity-shortcuts-mac.json"
    base_library = json.loads(base_path.read_text(encoding="utf-8"))
    base_pack = next(pack for pack in base_library["software"] if pack["id"] == "safari")
    pack = deepcopy(base_pack)
    pack["provenance"] = {
        "sourceURL": SOURCES["safari_en"],
        "sourceTitle": "Keyboard and other shortcuts in Safari on Mac",
        "appVersion": "macOS 26",
        "verifiedAt": VERIFIED_AT,
        "coverage": "complete-official-page",
        "platform": "macOS",
    }

    categories = {category["id"]: category for category in pack["categories"]}
    for category_id, zh, en in [
        ("reading-list", "阅读列表", "Reading List"),
        ("bookmarks", "书签管理", "Bookmark Management"),
    ]:
        if category_id not in categories:
            category = {"id": category_id, "zh": zh, "en": en, "items": []}
            pack["categories"].append(category)
            categories[category_id] = category

    items_by_id = {
        item["id"]: item
        for category in pack["categories"]
        for item in category["items"]
    }
    used_ids = set(items_by_id)
    mapped_existing = {
        "Search the current webpage": ["safari.find"],
        "Select the Smart Search field": ["safari.address"],
        "Print the current webpage": ["safari.print"],
        "Show tab overview": ["safari.tab-overview"],
        "Go to the next tab": ["safari.next-tab"],
        "Go to the previous tab": ["safari.prev-tab"],
        "Close the active tab": ["safari.close-tab"],
        "Reopen the last tab you closed": ["safari.reopen-tab"],
        "Go to your homepage": ["safari.home"],
        "Go back to the previous webpage": ["safari.back"],
        "Go forward to the next webpage": ["safari.forward"],
        "Open Reader": ["safari.reader"],
        "Zoom website content": ["safari.zoom-in", "safari.zoom-out"],
    }

    def category_for(table_title: str) -> str:
        lowered = table_title.lower()
        if "reading list" in lowered:
            return "reading-list"
        if "bookmark" in lowered:
            return "bookmarks"
        if "tab" in lowered or "window" in lowered:
            return "tabs"
        if any(word in lowered for word in ("scroll", "current webpage", "history", "zoom")):
            return "navigation"
        return "tools"

    def append_direct(
        category_id: str,
        item_id: str,
        action_en: str,
        action_zh: str,
        keys_en: list[str],
        keys_zh: list[str],
    ) -> None:
        categories[category_id]["items"].append(
            make_direct_item(item_id, action_en, action_zh, keys_en, keys_zh)
        )

    for index, (en_row, zh_row) in enumerate(zip(rows_en, rows_zh)):
        table_en, action_en, key_en = en_row
        _table_zh, action_zh, key_zh = zh_row
        if action_en in mapped_existing:
            for item_id in mapped_existing[action_en]:
                item = items_by_id[item_id]
                item["tags"] = sorted(set(item.get("tags", [])) | {"official", "macOS"})
            continue

        category_id = category_for(table_en)
        root_id = stable_item_id("safari", "official", action_en, key_en, used_ids)
        if action_en == "Scroll up, down, left, or right":
            append_direct(category_id, root_id, action_en, action_zh, ["Arrow keys"], ["方向键"])
            continue
        if action_en == "Scroll in larger increments":
            append_direct(category_id, root_id, action_en, action_zh, ["⌥", "Arrow keys"], ["⌥", "方向键"])
            continue
        if action_en == "Highlight the next field or pop-up menu on a webpage":
            append_direct(category_id, root_id, action_en, action_zh, ["Tab"], ["Tab"])
            continue
        if action_en.startswith("Highlight the next field, pop-up menu, or clickable item"):
            append_direct(category_id, root_id, action_en, action_zh, ["⌥", "Tab"], ["⌥", "Tab"])
            continue
        if action_en == "Scroll down a screen":
            append_direct(category_id, root_id + "-page-down", action_en, action_zh, ["Page Down"], ["Page Down"])
            append_direct(category_id, root_id + "-space", action_en, action_zh, ["Space"], ["Space"])
            continue
        if action_en == "Scroll up a screen":
            append_direct(category_id, root_id + "-page-up", action_en, action_zh, ["Page Up"], ["Page Up"])
            append_direct(category_id, root_id + "-shift-space", action_en, action_zh, ["⇧", "Space"], ["⇧", "Space"])
            continue
        if action_en == "Scroll to the top-left or bottom-left corner of the webpage":
            append_direct(category_id, root_id + "-top", "Scroll to the top-left of the webpage", "滚动到网页左上角", ["⌘", "↑"], ["⌘", "↑"])
            append_direct(category_id, root_id + "-bottom", "Scroll to the bottom-left of the webpage", "滚动到网页左下角", ["⌘", "↓"], ["⌘", "↓"])
            continue
        if action_en == "Open a webpage in a new tab":
            append_direct(category_id, root_id + "-click", action_en, action_zh, ["⌘", "Click"], ["⌘", "点击"])
            append_direct(category_id, root_id + "-return", action_en, action_zh, ["⌘", "Return"], ["⌘", "Return"])
            continue
        if action_en == "Open a webpage in a new tab, and make that tab the active tab":
            append_direct(category_id, root_id + "-click", action_en, action_zh, ["⇧", "⌘", "Click"], ["⇧", "⌘", "点击"])
            append_direct(category_id, root_id + "-return", action_en, action_zh, ["⇧", "⌘", "Return"], ["⇧", "⌘", "Return"])
            continue
        if action_en == "Select one of your first eight tabs":
            append_direct(category_id, root_id, action_en, action_zh, ["⌘", "1–8"], ["⌘", "1–8"])
            continue
        if action_en == "Select your last tab":
            append_direct(category_id, root_id, action_en, action_zh, ["⌘", "9"], ["⌘", "9"])
            continue
        if action_en == "Close all tabs except for one":
            append_direct(category_id, root_id, action_en, action_zh, ["⌥", "Click"], ["⌥", "点击"])
            continue
        if action_en == "See a list of your recently visited webpages by name":
            append_direct(category_id, root_id, action_en, action_zh, ["Click-hold", "Back / Forward"], ["长按", "后退/前进"])
            continue
        if action_en == "See a list of your recently visited webpages by web address (URL)":
            append_direct(category_id, root_id, action_en, action_zh, ["⌥", "Click-hold", "Back / Forward"], ["⌥", "长按", "后退/前进"])
            continue
        if action_en == "Zoom website text":
            append_direct(category_id, root_id, action_en, action_zh, ["⌥", "Menu command"], ["⌥", "点击菜单"])
            continue
        if action_en == "Open a downloaded file":
            append_direct(category_id, root_id, action_en, action_zh, ["Double click"], ["双击"])
            continue
        if action_en == "Remove a webpage":
            append_direct(category_id, root_id + "-click", action_en, action_zh, ["⌃", "Click"], ["⌃", "点击"])
            append_direct(category_id, root_id + "-swipe", action_en, action_zh, ["Swipe left"], ["向左轻扫"])
            continue
        if action_en in {"Add a bookmark to the Favorites bar", "Move a bookmark on the Favorites bar", "Remove a bookmark from the Favorites bar"}:
            append_direct(category_id, root_id, action_en, action_zh, ["Drag"], ["拖动"])
            continue
        if "click" in key_en.lower():
            modifier_map = [("Option", "⌥"), ("Shift", "⇧"), ("Control", "⌃"), ("Command", "⌘")]
            modifiers = [symbol for word, symbol in modifier_map if word.lower() in key_en.lower()]
            append_direct(category_id, root_id, action_en, action_zh, modifiers + ["Click"], modifiers + ["点击"])
            continue

        item = make_item(root_id, action_en, action_zh, key_en, key_zh)
        longest_key = max(len(key) for key in item["keys"] + item.get("keysEn", []))
        if longest_key > 30:
            raise ValueError(f"Safari key label needs a concise mapping: {action_en} / {key_en}")
        categories[category_id]["items"].append(item)

    pack["categories"] = [
        {**category, "items": [item for item in category["items"] if "official" in item.get("tags", [])]}
        for category in pack["categories"]
    ]
    pack["categories"] = [category for category in pack["categories"] if category["items"]]
    return pack


def build_finder(en_source: str, zh_source: str) -> dict:
    rows_en = parse_apple_article_section(en_source, "finder")
    rows_zh = parse_apple_article_section(zh_source, "finder")
    if len(rows_en) != len(rows_zh):
        raise ValueError(f"Finder locale row mismatch: {len(rows_en)} != {len(rows_zh)}")

    categories = OrderedDict([
        ("files", {"id": "files", "zh": "文件与文件夹", "en": "Files & Folders", "items": []}),
        ("windows", {"id": "windows", "zh": "窗口与视图", "en": "Windows & Views", "items": []}),
        ("system", {"id": "system", "zh": "系统控制", "en": "System Controls", "items": []}),
        ("gestures", {"id": "gestures", "zh": "组合操作", "en": "Modified Actions", "items": []}),
    ])
    used_ids: set[str] = set()

    def short_title(value: str, language: str) -> str:
        separator = "。" if language == "zh" else ". "
        title = value.split(separator, 1)[0].strip().rstrip(".")
        return normalize_zh_title(title) if language == "zh" else title

    def category_for(action: str, key: str) -> str:
        lowered = action.lower()
        if any(word in key.lower() for word in ("click", "drag", "selecting")):
            return "gestures"
        if any(word in lowered for word in (
            "dock", "brightness", "mission control", "display", "sound", "volume", "keyboard settings",
            "control center", "dictation", "notification center", "launchpad", "apps (macos", "siri",
            "input source", "desktop", "magnification",
        )):
            return "system"
        if any(word in lowered for word in (
            "window", "view", "toolbar", "sidebar", "path bar", "status bar", "tab bar", "preview pane",
            "quick look", "slideshow", "icons", "as a list", "in columns", "gallery", "previous folder",
            "next folder",
        )):
            return "windows"
        return "files"

    for index, ((key_en, action_en_full), (key_zh, action_zh_full)) in enumerate(zip(rows_en, rows_zh)):
        action_en = short_title(action_en_full, "en")
        action_zh = short_title(action_zh_full, "zh")
        category_id = category_for(action_en_full, key_en)
        item_id = stable_item_id("finder", category_id, action_en, key_en, used_ids)

        key_lower = key_en.lower()
        if key_lower == "command + command (press twice)":
            item = make_direct_item(item_id, action_en, action_zh, ["⌘", "⌘"], ["⌘", "⌘"])
        elif "option key while double-clicking" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌥", "Double click"], ["⌥", "双击"])
        elif "command key while double-clicking" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌘", "Double click"], ["⌘", "双击"])
        elif "command key while dragging" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌘", "Drag"], ["⌘", "拖动"])
        elif "option key while dragging" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌥", "Drag"], ["⌥", "拖动"])
        elif "option-command while dragging" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌥", "⌘", "Drag"], ["⌥", "⌘", "拖动"])
        elif "command or shift while selecting" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌘ / ⇧", "Click"], ["⌘ / ⇧", "点击"])
        elif "brightness up or" in key_lower and "control" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌃", "Brightness ±"], ["⌃", "亮度 ±"])
        elif "brightness up or" in key_lower and "option" in key_lower:
            item = make_direct_item(item_id, action_en, action_zh, ["⌥", "⇧", "Brightness ±"], ["⌥", "⇧", "亮度 ±"])
        else:
            item = make_item(item_id, action_en, action_zh, key_en, key_zh)

        item["tags"].extend([action_en_full, normalize_zh_title(action_zh_full)])
        longest_key = max(len(key) for key in item["keys"] + item.get("keysEn", []))
        if longest_key > 30:
            raise ValueError(f"Finder key label needs a concise mapping: {key_en} / {action_en}")
        categories[category_id]["items"].append(item)

    return {
        "id": "finder",
        "name": "Finder",
        "vendor": "Apple",
        "accent": "#1687F8",
        "glyph": "F",
        "categories": [category for category in categories.values() if category["items"]],
        "provenance": {
            "sourceURL": SOURCES["finder_en"],
            "sourceTitle": "Mac keyboard shortcuts - Finder and system shortcuts",
            "appVersion": "macOS 26",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-section",
            "platform": "macOS",
        },
    }


def build_illustrator(en_source: str, zh_source: str) -> dict:
    tables_en = parse_adobe_tables(en_source)
    tables_zh = parse_adobe_tables(zh_source)
    if len(tables_en) != len(tables_zh):
        raise ValueError(f"Illustrator locale table mismatch: {len(tables_en)} != {len(tables_zh)}")

    base_path = Path(__file__).resolve().parents[1] / "KeyFloat" / "shortcuts-mac.json"
    base_library = json.loads(base_path.read_text(encoding="utf-8"))
    base_pack = next(pack for pack in base_library["software"] if pack["id"] == "illustrator")
    pack = deepcopy(base_pack)
    # Correct legacy seed labels against the current Adobe macOS column before
    # matching. The supplemental pack replaces this seed at runtime.
    illustrator_seed_key_corrections = {
        "ai.zoom-in": ["⌘", "="],
        "ai.export": ["⌥", "⌘", "E"],
    }
    for category in pack["categories"]:
        for item in category["items"]:
            corrected_keys = illustrator_seed_key_corrections.get(item["id"])
            if corrected_keys is not None:
                item["keys"] = corrected_keys
    pack["provenance"] = {
        "sourceURL": SOURCES["illustrator_en"],
        "sourceTitle": "Default keyboard shortcuts for Illustrator",
        "appVersion": "2026",
        "verifiedAt": VERIFIED_AT,
        "coverage": "official-page-selection",
        "platform": "macOS",
    }

    def concise_keys(key: str, language: str) -> list[str]:
        lowered = key.lower()
        modifier_map = [("control", "⌃"), ("option", "⌥"), ("shift", "⇧"), ("command", "⌘")]
        modifiers = [symbol for word, symbol in modifier_map if word in lowered]
        if "enable option key toggles" in lowered or "启用按 option 键" in lowered:
            return ["⌥"]
        if "double-click" in lowered or "双击" in key:
            return modifiers + (["Double click"] if language == "en" else ["双击"])
        if "perspective selection tool" in lowered or "透视选区工具" in key:
            return ["1 / 2 / 3 / 4"]
        if "then press" in lowered or "然后按" in key:
            match = re.search(r"(?:\+|press|按)\s*([A-Z0-9])\s*$", key, flags=re.I)
            if match:
                return modifiers + [match.group(1).upper()]
        if "click" in lowered or "单击" in key:
            return modifiers + (["Click"] if language == "en" else ["点击"])
        if "arrow" in lowered or "箭头" in key:
            return modifiers + (["Arrow keys"] if language == "en" else ["方向键"])
        return split_key_text(key, language)

    def signature(keys: list[str]) -> tuple[str, ...]:
        modifier_order = {"⌃": 0, "⌥": 1, "⇧": 2, "⌘": 3}
        modifiers = sorted({key for key in keys if key in modifier_order}, key=modifier_order.get)
        others = [key.lower().replace(" ", "") for key in keys if key not in modifier_order]
        return tuple(modifiers + others)

    def title_tokens(value: str) -> set[str]:
        return set(re.findall(r"[a-z0-9]+", value.lower()))

    # The official page often uses a sentence where the compact KeyFloat
    # category uses a menu-style title. Bind known equivalents by meaning and
    # key signature so verified essentials stay in their familiar categories.
    official_base_aliases = {
        "group the selected artwork": "ai.group",
        "ungroup the selected artwork": "ai.ungroup",
        "unlock a selection": "ai.unlock",
        "move a selection to the front": "ai.front",
        "move a selection to the back": "ai.back",
        "average two or more paths": "ai.average",
        "toggle between outline and gpu preview of the document": "ai.outline",
        "view the document in pixel preview mode": "ai.pixel",
        "hide guides": "ai.guides",
        "create a document": "ai.new",
        "open a document": "ai.open",
        "save changes made to the document": "ai.save",
        "open the save as dialog box": "ai.save-as",
        "open the export for screens dialog box": "ai.export",
    }
    base_by_id = {
        item["id"]: item
        for category in pack["categories"]
        for item in category["items"]
    }

    base_by_signature: dict[tuple[str, ...], list[dict]] = {}
    used_ids = {
        item["id"]
        for category in pack["categories"]
        for item in category["items"]
    }
    for category in pack["categories"]:
        for item in category["items"]:
            base_by_signature.setdefault(signature(item["keys"]), []).append(item)

    seen_official: set[tuple[str, tuple[str, ...]]] = set()
    official_categories: OrderedDict[str, dict] = OrderedDict()
    for table_index, ((heading_en, rows_en), (heading_zh, rows_zh)) in enumerate(zip(tables_en, tables_zh)):
        if len(rows_en) != len(rows_zh):
            raise ValueError(f"Illustrator locale row mismatch in {heading_en}")
        category_id = f"illustrator-official-{slug(heading_en, 'shortcuts')}"
        category = official_categories.setdefault(
            category_id,
            {
                "id": category_id,
                "zh": normalize_zh_title(heading_zh),
                "en": heading_en,
                "items": [],
            },
        )

        for row_index, (row_en, row_zh) in enumerate(zip(rows_en[1:], rows_zh[1:])):
            if len(row_en) < 3 or len(row_zh) < 3 or not row_en[0] or not row_en[2]:
                continue
            action_en, key_en = row_en[0], row_en[2]
            action_zh, key_zh = normalize_zh_title(row_zh[0]), row_zh[2]
            keys_en = concise_keys(key_en, "en")
            keys_zh = concise_keys(key_zh, "zh")
            if not keys_en:
                continue
            key_signature = signature(keys_en)
            duplicate_signature = (action_en.lower(), key_signature)
            if duplicate_signature in seen_official:
                continue
            seen_official.add(duplicate_signature)

            official_tokens = title_tokens(action_en)
            matched_base = None
            aliased_base = base_by_id.get(official_base_aliases.get(action_en.lower(), ""))
            if aliased_base is not None and signature(aliased_base["keys"]) == key_signature:
                matched_base = aliased_base
            for candidate in base_by_signature.get(key_signature, []):
                if matched_base is not None:
                    break
                candidate_tokens = title_tokens(candidate["en"])
                overlap = len(official_tokens & candidate_tokens)
                union = len(official_tokens | candidate_tokens) or 1
                if action_en.lower() == candidate["en"].lower() or overlap / union >= 0.34:
                    matched_base = candidate
                    break
            if matched_base is not None:
                matched_base["tags"] = sorted(set(matched_base.get("tags", [])) | {"official", "macOS"})
                continue

            item_id = stable_item_id(
                "illustrator",
                category_id,
                action_en,
                key_en,
                used_ids,
            )
            item = make_direct_item(item_id, action_en, action_zh, keys_en, keys_zh)
            item["tags"].extend([heading_en, normalize_zh_title(heading_zh)])
            longest_key = max(len(key) for key in item["keys"] + item.get("keysEn", []))
            if longest_key > 30:
                raise ValueError(f"Illustrator key label needs a concise mapping: {key_en} / {action_en}")
            category["items"].append(item)

    pack["categories"].extend(
        category for category in official_categories.values() if category["items"]
    )

    pack["categories"] = [
        {**category, "items": [item for item in category["items"] if "official" in item.get("tags", [])]}
        for category in pack["categories"]
    ]
    pack["categories"] = [category for category in pack["categories"] if category["items"]]

    return pack


PHOTOSHOP_EXPORT_EXCLUDED_IDS = {
    # These rows are absent from the current installed export or changed meaning.
    "ps.step-back",
    "ps.fill-fg",
    "ps.fill-bg",
    "ps.content-fill",
    "ps.zoom-in",
}


def photoshop_signature(keys: list[str]) -> tuple[str, ...]:
    modifier_order = {"⌃": 0, "⌥": 1, "⇧": 2, "⌘": 3}
    modifiers = sorted((key for key in keys if key in modifier_order), key=modifier_order.get)
    others = [key for key in keys if key not in modifier_order]
    return tuple(modifiers + others)


def photoshop_export_signatures(source: str) -> set[tuple[str, ...]]:
    modifier_names = {"Control": "⌃", "Ctrl": "⌃", "Opt": "⌥", "Shift": "⇧", "Cmd": "⌘"}
    signatures: set[tuple[str, ...]] = set()
    for _heading, rows in parse_adobe_tables(source):
        for row in rows:
            values = [value.strip() for value in row if value.strip()]
            if len(values) < 2:
                continue
            raw_keys = values[-1]
            if not re.search(r"Cmd|Opt|Shift|Control|Ctrl|^[A-Z]$|^F\d+$|Delete", raw_keys):
                continue
            for alternative in re.split(r"\s*/\s*", raw_keys):
                keys = [modifier_names.get(part.strip(), part.strip()) for part in alternative.split("+") if part.strip()]
                signatures.add(photoshop_signature(keys))
    return signatures


def build_photoshop_export() -> dict:
    if not PHOTOSHOP_EXPORT.exists():
        raise ValueError(f"Photoshop installed shortcut export is missing: {PHOTOSHOP_EXPORT}")
    export_source = PHOTOSHOP_EXPORT.read_text(encoding="utf-8")
    export_signatures = photoshop_export_signatures(export_source)

    base_path = Path(__file__).resolve().parents[1] / "KeyFloat" / "shortcuts-mac.json"
    base_library = json.loads(base_path.read_text(encoding="utf-8"))
    base_pack = next(pack for pack in base_library["software"] if pack["id"] == "photoshop")
    categories = []
    for base_category in base_pack["categories"]:
        items = []
        for base_item in base_category["items"]:
            if base_item["id"] in PHOTOSHOP_EXPORT_EXCLUDED_IDS:
                continue
            signature = photoshop_signature(base_item["keys"])
            if signature not in export_signatures:
                raise ValueError(f"Photoshop export no longer contains {base_item['id']} / {signature}")
            item = deepcopy(base_item)
            item["tags"] = sorted(set(item.get("tags", [])) | {"official", "macOS", "installed export"})
            if item["id"] == "ps.undo":
                item["zh"] = "还原"
                item["en"] = "Undo"
            items.append(item)
        if items:
            categories.append({**base_category, "items": items})

    return {
        "id": "photoshop",
        "name": "Photoshop",
        "vendor": "Adobe",
        "accent": "#31A8FF",
        "glyph": "Ps",
        "group": "design",
        "bundleIdentifiers": ["com.adobe.Photoshop"],
        "categories": categories,
        "provenance": {
            "sourceURL": PHOTOSHOP_HELP_URL,
            "sourceTitle": "Photoshop 2026 installed Keyboard Shortcuts and Menus export",
            "appVersion": "Photoshop 2026",
            "verifiedAt": VERIFIED_AT,
            "coverage": "official-page-installed-export-selection",
            "platform": "macOS",
        },
    }


MATLAB_CATEGORIES = [
    ("general", "编辑器通用", "General Editor"),
    ("file", "文件", "File"),
    ("navigation", "导航", "Navigation"),
    ("find", "查找与替换", "Find & Replace"),
    ("text", "文本", "Text"),
    ("code", "代码", "Code"),
    ("sections", "代码节", "Sections"),
    ("run", "运行与调试", "Run & Debug"),
    ("display", "显示", "Display"),
    ("folding", "代码折叠", "Code Folding"),
    ("spelling", "拼写", "Spelling"),
]

MATLAB_ACTION_ZH = {
    "Maximize Editor": "最大化编辑器",
    "Undock Editor": "取消停靠编辑器",
    "Dock Editor": "停靠编辑器",
    "Make the Editor the active tool": "激活编辑器工具",
    "New blank script": "新建空白脚本",
    "Open file": "打开文件",
    "Reopen last closed file": "重新打开上次关闭的文件",
    "Save active file": "保存当前文件",
    "Print active file": "打印当前文件",
    "Close active file": "关闭当前文件",
    "Undo a modification, returning it to the previous state": "撤销修改并返回上一状态",
    "Redo an undone modification, returning it to the changed state": "重做已撤销的修改",
    "Go to line": "转到指定行",
    "Set or clear bookmark on current line": "设置或清除当前行书签",
    "Move to next bookmark": "转到下一个书签",
    "Move to previous bookmark": "转到上一个书签",
    "Back": "后退",
    "Forward": "前进",
    "Go to previous variable instance": "转到上一个变量实例",
    "Go to next variable instance": "转到下一个变量实例",
    "Find": "查找",
    "Find next": "查找下一个",
    "Find previous": "查找上一个",
    "Find and replace": "查找和替换",
    "Close Find and Replace dialog": "关闭查找和替换对话框",
    "Find selection in Editor": "在编辑器中查找所选内容",
    "Insert a line of text": "插入一行文本",
    "Normal text": "普通文本",
    "Heading 1 text": "一级标题文本",
    "Heading 2 text": "二级标题文本",
    "Heading 3 text": "三级标题文本",
    "Title text": "标题文本",
    "Bold": "粗体",
    "Italic": "斜体",
    "Underline": "下划线",
    "Monospaced": "等宽文本",
    "Bulleted list": "项目符号列表",
    "Numbered list": "编号列表",
    "Hyperlink": "超链接",
    "Equation": "公式",
    "LaTeX equation": "LaTeX 公式",
    "Comment": "添加注释",
    "Uncomment": "取消注释",
    "Wrap comments": "自动换行注释",
    "Smart indent": "智能缩进",
    "Increase indent": "增加缩进",
    "Decrease indent": "减少缩进",
    "Copy line": "复制行",
    "Cut line": "剪切行",
    "Duplicate line": "重复行",
    "Change case of selection": "切换所选内容大小写",
    "Insert line of code or convert a line between code and text(Live Editor only)": "插入代码行或在代码与文本之间转换（仅实时编辑器）",
    "Move focus between code and output(Live Editor only)": "在代码与输出之间移动焦点（仅实时编辑器）",
    "Open Code Analyzer message or expand details": "打开代码分析器消息或展开详情",
    "Insert section break": "插入代码节分隔符",
    "Run current section": "运行当前代码节",
    "Run current section and advance": "运行当前代码节并前进",
    "Go to previous section": "转到上一个代码节",
    "Go to next section": "转到下一个代码节",
    "Run the active file": "运行当前文件",
    "Pause the running file": "暂停正在运行的文件",
    "Continue": "继续运行",
    "Set/clear breakpoint at line": "设置或清除当前行断点",
    "Step": "单步执行",
    "Step in": "单步进入",
    "Step out": "单步跳出",
    "Quit execution": "停止执行",
    "View full screen": "全屏显示",
    "Zoom in": "放大",
    "Zoom out": "缩小",
    "Reset zoom": "重置缩放",
    "Expand current fold": "展开当前折叠区域",
    "Collapse current fold": "折叠当前区域",
    "Expand all": "全部展开",
    "Collapse all": "全部折叠",
    "Next spelling issue": "下一个拼写问题",
    "Previous spelling issue": "上一个拼写问题",
}


def parse_mathworks_key(value: str) -> tuple[list[str], list[str]]:
    replacements = {
        "Plus (+)": "PlusKey",
        "Minus (–)": "MinusKey",
        "Period (.)": "PeriodKey",
        "Comma (,)": "CommaKey",
    }
    for source, replacement in replacements.items():
        value = value.replace(source, replacement)
    english_map = {
        "Command": "⌘", "Option": "⌥", "Ctrl": "⌃", "Shift": "⇧",
        "PlusKey": "+", "MinusKey": "-", "PeriodKey": ".", "CommaKey": ",",
        "Up": "↑", "Down": "↓", "Left": "←", "Right": "→", "Enter": "Return",
    }
    chinese_map = {**english_map, "Enter": "回车"}
    parts = [part.strip() for part in value.split("+") if part.strip()]
    return (
        [english_map.get(part, part) for part in parts],
        [chinese_map.get(part, part) for part in parts],
    )


def build_matlab(en_source: str) -> dict:
    tables = parse_adobe_tables(en_source)
    if len(tables) != len(MATLAB_CATEGORIES):
        raise ValueError(f"MATLAB table count changed: {len(tables)}")

    categories = []
    used_ids: set[str] = set()
    for (category_id, category_zh, category_en), (_heading, rows) in zip(MATLAB_CATEGORIES, tables):
        items = []
        for row in rows[1:]:
            if len(row) < 3:
                continue
            action_en, mac_keys = row[0].strip(), row[2].strip()
            if not action_en or mac_keys == "N/A":
                continue
            action_zh = MATLAB_ACTION_ZH.get(action_en)
            if not action_zh:
                raise ValueError(f"Missing MATLAB Chinese title: {action_en}")
            alternatives = [part.strip() for part in re.split(r"\s+or\s+", mac_keys) if part.strip()]
            for alternative_index, alternative in enumerate(alternatives, start=1):
                keys_en, keys_zh = parse_mathworks_key(alternative)
                item_id = stable_item_id("matlab", category_id, action_en, alternative, used_ids)
                item = make_direct_item(item_id, action_en, action_zh, keys_en, keys_zh)
                item["tags"].extend([category_en, "MATLAB Editor", "official macOS column"])
                if len(alternatives) > 1:
                    item["tags"].append(f"alternative {alternative_index}")
                items.append(item)
        categories.append({"id": category_id, "zh": category_zh, "en": category_en, "items": items})

    return {
        "id": "matlab",
        "name": "MATLAB",
        "vendor": "MathWorks",
        "accent": "#E16737",
        "glyph": "M",
        "group": "simulation",
        "bundleIdentifiers": ["com.mathworks.matlab"],
        "categories": categories,
        "provenance": {
            "sourceURL": SOURCES["matlab_en"],
            "sourceTitle": "Editor Keyboard Shortcuts — Keyboard Shortcut on macOS",
            "appVersion": "MathWorks current documentation",
            "verifiedAt": VERIFIED_AT,
            "coverage": "complete-official-macos-column",
            "platform": "macOS",
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write the generated supplemental library")
    parser.add_argument("--check", action="store_true", help="verify the generated library is current")
    parser.add_argument("--self-test", action="store_true", help="run importer parsing regressions")
    parser.add_argument(
        "--software",
        choices=(
            "illustrator", "affinitydesigner", "affinityphoto", "affinitypublisher",
            "terminal", "safari", "powerpoint", "onenote", "pages", "keynote",
        ),
        help="refresh one official pack while preserving the other generated packs",
    )
    args = parser.parse_args()
    if args.self_test:
        parser_cases = [
            ("Command + -", "en", ["⌘", "-"]),
            ("Command + =", "en", ["⌘", "="]),
            ("Shift + Command + ]", "en", ["⇧", "⌘", "]"]),
            ("\\ (backslash)", "en", ["\\"]),
            ("\\(反斜线)", "zh", ["\\"]),
            ("⌘+", "en", ["⌘", "+"]),
            ("⌥-", "en", ["⌥", "-"]),
            ("] (right square bracket)", "en", ["]"]),
            ("/(正斜线)", "zh", ["/"]),
            ("` (above the Tab key)", "en", ["`"]),
        ]
        for raw_value, language, expected in parser_cases:
            actual = split_key_text(raw_value, language)
            if actual != expected:
                raise SystemExit(f"Parser regression for {raw_value!r}: {actual!r} != {expected!r}")
        microsoft_cases = [
            ("Command-Vertical Bar (|)", ["⌘", "|"]),
            ("Option+Del", ["⌥", "Delete"]),
            ("Command-Plus Sign", ["⌘", "+"]),
            ("Command-Minus Sign", ["⌘", "-"]),
        ]
        for raw_value, expected in microsoft_cases:
            actual = microsoft_key_tokens(raw_value)
            if actual != expected:
                raise SystemExit(f"Microsoft parser regression for {raw_value!r}: {actual!r} != {expected!r}")
        arrow_parts = microsoft_key_parts("⌘+Up or Down arrow key")
        arrow_keys = [microsoft_key_tokens(part) for part in arrow_parts]
        if arrow_keys != [["⌘", "UpArrow"], ["⌘", "DownArrow"]]:
            raise SystemExit(f"Microsoft shared-modifier regression: {arrow_keys!r}")
        print(
            f"Passed {len(parser_cases) + len(microsoft_cases) + 1} "
            "official shortcut parser regressions"
        )
        return
    if args.software:
        if args.software == "illustrator":
            pack = build_illustrator(fetch(SOURCES["illustrator_en"]), fetch(SOURCES["illustrator_zh"]))
        elif args.software == "affinitydesigner":
            pack = build_affinity(
                fetch(SOURCES["affinity_en"]), fetch(SOURCES["affinity_zh"]),
                "affinitydesigner", "Affinity Designer 2", "#7357FF", "AD", "affinity_en",
            )
        elif args.software == "affinityphoto":
            pack = build_affinity(
                fetch(SOURCES["affinity_photo_en"]), fetch(SOURCES["affinity_photo_zh"]),
                "affinityphoto", "Affinity Photo 2", "#7A5AF8", "AP", "affinity_photo_en",
            )
        elif args.software == "affinitypublisher":
            pack = build_affinity(
                fetch(SOURCES["affinity_publisher_en"]), fetch(SOURCES["affinity_publisher_zh"]),
                "affinitypublisher", "Affinity Publisher 2", "#E77A2E", "APu", "affinity_publisher_en",
            )
        elif args.software == "terminal":
            pack = build_terminal(fetch(SOURCES["terminal_en"]), fetch(SOURCES["terminal_zh"]))
        elif args.software == "safari":
            pack = build_safari(fetch(SOURCES["safari_en"]), fetch(SOURCES["safari_zh"]))
        elif args.software == "powerpoint":
            pack = build_microsoft_office(
                fetch(SOURCES["powerpoint_en"]), fetch(SOURCES["powerpoint_zh"]),
                "powerpoint", "Microsoft PowerPoint", "#D24726", "P", "powerpoint_en",
                "com.microsoft.Powerpoint",
            )
        elif args.software == "onenote":
            pack = build_microsoft_office(
                fetch(SOURCES["onenote_en"]), fetch(SOURCES["onenote_zh"]),
                "onenote", "Microsoft OneNote", "#7719AA", "N", "onenote_en",
                "com.microsoft.onenote.mac",
            )
        elif args.software == "pages":
            pack = build_iwork(
                fetch(SOURCES["pages_en"]), fetch(SOURCES["pages_zh"]),
                "pages", "Apple Pages", "#FF9F0A", "Pg", "pages_en", "com.apple.iWork.Pages",
            )
        else:
            pack = build_iwork(
                fetch(SOURCES["keynote_en"]), fetch(SOURCES["keynote_zh"]),
                "keynote", "Apple Keynote", "#0A84FF", "Kn", "keynote_en", "com.apple.iWork.Keynote",
            )
        library = json.loads(OUTPUT.read_text(encoding="utf-8"))
        matching_indexes = [
            index for index, current in enumerate(library["software"])
            if current["id"] == pack["id"]
        ]
        if not matching_indexes:
            library["software"].append(pack)
        else:
            pack_index = matching_indexes[0]
            library["software"][pack_index] = pack
            library["software"] = [
                current for index, current in enumerate(library["software"])
                if current["id"] != pack["id"] or index == pack_index
            ]
        library["generatedAt"] = VERIFIED_AT
        text = json.dumps(library, ensure_ascii=False, indent=2) + "\n"
        if args.check and OUTPUT.read_text(encoding="utf-8") != text:
            raise SystemExit(f"{OUTPUT.name} {pack['name']} pack is out of date; run with --write")
        if args.write:
            OUTPUT.write_text(text, encoding="utf-8")
            print(
                f"Generated {pack['name']} official pack / "
                f"{sum(len(category['items']) for category in pack['categories'])} shortcuts"
            )
        elif not args.check:
            sys.stdout.write(text)
        return
    sources = {name: fetch(url) for name, url in SOURCES.items()}
    library = {
        "schemaVersion": 1,
        "platform": "macOS",
        "generatedAt": VERIFIED_AT,
        "software": [
            build_affinity(
                sources["affinity_en"], sources["affinity_zh"],
                "affinitydesigner", "Affinity Designer 2", "#7357FF", "AD", "affinity_en",
            ),
            build_affinity(
                sources["affinity_photo_en"], sources["affinity_photo_zh"],
                "affinityphoto", "Affinity Photo 2", "#7A5AF8", "AP", "affinity_photo_en",
            ),
            build_affinity(
                sources["affinity_publisher_en"], sources["affinity_publisher_zh"],
                "affinitypublisher", "Affinity Publisher 2", "#E77A2E", "APu", "affinity_publisher_en",
            ),
            build_terminal(sources["terminal_en"], sources["terminal_zh"]),
            build_safari(sources["safari_en"], sources["safari_zh"]),
            build_finder(sources["finder_en"], sources["finder_zh"]),
            build_illustrator(sources["illustrator_en"], sources["illustrator_zh"]),
            build_photoshop_export(),
            build_matlab(sources["matlab_en"]),
            build_microsoft_office(
                sources["word_en"], sources["word_zh"],
                "word", "Microsoft Word", "#2B579A", "W", "word_en", "com.microsoft.Word",
            ),
            build_microsoft_office(
                sources["excel_en"], sources["excel_zh"],
                "excel", "Microsoft Excel", "#217346", "X", "excel_en", "com.microsoft.Excel",
            ),
            build_microsoft_office(
                sources["powerpoint_en"], sources["powerpoint_zh"],
                "powerpoint", "Microsoft PowerPoint", "#D24726", "P", "powerpoint_en",
                "com.microsoft.Powerpoint",
            ),
            build_microsoft_office(
                sources["onenote_en"], sources["onenote_zh"],
                "onenote", "Microsoft OneNote", "#7719AA", "N", "onenote_en",
                "com.microsoft.onenote.mac",
            ),
            build_iwork(
                sources["pages_en"], sources["pages_zh"],
                "pages", "Apple Pages", "#FF9F0A", "Pg", "pages_en", "com.apple.iWork.Pages",
            ),
            build_iwork(
                sources["numbers_en"], sources["numbers_zh"],
                "numbers", "Apple Numbers", "#34C759", "Nu", "numbers_en", "com.apple.iWork.Numbers",
            ),
            build_iwork(
                sources["keynote_en"], sources["keynote_zh"],
                "keynote", "Apple Keynote", "#0A84FF", "Kn", "keynote_en", "com.apple.iWork.Keynote",
            ),
        ],
    }
    text = json.dumps(library, ensure_ascii=False, indent=2) + "\n"
    if args.check and (not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != text):
        raise SystemExit(f"{OUTPUT.name} is out of date; run with --write")
    if args.write:
        OUTPUT.write_text(text, encoding="utf-8")
    if not args.write and not args.check:
        sys.stdout.write(text)
    else:
        shortcut_count = sum(
            len(category["items"])
            for pack in library["software"]
            for category in pack["categories"]
        )
        print(f"Generated {len(library['software'])} official packs / {shortcut_count} shortcuts")


if __name__ == "__main__":
    main()
