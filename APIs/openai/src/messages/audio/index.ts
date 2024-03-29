import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { OpenAIApi } from 'openai';

import { config } from 'dotenv';
config();

const apiKey = process.env.OPENAI_API_KEY;
void apiKey;

const openai = new OpenAIApi();

const speechFile = resolve('./speech.mp3');

async function main() {
  const mp3 = await openai.images.generate.create({
    model: 'tts-1',
    voice: 'alloy',
    input: 'Today is a wonderful day to build something people love!',
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await promises.writeFile(speechFile, buffer);
}
main();
