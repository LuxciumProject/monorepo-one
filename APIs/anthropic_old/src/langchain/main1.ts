import { ChatAnthropic } from '@langchain/anthropic';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { config } from 'dotenv';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

config();

const outputParser = new StringOutputParser();

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a world class technical documentation writer.'],
    ['user', '{input}'],
  ]);
  const loader = new CheerioWebBaseLoader('https://search.chatgpt.com/');

  const docs = await loader.load();

  console.log(docs.length);
  console.log(docs[0].pageContent.length);

  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);
  // const embeddings = new OpenAIEmbeddings({
  //   model: 'text-embedding-3-small',
  //   apiKey: process.env['OPENAI_API_KEY'],
  // });

  // const vectorstore: MemoryVectorStore = await MemoryVectorStore.fromDocuments(
  //   splitDocs,
  //   embeddings
  // );

  // console.log(embeddings, { depth: 10 });
  // console.dir(vectorstore, { depth: null });
  console.log(splitDocs.length);
  console.log(splitDocs[0].pageContent.length);

  const chatModel = new ChatAnthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  });
  chatModel.model = 'claude-3-haiku-20240307';
  console.log(`chatModel.model: ${chatModel.model}`);
  const chain = prompt.pipe(chatModel).pipe(outputParser);

  const llmChain = await chain.invoke({
    input: 'what is a chatModel?',
  });
  console.log(`llmChain: ${llmChain}`);
  // console.dir(baseMessageChunk, { depth: null });
  return void 0;
})();
