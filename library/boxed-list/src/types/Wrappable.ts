/**
 * All three shapes that `toArray` and friends accept.
 *
 *   Wrappable<string>
 *     → string           (bare value)
 *      | string[]        (flat array)
 *      | [string[]]      (1-tuple whose sole element is the flat array)
 *
 * ⚠  TVal must NOT itself be an array type; if it is, `[TVal[]]` and `TVal[]`
 *    become ambiguous at runtime and the predicate-based overloads must be used.
 */
export type Wrappable<TVal> = TVal | TVal[] | [TVal[]];
