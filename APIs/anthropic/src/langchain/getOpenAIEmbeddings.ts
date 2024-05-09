import { OpenAIEmbeddings } from '@langchain/openai';

export function getOpenAIEmbeddings(
  model: 'text-embedding-3-small' = 'text-embedding-3-small'
) {
  return new OpenAIEmbeddings({
    model,
    apiKey: process.env['OPENAI_API_KEY'],
  });
}
