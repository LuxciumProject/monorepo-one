import { range } from '..';

describe('range function', () => {
  describe('range', () => {
    it('returns an array of length 6 when start is 20, end is 40 with steps of 4', () => {
      const rangeVals = range(20, 40, 4);
      expect(rangeVals).toEqual([20, 24, 28, 32, 36, 40]);
      expect(rangeVals.length).toBe(6);
      // similarly:
      expect(range(200, 400, 40)).toEqual([200, 240, 280, 320, 360, 400]);
    });
    it('returns an array of length 1 when start and end are the same', () => {
      expect(range(3, 3, 1)).toEqual([3]);
    });
    it('returns an array containing either start or end when start and end are equal and the step size is not 0', () => {
      expect(range(2, 2, 1)).toEqual([2]);
    });
    it('returns an array containing either start or end when start and end are equal and the step size is not 0', () => {
      expect(range(0, 0, 1)).toEqual([0]);
    });
    it('returns an array with both start and end when the step size is greater than the difference between them', () => {
      expect(range(1, 3, 5)).toEqual([1, 3]);
    });
    it('returns an array with both start and end when the step size is greater than the difference between them', () => {
      expect(range(1, 3, -5)).toEqual([3, 1]);
    });
    it('returns increasing range when given start smaller than end and step increment is positive', () => {
      expect(range(1, 5, 1)).toEqual([1, 2, 3, 4, 5]);
    });
    it('returns decreasing range when given start higher than end, and step increment is positive', () => {
      expect(range(5, 1, 1)).toEqual([5, 4, 3, 2, 1]);
    });
    it('returns increasing range when given start smaller than end and step increment is negative', () => {
      expect(range(1, 5, -1)).toEqual([5, 4, 3, 2, 1]);
    });
    it('returns decreasing range when given start higher than end, and step increment is negative', () => {
      expect(range(5, 1, -1)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('base cases', () => {
    it('returns an array of length 1 when start and end are the same', () => {
      expect(range(1, 1, 1)).toEqual([1]);
    });
    it('returns an array with both start and end when the step size is greater than the difference between them', () => {
      expect(range(1, 3, 5)).toEqual([1, 3]);
    });
  });

  describe('edge cases', () => {
    it('returns an empty array when given non-finite values', () => {
      expect(range(Number.POSITIVE_INFINITY, 5, 1)).toEqual([]);
      expect(range(5, Number.POSITIVE_INFINITY, 1)).toEqual([]);
      expect(range(5, 1, Number.POSITIVE_INFINITY)).toEqual([]);
    });
    it('returns an empty array when given NaN values', () => {
      expect(range(Number.NaN, 5, 1)).toEqual([]);
      expect(range(5, Number.NaN, 1)).toEqual([]);
      expect(range(5, 1, Number.NaN)).toEqual([]);
    });
    it('returns an empty array when the step size is 0', () => {
      expect(range(1, 5, 0)).toEqual([]);
      expect(range(1, 1, 0)).toEqual([]);
      expect(range(0, 0, 0)).toEqual([]);
    });
    it('have unspecified behaviour on float number', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
      expect(range(0.5, 2, 0.5)).toEqual([0.5, 1, 1.5, 2]);
    });
    it('have unspecified behaviour on float number', () => {
      expect(range(0, 59, 10)).toEqual([0, 10, 20, 30, 40, 50]);
      expect(range(0, 59.9, 10)).toEqual([0, 10, 20, 30, 40, 50]);
    });
    it('have unspecified behaviour on float number', () => {
      expect(range(0, 59, 10)).toEqual([0, 10, 20, 30, 40, 50]);
      expect(range(0.5, 60.4, 10)).toEqual([0.5, 10.5, 20.5, 30.5, 40.5, 50.5]);
    });
  });
});
