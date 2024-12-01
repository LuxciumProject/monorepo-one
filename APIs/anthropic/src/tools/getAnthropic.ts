import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

// Replace placeholders like {{INPUT_TEXT}} with real values,
// because the SDK does not support variables.
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

let count: number = -1;

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
