import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { createInterface } from 'readline';

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '',
  organization: process.env.OPENAI_ORG_ID,
});

const openai = new OpenAIApi(configuration);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function processUserInput(input: string) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: input }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

rl.setPrompt('Enter your message: ');
rl.prompt();

rl.on('line', input => {
  processUserInput(input.trim());
});

rl.on('close', () => {
  console.log('Exiting...');
});
