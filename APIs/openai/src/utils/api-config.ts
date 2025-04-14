// filepath: /projects/monorepo-one/APIs/openai/src/utils/api-config.ts
import { config as dotenvConfig } from 'dotenv';
import * as fs from 'node:fs';
import * as path from 'node:path';
import OpenAI from 'openai';

/**
 * Load environment variables from .env file
 */
const loadEnv = () => {
  // Determine the project root directory
  let currentDir = __dirname;
  let rootDir = '';

  // Navigate up until we find the .env file or reach the filesystem root
  while (currentDir !== '/') {
    if (fs.existsSync(path.join(currentDir, '.env'))) {
      rootDir = currentDir;
      break;
    }
    currentDir = path.dirname(currentDir);
  }

  // If we found a .env file, load it
  if (rootDir) {
    dotenvConfig({ path: path.join(rootDir, '.env') });
  } else {
    // Look for .env in the main APIs/openai directory as a fallback
    const potentialPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(potentialPath)) {
      dotenvConfig({ path: potentialPath });
    }
  }
};

/**
 * Configure and return an OpenAI client instance
 * @returns Configured OpenAI client
 */
export const getOpenAIClient = (): OpenAI => {
  // Load environment variables
  loadEnv();

  // Check for API key from environment variable
  const apiKey = process.env.OPENAI_API_KEY;

  // Configure the OpenAI client
  if (apiKey) {
    return new OpenAI({ apiKey });
  } else {
    console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
    console.warn('Please set your API key using one of these methods:');
    console.warn('1. Add it to your .env file: OPENAI_API_KEY=your-api-key');
    console.warn(
      '2. Export it in your terminal: export OPENAI_API_KEY=your-api-key'
    );
    console.warn('3. Pass it directly to the OpenAI constructor');

    // Return a client that will produce a more helpful error message when used
    return new OpenAI({
      apiKey: 'missing-api-key-see-console-warning',
    });
  }
};

/**
 * Get the configured OpenAI model from environment or use default
 * @returns OpenAI model string
 */
export const getOpenAIModel = (): string => {
  loadEnv();
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
};

// Export a pre-configured OpenAI client instance
export const openai = getOpenAIClient();
