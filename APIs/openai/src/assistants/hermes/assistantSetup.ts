// assistantSetup.ts

// Load environment variables from .env file
import dotenv from 'dotenv';
import OpenAI from 'openai';

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

// Define interfaces for configuration and responses
export interface AssistantConfig {
  apiKey: string;
  model: string;
  instructions: string;
  assistantId: string;
}

// Initialize OpenAI API client
export function initializeOpenAI(config: AssistantConfig): OpenAI {
  // Log the configuration for debugging (the API key is masked for security)
  console.log('Initializing OpenAI with config:', {
    ...config,
    apiKey: 'SECRET', // Intentional masking for development purposes
  });

  // Create a new OpenAI instance
  const openai = new OpenAI({
    apiKey: config.apiKey, // Use the actual API key
  });

  // Return the OpenAI instance
  return openai;
}

// Create an assistant with specific instructions
export function createAssistant(openai: OpenAI, config: AssistantConfig): void {
  // Log the creation process
  console.log('Creating assistant with model:', config.model);
  console.log('Instructions:', config.instructions);
  console.log('Using assistant ID:', config.assistantId);
  // Placeholder for creating an assistant
  // Define the assistant's behavior using config.model and config.instructions
  // Future implementation: Implement assistant creation logic
  // Placeholder to avoid TypeScript error
  void openai;
}

// Function to test the assistant with a simple "Hello, world!" message
export async function testHelloWorld(openai: OpenAI): Promise<void> {
  try {
    const response = await openai.chat.completions.create({
      model: CONFIG.model, // Use the model from the configuration
      messages: [{ role: 'user', content: 'Say hello, world!' }],
      user: CONFIG.assistantId, // Use the assistant ID for the request
    });

    console.log('Assistant response:', response.choices[0]?.message.content);
  } catch (error) {
    console.error('Error during Hello World test:', error);
  }
}

// Main function to execute the setup
export async function main(): Promise<void> {
  // Example configuration for the assistant
  const assistantConfig: AssistantConfig = {
    apiKey: CONFIG.apiKey || '',
    model: CONFIG.model,
    instructions: CONFIG.instructions,
    assistantId: CONFIG.assistantId,
  };

  // Initialize OpenAI API client
  const openai = initializeOpenAI(assistantConfig);

  // Create the assistant
  createAssistant(openai, assistantConfig);

  // Test the assistant with a "Hello, world!" prompt
  await testHelloWorld(openai);

  // Log completion of the setup process
  console.log('Assistant setup completed.');
}

// Execute the main function
main().catch(console.error);
