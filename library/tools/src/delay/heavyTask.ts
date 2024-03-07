import type { TaskValue } from './types/TaskValue';
import { calculateRandomNumber, measurePerformance } from './utils';

/**
 * Function to execute a heavy CPU-bound task and measure its performance
 * @param lowerBound - Lower limit for the task's complexity
 * @param upperBound - Upper limit for the task's complexity
 * @returns PerformanceResult containing the computed result and execution time
 */

export async function heavyTask(
  lowerBound = 50,
  upperBound: number = lowerBound
): Promise<TaskValue> {
  return measurePerformance<{
    steps: number;
    result: number;
  }>(async () => {
    if (0 === lowerBound && 0 === upperBound) {
      return Promise.resolve({ steps: Number.NaN, result: Number.NaN });
    }
    const steps = calculateRandomNumber(lowerBound, upperBound);
    let result = 0;
    for (let i = 0; i < steps * 1_000_000; i++) {
      result += i;
    }
    return Promise.resolve({ steps, result });
  });
}
