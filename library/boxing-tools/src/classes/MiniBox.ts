import { ExtractableBox } from './ExtractableBox';
import { MiniBox } from './MiniBox.1';

type ElementType<T> = T extends (infer U)[] ? U : T;

// const Z: ElementType<number[]> = 5;
// void Z;
//   ^?
// export { MiniBox };
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  const box = MiniBox.of<number>(15);
  const box1 = MiniBox.of(box);
  const box2: MiniBox<MiniBox<MiniBox<number>>> = MiniBox.of(box1);

  // console.log(box2.unbox());
  // @ts-ignore
  console.log(box2.xmap(_ => _ * 2));
  // ❯ ts-node "boxing-tools/src/classes/MiniBox.ts"
  // at: MAIN from boxing-tools/src/classes/MiniBox.ts
  // MiniBox {
  //   _boxedValue: MiniBox { _boxedValue: MiniBox { _boxedValue: 30 } }
  // }
  // But the error was :
  // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2362)
  // Type 'number' is not assignable to type 'Rx'.
  //   'Rx' could be instantiated with an arbitrary type which could be unrelated to 'number'.ts(2322)
  // MiniBox.ts(76, 19): The expected type comes from the return type of this signature.
  return void 0;
})();

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  // Utility types
  type NestedBox<T> = T extends MiniBox<infer U> ? NestedBox<U> : never;
  type InnermostType<T> = T extends { content: infer U } ? InnermostType<U> : T;
  type InnermostContent<T> =
    T extends MiniBox<infer U> ? InnermostContent<U> : T;

  // Create nested MiniBox instances
  const box = MiniBox.of<number>(15);
  const box1 = MiniBox.of(box);
  const box2: MiniBox<MiniBox<MiniBox<number>>> = MiniBox.of(box1);

  // Use utility types
  type MyNestedBox = NestedBox<typeof box2>; // MiniBox<MiniBox<MiniBox<never>>>
  type MyContent = InnermostContent<typeof box2>; // number

  // Use utility types
  // type MyNestedBox = NestedBox<typeof box2>;  // MiniBox<MiniBox<MiniBox<never>>>
  // type MyContent = InnermostContent<typeof box2>;  // number

  // Use the types in a function

  return void 0;
})();
type ContainerType<T> =
  T extends ExtractableBox<infer U> ? ExtractableBox<any> : never;
type ContentType<T> = T extends ExtractableBox<infer U> ? U : never;
// type ExtractInnermost<T> =
//   T extends ExtractableBox<infer U> ? ExtractInnermost<U> : T;

// Utility type to infer the boxing structure of the result
type BoxStructure<T, Rx> =
  T extends ExtractableBox<infer U> ? ExtractableBox<U> : Rx;

// class MiniBox<U> implements ExtractableBox<U> {
//   // ... (other methods omitted for brevity)

//   public unbox(): Unbox<U> {
//     // ... (implementation omitted)
//   }
// }
