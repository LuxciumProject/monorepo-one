import type { UserTextMessage } from '../../types';

export function getTextFromUserTextMessage<Text extends string>(
  message: UserTextMessage<Text>
): Text {
  return message.content[0].text;
}
