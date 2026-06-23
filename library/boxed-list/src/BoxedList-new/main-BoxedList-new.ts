import { BoxedList_new } from './BoxedList-new';

const var1 = BoxedList_new.of(1, 2, 3).unbox(); // [1, 2, 3]
const var2 = BoxedList_new.of([1, 2, 3]).unbox(x => x); // [1, 2, 3]
console.log(var1, var2);
