#!/usr/bin/bash

# scripts/build-dist.sh
# This script builds the dist directory for the mapping-tools library.

cd /projects/monorepo-one/library/mapping-tools || exit 14
source "${HOME}/tok/npm_mapping-tools"

# Create the dist directory
mkdir -p dist

# Copy important files to the dist directory
cp .npmignore dist/.npmignore
cp .npmrc dist/.npmrc
cp package.json dist/package.json
cp LICENSE dist/LICENSE
cp README.md dist/README.md
cp ../../.editorconfig dist/.editorconfig
cp ../../.prettierrc.cjs dist/.prettierrc.cjs
cp ../typescript/tsconfig.json dist/tsconfig.json

# Run Prettier to format the source code and build the project
prettier -wc ./src
rm -fr lib
yarn build

# Run tests, generate code coverage reports, and generate API documentation
rm -fr dist/coverage dist/docs
yarn coverage
yarn build:api

# Copy the built files and images to the dist directory
rm -fr dist/lib dist/src dist/typings
cp -r lib src images dist

# Clean up the dist directory
rm -fr "$(pwd)/dist/lib/backup"
rm -fr "$(pwd)/dist/lib/typings/test"
rm -fr "$(pwd)/dist/src/backup"
rm -fr "$(pwd)/dist/lib/test"
rm -fr "$(pwd)/dist/src/test"
rm -fr "$(pwd)/dist/lib/performance"
rm -fr "$(pwd)/dist/lib/performance"
rm -fr "$(pwd)/dist/lib/ts-out-info.lib"
rm -fr "$(pwd)/dist/lib/typings/backup"
rm -fr "$(pwd)/dist/lib/tools"
rm -fr "$(pwd)/dist/lib/class"
rm -f "$(pwd)/dist/lib/class/"
rm -f "$(pwd)/dist/lib/main-2.js"
rm -f "$(pwd)/dist/lib/main.js"
rm -f "$(pwd)/dist/lib/main-2.js.map"
rm -f "$(pwd)/dist/lib/main.js.map"

# Copy the typings directory to the dist directory
mv dist/lib/typings dist/typings
cp typings/tsdoc-metadata.json dist/typings/tsdoc-metadata.json

# Print the current working directory
pwd
