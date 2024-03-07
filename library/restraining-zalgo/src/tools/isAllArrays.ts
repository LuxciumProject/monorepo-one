import { isArray } from './isArray';

export function isAllArrays<T>(specimen: T[]) {
  return specimen.every(isArray);
}
