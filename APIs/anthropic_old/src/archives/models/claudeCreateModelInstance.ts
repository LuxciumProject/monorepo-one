import { claudeCreateInstance } from './createClaude';
import { MODEL } from './models-names';
import type {
  Claude2_0,
  Claude2_1,
  ClaudeInstant,
  Haiku,
  Opus,
  Sonnet,
} from './types';

export const sendClaudeOpusRequest: Opus<typeof MODEL.claudeOpus> =
  claudeCreateInstance(MODEL.claudeOpus);
export const sendClaudeSonnetRequest: Sonnet<typeof MODEL.claudeSonnet> =
  claudeCreateInstance(MODEL.claudeSonnet);
export const sendClaudeHaiku: Haiku<typeof MODEL.claudeHaiku> =
  claudeCreateInstance(MODEL.claudeHaiku);
export const sendClaude2_1: Claude2_1<typeof MODEL.claude2_1> =
  claudeCreateInstance(MODEL.claude2_1);

export const sendClaude2_0: Claude2_0<typeof MODEL.claude2_0> =
  claudeCreateInstance(MODEL.claude2_0);

export const sendClaudeInstant: ClaudeInstant<typeof MODEL.claudeInstant> =
  claudeCreateInstance(MODEL.claudeInstant);
