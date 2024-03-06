import type { TaskValue } from './types/TaskValue';
import { calculateRandomNumber, measurePerformance } from './utils';

/**
 * Function to execute a heavy CPU-bound task and measure its performance
 * @param lowerBound - Lower limit for the task's complexity
 * @param upperBound - Upper limit for the task's complexity
 * @param timeLimit - Maximum execution time in milliseconds
 * @returns PerformanceResult containing the computed result and execution time
 */

export async function heavyTaskSpecial(
  lowerBound = 50,
  upperBound: number = lowerBound,
  timeLimit: number | `${number}` = '1000'
): Promise<TaskValue> {
  return measurePerformance<{
    steps: number;
    result: number;
  }>(async () => {
    if (0 === lowerBound && 0 === upperBound) {
      return Promise.resolve({ steps: Number.NaN, result: Number.NaN });
    }
    const steps = calculateRandomNumber(lowerBound, upperBound);
    let i = 0;
    let result = 0;
    let p = 0;
    let elapsedTime = 0;
    const startTime = performance.now(); // Get current time at the start of the loop
    for (; i < steps * 1_000_000; i++) {
      const stringRepresentation = '1'.repeat(i);
      const isPrime = !/^1?$|^(11+?)\1+$/.test(stringRepresentation);
      if (isPrime) {
        result += i;
        p++;
      }
      elapsedTime = performance.now() - startTime; // Calculate the elapsed time
      if (elapsedTime > Number(timeLimit)) {
        // Check if the elapsed time exceeds the time limit
        break; // If it does, break out of the loop
      }
    }
    const resolve = { steps, i, result, p, elapsedTime };
    return Promise.resolve(resolve);
  });
}
