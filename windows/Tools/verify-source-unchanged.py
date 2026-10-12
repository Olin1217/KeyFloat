#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "SOURCE_BASELINE_MANIFEST.json").read_text(encoding="utf-8"))
source = Path(manifest["source"])
errors: list[str] = []
for entry in manifest["files"]:
    path = source / entry["path"]
    if not path.exists():
        errors.append(f"Source file disappeared: {entry['path']}")
        continue
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest != entry["sha256"]:
        errors.append(f"Source file changed: {entry['path']}")

if errors:
    raise SystemExit("\n".join(errors))
print(f"Verified {len(manifest['files'])} KeyFloat source files remain byte-for-byte unchanged.")
