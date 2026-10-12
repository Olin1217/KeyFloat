# KeyFloat continuation checkpoint

Saved: 2026-07-21, Asia/Shanghai  
State: Resumed; the first browser-source batch and the official Office/iWork batch are complete.

## Current product state

- Project: `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode`
- Protected backup: `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-V1.01` — do not modify.
- Runtime catalog: 209 software products in 21 groups.
- Displayed shortcut rows: 4,204 across 25 official/source-backed products and 1 manual-review product.
- Catalog-only products: 183; they display “Shortcuts under verification” and expose zero shortcut rows.
- Extended document contribution: 24 catalog products.
  - 8 source-backed products, 319 shortcuts: LabVIEW, PLECS, Benchling, Geneious Prime, VMD, Avogadro, 3D Slicer, Godot Engine.
  - 16 catalog-only products placed in professional groups: Eagle, STM32CubeIDE, MPLAB X IDE, SnapGene, MEGA, CLC Genomics Workbench, ChimeraX, FlowJo, MarvinSketch, Maple, SAS Studio, OsiriX, Horos, ENVI, Substance 3D Painter, Houdini.

## Truth and quarantine policy

- 3,015 generic-template rows from the first ecosystem draft are quarantined.
- 1,644 older hand-curated rows without per-row official evidence are covered by the catalog-only replacement layer.
- Effective runtime evidence counts:
  - `officialImport`: 17 products.
  - `sourceBacked`: 8 products.
  - `manualReview`: 1 product.
  - `catalogOnly`: 183 products.
  - Effective legacy display products: 0.
- Truth report: `Tools/shortcut-truth-audit.json`.
- Browser-source manual review report: `BROWSER_SOURCED_SHORTCUTS_REVIEW.md`.
- Extended coverage report: `Tools/extended-coverage.json`.
- Ecosystem coverage report: `Tools/ecosystem-coverage.json`.

## Last completed verification

- All deterministic generators and truth audit passed.
- `node Tools/validate-shortcuts.js` passed: 209 packs / 4,204 displayed shortcuts.
- Microsoft Word, Excel, PowerPoint, OneNote and Apple Pages, Numbers, Keynote now use reproducible official bilingual macOS imports.
- Store smoke tests passed against both Debug and Release apps after the Office/iWork import.
- Debug build passed.
- Release build passed; test Release app size was about 4.4 MB with all nine JSON resources bundled.
- Real UI verification passed:
  - Figma, Word and other unverified packs show `Verification pending`.
  - Illustrator shows 366 items.
  - After Effects shows 717 items.
  - Safari shows 64 items.
  - Expanded picker jumps to the bottom normally; CPU returns to 0%.
  - No SwiftUI layout recursion was found in the system log.
- The final test app was quit after verification.
- Five V1.01 core-file checksums still matched the locked baseline.

## Resume commands

Run from `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode`:

```bash
python3 Tools/generate_ecosystem_shortcuts.py --check
python3 Tools/import_official_shortcuts.py --check
python3 Tools/generate_extended_shortcuts.py --check
python3 Tools/generate_browser_review_shortcuts.py --check
python3 Tools/audit_shortcut_truth.py --check
node Tools/validate-shortcuts.js
```

The official importer performs network requests. If the network is still unavailable, skip that one check temporarily; the generated resource is already present.

Xcode is installed at `/Users/hualong/Downloads/Xcode.app`, so command-line builds use:

```bash
DEVELOPER_DIR=/Users/hualong/Downloads/Xcode.app/Contents/Developer xcodebuild \
  -project KeyFloat.xcodeproj -scheme KeyFloat -configuration Debug \
  CODE_SIGNING_ALLOWED=NO build
```

## Recommended next work after the user resumes

Continue source verification product by product. Promote a catalog-only product only after every emitted macOS row has a reproducible official source. Do not restore generic templates or the quarantined legacy rows merely to increase counts.
