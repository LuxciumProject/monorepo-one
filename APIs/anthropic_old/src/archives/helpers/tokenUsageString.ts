import { calculateTokenUsageFor } from './calculateTokenUsageFor';

export function tokenUsageString(
  pricingService: (tokens: number, input?: boolean) => [number, string],
  tokens: number,
  input = true
): string {
  const [quantity, cost, price] = calculateTokenUsageFor(pricingService)(
    tokens,
    input
  );

  return price <= 1
    ? `for ${cost.toFixed(2)}$ you can use ${quantity.toFixed()}× the same amout of tokens (${tokens.toFixed()}Tok)`
    : `You can use ${tokens.toFixed()} tokens for ${price.toFixed(2)}$`;
}
