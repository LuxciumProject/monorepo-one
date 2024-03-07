// This is a workaround for https://github.com/eslint/eslint/issues/3458
// require('@rushstack/eslint-config/patch/modern-module-resolution');
module.export = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  plugins: ['unicorn', 'prettier', 'simple-import-sort', 'import', 'jsdoc', '@typescript-eslint'],
  extends: [
    'plugin:jsonc/base',
    'plugin:jsonc/recommended-with-json',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:jsonc/recommended-with-json5',
    'plugin:jsonc/auto-config',
    'plugin:prettier/recommended',
    // "prettier/@typescript-eslint",
    // "prettier/babel",
    // "prettier/flowtype",
    // "prettier/react",
    // "prettier/standard",
    // "prettier/unicorn",
    // "prettier/vue"
  ],
  files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.cts', '**/*.mts', 'src/**/*.ts'],
  ignorePatterns: ['.eslintrc.cjs', '**/out/**/*.*'],
  rules: {
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
    // "comma-dangle": [
    //   "warn",
    //   "only-multiline"
    // ],
    'lines-around-comment': 'off',
    'max-len': 'off', // export function  /*eslint max-len: ["error", { "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(" }]*/
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
    // "unicorn/consistent-function-scoping": "error",
    // "unicorn/error-message": "error",
    // "unicorn/expiring-todo-comments": "error",
    // "unicorn/filename-case": "error",
    // "unicorn/import-style": "error",
    // "unicorn/no-keyword-prefix": "error",
    // "unicorn/no-process-exit": "error",
    // "unicorn/no-unreadable-array-destructuring": "error",
    // "unicorn/no-unsafe-regex": "error",
    // "unicorn/no-unused-properties": "error",
    'unicorn/better-regex': 'warn',
    'unicorn/catch-error-name': 'warn',
    'unicorn/custom-error-definition': 'warn',
    'unicorn/escape-case': 'warn',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/import-index': 'warn',
    'unicorn/new-for-builtins': 'warn',
    'unicorn/no-console-spaces': 'warn',
    'unicorn/no-for-loop': 'warn',
    'unicorn/no-hex-escape': 'warn',
    'unicorn/no-new-buffer': 'warn',
    'unicorn/no-useless-undefined': 'warn',
    'unicorn/no-zero-fractions': 'warn',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/prefer-add-event-listener': 'warn',
    'unicorn/prefer-array-find': 'warn',
    'unicorn/prefer-includes': 'warn',
    'unicorn/prefer-math-trunc': 'warn',
    'unicorn/prefer-modern-dom-apis': 'warn',
    'unicorn/prefer-negative-index': 'warn',
    // "unicorn/prefer-number-properties": "warn",
    'unicorn/prefer-optional-catch-binding': 'warn',
    'unicorn/prefer-query-selector': 'warn',
    'unicorn/prefer-reflect-apply': 'warn',
    'unicorn/prefer-set-has': 'warn',
    'unicorn/prefer-spread': 'warn',
    'unicorn/prefer-string-slice': 'warn',
    'unicorn/prefer-ternary': 'warn',
    'unicorn/prefer-type-error': 'warn',
    'unicorn/string-content': 'warn',
    'unicorn/throw-new-error': 'warn',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/prevent-abbreviations': [
      'off',
      {
        whitelist: {
          _db: true,
        },
      },
    ],
    // "unicorn/no-array-instanceof": "warn",
    // "unicorn/no-fn-reference-in-iterator": "off",
    // "unicorn/no-reduce": "off",
    // "unicorn/prefer-dataset": "warn",
    // "unicorn/prefer-event-key": "warn",
    // "unicorn/prefer-flat-map": "warn",
    // "unicorn/prefer-node-append": "warn",
    // "unicorn/prefer-node-remove": "warn",
    // "unicorn/prefer-replace-all": "warn",
    // "unicorn/prefer-starts-ends-with": "warn",
    // "unicorn/prefer-text-content": "warn",
    // "unicorn/prefer-trim-start-end": "warn",
    // duplicate "unicorn/prevent-abbreviations": "off",
    // duplicate "unicorn/throw-new-error": "warn",
    // "unicorn/regex-shorthand": "warn",
    // "unicorn/no-nested-ternary": "off",
    // "unicorn/number-literal-case": "off",
    // "comma-style": [
    //   "warn",
    //   "last"
    // ],
    // "comma-dangle": [
    //   "warn",
    //   "always-multiline"
    // ],
    /*
  ―――――――― simple-import-sort ――――――――――――――――――――――――――――――――――――――――――――――――――
    */
    'sort-imports': 'off',
    'import/order': 'off',
    // "simple-import-sort/imports": "warn",
    // "simple-import-sort/exports": "warn",
    /*
  ―――――――― eslint-plugin-import ――――――――――――――――――――――――――――――――――――――――――――――――
    */
    /*Static analysis*/
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',
    'import/no-unresolved': 0,
    'import/named': 0,
    'import/default': 0,
    'import/namespace': 'error',
    'import/no-restricted-paths': 0,
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 0,
    'import/no-internal-modules': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/no-cycle': 0,
    'import/no-relative-parent-imports': 0,
    /* Helpful warnings */
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'error',
    /*Style guide*/
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-namespace': 'off',
    //  "import/order": 0, // ―3 managed with simple-import-sort
    'import/exports-last': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/max-dependencies': 0,
    'import/no-unassigned-import': 0,
    'import/no-named-default': 0,
    'import/no-default-export': 0,
    'import/no-named-export': 0,
    'import/no-anonymous-default-export': 0,
    'import/group-exports': 0,
    'import/dynamic-import-chunkname': 0,
    /*Module systems*/
    'import/no-amd': 0,
    'import/no-commonjs': 0,
    'import/no-nodejs-modules': 0,
    'import/unambiguous': 0,
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-unused-vars': [
      'off',
      {
        ignoreRestSiblings: true,
      },
    ],
  },
};

/**
 * @see {@link https://rushstack.io/pages/heft_tasks/eslint/}
 * "eslint" task
 * This task invokes the ESLint tool which reports errors about common coding problems.
 *
 * When to use it
 * ESLint fits together with several other tools as part of Rush Stack's recommended strategy for code validation:
 *
 * Prettier: This tool manages trivial syntax aspects such as spaces, commas, and semicolons. Because these aspects normally don't affect code semantics, we never bother the developer with error messages about it, nor is it part of the build. Instead, Prettier reformats the code automatically via a git commit hook. To se this up, see the Enabling Prettier tutorial on the Rush website.
 *
 * TypeScript: The TypeScript compiler performs sophisticated type checking and semantic analysis that is the most important safeguard for program correctness.
 *
 * ESLint: The lint rules supplement the compiler's checks with additional stylistic rules that are more subjective and highly customizable. Whereas TypeScript might detect that "This function parameter is a string but was declared as a number", the linter might detect an issue such as "This class name should use PascalCase instead of camelCase." Unlike Prettier issues, fixing an ESLint issue may involve a significant code change, and may even break an API contract.
 *
 * API Extractor: This is an additional validation check for library packages only. It ensures their API contracts are well-formed and properly documented.
 *
 * Although it's recommended to set up your build system in this way, Heft doesn't require a particular approach. Each of these components is optional, and other configurations are possible. For example, older code bases may need to use TSLint instead of ESLint.
 *
 * package.json dependencies
 * You will need to add the eslint package to your project:
 *
 * rush add --package eslint --dev
 *
 * Alternatively, you can avoid this dependency by loading it from a "rig package", as described in the Interfacing with Rush article. However, if you use the ESLint extension for VS Code, it will try to resolve the eslint package from your project folder. Thus it may still be useful to add ESLint to your package.json file. (The extension is able to load a globally installed eslint package; however, its version may not match the version required by the local branch.)
 *
 * Config files
 * There isn't a Heft-specific file for this task. Heft looks for ESLint's config file. Although ESLint supports 7 different names/formats for this file, Heft requires it to be named ".eslintrc.js". This has a couple benefits:
 *
 * Consistency: Using one standard name ".eslintrc.js" makes it easy to search for these files, perform bulk edits, and copy configuration recipes between projects.
 * Workarounds: Using the .js file extension enables JavaScript expressions in the file. This is practice is generally discouraged because code expressions are harder to validate, and expressions can depend on environmental inputs that are invisible to caches. However, for historical reasons, ESLint's config file format has some limitations that can only be solved with scripts (for example using __dirname to resolve file paths).
 * It's not recommended to place a centralized .eslintrc.js in the monorepo root folder. This violates Rush's principle that projects should be independent and easily movable between monorepos.
 *
 * Instead, each project should have its own .eslintrc.js file. We recommend to use the @rushstack/eslint-config shared configuration, which is specifically tailored for large scale monorepos, and based on the typescript-eslint parser and ruleset. If you need additional custom lint rules, it's recommended to create a custom NPM package that extends from @rushstack/eslint-config.
 *
 * With this approach, a typical ESLint config file will have very minimal boilerplate. For example:
 * @example
 * <project folder>/.eslintrc.js
 *
 *     // This is a workaround for https://github.com/eslint/eslint/issues/3458
 *     require('@rushstack/eslint-config/patch/modern-module-resolution');
 *     module.exports = {
 *       extends: ['@rushstack/eslint-config/profile/node'],
 *       parserOptions: { tsconfigRootDir: __dirname }
 *     };
 * Profiles and mixins
 * The @rushstack/eslint-config package currently provides three different lint profiles. Choose one:
 *
 * `@rushstack/eslint-config/profile/node` - for Node.js services
 * `@rushstack/eslint-config/profile/node-trusted-tool` - for Node.js tools
 * `@rushstack/eslint-config/profile/web-app` - for web browser applications
 * It also supports lint mixins. Add as many as you like:
 *
 * `@rushstack/eslint-config/mixins/react` - if you use the React framework
 * `@rushstack/eslint-config/mixins/friendly-locals` - if you prefer more verbose declarations to make
 * @rushstack/eslint-config/mixins/tsdoc - if you are using API Extractor in your workspace
 * The {@link https://www.npmjs.com/package/@rushstack/eslint-config | @rushstack/eslint-config}
 *  documentation explains these options in more detail.
 *
 */
// const exportLinter = eslinter;
// module.export = exportLinter;
