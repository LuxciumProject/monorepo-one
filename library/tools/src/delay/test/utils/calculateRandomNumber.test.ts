import { calculateRandomNumber } from '../../utils';

describe.each([0, 0.5, 0.999])('calculateRandomNumber', randomValue => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(randomValue);
  });

  const bound = 100;

  it('returns the lower bound when lower bound and upper bound are equal', () => {
    const lowerBound = bound * 1;
    const upperBound = bound * 1;

    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).not.toBeGreaterThanOrEqual(lowerBound + 1);
    expect(result).toBe(lowerBound);
    expect(result).toBe(upperBound);
    expect(result).not.toBeLessThanOrEqual(upperBound - 1);
  });

  it('returns a random number within the specified bounds', () => {
    const lowerBound = bound * 10;
    const upperBound = bound * 200;

    const effectiveLowerBound = 0;
    const effectiveUpperBound = 0;

    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).not.toBeGreaterThanOrEqual(bound * 10 + 1);
    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
  });

  it('returns a random number within the specified bounds when lower bound is greater than upper bound', () => {
    const lowerBound = bound * 200;
    const upperBound = bound * 10;

    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
  });

  it('returns a random number within the specified bounds when lower bound is negative', () => {
    const lowerBound = bound * -200;
    const upperBound = bound * 10;

    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
  });

  it('returns a random number within the specified bounds when upper bound is negative', () => {
    const lowerBound = bound * 10;
    const upperBound = bound * -200;

    const result = calculateRandomNumber(lowerBound, upperBound);

    // expect(result).toBeGreaterThanOrEqual(bound * 10 - 1);
    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
    // expect(result).not.toBeLessThanOrEqual(bound * 200 + 1);
  });

  it('returns a random number within the specified bounds when both lower bound and upper bound are negative', () => {
    const lowerBound = bound * -10;
    const upperBound = bound * -200;
    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
  });

  it('returns a random number within the specified bounds when both lower bound and upper bound are negative', () => {
    const lowerBound = bound * -200;
    const upperBound = bound * -10;
    const result = calculateRandomNumber(lowerBound, upperBound);

    expect(result).toBeGreaterThanOrEqual(bound * 10);
    expect(result).toBeLessThanOrEqual(bound * 200);
  });
  afterEach(() => {
    (global.Math.random as jest.Mock).mockRestore();
  });
});
