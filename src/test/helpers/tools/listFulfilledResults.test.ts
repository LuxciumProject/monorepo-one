export {};
import { listFulfilledResults_TEST_ } from '../../../helpers/tools/listFulfilledResults';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test listFulfilledResults_TEST_', () => {
    expect(async () => await listFulfilledResults_TEST_()).not.toThrow();
  });
});
