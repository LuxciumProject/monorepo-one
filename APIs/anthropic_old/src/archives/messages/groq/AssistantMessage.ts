import { ChatMessage } from './ChatMessage';

//#endregion EmptyMessages ==========================================||=========
// const testingStuff = new EmptyMessage('system');
// console.dir(testingStuff, { depth: 3 });

export class AssistantMessage extends ChatMessage<'assistant'> {
  constructor(
    message: string,
    prefix: string,
    private _id?: string,
    private _model?: string,
    private _stop_reason?: 'end_turn' | 'max_tokens' | 'stop_sequence' | null,
    private _stop_sequence?: string | null,
    private _usage?: {
      input_tokens?: number;
      output_tokens?: number;
    }
  ) {
    super('assistant', `${prefix}${message}`);
  }

  public get id() {
    return this._id;
  }
  public get model() {
    return this._model;
  }
  public get stop_reason() {
    return this._stop_reason;
  }

  public get stop_sequence() {
    return this._stop_sequence;
  }

  public get type() {
    return 'message';
  }

  public get usage() {
    return this._usage;
  }
}
