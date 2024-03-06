import { swap } from './swap';

export function effectiveUpperBound(lowerBound: number, upperBound: number) {
  [lowerBound, upperBound] = swap([lowerBound, upperBound]);
  return upperBound;
}
