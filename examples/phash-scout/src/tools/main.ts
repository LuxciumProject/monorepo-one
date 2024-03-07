import { mixBases } from './mixBases';
import { mixExpected } from './mixExpected';

const onlyFoo = {
  foo: 'machin',
};
const onlyBar = {
  bar: 'bidule',
};
const foo = {
  foo: 'machin',
  expected: { bolo: (async () => 'await bolo')() },
};
const bar = {
  bar: 'bidule',
  expected: { toto: (async () => 'await toto')() },
};

/**
 * Testing the mixBases without an expected property/object
 * @example
 *    const expectOnly: {
 *      foo: string;
 *      bar: string;
 *    }
 */
const expectOnly = {
  ...mixBases<any, any, { foo: string }, { bar: string }>(onlyFoo, onlyBar),
};
console.log('at expectOnly:', expectOnly);
// at expectOnly: { foo: 'machin', bar: 'bidule' }

/**
 * Testing the mixBases with an expected
 * property/object but discaring it
 * @example
 *    const expect: {
 *      foo: string;
 *      bar: string;
 *    }
 */
const expect = { ...mixBases(foo, bar) };
console.log('at expect:', expect);
// at expect: { foo: 'machin', bar: 'bidule' }

/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @example
 *    const expects1: {
 *        expected: {
 *            bolo: Promise<string>;
 *        } & {
 *            toto: Promise<string>;
 *        };
 *    }
 */
const expects1 = mixExpected(foo, bar);
console.log('at expects1:', expects1);
// at expects1: {
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }

/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @remarks
 * Gradually reshaping the output type infered keeping the same value.
 * @example
 *     const expected: {
 *         bolo: Promise<string>;
 *     } & {
 *         toto: Promise<string>;
 *     }
 */
const expected = expects1.expected;
console.log('at expected:', expected);
// at expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }

/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @remarks
 * Giving its final shape (type wise) for the outpput
 * @example
 *    const expectedFinal: {
 *        expected: {
 *            bolo: Promise<string>;
 *            toto: Promise<string>;
 *        };
 *    }
 */
const expectedFinal = { expected: { ...expected } };
console.log('at expectedFinal:', expectedFinal);
// at expectedFinal: {
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }

/**
 * Merging both part into a new single object
 * @example
 *    const expectBoth: {
 *        expected: {
 *            bolo: Promise<string>;
 *            toto: Promise<string>;
 *        };
 *        foo: string;
 *        bar: string;
 *    }
 */

const expectBoth = { ...expectOnly, ...expectedFinal };
console.log('at expectBoth:', expectBoth);
// at expectBoth: {
//    foo: 'machin',
//    bar: 'bidule',
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }
