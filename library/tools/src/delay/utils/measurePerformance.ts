import type { PerformanceResult, PerformanceResultTupple } from '../types';
import { timeStamp } from './timeStamp';

/**
 * Helper function to measure performance of a function
 * @param fn - Function whose performance is to be measured
 * @returns PerformanceResult containing the function's return value and execution time
 */

export async function measurePerformance<N = number>(
  fn: () => Promise<N>
): Promise<PerformanceResult<N>>;
export async function measurePerformance<N = number>(
  fn: () => Promise<N>,
  tupple: false
): Promise<PerformanceResult<N>>;
export async function measurePerformance<N = number>(
  fn: () => Promise<N>,
  tupple: true
): Promise<PerformanceResultTupple<N>>;
export async function measurePerformance<N = number>(
  fn: () => Promise<N>,
  tupple: boolean
): Promise<PerformanceResult<N> | PerformanceResultTupple<N>>;
export async function measurePerformance<N = number>(
  fn: () => Promise<N>,
  tupple = false
): Promise<PerformanceResult<N> | PerformanceResultTupple<N>> {
  const initialTime = performance.now();
  const value = await fn();
  const timeElapsed = timeStamp(performance.now() - initialTime);

  const totalTimeElapsed = timeStamp(performance.now() - initialTime);
  if (tupple) {
    return [value, timeElapsed, totalTimeElapsed, initialTime];
  }
  return {
    value,
    timeElapsed,
    totalTimeElapsed,
    initialTime,
  };
}
