/**
 * Function to simulate a delay and measure its performance
 * @param lowerBound - Lower limit for the delay
 * @param upperBound - Upper limit for the delay
 * @returns PerformanceResult containing the chosen delay and execution time
 */

export async function delay(
  lowerBound: number = 500,
  upperBound: number = lowerBound
): Promise<DelayValue> {
  return measurePerformance(async (): Promise<number> => {
    if (lowerBound === 0 && upperBound === 0) {
      return Promise.resolve(NaN);
    }
    const chosenDelay = calculateRandomNumber(lowerBound, upperBound);
    return new Promise(resolve => setTimeout(resolve, chosenDelay));
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
  }>(() => {
    if (lowerBound === 0 && upperBound === 0) {
      return Promise.resolve({ steps: NaN, result: NaN });
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
  return Math.round(timeElapsed * 1000000) / 1000000;
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
};
export type TaskValue = PerformanceResult<TaskStepsResult>;
