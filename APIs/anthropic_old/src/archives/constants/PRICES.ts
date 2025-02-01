import { ModelPrice } from './types';
const MTOK = 1_000_000;
export const PRICES = {
  claude3: {
    haiku: {
      inputRate: 0.25,
      outputRate: 1.25,
    } as ModelPrice,
    sonnet: {
      inputRate: 3,
      outputRate: 15,
    } as ModelPrice,
    opus: {
      inputRate: 15,
      outputRate: 75,
    } as ModelPrice,
  },
  claude21: {
    inputRate: 8,
    outputRate: 24,
  } as ModelPrice,
  claude20: {
    inputRate: 8,
    outputRate: 24,
  } as ModelPrice,
  claudeInstant: {
    inputRate: 0.8,
    outputRate: 2.4,
  } as ModelPrice,
  ERROR: {
    inputRate: NaN,
    outputRate: NaN,
  } as ModelPrice,
  MTOK,
};
