import { settledLengts_TEST_ } from '../../../helpers/tools/settledLengts';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test settledLengts_TEST_', () => {
    expect(async () => await settledLengts_TEST_()).not.toThrow();
  });
});
