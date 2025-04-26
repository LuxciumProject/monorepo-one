import { config } from 'dotenv';
import { zodResponseFormat } from 'openai/helpers/zod';
import OpenAI from 'openai/index';
import { z } from 'zod';
config();
const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathResponse = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

async function main() {
  const client = new OpenAI();
  const response_format = zodResponseFormat(MathResponse, 'math_response');

  const completion = await client.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: 'You are a helpful math tutor.' },
      { role: 'user', content: 'solve 8x + 31 = 2' },
    ],
    response_format,
  });

  console.dir(completion, { depth: 15 });

  const message = completion.choices[0]?.message;
  if (message?.parsed) {
    console.log(message.parsed.steps);
    console.log(`answer: ${message.parsed.final_answer}`);
  }

  console.dir({ response_format }, { depth: 15 });
}

main();
