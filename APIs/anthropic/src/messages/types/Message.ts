import { ImageBlockParam } from '@anthropic-ai/sdk/resources';

export type AssistantTextMessage<Text extends string> = {
  role: 'assistant';
  content: [TextBlock<Text>];
};
export interface TextBlock<Text extends string> {
  text: Text;

  type?: 'text';
}
export type UserTextMessage<Text extends string> = {
  role: 'user';
  content: [TextBlock<Text>];
};

export type UserImageMessage<Text extends string> = {
  role: 'user';
  content: [ImageBlockParam, TextBlock<Text>];
};

export type UserMessage = UserTextMessage<string> | UserImageMessage<string>;
export type MessageItem = AssistantTextMessage<string> | UserMessage;
export type MessageItems = MessageItem[];
/*
(TypeScript/NodeJS Project) in my project all files are in the src folder and then in the src folder all files may be organised in a folder structure... now I evolved my code to be in specific subfolders in any folders in the src or any sub folders of those folders the thing is that I now uses type, utils, tools, helpers along with an index file that is strictly reserved to export stuff that is in a given folder (nothing used outside a folder shall be imported from a file other than index.ts as per my private and strict rules) and I have a main.ts which is in fact a playground of sort where I can during development play along with the elements I am creating and do some manual testing and try the stuff I am creating and all that such...
 */
