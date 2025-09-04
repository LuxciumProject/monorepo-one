#!/usr/bin/env bash
# File: scripts/audits/test-counts-audit.sh
# Purpose: Count test files per top-level group to snapshot coverage trends.

set -euo pipefail

ROOT_DIR="/projects/monorepo-one"
TOP_GROUPS=(library services backend frontend APIs examples)

echo "=== TEST COUNTS ==="
for grp in "${TOP_GROUPS[@]}"; do
  cnt=$(find "${ROOT_DIR}/${grp}" -type f \( -name "*.test.ts" -o -name "*.test.js" -o -name "*.spec.ts" -o -name "*.spec.js" \) 2>/dev/null | wc -l)
  printf "%-10s %5d\n" "$grp" "$cnt"
done
