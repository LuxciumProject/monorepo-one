import { REJECTED } from '../../constants';
import { SettledLeft } from '../../types';

/** @internal */
type MakeRejectionArgs = {
  reason: any;
  index: number;
  currentRejection: boolean;
};
/** @internal */

export function makeRejection({
  reason,
  index,
  currentRejection,
}: MakeRejectionArgs): SettledLeft {
  const result: SettledLeft = {
    status: REJECTED,
    reason,
    rejected: reason,
    fulfilled: null,
    currentRejection: currentRejection,
    recipeSteps: 0,
    index,
  };

  Object.defineProperty(result, 'rejected', {
    value: reason,
    enumerable: false,
  });
  return result;
}

export function makeRejection_TEST_() {
  console.log(`at: MAIN from ${__filename}`);
  console.log(
    makeRejection({ reason: 'any', index: 0, currentRejection: true })
  );
  return void 0;
}

// makeRejection_TEST_()
