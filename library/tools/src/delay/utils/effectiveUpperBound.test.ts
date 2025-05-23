import { effectiveUpperBound } from './effectiveUpperBound';

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

    expect(result).toBe(lowerBound); // Corrected this line
  });

  it('returns the upper bound when lower bound is equal to upper bound', () => {
    const lowerBound = 1500;
    const upperBound = 1500;

    const result = effectiveUpperBound(lowerBound, upperBound);

    expect(result).toBe(upperBound);
  });
});
