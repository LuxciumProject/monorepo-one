import type { PerformanceResult, PerformanceResultTupple } from '../types';
import { measurePerformance } from './measurePerformance';

describe('measurePerformance', () => {
  it('should measure the performance of a function', async () => {
    const fn: jest.Mock<number> = jest.fn().mockResolvedValue(42);
    const result: PerformanceResult = await measurePerformance(fn);
    measurePerformance(() => 10);

    expect(result.value).toBe(42);
    expect(typeof result.timeElapsed).toBe('number');
    expect(typeof result.totalTimeElapsed).toBe('number');
    expect(typeof result.initialTime).toBe('number');
    expect(fn).toHaveBeenCalled();
  });
  it.each([true, false])(
    'should return an object if "tupple" parameter is %s',
    async tuple => {
      const fn: jest.Mock<string> = jest.fn().mockResolvedValue('42');

      if (tuple) {
        const result: PerformanceResultTupple<string> =
          await measurePerformance(fn, true);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(4);
        expect(result[0]).toBe('42');
        expect(typeof result[1]).toBe('number');
        expect(typeof result[2]).toBe('number');
        expect(typeof result[3]).toBe('number');
        expect(fn).toHaveBeenCalled();
      } else {
        const result: PerformanceResult<string> = await measurePerformance(
          fn,
          false
        );

        expect(result.value).toBe('42');
        expect(typeof result.timeElapsed).toBe('number');
        expect(typeof result.totalTimeElapsed).toBe('number');
        expect(typeof result.initialTime).toBe('number');
        expect(fn).toHaveBeenCalled();
      }
    }
  );
  describe('should return a tuple or an object if "tupple" parameter is boolean', () => {
    it.each([true, false])(
      'returns correct result when tupple is %s',
      async tuple => {
        const fn: jest.Mock<string> = jest.fn().mockResolvedValue('42');

        const bool = tuple;
        const result:
          | PerformanceResult<string>
          | PerformanceResultTupple<string> = await measurePerformance(
          fn,
          bool
        );

        if (Array.isArray(result)) {
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBe(4);
          expect(result[0]).toBe('42');
          expect(typeof result[1]).toBe('number');
          expect(typeof result[2]).toBe('number');
          expect(typeof result[3]).toBe('number');
        } else {
          expect(Array.isArray(result)).toBe(false);
          expect(result.value).toBe('42');
          expect(typeof result.timeElapsed).toBe('number');
          expect(typeof result.totalTimeElapsed).toBe('number');
          expect(typeof result.initialTime).toBe('number');
        }

        expect(fn).toHaveBeenCalled();
      }
    );
  });
});
