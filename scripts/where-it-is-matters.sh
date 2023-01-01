#!/usr/bin/env bash

# Set the path to the script directory
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Set the path to the root directory
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Set constants
readonly MONOREPO_ROOT="/projects/monorepo-one"
readonly PROJECT_ROOT="${MONOREPO_ROOT}/library/mapping-tools"
readonly SCRIPTS_DIR="${PROJECT_ROOT}/scripts"
readonly DIST_DIR="${PROJECT_ROOT}/dist"

echo CURRENT_DIR: "$PWD"
echo SCRIPT_DIR: "$SCRIPT_DIR"
echo SCRIPTS_DIR: "$SCRIPTS_DIR"
echo ROOT_DIR: "$ROOT_DIR"
echo DIST_DIR: "$DIST_DIR"

# # Set constants
# readonly MONOREPO_ROOT="/projects/monorepo-one"
# readonly PROJECT_ROOT="${MONOREPO_ROOT}/library/mapping-tools"
# # readonly SCRIPTS_DIR="${PROJECT_ROOT}/scripts"
# readonly DIST_DIR="${PROJECT_ROOT}/dist"

# Change to the project root directory
# cd "${PROJECT_ROOT}" || exit 1

# Source environment variables
# source "${HOME}/tok/npm_mapping-tools"

# Create the dist directory
# mkdir -p "${DIST_DIR}"

# echo SCRIPTS_DIR: "${SCRIPT_DIR}"

## Output:
# CURRENT_DIR: /projects/monorepo-one/library/mapping-tools
# SCRIPT_DIR: /projects/monorepo-one/library/mapping-tools/scripts
# SCRIPTS_DIR: /projects/monorepo-one/library/mapping-tools/scripts
# ROOT_DIR: /projects/monorepo-one/library/mapping-tools
# DIST_DIR: /projects/monorepo-one/library/mapping-tools/dist
