import { makeSystemBlock } from './makeSystemBlock';
const useJSON = `Do not say anything, do not acknowledge and do not introduce or do not conclude. All must ben valid JSON or will be discarded by the system.\n\n Ensure that the data is accurately represented and properly formatted within the JSON structure. The resulting JSON table should provide a clear, structured overview of the information presented in the original text.`;
export function prepareJsonSystemMessage(
  system_text: string = '',
  assist_prefix: string = 'Assistant:',
  resolvedArgv: { JSON: boolean }
) {
  let paramClaude = {
    assist_prefix,
    system: system_text ?? '',
  };

  if (resolvedArgv.JSON === true) {
    paramClaude.system = makeSystemBlock(
      `${
        system_text
          ? `"system": "Follow the instruction to generate the JSON OUTPUT you first need to ingest the system_text: « ${system_text} » Generate your output following the system_text but anything you reply must be a valid JSON Object:\n\n${useJSON}"`
          : `\n"system": "${useJSON}"`
      }\n\n"resolvedArgv.JSON" = ${true}\nJSON MODE IS ENABLED`
    );
  }

  paramClaude.assist_prefix = resolvedArgv.JSON ? '{' : `\n\n${assist_prefix}`;

  return paramClaude;
}
