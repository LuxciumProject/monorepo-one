import { Either, isLeft, isRight } from 'fp-ts/lib/Either';
import { itemMapper, eitherSettledResult } from '../../../src/core/item-mapper';
import type { ItemMapperArgs } from '../../../src/core/types';

describe('item-mapper', () => {
  describe('itemMapper', () => {
    it('successfully processes simple transformations', async () => {
      const args: ItemMapperArgs<number, string> = {
        mapFn: async x => x.toString(),
        currentItem: 42,
        index: 0,
        array: [42],
      };

      const result = await itemMapper(args);

      expect(result.status).toBe('fulfilled');
      if (result.status === 'fulfilled') {
        expect(result.value).toBe('42');
      }
    });

    it('handles async transformations', async () => {
      const args: ItemMapperArgs<string, number> = {
        mapFn: async str => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return str.length;
        },
        currentItem: 'test',
        index: 0,
        array: ['test'],
      };

      const result = await itemMapper(args);

      expect(result.status).toBe('fulfilled');
      if (result.status === 'fulfilled') {
        expect(result.value).toBe(4);
      }
    });

    it('provides correct array context to mapper function', async () => {
      const array = [1, 2, 3];
      let receivedIndex: number | undefined;
      let receivedArray: number[] | undefined;

      const args: ItemMapperArgs<number, number> = {
        mapFn: async (x, idx, arr) => {
          receivedIndex = idx;
          receivedArray = arr;
          return x;
        },
        currentItem: array[1],
        index: 1,
        array,
      };

      await itemMapper(args);

      expect(receivedIndex).toBe(1);
      expect(receivedArray).toBe(array);
    });

    it('handles synchronous errors', async () => {
      const error = new Error('test error');
      const args: ItemMapperArgs<number, never> = {
        mapFn: () => {
          throw error;
        },
        currentItem: 1,
        index: 0,
        array: [1],
      };

      const result = await itemMapper(args);

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.reason).toBe(error);
      }
    });

    it('handles asynchronous errors', async () => {
      const error = new Error('async error');
      const args: ItemMapperArgs<number, never> = {
        mapFn: async () => {
          await new Promise(resolve => setTimeout(resolve, 10));
          throw error;
        },
        currentItem: 1,
        index: 0,
        array: [1],
      };

      const result = await itemMapper(args);

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.reason).toBe(error);
      }
    });

    it('processes null/undefined values', async () => {
      const args: ItemMapperArgs<null | undefined, string> = {
        mapFn: async x => String(x),
        currentItem: null,
        index: 0,
        array: [null],
      };

      const result = await itemMapper(args);

      expect(result.status).toBe('fulfilled');
      if (result.status === 'fulfilled') {
        expect(result.value).toBe('null');
      }
    });
  });

  describe('eitherSettledResult', () => {
    it('converts fulfilled result to Right', () => {
      const settled: PromiseSettledResult<number> = {
        status: 'fulfilled',
        value: 42,
      };

      const result: Either<number, any> = eitherSettledResult(settled);

      expect(isRight(result)).toBe(true);
      if (isRight(result)) {
        expect(result.right).toBe(42);
      }
    });

    it('converts rejected result to Left', () => {
      const error = new Error('test error');
      const settled: PromiseSettledResult<never> = {
        status: 'rejected',
        reason: error,
      };

      const result = eitherSettledResult(settled);

      expect(isLeft(result)).toBe(true);
      if (isLeft(result)) {
        expect(result.left).toBe(error);
      }
    });

    it('preserves value types in Either', () => {
      interface TestData {
        id: number;
        value: string;
      }

      const data: TestData = { id: 1, value: 'test' };
      const settled: PromiseSettledResult<TestData> = {
        status: 'fulfilled',
        value: data,
      };

      const result = eitherSettledResult(settled);

      expect(isRight(result)).toBe(true);
      if (isRight(result)) {
        expect(result.right).toEqual(data);
        expect(result.right.id).toBe(1);
        expect(result.right.value).toBe('test');
      }
    });

    it('handles various error types in Left', () => {
      const testCases: Array<{ reason: any; description: string }> = [
        { reason: new Error('error'), description: 'Error object' },
        { reason: 'string error', description: 'string' },
        { reason: { custom: 'error' }, description: 'plain object' },
        { reason: null, description: 'null' },
      ];

      testCases.forEach(({ reason, description }) => {
        const settled: PromiseSettledResult<never> = {
          status: 'rejected',
          reason,
        };

        const result = eitherSettledResult(settled);

        expect(isLeft(result)).toBe(true);
        if (isLeft(result)) {
          expect(result.left).toBe(reason);
        }
      });
    });
  });
});
