import { FULFILLED, REJECTED } from '../../../constants';
import {
  isSettled,
  isSettledLeft,
  isSettledRight,
} from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
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

  it('Should fail isSettledLeft with currentRejection: null', () => {
    expect(
      isSettledLeft({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      })
    ).toBe(false);
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
        reason: undefined,
        fulfilled: 10,
        rejected: null,
        currentRejection: null,
        transformStep: -1,
        index: -1,
      })
    ).toBe(true);
  });
});

export type SettledLeft_ = PromiseRejectedResult & {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  transformStep: number;
  currentRejection: true | false | undefined;
  index: number;
};

/*
  (
    typeof contender === 'object' &&
    contender !== null &&
    //
    'status' in contender &&
    'reason' in contender &&
    'currentRejection' in contender &&
    'transformStep' in contender &&
    typeof contender.transformStep === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    (('value' in contender && contender.value === undefined) ||
      !('value' in contender)) &&
    //
    REJECTED in contender &&
    FULFILLED in contender &&
    contender.fulfilled === null &&
    //
    contender.status === REJECTED &&
    contender.reason === contender[REJECTED] &&
    //
    (contender.currentRejection === true ||
      contender.currentRejection === false ||
      contender.currentRejection === undefined)
  )
 */
describe('Decompose isSettledLeft', () => {
  const mainContender = {
    status: 'rejected',
    reason: 'any',
    value: undefined,
    fulfilled: null,
    rejected: 'any',
    currentRejection: false,
    transformStep: -1,
    index: -1,
  };

  it('Should have typeof contender === "object"', () => {
    expect(typeof mainContender === 'object').toBe(true);
  });

  it('Should be contender !== null', () => {
    expect(mainContender !== null).toBe(true);
  });
  it('Should have "status" in contender', () => {
    expect('status' in mainContender).toBe(true);
  });
  it('Should have "reason" in contender', () => {
    expect('reason' in mainContender).toBe(true);
  });
  it('Should have "currentRejection" in contender', () => {
    expect('currentRejection' in mainContender).toBe(true);
  });
  it('Should have "transformStep" in contender', () => {
    expect('transformStep' in mainContender).toBe(true);
  });
  it('Should have typeof ontender.transformStep === "number"', () => {
    expect(typeof mainContender.transformStep === 'number').toBe(true);
  });
  it('Should have "index" in contender', () => {
    expect('index' in mainContender).toBe(true);
  });
  it('Should have typeof contender.index === "number"', () => {
    expect(typeof mainContender.index === 'number').toBe(true);
  });
  it('Should have FULFILLED in contender', () => {
    expect(FULFILLED in mainContender).toBe(true);
  });
  it('Should have REJECTED in contender', () => {
    expect(REJECTED in mainContender).toBe(true);
  });
  it('Should be contender.fulfilled === null', () => {
    expect(mainContender.fulfilled === null).toBe(true);
  });
  it('Should be contender.status === REJECTED', () => {
    expect(mainContender.status === REJECTED).toBe(true);
  });
  it('Should not have "value" in contender or value must be set to undefined', () => {
    expect(
      ('value' in mainContender && mainContender.value === undefined) ||
        !('value' in mainContender)
    ).toBe(true);
  });
  it('Should have identical values: contender.reason === contender[REJECTED]', () => {
    expect(mainContender.reason === mainContender[REJECTED]).toBe(true);
  });
  it('Should have contender.currentRejection === true false or undefined', () => {
    expect(
      mainContender.currentRejection === true ||
        mainContender.currentRejection === false ||
        mainContender.currentRejection === undefined
    ).toBe(true);
  });
});
