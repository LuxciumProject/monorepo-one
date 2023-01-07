import { FULFILLED, REJECTED } from '../../../../constants';

// describe('The assertion function isSettled', () => {
//   it.skip('Should doSometing', async () => {
//     /* generateMappingAsync.test.ts*/
//   });
// });

// describe('The assertion function hasTransformStep', () => {
//   it.skip('Should doSometing', async () => {
//     /* generateMappingAsync.test.ts*/
//   });
// });

// describe('The assertion function isSettledRight', () => {
//   it.skip('Should doSometing', async () => {
//     /* generateMappingAsync.test.ts*/
//   });
// });

// describe('The assertion function isSettledLeft', () => {
//   it.skip('Should doSometing', async () => {
//     /* generateMappingAsync.test.ts*/
//   });
// });

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

  it('Should have typeof contender === "object"', done => {
    expect(typeof settledLeft === 'object').toBe(true);
    done();
  });

  it('Should be contender !== null', done => {
    expect(settledLeft !== null).toBe(true);
    done();
  });
  it('Should have "status" in contender', done => {
    expect('status' in settledLeft).toBe(true);
    done();
  });
  it('Should have "reason" in contender', done => {
    expect('reason' in settledLeft).toBe(true);
    done();
  });
  it('Should have "currentRejection" in contender', done => {
    expect('currentRejection' in settledLeft).toBe(true);
    done();
  });
  it('Should have "transformStep" in contender', done => {
    expect('transformStep' in settledLeft).toBe(true);
    done();
  });
  it('Should have typeof ontender.transformStep === "number"', done => {
    expect(typeof settledLeft.transformStep === 'number').toBe(true);
    done();
  });
  it('Should have "index" in contender', done => {
    expect('index' in settledLeft).toBe(true);
    done();
  });
  it('Should have typeof contender.index === "number"', done => {
    expect(typeof settledLeft.index === 'number').toBe(true);
    done();
  });
  it('Should have FULFILLED in contender', done => {
    expect(FULFILLED in settledLeft).toBe(true);
    done();
  });
  it('Should have REJECTED in contender', done => {
    expect(REJECTED in settledLeft).toBe(true);
    done();
  });
  it('Should be contender.fulfilled === null', done => {
    expect(settledLeft.fulfilled === null).toBe(true);
    done();
  });
  it('Should be contender.status === REJECTED', done => {
    expect(settledLeft.status === REJECTED).toBe(true);
    done();
  });
  it('Should not have "value" in contender or value must be set to undefined', done => {
    expect(
      ('value' in settledLeft && settledLeft.value === undefined) ||
        !('value' in settledLeft)
    ).toBe(true);
    done();
  });
  it('Should have identical values: contender.reason === contender[REJECTED]', done => {
    expect(settledLeft.reason === settledLeft[REJECTED]).toBe(true);
    done();
  });
  it('Should have contender.currentRejection === true false or undefined', done => {
    expect(
      settledLeft.currentRejection === true ||
        settledLeft.currentRejection === false ||
        settledLeft.currentRejection === undefined
    ).toBe(true);
    done();
  });
});
