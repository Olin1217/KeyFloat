#!/usr/bin/env python3
"""Create compact Windows-safe PNG/ICO assets without touching the macOS source project."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "KeyFloat.Win" / "Assets"
ICONS = ASSETS / "SoftwareIcons"
REPORT = ROOT / "WINDOWS_ICON_REPORT.json"
CANVAS = 128


def decode(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def normalized(image: Image.Image, size: int = CANVAS) -> Image.Image:
    bounds = image.getbbox()
    if bounds:
        image = image.crop(bounds)
    image.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(image, ((size - image.width) // 2, (size - image.height) // 2))
    return canvas


def main() -> None:
    source_by_id: dict[str, Path] = {}
    priority = {"png": 0, "ico": 1, "jpg": 2, "jpeg": 3}
    for path in ICONS.iterdir():
        if not path.is_file() or path.suffix.lower().lstrip(".") not in priority:
            continue
        current = source_by_id.get(path.stem)
        if current is None or priority[path.suffix.lower().lstrip(".")] < priority[current.suffix.lower().lstrip(".")]:
            source_by_id[path.stem] = path

    report = []
    for software_id, source in sorted(source_by_id.items()):
        output = ICONS / f"{software_id}.png"
        image = normalized(decode(source))
        image.save(output, "PNG", optimize=True, compress_level=9)
        report.append({
            "id": software_id,
            "sourceFormat": source.suffix.lower().lstrip("."),
            "output": str(output.relative_to(ROOT)),
            "bytes": output.stat().st_size,
            "pixels": f"{CANVAS}x{CANVAS}",
        })

    for output_name in ["KeyFloat Logo.png", "KeyFloat White Logo.png"]:
        source = ASSETS / output_name
        normalized(decode(source), 256).save(source, "PNG", optimize=True, compress_level=9)

    app_icon = Image.open(ASSETS / "KeyFloat.png").convert("RGBA")
    app_icon = ImageOps.contain(app_icon, (256, 256), Image.Resampling.LANCZOS)
    app_icon.save(
        ASSETS / "KeyFloat.ico",
        format="ICO",
        sizes=[(16, 16), (20, 20), (24, 24), (32, 32), (40, 40), (48, 48), (64, 64), (128, 128), (256, 256)],
    )

    payload = {
        "generatedAt": "2026-07-26",
        "iconCount": len(report),
        "totalBytes": sum(item["bytes"] for item in report),
        "canvas": f"{CANVAS}x{CANVAS}",
        "policy": "Transparent square canvas, aspect-fit artwork, optimized PNG; runtime insets preserve the KeyFloat card sizing system.",
        "icons": report,
    }
    REPORT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Prepared {len(report)} Windows software icons ({payload['totalBytes'] / 1024:.1f} KiB).")


if __name__ == "__main__":
    main()
