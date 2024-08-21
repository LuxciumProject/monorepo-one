import { createCustomPlaceholder } from './createCustomPlaceholder';

const ANSI_GREEN = '\u001B[32m';
const ANSI_RESET = '\u001B[0m';

/**
 * Creates a pass-through placeholder function.
 *
 * @param message - The message for the placeholder.
 * @returns A function that accepts any number of arguments and returns them as is.
 */
export function createPassThroughPlaceholder(
  message: string
): <T extends any[]>(...args: T) => T {
  return createCustomPlaceholder(`${message}`, false, true);
}
/**
 * Creates a pass-through logger placeholder.
 *
 * @param message - The message to be logged.
 * @returns A function that logs the given message and returns the same arguments passed to it.
 */
export function createPassThroughLoggerPlaceholder(
  message: string
): <T extends any[]>(...args: T) => T {
  return createCustomPlaceholder(`${message}`, true, true);
}
/**
 * Creates a value logger placeholder.
 *
 * @param message - The message to be logged.
 * @returns A function that logs the provided message along with any arguments passed to it.
 */
export function createValueLoggerPlaceholder(
  message: string
): <T extends any[]>(...args: T) => void {
  return createCustomPlaceholder(`${message}`, true, false);
}
/**
 * Creates a message placeholder.
 *
 * @param message - The message to be displayed.
 * @returns A function that accepts any number of arguments and does not return a value.
 */
export function createMessagePlaceholder(
  message: string
): <T extends any[]>(...args: T) => void {
  return createCustomPlaceholder(`${message}`, false, false);
}
/**
 * Creates a default placeholder function.
 * The function takes any number of arguments of type T and returns void.
 * If the caller's location can be determined from the stack trace, it includes the invocation file path in the message.
 * If the caller's location cannot be determined, it includes a default message.
 * @returns A placeholder function that does not perform any specific action.
 */
export function createDefaultPlaceholder(): <T extends any[]>(
  ...args: T
) => void {
  const err = new Error('Default Placeholder');
  const stack = err.stack?.split('\n');

  if (stack && stack.length > 2) {
    // The third line in the stack trace usually contains the caller's location
    const callerLine = stack[2];
    const match = /\((.*):\d+:\d+\)/.exec(callerLine);
    const validatedMatch =
      match && match.length > 1
        ? match[1]
        : 'Could not determine invocation file path.';

    let message: string;
    message = '';
    message = `Invoked from: ${ANSI_GREEN}${validatedMatch}${ANSI_RESET}`;
    message;
    validatedMatch;
    return createMessagePlaceholder(message);
  }
  return createMessagePlaceholder(
    'Could not determine invocation file path: Default Placeholder'
  );
}
