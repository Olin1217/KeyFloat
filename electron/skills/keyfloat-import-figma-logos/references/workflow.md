# KeyFloat logo import reference

## Current locations

- Active project: `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode`
- Software icons: `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode/KeyFloat/SoftwareIcons`
- Presentation configuration: `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode/KeyFloat/KeyFloatView.swift`
- Repository dictionary: `SoftwareIconRepository.bundledPresentations`

Protected backups:

- `/Volumes/loong/Product Developer/KeyFloat/KeyFloat-V1.01`
- `/Volumes/loong/Product Developer/KeyFloat/KeyFloat V1.02`
- `/Volumes/loong/Product Developer/KeyFloat/KeyFloat V1.03`

Never edit a protected backup during a normal logo import.

## Figma source

- URL: `https://www.figma.com/design/V43j57lCanfNQ9nNOiAGlj/Keyfloat?node-id=0-1`
- File key: `V43j57lCanfNQ9nNOiAGlj`
- Page: `0:1`
- Logo workspace: `20:2`
- Workspace name: `KeyFloat · Missing SVG Logo Workspace · 144`
- Filled-slot frame name: `Logo Slot · 160`

The stable detection rule is structural, not textual. A slot is complete only when its 128 × 128 logo node has actual children. Adjacent filename labels can remain present on empty slots and are not proof that a logo was supplied.

## Previously verified mappings

These mappings are historical checkpoints, not a substitute for inspecting the live Figma document:

| Figma node | Output file |
| --- | --- |
| `22:7` | `keynote.svg` |
| `22:12` | `numbers.svg` |
| `22:17` | `pages.svg` |
| `22:22` | `googledocs.svg` |
| `22:27` | `googlesheets.svg` |
| `22:32` | `googleslides.svg` |
| `62:16` | `onenote.svg` |
| `22:70` | `calibre.svg` |
| `22:75` | `chemdraw.svg` |
| `22:110` | `overleaf.svg` |

## Why direct SVG export fails on macOS

Figma's `node.exportAsync({ format: "SVG_STRING" })` may emit `pattern`, `use`, `clipPath`, transforms, or embedded images. Web browsers usually render those structures correctly. AppKit's `NSImage` SVG renderer does not consistently support the same combinations and can show only the upper-left area or cut off the right and bottom edges.

Changing SwiftUI padding affects layout but does not repair that internal renderer failure. The verified fix is:

1. Export the Figma node as a transparent 128 × 128 PNG.
2. Embed that PNG in a minimal 128 × 128 SVG.
3. Use `preserveAspectRatio="xMidYMid meet"`.
4. Apply optical sizing in `bundledPresentations` through `insetRatio`.

Example wrapper:

```svg
<svg width="128" height="128" viewBox="0 0 128 128" fill="none"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <image x="0" y="0" width="128" height="128"
         preserveAspectRatio="xMidYMid meet"
         xlink:href="data:image/png;base64,..."/>
</svg>
```

## Current verified optical insets

```swift
"onenote": .init(insetRatio: 0.08, backgroundHex: nil),
"pages": .init(insetRatio: 0.08, backgroundHex: nil),
"numbers": .init(insetRatio: 0.08, backgroundHex: nil),
"keynote": .init(insetRatio: 0.08, backgroundHex: nil),
"googledocs": .init(insetRatio: 0.08, backgroundHex: nil),
"googlesheets": .init(insetRatio: 0.08, backgroundHex: nil),
"googleslides": .init(insetRatio: 0.08, backgroundHex: nil),
"calibre": .init(insetRatio: 0.06, backgroundHex: nil),
"chemdraw": .init(insetRatio: 0.06, backgroundHex: nil),
"overleaf": .init(insetRatio: 0.06, backgroundHex: nil),
```

These values are verified for the listed files. Treat them as starting guidance, not universal constants for future logos.
