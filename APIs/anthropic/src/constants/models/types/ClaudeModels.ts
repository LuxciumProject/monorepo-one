import type { MessageParams, ModelReply } from '../../../messages/types';
export type ClaudeModel<M extends `claude-${string}`> = M;
export type Claude<M extends `claude-${string}`> = (
  messageParams: MessageParams
) => Promise<ModelReply<M>>;

export type Opus<M extends `claude-3-opus${string}`> = Claude<M>;
export type Sonnet<M extends `claude-3-sonnet${string}`> = Claude<M>;
export type Haiku<M extends `claude-3-haiku${string}`> = Claude<M>;
export type Claude2_1<M extends `claude-2.1${string}`> = Claude<M>;
export type Claude2_0<M extends `claude-2.0${string}`> = Claude<M>;
export type ClaudeInstant<M extends `claude-instant${string}`> = Claude<M>;
