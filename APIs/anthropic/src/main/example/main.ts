import Anthropic from '@anthropic-ai/sdk';
import { Usage } from '@anthropic-ai/sdk/resources';
import { config } from 'dotenv';
import { sendClaudeHaiku } from '../../constants/models/claudeCreateModelInstance';
import {
  haikuInputPrice,
  haikuOutputPrice,
  tokenUsageString,
} from '../../helpers';
import { UsageStrings } from './UsageStrings';
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
  const messages = await sendClaudeHaiku({
    client,
    user_text: userText,
    assist_text: assistPrimer,
    system: system_instruction,
  });

  Object.keys(messages).forEach(key => {
    Object.defineProperty(messages, `${key}`, {
      enumerable: false,
    });
  });

  Object.defineProperty(messages, 'stop_reason', {
    enumerable: false,
  });
  Object.defineProperty(messages, 'replyMessage', {
    enumerable: true,
  });
  console.log(messages);
  console.log(usegeStringsForHaiku(messages));
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
