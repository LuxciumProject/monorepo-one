import { fn_a1f9a } from '../../../functions/core/fn_a1f9a';

/* istanbul ignore next */
export async function fn_a1f9a_TEST_(counter: { a: number }) {
  console.log(`at: fn_a1f9a_TEST_ from ${__filename}`);

  console.log(
    await fn_a1f9a({
      item: 10,
      index: 0,
      array: [10],
      transform: async item => item,
      lookup: item => console.log(item),
      validate: async value => {
        if (value === 10) throw value;
      },
      errLookup: async reason => void reason,
    })
  );

  console.log(
    await fn_a1f9a({
      item: 10,
      index: 0,
      array: [10],
      transform: async item => item * 10,
    })
  );
  counter.a++;
  return counter;
}
