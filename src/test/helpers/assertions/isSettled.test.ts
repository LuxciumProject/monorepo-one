import { isSettled_TEST_ } from "../../../helpers/assertions/isSettled_TEST_";

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(async () => await isSettled_TEST_()).not.toThrow();
  });
});
