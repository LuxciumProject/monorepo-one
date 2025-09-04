#!/usr/bin/env bash
# File: scripts/audits/readme-audit.sh
# Purpose: List Rush packages (by group) that are missing a README.md file.

set -euo pipefail

ROOT_DIR="/projects/monorepo-one"
TOP_GROUPS=(library services backend frontend APIs examples)

echo "=== README AUDIT ==="
for grp in "${TOP_GROUPS[@]}"; do
  echo "-- ${grp} --"
  find "${ROOT_DIR}/${grp}" -type f -name package.json -print0 2>/dev/null \
    | while IFS= read -r -d '' pkg; do
        dir=$(dirname "$pkg")
        if [[ -d "$dir" ]] && [[ ! -f "$dir/README.md" ]] && [[ ! -f "$dir/readme.md" ]]; then
          # Print path relative to repo root
          rel="${dir#${ROOT_DIR}/}"
          echo "MISSING: ${rel}"
        fi
      done | sort || true
  echo
done
