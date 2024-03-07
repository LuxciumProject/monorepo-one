import { swap } from './swap';

export function effectiveLowerBound(lowerBound: number, upperBound: number) {
  [lowerBound, upperBound] = swap([lowerBound, upperBound]);
  return lowerBound;
}
