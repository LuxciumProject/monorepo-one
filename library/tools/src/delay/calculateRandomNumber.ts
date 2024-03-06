/**
 * Function to calculate a random number within bounds
 * @param lowerBound - Lower limit for the random number
 * @param upperBound - Upper limit for the random number
 * @returns Random number within the specified bounds
 */

export function calculateRandomNumber(
  lowerBound: number,
  upperBound: number
): number {
  lowerBound = Math.abs(lowerBound);
  upperBound = Math.abs(upperBound);

  if (lowerBound > upperBound) {
    [lowerBound, upperBound] = [upperBound, lowerBound];
  }

  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
