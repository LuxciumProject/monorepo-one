// Filename: src/langchain/quickstart/01-basic-prompt-setup.ts
// Example of setting up a basic LLM chain using LangChain with the Anthropic model.

import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { config } from 'dotenv';
import { getAnthropicChatModel } from '../getAnthropicChatModel'; // Ensure this path is correct

config();
// Initialize the Chat Model with the specific Anthropic model
const chatModel = getAnthropicChatModel('claude-3-haiku-20240307');

// Create a prompt template to enhance input to the LLM
const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You are a world class technical documentation writer.'],
  ['user', '{input}'],
]);

// Create a simple LLM chain combining the prompt and the chat model
const llmChain = promptTemplate.pipe(chatModel);

// Add an output parser to convert the AIMessage to a string
const outputParser = new StringOutputParser();
const completeChain = llmChain.pipe(outputParser);

// Function to invoke the chain and ask a question
async function askQuestion(question: string) {
  const response = await completeChain.invoke({ input: question });
  console.log('Response:', response);
}
// Call the function with a question
askQuestion('What is LangSmith?');
