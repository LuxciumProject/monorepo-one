import { delay } from '../delay';
import type { PerformanceResult } from '../types';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('generates a random delay within specified bounds', async () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const delayPromise: Promise<PerformanceResult> = delay(
      lowerBound,
      upperBound
    );

    // Resolve the delay promise by advancing timers
    jest.advanceTimersByTime(upperBound);

    const chosenDelay = await delayPromise;

    expect(chosenDelay.timeElapsed).toBeGreaterThanOrEqual(lowerBound);
    expect(chosenDelay.timeElapsed).toBeLessThanOrEqual(upperBound);
  });
  it('generates a random delay within default value (unspecified values using default) bounds', async () => {
    const lowerBound = 500;
    const upperBound = 500;

    const delayPromise = delay();

    // Resolve the delay promise by advancing timers
    jest.advanceTimersByTime(upperBound);

    const chosenDelay = await delayPromise;

    expect(chosenDelay.timeElapsed).toBeGreaterThanOrEqual(lowerBound);
    expect(chosenDelay.timeElapsed).toBeLessThanOrEqual(upperBound);
  });

  it('handles lowerBound greater than upperBound', async () => {
    const lowerBound = 2000;
    const upperBound = 1000;

    const delayPromise = delay(lowerBound, upperBound);

    // Resolve the delay promise by advancing timers
    jest.advanceTimersByTime(lowerBound);

    const chosenDelay = await delayPromise;

    expect(chosenDelay.timeElapsed).toBeGreaterThanOrEqual(upperBound);
    expect(chosenDelay.timeElapsed).toBeLessThanOrEqual(lowerBound);
  });
  it('handles single argument as lowerBound and upperBound', async () => {
    const bound = 1500;

    const delayPromise = delay(bound);

    // Resolve the delay promise by advancing timers
    jest.advanceTimersByTime(bound);

    const chosenDelay = await delayPromise;

    expect(chosenDelay.timeElapsed).toBeGreaterThanOrEqual(bound);
    expect(chosenDelay.timeElapsed).toBeLessThanOrEqual(bound);
  });
});
