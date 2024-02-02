---
runme:
  id: 01HNKGZCBFNT13S2W1PS0EFNA8
  version: v2.2
---

# JavaScript reference

The JavaScript reference serves as a repository of facts about the JavaScript language. It is outlined here and is available online on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) website.

> The JavaScript language is intended to be used within some larger environment, be it a browser, server-side scripts, or similar. For the most part, this reference attempts to be environment-agnostic and does not target a web browser environment. For example, the JavaScript API for the DOM is not covered in this reference.

    - [Fundamental objects](#fundamental_objects)
      - [Object](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
      - [Function](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
      - [Boolean](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
      - [Symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
    - [Error objects](#error_objects)
      - [Error](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
      - [AggregateError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)
      - [EvalError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)
      - [RangeError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
      - [ReferenceError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)
      - [SyntaxError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
      - [TypeError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
      - [URIError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)
      - [InternalError](/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError)
    - [Numbers and dates](#numbers_and_dates)
      - [Number](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
      - [BigInt](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
      - [Math](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
      - [Date](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
    - [Text processing](#text_processing)
      - [String](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
      - [RegExp](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
    - [Indexed collections](#indexed_collections)
      - [Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
      - [Int8Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
      - [Uint8Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
      - [Uint8ClampedArray](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
      - [Int16Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)
      - [Uint16Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)
      - [Int32Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)
      - [Uint32Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)
      - [BigInt64Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
      - [BigUint64Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)
      - [Float32Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
      - [Float64Array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)
    - [Keyed collections](#keyed_collections)
      - [Map](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
      - [Set](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
      - [WeakMap](/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
      - [WeakSet](/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
    - [Structured data](#structured_data)
      - [ArrayBuffer](/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
      - [SharedArrayBuffer](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
      - [DataView](/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
      - [Atomics](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
      - [JSON](/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    - [Managing memory](#managing_memory)
      - [WeakRef](/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
      - [FinalizationRegistry](/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)
    - [Control abstraction objects](#control_abstraction_objects)
      - [Iterator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
      - [AsyncIterator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
      - [Promise](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
      - [GeneratorFunction](/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
      - [AsyncGeneratorFunction](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction)
      - [Generator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
      - [AsyncGenerator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
      - [AsyncFunction](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)
    - [Reflection](#reflection)
      - [Reflect](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
      - [Proxy](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    - [Internationalization](#internationalization)
      - [Intl](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
      - [Intl.Collator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
      - [Intl.DateTimeFormat](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
      - [Intl.DisplayNames](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
      - [Intl.DurationFormat](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat)
      - [Intl.ListFormat](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
      - [Intl.Locale](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
      - [Intl.NumberFormat](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
      - [Intl.PluralRules](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
      - [Intl.RelativeTimeFormat](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
      - [Intl.Segmenter](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)

---

abc

---

## Built-ins

[JavaScript standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects), along with their methods and properties.

### Value properties

- globalThis
- Infinity
- NaN
- undefined

### Function properties

- eval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
- decodeURI()
- decodeURIComponent()
- encodeURI()
- encodeURIComponent()
- escape() Deprecated
- unescape() Deprecated

### Fundamental objects

Object
Function
Boolean
Symbol

### Error objects

Error
AggregateError
EvalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError
InternalError Non-standard

### Numbers and dates

Number
BigInt
Math
Date

### Text processing

String
RegExp

### Indexed collections

Array
Int8Array
Uint8Array
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
BigInt64Array
BigUint64Array
Float32Array
Float64Array

### Keyed collections

Map
Set
WeakMap
WeakSet

### Structured data

ArrayBuffer
SharedArrayBuffer
DataView
Atomics
JSON

### Managing memory

WeakRef
FinalizationRegistry

### Control abstraction objects

Iterator
AsyncIterator
Promise
GeneratorFunction
AsyncGeneratorFunction
Generator
AsyncGenerator
AsyncFunction

### Reflection

Reflect
Proxy

### Internationalization

Intl
Intl.Collator
Intl.DateTimeFormat
Intl.DisplayNames
Intl.DurationFormat
Intl.ListFormat
Intl.Locale
Intl.NumberFormat
Intl.PluralRules
Intl.RelativeTimeFormat
Intl.Segmenter

## Statements

[JavaScript statements and declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)

### Control flow

return
break
continue
throw
if...else
switch
try...catch

### Declaring variables

var
let
const

### Functions and classes

function
function*
async function
async function*
class

### Iterations

do...while
for
for...in
for...of
for await...of
while

### Others

Empty
Block
Expression statement
debugger
export
import
label
with Deprecated

## Expressions and operators

[JavaScript expressions and operators.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

### Primary expressions

- [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#literals)
- [`[]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [`{}`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
- [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class)
- [`function*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function*)
- [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
- [`async function*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function*)
- [`/ab+c/i`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [`( )`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping)

### Left-hand-side expressions

- [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
- [`?.`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
- [`new.target`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target)
- [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)
- [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
- [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)

### Increment and decrement

- [Postfix increment (`a++`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)
- [Postfix decrement (`a--`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement)
- [Prefix increment (`++a`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)
- [Prefix decrement (`--a`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement)

### Unary operators

- [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
- [`void`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
- [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [Unary plus (`+`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus)
- [Unary negation (`-`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation)
- [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

### Arithmetic operators

- Exponentiation (`**`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation)
- Multiplication (`*`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication)
- Division (`/`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division)
- Remainder (`%`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
- Addition (`+`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition)
- Subtraction (`-`): [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction)

### Relational operators

- [ `<` ](/en-US/docs/Web/JavaScript/Reference/Operators/Less_than) (Less than)
- [ `>` ](/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than) (Greater than)
- [ `<=` ](/en-US/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal)
- [ `>=` ](/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal)
- [ `instanceof` ](/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
- [ `in` ](/en-US/docs/Web/JavaScript/Reference/Operators/in)

### # Equality operators

# !=

!==

### Bitwise shift operators

<<

> > >

### Binary bitwise operators

&
|
^

### Binary logical operators

&&
||
??

### Conditional (ternary) operator

(condition ? ifTrue : ifFalse)

### # Assignment operators

- `=`
- `*=`
- `/=`
- `%=`
- `+=`
- `-=`
- `<<=`
- `>>=`
- `>>>=`
- `&=`
- `^=`
- `|=`
- `**=`
- `&&=`
- `||=`
- `??=`
- `[a, b] = arr, { a, b } = obj`

### Yield operators

- `yield`
- `yield*`

### Spread syntax

- `...obj`

### Comma operator

- `,`

## Functions

[JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).

- Arrow Functions
- Default parameters
- Rest parameters
- arguments
- Method definitions
- getter
- setter

## Classes

[JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

- constructor
- extends
- Private properties
- Public class fields
- static
- Static initialization blocks

## Additional reference pages ― Additional JavaScript reference pages.

- [Lexical grammar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)
- [Data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Trailing commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas)
- [Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)
- [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
- [Deprecated features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features)

## Source and Reference

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

CC-BY-SA v2.5 Created by Luxcium with content from Mozilla and by Mozilla Contributors.
