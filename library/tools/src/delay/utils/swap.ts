export function swap([lowerBound, upperBound]: [number, number]) {
  if (lowerBound > upperBound) {
    [lowerBound, upperBound] = [upperBound, lowerBound];
  }
  return [lowerBound, upperBound];
}
