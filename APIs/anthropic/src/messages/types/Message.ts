import { ImageBlockParam } from '@anthropic-ai/sdk/resources';

export type SystemTextMessage<Text extends string> = {
  role: 'system';
  content: [TextBlock<Text>];
};
export type UserImageParamMessage<Text extends string> = {
  role: 'user';
  content: [TextBlock<Text>];
};

export type UserTextMessage<Text extends string> = {
  role: 'user';
  content: [TextBlock<Text>];
};
export type AssistantTextMessage<Text extends string> = {
  role: 'assistant';
  content: [TextBlock<Text>];
};
export type ToolTextMessage<Text extends string> = {
  role: 'tool';
  content: [TextBlock<Text>];
};

export interface TextBlock<Text extends string> {
  text: Text;
  type?: 'text';
}

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

/*
❯ ts-node "/projects/monorepo-one/APIs/anthropic/src/interface/cli-claude-hiaku-more.ts"
You: hey today I need you to tell me something about the best way to create a file in TypeScript/NodeJS with commandlin settings «rl = createInterface» «yargs(hideBin(process.argv))» and «  process.on('SIGINT', () => { ...»   are alll cover please explain somehting else [[<be concise>]]
Claude: Certainly! Here's a concise explanation of another approach to creating a file in TypeScript/Node.js using the `fs` (File System) module:

```typescript
import fs from 'fs';

// Create a file synchronously
fs.writeFileSync('example.txt', 'Hello, TypeScript!');

// Create a file asynchronously
fs.writeFile('example.txt', 'Hello, TypeScript!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created successfully!');
  }
});
```

This approach uses the built-in `fs` module in Node.js, which provides methods for interacting with the file system. The `writeFileSync` method creates a file synchronously, while the `writeFile` method creates a file asynchronously.

The `writeFileSync` method takes two arguments:
1. The file path (in this case, `'example.txt'`)
2. The content to be written to the file (in this case, `'Hello, TypeScript!'`)

The `writeFile` method takes three arguments:
1. The file path (in this case, `'example.txt'`)
2. The content to be written to the file (in this case, `'Hello, TypeScript!'`)
3. A callback function that is executed when the file has been created. If an error occurs, it will be passed to the callback function.

This approach is more straightforward than using `readline` and `yargs`, which are typically used for handling command-line arguments and user input. The `fs` module provides a simple and direct way to create files in TypeScript/Node.js.
 */
