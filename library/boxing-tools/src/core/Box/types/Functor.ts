export interface Functor<T> {
  map<R>(fun: (value: T) => R): Functor<R>;
}

export interface FunctorFL<T> {
  ['fantasy-land/map']<R>(fun: (value: T) => R): Functor<R>;
}
