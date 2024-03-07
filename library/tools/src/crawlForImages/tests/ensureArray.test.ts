// ensureArray.test.ts
import { ensureArray } from '..';

describe('ensureArray', () => {
  test('should wrap non-array values in an array', () => {
    const result = ensureArray('test');
    expect(result).toEqual(['test']);
  });

  test('should return the array as is if input is already an array', () => {
    const array = ['test'];
    const result = ensureArray(array);
    expect(result).toBe(array);
  });
});
