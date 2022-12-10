import { makeSettler } from '../makeSettler';

/* istanbul ignore next */
export function makeFulfillement_TEST_(counter: { a: number }) {
  console.log(`at: makeSettler_TEST_ from ${__filename}`);
  console.log(makeSettler(10));
  console.log(makeSettler({ init: 10 }));
  console.log(makeSettler([{ init: 10 }]));
  console.log(makeSettler([{ value: 10 }]));
  console.log(makeSettler({ status: 10 }));
  console.log(makeSettler({ value: 10, status: null }));
  console.log(
    makeSettler({ value: 10, status: 'fulfilled', transformStep: 14 })
  );
  console.log(makeSettler({ value: 10 }));
  console.log(makeSettler({ reason: 10 }));
  counter.a++;
  return counter;
}
makeFulfillement_TEST_({ a: 0 });
