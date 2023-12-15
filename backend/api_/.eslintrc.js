module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '**/dist/**/*'],
  rules: {
    // "import/no-unresolved": "error",
    /*
  ―――――――― eslint-config-prettier ――――――――――――――――――――――――――――――――――――
    */
    'prettier/prettier': ['warn'],
    'arrow-body-style': 'off',
    'no-confusing-arrow': 'off',
    'prefer-arrow-callback': 'off',
    curly: ['warn', 'multi-line', 'consistent'],
    indent: ['off'],
    'linebreak-style': ['off'],
    quotes: ['off'],
    semi: ['off'],
    'comma-dangle': ['warn', 'only-multiline'],
    'lines-around-comment': 'off',
    'spaced-comment': 'warn',
    'max-len': 'off',
    // export function  /*eslint max-len: ["error", { "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(" }]*/
    'no-mixed-operators': 'off',
    'no-tabs': 'off',
    'no-unexpected-multiline': 'off',
    // "quotes": [
    //   "warn",
    //   "single",
    //   {
    //     "avoidEscape": true,
    //     "allowTemplateLiterals": false
    //   }
    // ],
    // +++ eslint-config-prettier +++
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    '@typescript-eslint/quotes': 0,
    // +++ eslint-config-prettier +++
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/space-infix-ops': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    /*
  ―――――――― unicorn ―――――――――――――――――――――――――――――――――――――――――――――――――――
    */
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
