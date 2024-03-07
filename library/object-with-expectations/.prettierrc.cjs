// Documentation for this file: https://prettier.io/en/configuration.html
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  printWidth: 80,
  proseWrap: 'preserve',
  // Use .gitattributes to manage newlines
  endOfLine: 'auto',
  // Use single quotes instead of double quotes
  singleQuote: true,
  // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
  // to use them for arrays only
  trailingComma: 'es5',
  insertPragma: false,
  requirePragma: false,
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  semi: true,
};

/*
void {
  insertPragma: false,
  requirePragma: false,
  editorconfig: true,
  endOfLine: 'lf',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  overrides: [
    {
      files: [],
      options: {
        printWidth: 120,
        proseWrap: 'never',
      },
    },
    {
      files: '*.js',
      options: {
        parser: 'typescript',
      },
    },
  ],
  // overrides: [
  //   {
  //     files: [],
  //     options: {
  //       printWidth: 120,
  //       proseWrap: 'never',
  //     },
  //   },
  //   {
  //     files: '*.js',
  //     options: {
  //       parser: 'typescript',
  //     },
  //   },
  // ],
  semi: true,
};

 */
