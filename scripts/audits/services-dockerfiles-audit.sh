#!/usr/bin/env bash
# File: scripts/audits/services-dockerfiles-audit.sh
# Purpose: Inventory Dockerfile presence across services/*.

set -euo pipefail

ROOT_DIR="/projects/monorepo-one"
SERVICES_DIR="${ROOT_DIR}/services"

echo "=== DOCKERFILES IN SERVICES ==="
for dir in "${SERVICES_DIR}"/*; do
  [[ -d "$dir" ]] || continue
  name=$(basename "$dir")
  if [[ -f "$dir/Dockerfile" ]] || [[ -f "$dir/docker/Dockerfile" ]] || [[ -f "$dir/docker/Dockerfile.dev" ]]; then
    echo "HAS: services/${name}"
  else
    echo "MISSING: services/${name}"
  fi
done | sort
