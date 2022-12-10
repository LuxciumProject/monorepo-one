export {};
// /** @internal */
// export function reduceValueToSettled<T>(
//   item: T | (Settled<T> | PromiseSettledResult<T>),
//   index: number
// ): SettledLeft | SettledRight<T> {
//   if (isPromiseRejectedResult(item)) {
//     if (isSettledLeft(item)) {
//       return item;
//     }
//     const transformStep = getTransformStep(item, 0);
//     const { reason } = item;
//     return makeRejection({ reason, transformStep, index });
//   }
//   const [value, transformStep] = preTransform<T>(item);
//   return makeFulfillement<T>({ value, index, transformStep });
// }
