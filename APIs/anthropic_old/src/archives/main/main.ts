import Anthropic from '@anthropic-ai/sdk';
// import { config } /from 'dotenv';
// import { getStreamCaller } from '../messages/getStreamCaller';
// import { createImageMessage, createUserMessage } from '../messages/tools';
// /

// const imagePath = '/projects/monorepo-one/private/imgs/Lenna.png';
// (async () => {
//   // try {
//   const imageCall = createImageMessage(
//     'What is in this image? Describe the scene in detail. And what is the mood?',
//     imagePath
//   );
//   const messageCall = await createUserMessage('text');
//   const streamCaller = getStreamCaller(
//     'system string',
//     'claude-3-haiku-20240307'
//   );

//   // await messageStream
//   // async function processMessages(messageStream: AsyncIterable<MessageStreamEvent>) {
//   //     for await (const message of messageStream) {
//   //         // process message here
//   //         message
//   //         process.stdout.write(String(message));
//   //     }
//   // }
//   //
//   const result = await client.messages.create({
//     model: 'claude-3-haiku-20240307',
//     temperature: 0.95,
//     max_tokens: 1024,
//     messages: [imageCall],
//     system:
//       'Explain what is inside the image. explain the tone, colours and other stylistic parameters.',
//     metadata: { user_id: '123' },
//     // stream:false
//     // temperature:0
//     // top_k:0
//     // top_p:0
//   });
//   return result;
// })()
//   .then()
//   .catch(console.error);

export async function fn_aa4202(
  client: Anthropic,
  messageCall: any,
  imageCall: any,
  streamCaller: any
) {
  let buffer = '';
  client.messages
    .stream(
      streamCaller([messageCall, imageCall])
      //   {
      //   messages: [imageCall],
      //   model: 'claude-3-haiku-20240307',
      //   temperature: 0.95,
      //   system:
      //     'Explain what is inside the image. explain the tone, colours and other stylistic parameters. You are printing to the console you can add CSI codes to format the output. You can also add a new line character to separate the output. Inblude bold and underline text.',
      //   max_tokens: 1024,
      // }
    )
    .on('text', text => {
      // Append the incoming text to the buffer
      buffer += text;

      // Function to process the buffer, looking for complete ANSI sequences and text to output
      const processBuffer = () => {
        // Replace split escape sequence components with a unified escape sequence
        // Note: This pattern needs to match the fragmented escape sequences accurately
        buffer = buffer.replace(/(\\')?033(\[|'?\[)'?/g, '\x1b['); // Fix fragmented ANSI sequences
        buffer = buffer.replace(/\\([^[m])/g, '$1'); // Attempt to fix solitary backslashes not part of escape sequences

        // Find the last index of the start of an ANSI escape sequence
        let lastEscapeIndex = buffer.lastIndexOf('\x1b[');

        while (lastEscapeIndex !== -1) {
          // Check if a complete sequence exists after this index
          let sequenceEnd = buffer.indexOf('m', lastEscapeIndex);
          if (sequenceEnd !== -1) {
            // A complete sequence exists, output up to the end of the sequence
            let sequence = buffer.substring(0, sequenceEnd + 1);
            process.stdout.write(sequence);
            // Update buffer to remove the outputted text
            buffer = buffer.substring(sequenceEnd + 1);
            // Check for another sequence in the remaining buffer
            lastEscapeIndex = buffer.lastIndexOf('\x1b[');
          } else {
            // No complete sequence found, break and wait for more text
            break;
          }
        }
      };

      // Process the current buffer
      processBuffer();
    })
    .on('end', () => {
      // Handle any remaining text in the buffer at the end of the stream
      if (buffer.length > 0) {
        // Any remaining buffer content is outputted, assuming no incomplete ANSI sequences are left
        process.stdout.write(buffer);
        buffer = ''; // Clear the buffer
      }
    });
  return void 0;
}
