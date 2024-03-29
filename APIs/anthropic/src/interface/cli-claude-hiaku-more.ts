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

import { createInterface } from 'readline';
import { sendMessage } from './sendMessage';

const prompt = 'You: ';
let ctrlCPressed = false;
{
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt, // Display the prompt
  });

  let messages = [];
  // Start the application
  main();
  function main() {
    rl.prompt();
    rl.on('SIGINT', () => {
      if (!ctrlCPressed) {
        console.log('\nCTRL+C pressed. Press again to exit.');
        ctrlCPressed = true;
      } else {
        console.log('\nCTRL+C pressed twice. Exiting.');
        rl.close();
        process.exit();
      }
      // Set back the flag after 1.5 second
      setTimeout(() => {
        ctrlCPressed = false;
      }, 1500);
    })
      .on('close', () => {
        console.log('\nExiting chat...');
        rl.close();
        process.exit(10);
      })
      .on('line', async line => {
        const system_text = makeSystemBlock('');

        const previousMessages = await sendMessage(
          line.trim(),
          system_text,
          messages
        );
        messages = previousMessages;
        rl.prompt();
        // process.exit(10);
      });
  }

  process.on('SIGINT', () => {
    if (!ctrlCPressed) {
      console.log('\nCTRL+C pressed. Press again to exit.');
      ctrlCPressed = true;
    } else {
      console.log('\nCTRL+C pressed twice. Exiting.');
      rl.close();
      process.exit();
    }
    // Reset the flag after 1 second,
    // so the user has to press CTRL+C twice quickly
    setTimeout(() => {
      ctrlCPressed = false;
    }, 1000);
  });
  process.on('SIGTSTP', () => {
    console.log('\nExiting chat...');
    rl.close();
    process.exit(0);
  });
}

function makeSystemBlock(systemText: string) {
  return `
/**
* System prompt.
*
* A system prompt is a way of providing context and instructions to Claude, such
* as specifying a particular goal or role. See our
* [guide to system prompts](https://docs.anthropic.com/claude/docs/system-prompts).
*/
<SYSTEM>
  ${systemText}
</SYSTEM>
`
    .trim()
    .split('\n')
    .map(sysText => sysText.trim())
    .join('\n');
}
