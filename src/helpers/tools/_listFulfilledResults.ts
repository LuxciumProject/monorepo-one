export {};
// type Collection<T> = Array<Settled<T> | PromiseSettledResult<T>>;

// /** @beta */
// export async function listFulfilledResults<T>(
//   collection: Collection<T> | PromiseLike<Collection<T>> //  Array<Settled<T> | PromiseSettledResult<T>>
// ) {
//   // TODO: ===========================================================

//   const values = isPromiseLike(collection) ? await collection : collection;
//   return getFulfilledResults(values).flatMap(item => item.value);
// }
