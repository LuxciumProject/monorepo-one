// @/BoxedList-new/main-BoxedList-new.ts
import { BoxedList_new } from './BoxedList-new';

// 1. Instantiation using .of()
const list1 = BoxedList_new.of(1, 2, 3); // Internal: [1, 2, 3]
const list2 = BoxedList_new.of([4, 5, 6]); // Internal: [4, 5, 6] (Nested tuple caught)

// 2. Mapping
const doubledList = list1.mapItems(x => x * 2); // Returns new BoxedList_new

// 3. Unboxing (with or without transformation)
const rawArray1 = doubledList.unbox(); // [2, 4, 6]
const stringArray = doubledList.unbox(String); // ["2", "4", "6"]

// 4. Instantiation using .from()
const fun = (x: any) => x + 10;
const listFromOther = BoxedList_new.from(list2, fun); // Internal: [11, 12, 13]

fun;
list2;
rawArray1;
stringArray;
listFromOther;
