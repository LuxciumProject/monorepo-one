import { normalize } from '../../helpers';

describe('normalize', () => {
  it('normalizes an array of numbers between 0 and 1', () => {
    const input = [10, 20, 30, 40, 50];
    const expectedOutput = [0, 0.25, 0.5, 0.75, 1];
    expect(normalize(input)).toEqual(expectedOutput);
  });

  it('handles negative numbers', () => {
    const input = [-10, 0, 10];
    const expectedOutput = [0, 0.5, 1];
    expect(normalize(input)).toEqual(expectedOutput);
  });

  it('handles duplicate numbers', () => {
    const input = [10, 10, 10];
    const expectedOutput = [0, 0, 0];
    expect(normalize(input)).toEqual(expectedOutput);
  });

  it('handles empty arrays', () => {
    const input: number[] = [];
    const expectedOutput: number[] = [];
    expect(normalize(input)).toEqual(expectedOutput);
  });
});
