// https://tsplay.dev/mixWithawaited-002

type WithFoo = { foo: string };
type WithAwaited<T> = { awaited: T };
type WithAwaitedBolo = WithAwaited<{ bolo: Promise<string> }>; // { awaited: { bolo: Promise<string>; }; };

const foo1: WithFoo & WithAwaitedBolo = {
  foo: 'machin',
  awaited: { bolo: (async () => 'await bolo')() },
};

type WithBar = { bar: string };
type WithAwaitedToto = { awaited: { toto: Promise<string> } };

const bar1: WithBar & WithAwaitedToto = {
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

export function mixAwaited_a<
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

const base_a /* : WithAwaitedBolo& WithAwaitedToto& WithFoo& WithBar */ = {
  ...mixBases_a<WithAwaitedBolo, WithAwaitedToto, WithFoo, WithBar>(foo1, bar1),
};
const { awaited } = {
  ...mixAwaited_a(foo1, bar1),
};
const awaited_a = { awaited: { ...awaited } };
const mixed_a = { ...base_a, ...awaited_a };
const mixed_b = { ...awaited_a, ...base_a };

console.log('mixed_a:', mixed_a);
console.log('mixed_b:', mixed_b);
