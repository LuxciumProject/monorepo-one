import { isPromiseLike_TEST_ } from '../../../helpers/assertions/isPromiseLike';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(async () => await isPromiseLike_TEST_()).not.toThrow();
  });
});
