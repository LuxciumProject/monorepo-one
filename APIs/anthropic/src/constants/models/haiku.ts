import { ClaudeModel } from '../../main/example/ClaudeModel';
import { createClaude } from '../../main/example/createClaude';
import { Haiku } from './types/Haiku';
export const claudeHaiku: ClaudeModel<'claude-3-haiku-20240307'> =
  'claude-3-haiku-20240307' as const;
export const haiku: Haiku<typeof claudeHaiku> = createClaude(claudeHaiku);
