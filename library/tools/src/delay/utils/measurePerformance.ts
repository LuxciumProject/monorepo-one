import type { PerformanceResult, PerformanceResultTupple } from '../types';
import { timeStamp } from './timeStamp';

/**
 * Measures the performance of a given asynchronous function.
 * @param fn The function to measure the performance of.
 * @returns A promise that resolves to a {@link PerformanceResult} object.
 */
export async function measurePerformance<N = number>(
  fn: () => N | Promise<N>
): Promise<PerformanceResult<N>>;
/**
 * Measures the performance of a given asynchronous function.
 * @remarks This overload returns a PerformanceResultTupple tuple.
 * @param fn The function to measure the performance of.
 * @param tupple When set to false will return the result as a {@link PerformanceResult} object.
 * @returns A promise that resolves to {@link PerformanceResult} object.
 */
export async function measurePerformance<N = number>(
  fn: () => N | Promise<N>,
  tupple: false
): Promise<PerformanceResult<N>>;
/**
 * Measures the performance of a given asynchronous function.
 * @remarks This overload returns a PerformanceResultTupple tuple.
 * @param fn The function to measure the performance of.
 * @param tupple When set to true will return the result as a {@link PerformanceResultTupple} tuple.
 * @returns A promise that resolves to {@link PerformanceResultTupple} tuple.
 */
export async function measurePerformance<N = number>(
  fn: () => N | Promise<N>,
  tupple: true
): Promise<PerformanceResultTupple<N>>;
/**
 * Measures the performance of a given asynchronous function.
 * @remarks This overload returns a PerformanceResultTupple tuple.
 * @param fn The function to measure the performance of.
 * @param tupple Determines if the result should be returned as a {@link PerformanceResultTupple} tuple or a {@link PerformanceResult} object.
 * @returns A promise that resolves to a {@link PerformanceResult} object or a {@link PerformanceResultTupple} tuple.
 */
export async function measurePerformance<N = number>(
  fn: () => N | Promise<N>,
  tupple: boolean
): Promise<PerformanceResult<N> | PerformanceResultTupple<N>>;
/**
 * Measures the performance of a given asynchronous function.
 * @param fn The function to measure the performance of.
 * @param tupple Determines if the result should be returned as a {@link PerformanceResultTupple} tuple or a {@link PerformanceResult} object.
 * @returns A promise that resolves to a {@link PerformanceResult} object or a {@link PerformanceResultTupple} tuple.
 */
export async function measurePerformance<N = number>(
  fn: () => N | Promise<N>,
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
