import { mixBases, mixExpected } from './tools';

const onlyFoo = {
  foo: 'machin1',
};
const onlyBar = {
  bar: 'bidule',
};
const foo = {
  foo: 'machin2',
  expected: { bolo: async () => 'await bolo' },
};
const bar = {
  expected: { toto: async () => 'await toto' },
};
const fizz = {
  expected: { carol: async () => 'await bidon-chose' },
};
const baz = {
  expected: { dave: async () => 'await trucmuche' },
};

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`); // outputs :
  // at: MAIN from /projects/monorepo-one/library/object-with-expectations/src/main.ts

  /**
   * @example
   *  const lorem: {
   *      foo: string;
   *  } & {
   *      bar: string;
   *  };
   */
  const lorem = mixBases<any, any, typeof onlyFoo, typeof onlyBar>(
    onlyFoo,
    onlyBar
  );
  /**
   * @example
   * const ipsum: {
   *     foo: string;
   * } & {
   *     foo: string;
   *     expected: {
   *         bolo: () => Promise<string>;
   *     };
   * }
   */
  const ipsum = mixBases<any, any, typeof onlyFoo, typeof foo>(onlyFoo, foo);
  /**
   * @example
   * const dolor: {
   *     foo: string;
   * } & {
   *     expected: {
   *         toto: () => Promise<string>;
   *     };
   * }
   */
  const dolor = mixBases<any, typeof bar, typeof onlyFoo, typeof bar>(
    onlyFoo,
    bar
  );
  /**
   * @example
   *   const sit: {
   *     foo: string;
   * } & {
   *     expected: {
   *         carol: () => Promise<string>;
   *     };
   * }
   */
  const sit = mixBases<any, typeof fizz, typeof onlyFoo, typeof fizz>(
    onlyFoo,
    fizz
  );
  /**
   * @example
   * const amet: {
   *     foo: string;
   * } & {
   *     expected: {
   *         dave: () => Promise<string>;
   *     };
   * }
   */
  const amet = mixBases<any, typeof baz, typeof onlyFoo, typeof baz>(
    onlyFoo,
    baz
  );

  console.dir([lorem, ipsum, dolor, sit, amet]); // outputs :
  //   [
  //   { foo: 'machin1', bar: 'bidule' },
  //   { foo: 'machin2' },
  //   { foo: 'machin1' },
  //   { foo: 'machin1' },
  //   { foo: 'machin1' }
  // ]

  /**
   * Argument of type '{ bar: string; }' is not assignable to
   *   parameter of type '{ expected: object; }'. Property 'expected' is
   *   missing in type '{ bar: string; }' but required in type '{
   *   expected: object; }'.
   *
   */
  // const trucmuche = mixExpected(foo, onlyBar);
  /**
   * @example
   * const bidochon: {
   *     expected: {
   *         bolo: () => Promise<string>;
   *     };
   * }
   */
  const bidochon = mixExpected(foo, foo);
  /**
   * @example
   * const chosette: {
   *     expected: {
   *         bolo: () => Promise<string>;
   *     } & {
   *         toto: () => Promise<string>;
   *     };
   * }
   */
  const chosette = mixExpected(foo, bar);
  /**
   * @example
   * const titoune: {
   *     expected: {
   *         bolo: () => Promise<string>;
   *     } & {
   *         carol: () => Promise<string>;
   *     };
   * }
   */
  const titoune = mixExpected(foo, fizz);
  /**
   * @example
   * const tatouille: {
   *     expected: {
   *         bolo: () => Promise<string>;
   *     } & {
   *         dave: () => Promise<string>;
   *     };
   * }
   */
  const tatouille = mixExpected(foo, baz);
  console.dir([bidochon, chosette, titoune, tatouille]); // outputs :
  // [
  //   { expected: { bolo: [AsyncFunction: bolo] } },
  //   {
  //     expected: { bolo: [AsyncFunction: bolo], toto: [AsyncFunction: toto] }
  //   },
  //   {
  //     expected: { bolo: [AsyncFunction: bolo], carol: [AsyncFunction: carol] }
  //   },
  //   {
  //     expected: { bolo: [AsyncFunction: bolo], dave: [AsyncFunction: dave] }
  //   }
  // ]

  return void 0; // {  myFisrtExpected };
})();

// void [onlyFoo, onlyBar, foo, bar, fizz, baz];

// lorem, ipsum, dolor, sit, amet
/*


const tatouille =
 */
// mixExpected
// mixBases

// const onlyFooBar = mixBases<any, any, { foo: string }, { bar: string }>(
//   onlyFoo,
//   onlyBar
// );

// const myFisrtWith = mixBases(
//   { A: 'a', expected: {} },
//   { B: 'u', expected: {} }
// );

/**
 *
 * Testing the mixExpected without an expected property/object
 * @example
    const myFisrtExpected: {
        expected: {
            bolo: () => Promise<string>;
        } & {
            toto: () => Promise<string>;
        };
    }
*/
// const myFisrtExpected = mixExpected({ ...onlyFoo, ...foo }, bar);

// console.log(myFisrtExpected); // outputs { expected: { bolo: [AsyncFunction: bolo], toto: [AsyncFunction: toto] }}

// const myFisrtBase = mixBases({ ...onlyFoo, ...foo }, bar);

// console.log(myFisrtBase); // outputs { foo: 'machin', bar: 'bidule' }

// console.log({ ...myFisrtExpected });

/*

Bonjour, c’est Bing. Je peux vous aider à trouver des mots pour faire des exemples de code de programmation en français. La page web actuelle est vide, donc je vais utiliser mes propres connaissances et mots. Voici quelques suggestions de mots que vous pouvez utiliser à la place de foo et bar :

bidule, bolo, machin, toto, tata
truc, bidon, chose, titi, tata
bidouille, bobo, machouille, tutu, tata
bidonville, bolo-bolo, machin-chouette, totoche, tatane
trucmuche, bidochon, chosette, titoune, tatouille, bidonchose


spam, ham, eggs, monty, python
foo, bar, qux, quux, corge
alice, bob, carol, dave, eve
lorem, ipsum, dolor, sit, amet
fizz, buzz, bizz, fuzz, bozz
 */
