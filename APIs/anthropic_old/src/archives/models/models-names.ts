function createClaudeModelName<M extends `claude-${string}`>(model: M) {
  return model;
}
export const claudeOpus = createClaudeModelName('claude-3-opus-20240229');
export const claudeSonnet = createClaudeModelName('claude-3-sonnet-20240229');
export const claudeHaiku = createClaudeModelName('claude-3-haiku-20240307');
export const claude2_1 = createClaudeModelName('claude-2.1');
export const claude2_0 = createClaudeModelName('claude-2.0');
export const claudeInstant = createClaudeModelName('claude-instant-1.2');
export const DEFAULT_MODEL = claudeHaiku;
export const MODEL: {
  readonly claudeOpus: 'claude-3-opus-20240229';
  readonly claudeSonnet: 'claude-3-sonnet-20240229';
  readonly claudeHaiku: 'claude-3-haiku-20240307';
  readonly claude2_1: 'claude-2.1';
  readonly claude2_0: 'claude-2.0';
  readonly claudeInstant: 'claude-instant-1.2';
  readonly DEFAULT: typeof DEFAULT_MODEL;
} = {
  claudeOpus,
  claudeSonnet,
  claudeHaiku,
  claude2_1,
  claude2_0,
  claudeInstant,
  DEFAULT: DEFAULT_MODEL,
};
