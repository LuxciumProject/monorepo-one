import { createInterface } from 'readline';

// Define possible completions
const commandCompletions = ['add', 'commit', 'push', 'pull', 'status'];

// Custom completer function
const completer = (line: string) => {
  const hits = commandCompletions.filter(c => c.startsWith(line));
  return [hits.length ? hits : commandCompletions, line];
};

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  completer,
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', line => {
  console.log(`Command received: ${line}`);
  rl.close();
});
