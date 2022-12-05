import { FULFILLED, REJECTED } from '../../../constants';
import { listFulfilledResults } from '../../../helpers/tools';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      listFulfilledResults([
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: 0,
          index: 0,
        },
      ])
    ).toStrictEqual([null]);
  });
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      listFulfilledResults([
        {
          status: REJECTED,
          reason: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: true,
          transformStep: 0,
          index: 0,
        },
      ])
    ).toStrictEqual([]);
  });

  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      listFulfilledResults([
        {
          status: REJECTED,
          reason: null,
        },
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: 0,
          index: 0,
        },
        {
          status: FULFILLED,
          value: null,
        },
        {
          status: REJECTED,
          reason: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: true,
          transformStep: 0,
          index: 0,
        },
      ])
    ).toStrictEqual([null, null]);
  });
});
