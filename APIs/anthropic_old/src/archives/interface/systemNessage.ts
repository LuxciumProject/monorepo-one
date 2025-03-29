import { makeSystemBlock } from './makeSystemBlock';

export function prepareJsonSystemMessage(
  system_text: string = '',
  assist_prefix: string = 'Assistant:',
  resolvedArgv: { JSON: boolean }
) {
  let paramClaude = {
    assist_prefix,
    system: system_text ?? '',
  };
  const useJSON = resolvedArgv.JSON === true;

  if (useJSON) {
    const useWithJSON = `Do not say anything, do not acknowledge, do not introduce, and do not conclude. Everything must be valid JSON or it will be discarded by the system.\n\nEnsure that the data is accurately represented and properly formatted within the JSON structure. The resulting JSON table should provide a clear, structured overview of the information presented in the original text.\n\n"resolvedArgv.JSON" = ${resolvedArgv.JSON}\n JSON MODE IS ENABLED`;

    paramClaude.system = makeSystemBlock(
      `${
        system_text
          ? `"system": "Follow the instruction to generate the JSON OUTPUT you first need to ingest the system_text: « ${system_text} » Generate your output following the system_text but anything you reply must be a valid JSON Object:\n\n${useWithJSON}"`
          : `\n"system": "${useWithJSON}"`
      }\n\n"resolvedArgv.JSON" = ${useJSON}\nJSON MODE IS ENABLED`
    );
  }
  paramClaude.assist_prefix = useJSON ? '{' : `\n\n${assist_prefix}`;
  return paramClaude;
}
