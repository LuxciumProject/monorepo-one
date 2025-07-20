import { isQueryResult } from './isQueryResult';

describe('isQueryResult', () => {
  it('should return true for a valid QueryResult', () => {
    const validQueryResult = [
      ['id1', 42, 'value1'],
      ['id2', 24, 'value2'],
    ];
    expect(isQueryResult(validQueryResult)).toBe(true);
  });

  it('should return false for an array with invalid inner arrays', () => {
    const invalidQueryResult = [
      ['id1', 'notANumber', 'value1'],
      ['id2', 24],
    ];
    expect(isQueryResult(invalidQueryResult)).toBe(false);
  });

  it('should return false for a non-array input', () => {
    const notAnArray = { key: 'value' };
    expect(isQueryResult(notAnArray)).toBe(false);
  });

  it('should return false for an empty array', () => {
    const emptyArray: unknown[] = [];
    expect(isQueryResult(emptyArray)).toBe(false);
  });

  it('should return false for an array with non-array elements', () => {
    const mixedArray = [['id1', 42, 'value1'], 'notAnArray'];
    expect(isQueryResult(mixedArray)).toBe(false);
  });
});
