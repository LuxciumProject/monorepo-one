import { ModelPrice } from './types';
const MTOK = 1_000_000;
export const PRICES = {
  claude3: {
    haiku: {
      input: 0.25,
      output: 1.25,
    } as ModelPrice,
    sonnet: {
      input: 3,
      output: 15,
    } as ModelPrice,
    opus: {
      input: 15,
      output: 75,
    } as ModelPrice,
  },
  claude21: {
    input: 8,
    output: 24,
  } as ModelPrice,
  claude20: {
    input: 8,
    output: 24,
  } as ModelPrice,
  claudeInstant: {
    input: 0.8,
    output: 2.4,
  } as ModelPrice,
  ERROR: {
    input: NaN,
    output: NaN,
  } as ModelPrice,
  MTOK,
};
