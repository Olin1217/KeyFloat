#!/usr/bin/env bash
set -euo pipefail

project="${1:-/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode}"

case "$project" in
  *KeyFloat-V1.01*|*"KeyFloat V1.02"*|*"KeyFloat V1.03"*)
    echo "Refusing to inspect a protected backup as the active project: $project" >&2
    exit 2
    ;;
esac

icons="$project/KeyFloat/SoftwareIcons"
view="$project/KeyFloat/KeyFloatView.swift"
project_file="$project/KeyFloat.xcodeproj"

for required in "$icons" "$view" "$project_file"; do
  if [[ ! -e "$required" ]]; then
    echo "Missing required KeyFloat path: $required" >&2
    exit 1
  fi
done

count=$(find "$icons" -maxdepth 1 -type f -iname '*.svg' | wc -l | tr -d ' ')
echo "Project: $project"
echo "SVG icon count: $count"
echo "Icon directory: $icons"
echo "Presentation source: $view"

find "$icons" -maxdepth 1 -type f -iname '*.svg' -print \
  | sed 's#^.*/##' \
  | LC_ALL=C sort

if command -v rg >/dev/null 2>&1; then
  echo "Repository marker:"
  rg -n -m 1 'bundledPresentations' "$view" || true
fi
