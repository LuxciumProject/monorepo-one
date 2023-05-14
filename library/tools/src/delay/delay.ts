/**
 * A delay function that introduces a delay in your code execution.
 * It uses `setTimeout` to introduce the delay and resolves a promise after the delay.
 *
 * @remarks
 *
 * This function uses the JavaScript `performance.now()` method to
 * calculate the actual delay, and it returns the chosen delay and the
 * actual delay.
 *
 * It can be useful in simulating network delays or testing how your
 * code handles latency.
 *
 * ```typescript
 * import { delay } from './yourFilePath';
 *
 * @example
 * Here's an example of how to use this function:
 *
 * async function exampleFunction() {
 *   const [chosenDelay, actualDelay, actualDelay_0] = await delay(1000, 2000);
 *   console.log(`Chosen delay: ${chosenDelay}`);
 *   console.log(`Actual delay: ${actualDelay}`);
 *   console.log(`Actual delay_0: ${actualDelay_0}`);
 * }
 *
 * exampleFunction();
 * ```
 *
 *  @param lowerBound - The lower bound of the delay in milliseconds.
 *  If only one argument is provided, this value is used for both the
 *  lower and upper bound.
 *  The default value is 500. This value is always positive and is the
 *  smaller of the two bounds.
 *  @param upperBound - The upper bound of the delay in milliseconds.
 *  If only one argument is provided, this value is the same as the
 *  lower bound.
 *  The default value is the same as the lowerBound parameter. This
 *  value is always positive and is the larger of the two bounds.
 *
 *  @returns A Promise that resolves to a tuple. The first element of
 *  the tuple is the chosen delay.
 *  The second element is the actual delay calculated from the initial
 *  time to the time after the delay.
 *  The third element is the actual delay calculated from the initial
 *  time_0 to the time after the delay.
 */
export async function delay(
  lowerBound: number = 500,
  upperBound: number = lowerBound
): Promise<[number, number, number]> {
  const initialTime_0 = performance.now();

  // Make sure both values are positive
  lowerBound = Math.abs(lowerBound);
  upperBound = Math.abs(upperBound);

  // Ensure lowerBound is the smallest number and upperBound is the largest
  if (lowerBound > upperBound) {
    [lowerBound, upperBound] = [upperBound, lowerBound];
  }

  // Get the initial time
  const initialTime = performance.now();

  // Calculate random delay within bounds and wait for it in an IIFE
  const chosenDelay = await (async () => {
    const delay =
      Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
    return new Promise<number>(resolve =>
      setTimeout(() => resolve(delay), delay)
    );
  })();

  // Return the chosen delay and the actual delay
  return [
    chosenDelay,
    Math.round((performance.now() - initialTime) * 1_000_000) / 1_000_000,
    Math.round((performance.now() - initialTime_0) * 1_000_000) / 1_000_000,
  ];
}
