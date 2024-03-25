import {
  haikuInputPrice,
  haikuOutputPrice,
  opusInputPrice,
  opusOutputPrice,
  sonnetInputPrice,
  sonnetOutputPrice,
} from './calculatePriceForModel';
import { calculateTokenUsageFor } from './calculateTokenUsageFor';
import { UsageReturn } from './types';

export const haikuInputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(haikuInputPrice);
export const haikuOutputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(haikuOutputPrice);
export const sonnetInputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(sonnetInputPrice);
export const sonnetOutputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(sonnetOutputPrice);
export const opusInputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(opusInputPrice);
export const opusOutputTokenUsage: (tokens: number) => UsageReturn =
  calculateTokenUsageFor(opusOutputPrice);
