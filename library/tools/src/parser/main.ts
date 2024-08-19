import { Lexer } from './classes/oopleLexer';
import { tokenize as fpTokenize } from './functions/fpLexer';
import type { Token } from './types';

// Example input string
const input = 'your input string here';

// OOP Lexer
const oopLexer = new Lexer(input);
const oopTokens: Token[] = oopLexer.tokenize();
console.log('OOP Tokens:', oopTokens);

// FP Lexer
const fpTokens: Token[] = fpTokenize(input);
console.log('FP Tokens:', fpTokens);
