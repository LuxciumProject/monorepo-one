import { PRICES } from './PRICES';
import { Model3, ModelPrice, Usage } from './types';

// {
//   haiku: { inputRate: 15, outputRate: 75 },
//   sonnet: { inputRate: 10, outputRate: 50 },
//   opus: { inputRate: 20, outputRate: 80 },
// };

export const PRICES_CLAUDE_3: Record<Model3, ModelPrice> = PRICES.claude3;

export function calculateClaude3Cost(usage: Usage, model: Model3): number {
  const prices = PRICES_CLAUDE_3[model];

  if (!prices) {
    throw new Error(`Invalid model: ${model}`);
  }

  const inputMegatokens = usage.input_tokens / 1000000;
  const outputMegatokens = usage.output_tokens / 1000000;

  const inputCost = inputMegatokens * prices.inputRate;
  const outputCost = outputMegatokens * prices.outputRate;

  return inputCost + outputCost;
}
