#!/usr/bin/env python3
"""Audit shortcut evidence boundaries across every KeyFloat data layer.

This audit does not pretend that a product home page proves a key binding.
Source-backed packs are pinned to an expected official source. Template-derived
catalog entries are required to contain zero shortcut rows. Older hand-curated
packs are reported separately from official-page imports so their provenance is
never overstated.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DATA_ROOT = ROOT / "KeyFloat"
REPORT = ROOT / "Tools" / "shortcut-truth-audit.json"
RESOURCE_NAMES = [
    "shortcuts-mac.json",
    "office-shortcuts-mac.json",
    "professional-shortcuts-mac.json",
    "productivity-shortcuts-mac.json",
    "ecosystem-shortcuts-mac.json",
    "verified-shortcuts-mac.json",
    "supplemental-shortcuts-mac.json",
    "browser-reviewed-shortcuts-mac.json",
    "extended-shortcuts-mac.json",
]

RESOURCE_MODES = {
    "shortcuts-mac.json": "merge",
    "office-shortcuts-mac.json": "merge",
    "professional-shortcuts-mac.json": "merge",
    "productivity-shortcuts-mac.json": "merge",
    "ecosystem-shortcuts-mac.json": "replace",
    "verified-shortcuts-mac.json": "replace",
    "supplemental-shortcuts-mac.json": "replace",
    "browser-reviewed-shortcuts-mac.json": "replace",
    "extended-shortcuts-mac.json": "merge",
}

EXPECTED_EXTENDED_SOURCES = {
    "labview": "www.ni.com",
    "plecs": "www.plexim.com",
    "benchling": "help.benchling.com",
    "geneious": "manual.geneious.com",
    "vmd": "www.ks.uiuc.edu",
    "avogadro": "raw.githubusercontent.com",
    "slicer": "slicer.readthedocs.io",
    "godot": "github.com",
}

OFFICIAL_COVERAGE_PREFIXES = (
    "complete-official",
    "official-page",
    "official-manual",
    "official-source",
    "official-table",
)


def shortcut_count(pack: dict) -> int:
    return sum(len(category.get("items", [])) for category in pack.get("categories", []))


def merge_pack(base: dict, overlay: dict) -> dict:
    merged = {**base, **overlay}
    categories = [
        {**category, "items": list(category.get("items", []))}
        for category in base.get("categories", [])
    ]
    category_index = {category["id"]: index for index, category in enumerate(categories)}
    for overlay_category in overlay.get("categories", []):
        if overlay_category["id"] not in category_index:
            category_index[overlay_category["id"]] = len(categories)
            categories.append({**overlay_category, "items": list(overlay_category.get("items", []))})
            continue
        index = category_index[overlay_category["id"]]
        items = list(categories[index].get("items", []))
        item_index = {item["id"]: offset for offset, item in enumerate(items)}
        for item in overlay_category.get("items", []):
            if item["id"] in item_index:
                items[item_index[item["id"]]] = item
            else:
                item_index[item["id"]] = len(items)
                items.append(item)
        categories[index] = {**overlay_category, "items": items}
    merged["categories"] = categories
    merged["dataStatus"] = overlay.get("dataStatus", base.get("dataStatus"))
    merged["provenance"] = overlay.get("provenance", base.get("provenance"))
    return merged


def evidence_status(pack: dict) -> str:
    if pack.get("dataStatus") == "sourceBacked":
        return "sourceBacked"
    if pack.get("dataStatus") == "manualReview":
        return "manualReview"
    if pack.get("dataStatus") == "catalogOnly":
        return "catalogOnly"
    coverage = (pack.get("provenance") or {}).get("coverage", "")
    if coverage.startswith(OFFICIAL_COVERAGE_PREFIXES):
        return "officialImport"
    return "legacyReviewed"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    errors: list[str] = []
    packs: list[tuple[str, dict]] = []
    for name in RESOURCE_NAMES:
        path = DATA_ROOT / name
        library = json.loads(path.read_text(encoding="utf-8"))
        for pack in library["software"]:
            packs.append((name, pack))

    source_backed: list[dict] = []
    catalog_only: list[dict] = []
    official_imports: list[dict] = []
    manual_review: list[dict] = []
    legacy: list[dict] = []
    contextual_duplicates: Counter[str] = Counter()

    effective: dict[str, dict] = {}
    for resource in RESOURCE_NAMES:
        for current_resource, pack in packs:
            if current_resource != resource:
                continue
            if pack["id"] not in effective or RESOURCE_MODES[resource] == "replace":
                effective[pack["id"]] = pack
            else:
                effective[pack["id"]] = merge_pack(effective[pack["id"]], pack)

    for resource, pack in packs:
        count = shortcut_count(pack)
        status = pack.get("dataStatus")
        provenance = pack.get("provenance") or {}
        coverage = provenance.get("coverage", "")
        record = {"id": pack["id"], "name": pack["name"], "shortcuts": count, "resource": resource}

        item_ids: set[str] = set()
        signatures: set[tuple[tuple[str, ...], str]] = set()
        for category in pack.get("categories", []):
            for item in category.get("items", []):
                if item["id"] in item_ids:
                    errors.append(f"{pack['id']} repeats item id {item['id']}")
                item_ids.add(item["id"])
                signature = (tuple(item["keys"]), item["en"])
                if signature in signatures:
                    if status == "sourceBacked":
                        errors.append(f"{pack['id']} repeats exact shortcut {item['en']} / {' '.join(item['keys'])}")
                    else:
                        contextual_duplicates[pack["id"]] += 1
                signatures.add(signature)
                if any("windows" in key.lower() or key == "⊞" for key in item["keys"]):
                    errors.append(f"{pack['id']}/{item['id']} contains a Windows key")

        if status == "manualReview":
            if coverage != "browser-search-manual-review":
                errors.append(f"{pack['id']} manual-review pack has invalid coverage marker {coverage}")
            if not provenance.get("sourceURL", "").startswith("https://"):
                errors.append(f"{pack['id']} manual-review pack has no HTTPS source")
            if count == 0:
                errors.append(f"{pack['id']} is manual-review but empty")
            manual_review.append({**record, "sourceURL": provenance.get("sourceURL"), "coverage": coverage})
        elif status == "sourceBacked":
            expected_domain = EXPECTED_EXTENDED_SOURCES.get(pack["id"])
            actual_domain = urlparse(provenance.get("sourceURL", "")).netloc
            if expected_domain is None or actual_domain != expected_domain:
                errors.append(f"{pack['id']} has unexpected evidence domain {actual_domain}")
            if not coverage.startswith(OFFICIAL_COVERAGE_PREFIXES):
                errors.append(f"{pack['id']} has non-official coverage marker {coverage}")
            if count == 0:
                errors.append(f"{pack['id']} is source-backed but empty")
            source_backed.append({**record, "sourceURL": provenance.get("sourceURL"), "coverage": coverage})
        elif status == "catalogOnly":
            if count != 0 or pack.get("categories"):
                errors.append(f"{pack['id']} catalog entry exposes unverified shortcuts")
            catalog_only.append(record)
        elif coverage.startswith(OFFICIAL_COVERAGE_PREFIXES):
            official_imports.append({**record, "sourceURL": provenance.get("sourceURL"), "coverage": coverage})
        else:
            legacy.append(record)

    report = {
        "auditedAt": "2026-07-21",
        "policy": {
            "sourceBacked": "Every emitted row is transcribed from the pack's named official source.",
            "officialImport": "The pack is reproduced from an official page, installed default preset, or official section named in provenance.",
            "manualReview": "Browser-sourced secondary data is displayed only with an explicit manual-review status and a review-report entry.",
            "catalogOnly": "Product remains discoverable, but contains zero shortcut rows until verified.",
            "legacyReviewed": "Existing hand-curated rows pass structural and macOS-key audits without an official per-pack completeness claim.",
        },
        "resourceCount": len(RESOURCE_NAMES),
        "softwareEntries": len(packs),
        "shortcutRows": sum(shortcut_count(pack) for _, pack in packs),
        "statusCounts": dict(Counter(evidence_status(pack) for _, pack in packs)),
        "effectiveSoftwareCount": len(effective),
        "effectiveShortcutRows": sum(shortcut_count(pack) for pack in effective.values()),
        "effectiveStatusCounts": dict(Counter(evidence_status(pack) for pack in effective.values())),
        "effectiveLegacyDisplayPacks": [
            {"id": pack["id"], "name": pack["name"], "shortcuts": shortcut_count(pack)}
            for pack in effective.values()
            if evidence_status(pack) == "legacyReviewed" and shortcut_count(pack) > 0
        ],
        "sourceBackedPacks": source_backed,
        "officialImportPacks": official_imports,
        "manualReviewPacks": manual_review,
        "legacyReviewedPacks": legacy,
        "catalogOnlyPacks": catalog_only,
        "contextualDuplicateRowsByPack": dict(contextual_duplicates),
        "errors": errors,
    }
    text = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not REPORT.exists() or REPORT.read_text(encoding="utf-8") != text:
            raise SystemExit("shortcut-truth-audit.json is out of date; run with --write")
    if args.write:
        REPORT.write_text(text, encoding="utf-8")
    if errors:
        raise SystemExit("\n".join(errors))
    if report["effectiveLegacyDisplayPacks"]:
        raise SystemExit("Effective library still exposes legacy rows without official evidence")
    print(
        f"Audited {report['softwareEntries']} entries / {report['shortcutRows']} rows: "
        f"{len(source_backed)} source-backed, {len(official_imports)} official imports, "
        f"{len(manual_review)} manual review, {len(legacy)} legacy reviewed, {len(catalog_only)} catalog-only. "
        f"Effective library: {report['effectiveSoftwareCount']} packs / "
        f"{report['effectiveShortcutRows']} evidence-tracked rows."
    )


if __name__ == "__main__":
    main()
