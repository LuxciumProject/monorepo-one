import { calculatePrice } from './calculatePrice';
import { opusOutputPrice } from './calculatePriceForModel';
import { tokenUsageString } from './tokenUsageString';

// Example usage:
const tokenUsageForHaiku = tokenUsageString(opusOutputPrice, 900000);
console.log(tokenUsageForHaiku);
// Example usage:
const priceForHaiku = calculatePrice('haiku', 1000);
console.log(priceForHaiku);
