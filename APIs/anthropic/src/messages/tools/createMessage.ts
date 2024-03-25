import { TextBlock } from '@anthropic-ai/sdk/resources';

// lets create a new function that would conver a number from MB to bytes
export function convertMBToBytes(mb: number): number {
  return mb * 1024 * 1024;
}

export async function createMessage(text: string): Promise<{
  content: [TextBlock];
  role: 'user';
}> {
  return {
    role: 'user',
    content: [{ type: 'text', text }],
  };
}
//  TextBlock
// messages:content: string | Array<TextBlock | ImageBlockParam>;

// role: 'user' | 'assistant';
// const msg = await anthropic.messages.create(
const msg = {
  role: 'user',
  content: [
    {
      type: 'text',
      text: '.../src/some-folder/tools/:\nPurpose: Contains scripts or utilities used during development or deployment but not part of the final application. Examples include build scripts, migration tools, or code generators.\n.../src/some-folder/utils/:\nPurpose: To provide utility functions or classes that are widely used across the "some-folder" module. These utilities are generic, solving common problems in a reusable way.\n.../src/some-folder/helpers/:\nPurpose: Similar to utils but often more specialized towards the needs of the "some-folder" module. Helpers may provide functions to simplify complex operations, format data, or any support task that makes the main code cleaner and more readable.',
    },
  ],
};

console.log(msg);
// content: string | Array<TextBlock | ImageBlockParam>;

// role: 'user' | 'assistant';
// }

type ErrorResponse = {
  error: {
    message: string;
  };
};
