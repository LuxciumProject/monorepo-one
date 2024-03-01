import Box from "..";
import { SettledLeft } from "./SettledLeftBox";
import { SettledRight } from "./SettledRightBox";

export type Settled<T> = SettledLeft | SettledRight<T>;
export interface ISettled<L, R> {
  /**
   * The status of the settled value.
   */
  status: "fulfilled" | "rejected";
  /**
   * The fulfilled value.
   */
  value: R;

  /**
   * The reason for rejection. Always `never` for a fulfilled value.
   */
  reason: L;

  /**
   * The fulfilled value. Same as `value`.
   */
  fulfilled: R;

  /**
   * The rejected value. Always `never` for a fulfilled value.
   */
  rejected: L;

  /**
   * The step number of the transformation process.
   */
  transformStep: number;

  /**
   * The current rejection value. Always `null` for a fulfilled value.
   */
  currentRejection: null | true | false | undefined;

  /**
   * The index of the settled value in the Promise.allSettled result.
   */
  index: number;
}

// export class SettledBox<L, R> extends Box<[reason: L, value: R]> implements ISettled<L, R> {
//   private _status: 'fulfilled' | 'rejected';
//   private _reason: L;
//   private _fulfilled: R;
//   private _rejected: L;
//   private _transformStep: number;
//   private _currentRejection: null | true | false;
//   private _index: number;
//   static of<TVal>(value: TVal): SettledBox<TVal, never> {
//     return new SettledBox([null as never, value]);
//   }
//   protected static fromMap<TVal>(value: TVal, index: number, transformStep: number, currentRejection: null): SettledBox<never, TVal> {
//     return new SettledBox([null as never, value], index, transformStep + 1, currentRejection);
//   }

//   protected constructor(result: SettledBoxResult<L, R>, index = -1, transformStep = -1, currentRejection: null = null) {
//     super(result);
//     this._status = result[0] === null ? 'fulfilled' : 'rejected';
//     this._reason = result[0];
//     this._fulfilled = result[1];
//     this._rejected = result[0];
//     this._index = index;
//     this._transformStep = transformStep;
//     this._currentRejection = currentRejection;

//   }
//   get status(): 'fulfilled' | 'rejected' {
//     return this._status;
//   }
//   get reason(): L {
//     return this._reason;
//   }
//   get fulfilled(): R {
//     return this._fulfilled;
//   }
//   get rejected(): L {
//     return this._rejected;
//   }
//   get transformStep(): number {
//     return this._transformStep;
//   }
//   get currentRejection(): null | true | false {
//     return this._currentRejection;
//   }
//   get index(): number {
//     return this._index;
//   }
// }

export type SettledResult<L, R> =
  | [reason: L, value: never]
  | [reason: never, value: R];
export class SettledBox<L, R> extends Box<SettledResult<L, R>> {
  private _transformStep: number;
  private _currentRejection: null | true | false;
  private _index: number;
  protected constructor(
    result: SettledResult<L, R>,
    index = -1,
    transformStep = -1,
    currentRejection: null | true | false = null,
  ) {
    super(result);
    this._index = index;
    this._transformStep = transformStep;
    this._currentRejection = currentRejection;
  }
  get transformStep(): number {
    return this._transformStep;
  }
  get index(): number {
    return this._index;
  }
  get currentRejection(): null | true | false {
    return this._currentRejection;
  }
}

/*
If I understand correctly, you're looking for a way to rename the [`currentRejection`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcore%2FSettledBox.ts%22%2C%22currentRejection%22%5D "src/core/SettledBox.ts") variable in your TypeScript code to better reflect its purpose and behavior. This variable can have three states: `null`, `true`, or `false`.

- `null` indicates a successful operation or a completed relation.
- `true` indicates the first failure in a series of operations.
- `false` indicates subsequent failures after the first one.

You want the new name to reflect that the operation is successful (or completed) most of the time (`true`), and only fails or is incomplete in specific conditions (`false` or `null`).

Here are some suggestions for the new variable name:

1. `operationSuccessful`
2. `operationComplete`
3. `isOperationSuccessful`
4. `isOperationComplete`
5. `hasOperationSucceeded`
6. `hasOperationCompleted`
7. `operationStatus`
8. `operationOutcome`
9. `operationResult`
10. `operationState`
11. `isOperationFailed`
12. `hasOperationFailed`
13. `operationFailureStatus`
14. `operationCompletionStatus`
15. `operationSuccessStatus`
16. `operationProgressStatus`
17. `operationExecutionStatus`
18. `operationFinalized`
19. `isOperationFinalized`
20. `hasOperationFinalized`

Remember, the best variable name depends on the exact context and semantics of your code. Choose a name that makes the code as clear as possible for other developers (or for you when you come back to this code in the future).

isOperationContinuing
operationInProgress
isOperationUninterrupted
uninterruptedOperation
isOperationSteady
steadyOperation
isOperationConsistent
consistentOperation
isOperationPersisting
persistingOperation
isOperationSustained
sustainedOperation
isOperationMaintained
maintainedOperation
isOperationStable
stableOperation
isOperationUnbroken
unbrokenOperation
isOperationUnaffected
unaffectedOperation
 */
