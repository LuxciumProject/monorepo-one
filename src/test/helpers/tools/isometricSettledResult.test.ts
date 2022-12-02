export {};
import { isometricSettledResult_TEST_ } from '../../../helpers/tools/isometricSettledResult';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test isometricSettledResult_TEST_', () => {
    expect(async () => await isometricSettledResult_TEST_()).not.toThrow();
  });
});
