#!/usr/bin/env ts-node
// Import necessary modules
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { createInterface } from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { sendClaudeHaiku } from '../constants/models';
import { create } from '../messages';

// Load environment variables
config();

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .option('max_tokens', {
    alias: 'm',
    describe: 'The maximum number of tokens to generate',
    type: 'number',
    default: 1024,
  })
  .option('user_id', {
    alias: 'u',
    describe: 'User ID for personalized responses',
    type: 'string',
  })
  .option('temperature', {
    alias: 't',
    describe: 'Controls randomness of the response',
    type: 'number',
    default: 0.95,
  })
  .option('top_k', {
    alias: 'k',
    describe: 'Filters the most likely next tokens',
    type: 'number',
  })
  .option('top_p', {
    alias: 'p',
    describe: 'Nucleus sampling',
    type: 'number',
  })
  .help()
  .alias('help', 'h').argv;

// Initialize Anthropic client
const client = new Anthropic({ apiKey: process.env['anthropic_k00'] });

// Create a readline interface for interactive input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: ',
});

// Handle clean shutdown on signal
process.on('SIGINT', () => {
  console.log('\nExiting chat...');
  rl.close();
  process.exit(0);
});

// Function to send message to Anthropic and receive a response
async function sendMessage(
  user_text: string,
  system_instruction: string = ''
): Promise<void> {
  try {
    const user_id: string | null = argv['user_id'] || null;

    const resolvedArgv = await argv;
    const messages = await sendClaudeHaiku({
      client,
      user_text: `You: ${user_text}`,
      assist_text: 'Claude: ',
      system: system_instruction,
      user_id,
      max_tokens: resolvedArgv.max_tokens || 1024,
      temperature: resolvedArgv.temperature || 0.95,
      top_k: resolvedArgv.top_k || undefined,
      top_p: resolvedArgv.top_p || undefined,
    });
    // const messages = await client.messages.create({
    //   model: 'claude-3-haiku-20240307',
    //   messages: [content],

    // });

    create.userMessage(user_text);
    console.log(`Claude: ${messages.content[0].text}`);
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error);
  }
}

// Main chat loop
function main() {
  rl.prompt();

  rl.on('line', async line => {
    await sendMessage(line.trim());
    rl.prompt();
  });
}

// Start the application
main();

/*
  const messages = await haiku({
    client,
    user_text: userText,
    assist_text: assistPrimer,
    system: system_instruction,
  });
 */
