import { isPromise } from '../../../helpers/assertions';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(isPromise((async () => 'promise')())).toBeTruthy();
  });

  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(isPromise(isPromise((() => 'promise')()))).toBeFalsy();
  });
});
