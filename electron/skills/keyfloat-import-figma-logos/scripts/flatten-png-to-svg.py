#!/usr/bin/env python3
"""Wrap a PNG in a minimal SVG that AppKit can render reliably."""

from __future__ import annotations

import argparse
import base64
import struct
from pathlib import Path


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def png_dimensions(data: bytes) -> tuple[int, int]:
    if len(data) < 24 or not data.startswith(PNG_SIGNATURE):
        raise ValueError("input is not a valid PNG file")
    return struct.unpack(">II", data[16:24])


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Embed a PNG in a simple macOS-compatible SVG wrapper."
    )
    parser.add_argument("input_png", type=Path)
    parser.add_argument("output_svg", type=Path)
    parser.add_argument("--canvas", type=int, default=128)
    args = parser.parse_args()

    data = args.input_png.read_bytes()
    width, height = png_dimensions(data)
    if width != args.canvas or height != args.canvas:
        raise SystemExit(
            f"expected {args.canvas}x{args.canvas} PNG, received {width}x{height}"
        )

    encoded = base64.b64encode(data).decode("ascii")
    canvas = args.canvas
    svg = (
        f'<svg width="{canvas}" height="{canvas}" viewBox="0 0 {canvas} {canvas}" '
        'fill="none" xmlns="http://www.w3.org/2000/svg" '
        'xmlns:xlink="http://www.w3.org/1999/xlink">\n'
        f'  <image x="0" y="0" width="{canvas}" height="{canvas}" '
        'preserveAspectRatio="xMidYMid meet" '
        f'xlink:href="data:image/png;base64,{encoded}"/>\n'
        "</svg>\n"
    )
    args.output_svg.parent.mkdir(parents=True, exist_ok=True)
    args.output_svg.write_text(svg, encoding="utf-8")
    print(f"wrote {args.output_svg} ({width}x{height}, {len(svg)} characters)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
