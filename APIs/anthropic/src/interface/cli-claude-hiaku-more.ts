#!/usr/bin/env ts-node
/**
 * This script is used to interact with the Anthropic AI API and create a chat interface with the "Claude" model.
 * It allows users to send messages and receive responses from the model.
 * The script takes command-line arguments to customize the behavior of the model.
 * It uses the yargs library for parsing command-line arguments and the readline library for interactive input.
 * The main function sets up the chat loop and handles user input.
 * The sendMessage function sends a user message to the Anthropic API and receives a response from the model.
 * The script also handles clean shutdown on signal when pressing CTRL+C twice in a row.
 */

// Import necessary modules
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { createInterface } from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { sendClaudeHaiku } from '../constants/models';
import { ModelReply } from '../messages/types';

// Load environment variables
config();

// Parse command-line arguments

/**
 * Command line arguments for the CLI tool.
 */
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

/**
 * Sends a message to the Anthropic API and logs the response.
 * @param user_text The text message to send.
 * @returns A Promise that resolves to void.
 */
async function sendMessage(user_text: string): Promise<void> {
  const client = new Anthropic({ apiKey: process.env['anthropic_k00'] });
  try {
    const resolvedArgv = await argv;
    // const client = ''
    const messages: ModelReply<'claude-3-haiku-20240307'> =
      await sendClaudeHaiku({
        client,
        system: '',
        user_text,
        user_prefix: '\nYou: ',
        assist_prefix: '\nClaude: ',
        max_tokens: resolvedArgv.max_tokens,
        user_id: argv['user_id'] || null,
        temperature: resolvedArgv.temperature,
        top_k: resolvedArgv.top_k,
        top_p: resolvedArgv.top_p,
      });

    // // Update session state with sent and received messages
    // sessionMessages.push(`You: ${content[0].text}`); // Sent message
    // sessionMessages.push(`Claude: ${messages.content[0].text}`); // Received messagebf

    console.log(`Claude: ${messages.content[0].text}`);
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error);
  }
}

const prompt = 'You: ';
let ctrlCPressed = false;
{
  // Create a readline interface for interactive input
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt, // Display the prompt
  });
  // Handle clean shutdown on signal when pressing CTRL+C twice in a row
  process.on('SIGINT', () => {
    if (!ctrlCPressed) {
      console.log('\nCTRL+C pressed. Press again to exit.');
      ctrlCPressed = true;
    } else {
      console.log('\nCTRL+C pressed twice. Exiting.');
      process.exit();
    }

    // Reset the flag after 1 second, so the user has to press CTRL+C twice quickly
    setTimeout(() => {
      ctrlCPressed = false;
    }, 1000);
  });
  process
    // .on('SIGINT', () => {
    //   rl.question('Are you sure you want to exit? (yes/no) ', answer => {
    //     if (answer.match(/^y(es)?$/i)) {
    //       console.log('\nExiting chat...');
    //       rl.close();
    //       process.exit(0);
    //     } else {
    //       rl.prompt();
    //     }
    //   });
    // })
    // Handle clean shutdown on signal when pressing CTRL+D
    .on('SIGTSTP', () => {
      console.log('\nExiting chat...');
      rl.close();
      process.exit(10);
    });

  // Session State to store chat messages
  // const sessionMessages: Anthropic.Messages.MessageParam[] = [];

  // Function to send message to Anthropic and receive a response

  // Main chat loop
  function main() {
    rl.prompt();

    rl.on('line', async line => {
      await sendMessage(line.trim());
      rl.prompt();
    });

    rl.on('SIGINT', () => {
      if (!ctrlCPressed) {
        console.log('\nCTRL+C pressed. Press again to exit.');
        ctrlCPressed = true;
      } else {
        console.log('\nCTRL+C pressed twice. Exiting.');
        rl.close();
        process.exit();
      }

      // Reset the flag after 1 second, so the user has to press CTRL+C twice quickly
      setTimeout(() => {
        ctrlCPressed = false;
      }, 1000);
    }).on('close', () => {
      console.log('\nExiting chat...');
      rl.close();
      process.exit(10);
    });
  }

  // Start the application
  main();
}
