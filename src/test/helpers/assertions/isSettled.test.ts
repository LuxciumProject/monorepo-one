import { FULFILLED, REJECTED } from '../../../constants';
import {
  isSettled,
  isSettledLeft,
  isSettledRight,
} from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
  // it('Should pass the smoke test getFulfilledResults_TEST_', () => {
  //   expect(async () => await isSettled_TEST_()).not.toThrow();
  // });
  isSettled;

  it('Should pass isSettled with a settledRight', () => {
    expect(
      isSettled({
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });

  it('Should pass isSettled with a isSettledLeft', () => {
    expect(
      isSettled({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: false,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });

  it('Should pass isSettledRight', () => {
    expect(
      isSettledRight({
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });

  it('Should pass isSettledLeft with currentRejection: true', () => {
    expect(
      isSettledLeft({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });

  it('Should pass isSettledLeft with currentRejection: false', () => {
    expect(
      isSettledLeft({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: false,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });

  it('Should pass isSettledLeft with currentRejection: undefined', () => {
    expect(
      isSettledLeft({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: undefined,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
  });
  it('Should pass isSettledRight', () => {
    expect(
      isSettledRight({
        status: 'fulfilled',
        value: 10,
        // reason: undefined,
        fulfilled: 10,
        rejected: null,
        currentRejection: null,
        transformStep: -1,
        index: -1,
      })
    ).toBe(true);
  });
});
describe('Decompose isSettledRight', () => {
  const mainContender = {
    status: 'fulfilled',
    value: 10,
    fulfilled: 10,
    rejected: null,
    currentRejection: null,
    transformStep: -1,
    index: -1,
  };

  it('Should have typeof contender === "object"', () => {
    expect(typeof mainContender === 'object').toBe(true);
  });

  it('Should have typeof contender === "object"', () => {
    expect(mainContender !== null).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect('status' in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect('value' in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect('currentRejection' in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect('transformStep' in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(typeof mainContender.transformStep === 'number').toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect('index' in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(typeof mainContender.index === 'number').toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(FULFILLED in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(REJECTED in mainContender).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(mainContender.rejected === null).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(mainContender.status === FULFILLED).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(mainContender.value === mainContender[FULFILLED]).toBe(true);
  });
  it('Should have typeof contender === "object"', () => {
    expect(mainContender.currentRejection === null).toBe(true);
  });
});

void async function isSettled_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    isSettledRight({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      transformStep: 0,
      index: 0,
    })
  );
  isSettledRight({
    status: 'fulfilled',
    value: 10,
    // reason: undefined,
    fulfilled: 10,
    rejected: null,
    currentRejection: null,
    transformStep: -1,
  }) &&
    // HACK: -------------------------------------------------------
    // process.exit(51);
    // BUG: --------------------------------------------------------
    console.log(
      isSettledLeft({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      })
    );

  console.log(
    isSettled({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      transformStep: 0,
      index: 0,
    })
  );
  console.log(
    isSettled({
      status: REJECTED,
      reason: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: true,
      transformStep: 0,
      index: 0,
    })
  );
  return void 0;
};

/*
export function isSettledRight<T>(
  contender: unknown
): contender is SettledRight<T> {
  return (
    typeof contender === 'object' &&
    contender !== null &&
    'status' in contender &&
    'value' in contender &&
    'currentRejection' in contender &&
    'transformStep' in contender &&
    typeof contender.transformStep === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    //
    FULFILLED in contender &&
    REJECTED in contender &&
    contender.rejected === null &&
    //
    contender.status === FULFILLED &&
    contender.value === contender[FULFILLED] &&
    //
    contender.currentRejection === null
  );
}
 */
