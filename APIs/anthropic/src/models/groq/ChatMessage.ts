/**
 * Represents a chat message with a specified role and content.
 * This class serves as a base for more specialized chat messages in a chat application.
 * @template Role - The role type which indicates the sender's role in the chat.
 */

export class ChatMessage<Role extends string = string> {
  /**
   * Initializes a new instance of the ChatMessage class.
   * @param _role The role of the sender.
   * @param _content The textual content of the message.
   */
  constructor(
    private _role: Role,
    private _content: string
  ) {}

  /**
   * Gets the content of the message.
   * @returns The content of the message as a string.
   */
  get content(): string {
    return this._content;
  }

  /**
   * Gets the role of the sender.
   * @returns The role of the sender as a string.
   */
  get role(): Role {
    return this._role;
  }
}
