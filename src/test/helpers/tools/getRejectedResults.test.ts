import { FULFILLED, REJECTED } from '../../../constants';
import { getRejectedResults } from '../../../helpers/tools';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      getRejectedResults([
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
    ).toStrictEqual([]);
  });

  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      getRejectedResults([
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
    ).toStrictEqual([
      {
        currentRejection: undefined,
        fulfilled: null,
        index: 0,
        reason: null,
        rejected: null,
        status: 'rejected',
        transformStep: -1,
        value: undefined,
      },
    ]);
  });

  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(
      getRejectedResults([
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
    ).toStrictEqual([
      {
        currentRejection: undefined,
        fulfilled: null,
        index: 0,
        reason: null,
        rejected: null,
        status: 'rejected',
        transformStep: -1,
        value: undefined,
      },
      {
        currentRejection: undefined,
        fulfilled: null,
        index: 1,
        reason: null,
        rejected: null,
        status: 'rejected',
        transformStep: -1,
        value: undefined,
      },
    ]);
  });
});
