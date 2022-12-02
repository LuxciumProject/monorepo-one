import { makeFulfillement } from '../../../core/function/makeFulfillement';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test makeFulfillement', () => {
    expect(makeFulfillement({ value: 10, index: 0, recipeSteps: 0 })).toStrictEqual({"currentRejection": null, "index": 0, "recipeSteps": 0, "rejected": null, "status": "fulfilled", "value": 10});
  });
});
