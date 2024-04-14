import { areEqualBounds } from './areEqualBounds';
import { calculateRandomNumber } from './calculateRandomNumber';
import { effectiveLowerBound } from './effectiveLowerBound';
import { effectiveUpperBound } from './effectiveUpperBound';
import { measurePerformance } from './measurePerformance';
import { swap } from './swap';
import { timeStamp } from './timeStamp';

areEqualBounds;
calculateRandomNumber;
effectiveLowerBound;
effectiveUpperBound;
measurePerformance;
swap;
timeStamp;
// will describe and test each function in the utils folder as you can see above one at a time :

describe('areEqualBounds', () => {
  it('returns true when both bounds are equal', () => {
    const lowerBound = 1000;
    const upperBound = 1000;

    const result = areEqualBounds(lowerBound, upperBound);

    expect(result).toBe(true);
  });

  it('returns false when both bounds are not equal', () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const result = areEqualBounds(lowerBound, upperBound);

    expect(result).toBe(false);
  });
});
describe('calculateRandomNumber', () => {
  it('returns a random number within the specified bounds', () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).toBeGreaterThanOrEqual(lowerBound);
    expect(result).toBeLessThanOrEqual(upperBound);
  });
});
describe('effectiveLowerBound', () => {
  it('returns the lower bound when lower bound is less than upper bound', () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const result = effectiveLowerBound(lowerBound, upperBound);

    expect(result).toBe(lowerBound);
  });

  it('returns the upper bound when lower bound is greater than upper bound', () => {
    const lowerBound = 2000;
    const upperBound = 1000;

    const result = effectiveLowerBound(lowerBound, upperBound);

    expect(result).toBe(upperBound);
  });

  it('returns the lower bound when lower bound is equal to upper bound', () => {
    const lowerBound = 1500;
    const upperBound = 1500;

    const result = effectiveLowerBound(lowerBound, upperBound);

    expect(result).toBe(lowerBound);
  });
});
describe('effectiveUpperBound', () => {
  it('returns the upper bound when lower bound is less than upper bound', () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const result = effectiveUpperBound(lowerBound, upperBound);

    expect(result).toBe(upperBound);
  });

  it('returns the lower bound when lower bound is greater than upper bound', () => {
    const lowerBound = 2000;
    const upperBound = 1000;

    const result = effectiveUpperBound(lowerBound, upperBound);

    expect(result).toBe(lowerBound);
  });

  it('returns the upper bound when lower bound is equal to upper bound', () => {
    const lowerBound = 1500;
    const upperBound = 1500;

    const result = effectiveUpperBound(lowerBound, upperBound);

    expect(result).toBe(upperBound);
  });
});
describe('measurePerformance', () => {
  it('returns the time elapsed for the function to complete', async () => {
    const lowerBound = 1000;
    const upperBound = 2000;

    const result = await measurePerformance(async () => {
      const delay = calculateRandomNumber(lowerBound, upperBound);
      return new Promise(resolve => setTimeout(resolve, delay));
    });

    expect(result).toBeGreaterThanOrEqual(lowerBound);
    expect(result).toBeLessThanOrEqual(upperBound);
  });
});
describe('swap', () => {
  it('swaps the values of two variables', () => {
    const a = 1;
    const b = 2;

    swap([a, b]);

    expect(a).toBe(2);
    expect(b).toBe(1);
  });
});
describe('timeStamp', () => {
  it('returns the rounded time elapsed', () => {
    const timeElapsed = 1.234_567_89;
    const expected = 1.234_568;

    const result = timeStamp(timeElapsed);

    expect(result).toBe(expected);
  });
});
