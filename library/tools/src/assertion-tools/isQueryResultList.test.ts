import { isQueryResultList } from './isQueryResultList';

describe('isQueryResultList', () => {
  it('should return true for a valid QueryResultList', () => {
    const validList = [
      ['id1', 42, 'value1'],
      ['id2', 24, 'value2'],
    ];
    expect(isQueryResultList(validList)).toBe(true);
  });

  it('should return false for a list with invalid QueryResultItems', () => {
    const invalidList = [
      ['id1', 42, 'value1'],
      ['id2', 'notANumber', 'value2'],
    ];
    expect(isQueryResultList(invalidList)).toBe(false);
  });

  it('should return false for a non-array input', () => {
    const notAnArray = { key: 'value' };
    expect(isQueryResultList(notAnArray)).toBe(false);
  });

  it('should return false for an empty array', () => {
    const emptyArray: unknown[] = [];
    expect(isQueryResultList(emptyArray)).toBe(false);
  });

  it('should return false for an array with non-array elements', () => {
    const mixedArray = [['id1', 42, 'value1'], 'notAnArray'];
    expect(isQueryResultList(mixedArray)).toBe(false);
  });
});
