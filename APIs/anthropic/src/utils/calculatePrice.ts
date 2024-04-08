import { PRICES } from '../constants/PRICES';
import { transformModelName } from '../constants/transformModelName';
import { ModelPrice } from '../constants/types';
import { Models } from '../models/types';

// Function to calculate prices based on the transformed model name

export function calculatePrice(modelName: Models): ModelPrice {
  const transformedName = transformModelName(modelName);
  switch (transformedName) {
    case 'claude-3-opus':
      return PRICES.claude3.opus;
    case 'claude-3-sonnet':
      return PRICES.claude3.sonnet;
    case 'claude-3-haiku':
      return PRICES.claude3.haiku;
    case 'claude-21':
      return PRICES.claude21;
    case 'claude-20':
      return PRICES.claude20;
    case 'claude-instant':
      return PRICES.claudeInstant;
    default:
      return PRICES.ERROR;
  }
}
// 'claude-3-opus'
// 'claude-3-sonnet'
// 'claude-3-haiku'
// 'claude-21'
// 'claude-20'
// 'claude-instant'
