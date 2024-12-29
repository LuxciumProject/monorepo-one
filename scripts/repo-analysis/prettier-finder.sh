#!/usr/bin/env bash
# repo-analysis/prettier-finder.sh

# File: find-prettier-configs.sh
# Path: /projects/monorepo-one/scripts/find-prettier-configs.sh
# Purpose: Spider directories to locate and analyze Prettier configuration files

# ---------- Constants & Settings ----------
set -euo pipefail
trap 'cleanup; exit 1' ERR SIGINT SIGTERM

readonly SCRIPT_NAME="${0##*/}"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
readonly SEARCH_DIR="${1:-$REPO_ROOT}"

# Patterns for Prettier configurations
readonly PRETTIER_PATTERNS=(
  '.prettierrc' '.prettierrc.json' '.prettierrc.yml' '.prettierrc.yaml'
  '.prettierrc.js' '.prettierrc.cjs' 'prettier.config.js'
  'prettier.config.cjs' '.prettierrc.toml'
)

# Output formatting
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m'

# ---------- Function Definitions ----------
log_info() { printf "${BLUE}[INFO]${NC} %s\n" "$*"; }
log_success() { printf "${GREEN}[SUCCESS]${NC} %s\n" "$*"; }
log_warning() { printf "${YELLOW}[WARNING]${NC} %s\n" "$*" >&2; }
log_error() { printf "${RED}[ERROR]${NC} %s\n" "$*" >&2; }

check_dependencies() {
  for cmd in find jq stat; do
    if ! command -v "$cmd" &>/dev/null; then
      log_error "Missing dependency: $cmd"
      return 1
    fi
  done
}

find_prettier_configs() {
  local patterns=()
  for pattern in "${PRETTIER_PATTERNS[@]}"; do
    patterns+=(-o -name "$pattern")
  done
  unset 'patterns[0]' # Remove leading -o
  find "$SEARCH_DIR" -type f \( "${patterns[@]}" \) 2>/dev/null
}

analyze_config_file() {
  local file="$1"
  local ext="${file##*.}"
  local type="Unknown"

  case "$ext" in
  json | js | cjs) type="JavaScript/JSON" ;;
  yml | yaml) type="YAML" ;;
  toml) type="TOML" ;;
  *) [[ -s "$file" ]] || type="Empty file" ;;
  esac

  printf "%-60s | %-15s | %s\n" \
    "$(realpath --relative-to="$REPO_ROOT" "$file")" \
    "$type" \
    "$(stat -c %y "$file" | cut -d. -f1)"
}

# ---------- Main Script ----------
main() {
  check_dependencies
  log_info "Analyzing Prettier configurations in: $SEARCH_DIR"

  printf "%-60s | %-15s | %s\n" "File Path" "Config Type" "Last Modified"
  printf "%s\n" "$(printf '=%.0s' {1..95})"

  local configs
  configs=$(find_prettier_configs)
  if [[ -z "$configs" ]]; then
    log_warning "No Prettier configurations found."
    exit 0
  fi

  while IFS= read -r config; do
    analyze_config_file "$config"
  done <<<"$configs"

  log_success "Analysis complete."
}

main "$@"
