export function makeModelSystemBlock<Text extends string>(
  systemText: string | null = '',
  model: Text | null = null
) {
  return makeSystemBlock<Text>(systemText, model, model.includes('claude'));
}

export function makeSystemBlock<Text extends string>(
  systemText: string | null = '',
  model: Text | null = null,
  claude: boolean = false
) {
  const moreinfo = claude
    ? 'See our [guide to system prompts](https://docs.anthropic.com/claude/docs/system-prompts).'
    : '';
  if (model === null) {
    return makeSystemBlock(systemText, 'AI Assistatn', false);
  }
  return systemText === null
    ? ''
    : `/**
* System prompt.
*
* A system prompt is a way of providing context and instructions
* to the ${model} model, such as providing a background story,
* as specifying a particular goal or giving a set of constraints.
* ${moreinfo}
*/
<SYSTEM>
  ${systemText}
</SYSTEM>
`
        .trim()
        .split('\n')
        .map(sysText => sysText.trim())
        .join('\n');
}
