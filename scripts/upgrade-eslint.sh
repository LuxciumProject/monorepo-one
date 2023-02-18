#!/usr/bin/env bash

rush add \
    -p @rushstack/eslint-config@latest \
    -p @types/eslint-config-prettier@latest \
    -p @types/eslint-plugin-prettier@latest \
    -p @typescript-eslint/eslint-plugin@latest \
    -p @typescript-eslint/parser@latest \
    -p eslint-config-prettier@latest \
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
 --exact --dev --make-consistent --all




# install linters and formatters globally
pnpm -g add
eslint@latest \
prettier@latest \
ts-node@latest \
typescript@latest \
jest@latest \
ts-jest@latest \
typedoc@latest
