import { FULFILLED, REJECTED } from '../../../constants';
import {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(
      isPromiseFulfilledResult({ status: FULFILLED, value: null })
    ).toBeTruthy();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(
      isPromiseRejectedResult({ status: REJECTED, reason: null })
    ).toBeTruthy();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(
      isPromiseSettledResult({ status: FULFILLED, value: null })
    ).toBeTruthy();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(
      isPromiseSettledResult({ status: REJECTED, reason: null })
    ).toBeTruthy();
  });
});
