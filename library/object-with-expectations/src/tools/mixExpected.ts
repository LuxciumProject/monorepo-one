export function mixExpected<
  A extends { expected: object },
  B extends { expected: object }
>(a: A, b: B) {
  const { expected: expectedA } = a;
  const { expected: expectedB } = b;

  const expected = { ...expectedA, ...expectedB };
  return { ...({ expected } as Pick<A, 'expected'> & Pick<B, 'expected'>) };
}
