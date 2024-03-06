import { timeStamp } from './timeStamp';
import type { PerformanceResult } from './types/PerformanceResult';

/**
 * Helper function to measure performance of a function
 * @param fn - Function whose performance is to be measured
 * @returns PerformanceResult containing the function's return value and execution time
 */

export async function measurePerformance<N = number>(
  fn: () => Promise<N>
): Promise<PerformanceResult<N>> {
  const initialTime = performance.now();
  const result = await fn();
  const timeElapsed = performance.now() - initialTime;

  return {
    value: result,
    timeElapsed: timeStamp(timeElapsed),
    totalTimeElapsed: timeStamp(performance.now() - initialTime),
    initialTime: initialTime,
  };
}
