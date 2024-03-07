type Func<T, R> = (arg: T) => R;

export function pipe(): <T>(arg: T) => T;
export function pipe<F extends Func<any, any>>(
  fn: F
): <T extends Parameters<F>[0]>(arg: T) => ReturnType<F>;
export function pipe<F extends Func<any, any>, S extends Func<any, any>>(
  f1: F,
  f2: S
): <T extends Parameters<F>[0]>(arg: T) => ReturnType<S>;
export function pipe(...fns: Func<any, any>[]) {
  return <T>(arg: T) => {
    const [firstFn, ...rest] = fns;
    let result = firstFn ? firstFn(arg) : arg;
    for (const fn of rest) {
      result = fn(result);
    }
    return result;
  };
}
