export const range_ = (x: number, y: number) => {
  const res = Array.from(Array(y).keys()).slice(x);
  return res;
};
/**
 * Returns an array of numbers within the given range, with the specified step size.
 *
 * @remarks
 * If the start number is greater than the end number and the step is positive, the array will be in descending order.
 * If the start number is smaller than the end number and the step is negative, the array will be in descending order.
 * If the step size is 0 or not finite, the function will return an empty array.
 *
 * @param start - The starting number of the range.
 * @param end - The ending number of the range.
 * @param step - The step size between numbers.
 * @returns An array of numbers within the given range, with the specified step size.
 */
const { isFinite: isFinite_ } = Number;
export function range(start: number, end: number = start, step = 1): number[] {
  if (!isFinite_(start) || !isFinite_(end) || !isFinite_(step) || 0 === step) {
    return [];
  }

  const difference = end - start;
  if (0 === difference) {
    return [start || end];
  }
  if (Math.abs(step) > Math.abs(difference)) {
    return step > 0 ? [start, end] : [end, start];
  }

  let increment = start < end;
  const [first, last] = step > 0 ? [start, end] : [end, start];
  const absolutStep = Math.abs(step);

  increment = step < 0 ? !increment : increment;

  const result: number[] = [];
  if (increment) {
    for (let i = first; i <= last; i += absolutStep) {
      result.push(i);
    }
  } else {
    for (let i = first; i >= last; i -= absolutStep) {
      result.push(i);
    }
  }

  return result;
}

export type RangeOptions = {
  start?: number;
  step?: number;
} & (
  | { end: number; stop?: never }
  | { stop: number; end?: never }
); /* { start?: number; step?: number } & (
  | { end: number }
  | { stop: number }
); */

export const rangeOptions_001: RangeOptions = { end: 0 };
export const rangeOptions_002: RangeOptions = { stop: 0 };
export const rangeOptions_003: RangeOptions = { end: 1 };
export const rangeOptions_004: RangeOptions = { stop: 1 };

export const rangeOptions_005: RangeOptions = { end: 10 };
export const rangeOptions_006: RangeOptions = { stop: 10 };

export const rangeOptions_007: RangeOptions = { end: -1 };
export const rangeOptions_008: RangeOptions = { stop: -1 };

export const rangeOptions_009: RangeOptions = { end: -10 };
export const rangeOptions_010: RangeOptions = { stop: -10 };

export const rangeOptions_011: RangeOptions = { end: -0 };
export const rangeOptions_012: RangeOptions = { stop: -0 };

export const rangeOptions_013: RangeOptions = { end: NaN }; // or negative/positive infinity
export const rangeOptions_014: RangeOptions = { stop: NaN }; // or negative/positive infinity

export function rangeOriginal(
  start: number,
  end: number = start,
  step = 1
): number[] {
  const isFinite_ = Number.isFinite;
  if (!isFinite_(start) || !isFinite_(end) || !isFinite_(step) || 0 === step) {
    return [];
  }
  const difference = end - start;
  if (0 === difference) {
    return [start];
  }
  if (Math.abs(step) > Math.abs(difference)) {
    return step > 0 ? [start, end] : [end, start];
  }
  let increment = start < end;
  const [first, last] = step > 0 ? [start, end] : [end, start];
  const absolutStep = Math.abs(step);
  increment = step < 0 ? !increment : increment;
  const result: number[] = [];
  if (increment) {
    for (let i = first; i <= last; i += absolutStep) {
      result.push(i);
    }
  } else {
    for (let i = first; i >= last; i -= absolutStep) {
      result.push(i);
    }
  }
  return result;
}

export function rangeOverload(start: number): number[];
export function rangeOverload(start: number, end: number): number[];
export function rangeOverload(
  start: number,
  end: number,
  step: number
): number[];
export function rangeOverload(start: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return rangeOriginal(start, end, step);
}

export function rangeStop(
  start: number,
  stop: number = start,
  step = 1
): number[] {
  if (stop !== start) {
    stop -= step;
  }
  return rangeOriginal(start, stop, step);
}

export type Approach4 = {
  start?: number;
  step?: number;
} & ({ end: number; stop?: never } | { stop: number; end?: never });
export const options_end: Approach4 = { start: 10, step: 10, end: 10 };
export const options_stop: Approach4 = { start: 10, step: 10, stop: 10 };
// export const options_NEVER:Approach4 = {start:10,step:10,end:10,stop:10};

export function useApproach4(approach: Approach4) {
  // start and step are optional, so we need to check if they exist
  approach.end;

  if (approach.start !== undefined) {
    console.log(`Start: ${approach.start}`);
  }

  if (approach.step !== undefined) {
    console.log(`Step: ${approach.step}`);
  }

  // one of end or stop must exist, but we don't know which, so we need to check both
  if (approach.end !== undefined) {
    console.log(`End: ${approach.end}`);
    approach.end;
  } else if (approach.stop !== undefined) {
    console.log(`Stop: ${approach.stop}`);
    const { end } = approach;
    if (end !== undefined) {
      approach;
    }
    end;
    approach.end;
  }
}

export function rangeOptions(options: RangeOptions): number[] {
  let end: number;
  let { start, step } = options;
  if ('stop' in options) {
    end = options.stop - (step || 1);
  } else if ('end' in options) {
    end = options.end;
  } else {
    end = start || 0;
  }
  start = start || 0;
  step = step || 1;
  return rangeOriginal(start, end, step);
}

export function rangeOptions_(options: Approach4): number[] {
  let { start, end, stop, step } = options;

  if (stop) {
    end;
  }
  if ('stop' in options) {
    end = options.stop - (step || 1);
  }
  start = start || 0;
  step = step || 1;
  return rangeOriginal(start, end, step);
}
