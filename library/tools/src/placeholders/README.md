# Place Holders

debugging, or managing unfinished code. These functions serve as temporary implementations, allowing you to test code flow without full functionality. This section provides an overview of several placeholder functions, each designed for specific purposes like logging messages, returning values, or acting as no-ops. Below are the descriptions and signatures for these functions, which can be used in your TypeScript projects.

## `createCustomPlaceholder`

Creates a custom placeholder function.

**Parameters:**

- `message` (optional): The message to log. Default is `'This is a placeholder function.'`.
- `logArgs` (optional): Whether to log the arguments. Default is `false`.
- `returnArgs` (optional): Whether to return the arguments. Default is `false`.

**Returns:**
A function that accepts any number of arguments. If `returnArgs` is `true`, it returns the arguments; otherwise, it returns `void`.

**Function Signature:**

```typescript
export function createCustomPlaceholder(
  message?: string,
  logArgs?: boolean,
  returnArgs?: boolean
): <T extends any[]>(...args: T) => T | void;
```

---

## `createPassThroughPlaceholder`

Creates a pass-through placeholder function.

**Parameters:**

- `message`: The message for the placeholder.

**Returns:**
A function that accepts any number of arguments and returns them as is.

**Function Signature:**

```typescript
export function createPassThroughPlaceholder(
  message: string
): <T extends any[]>(...args: T) => T;
```

---

## `createPassThroughLoggerPlaceholder`

Creates a pass-through logger placeholder.

**Parameters:**

- `message`: The message to be logged.

**Returns:**
A function that logs the given message and returns the same arguments passed to it.

**Function Signature:**

```typescript
export function createPassThroughLoggerPlaceholder(
  message: string
): <T extends any[]>(...args: T) => T;
```

---

## `createValueLoggerPlaceholder`

Creates a value logger placeholder.

**Parameters:**

- `message`: The message to be logged.

**Returns:**
A function that logs the provided message along with any arguments passed to it.

**Function Signature:**

```typescript
export function createValueLoggerPlaceholder(
  message: string
): <T extends any[]>(...args: T) => void;
```

---

## `createMessagePlaceholder`

Creates a message placeholder.

**Parameters:**

- `message`: The message to be displayed.

**Returns:**
A function that accepts any number of arguments and does not return a value.

**Function Signature:**

```typescript
export function createMessagePlaceholder(
  message: string
): <T extends any[]>(...args: T) => void;
```

---

## `createDefaultPlaceholder`

Creates a default placeholder function.

**Returns:**
A placeholder function that does not perform any specific action. The function takes any number of arguments and returns `void`. If the caller's location can be determined from the stack trace, it includes the invocation file path in the message; otherwise, it includes a default message.

**Function Signature:**

```typescript
export function createDefaultPlaceholder(): <T extends any[]>(
  ...args: T
) => void;
```

This structure provides a clear, human-readable summary for each function along with the associated TypeScript function signature, using level 4 titles.

## LICENSE

MIT © 2024 Luxcium (Benjamin Vincent)

### Made with ❤️ and ☕️ by Luxcium

† Scientia est lux principium✨ ™
