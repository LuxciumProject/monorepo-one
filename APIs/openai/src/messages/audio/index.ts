import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { OpenAI } from 'openai';

import { config } from 'dotenv';
config();

const apiKey = process.env.OPENAI_API_KEY;
void apiKey;

const openai = new OpenAI();

const speechFile = resolve('./speech-fable.mp3');

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'fable',
    input: `Yeah I am a trash at using ai, this is because, I know nothing about it... But one thing I know is how to use it to make money.`,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await promises.writeFile(speechFile, buffer);
}
main();
