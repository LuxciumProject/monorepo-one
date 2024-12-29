import { IUnbox } from '../core';

export interface AdvancedData<U> {
  kind: typeof AdvancedBox.kind;
  isEnabled: boolean; // Similar to the flag but with a distinct semantic meaning.
  content: U; // Property of the generic type U, differentiating it from previous uses of T.
}

export class AdvancedBox<U> implements IUnbox<AdvancedData<U>> {
  private _content: U;
  private _isEnabled: boolean;
  static get kind() {
    return Symbol.for('AdvancedBox');
  }
  static of<V>(content: V, isEnabled: boolean = true): AdvancedBox<V> {
    const data = { isEnabled, content };
    return new AdvancedBox(content, data.isEnabled);
  }
  protected constructor(content: U, isEnabled: boolean) {
    this._content = content;
    // this._kind = kind;
    this._isEnabled = isEnabled;
  }
  public unbox(): AdvancedData<U> {
    const data: AdvancedData<U> = {
      kind: AdvancedBox.kind,
      isEnabled: this.isEnabled,
      content: this.content,
    };
    return data;
  }
  public map<R>(fn: (content: U) => R): AdvancedBox<R> {
    const newContent = fn(this.content);
    return AdvancedBox.of<R>(newContent, this.isEnabled);
  }
  get content(): U {
    return this._content;
  }
  get kind(): typeof AdvancedBox.kind {
    return AdvancedBox.kind;
  }
  get isEnabled(): boolean {
    return this._isEnabled;
  }
}
