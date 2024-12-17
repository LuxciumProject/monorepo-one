/**
 * @module tools
 * @description Tools module for Anthropic API integration, providing utilities and services
 * for interacting with Anthropic's AI models and services.
 *
 * @packageDocumentation
 */

/**
 * Re-exports the {@link getAnthropic} function from the getAnthropic module.
 * This function provides a singleton instance of the Anthropic SDK client.
 *
 * @see {@link getAnthropic} For detailed function documentation
 * @see './getAnthropic' For source implementation
 *
 * @example
 * import { getAnthropic } from './tools';
 * const { anthropic, currentDate } = getAnthropic();
 */
export { getAnthropic } from './getAnthropic';
