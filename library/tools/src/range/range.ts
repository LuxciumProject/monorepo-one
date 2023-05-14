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

export function range(start: number, end: number, step: number): number[] {
  if (!isFinite(start) || !isFinite(end) || !isFinite(step) || step === 0) {
    return [];
  }

  const difference = end - start;
  if (difference === 0) return [start || end];
  if (Math.abs(step) > Math.abs(difference)) {
    return step > 0 ? [start, end] : [end, start];
  }

  let increment = start < end;
  let [first, last] = step > 0 ? [start, end] : [end, start];
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
  // const first
  //step is positive and difference is positive
  //step is negative and difference is positive
  //step is positive and difference is negative
  //step is negative and difference is negative
  // start is of type number treated as an integer value (if it has a float value the beaviour is unspecified)
  // end is of type number treated as an integer value (if it has a float value the beaviour is unspecified)
  // increment is given by this typescript asignment `const increment = start < end ;`
  // if increment is true it will indeed increase but if it is false then it would decrease
  // step is an absolute value with a negative or positive component
  // the negative would invert the increase vs deacrease property of a for loop
  //
  // const length = Math.floor(Math.abs(difference / increment)) + 1;
  // return Array.from({ length }, (_, i) => start + i * increment);
}
