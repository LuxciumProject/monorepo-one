#!/usr/bin/env bash
# File: scripts/audits/barrel-index-audit.sh
# Purpose: Verify index.ts files are barrel-only (named exports, no implementation, no export * or default).

set -euo pipefail

ROOT_DIR="/projects/monorepo-one"
TARGET_DIRS=(library services backend APIs frontend)

echo "=== BARREL-ONLY INDEX AUDIT ==="
while IFS= read -r -d '' f; do
  rel="${f#${ROOT_DIR}/}"

  # Disallow export * and export default
  if /bin/grep -qE "^\s*export \*" "$f"; then
    echo "VIOLATION: ${rel}"
    /bin/grep -nE "^\s*export \*" "$f" | sed 's/^/   disallow export *: /'
  fi
  if /bin/grep -qE "^\s*export default" "$f"; then
    [[ ! -v printed ]] && echo "VIOLATION: ${rel}" && printed=1
    /bin/grep -nE "^\s*export default" "$f" | sed 's/^/   disallow export default: /'
  fi

  # Any line not empty/comment/export forms counts as non-barrel
  bad=$(/bin/grep -nEv "^\s*(//|/\*|\*|\*/|export(\stype)?\s\{[^{]*\}(\sfrom\s.+)?;?|export\s(type)\s\{[^{]*\}(\sfrom\s.+)?;?|)$" "$f" || true)
  if [[ -n "${bad}" ]]; then
    [[ -z "${printed:-}" ]] && echo "VIOLATION: ${rel}"
    echo "${bad}" | sed 's/^/   non-barrel line: /' | head -20
  fi
  unset printed
done < <(find "${ROOT_DIR}" -type f -path "*/src/index.ts" -print0 2>/dev/null)
