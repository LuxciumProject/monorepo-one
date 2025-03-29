import { arrayGenerator } from '../../../src/core/arrayGenerator';

describe('arrayGenerator', () => {
  describe('Iteration Behavior', () => {
    it('yields each item with its index and original array', () => {
      const input = ['a', 'b', 'c'];
      const gen = arrayGenerator(input);
      const results: Array<[string, number, string[]]> = [];

      for (const result of gen) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      results.forEach(([item, index, array], i) => {
        expect(item).toBe(input[i]);
        expect(index).toBe(i);
        expect(array).toBe(input);
      });
    });

    it('handles empty arrays', () => {
      const input: number[] = [];
      const gen = arrayGenerator(input);
      const results = Array.from(gen);

      expect(results).toHaveLength(0);
    });

    it('handles arrays with undefined/null values', () => {
      const input = [undefined, null, 'test'] as const;
      const results: Array<[(typeof input)[number], number, typeof input]> = [];

      for (const result of arrayGenerator(input)) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      expect(results[0][0]).toBeUndefined();
      expect(results[1][0]).toBeNull();
      expect(results[2][0]).toBe('test');
    });
  });

  describe('Array Reference', () => {
    it('maintains reference to original array', () => {
      const input = [1, 2, 3];
      const gen = arrayGenerator(input);
      let arrayRef: number[] | undefined;

      for (const [, , arr] of gen) {
        if (!arrayRef) arrayRef = arr;
        expect(arr).toBe(input);
        expect(arr).toBe(arrayRef);
      }
    });

    it('reflects changes to original array during iteration', () => {
      const input = [1, 2, 3];
      const gen = arrayGenerator(input);
      const results: Array<[number, number, number[]]> = [];

      // Get first item
      const first = gen.next();
      results.push(first.value);

      // Modify array
      input[1] = 20;

      // Continue iteration
      for (const result of gen) {
        results.push(result);
      }

      expect(results[1][0]).toBe(20);
      expect(results[1][2]).toBe(input);
      expect(results[1][2][1]).toBe(20);
    });
  });

  describe('Type Safety', () => {
    it('preserves type information', () => {
      interface TestItem {
        id: number;
        value: string;
      }

      const input: TestItem[] = [
        { id: 1, value: 'one' },
        { id: 2, value: 'two' },
      ];

      const gen = arrayGenerator(input);
      const results: Array<[TestItem, number, TestItem[]]> = [];

      for (const result of gen) {
        results.push(result);
        expect(typeof result[0].id).toBe('number');
        expect(typeof result[0].value).toBe('string');
      }

      expect(results).toHaveLength(2);
    });

    it('handles readonly arrays', () => {
      const input = [1, 2, 3] as const;
      const gen = arrayGenerator(input);
      const results: Array<[1 | 2 | 3, number, readonly [1, 2, 3]]> = [];

      for (const result of gen) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      expect(results[0][0]).toBe(1);
      expect(results[1][0]).toBe(2);
      expect(results[2][0]).toBe(3);
    });
  });

  describe('Iterator Protocol', () => {
    it('implements correct iterator protocol', () => {
      const input = [1, 2];
      const gen = arrayGenerator(input);

      const first = gen.next();
      expect(first.done).toBe(false);
      expect(first.value[0]).toBe(1);

      const second = gen.next();
      expect(second.done).toBe(false);
      expect(second.value[0]).toBe(2);

      const third = gen.next();
      expect(third.done).toBe(true);
      expect(third.value).toBeUndefined();
    });

    it('allows early termination', () => {
      const input = [1, 2, 3, 4, 5];
      const gen = arrayGenerator(input);
      const results: number[] = [];

      // Only consume first 3 items
      let count = 0;
      for (const [item] of gen) {
        results.push(item);
        count++;
        if (count === 3) break;
      }

      expect(results).toEqual([1, 2, 3]);
      expect(results).toHaveLength(3);
    });
  });
});
