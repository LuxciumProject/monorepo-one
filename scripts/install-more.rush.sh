#!/bin/sh
pwd

# rush add \
#   -p @babel/core@latest \
#   -p @babel/plugin-transform-typescript@latest \
#   -p @types/chai@latest \
#   -p @types/express@latest \
#   -p @types/fs-extra@latest \
#   -p @types/glob@latest \
#   -p @types/jest@latest \
#   -p @types/mime-types@latest \
#   -p chai@latest \
#   -p concurrently@latest \
#   -p jest@latest \
#   -p nodemon@latest \
#   -p rimraf@latest \
#   -p ts-jest@latest \
#   -p ts-loader@latest \
#   -p ts-node@latest \
#   -p tsconfig-paths@latest \
#   -p typescript@latest \
#   -p webpack@latest \
#   --dev --make-consistent

rush add \
  -p @babel/core@latest \
  -p @babel/plugin-syntax-flow \
  -p @babel/plugin-transform-react-jsx \
  -p @babel/plugin-transform-typescript@latest \
  -p @types/eslint-config-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/eslint@latest \
  -p @types/prettier@latest \
  -p @typescript-eslint/eslint-plugin@latest \
  -p @typescript-eslint/parser@latest \
  -p eslint-config-next@latest \
  -p eslint-config-prettier@latest \
  -p eslint-config-react-app@latest \
  -p eslint-import-resolver-typescript@latest \
  -p eslint-plugin-import@latest \
  -p eslint-plugin-jsdoc@latest \
  -p eslint-plugin-jsonc@latest \
  -p eslint-plugin-prettier@latest \
  -p eslint-plugin-promise@latest \
  -p eslint-plugin-react-hooks@latest \
  -p eslint-plugin-react@latest \
  -p eslint-plugin-simple-import-sort@latest \
  -p eslint-plugin-tsdoc@latest \
  -p eslint-plugin-unicorn@latest \
  -p eslint@latest \
  -p prettier@latest \
  --dev --make-consistent --all

rush add -p tslib@latest --dev --make-consistent --all
rush add -p eslint-config-prettier@latest -p @types/jest@latest -p @jest/globals@latest -p jest@latest -p @types/node@^20 -p ts-jest@latest -p ts-node@latest -p nodemon@latest -p tsconfig-paths@latest -p typescript@latest -p jest@latest --dev --make-consistent --all
rush purge --unsafe
rush update --full --recheck --network-concurrency 20
rush rebuild --verbose --ignore-hooks --timeline
rush check --verbose
pwd
