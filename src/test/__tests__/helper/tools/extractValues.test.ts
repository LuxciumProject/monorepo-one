import { NULL_SYMBOL } from '../../../..';
import {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
} from '../../../../helpers/tools';
import { Settled } from '../../../../types';
filterLeft;
describe('filterLeft and filterRight', () => {
  it('should filterRight', done => {
    const settledArray: Settled<number>[] = [
      {
        status: 'fulfilled',
        value: 1,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 1,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 2,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 2,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 3,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 3,
        rejected: null,
        reason: undefined,
      },
    ];
    const expected = [
      {
        currentRejection: null,
        fulfilled: 1,
        index: -1,
        reason: undefined,
        rejected: null,
        status: 'fulfilled',
        transformStep: -1,
        value: 1,
      },
      {
        currentRejection: null,
        fulfilled: 2,
        index: -1,
        reason: undefined,
        rejected: null,
        status: 'fulfilled',
        transformStep: -1,
        value: 2,
      },
      {
        currentRejection: null,
        fulfilled: 3,
        index: -1,
        reason: undefined,
        rejected: null,
        status: 'fulfilled',
        transformStep: -1,
        value: 3,
      },
    ];
    const actual = filterRight(settledArray);
    expect(actual).toStrictEqual(expected);
    done();
  });

  it('should filterLeft', done => {
    const settledArray: Settled<number>[] = [
      {
        status: 'fulfilled',
        value: 1,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 1,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 2,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 2,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 3,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 3,
        rejected: null,
        reason: undefined,
      },
    ];
    const expected = [
      {
        currentRejection: false,
        fulfilled: null,
        index: -1,
        reason: 'value of any type',
        rejected: 'value of any type',
        status: 'rejected',
        transformStep: -1,
        value: undefined,
      },
      {
        currentRejection: false,
        fulfilled: null,
        index: -1,
        reason: 'value of any type',
        rejected: 'value of any type',
        status: 'rejected',
        transformStep: -1,
        value: undefined,
      },
    ];
    const actual = filterLeft(settledArray);
    expect(actual).toStrictEqual(expected);
    done();
  });
});

describe('extractSettledValues', () => {
  it('should extract fulfilled values and maintain original position', done => {
    const settledArray: Settled<number>[] = [
      {
        status: 'fulfilled',
        value: 1,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 1,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 2,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 2,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 3,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 3,
        rejected: null,
        reason: undefined,
      },
    ];
    const expected = [1, NULL_SYMBOL, 2, NULL_SYMBOL, 3];
    const actual = extractSettledValues(settledArray);
    expect(actual).toEqual(expected);
    //     // expect(actual).(expected);
    done();
  });
});

describe('extractFulfilledValues', () => {
  it('should extract fulfilled values', done => {
    const settledArray: Settled<number>[] = [
      {
        status: 'fulfilled',
        value: 1,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 1,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 2,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 2,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 3,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 3,
        rejected: null,
        reason: undefined,
      },
    ];
    const expected = [1, 2, 3];
    const actual = extractFulfilledValues(settledArray);
    expect(actual).toEqual(expected);
    //     // expect(actual).(expected);
    done();
  });
  it('should extract fulfilled values', done => {
    const settledArray: Settled<number>[] = [
      {
        status: 'fulfilled',
        value: 1,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 1,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 2,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 2,
        rejected: null,
        reason: undefined,
      },
      {
        status: 'rejected',
        reason: 'value of any type',
        currentRejection: false,
        transformStep: -1,
        index: -1,
        rejected: 'value of any type',
        fulfilled: null,
        value: undefined,
      },
      {
        status: 'fulfilled',
        value: 3,
        transformStep: -1,
        index: -1,
        currentRejection: null,
        fulfilled: 3,
        rejected: null,
        reason: undefined,
      },
    ];
    const expected = [1, 2, 3];
    const actual = extractFulfilledValues(settledArray);
    expect(actual).toEqual(expected);
    //     // expect(actual).(expected);
    done();
  });
  /**
   * [
    { item: 10 },
    { item: 20 },
    { item: 30 },
    { item: 40 }
  ]
   */
});
// describe('extractFulfilledValues', () => {
//   it('should extract fulfilled values', (done) => {
//     const settledArray = [
//       {
//         status: FULFILLED,
//         value: 1,
//         fulfilled: 1,
//         rejected: null,
//       },
//       {
//         status: REJECTED,
//         reason: new Error('some error'),
//         rejected: new Error('some error'),
//         fulfilled: null,
//       },
//       {
//         status: FULFILLED,
//         value: 2,
//         fulfilled: 2,
//         rejected: null,
//       },
//       {
//         status: FULFILLED,
//         value: null,
//         fulfilled: null,
//         rejected: null,
//       },
//       {
//         status: FULFILLED,
//         value: 3,
//         fulfilled: 3,
//         rejected: null,
//       },
//     ];
//     const expected = [1, 2, 3];
//     expect(actual).toEqual(expected);
//     // expected(actual).toBe(expected);
//     //  const actual = extractFulfilledValues
//   });
// });

/*
### `extractFulfilledValuesMaintainingPosition`

Extracts the fulfilled values from a given array of `Settled` objects and maintains the original position of the values in the array.

#### Syntax

`extractFulfilledValuesMaintainingPosition(settledArray: Settled<T>[]): any[]`

#### Parameters

- `settledArray`: An array of `Settled` objects.

#### Return value

An array of fulfilled values with the same length as `settledArray`, where each fulfilled value is placed in the same position as in `settledArray`. Any rejected values in `settledArray` are replaced with the `NULL_SYMBOL` constant.

### `extractFulfilledValues`

Extracts the fulfilled values from a given array of `Settled` objects.

#### Syntax

`extractFulfilledValues(settledArray: Settled<T>[]): T[]`

#### Parameters

- `settledArray`: An array of `Settled` objects.

#### Return value

An array of fulfilled values.
*/

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
