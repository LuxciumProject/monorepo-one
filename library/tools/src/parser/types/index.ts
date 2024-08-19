// Common Types and Interfaces
export type Token = {
  type: string;
  value: string;
};

export interface LexerInterface {
  tokenize: () => Token[];
  nextToken: () => Token | null;
}

export interface GrammarRule {
  nonTerminal: string;
  production: string[];
}

export interface ParseTreeNode {
  value: string;
  children: ParseTreeNode[];
}

export type Token = {
  type: string;
  value: string;
};

export interface LexerInterface {
  tokenize: () => Token[];
  nextToken: () => Token | null;
}
