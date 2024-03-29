import { PRICES } from '../PRICES';
import { ModelPrice, Models } from '../types';

// function transformModelName(modelName: string): string {
//   // Regex to match models with dates and normalize versions
//   const datePattern = /-\d{8}$/;
//   const versionPattern = /\b2\.([01])\b/;
//   // Remove date suffix if present
//   let transformedName = modelName.replace(datePattern, '');
//   // Normalize version numbers, e.g., "2.1" to "21"
//   transformedName = transformedName.replace(
//     versionPattern,
//     (_match, p1) => `2${p1}`
//   );
//   return transformedName;
// }
// export function calculatePrice(modelName: string): ModelPrice {
//   const transformedName = transformModelName(modelName);
//   switch (transformedName) {
//     case 'claude-3-opus':
//       return PRICES.claude3.opus;
//     case 'claude-3-sonnet':
//       return PRICES.claude3.sonnet;
//     case 'claude-3-haiku':
//       return PRICES.claude3.haiku;
//     case 'claude-21':
//       return PRICES.claude21;
//     case 'claude-20':
//       return PRICES.claude20;
//     case 'claude-instant':
//       return PRICES.claudeInstant;
//     default:
//       return PRICES.ERROR;
//   }
// }
// create an helper function that would take a model name and a in/out flag and return the price for the given model.
// export interface ModelPrice {
//   input: number;
//   output: number;
// }
// export const MTOK = 1_000_000;
// export const PRICES = {
//   claude3: {
//     haiku: {
//       input: 0.25,
//       output: 1.25,
//     } as ModelPrice,
//     sonnet: {
//       input: 3,
//       output: 15,
//     } as ModelPrice,
//     opus: {
//       input: 15,
//       output: 75,
//     } as ModelPrice,
//   },
//   claude21: {
//     input: 8,
//     output: 24,
//   } as ModelPrice,
//   claude20: {
//     input: 8,
//     output: 24,
//   } as ModelPrice,
//   claudeInstant: {
//     input: 0.8,
//     output: 2.4,
//   } as ModelPrice,
//   ERROR: {
//     input: NaN,
//     output: NaN,
//   } as ModelPrice,
//   MTOK,
// };
// console.log(getModelPrice('claude-3-opus-20240229'));

export function getModelPrice(modelName: Models): ModelPrice {
  // if it starts with claude-3
  if (modelName.startsWith('claude-3')) {
    const model = modelName.split('-').slice(0, 3).join('-');
    console.log('modelName starts with claude-3; model:', model);
    // if it ends with opus
    if (model.endsWith('opus')) {
      return PRICES.claude3.opus;
    }
    // if it ends with sonnet
    if (model.endsWith('sonnet')) {
      return PRICES.claude3.sonnet;
    }
    // if it ends with haiku
    if (model.endsWith('haiku')) {
      return PRICES.claude3.haiku;
    }
  }

  if (modelName.startsWith('claude')) {
    const model = modelName.split('-').slice(0, 1).join('-');
    console.log('modelName starts with claude; model:', model);

    if (model.endsWith('1')) {
      return PRICES.claude21;
    }
    if (model.endsWith('0')) {
      return PRICES.claude20;
    }
    if (model.endsWith('instant')) {
      return PRICES.claudeInstant;
    }
  }
  return PRICES.ERROR;
}
