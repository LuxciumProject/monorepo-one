// Define a type for the performance result
interface IPerformanceResult<N = number> {
  value: N;
  timeElapsed: number;
  totalTimeElapsed: number;
}

/**
 * Helper function to measure performance of a function
 * @param fn - Function whose performance is to be measured
 * @returns PerformanceResult containing the function's return value and execution time
 */
export async function measurePerformance<N = number>(
  fn: () => Promise<N>
): Promise<IPerformanceResult<N>> {
  const initialTime = performance.now();
  const result = await fn();
  const timeElapsed = performance.now() - initialTime;

  return {
    value: result,
    timeElapsed: Math.round(timeElapsed * 1_000_000) / 1_000_000,
    totalTimeElapsed:
      Math.round((performance.now() - initialTime) * 1_000_000) / 1_000_000,
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

/**
 * Function to simulate a delay and measure its performance
 * @param lowerBound - Lower limit for the delay
 * @param upperBound - Upper limit for the delay
 * @returns PerformanceResult containing the chosen delay and execution time
 */
export async function delay(
  lowerBound = 500,
  upperBound: number = lowerBound
): Promise<IPerformanceResult<number>> {
  return measurePerformance<number>(async (): Promise<number> => {
    const chosenDelay = calculateRandomNumber(lowerBound, upperBound);

    await new Promise(resolve => setTimeout(resolve, chosenDelay));

    return chosenDelay;
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
): Promise<IPerformanceResult<number>> {
  return measurePerformance<number>((): Promise<number> => {
    const steps = calculateRandomNumber(lowerBound, upperBound);
    let result = 0;
    for (let i = 0; i < steps * 1e6; i++) {
      result += i;
    }
    return Promise.resolve(result);
  });
}
