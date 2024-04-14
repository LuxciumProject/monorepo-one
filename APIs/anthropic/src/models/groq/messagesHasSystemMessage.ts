import { ChatParticipant } from './ChatParticipant';
import { ChatMessage } from './messages/ChatMessage';

// function Person(name: string, age: number) {
//   if (this instanceof Person) {
//     console.log('this is an instance of Person');
//   }
//   this.name = name;
//   this.age = age;
//   // } else {
//   // return new Person(name, age);
//   // }
// }
// let tomy123 = Person('tomy123', 37);
// const tommy123 = new Person('tommy123', 37);
// void tomy123, tommy123;
// class ChatSystemArgs {
//   constructor(public message: string) {}
// }
// function ChatSystemArgsConstructor(message: string) {
//   this.message = message;
// }

export function messagesHasSystemMessage(
  messages: ChatMessage[]
): messages is ChatParticipant[] {
  return messages.some(message => message.role === 'system');
}
