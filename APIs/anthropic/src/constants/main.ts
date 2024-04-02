import { calculateClaude3Cost } from './calculateClaude3Cost';
import { Usage } from './types/Usage';

// Usage
const usage: Usage & { toString(): string } = {
  output_tokens: 47,
  input_tokens: 10905,
};
const tokenUsage = {
  ...usage,
  toString() {
    return `${this.output_tokens} output tokens, ${this.input_tokens} input tokens`;
  },
};
console.log(
  `The cost for ${tokenUsage} with the ${'opus'} model is $${calculateClaude3Cost(tokenUsage, 'opus').toFixed(4)}`
);
console.log(
  `The cost for ${tokenUsage} with the ${'sonnet'} model is $${calculateClaude3Cost(tokenUsage, 'sonnet').toFixed(4)}`
);
console.log(
  `The cost for ${tokenUsage} with the ${'haiku'} model is $${calculateClaude3Cost(tokenUsage, 'haiku').toFixed(4)}`
);
