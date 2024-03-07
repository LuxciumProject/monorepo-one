#!/usr/bin/env node
import { Configuration, OpenAIApi } from 'openai';

const organization = 'org-oRSwCHJ3NyxhXwj7dZ9zn4YH';

const configuration = new Configuration({
  organization,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
