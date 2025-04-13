// first lets conver the pnpn to rush along with the -m  flag
// pnpm add --save-dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
// rush add --dev -m -p eslint -p @eslint/js -p @types/eslint__js -p typescript -p typescript-eslint
// then we will need to add the following to the eslint.config.mjs file

// @ts-check
import * as eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
