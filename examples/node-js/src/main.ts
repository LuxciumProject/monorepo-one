import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * Main is the internal code entry point it should be executed by
 * itself and MUST NOT BE IMPORTED FROM index.ts file
 */
void (async function MAIN() {
  const answer = await rl.question('What is your favorite food? ');
  console.log(`Oh, so your favorite food is ${answer}`);
  rl.close();
  return void 0;
})();
