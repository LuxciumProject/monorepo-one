export interface IMap<U> {
  map: <R>(fn: (value: U) => R) => IMap<R>;
}
