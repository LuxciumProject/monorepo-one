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

echo ''
echo '********************************************************************************'
echo '# Run the lint script'
echo ''
yarn lint:fix;

# ../typescript/tsconfig.json
echo ''
echo '********************************************************************************'
echo '# Constants'
echo ''

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

echo ''
echo '********************************************************************************'
echo '# Make the dist directory'
echo ''

# Create the dist directory
mkdir -p "${DIST_DIR}"
# Copy important files to the dist directory.
cp "${PROJECT_ROOT}/.npmignore" "${DIST_DIR}/.npmignore" || { echo cp error && exit 5; }
cp "${PROJECT_ROOT}/stub.npmrc" "${DIST_DIR}/.npmrc" || { echo cp error && exit 5; }
cp "${PROJECT_ROOT}/package.json" "${DIST_DIR}/package.json" || { echo cp error && exit 5; }
cp "${PROJECT_ROOT}/LICENSE" "${DIST_DIR}/LICENSE" || { echo cp error && exit 5; }
cp "${PROJECT_ROOT}/README.md" "${DIST_DIR}/README.md" || { echo cp error && exit 5; }
cp "${MONOREPO_ROOT}/.editorconfig" "${DIST_DIR}/.editorconfig" || { echo cp error && exit 5; }
cp "${MONOREPO_ROOT}/.prettierrc.cjs" "${DIST_DIR}/.prettierrc.cjs" || { echo cp error && exit 5; }
cp "${tsconfig}" "${DIST_DIR}/tsconfig.json" || { echo cp error && exit 5; }

# Include project-specific files.
echo '# Run the project build'
echo ''

PATH="${BIN_DIR}:${PATH}"

# Run Prettier to format the source code and build the project.
echo '# Run prettier'
echo ''

prettier -wc ./src

# Clean the dist directory. This is needed to prevent errors from
# the previous build from causing problems.
rm -fr "${PROJECT_ROOT:?}/lib"  || { echo rm error && exit 4; }
echo ''
echo '********************************************************************************'
echo '# Run tsc to build the project'
echo ''

yarn build || exit 15

# Run tests, generate code coverage reports.
rm -fr "${DIST_DIR:?}/coverage"  || { echo rm error && exit 4; }
echo ''
echo '********************************************************************************'
echo '# Run tests and generate code coverage'
echo ''

yarn coverage || exit 13


readonly LIB_DIR="${DIST_DIR:?}/lib"
readonly SRC_DIR="${DIST_DIR:?}/src"

# Copy the built files and images to the dist directory
rm -fr "${LIB_DIR:?}" "${SRC_DIR:?}" "${DIST_DIR:?}/typings"  || { echo rm error && exit 4; }
cp -r lib dist || { echo cp error && exit 5; }
cp -r src dist || { echo cp error && exit 5; }
# cp -r images dist || { echo cp error && exit 5; }

cp -r "${PROJECT_ROOT:?}/typings" "${LIB_DIR:?}/typings" || { echo cp error && exit 5; }

# Clean up the dist directory.
echo ''
echo '********************************************************************************'
echo '# Clean up the dist directory and remove unnecessary files'
echo ''

rm -fr "${LIB_DIR:?}/backup"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/typings/test"  || { echo rm error && exit 4; }
rm -fr "${SRC_DIR:?}/src/backup"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/test"  || { echo rm error && exit 4; }
rm -fr "${SRC_DIR:?}/src/test"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/performance"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/performance"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/ts-out-info.lib"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/typings/backup"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/tools"  || { echo rm error && exit 4; }
rm -fr "${LIB_DIR:?}/class"  || { echo rm error && exit 4; }
rm -f "${DIST_DIR:?}lib/class/"  || { echo rm error && exit 4; }
rm -f "${DIST_DIR:?}lib/main-2.js"  || { echo rm error && exit 4; }
rm -f "${DIST_DIR:?}lib/main.js"  || { echo rm error && exit 4; }
rm -f "${DIST_DIR:?}lib/main-2.js.map"  || { echo rm error && exit 4; }
rm -f "${DIST_DIR:?}lib/main.js.map"  || { echo rm error && exit 4; }

# Copy the typings directory to the dist directory.
echo '# Copy the typings directory to the dist directory'
echo ''

mv "${LIB_DIR:?}/typings" "${DIST_DIR:?}/typings"  || { echo mv error && exit 6; }

# Copy the tsconfig.json file to the dist directory
echo '# Copy the tsconfig.json file to the dist directory'

cp "${PROJECT_ROOT}/etc/mapping-tools.api.md" "${DIST_DIR:?}/mapping-tools.api.md" || { echo cp error && exit 5; }


# Generate API documentation for the project.
rm -fr "${DIST_DIR:?}/docs"  || { echo rm error && exit 4; }
# api-extractor run --local
echo ''
echo '********************************************************************************'
echo '# Run typedoc to generate the API documentation'
echo ''

typedoc --options config/typedoc.json || exit 11


echo ''
echo ''
echo -- OK --
