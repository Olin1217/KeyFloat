#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "KeyFloat-Xcode"
OUTPUT = ROOT / "SOURCE_BASELINE_MANIFEST.json"

files = []
for path in sorted(SOURCE.rglob("*")):
    if not path.is_file() or "/xcuserdata/" in path.as_posix() or path.name == ".DS_Store":
        continue
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    files.append({"path": str(path.relative_to(SOURCE)), "sha256": digest, "bytes": path.stat().st_size})

payload = {
    "capturedAt": "2026-07-26",
    "source": str(SOURCE),
    "policy": "Read-only baseline used to create KeyFloat Win V1.04. No source or backup file is written by the Windows build.",
    "fileCount": len(files),
    "files": files,
}
OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Captured {len(files)} read-only KeyFloat source files.")
