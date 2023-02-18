export function normalize_fail(numbers: number[]): number[] {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const range = max - min;

  return numbers.map(num => (num - min) / range);
}

export function normalize(numbers: number[]): number[] {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const range = max - min;

  if (range === 0) {
    return numbers.map(() => 0);
  }

  return numbers.map(num => (num - min) / range);
}
