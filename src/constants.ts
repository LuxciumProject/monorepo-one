/**
 * Constant `FULFILLED` is used in place of the string `'fulfilled'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const FULFILLED: 'fulfilled' = 'fulfilled' as const;

/**
 * Constant `REJECTED` is used in place of the string `'rejected'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const REJECTED: 'rejected' = 'rejected' as const;

/**
 * Constant `NULL_SYMBOL` is a unique symbol that represents `null` or a union type that includes `null`.
 * @public
 */
export const NULL_SYMBOL: unique symbol = Symbol.for('NULL_SYMBOL');
