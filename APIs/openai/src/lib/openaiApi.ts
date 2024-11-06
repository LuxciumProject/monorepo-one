import { config } from 'dotenv';
import OpenAI from 'openai';

// Define the current date in "Month Day, Year" format
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

let count: number = -1;
export const getOpenAI = (() => {
  let openai: OpenAI | null = null;
  console.log('getOpenAI seted', ++count + 1);
  return function getOpenAI(
    env_openai_api_key = 'OPENAI_API_KEY', // Update default to OpenAI key
  ): {
    openai: OpenAI;
    currentDate: string;
  } {
    if (openai === null) {
      config();
      count++;
      openai = new OpenAI({
        apiKey: process.env[env_openai_api_key] || '',       // Use OpenAI key
        organization: 'org-oRSwCHJ3NyxhXwj7dZ9zn4YH', // process.env['OPENAI_ORG_ID'], // Include organization ID if present
      });
    }
    console.info('getOpenAI Requested', count);
    return { openai, currentDate };
  };
})();
