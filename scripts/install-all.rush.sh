#!/bin/sh
pwd

rush add \
  -p @rushstack/heft@latest \
  -p @rushstack/heft-jest-plugin@latest \
  -p @types/node@18 \
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
  -p eslint-plugin-unicorn@latest \
  -p eslint@latest \
  -p jest@latest \
  -p nodemon@latest \
  -p prettier@latest \
  -p ts-node@latest \
  -p typescript@latest \
  --dev --make-consistent

rush add \
  -p @types/eslint-config-prettier@latest \
  -p @types/eslint-plugin-prettier@latest \
  -p @types/heft-jest@latest \
  -p @types/jest@latest \
  --exact --dev --make-consistent

rush add --package tslib@latest --dev --exact --make-consistent
rush update -p
pwd
# rush add --package tslib@latest --dev --exact --make-consistent
# rush add --exact --make-consistent -p @testing-library/jest-dom -p @testing-library/react -p @testing-library/user-event -p @types/jest -p @types/node -p @types/react -p @types/react-dom -p react -p react-dom -p react-scripts -p typescript -p web-vitals
#
