import { calculatePrice } from './calculatePrice';

export const calculatePriceForHaiku = (tokens: number, input = true) =>
  calculatePrice('haiku', tokens, input);
export const haikuInputPrice = (tokens: number) =>
  calculatePriceForHaiku(tokens, true);
export const haikuOutputPrice = (tokens: number) =>
  calculatePriceForHaiku(tokens, false);

export const calculatePriceForSonnet = (tokens: number, input = true) =>
  calculatePrice('sonnet', tokens, input);
export const sonnetInputPrice = (tokens: number) =>
  calculatePriceForSonnet(tokens, true);
export const sonnetOutputPrice = (tokens: number) =>
  calculatePriceForSonnet(tokens, false);

export const calculatePriceForOpus = (tokens: number, input = true) =>
  calculatePrice('opus', tokens, input);
export const opusInputPrice = (tokens: number) =>
  calculatePriceForOpus(tokens, true);
export const opusOutputPrice = (tokens: number) =>
  calculatePriceForOpus(tokens, false);
