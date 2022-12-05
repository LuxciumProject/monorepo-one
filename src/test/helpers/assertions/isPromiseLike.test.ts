import { isPromiseLike } from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(isPromiseLike((async () => 'promise')())).toBeTruthy();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(isPromiseLike({ then() {} })).toBeTruthy();
  });
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(isPromiseLike((() => 'promise')())).toBeFalsy();
  });
});
