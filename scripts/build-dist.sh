#!/usr/bin/env bash

# Set the path to the script directory
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Set the path to the root directory
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Set constants
readonly SYSTEM_ROOT="/projects"
readonly TOK_DIR="${SYSTEM_ROOT}/tok"
readonly MONOREPO_ROOT="${SYSTEM_ROOT}/monorepo-one"
readonly PROJECT_ROOT="${MONOREPO_ROOT}/library/mapping-tools"
readonly SCRIPTS_DIR="${PROJECT_ROOT}/scripts"
readonly DIST_DIR="${PROJECT_ROOT}/dist"
readonly BIN_DIR="${PROJECT_ROOT}/node_modules/.bin"
# /projects/monorepo-one/library/mapping-tools/node_modules/.bin
readonly tsconfig="${MONOREPO_ROOT}/library/typescript/tsconfig.json"

# ../typescript/tsconfig.json

echo CURRENT_DIR: "$PWD"
echo SCRIPT_DIR: "$SCRIPT_DIR"
echo SCRIPTS_DIR: "$SCRIPTS_DIR"
echo ROOT_DIR: "$ROOT_DIR"
echo DIST_DIR: "$DIST_DIR"

# Make sure we're in the correct directory
cd "${PROJECT_ROOT}" || exit 14

# Set up error handling
set -e
trap 'echo Error on line $LINENO' ERR

# Set environment variables
# Check if the file at "${HOME}/tok/npm_mapping-tools" exists
if [ -f "${TOK_DIR}/npm_mapping-tools" ]; then
  # If the file exists, source it
  # shellcheck source=/dev/null
  source "${TOK_DIR}/npm_mapping-tools"
fi

# Create the dist directory
mkdir -p "${DIST_DIR}"

# Copy important files to the dist directory.
cp "${PROJECT_ROOT}/.npmignore" "${DIST_DIR}/.npmignore"
cp "${PROJECT_ROOT}/stub.npmrc" "${DIST_DIR}/.npmrc"
cp "${PROJECT_ROOT}/package.json" "${DIST_DIR}/package.json"
cp "${PROJECT_ROOT}/LICENSE" "${DIST_DIR}/LICENSE"
cp "${PROJECT_ROOT}/README.md" "${DIST_DIR}/README.md"
cp "${MONOREPO_ROOT}/.editorconfig" "${DIST_DIR}/.editorconfig"
cp "${MONOREPO_ROOT}/.prettierrc.cjs" "${DIST_DIR}/.prettierrc.cjs"
cp "${tsconfig}" "${DIST_DIR}/tsconfig.json"

# Include project-specific files.
PATH="${BIN_DIR}:${PATH}"

# Run Prettier to format the source code and build the project.
prettier -wc ./src
rm -fr "${PROJECT_ROOT:?}/lib"
yarn build || exit 15

# Run tests, generate code coverage reports.
rm -fr "${DIST_DIR:?}/coverage"
yarn coverage

# Generate API documentation.
rm -fr "${DIST_DIR:?}/docs"
# api-extractor run --local
typedoc --options config/typedoc.json

readonly LIB_DIR="${DIST_DIR:?}/lib"
readonly SRC_DIR="${DIST_DIR:?}/src"
# Copy the built files and images to the dist directory
rm -fr "${LIB_DIR:?}" "${SRC_DIR:?}" "${DIST_DIR:?}/typings"
cp -r lib dist
cp -r src dist
# cp -r images dist

# Clean up the dist directory.
rm -fr "${LIB_DIR:?}/backup"
rm -fr "${LIB_DIR:?}/typings/test"
rm -fr "${SRC_DIR:?}/src/backup"
rm -fr "${LIB_DIR:?}/test"
rm -fr "${SRC_DIR:?}/src/test"
rm -fr "${LIB_DIR:?}/performance"
rm -fr "${LIB_DIR:?}/performance"
rm -fr "${LIB_DIR:?}/ts-out-info.lib"
rm -fr "${LIB_DIR:?}/typings/backup"
rm -fr "${LIB_DIR:?}/tools"
rm -fr "${LIB_DIR:?}/class"
rm -f "${DIST_DIR:?}lib/class/"
rm -f "${DIST_DIR:?}lib/main-2.js"
rm -f "${DIST_DIR:?}lib/main.js"
rm -f "${DIST_DIR:?}lib/main-2.js.map"
rm -f "${DIST_DIR:?}lib/main.js.map"

# Copy the typings directory to the dist directory.
mv "${LIB_DIR:?}/typings" "${DIST_DIR:?}/typings"
cp typings/tsdoc-metadata.json dist/typings/tsdoc-metadata.json
cp "${PROJECT_ROOT}/etc/mapping-tools.api.md" "${DIST_DIR:?}/mapping-tools.api.md"
