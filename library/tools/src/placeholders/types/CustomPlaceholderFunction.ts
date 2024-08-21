/**
 * Represents a custom placeholder function.
 *
 * @param message - An optional message to be logged.
 * @param logArgs - A boolean indicating whether to log the arguments.
 * @param returnArgs - A boolean indicating whether to return the arguments.
 * @template T - The type of arguments that the function accepts.
 * @returns A function that accepts arguments of type T and returns either T or void.
 */
export type CustomPlaceholderFunction = (
  message?: string,
  logArgs?: boolean,
  returnArgs?: boolean
) => <T extends any[]>(...args: T) => T | void;
