import { calculateTokenUsageFor } from './calculateTokenUsageFor';

export function tokenUsageString(
  pricingService: (tokens: number, input?: boolean) => number,
  tokens: number,
  input = true
) {
  const [quantity, cost, price] = calculateTokenUsageFor(pricingService)(
    tokens,
    input
  );

  return price <= 1
    ? `You can use ${quantity.toFixed()}× this amout of tokens for ${cost.toFixed(2)}$`
    : `You can use ${tokens.toFixed()} tokens for ${price.toFixed(2)}$`;
}
