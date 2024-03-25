/*
GIVEN THOSE INFORMATIONS:

Claude 3 Pricing
MTok = million tokens. All Claude 3 models support vision and 200,000 token context windows.
Light & fast
Haiku
Input: $0.25 / MTok
Output: $1.25 / MTok
Hard-working
Sonnet
Input: $3 / MTok
Output: $15 / MTok
Powerful
Opus
Input: $15 / MTok
Output: $75 / MTok
COSTINTELLIGENCE
Legacy Model Pricing
Claude 2.1
200,000 token context window

Input: $8 / MTok
Output: $24 / MTok
Claude 2.0
100,000 token context window

Input: $8 / MTok
Output: $24 / MTok
Claude Instant
100,000 token context window

Input: $0.80 / MTok
Output: $2.40 / MTok

THE ESTIMATOR SHOULD DEFINE A CONSTANT TO ORGANIZE ALL PRICES:
 */

interface Model {
  input: number;
  output: number;
}

interface Pricing {
  [key: string]: Model | number;
}

type Estimator = {
  [key: string]: Pricing;
};

// the input (arguments) of the function is the estimator and the number of tokens should take a model as input and return the price for the given model.
/*
Model	Latest API model name
Claude 3 Opus	claude-3-opus-20240229
Claude 3 Sonnet	claude-3-sonnet-20240229
Claude 3 Haiku	claude-3-haiku-20240307

as you can see it would be required to create an helper function that would take claude-3-opus-20240229 and return Opus and infer claude-3-opus from it, the las part after claude-3-opus will change over time and we must be resilient to this kingd of changes in the future.
 */
function getModelName(model: `claude-${number}${string}`): any {
  // return the model name
  const modelName = model.split('-').slice(0, 2).join('-');
  return modelName;
}

// claude3
// haiku
// sonnet
// opus
// claude21
// claude20
// claudeinstant

// function getModelName(
//   model: `claude-${string}`
// ):   (| `claude-3-${`opus` | `sonnet` | `haiku`}`
//   | `claude-21`
//   | `claude-20`
//   | `claude-instant`) {
//   function calculateMultiplicator(estimator: Estimator, tokens: number): string {
//   let multiplicator = 1;
//   let price = 0;

//   for (const model in estimator) {
//     const pricing = estimator[model];

//     if (typeof pricing === 'number') {
//       price += pricing * tokens;
//     } else {
//       const { input } = pricing;
//       price += Number(input) * tokens;
//     }

//     if (price > 1) {
//       multiplicator = price / 1;
//       break;
//     }
//   }
//   }

//   const amount = Math.ceil(multiplicator * 100) / 100;
//   return `${amount}× - $${amount.toFixed(2)}`;
// }

const estimator: Estimator = {
  claude3: {
    haiku: {
      input: 0.25,
      output: 1.25,
    },
    sonnet: {
      input: 3,
      output: 15,
    },
    opus: {
      input: 15,
      output: 75,
    },
  },
  claude21: {
    input: 8,
    output: 24,
  },
  claude20: {
    input: 8,
    output: 24,
  },
  claudeinstant: {
    input: 0.8,
    output: 2.4,
  },
};

// const tokens = 500_000;
// const result = calculateMultiplicator(estimator, tokens);
// console.log(result);
