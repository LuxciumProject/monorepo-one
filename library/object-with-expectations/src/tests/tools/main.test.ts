import { mixBases, mixExpected } from '../..';

const onlyFoo = {
  foo: 'machin',
};
const onlyBar = {
  bar: 'bidule',
};
const foo = {
  foo: 'machin',
  expected: { bolo: async () => 'await bolo' },
};
const bar = {
  bar: 'bidule',
  expected: { toto: async () => 'await toto' },
};

describe('Example Test', () => {
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

  it('Testing the mixBases without an expected property/object', () => {
    expect(expectOnly).toStrictEqual({ foo: 'machin', bar: 'bidule' });
    // console.log('at expectOnly:', expectOnly);
    // at expectOnly: { foo: 'machin', bar: 'bidule' }
  });

  /**
   * Testing the mixBases with an expected
   * property/object but discaring it
   * @example
   *    const expect: {
   *      foo: string;
   *      bar: string;
   *    }
   */
  const expects = { ...mixBases(foo, bar) };

  it(' Testing the mixBases with an expected property/object but discaring it', () => {
    expect(expects).toStrictEqual({ foo: 'machin', bar: 'bidule' });
    // console.log('at expect:', expects);
    // at expect: { foo: 'machin', bar: 'bidule' }
  });

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

  it('Testing the mixExpected keeping expected sub module (property/object) but discaring base properties.', () => {
    expect({
      expected: { bolo: expected.bolo(), toto: expected.toto() },
    }).toStrictEqual({
      expected: {
        bolo: Promise.resolve('await bolo'),
        toto: Promise.resolve('await toto'),
      },
    });
    // console.log('at expects1:', expects1);
    // at expects1: {
    //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
    // }
  });

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

  it('Gradually reshaping the output type infered keeping the same value.', () => {
    expect({ bolo: expected.bolo(), toto: expected.toto() }).toStrictEqual({
      bolo: Promise.resolve('await bolo'),
      toto: Promise.resolve('await toto'),
    });
    // console.log('at expected:', expected);
    // at expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
  });
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

  it('Gradually reshaping the output type infered keeping the same value.', () => {
    expect({
      expected: {
        bolo: expectedFinal.expected.bolo(),
        toto: expectedFinal.expected.toto(),
      },
    }).toStrictEqual({
      expected: {
        bolo: Promise.resolve('await bolo'),
        toto: Promise.resolve('await toto'),
      },
    });
    // console.log('at expectedFinal:', expectedFinal);
    // at expectedFinal: {
    //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
    // }
  });

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

  it('Gradually reshaping the output type infered keeping the same value.', () => {
    expect({
      bar: 'bidule',
      foo: 'machin',
      expected: {
        bolo: expectBoth.expected.bolo(),
        toto: expectBoth.expected.toto(),
      },
    }).toStrictEqual({
      bar: 'bidule',
      foo: 'machin',
      expected: {
        bolo: Promise.resolve('await bolo'),
        toto: Promise.resolve('await toto'),
      },
    });
    // console.log('at expectBoth:', expectBoth);
    // at expectBoth: {
    //    foo: 'machin',
    //    bar: 'bidule',
    //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
    // }
  });
});

// export {};
// describe('Example Test', () => {
//   it.skip('correctly runs a test', () => {
//     expect(true).toBeTruthy();
//   });
// });

// const onlyFoo = {
//   foo: 'machin',
// };
// const onlyBar = {
//   bar: 'bidule',
// };
// const foo = {
//   foo: 'machin',
//   expected: { bolo: (async () => 'await bolo')() },
// };
// const bar = {
//   bar: 'bidule',
//   expected: { toto: (async () => 'await toto')() },
// };

// describe('Testing the mixBases without an expected property/object', () => {
//   const expectOnly = {
//     ...mixBases<any, any, { foo: string }, { bar: string }>(onlyFoo, onlyBar),
//   };

//   /**
//  * Testing the mixExpected keeping expected sub module
//  * (property/object) but discaring base properties.
//  * @remarks
//  * Giving its final shape (type wise) for the outpput
//  * @example
//  *    const expectedFinal: {
//  *        expected: {
//  *            bolo: Promise<string>;
//  *            toto: Promise<string>;
//  *        };
//  *    }
//  */
// const expectedFinal = { expected: { ...expected } };
// console.log('at expectedFinal:', expectedFinal);
// // at expectedFinal: {
// //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// // }
//   it.skip('correctly runs a test', () => {
//     /**
//      * Testing the mixBases without an expected property/object
//      * @example
//      *    const expectOnly: {
//      *      foo: string;
//      *      bar: string;
//      *    }
//      */

//     expect(expectOnly).toBe({ foo: 'machin', bar: 'bidule' });
//     // at expectOnly: { foo: 'machin', bar: 'bidule' }
//     // console.log('at expectOnly:', expectOnly);
//   });
//   /**
//    * Merging both part into a new single object
//    * @example
//    *    const expectBoth: {
//    *        expected: {
//    *            bolo: Promise<string>;
//    *            toto: Promise<string>;
//    *        };
//    *        foo: string;
//    *        bar: string;
//    *    }
//    */

//   const expectBoth = { ...expectOnly, ...expectedFinal };

//   it.skip('correctly runs a test', () => {
//     /**
//      * Testing the mixBases without an expected property/object
//      * @example
//      *    const expectOnly: {
//      *      foo: string;
//      *      bar: string;
//      *    }
//      */

//     expect(expectBoth).toBe({
//       foo: 'machin',
//       bar: 'bidule',
//       expected:
//         "{ bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' }}",
//     });
//     // at expectBoth: {
//     //    foo: 'machin',
//     //    bar: 'bidule',
//     //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
//     // }
//     // console.log('at expectBoth:', expectBoth);
//   });

// /**
//  * Testing the mixExpected keeping expected sub module
//  * (property/object) but discaring base properties.
//  * @example
//  *    const expects1: {
//  *        expected: {
//  *            bolo: Promise<string>;
//  *        } & {
//  *            toto: Promise<string>;
//  *        };
//  *    }
//  */
// const expects1 = mixExpected(foo, bar);
// console.log('at expects1:', expects1);
// // at expects1: {
// //    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// // }

// /**
//  * Testing the mixExpected keeping expected sub module
//  * (property/object) but discaring base properties.
//  * @remarks
//  * Gradually reshaping the output type infered keeping the same value.
//  * @example
//  *     const expected: {
//  *         bolo: Promise<string>;
//  *     } & {
//  *         toto: Promise<string>;
//  *     }
//  */
// const expected = expects1.expected;
// console.log('at expected:', expected);
// // at expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }

//   it.skip('correctly runs a test', () => {
//     /**
//      * Testing the mixBases with an expected
//      * property/object but discaring it
//      * @example
//      *    const expect: {
//      *      foo: string;
//      *      bar: string;
//      *    }
//      */
//     const expect2 = { ...mixBases(foo, bar) };
//     expect(expect2).toBe({ foo: 'machin', bar: 'bidule' });
//     // at expect: { foo: 'machin', bar: 'bidule' }
//     // console.log('at expect:', expect2);
//   });

//     it.skip('correctly runs a test', () => {

//     expect(expectOnly).toBe({ foo: 'machin', bar: 'bidule' });

//   });
// });
