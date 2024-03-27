import Anthropic from '@anthropic-ai/sdk';
import { Usage } from '@anthropic-ai/sdk/resources';
import { config } from 'dotenv';
import { haiku } from '../../constants/models/haiku';
import {
  haikuInputPrice,
  haikuOutputPrice,
  tokenUsageString,
} from '../../helpers';
config();
const key = {
  apiKey: process.env['monorepo-one_000x'],
};
void (async () => {
  const client = new Anthropic(key);

  const userText =
    'Hello Claude, I would like to create a text in english that looks like LOREM IPSUM but that can be read as it is normal english text. Can you help me with that?';
  const system_instruction: string = `Create a text in english that looks like LOREM IPSUM but that can be read Create 3 short dummy paragraphs using that technique. Reply in JSON format.'`;
  const assistPrimer = '{';
  const messages = await haiku({
    client,
    user_text: userText,
    assist_text: assistPrimer,
    system: system_instruction,
  });
  const message = Object.defineProperty(messages, ' content', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: messages.content,
  });

  console.log(message);
  console.log(usegeStringsForHaiku(messages));
  // const values = messages.map(message =>
  //   messageFromAssistantTrimm(message, '', '')
  // );
  // const resultMessage = messages.map(messageFromAssistantWithUsageString);
  // console.dir(values, { depth: null });
  // console.dir(resultMessage, { depth: null });
})()
  .then()
  .catch(console.error);

function usegeStringsForHaiku({
  input_tokens,
  output_tokens,
}: Usage): UsageStrings {
  const inTokens = tokenUsageString(haikuInputPrice, input_tokens);
  const outTokens = tokenUsageString(haikuOutputPrice, output_tokens);
  return { inTokens, outTokens };
}

// function customLog<O extends Extract<keyof O, string>>(object: O) {
//   const enumerablePropertiesOnly = {};
//   for (let key in object) {
//     enumerablePropertiesOnly[key] = object[key];
//   }
//   console.log(enumerablePropertiesOnly);
// }
interface UsageStrings {
  inTokens: string;
  outTokens: string;
}
