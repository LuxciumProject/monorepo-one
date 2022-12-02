import { isPromise_TEST_ } from '../../../helpers/assertions/isPromise';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(async () => await isPromise_TEST_()).not.toThrow();
  });
});
