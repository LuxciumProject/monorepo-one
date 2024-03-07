export function nullOrDefined<T>(value: T | undefined) {
  return value !== undefined ? value : null;
}
