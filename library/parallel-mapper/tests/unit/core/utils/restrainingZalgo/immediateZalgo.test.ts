import { immediateZalgo } from '../../../../../../src/core/utils/restrainingZalgo/immediateZalgo';

describe('immediateZalgo', () => {
  describe('Basic Functionality', () => {
    it('returns a promise that resolves with the provided value', async () => {
      const value = 'test';
      const result = await immediateZalgo(value);
      expect(result).toBe(value);
    });

    it('maintains value types', async () => {
      const testCases = [
        { value: 42, type: 'number' },
        { value: 'string', type: 'string' },
        { value: true, type: 'boolean' },
        { value: { test: 'object' }, type: 'object' },
        { value: [1, 2, 3], type: 'object' },
        { value: null, type: 'object' },
        { value: undefined, type: 'undefined' },
      ];

      for (const { value, type } of testCases) {
        const result = await immediateZalgo(value);
        expect(result).toEqual(value);
        expect(typeof result).toBe(type);
      }
    });

    it('preserves object references', async () => {
      const obj = { key: 'value' };
      const result = await immediateZalgo(obj);
      expect(result).toBe(obj); // Same reference
    });
  });

  describe('Async Behavior', () => {
    it('defers execution to next tick', async () => {
      const operations: string[] = [];

      immediateZalgo('test').then(() => {
        operations.push('async');
      });

      operations.push('sync');

      await new Promise(resolve => setImmediate(resolve));
      expect(operations).toEqual(['sync', 'async']);
    });

    it('maintains execution order of multiple calls', async () => {
      const operations: number[] = [];

      // Queue multiple operations
      immediateZalgo(1).then(v => operations.push(v));
      immediateZalgo(2).then(v => operations.push(v));
      immediateZalgo(3).then(v => operations.push(v));

      await new Promise(resolve => setImmediate(resolve));
      expect(operations).toEqual([1, 2, 3]);
    });

    it('handles nested calls correctly', async () => {
      const operations: string[] = [];

      await immediateZalgo('outer').then(async value => {
        operations.push(value);
        const inner = await immediateZalgo('inner');
        operations.push(inner);
      });

      expect(operations).toEqual(['outer', 'inner']);
    });
  });

  describe('Error Handling', () => {
    it('resolves even with falsy values', async () => {
      const falsyValues = [false, 0, '', null, undefined];

      for (const value of falsyValues) {
        const result = await immediateZalgo(value);
        expect(result).toBe(value);
      }
    });

    it('maintains error stack traces', async () => {
      const error = new Error('test error');
      const originalStack = error.stack;

      try {
        await immediateZalgo(error);
        throw new Error('Should not reach here');
      } catch (e) {
        expect(e).toBe(error);
        expect(e.stack).toBe(originalStack);
      }
    });
  });

  describe('Timer Options', () => {
    it('accepts timer options', async () => {
      const ref = { called: false };
      const options = {
        ref: false,
      };

      await immediateZalgo(ref, options);
      expect(ref.called).toBe(false);
    });

    it('works without options', async () => {
      const value = 'test';
      const result = await immediateZalgo(value);
      expect(result).toBe(value);
    });
  });

  describe('Generic Type Handling', () => {
    it('preserves complex types', async () => {
      interface TestType {
        id: number;
        values: string[];
      }

      const value: TestType = {
        id: 1,
        values: ['a', 'b', 'c'],
      };

      const result = await immediateZalgo<TestType>(value);
      expect(result.id).toBe(1);
      expect(result.values).toEqual(['a', 'b', 'c']);
    });

    it('handles union types', async () => {
      type UnionType = string | number | null;

      const testCases: UnionType[] = ['test', 42, null];

      for (const value of testCases) {
        const result = await immediateZalgo<UnionType>(value);
        expect(result).toBe(value);
      }
    });
  });
});
