import { FULFILLED, REJECTED } from '../../../constants';
import { settledLengts } from '../../../helpers/tools';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      settledLengts([
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
    ).toStrictEqual({ fulfilled: 1, rejected: 0, settled: 1 });
  });
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      settledLengts([
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
    ).toStrictEqual({ fulfilled: 0, rejected: 1, settled: 1 });
  });
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      settledLengts([
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
    ).toStrictEqual({ fulfilled: 2, rejected: 2, settled: 4 });
  });
});
