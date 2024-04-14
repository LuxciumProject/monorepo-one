import { areEqualBounds } from './areEqualBounds';

describe('areEqualBounds', () => {
  it('returns true when lowerBound and upperBound are equal', () => {
    const lowerBound = 100;
    const upperBound = 100;

    const result = areEqualBounds(lowerBound, upperBound);

    expect(result).toBe(true);
  });

  it('returns false when lowerBound and upperBound are not equal', () => {
    const lowerBound = 100;
    const upperBound = 200;

    const result = areEqualBounds(lowerBound, upperBound);

    expect(result).toBe(false);
  });
});
