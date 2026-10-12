---
name: keyfloat-import-figma-logos
description: Import completed software logos from the KeyFloat Figma logo workspace into the current KeyFloat Xcode project, normalize visual sizing and corner treatment, and diagnose or fix SVGs that render clipped in macOS. Use when the user asks to add, replace, update, resize, or repair KeyFloat software icons sourced from Figma, especially when an SVG looks correct in browsers but is cropped by NSImage or SwiftUI.
---

# KeyFloat Figma Logo Importer

## Overview

Move completed software logos from the shared KeyFloat Figma file into the active macOS project without changing the surrounding KeyFloat UI. Preserve each brand's colors while keeping icon containers, optical size, and rounded treatment consistent.

Read [references/workflow.md](references/workflow.md) before modifying the project. It contains the current paths, Figma workspace identifiers, rendering constraints, and verified import pattern.

## Non-negotiable safeguards

- Modify only `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode` unless the user explicitly supplies a newer active project path.
- Never modify `KeyFloat-V1.01`, `KeyFloat V1.02`, `KeyFloat V1.03`, or any other versioned backup.
- Do not alter KeyFloat's global UI, 34 pt software-icon container, established rounding, monochrome interface palette, or unrelated shortcuts.
- Preserve original software brand colors. UI chrome remains black, white, and gray.
- Inspect Figma nodes and current code before deciding which logos are new. Do not infer filled slots from labels alone.
- Do not use a complex Figma `SVG_STRING` export directly in the macOS app when it contains `pattern`, `use`, `clipPath`, masks, or embedded transforms.
- Use `apply_patch` for project text and SVG edits. Preserve unrelated user changes in a dirty worktree.

## Required workflow

### 1. Resolve and inspect the active project

1. Confirm that the active project, icon directory, and `KeyFloatView.swift` exist.
2. Run:

```bash
scripts/inspect-keyfloat-icons.sh "/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode"
```

3. Read the current `SoftwareIconRepository.bundledPresentations` entries and the icon-rendering view before editing.
4. Record the exact software IDs and filenames being changed. Leave every other icon untouched.

### 2. Inspect the Figma logo workspace

Before any Figma write or unique programmatic read, load the `figma:figma-use` skill completely and follow its Plugin API guidance. Use the shared Figma file and workspace identifiers from `references/workflow.md`.

Identify completed logos by structure:

- Find frames named `Logo Slot · 160` inside the logo workspace.
- Within each slot, inspect the 128 × 128 logo node.
- Treat the slot as filled only when that logo node contains actual vector/image children.
- Ignore card backgrounds, software-name text, filename text, and loose nodes outside a slot.
- Compare identified software IDs against existing files before exporting.

### 3. Export a macOS-safe asset

Use a transparent 128 × 128 PNG export from the filled Figma logo node:

```js
const bytes = await node.exportAsync({
  format: "PNG",
  constraint: { type: "SCALE", value: 1 },
});
const base64 = figma.base64Encode(bytes);
```

Save or reconstruct the PNG, then create a simple SVG wrapper:

```bash
python3 scripts/flatten-png-to-svg.py input.png output.svg
```

This wrapper embeds a PNG in a 128 × 128 SVG using `preserveAspectRatio="xMidYMid meet"`. It intentionally avoids Figma's complex reusable SVG structures, which macOS may crop even when a browser renders them correctly.

If an MCP response is too large, return base64 in ordered chunks of roughly 14,000–18,000 characters. Record each chunk's index and character count, reassemble in order, and verify the final length and SHA-256 before decoding.

### 4. Install and normalize the icon

1. Place the lowercase software-ID SVG in `KeyFloat/SoftwareIcons`.
2. Add or update only the matching `bundledPresentations` entry.
3. Start with these optical inset values:
   - `0.08` for square or full-bleed application marks.
   - `0.06` for irregular transparent marks that already contain internal whitespace.
4. Keep the existing 34 pt outer icon container and its corner radius unchanged.
5. Adjust inset in small increments only after observing the running app. Do not edit the SVG viewBox to fake optical size.

### 5. Validate before launching

Run XML and compatibility validation against every newly imported file:

```bash
scripts/validate-keyfloat-icons.sh \
  "/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode" \
  keynote.svg numbers.svg
```

Then build without signing:

```bash
cd "/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode"
DEVELOPER_DIR=/Users/hualong/Downloads/Xcode.app/Contents/Developer \
xcodebuild -quiet \
  -project KeyFloat.xcodeproj \
  -scheme KeyFloat \
  -configuration Debug \
  -derivedDataPath /tmp/KeyFloatDerivedData \
  CODE_SIGNING_ALLOWED=NO build
```

If the configured Xcode path is unavailable, discover the active developer directory with `xcode-select -p` and use that instead.

### 6. Perform visual acceptance testing

Use Computer Use to open the freshly built app and inspect the actual software-selection grid. Browser previews are insufficient for detecting NSImage SVG issues.

For every imported icon, verify:

- no clipping on any edge;
- no image content enlarged beyond the established optical size;
- visually consistent size beside existing icons;
- expected brand colors and transparency;
- unchanged 34 pt container and corner treatment;
- correct software-to-icon mapping in both search and category results.

Iterate only the affected `insetRatio` values and rebuild. Stop when all imported icons pass in the running macOS app.

## Failure diagnosis

- If only the upper-left portion appears, or the right/bottom edge is missing, flatten the Figma export to PNG and rebuild the simple SVG wrapper. Padding alone will not repair the renderer incompatibility.
- If the whole logo is visible but feels too large, increase `insetRatio` slightly.
- If it is visible but too small, decrease `insetRatio` slightly.
- If a logo is missing, verify lowercase filename, target membership/resource copying, and the corresponding repository entry.
- If the wrong logo appears, verify the Figma slot's real child content rather than relying on its adjacent filename label.

## Completion report

Report the software IDs changed, final inset values, validation result, Xcode build result, and visual-check result. Mention any Figma slot that was skipped because it was empty or ambiguous.
