import { expect } from 'chai';
import {
  FULFILLED,
  NULL_SYMBOL,
  REJECTED,
  extractFulfilledValues,
  extractFulfilledValuesMaintainingPosition,
} from './your-module';

describe('extractFulfilledValuesMaintainingPosition', () => {
  it('should extract fulfilled values and maintain original position', () => {
    const settledArray = [
      {
        status: FULFILLED,
        value: 1,
        fulfilled: 1,
        rejected: null,
      },
      {
        status: REJECTED,
        reason: new Error('some error'),
        rejected: new Error('some error'),
        fulfilled: null,
      },
      {
        status: FULFILLED,
        value: 2,
        fulfilled: 2,
        rejected: null,
      },
      {
        status: FULFILLED,
        value: null,
        fulfilled: null,
        rejected: null,
      },
      {
        status: FULFILLED,
        value: 3,
        fulfilled: 3,
        rejected: null,
      },
    ];
    const expected = [1, NULL_SYMBOL, 2, NULL_SYMBOL, 3];
    const actual = extractFulfilledValuesMaintainingPosition(settledArray);
    expect(actual).to.deep.equal(expected);
  });
});

describe('extractFulfilledValues', () => {
  it('should extract fulfilled values', () => {
    const actual = extractFulfilledValues([
      {
        status: FULFILLED,
        value: 1,
        fulfilled: 1,
        rejected: null,
      },
      {
        status: REJECTED,
        reason: new Error('some error'),
        rejected: new Error('some error'),
        fulfilled: null,
      },
      {
        status: FULFILLED,
        value: 2,
        fulfilled: 2,
        rejected: null,
      },
      {
        status: FULFILLED,
        value: null,
        fulfilled: null,
        rejected: null,
      },
      {
        status: FULFILLED,
        value: 3,
        fulfilled: 3,
        rejected: null,
      },
    ]);
    const expected = [1, 2, 3];
    expect(actual).to.deep.equal(expected);
  });
});

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
