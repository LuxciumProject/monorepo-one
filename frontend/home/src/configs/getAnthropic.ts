import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

export const getAnthropic = (() => {
  let anthropic: Anthropic | null = null;
  return function getAnthropic() {
    if (anthropic === null) {
      config();
      anthropic = new Anthropic({
        apiKey: process.env['local_vscode'],
      });
    }
    return anthropic;
  };
})();
