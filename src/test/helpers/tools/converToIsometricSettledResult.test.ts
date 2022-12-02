import { converToIsometricSettledResult_TEST_ } from '../../../helpers/tools/converToIsometricSettledResult';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test converToIsometricSettledResult_TEST_', () => {
    expect(
      async () => await converToIsometricSettledResult_TEST_()
    ).not.toThrow();
  });
});
