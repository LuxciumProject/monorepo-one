import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

/**
 * The current date formatted as 'Month Day, Year'.
 * @example
 * 'October 10, 2024'
 */
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/**
 * Counter to track the number of times `getAnthropic` is called.
 */
let count: number = -1;

/**
 * Provides an instance of the Anthropic SDK and the current date.
 * This function is a singleton, ensuring only one instance of the SDK is created.
 *
 * @param env_anthropic_api_key - The environment variable key for the Anthropic API key. Defaults to 'vscode_home_dev_anthropic'.
 * @returns An object containing the Anthropic SDK instance and the current date.
 *
 * @example
 * const { anthropic, currentDate } = getAnthropic();
 * console.log(currentDate); // 'October 10, 2023'
 */
export const getAnthropic = (() => {
  let anthropic: Anthropic | null = null;
  console.log('getAnthropic seted', ++count + 1);
  return function getAnthropic(
    env_anthropic_api_key = 'vscode_home_dev_anthropic'
  ): {
    anthropic: Anthropic;
    currentDate: string;
  } {
    if (anthropic === null) {
      config();
      count++;
      anthropic = new Anthropic({
        apiKey: process.env[env_anthropic_api_key],
      });
    }
    console.info('getAnthropic Requested', count);
    return { anthropic, currentDate };
  };
})();
