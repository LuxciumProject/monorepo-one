import { makeFulfillement } from './makeFulfillement';

/* istanbul ignore next */
export function makeFulfillement_TEST_() {
  console.log(`at: makeFulfillement_TEST_ from ${__filename}`);
  console.log(makeFulfillement({ value: 10, index: 0, transformStep: 0 }));
  return void 0;
}
