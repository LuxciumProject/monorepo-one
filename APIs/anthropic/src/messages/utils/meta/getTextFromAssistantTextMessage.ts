import type { AssistantTextMessage } from '../../types';
import { getTextFromTextBlock } from './getTextFromTextBlock';

export function getTextFromAssistantTextMessage<Text extends string>(
  message: AssistantTextMessage<Text>
): string {
  if (message.content.length !== 1) {
    // map over the content and get the text from each block or reduce in string
    const text = message.content.map(getTextFromTextBlock).join(' ');
    return text;
  }
  return getTextFromTextBlock(message.content[0]);
}
