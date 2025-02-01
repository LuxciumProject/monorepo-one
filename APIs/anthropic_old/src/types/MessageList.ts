import { Usage } from '@anthropic-ai/sdk/resources';

export type MessageList = Array<{
  // content: Array<TextBlock | ImageBlockParam>
  content:
    | Array<
        // TextBlock
        | {
            text: string;
            type?: 'text';
          }
        // ImageBlockParam
        | {
            // source: ImageBlockParam.Source;
            type?: 'image';
            source: {
              data: string;
              media_type:
                | MediaType<'jpeg'>
                | MediaType<'png'>
                | MediaType<'gif'>
                | MediaType<'webp'>;
              type?: 'base64';
            };
          }
      >
    | string;
  role: Role<'user'> | Role<'assistant'>;
}>;
export type AllRoles = Role<'user'> | Role<'assistant'> | SystemRole | ToolRole;
export type Role<Participant extends 'user' | 'assistant'> = Participant;
export type SystemRole = 'system';
export type ToolRole = 'tool';

export type MediaType<Image extends 'png' | 'jpeg' | 'gif' | 'webp'> =
  `image/${Image}`;

// export type ImageBlockParam = {
//   source: {
//     data: string;
//     media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
//     type?: 'base64';
//   };
//   type?: 'image';
// };

// export type TextBlock = {
//   text: string;
//   type?: 'text';
// };

export class TextBlock {
  private _type: 'text' = 'text';
  private _text: string;
  constructor(text: string) {
    this._text = text;
  }
  get text(): string {
    return this._text;
  }
  get type(): 'text' {
    return this._type;
  }
}
export class ImageBlockParam<
  ImageType extends 'png' | 'jpeg' | 'gif' | 'webp',
> {
  private _type: 'image' = 'image';
  private _data: string;

  private _media_type: MediaType<ImageType>;

  constructor(data: string, media_type: MediaType<ImageType>) {
    this._data = data;
    this._media_type = media_type;
  }
  get source() {
    return {
      data: this._data,
      media_type: this._media_type,
      type: 'base64',
    };
  }
  get type(): 'image' {
    return this._type;
  }
}
export interface ContentBlock {
  text: string;

  type: 'text';
}
export interface MessageCompletion_ {
  id: string;
  content: Array<ContentBlock>;
  model: string;
  role: 'assistant';
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  type: 'message';
  usage: Usage;
}
export class MessageCompletion implements MessageCompletion_ {
  private _id: string;
  private _content: Array<ContentBlock>;
  private _model: string;
  private _role: 'assistant';
  private _stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  private _stop_sequence: string | null;
  private _type: 'message';
  private _usage: Usage;
  constructor(
    id: string,
    content: Array<ContentBlock>,
    model: string,
    role: 'assistant',
    stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null,
    stop_sequence: string | null,
    usage: Usage
  ) {
    this._id = id;
    this._content = content;
    this._model = model;
    this._role = role;
    this._stop_reason = stop_reason;
    this._stop_sequence = stop_sequence;
    this._usage = usage;
  }
  public content_string(prefix: string = ''): string {
    if (this._content.length === 0) {
      return '';
    } else if (this._content.length === 1) {
      const result = prefix + this._content[0].text;
      if (this._stop_sequence) {
        return result + this._stop_sequence;
      } else {
        return result;
      }
    }
  }
  public get id(): string {
    return this._id;
  }
  public get content(): Array<ContentBlock> {
    return this._content;
  }
  public get model(): string {
    return this._model;
  }
  public get role(): 'assistant' {
    return this._role;
  }
  public get stop_reason(): 'end_turn' | 'max_tokens' | 'stop_sequence' | null {
    return this._stop_reason;
  }
  public get stop_sequence(): string | null {
    return this._stop_sequence;
  }
  public get type(): 'message' {
    return this._type;
  }
  public get usage(): Usage {
    return this._usage;
  }
}
