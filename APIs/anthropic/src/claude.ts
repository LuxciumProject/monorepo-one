import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
config();

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const anthropic = new Anthropic({
    apiKey: process.env['anthropic_k00'] || 'api-key',
  });

  // const msg = await anthropic.messages.create({
  //   model: 'claude-3-haiku-20240307',
  //   max_tokens: 1000,
  //   temperature: 0,
  //   system: 'system',
  //   messages: [
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: '{',
  //         },
  //       ],
  //     },
  //     {
  //       role: 'assistant',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'It looks like you may have accidentally submitted an incomplete message. Could you please provide more context or a complete request so I can better assist you?',
  //         },
  //       ],
  //     },
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'ok',
  //         },
  //       ],
  //     },
  //   ],
  // });
  // console.log(msg.content[0].text);

  const reply = anthropic.messages.stream({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    temperature: 0,
    system: 'system',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '{',
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: 'It looks like you may have accidentally submitted an incomplete message. Could you please provide more context or a complete request so I can better assist you?',
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'ok',
          },
        ],
      },
    ],
  });
  reply.on('message', data => {
    data.content.map(({ text }) => console.log(text));
  });
  return void 0;
})();
/*

 {
  id: 'msg_015Tn6Vg7sC9BMPjCpt8S4Cr',
  type: 'message',
  role: 'assistant',
  content.map(({text})=>text): [
    {
      type: 'text',
      text: "Okay, no problem. Could you please provide more details about what you need help with? I'm happy to assist, but I'll need more information from you to understand the full context of your request."
    }
  ],
  model: 'claude-3-haiku-20240307',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: { input_tokens: 45, output_tokens: 2 }
}

 */
