import { swap } from './swap';

/**
 * Function to calculate a random number within bounds
 * @param lowerBound - Lower limit for the random number
 * @param upperBound - Upper limit for the random number
 * @returns Random number within the specified bounds
 */
const { abs } = Math;
export function calculateRandomNumber(
  lowerBound: number,
  upperBound: number
): number {
  lowerBound = abs(lowerBound);
  upperBound = abs(upperBound);

  // If bounds are equal, return the value
  if (lowerBound === upperBound) {
    return lowerBound;
  }
  // Swap bounds if necessary to ensure lowerBound <= upperBound
  [lowerBound, upperBound] = swap([lowerBound, upperBound]);

  // Generate and return a random number within the specified bounds
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
