export class TypeBlock<BlockType extends string> {
  constructor(private _type: BlockType) {}
  get type() {
    return this._type;
  }
}

export class TextBlock extends TypeBlock<'text'> {
  constructor(private _text: string) {
    super('text');
  }
  get text() {
    return this._text;
  }
}

export class ImageBlock extends TypeBlock<'image'> {
  private _source: ImageSource;
  constructor(
    private _media_type:
      | 'image/jpeg'
      | 'image/png'
      | 'image/gif'
      | 'image/webp',
    private _data: string
  ) {
    super('image');
    this._source = new ImageSourceBlock(this._media_type, this._data);
  }
  get source() {
    return this._source;
  }
}
export class ImageSourceBlock<
  MediaType extends 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
> extends TypeBlock<'base64'> {
  constructor(
    private _media_type: MediaType,
    private _data: string
  ) {
    super('base64');
  }
  get data() {
    return this._data;
  }

  get media_type() {
    return this._media_type;
  }
}
interface ImageSource {
  data: string;
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  type: 'base64';
}

export interface ImageBlockParam {
  source: {
    data: string;
    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
    type?: 'base64';
  };
  type: 'image';
}

function makeSystemMessage(message: string) {
  return new TypeBlock('system');
}

// {
//   role: 'system',
//   content: 'you are a helpful assistant.',
// },

//       type: 'text',
//   type: 'text';
//   type: 'content_block_delta';
//   type: 'content_block_start';
//   type: 'content_block_stop';
//   type?: 'image';
//     media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
//     type?: 'base64';
//     .filter(content => content.type === 'text')
// export type Message = MessageRecived;
//   type: 'message';
//   type: 'message_delta';
// export type UserTextMessage = MessageRecive<'user'>;
// export type AssistantTextMessage = MessageRecive<'assistant'>;
//   type: 'message_start';
//   type: 'message_stop';
//   type?: 'image';
//     type?: 'base64';
//   type?: 'text';
//           type?: 'image';

export interface TextBlockParam {
  text: string;
  type: 'text';
}
