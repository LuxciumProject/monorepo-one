export function mixBases<
  T extends { expected?: any },
  U extends { expected?: any },
  A extends Omit<T, 'expected'> = Omit<T, 'expected'>,
  B extends Omit<U, 'expected'> = Omit<U, 'expected'>
>(a: T, b: U): A & B {
  const { expected: expectedA, ...restA } = a;
  const { expected: expectedB, ...restB } = b;
  return { ...restA, ...restB } as A & B;
}
