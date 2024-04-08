const SYSTEM_PROMPT_TEMPLATE = (
  systemText: string,
  model: string,
  claude: boolean
) =>
  `/**
* System prompt.
*
* A system prompt is a way of providing context and instructions
* to the ${model} model, such as providing a background story,
* as specifying a particular goal or giving a set of constraints.
* ${claude ? 'See our [guide to system prompts](https://docs.anthropic.com/claude/docs/system-prompts).' : ''}
*/
<SYSTEM>
  ${systemText}
</SYSTEM>
`
    .trim()
    .split('\n')
    .map(sysText => sysText.trim())
    .join('\n');

const USE_JSON = `Do not say anything, do not acknowledge and do not introduce or do not conclude. All must ben valid JSON or will be discarded by the system.

Ensure that the data is accurately represented and properly formatted within the JSON structure. The resulting JSON table should provide a clear, structured overview of the information presented in the original text.`;

const AI_ASSISTANT_SYSTEM_PROMPT = SYSTEM_PROMPT_TEMPLATE(
  '',
  'AI Assistant',
  false
);

export function makeSystemBlock<Text extends string>(
  systemText: string | null = '',
  model: Text | null = null,
  claude: boolean = false
): string {
  return systemText === null || model === null
    ? ''
    : SYSTEM_PROMPT_TEMPLATE(systemText, model, claude);
}

export function makeModelSystemBlock<Text extends string>(
  systemText: string | null = '',
  model: Text | null = null
): string {
  return makeSystemBlock(systemText, model, model && model.includes('claude'));
}

export function prepareJsonSystemMessage<Text extends string>(
  system_text: Text,
  assist_prefix: string = 'Assistant:',
  resolvedArgv: { JSON: boolean }
): { assist_prefix: string; system: string } {
  const paramClaude = {
    assist_prefix,
    system: system_text ?? '',
  };

  if (resolvedArgv.JSON === true) {
    const jsonSystemText = SYSTEM_PROMPT_TEMPLATE(
      `${
        system_text
          ? `"system": "Follow the instruction to generate the JSON OUTPUT you first need to ingest the system_text: « ${system_text} » Generate your output following the system_text but anything you reply must be a valid JSON Object:\n\n${USE_JSON}"`
          : `\n"system": "${USE_JSON}"`
      }\n\n"resolvedArgv.JSON" = ${true}\nJSON MODE IS ENABLED`,
      'AI Assistant',
      true
    );

    paramClaude.system = makeModelSystemBlock(jsonSystemText);
  }

  paramClaude.assist_prefix = resolvedArgv.JSON ? '{' : `\n\n${assist_prefix}`;

  return paramClaude;
}
