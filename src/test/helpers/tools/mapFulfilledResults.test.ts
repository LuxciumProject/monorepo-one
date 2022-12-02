import { mapFulfilledResults } from '../../../helpers/tools';

describe('Sanity check Level 1', () => {
  it('Should NOT pass the smoke test mapFulfilledResults', () => {
    expect(() => mapFulfilledResults()).toThrow();
  });
});
