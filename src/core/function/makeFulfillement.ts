import { FULFILLED } from '../../constants';
import { SettledRight } from '../../types';

/** @internal */
type MakeFulfillementArgs<U> = {
  value: U;
  index: number;
  transformStep: number;
};

/** @internal */

export function makeFulfillement<U>({
  value,
  index,
  transformStep,
}: MakeFulfillementArgs<U>): SettledRight<U> {
  const result: SettledRight<U> = {
    status: FULFILLED,
    value,
    fulfilled: value,
    rejected: null,
    currentRejection: null,
    transformStep,
    index,
  };

  Object.defineProperty(result, 'fulfilled', {
    value,
    enumerable: false,
  });

  return result;
}
/* istanbul ignore next */
export function makeFulfillement_TEST_() {
  console.log(`at: makeFulfillement_TEST_ from ${__filename}`);
  console.log(makeFulfillement({ value: 10, index: 0, transformStep: 0 }));
  return void 0;
}

// makeFulfillement_TEST_()
