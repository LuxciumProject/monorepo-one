export function isA_Promise<T>(element: T | Promise<T>): element is Promise<T> {
  if (typeof element === 'object' && element instanceof Promise) return true;

  return false;
}
