import { IO_Mapper } from '../../../src/core/io-mapper';

describe('IO_Mapper', () => {
  describe('Basic Functionality', () => {
    it('processes items concurrently with default limit', async () => {
      const input = [1, 2, 3];
      const result = await IO_Mapper({
        list: input,
        mapFn: async x => x * 2,
      });

      expect(result).toHaveLength(3);
      expect(result.every(r => r.status === 'fulfilled')).toBe(true);
      expect(
        result.map(r => (r.status === 'fulfilled' ? r.value : null))
      ).toEqual([2, 4, 6]);
    });

    it('handles empty input array', async () => {
      const result = await IO_Mapper({
        list: [],
        mapFn: async x => x,
      });
      expect(result).toEqual([]);
    });
  });

  describe('Concurrency Control', () => {
    it('respects provided concurrency limit', async () => {
      const tracker = { concurrent: 0, max: 0 };
      const input = [1, 2, 3, 4];

      await IO_Mapper({
        list: input,
        mapFn: async () => {
          tracker.concurrent++;
          tracker.max = Math.max(tracker.max, tracker.concurrent);
          await new Promise(r => setTimeout(r, 10));
          tracker.concurrent--;
          return true;
        },
        limit: 2,
      });

      expect(tracker.max).toBe(2);
    });

    it('defaults to list length when limit is undefined', async () => {
      const tracker = { concurrent: 0, max: 0 };
      const input = [1, 2, 3];

      await IO_Mapper({
        list: input,
        mapFn: async () => {
          tracker.concurrent++;
          tracker.max = Math.max(tracker.max, tracker.concurrent);
          await new Promise(r => setTimeout(r, 10));
          tracker.concurrent--;
          return true;
        },
      });

      expect(tracker.max).toBe(3);
    });
  });

  describe('Error Handling', () => {
    it('captures individual item failures without stopping other operations', async () => {
      const input = [1, 2, 3];
      const result = await IO_Mapper({
        list: input,
        mapFn: async x => {
          if (x === 2) throw new Error('test error');
          return x * 2;
        },
      });

      expect(result).toHaveLength(3);
      expect(result[0].status).toBe('fulfilled');
      expect(result[1].status).toBe('rejected');
      expect(result[2].status).toBe('fulfilled');

      const values = result.map(r =>
        r.status === 'fulfilled' ? r.value : null
      );
      expect(values).toEqual([2, null, 6]);
    });

    it('handles errors in async operations', async () => {
      const input = [1];
      const result = await IO_Mapper({
        list: input,
        mapFn: async () => {
          throw new Error('async error');
        },
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('rejected');
      expect((result[0] as PromiseRejectedResult).reason).toBeInstanceOf(Error);
      expect((result[0] as PromiseRejectedResult).reason.message).toBe(
        'async error'
      );
    });
  });

  describe('Type Safety', () => {
    it('preserves input and output types', async () => {
      interface Input {
        id: number;
        value: string;
      }
      interface Output {
        processed: boolean;
        original: Input;
      }

      const input: Input[] = [{ id: 1, value: 'test' }];

      const result = await IO_Mapper<Input, Output>({
        list: input,
        mapFn: async item => ({
          processed: true,
          original: item,
        }),
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('fulfilled');
      if (result[0].status === 'fulfilled') {
        expect(result[0].value).toEqual({
          processed: true,
          original: input[0],
        });
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles zero/negative limits', async () => {
      const input = [1];
      const result = await IO_Mapper({
        list: input,
        mapFn: async x => x,
        limit: -1,
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('fulfilled');
    });

    it('handles undefined/null input elements', async () => {
      const input = [undefined, null, 1] as const;
      const result = await IO_Mapper({
        list: input,
        mapFn: async x => x,
      });

      expect(result).toHaveLength(3);
      expect(result.every(r => r.status === 'fulfilled')).toBe(true);
      expect(
        result.map(r => (r.status === 'fulfilled' ? r.value : null))
      ).toEqual([undefined, null, 1]);
    });
  });
});
