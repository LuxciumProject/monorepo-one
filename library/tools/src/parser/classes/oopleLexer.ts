import { TOKEN_TYPES } from '../config';
import type { LexerInterface, Token } from '../types';

export class Lexer implements LexerInterface {
  private readonly input: string;

  private position: number;

  private readonly tokens: Token[];

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.tokens = [];
  }

  tokenize(): Token[] {
    const regex = /\s*(=>|{|}|[A-Za-z]+|\d+|\S)\s*/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(this.input)) !== null) {
      // Ensure match is not null and handle it appropriately
      const tokenValue = match[0];
      const type = Object.values(TOKEN_TYPES).find(t =>
        new RegExp(t, 'i').test(tokenValue)
      );
      if (type) {
        this.tokens.push({ type, value: tokenValue });
      }
    }

    return this.tokens;
  }

  nextToken(): Token | null {
    return this.tokens[this.position++] || null;
  }
}
