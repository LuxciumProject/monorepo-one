// Filename: 01-basic-prompt-setup.ts
// This file demonstrates the basic setup of a prompt in LangChain.

import { ChatPromptTemplate } from '@langchain/core/prompts';

// Creating a basic prompt template
const basicPrompt = ChatPromptTemplate.fromMessages([
  ['human', 'What is your name?'],
  ['bot', 'I am a LangChain bot, pleased to meet you!'],
]);

// Invoke the prompt and log the output
async function displayPrompt() {
  const promptValue = await basicPrompt.invoke({});
  console.log(promptValue.toString());
}

displayPrompt();
