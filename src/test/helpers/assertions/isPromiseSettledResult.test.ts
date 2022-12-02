import { isPromiseSettledResult_TEST_ } from '../../../helpers/assertions/isPromiseSettledResult';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(async () => await isPromiseSettledResult_TEST_()).not.toThrow();
  });
});
