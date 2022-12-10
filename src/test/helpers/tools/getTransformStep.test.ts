import { FULFILLED, REJECTED } from '../../../constants';
import { getTransformStep } from '../../../helpers/tools';

describe('Function helper getTransformStep', () => {
  it('Should getTransformStep equal value from transformStep', async () => {
    expect(
      getTransformStep({
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 10,
        index: 0,
      })
    ).toBe(10);
  });
  it('Should getTransformStep equal default value on missing transformStep', async () => {
    expect(
      getTransformStep({
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        index: 0,
      })
    ).toBe(-1);
  });
  it('Should getTransformStep equal provided default value on missing transformStep', async () => {
    expect(
      getTransformStep(
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          index: 0,
        },
        14
      )
    ).toBe(14);
  });
});
