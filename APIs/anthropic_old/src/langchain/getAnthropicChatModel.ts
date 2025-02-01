import { ChatAnthropic } from '@langchain/anthropic';

export function getAnthropicChatModel<Model extends string>(
  model: Model,
  verbose = false,
  maxTokens = 100
) {
  const chatModel = new ChatAnthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  });
  chatModel.model = model;
  chatModel.verbose = verbose;
  chatModel.maxTokens = maxTokens;
  return chatModel;
}
