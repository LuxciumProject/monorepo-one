import { TOKEN_TYPES } from '../config';
import type { Token } from '../types';

export const tokenize = (input: string): Token[] => {
  const regex = /\s*(=>|{|}|[A-Za-z]+|\d+|\S)\s*/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    const tokenValue = match[0];
    const type = Object.values(TOKEN_TYPES).find(t =>
      new RegExp(t, 'i').test(tokenValue)
    );
    if (type) {
      tokens.push({ type, value: tokenValue });
    }
  }

  return tokens;
};
