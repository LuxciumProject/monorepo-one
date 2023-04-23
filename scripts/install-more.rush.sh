#!/bin/sh
pwd

rush add \
  -p @babel/core@latest \
  -p @babel/plugin-transform-typescript@latest \
  -p @rushstack/eslint-config@latest \
  -p @rushstack/heft-jest-plugin@latest \
  -p @rushstack/heft@latest \
  -p @types/chai@latest \
  -p @types/eslint-config-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/express@latest \
  -p @types/fs-extra@latest \
  -p @types/glob@latest \
  -p @types/heft-jest@latest \
  -p @types/jest@latest \
  -p @types/mime-types@latest \
  -p @types/prettier@latest \
  -p @typescript-eslint/eslint-plugin@latest \
  -p @typescript-eslint/parser@latest \
  -p chai@latest \
  -p concurrently@latest \
  -p eslint-import-resolver-typescript@latest \
  -p eslint-plugin-import@latest \
  -p eslint-plugin-jsdoc@latest \
  -p eslint-plugin-jsonc@latest \
  -p eslint-plugin-prettier@latest \
  -p eslint-plugin-react-hooks@latest \
  -p eslint-plugin-react@latest \
  -p eslint-plugin-simple-import-sort@latest \
  -p eslint-plugin-tsdoc@latest \
  -p eslint-plugin-unicorn@latest \
  -p eslint@latest \
  -p jest@latest \
  -p nodemon@latest \
  -p prettier@latest \
  -p rimraf@latest \
  -p ts-jest@latest \
  -p ts-loader@latest \
  -p ts-node@latest \
  -p tsconfig-paths@latest \
  -p typescript@latest \
  -p webpack@latest \
  --dev --exact --make-consistent --all

# rush add \
#   -p @types/node@18 \
#   --dev --make-consistent --all

# rush add --package tslib@latest --package typescript@latest --package ts-node@latest --dev --exact --make-consistent --all

rush add -p @types/node@~18 --dev --make-consistent --all
rush add -p tslib@latest -p ts-jest@latest -p ts-loader@latest -p ts-node@latest -p tsconfig-paths@latest -p typescript@latest --dev --exact --make-consistent --all
rush purge --unsafe
rush update --full
rush rebuild --verbose --ignore-hooks --timeline
pwd
