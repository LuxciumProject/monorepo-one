import { mapAllSettled } from '../../../src/core/map-allSettled';

describe('mapAllSettled', () => {
  describe('Core Functionality', () => {
    it('processes all items and maintains order', async () => {
      const input = [1, 2, 3];
      const result = await mapAllSettled({
        list: input,
        mapFn: async x => x * 2,
        limit: 2,
      });

      expect(result).toHaveLength(3);
      expect(
        result.map(r => (r.status === 'fulfilled' ? r.value : null))
      ).toEqual([2, 4, 6]);
    });

    it('respects the provided concurrency limit', async () => {
      const executionOrder: number[] = [];
      const delayedMapper = async (x: number) => {
        executionOrder.push(x);
        await new Promise(r => setTimeout(r, x * 10));
        return x;
      };

      await mapAllSettled({
        list: [3, 1, 2],
        mapFn: delayedMapper,
        limit: 1,
      });

      // With limit 1, should execute in sequence despite different delays
      expect(executionOrder).toEqual([3, 1, 2]);
    });
  });

  describe('Resource Management', () => {
    it('releases workers after completion', async () => {
      const activeWorkers = new Set<number>();
      let maxConcurrent = 0;

      await mapAllSettled({
        list: Array.from({ length: 10 }, (_, i) => i),
        mapFn: async x => {
          const workerId = Math.random();
          activeWorkers.add(workerId);
          maxConcurrent = Math.max(maxConcurrent, activeWorkers.size);
          await new Promise(r => setTimeout(r, 10));
          activeWorkers.delete(workerId);
          return x;
        },
        limit: 3,
      });

      expect(maxConcurrent).toBe(3);
      expect(activeWorkers.size).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('continues processing after individual failures', async () => {
      const input = [1, 2, 3, 4];
      const errors = new Set<number>();

      const result = await mapAllSettled({
        list: input,
        mapFn: async x => {
          if (x % 2 === 0) {
            errors.add(x);
            throw new Error(`Error processing ${x}`);
          }
          return x;
        },
        limit: 2,
      });

      expect(result).toHaveLength(4);
      expect(result.filter(r => r.status === 'fulfilled')).toHaveLength(2);
      expect(result.filter(r => r.status === 'rejected')).toHaveLength(2);
      expect(errors).toEqual(new Set([2, 4]));
    });

    it('handles immediate rejections', async () => {
      const error = new Error('immediate failure');
      const result = await mapAllSettled({
        list: [1],
        mapFn: () => {
          throw error;
        },
        limit: 1,
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('rejected');
      expect((result[0] as PromiseRejectedResult).reason).toBe(error);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty input array', async () => {
      const result = await mapAllSettled({
        list: [],
        mapFn: async x => x,
        limit: 1,
      });

      expect(result).toEqual([]);
    });

    it('processes single item arrays correctly', async () => {
      const result = await mapAllSettled({
        list: [1],
        mapFn: async x => x * 2,
        limit: 5,
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('fulfilled');
      if (result[0].status === 'fulfilled') {
        expect(result[0].value).toBe(2);
      }
    });

    it('defaults limit to array length when undefined', async () => {
      const activeOperations = new Set<number>();
      let maxConcurrent = 0;

      await mapAllSettled({
        list: [1, 2, 3],
        mapFn: async x => {
          activeOperations.add(x);
          maxConcurrent = Math.max(maxConcurrent, activeOperations.size);
          await new Promise(r => setTimeout(r, 10));
          activeOperations.delete(x);
          return x;
        },
      });

      expect(maxConcurrent).toBe(3);
    });
  });

  describe('Performance Characteristics', () => {
    it('completes faster with higher concurrency for I/O bound tasks', async () => {
      const items = Array.from({ length: 10 }, (_, i) => i);
      const delay = 50; // ms

      const serialStart = Date.now();
      await mapAllSettled({
        list: items,
        mapFn: async () => new Promise(r => setTimeout(r, delay)),
        limit: 1,
      });
      const serialTime = Date.now() - serialStart;

      const parallelStart = Date.now();
      await mapAllSettled({
        list: items,
        mapFn: async () => new Promise(r => setTimeout(r, delay)),
        limit: 5,
      });
      const parallelTime = Date.now() - parallelStart;

      // Parallel execution should be significantly faster
      expect(parallelTime).toBeLessThan(serialTime * 0.8);
    });
  });
});
