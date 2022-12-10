export {};
// /** @beta */
// export function getFulfilledResults<T>(
//   collection: Collection<T> //  Array<Settled<T> | PromiseSettledResult<T>>
// ): SettledRight<T>[] {
//   // TODO: ===========================================================
//   // BUG: Should also take care or rejected values
//   const result = [...collection]
//     .map(reduceValueToSettled)
//     .filter(
//       (item) /* : item is PromiseFulfilledResult<T> */ =>
//         item.status === FULFILLED && typeof item.value !== 'undefined'
//     );

//   return converToIsometricSettledResult(result);
// }
