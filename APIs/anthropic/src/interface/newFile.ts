import { createInterface } from 'readline';
import { makeSystemBlock } from './cli-claude-hiaku-more';
import { sendMessage } from './sendMessage';

void (async () => {
  const prompt = 'You: ';
  let ctrlCPressed = false;
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
});
