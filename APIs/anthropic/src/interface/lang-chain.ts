import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGroq } from '@langchain/groq';
import { config } from 'dotenv';
(async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  config();
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a helpful assistant'],
    ['human', '{input}'],
  ]);
  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const response = await chain.stream({
    input: 'Hello',
  });
  let res = '';
  for await (const item of response) {
    res += item;
    console.log('stream:', res);
  }

  return void 0;
})()
  .then(() => console.log('process.exit(0)'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
