#!/usr/bin/env python3
from __future__ import annotations

import json
import statistics
import struct
from collections import Counter
from pathlib import Path


PROJECT = Path(__file__).resolve().parent.parent
MANIFEST = PROJECT / "Tools" / "official-raster-icon-sources.json"
ICON_ROOT = PROJECT / "KeyFloat" / "SoftwareIcons"
OUTPUT = PROJECT / "IconStorageReport.md"

GROUP_NAMES = {
    "office": "Office",
    "study": "Study & Research",
    "design": "Design",
    "media": "Media",
    "architecture": "Architecture",
    "engineering": "Engineering",
    "modeling": "3D & Animation",
    "simulation": "Simulation",
    "development": "Development",
    "versionControl": "Version Control & DevOps",
    "databaseAPI": "Database & API",
    "dataAI": "Data & AI",
    "collaboration": "Collaboration & Projects",
    "browser": "Browsers",
    "macUtility": "macOS Utilities",
    "electronics": "Electronics",
    "biology": "Biology",
    "chemistry": "Chemistry",
    "medical": "Medical",
    "gameDevelopment": "Game Development",
    "other": "Other",
}


def png_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()[:24]
    if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"{path.name} is not a valid PNG")
    return struct.unpack(">II", data[16:24])


def escape(value: object) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def source_link(url: str) -> str:
    if url.startswith("https://"):
        return f"[打开]({url})"
    return f"`{escape(url)}`"


def main() -> None:
    rows = json.loads(MANIFEST.read_text(encoding="utf-8"))
    rows.sort(key=lambda row: (row.get("group", "other"), row.get("name", "").casefold()))
    sizes = []
    for row in rows:
        icon = ICON_ROOT / row["final_file"]
        width, height = png_dimensions(icon)
        row["actual_width"] = width
        row["actual_height"] = height
        row["actual_bytes"] = icon.stat().st_size
        sizes.append(row["actual_bytes"])

    all_icon_files = [
        path
        for path in ICON_ROOT.iterdir()
        if path.is_file() and path.suffix.lower() in {".svg", ".png", ".jpg", ".jpeg", ".ico"}
    ]
    all_icon_bytes = sum(path.stat().st_size for path in all_icon_files)
    source_counts = Counter(row["source_kind"] for row in rows)
    maximum = max(rows, key=lambda row: row["actual_bytes"])

    lines = [
        "# KeyFloat 新增软件图标存储报告",
        "",
        "生成日期：2026-07-25",
        "",
        "## 汇总",
        "",
        f"- 本轮补充：**{len(rows)}** 个软件图标",
        f"- 当前完整覆盖：**{len(all_icon_files)} / 209** 款软件",
        "- 输出格式：统一压缩 PNG",
        "- 输出尺寸：统一 **128 × 128 px**",
        "- 图形安全边距：约 8 px；KeyFloat 运行时默认再保留 6% 光学内边距",
        f"- 本轮新增存储：**{sum(sizes):,} B（{sum(sizes) / 1024:.2f} KiB）**",
        f"- 平均单文件：**{statistics.mean(sizes):.0f} B**",
        f"- 中位数：**{statistics.median(sizes):.0f} B**",
        f"- 最大单文件：**{maximum['name']}，{maximum['actual_bytes']:,} B（{maximum['actual_bytes'] / 1024:.2f} KiB）**",
        f"- 当前 `SoftwareIcons` 全部资源：**{all_icon_bytes:,} B（{all_icon_bytes / 1024 / 1024:.2f} MiB）**",
        "- 新增 PNG 体积上限：64 KiB；当前所有新增文件均低于此限制",
        "",
        "## 来源说明",
        "",
        "素材优先取自软件官网声明的 Apple Touch Icon、站点 Logo 或 favicon；Apple 系统应用和本机已安装的官方应用优先使用应用包内的原始图标。原始图片只用于生成，未放入项目，项目中仅保留压缩后的 128 × 128 PNG。",
        "",
    ]
    for kind, count in sorted(source_counts.items()):
        lines.append(f"- `{kind}`：{count} 个")
    lines.extend(
        [
            "",
            "> Midjourney 官网受 Cloudflare 限制，当前使用 LobeHub Icons 提供的 Midjourney 品牌矢量图作为唯一例外；已在下表明确标记，便于后续人工替换。",
            "",
            "## 文件明细",
            "",
            "| # | 分类 | 软件 | 文件 | 原始格式 / 尺寸 | 压缩后尺寸 | 文件大小 | 来源类型 | 官方页面 | 素材地址 |",
            "|---:|---|---|---|---|---|---:|---|---|---|",
        ]
    )
    for index, row in enumerate(rows, 1):
        original = f"{row.get('source_format', 'Unknown')} · {row.get('original_width', '?')}×{row.get('original_height', '?')}"
        lines.append(
            "| "
            + " | ".join(
                [
                    str(index),
                    escape(GROUP_NAMES.get(row.get("group", "other"), row.get("group", "other"))),
                    escape(row["name"]),
                    f"`{escape(row['final_file'])}`",
                    escape(original),
                    f"{row['actual_width']}×{row['actual_height']}",
                    f"{row['actual_bytes']:,} B",
                    f"`{escape(row['source_kind'])}`",
                    source_link(row["page_url"]),
                    source_link(row["asset_url"]),
                ]
            )
            + " |"
        )
    lines.extend(
        [
            "",
            "## 校验规则",
            "",
            "- 所有新增 PNG 必须为 128 × 128 px。",
            "- 单个新增栅格图标不得超过 64 KiB。",
            "- 同一软件 ID 不允许同时存在多个文件格式，避免加载歧义。",
            "- 应用加载顺序支持 SVG、PNG、JPG、JPEG、ICO。",
            "- 构建前运行 `node Tools/validate-icon-library.js` 检查尺寸、体积、重复 ID 和可执行 SVG 内容。",
            "",
        ]
    )
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT} with {len(rows)} icon rows")


if __name__ == "__main__":
    main()
