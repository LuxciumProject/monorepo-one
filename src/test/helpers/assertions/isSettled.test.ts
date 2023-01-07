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

  it('Should pass isSettled with a settledRight', done => {
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
    done();
  });

  it('Should pass isSettled with a isSettledLeft', done => {
    expect(
      isSettled({
        status: REJECTED,
        value: undefined,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: false,
        transformStep: 0,
        index: 0,
      })
    ).toBe(true);
    done();
  });

  it('Should pass isSettledRight', done => {
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
    done();
  });

  it('Should pass isSettledLeft with currentRejection: true', done => {
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
    done();
  });

  it('Should pass isSettledLeft with currentRejection: false', done => {
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
    done();
  });

  it('Should pass isSettledLeft with currentRejection: undefined', done => {
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
    done();
  });
  it('Should pass isSettledRight', done => {
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
    done();
  });
  it('Should fail isSettledLeft with a settledRight', done => {
    expect(
      isSettledLeft({
        status: 'fulfilled',
        value: 10,
        // reason: undefined,
        fulfilled: 10,
        rejected: null,
        currentRejection: null,
        transformStep: -1,
        index: -1,
      })
    ).toBe(false);
    done();
  });
  it('Should fail isSettledRight with a settledLeft', done => {
    expect(
      isSettledRight({
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: false,
        transformStep: 0,
        index: 0,
      })
    ).toBe(false);
    done();
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

  it('Should have typeof contender === "object"', done => {
    expect(typeof mainContender === 'object').toBe(true);
    done();
  });

  it('Should have typeof contender === "object"', done => {
    expect(mainContender !== null).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect('status' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect('value' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect('currentRejection' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect('transformStep' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(typeof mainContender.transformStep === 'number').toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect('index' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(typeof mainContender.index === 'number').toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(FULFILLED in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(REJECTED in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(mainContender.rejected === null).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(mainContender.status === FULFILLED).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(mainContender.value === mainContender[FULFILLED]).toBe(true);
    done();
  });
  it('Should have typeof contender === "object"', done => {
    expect(mainContender.currentRejection === null).toBe(true);
    done();
  });
});

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

  it('Should have typeof contender === "object"', done => {
    expect(typeof mainContender === 'object').toBe(true);
    done();
  });

  it('Should be contender !== null', done => {
    expect(mainContender !== null).toBe(true);
    done();
  });
  it('Should have "status" in contender', done => {
    expect('status' in mainContender).toBe(true);
    done();
  });
  it('Should have "reason" in contender', done => {
    expect('reason' in mainContender).toBe(true);
    done();
  });
  it('Should have "currentRejection" in contender', done => {
    expect('currentRejection' in mainContender).toBe(true);
    done();
  });
  it('Should have "transformStep" in contender', done => {
    expect('transformStep' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof ontender.transformStep === "number"', done => {
    expect(typeof mainContender.transformStep === 'number').toBe(true);
    done();
  });
  it('Should have "index" in contender', done => {
    expect('index' in mainContender).toBe(true);
    done();
  });
  it('Should have typeof contender.index === "number"', done => {
    expect(typeof mainContender.index === 'number').toBe(true);
    done();
  });
  it('Should have FULFILLED in contender', done => {
    expect(FULFILLED in mainContender).toBe(true);
    done();
  });
  it('Should have REJECTED in contender', done => {
    expect(REJECTED in mainContender).toBe(true);
    done();
  });
  it('Should be contender.fulfilled === null', done => {
    expect(mainContender.fulfilled === null).toBe(true);
    done();
  });
  it('Should be contender.status === REJECTED', done => {
    expect(mainContender.status === REJECTED).toBe(true);
    done();
  });
  it('Should not have "value" in contender or value must be set to undefined', done => {
    expect(
      ('value' in mainContender && mainContender.value === undefined) ||
        !('value' in mainContender)
    ).toBe(true);
    done();
  });
  it('Should have identical values: contender.reason === contender[REJECTED]', done => {
    expect(mainContender.reason === mainContender[REJECTED]).toBe(true);
    done();
  });
  it('Should have contender.currentRejection === true false or undefined', done => {
    expect(
      mainContender.currentRejection === true ||
        mainContender.currentRejection === false ||
        mainContender.currentRejection === undefined
    ).toBe(true);
    done();
  });
});
