import { calculatePrice } from './calculatePrice';

export const calculatePriceForHaiku = (tokens: number, input = true) =>
  calculatePrice('haiku', tokens, 'claude-3-haiku-20240307', input);
export const haikuInputPrice = (tokens: number) =>
  calculatePriceForHaiku(tokens, true);
export const haikuOutputPrice = (tokens: number) =>
  calculatePriceForHaiku(tokens, false);

export const calculatePriceForSonnet = (tokens: number, input = true) =>
  calculatePrice('sonnet', tokens, 'claude-3-sonnet-20240229', input);
export const sonnetInputPrice = (tokens: number) =>
  calculatePriceForSonnet(tokens, true);
export const sonnetOutputPrice = (tokens: number) =>
  calculatePriceForSonnet(tokens, false);

export const calculatePriceForOpus = (tokens: number, input = true) =>
  calculatePrice('opus', tokens, 'claude-3-opus-20240229', input);
export const opusInputPrice = (tokens: number) =>
  calculatePriceForOpus(tokens, true);
export const opusOutputPrice = (tokens: number) =>
  calculatePriceForOpus(tokens, false);

// | 'claude-3-opus-20240229'
// | 'claude-3-sonnet-20240229'
// | 'claude-3-haiku-20240307'
// | "claude-2.1'"
// | 'claude-2.0'
// | 'claude-instant-1.2';
