import { FULFILLED, REJECTED } from '../../../../constants';

describe('The assertion function isSettled', () => {
  it.skip('Should doSometing', async () => {
    /* generateMappingAsync.test.ts*/
  });
});

describe('The assertion function hasTransformStep', () => {
  it.skip('Should doSometing', async () => {
    /* generateMappingAsync.test.ts*/
  });
});

describe('The assertion function isSettledRight', () => {
  it.skip('Should doSometing', async () => {
    /* generateMappingAsync.test.ts*/
  });
});

describe('The assertion function isSettledLeft', () => {
  it.skip('Should doSometing', async () => {
    /* generateMappingAsync.test.ts*/
  });
});

describe('Decompose isSettledLeft', () => {
  const settledLeft = {
    status: 'rejected',
    reason: 'any',
    currentRejection: false,
    transformStep: -1,
    index: -1,
    fulfilled: null,
    rejected: 'any',
    value: undefined,
  };

  it('Should have typeof contender === "object"', () => {
    expect(typeof settledLeft === 'object').toBe(true);
  });

  it('Should be contender !== null', () => {
    expect(settledLeft !== null).toBe(true);
  });
  it('Should have "status" in contender', () => {
    expect('status' in settledLeft).toBe(true);
  });
  it('Should have "reason" in contender', () => {
    expect('reason' in settledLeft).toBe(true);
  });
  it('Should have "currentRejection" in contender', () => {
    expect('currentRejection' in settledLeft).toBe(true);
  });
  it('Should have "transformStep" in contender', () => {
    expect('transformStep' in settledLeft).toBe(true);
  });
  it('Should have typeof ontender.transformStep === "number"', () => {
    expect(typeof settledLeft.transformStep === 'number').toBe(true);
  });
  it('Should have "index" in contender', () => {
    expect('index' in settledLeft).toBe(true);
  });
  it('Should have typeof contender.index === "number"', () => {
    expect(typeof settledLeft.index === 'number').toBe(true);
  });
  it('Should have FULFILLED in contender', () => {
    expect(FULFILLED in settledLeft).toBe(true);
  });
  it('Should have REJECTED in contender', () => {
    expect(REJECTED in settledLeft).toBe(true);
  });
  it('Should be contender.fulfilled === null', () => {
    expect(settledLeft.fulfilled === null).toBe(true);
  });
  it('Should be contender.status === REJECTED', () => {
    expect(settledLeft.status === REJECTED).toBe(true);
  });
  it('Should not have "value" in contender or value must be set to undefined', () => {
    expect(
      ('value' in settledLeft && settledLeft.value === undefined) ||
        !('value' in settledLeft)
    ).toBe(true);
  });
  it('Should have identical values: contender.reason === contender[REJECTED]', () => {
    expect(settledLeft.reason === settledLeft[REJECTED]).toBe(true);
  });
  it('Should have contender.currentRejection === true false or undefined', () => {
    expect(
      settledLeft.currentRejection === true ||
        settledLeft.currentRejection === false ||
        settledLeft.currentRejection === undefined
    ).toBe(true);
  });
});
