import { isQueryResultItem } from './isQueryResultItem';

describe('isQueryResultItem', () => {
  it('should return true for a valid QueryResultItem', () => {
    const validItem = ['id1', 42, 'value1'];
    expect(isQueryResultItem(validItem)).toBe(true);
  });

  it('should return false for an array with invalid types', () => {
    const invalidItem = ['id1', 'notANumber', 'value1'];
    expect(isQueryResultItem(invalidItem)).toBe(false);
  });

  it('should return false for an array with incorrect length', () => {
    const invalidItem = ['id1', 42];
    expect(isQueryResultItem(invalidItem)).toBe(false);
  });

  it('should return false for a non-array input', () => {
    const notAnArray = { key: 'value' };
    expect(isQueryResultItem(notAnArray)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isQueryResultItem(null)).toBe(false);
    expect(isQueryResultItem(undefined)).toBe(false);
  });
});
