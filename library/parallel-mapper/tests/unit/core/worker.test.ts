import { worker } from '../../../src/core/worker';
import type { WorkerArgs } from '../../../src/core/types/WorkerArgs';

describe('worker', () => {
  describe('Task Processing', () => {
    it('processes items from generator and updates result array', async () => {
      const items = [1, 2, 3];
      const result: PromiseSettledResult<number>[] = new Array(items.length);

      function* testGenerator(): Generator<[number, number, number[]]> {
        for (let i = 0; i < items.length; i++) {
          yield [items[i], i, items];
        }
      }

      const workerArgs: WorkerArgs<number, number> = {
        gen: testGenerator(),
        mapFn: async x => x * 2,
        result,
      };

      await worker(workerArgs);

      expect(result).toHaveLength(3);
      expect(result.every(r => r.status === 'fulfilled')).toBe(true);
      expect(
        result.map(r => (r.status === 'fulfilled' ? r.value : null))
      ).toEqual([2, 4, 6]);
    });

    it('maintains correct array indices in results', async () => {
      const items = ['a', 'b', 'c'];
      const result: PromiseSettledResult<string>[] = new Array(items.length);
      const processedIndices: number[] = [];

      function* testGenerator(): Generator<[string, number, string[]]> {
        for (let i = 0; i < items.length; i++) {
          yield [items[i], i, items];
        }
      }

      const workerArgs: WorkerArgs<string, string> = {
        gen: testGenerator(),
        mapFn: async (x, i) => {
          processedIndices.push(i!);
          return x.toUpperCase();
        },
        result,
      };

      await worker(workerArgs);

      expect(processedIndices).toEqual([0, 1, 2]);
      expect(
        result.map(r => (r.status === 'fulfilled' ? r.value : null))
      ).toEqual(['A', 'B', 'C']);
    });
  });

  describe('Error Handling', () => {
    it('captures errors from mapper function', async () => {
      const items = [1, 2, 3];
      const result: PromiseSettledResult<number>[] = new Array(items.length);

      function* testGenerator(): Generator<[number, number, number[]]> {
        for (let i = 0; i < items.length; i++) {
          yield [items[i], i, items];
        }
      }

      const error = new Error('test error');
      const workerArgs: WorkerArgs<number, number> = {
        gen: testGenerator(),
        mapFn: async x => {
          if (x === 2) throw error;
          return x;
        },
        result,
      };

      await worker(workerArgs);

      expect(result[0].status).toBe('fulfilled');
      expect(result[1].status).toBe('rejected');
      expect(result[2].status).toBe('fulfilled');
      expect((result[1] as PromiseRejectedResult).reason).toBe(error);
    });

    it('handles async errors', async () => {
      const items = [1];
      const result: PromiseSettledResult<number>[] = new Array(items.length);

      function* testGenerator(): Generator<[number, number, number[]]> {
        yield [items[0], 0, items];
      }

      const workerArgs: WorkerArgs<number, number> = {
        gen: testGenerator(),
        mapFn: async () => {
          await Promise.resolve();
          throw new Error('async error');
        },
        result,
      };

      await worker(workerArgs);

      expect(result[0].status).toBe('rejected');
      expect((result[0] as PromiseRejectedResult).reason).toBeInstanceOf(Error);
    });
  });

  describe('Array Context', () => {
    it('provides original array context to mapper function', async () => {
      const items = [1, 2, 3];
      const result: PromiseSettledResult<boolean>[] = new Array(items.length);
      let receivedArray: number[] | undefined;

      function* testGenerator(): Generator<[number, number, number[]]> {
        for (let i = 0; i < items.length; i++) {
          yield [items[i], i, items];
        }
      }

      const workerArgs: WorkerArgs<number, boolean> = {
        gen: testGenerator(),
        mapFn: async (_, __, arr) => {
          receivedArray = arr;
          return true;
        },
        result,
      };

      await worker(workerArgs);

      expect(receivedArray).toBeDefined();
      expect(receivedArray).toEqual(items);
    });
  });

  describe('Generator Exhaustion', () => {
    it('processes generator until completion', async () => {
      const processed: number[] = [];
      const result: PromiseSettledResult<void>[] = [];

      function* infiniteGenerator(): Generator<[number, number, number[]]> {
        let i = 0;
        while (i < 5) {
          yield [i, i, [i]];
          i++;
        }
      }

      const workerArgs: WorkerArgs<number, void> = {
        gen: infiniteGenerator(),
        mapFn: async x => {
          processed.push(x);
        },
        result,
      };

      await worker(workerArgs);

      expect(processed).toEqual([0, 1, 2, 3, 4]);
    });

    it('handles empty generators gracefully', async () => {
      const result: PromiseSettledResult<number>[] = [];

      function* emptyGenerator(): Generator<[number, number, number[]]> {
        if (false) yield [0, 0, []];
      }

      const workerArgs: WorkerArgs<number, number> = {
        gen: emptyGenerator(),
        mapFn: async x => x,
        result,
      };

      await worker(workerArgs);

      expect(result).toHaveLength(0);
    });
  });
});
