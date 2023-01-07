import { FULFILLED, REJECTED } from '../../../constants';
import {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', done => {
    expect(
      isPromiseFulfilledResult({
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
  it('Should pass the smoke test getFulfilledResults_TEST_', done => {
    expect(
      isPromiseRejectedResult({ status: REJECTED, reason: null })
    ).toBeTruthy();
    done();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', done => {
    expect(
      isPromiseSettledResult({ status: FULFILLED, value: null })
    ).toBeTruthy();
    done();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', done => {
    expect(
      isPromiseSettledResult({ status: REJECTED, reason: null })
    ).toBeTruthy();
    done();
  });
});
