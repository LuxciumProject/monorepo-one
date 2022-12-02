export {};
import { getFulfilledResults_TEST_ } from '../../../helpers/tools/getFulfilledResults';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getFulfilledResults_TEST_', () => {
    expect(async () => await getFulfilledResults_TEST_()).not.toThrow();
  });
});
