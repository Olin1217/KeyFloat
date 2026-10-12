#!/usr/bin/env bash
set -euo pipefail

project="${1:-/Volumes/loong/Product Developer/KeyFloat/KeyFloat-Xcode}"
if [[ $# -gt 0 ]]; then
  shift
fi

case "$project" in
  *KeyFloat-V1.01*|*"KeyFloat V1.02"*|*"KeyFloat V1.03"*)
    echo "Refusing to validate edits against a protected backup: $project" >&2
    exit 2
    ;;
esac

icons="$project/KeyFloat/SoftwareIcons"
[[ -d "$icons" ]] || { echo "Missing icon directory: $icons" >&2; exit 1; }
command -v xmllint >/dev/null 2>&1 || {
  echo "xmllint is required for SVG validation" >&2
  exit 1
}

explicit=0
files=()
if [[ $# -gt 0 ]]; then
  explicit=1
  for name in "$@"; do
    if [[ "$name" = /* ]]; then
      files+=("$name")
    else
      files+=("$icons/$name")
    fi
  done
else
  while IFS= read -r file; do
    files+=("$file")
  done < <(find "$icons" -maxdepth 1 -type f -iname '*.svg' | LC_ALL=C sort)
fi

(( ${#files[@]} > 0 )) || { echo "No SVG files found" >&2; exit 1; }

failed=0
for file in "${files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "MISSING  $file" >&2
    failed=1
    continue
  fi

  if ! xmllint --noout "$file"; then
    echo "INVALID  $file" >&2
    failed=1
    continue
  fi

  complex=""
  if command -v rg >/dev/null 2>&1; then
    complex=$(rg -o '<(pattern|use|clipPath|mask)\b' "$file" | sort -u | tr '\n' ' ' || true)
  else
    complex=$(grep -Eo '<(pattern|use|clipPath|mask)\b' "$file" | sort -u | tr '\n' ' ' || true)
  fi

  if [[ -n "$complex" ]]; then
    if (( explicit )); then
      echo "UNSAFE   $(basename "$file") contains: $complex" >&2
      failed=1
    else
      echo "WARN     $(basename "$file") contains complex SVG structures: $complex"
    fi
  else
    echo "OK       $(basename "$file")"
  fi
done

if (( failed )); then
  echo "Validation failed. Flatten newly imported Figma assets before using them in macOS." >&2
  exit 1
fi

echo "Validated ${#files[@]} SVG file(s)."
