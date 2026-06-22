import { isArr } from './isArr';

/**
 * Detects the `[TVal[]]` shape:
 *   - outer length === 1
 *   - sole element is itself an array
 *   - every element of that inner array satisfies `isVal` (when supplied)
 */
export function isWrappedShape<TVal>(
  v: unknown[],
  isVal?: (x: unknown) => x is TVal
): v is [TVal[]] {
  if (v.length !== 1 || !isArr(v[0])) return false;
  return isVal ? (v[0] as unknown[]).every(isVal) : true;
}
