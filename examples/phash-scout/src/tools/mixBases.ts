// export function mixBases<T extends {}, U extends {}, A = T, B = U>(a: T, b: U): T & U;
// export function mixBases<T extends {}, U extends { expected?: any }, B extends Omit<U, 'expected'>, A = T>(
//   a: T,
//   b: U
// ): T & B;
// export function mixBases<T extends { expected?: any }, U extends {}, A extends Omit<T, 'expected'>, B = U>(
//   a: T,
//   b: U
// ): A & U;
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
