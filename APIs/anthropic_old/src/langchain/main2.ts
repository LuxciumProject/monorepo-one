import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { configDotenv } from 'dotenv';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { getAnthropicChatModel } from './getAnthropicChatModel';
import { getOpenAIEmbeddings } from './getOpenAIEmbeddings';
configDotenv();

// const outputParser = new StringOutputParser();

// const prompt = ChatPromptTemplate.fromMessages([
//   ['system', 'You are a world class technical documentation writer.'],
//   ['user', '{input}'],
// ]);

const splitter = new RecursiveCharacterTextSplitter();

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const docs = await new CheerioWebBaseLoader(
    'https://docs.smith.langchain.com/user_guide'
  ).load();

  const splitDocs = await splitter.splitDocuments(docs);
  const embeddings = getOpenAIEmbeddings('text-embedding-3-small');

  const retriever = (
    await MemoryVectorStore.fromDocuments(splitDocs, embeddings)
  ).asRetriever();

  const llm = getAnthropicChatModel('claude-3-haiku-20240307');

  // const chain: Runnable<any, string, RunnableConfig> = prompt
  //   .pipe(chatModel)
  //   .pipe(outputParser);

  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder('chat_history'),
    ['user', '{input}'],
    [
      'user',
      'Given the above conversation, generate a search query to look up in order to get information relevant to the conversation',
    ],
  ]);

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  const chatHistory = [
    new HumanMessage('Can LangSmith help test my LLM applications?'),
    new AIMessage('Yes!'),
  ];
  const llmChain_string = await historyAwareRetrieverChain.invoke({
    chat_history: chatHistory,
    input: 'Tell me how!',
  });

  return console.dir({
    model: llm.model,
    splitDocs: splitDocs.length,
    pageContent: splitDocs[0].pageContent.length,
    llmChain_string,
  });
})();
