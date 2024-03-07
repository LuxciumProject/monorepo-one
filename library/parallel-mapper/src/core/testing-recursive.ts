export function pipe<T, R>(fnOrValue: ((arg: T) => R) | T): any {
  if (fnOrValue instanceof Function) {
    console.log(`fnOrValue is a function "${fnOrValue}"`);
    return <A = T, B = R>(fnOrValue_: A | ((arg: A) => B)): any =>
      fnOrValue(pipe<A, B>(fnOrValue_));
  }

  console.log(`fnOrValue is the value "${fnOrValue}"`);
  return fnOrValue;
}
console.log('pipe:', pipe(idx)(idx)(len_)('TOTO'));
const step1 = pipe(idx);
const step2 = step1(len_);
const step3 = step2(idx);
const step4 = step3('TATA');
console.log('pipe result:', step4);
console.log('pipe:', pipe(idx)(len_)(double)('TATA'));

export function idx<T>(value: T): T {
  return value;
}

export function len_(value: string): number {
  return value.length;
}

export function double(value: any): any {
  return value * 2;
}
