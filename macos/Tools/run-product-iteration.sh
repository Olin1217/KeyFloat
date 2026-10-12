#!/bin/zsh
set -euo pipefail

ROOT="${0:A:h:h}"
XCODE_DEVELOPER="${DEVELOPER_DIR:-/Users/hualong/Downloads/Xcode.app/Contents/Developer}"

node "$ROOT/Tools/assemble-curated-shortcuts.js"
node "$ROOT/Tools/rebuild-rhino-shortcuts.js"
node "$ROOT/Tools/import-markdown-shortcuts.js" "${KEYFLOAT_SHORTCUT_MD_DIR:-/Users/hualong/Downloads/快捷键md}"
python3 "$ROOT/Tools/import_official_shortcuts.py" --self-test
node "$ROOT/Tools/import-added-markdown-shortcuts.js" "${KEYFLOAT_SHORTCUT_MD_ADD_DIR:-/Users/hualong/Downloads/快捷键md add}"
node "$ROOT/Tools/audit-macos-shortcuts.js" --fix
node "$ROOT/Tools/normalize-shortcut-titles.js" --write
node "$ROOT/Tools/validate-shortcuts.js" --summary
python3 "$ROOT/Tools/audit_shortcut_truth.py" --check
node "$ROOT/Tools/validate-icon-library.js"
DEVELOPER_DIR="$XCODE_DEVELOPER" xcrun swift "$ROOT/Tools/ValidateSVGImages.swift" "$ROOT/KeyFloat/SoftwareIcons"
(cd "$ROOT/../KeyFloat-Web" && npm run check)
DEVELOPER_DIR="$XCODE_DEVELOPER" xcodebuild \
  -quiet \
  -project "$ROOT/KeyFloat.xcodeproj" \
  -scheme KeyFloat \
  -configuration Debug \
  -derivedDataPath /tmp/KeyFloatDerivedData \
  CODE_SIGNING_ALLOWED=NO \
  build

DEVELOPER_DIR="$XCODE_DEVELOPER" xcrun swiftc \
  -parse-as-library \
  "$ROOT/KeyFloat/ShortcutModels.swift" \
  "$ROOT/KeyFloat/ShortcutStore.swift" \
  "$ROOT/Tools/StoreSmokeTests.swift" \
  -o /tmp/KeyFloatStoreSmokeTests
/tmp/KeyFloatStoreSmokeTests /tmp/KeyFloatDerivedData/Build/Products/Debug/KeyFloat.app

DEVELOPER_DIR="$XCODE_DEVELOPER" xcrun swiftc \
  -parse-as-library \
  "$ROOT/KeyFloat/LicenseService.swift" \
  "$ROOT/Tools/LicenseSmokeTests.swift" \
  -o /tmp/KeyFloatLicenseSmokeTests
/tmp/KeyFloatLicenseSmokeTests

echo "KeyFloat product iteration checks passed."
