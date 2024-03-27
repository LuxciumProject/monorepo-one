import { ContentBlock, Message } from '@anthropic-ai/sdk/resources';
import {
  haikuInputPrice,
  haikuOutputPrice,
  tokenUsageString,
} from '../../helpers';

export function messageFromAssistantTrimm(
  message: Message,
  prefix = '',
  sufix = ''
): {
  role: 'assistant';
  content: ({
    text: string;
    type: 'text';
  } & ContentBlock)[];
} {
  const { role, content } = message;
  // validate that the content is a string or array of ContentBlock
  if (typeof content === 'string') {
    return { role, content };
  } else if (Array.isArray(content) && content.length === 1) {
    const [block] = content;
    if (block.type === 'text' && typeof block.text === 'string') {
      // will return the text with the prefix and sufix added to it.
      const text = `${prefix}${block.text}${sufix}`;
      return {
        role,
        content: [{ type: 'text', text }],
      };
    }
  }
}
// export interface ContentBlock {
//   text: string;

//   type: 'text';
// }
export function messageFromAssistantWithUsageString(message: Message): [
  {
    role: 'assistant';
    content: ContentBlock[];
  },
  { inTokens: string; outTokens: string },
] {
  const messageFrom = messageFromAssistantTrimm(message);
  const usageStringsResult = usegeStringsForHaiku(message.usage);
  return [messageFrom, usageStringsResult];
}
function usegeStringsForHaiku({
  input_tokens,
  output_tokens,
}: {
  input_tokens: number;
  output_tokens: number;
}): {
  inTokens: string;
  outTokens: string;
} {
  const inTokens = tokenUsageString(haikuInputPrice, input_tokens);
  const outTokens = tokenUsageString(haikuOutputPrice, output_tokens);
  return { inTokens, outTokens };
}
