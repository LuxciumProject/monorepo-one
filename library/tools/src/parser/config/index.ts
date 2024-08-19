// config.ts

// Token Types
export const TOKEN_TYPES = {
  IDENTIFIER: 'IDENTIFIER',
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
  DELIMITER: 'DELIMITER',
  KEYWORD: 'KEYWORD',
  // Add more token types as needed
} as const;

// Grammar Rules
export const GRAMMAR_RULES = {
  ASSIGNMENT: {
    nonTerminal: 'Assignment',
    production: ['IDENTIFIER', 'OPERATOR', 'NUMBER'],
  },
  EXPRESSION: {
    nonTerminal: 'Expression',
    production: ['NUMBER', 'OPERATOR', 'NUMBER'],
  },
  // Add more grammar rules as needed
} as const;

export const TOKEN_TYPES_ = {
  // Define your token types here
  NUMBER: '\\d+',
  STRING: '"[^"]*"',
  // Add more token types as needed
};
