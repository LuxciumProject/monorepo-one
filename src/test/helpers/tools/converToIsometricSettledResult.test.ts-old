import { FULFILLED, REJECTED } from '../../../constants';
import { converToIsometricSettledResult } from '../../../helpers/tools';

describe('Sanity check Level 1 converToIsometricSettledResult', () => {
  it.each([
    [
      converToIsometricSettledResult([
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: 0,
        },
      ]),
      [
        {
          currentRejection: null,
          fulfilled: null,
          index: 0,
          reason: undefined,
          rejected: null,
          status: 'fulfilled',
          transformStep: -1,
          value: null,
        },
      ],
    ],
    [
      converToIsometricSettledResult([
        {
          status: REJECTED,
          reason: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: true,
          transformStep: 0,
          index: 0,
        },
      ]),
      [
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
      ],
    ],
    [
      converToIsometricSettledResult([
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
      ]),
      [
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
          currentRejection: null,
          fulfilled: null,
          index: 1,
          reason: undefined,
          rejected: null,
          status: 'fulfilled',
          transformStep: -1,
          value: null,
        },
        {
          currentRejection: null,
          fulfilled: null,
          index: 2,
          reason: undefined,
          rejected: null,
          status: 'fulfilled',
          transformStep: -1,
          value: null,
        },
        {
          currentRejection: undefined,
          fulfilled: null,
          index: 3,
          reason: null,
          rejected: null,
          status: 'rejected',
          transformStep: -1,
          value: undefined,
        },
      ],
    ],
  ])(
    'Should pass the smoke test fulfillementBlock',
    async (contender, expected) => {
      expect(contender).toStrictEqual(expected);
    }
  );
});
