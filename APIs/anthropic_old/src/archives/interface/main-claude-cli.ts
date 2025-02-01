import { createInterface } from 'readline';

const prompt: string = 'You: ';

// Setup readline interface for interactive CLI
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});
export async function main() {
  try {
    rl.prompt();
    rl.on('line', async line => {
      console.log(`${prompt}${line.trim()}`);
      rl.prompt();
    });
  } catch (err) {
    throw new Error(err);
  }
}

main()
  .then(() => console.log('process.exit(0)'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
