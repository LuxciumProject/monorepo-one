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

{
  const prompt = 'You: ';
  let ctrlCPressed = false;
  {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt, // Display the prompt
    });
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
      process.exit(10);
    });
    void async function rlOnLine<L extends string = any>(line: L) {
      // wiil need to parse the and extract the meta information from the line
      // then send the message to the API via sendMessage function and then display the response.
      const parsedLine = line.trim();

      // in the line we will have the user message cointaining meta characters and meta commande to be parsed and extracted
      // The list of which is as follows:

      // 1. The user message
      // 2. The user prefix
      // 3. The system text will be inside the system_text variable with '' or "" or none [[<system_text=''>]]

      const system_text =
        parsedLine.match(/\[\[<system_text=(.*)>\]\]/)?.[1] || '';
      const user_message = parsedLine
        .replace(/\[\[<system_text=.*>\]\]/, '')
        .trim();
      await sendMessage(user_message, []);
      rl.prompt();
    };
    let messages = [];
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
      }).on('close', () => {
        console.log('\nExiting chat...');
        rl.close();
        process.exit(10);
      });
      rl.on('line', async line => {
        const previousMessages = await sendMessage(line.trim(), messages);
        messages = previousMessages;
        rl.prompt();
        // process.exit(10);
      });
    }

    // Start the application
    main();
  }
}
