/**
 * Function to simulate a delay and measure its performance
 * @param lowerBound - Lower limit for the delay
 * @param upperBound - Upper limit for the delay
 * @returns PerformanceResult containing the chosen delay and execution time
 */

export async function delay(
  lowerBound = 500,
  upperBound: number = lowerBound
): Promise<DelayValue> {
  return measurePerformance(async (): Promise<number> => {
    if (0 === lowerBound && 0 === upperBound) {
      return Promise.resolve(Number.NaN);
    }
    const chosenDelay = calculateRandomNumber(lowerBound, upperBound);
    return new Promise(resolve => setTimeout(resolve, chosenDelay));
  });
}

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
  timeLimit: number | `${number}` = '1000' // Default time limit is 1000 ms
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
    for (; i < steps * 1e6; i++) {
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
    for (let i = 0; i < steps * 1e6; i++) {
      result += i;
    }
    return Promise.resolve({ steps, result });
  });
}
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

export function timeStamp(timeElapsed: number) {
  return Math.round(timeElapsed * 1_000_000) / 1_000_000;
}

// export type PerformanceResult<N> = Promise<IPerformanceResult<N>>;

export interface PerformanceResult<N = number> {
  value: N;
  timeElapsed: number;
  totalTimeElapsed: number;
  initialTime: number;
}

export type DelayValue = PerformanceResult;

export type TaskStepsResult = {
  steps: number;
  result: number;
  i?: number;
  p?: number;
};
export type TaskValue = PerformanceResult<TaskStepsResult>;
