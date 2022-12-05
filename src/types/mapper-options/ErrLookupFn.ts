import { OnlySideEffect } from '..';

/**
 * This function is a lifecycle hook inside the mapping tool which
 * will get trigered if a `currentRejection` arise on the current
 * iteration (inside of the Tranformation phase or the validation
 * phase).
 * @remarks
 * It will also reitarate any non `currentRejection` which
 * happened on a previous iteration indicated by the
 * `currentRejection` flag being turnd off (value of `false`).
 *
 * @param  reason - The reason provided by the catch clause
 * inside the mapping routine.
 * @param index - The zero based index provided by map or
 * similarly an index provided by the mapping routine.
 * @param currentRejection - Flag that indicates if the exception
 * was hapening on the curent iteration of the mapping routine or
 * if it was part of a previously raised exception that was already
 * part of the item currently being mapped from the ptovided collection.
 * @returns OnlySideEffect: Do not return any value is trigered syncrounously.
 * @public  */
export interface ErrLookupFn {
  (reason: any, index: number, currentRejection: boolean): OnlySideEffect;
}
