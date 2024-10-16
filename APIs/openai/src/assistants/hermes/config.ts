// Load environment variables from .env file
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration Settings
const CONFIG = {
  apiKey: process.env.hermes_assistant_001,
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini-2024-07-18', // Default to gpt-4o-mini-2024-07-18
  instructions: 'You are an assistant that provides web development guidance.',
  assistantId: 'asst_iEBXASBBXaTW1B6YVkYR7N37', // Your Hermes Assistant ID
};

// Validate API key
if (!CONFIG.apiKey) {
  throw new Error('Missing environment variable: hermes_assistant_001');
}

export function getConfig() {}
