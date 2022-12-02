export {};
import { getRejectedResults_TEST_ } from '../../../helpers/tools/getRejectedResults';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test getRejectedResults_TEST_', () => {
    expect(async () => await getRejectedResults_TEST_()).not.toThrow();
  });
});
