type IFunctor<T> = {
  map: (f: (x: T) => T) => IFunctor<T>;
};

function areEquivalent<U>(
  u: IFunctor<U>,
  v: IFunctor<U> | U,
  f: (x: U) => U
): boolean {
  if (!hasMap(v)) {
    return false;
  }
  return JSON.stringify(u.map(f)) === JSON.stringify(v.map(f));
}

function hasMap<T>(value: IFunctor<T> | T): value is IFunctor<T> {
  return typeof value === 'object' && value !== null && 'map' in value;
}

function isFunctor<T>(value: IFunctor<T> | T): value is IFunctor<T> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const map = (value as IFunctor<T>).map.bind(value);
  if (typeof map !== 'function') {
    return false;
  }

  // Test identity law
  const identity = (x: T) => x;
  if (!areEquivalent(map(identity), value, identity)) {
    return false;
  }

  // Test composition law
  const f = (x: T) => x;
  const g = (x: T) => x;
  if (
    !areEquivalent(
      map(x => f(g(x))),
      map(g).map(f),
      x => f(g(x))
    )
  ) {
    return false;
  }

  return true;
}

export { IFunctor, areEquivalent, hasMap, isFunctor };
