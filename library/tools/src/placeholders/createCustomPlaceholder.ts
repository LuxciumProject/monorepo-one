/**
 * Creates a custom placeholder function.
 *
 * @param message - The message to log.
 * @param logArgs - Whether to log the arguments.
 * @param returnArgs - `true` to return the arguments.
 * @returns The arguments because `returnArgs` is `true`.
 */

export function createCustomPlaceholder(
  message: string,
  logArgs: boolean,
  returnArgs: true
): <T extends any[]>(...args: T) => T;
/**
 * Creates a custom placeholder function.
 *
 * @param message - The message to log.
 * @param logArgs - Whether to log the arguments.
 * @param returnArgs - `false` to not return the arguments.
 * @returns `void` because `returnArgs` is `false`.
 */
export function createCustomPlaceholder(
  message: string,
  logArgs: boolean,
  returnArgs: false
): <T extends any[]>(...args: T) => void;
/**
 * Creates a custom placeholder function.
 *
 * @param [message] - The message to log.
 * @param [logArgs] - Whether to log the arguments.
 * @param [returnArgs] - Whether to return the arguments.
 * @returns The arguments if `returnArgs` is `true`, otherwise `void`.
 */
export function createCustomPlaceholder(
  message?: string,
  logArgs?: boolean,
  returnArgs?: boolean
): <T extends any[]>(...args: T) => void;
/**
 * Creates a custom placeholder function.
 *
 * @param [message] - The message to log.
 * @param [logArgs] - Whether to log the arguments.
 * @param [returnArgs] - Whether to return the arguments.
 * @returns The arguments if `returnArgs` is `true`, otherwise `void`.
 */
export function createCustomPlaceholder(
  message = 'This is a placeholder function.',
  logArgs = false,
  returnArgs = false
) {
  return <T extends any[]>(...args: T): T | void => {
    // Log the message
    console.log(message);

    // Conditionally log the arguments
    if (logArgs) {
      console.dir(args);
    }

    // Conditionally return the arguments
    if (returnArgs) {
      return args;
    }

    return void null;
  };
}
