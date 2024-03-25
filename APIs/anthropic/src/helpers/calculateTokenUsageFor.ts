import { UsageReturn } from './types';

export function calculateTokenUsageFor(
  pricingService: (tokens: number, input?: boolean) => number
) {
  return function calculateTokenUsage(
    tokens: number,
    input = true
  ): UsageReturn {
    const price = pricingService(tokens, input);
    if (typeof price === 'string') {
      throw new Error(price);
    }
    if (price === 0) {
      throw new Error('Price per token cannot be zero');
    }
    const result = Math.ceil(1 / price);

    return [result, +(result * price).toFixed(2), +price.toFixed(2)];
  };
}
