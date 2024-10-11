import { config } from 'dotenv';
import openai from 'openai';
// import    { Configuration, OpenAIApi } from 'openai';
// import { Configuration, OpenAIApi } from 'openai';

config();

// const configuration = new Configuration({
//   apiKey: process.env['OPENAI_API_KEY'] || '',
//   organization: process.env['OPENAI_ORG_ID'],
// });

const openaiApi = new openai({
  apiKey: process.env['OPENAI_API_KEY'] || '',
  organization: process.env['OPENAI_ORG_ID'],
});

export { openaiApi };
