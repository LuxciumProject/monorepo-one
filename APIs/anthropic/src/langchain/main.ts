import { AIMessage, HumanMessage } from '@langchain/core/messages';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { config } from 'dotenv';
import { getAnthropicChatModel } from './getAnthropicChatModel';

config();

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a world class technical documentation writer.'],
  ['user', '{input}'],
]);

const chatModel = getAnthropicChatModel('claude-3-haiku-20240307');
export const chatHistory = [
  new HumanMessage('Can LangSmith help test my LLM applications?'),
  new AIMessage('Yes!'),
];

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  const chain = prompt.pipe(chatModel);

  await historyAwareRetrieverChain.invoke({
    chat_history: chatHistory,
    input: 'Tell me how!',
  });

  const aIMessage = await chain.invoke({
    input: 'what is LangSmith?',
  });

  // const aIMessage = await chatModel.invoke('what is LangSmith?');

  console.dir({ aIMessage });
  return void 0;
})();
