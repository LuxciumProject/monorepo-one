/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  maxConcurrency: 10,
  maxWorkers: '75%',
  detectLeaks: true,

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/out/**/*.*',
    '!*.d.ts',
  ],
  // testRegex: 'src/utils.*/tests/.*\\.(test)?\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   './src/utils/**/*.{ts,tsx}',
  //   '!**/node_modules/**',
  //   '!**/vendor/**',
  //   '!**/out/**',
  // ],
  // coverageDirectory: './coverage',
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
