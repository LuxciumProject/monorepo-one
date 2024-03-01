export interface Functor<T> {
  map: <R>(fun: (value: T) => R) => Functor<R>;
}
