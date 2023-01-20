import { makeFulfillement } from '../../../functions/core/makeFulfillement';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test makeFulfillement', () => {
    expect(
      makeFulfillement({ value: 10, index: 0, transformStep: 1 })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 10,
    });
  });
  it('Should be resilient to an NaN index', () => {
    expect(
      makeFulfillement({ value: 10, index: Number.NaN, transformStep: 1 })
    ).toStrictEqual({
      // currentRejection: null,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 10,
    });
  });
});
