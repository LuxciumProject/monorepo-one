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
