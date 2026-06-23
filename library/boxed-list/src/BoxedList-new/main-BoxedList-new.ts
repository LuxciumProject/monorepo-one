import Box from '@/Box/Box';
import { BoxedList_new } from './BoxedList-new';
const var1 = BoxedList_new.of(1, 2, 3).unbox(); // [1, 2, 3]
const var2 = BoxedList_new.of([1, 2, 3]).unbox(x => x); // [1, 2, 3]
console.log(var1, var2);
const myBox1 = Box.of(1); // [1]
const myBox2 = Box.of(2); // [2]
let v3 = BoxedList_new.from(myBox1).unbox(x => x * 2); // [2]
v3 = BoxedList_new.from(myBox2).unbox(x => x * 2); // [2]
v3;
