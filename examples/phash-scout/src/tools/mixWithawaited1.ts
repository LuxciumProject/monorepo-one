// https://tsplay.dev/mixWithawaited-001

const foo1 = {
  foo: 'machin',
  awaited: { bolo: (async () => 'await bolo')() },
};

const bar1 = {
  bar: 'bidule',
  awaited: { toto: (async () => 'await toto')() },
};
export function mixBases_a<
  T extends { awaited?: any },
  U extends { awaited?: any },
  A extends Omit<T, 'awaited'>,
  B extends Omit<U, 'awaited'>
>(a: T, b: U): A & B {
  const { awaited: awaitedA, ...restA } = a;
  const { awaited: awaitedB, ...restB } = b;

  return { ...restA, ...restB } as A & B;
}

function mixAwaited_a<
  A extends { awaited: object },
  B extends { awaited: object },
  T extends Pick<A, 'awaited'>,
  U extends Pick<B, 'awaited'>
>(a: A, b: B) {
  const { awaited: awaitedA } = a;
  const { awaited: awaitedB } = b;

  const awaited = { ...awaitedA, ...awaitedB };
  return { awaited } as T & U;
}

const base_a = { ...mixBases_a(foo1, bar1) };
const { awaited } = { ...mixAwaited_a(foo1, bar1) };
const awaited_a = { awaited: { ...awaited } };
const mixed_a = { ...base_a, ...awaited_a };
const mixed_b = { ...awaited_a, ...base_a };

const final_a = { ...mixed_a };
const final_b = { ...mixed_b };

console.log('mixed_a:', final_a);
console.log('mixed_b:', final_b);
