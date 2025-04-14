#!/usr/bin/env -S npm run tsn -T
// filepath: /projects/monorepo-one/APIs/openai/src/setup-examples.ts

import { exec } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { promisify } from 'node:util';
import { getOpenAIClient } from './utils';

const asyncExec = promisify(exec);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise(resolve => rl.question(query, resolve));

/**
 * Main setup function
 */
async function main(): Promise<void> {
  console.log('📡 OpenAI Examples Setup 📡');
  console.log('--------------------------');

  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '..', '.env');
    const envExists = fs.existsSync(envPath);

    console.log(
      `\n✓ Checking for .env file: ${envExists ? 'Found' : 'Not found'}`
    );

    // Check for API key
    try {
      // Try to instantiate a client to check API key
      const client = getOpenAIClient();

      // Test if the client works by making a simple API call
      await client.models.list();
      console.log('✓ OpenAI API key is valid and working!');
    } catch (error) {
      console.log('✗ OpenAI API key is invalid or not set.');

      // Ask user to input API key
      const apiKey = await question(
        '\nPlease enter your OpenAI API key (or press Enter to skip): '
      );

      if (apiKey && apiKey.trim() !== '') {
        // Check if .env file exists and update it, or create it if it doesn't
        const envContent = envExists
          ? fs
              .readFileSync(envPath, 'utf-8')
              .replace(
                /^export OPENAI_API_KEY=.*$/m,
                `export OPENAI_API_KEY="${apiKey}"`
              )
          : `export OPENAI_API_KEY="${apiKey}"\n`;

        // Write the updated or new .env file
        fs.writeFileSync(envPath, envContent);
        console.log('✓ API key has been saved to .env file.');

        // Set the API key in the current environment
        process.env.OPENAI_API_KEY = apiKey;
      }
    }

    // List available examples
    console.log('\n📚 Available Examples:');
    const examplesDir = path.join(__dirname, 'examples');

    const exampleFiles = fs
      .readdirSync(examplesDir)
      .filter(file => file.endsWith('.ts'))
      .sort();

    exampleFiles.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file.replace('.ts', '')}`);
    });

    // Provide instructions on how to run examples
    console.log('\n🚀 How to run examples:');
    console.log(
      '  1. Make sure your API key is set in the .env file or export it directly:'
    );
    console.log('     export OPENAI_API_KEY="your-api-key-here"');
    console.log('  2. Run an example using ts-node:');
    console.log('     npx ts-node src/examples/example-name.ts');
    console.log('     OR');
    console.log(
      '     cd /projects/monorepo-one/APIs/openai && ts-node src/examples/example-name.ts\n'
    );

    // Ask if user wants to run an example now
    const runExample = await question(
      'Would you like to run an example now? (y/n): '
    );

    if (runExample.toLowerCase() === 'y') {
      const exampleNumber = await question(
        `Enter the number of the example to run (1-${exampleFiles.length}): `
      );
      const index = parseInt(exampleNumber, 10) - 1;

      if (index >= 0 && index < exampleFiles.length) {
        const examplePath = path.join('src', 'examples', exampleFiles[index]);
        console.log(`\nRunning example: ${exampleFiles[index]}`);
        console.log('------------------------');

        try {
          const { stdout, stderr } = await asyncExec(
            `cd ${path.join(__dirname, '..')} && npx ts-node ${examplePath}`
          );
          console.log(stdout);
          if (stderr) console.error(stderr);
        } catch (error: any) {
          console.error('Error running example:', error.message);
          if (error.stdout) console.log(error.stdout);
          if (error.stderr) console.error(error.stderr);
        }
      } else {
        console.log('Invalid example number.');
      }
    }
  } catch (error) {
    console.error('Setup error:', error);
  } finally {
    rl.close();
  }
}

main();
