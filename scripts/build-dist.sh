#!/usr/bin/bash

mkdir -p dist
cp package.json dist/package.json

ts-node src/smoke-tests.ts

rm -fr lib
yarn build

rm -fr dist/coverage
yarn test

rm -fr dist/docs
yarn build:api

rm -fr dist/lib
rm -fr dist/src
rm -fr dist/typings

cp -r lib dist
cp -r src dist

# echo dist/lib/**/*smoke*
# echo dist/lib/**/specs
# echo dist/lib/**/backup
# echo dist/lib/performance
# echo dist/lib/ts-out-info.lib
# echo dist/lib/**/test

rm -fr "$(pwd)/dist/lib/backup"
rm -fr "$(pwd)/dist/lib/core/function/specs"
rm -fr "$(pwd)/dist/lib/core/specs"
rm -fr "$(pwd)/dist/lib/helpers/assertions/specs"
rm -fr "$(pwd)/dist/lib/helpers/specs"
rm -fr "$(pwd)/dist/lib/helpers/tools/specs"
rm -fr "$(pwd)/dist/lib/performance"
rm -fr "$(pwd)/dist/lib/performance"
rm -fr "$(pwd)/dist/lib/smoke-tests.js.map"
rm -fr "$(pwd)/dist/lib/smoke-tests.js"
rm -fr "$(pwd)/dist/lib/ts-out-info.lib"
rm -fr "$(pwd)/dist/lib/typings/backup"
rm -fr "$(pwd)/dist/lib/typings/core/function/specs"
rm -fr "$(pwd)/dist/lib/typings/core/specs"
rm -fr "$(pwd)/dist/lib/typings/helpers/assertions/specs"
rm -fr "$(pwd)/dist/lib/typings/helpers/specs"
rm -fr "$(pwd)/dist/lib/typings/helpers/tools/specs"
rm -fr "$(pwd)/dist/lib/typings/smoke-tests.d.ts.map"
rm -fr "$(pwd)/dist/lib/typings/smoke-tests.d.ts"
rm -fr "$(pwd)/dist/lib/typings/test"
rm -fr "$(pwd)/dist/src/backup"

rm -fr "$(pwd)/dist/lib/test"
rm -fr "$(pwd)/dist/src/test"

rm -fr "$(pwd)/dist/src/core/function/specs"
rm -fr "$(pwd)/dist/src/core/specs"
rm -fr "$(pwd)/dist/src/helpers/assertions/specs"
rm -fr "$(pwd)/dist/src/helpers/specs"
rm -fr "$(pwd)/dist/src/helpers/tools/specs"
rm -fr "$(pwd)/dist/src/typings/core/function/specs"
rm -fr "$(pwd)/dist/src/typings/core/specs"
rm -fr "$(pwd)/dist/src/typings/helpers/assertions/specs"
rm -fr "$(pwd)/dist/src/typings/helpers/specs"
rm -fr "$(pwd)/dist/src/typings/helpers/tools/specs"
rm -fr "$(pwd)/dist/src/smoke-tests.ts"

mv dist/lib/typings dist/typings
cp typings/tsdoc-metadata.json dist/typings/tsdoc-metadata.json
pwd
