export interface Extend<T> {
  extend: <R>(f: (w: Extend<T>) => R) => Extend<R>;
}
