#!/usr/bin/env node

import { config } from 'dotenv';
import { Configuration, OpenAIApi, type CreateEditRequest } from 'openai';

config();

const OPENAI_API_KEY = process.env['KILO_TOKENS_KEY'] || '';
const OPENAI_ORG_ID = process.env['OPENAI_ORG_LUXCIUM_ID'] || '';

export const DAVINCI_EDIT = 'text-davinci-edit-001' as const;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG_ID,
});

const openai = new OpenAIApi(configuration);

export function createEdit(
  instruction: string = '',
  input: string = '',
  temperature = 0.5,
  top_p = 1,
  n = 1
) {
  let prevInstruction = instruction;
  let prevInput = input;

  return async (input = prevInput) => {
    prevInput = input;

    const request: CreateEditRequest = {
      model: DAVINCI_EDIT,
      input:
        input ||
        '"The grass is always greener on the other side." - This means that people often think that things would be better in a different situation or circumstance, but this may not actually be true.',
      instruction:
        instruction ||
        'Make this in the voice of a french speaker from Quebec: Translate each of the following words of the entire input into French, output only the French translation as a French Canadian would have written it, ensure that the resulting text is grammatically correct and reflects the original meaning accurately.',
      top_p,
      temperature,
      n,
    };

    return openai.createEdit(request).then(response => {
      prevInstruction = response.data.choices[0].text || '';
      return prevInstruction;
    });
  };
}

void (async function MAIN() {
  // console.log(`at: MAIN from ${__filename}`);
  const instruct = process.argv[2] || '';
  const input = process.argv[3] || '';
  console.log(await createEdit(instruct)(input));
  return void 0;
})();

// const request = {
//   model: 'text-davinci-edit-001',
//   input: prevInput,
//   instruction: prevInstruction,
//   temperature,
//   top_p,
//   n,
// };

// Translate each of the following words into French, output only the French translation: ensure that the resulting text is grammatically correct and reflects the original meaning accurately.

// ❯ /projects/monorepo-one/prompts/typing_prompter/python/main.py "$(ts-node "/projects/monorepo-one/examples/open-ai/typescript/edit-translate.ts" '' '"The grass is always greener on the other side." - This means that people often think that things would be better in a different situation or circumstance, but this may not actually be true.' )"

// /projects/monorepo-one/prompts/typing_prompter/python/main.py "$(ts-node '/projects/monorepo-one/examples/open-ai/typescript/edit-translate.ts' '' '')"

// async function openaiModels(): Promise<void> {
//   try {
//     const response = await openai.createEdit(createEditRequest as CreateEditRequest) .models.list({ organization: OPENAI_ORG_ID });
//     console.log(JSON.stringify(response.data, null, 2));
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// async function openaiModelsIds(search = ''): Promise<void> {
//   try {
//     const response = await openai.models.list({ organization: OPENAI_ORG_ID });
//     const ids = response.data.map((model) => model.id).filter(Boolean);

//     if (search) {
//       const filteredIds = ids.filter((id) => id.includes(search));
//       if (filteredIds.length === 0) {
//         console.error(`No results found for '${search}'.`);
//         process.exit(1);
//       }
//       console.log(JSON.stringify(filteredIds, null, 2));
//     } else {
//       console.log(JSON.stringify(ids, null, 2));
//     }
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// async function openaiBaseEdit(instruction: string, inputText: string): Promise<void> {
//   try {
//     const edit: Edit = await openai.edits.create({
//       model: 'text-davinci-edit-001',
//       prompt: inputText,
//       instructions: instruction,
//       temperature: 0.7,
//       top_p: 1,
//       n: 1,
//     });

//     const choices0 = edit.choices[0]?.text ?? null;
//     if (choices0 === null) {
//       console.log(`\x1b[31m${edit}\x1b[0m`);
//     } else {
//       console.log(`\x1b[32m${choices0}\x1b[0m`);
//     }
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// async function openaiTranslateToFrench(inputText: string): Promise<void> {
//   try {
//     const instruction =
//       'Translate input to french Canadian, use specifically the variant used in Quebec. If needed correct input for grammar and spelling first then convert into French Canadian. Finally, strip out any original input and output only the resulting text in French Canadian ussing usual punctuation.';
//     await openaiBaseEdit(instruction, inputText);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// // Main program
// if (require.main === module) {
//   (async () => {
//     if (!OPENAI_API_KEY) {
//       console.error('OPENAI_API_KEY is not set');
//       process.exit(1);
//     }

//     if (!OPENAI_ORG_ID) {
//       console.error('OPENAI_ORG_ID is not set');
//       process.exit(1);
//     }

//     switch (process.argv[2]) {
//       case 'models':
//         await openaiModels();
//         break;

//       case 'models-ids':
//         await openaiModelsIds(process.argv[3] ?? '');
//         break;

//       case 'translate-to-french':
//         await openaiTranslateToFrench(process.argv.slice(3).join(' '));
//         break;

//       default:
//         console.error(`Invalid command: ${process.argv[2]}`);
//         process.exit(1);
//     }
//   })();
