# @luxcium/parallel-mapping v0.0.0-rc-0.0.2

Development phase: no tests, no documentation, full TypeScript support parallele IO and Worker Threads mapping support with limits of concurent tasks.

## Installation

Using npm:

```bash
  $ npm install --save @luxcium/parallel-mapping
```

Using yarn:

```bash
  $ yarn add @luxcium/parallel-mapping
```

## APIs

### Abstract (summary)

A Array.map() is a very useful function but, unfortunately, it only works with synchronous functions. A simple workaround for using async map functions is to use Promise.all() or its more tolerant brother Promise.allSettled()

There’s a catch though: unlike a “normal” .map(), the map functions will not execute serially. The async map functions will be running at the same time. Although JavaScript is normally a single-threaded language, it means the resources allocated (like memory and ports) for each function will be occupied until the promise is resolved or rejected. For huge arrays, however, we are going to run a huge number of map functions at the same time.

this parallel mapping api give you the possibility to use a limit to set the maximum paralelle execution of your mapping function trough the array.

The limit defaults to the array length, which makes mapAllSettled() behave exactly like Promise.allSettled() because all the map functions will run in parallel. But the whole point of this function is to give the users control to set that to a lower number.

This can potentially:

    Consume a lot of memory as each map function holds all its variables as long as it is running. If you’re running lambda, for example, it may easily crash your runtime (or you have to pay extra to bump to a beefier execution runtime)

    Hit the rate limits: if the map is accessing an API for each call

It works like this: the .map() will convert each array item to a promise, so we’ll end up with an array of promises to resolve. There are two ways of doing this:

    Promise.all() throws if the map function throws (MDN)
    Promise.allSettled() runs the map function for the whole array even if sometimes it throws (MDN)

Therefore, the output of the .allSettled() is an array of objects that tells whether the execution failed or not.

### IO_Mapper

The **IO Mapper API** is the easiest of the two aproachs it conssit of a single function

### CPU_Mapper

A straight forward approch is used so that you can have similar APIs regardles if you are using the `CPU_Mapper` flavour or the `IO_Mapper` flavour the only diference betwen both `IO_Mapper` and `CPU_Mapper` is that with `CPU_Mapper` it is first required to call it with a _filename_ `string` a parameter, which is descibe below, used internally by the NodeJS _Worker Threads_. It then produce an intermediat callable function of the same signature as `IO_Mapper`, the return types of both APIs is implemented differently and it will be described in details winthin the example section.

The **CPU Mapper API** is a wrapper for _'worker threads'_ using the [NodeJS Worker class (_added in: NodeJS v10.5.0_)](https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_class_worker) the signature of the function is describes below folowed by a description of the types used. The return type is explained later in this documentation.

#### Signatures

```typescript
function CPU_Mapper(
  filename: string
): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number
) => CPU_MapperRetunType<R>;
```

The `CPU_Mapper` function consume first a _filename_ `string` (the `filename` argument is descibe below) and return a function which takes 3 arguments:

- `list: T[]`, A list: an array of element all of the same type `T`.
- `mapFn: Mapper<T, R>`, A mapping function: a function of type `Mapper<A, B>` used as a mapper which apply a tranformation from the input type `T` to the output of type `R` over each element of the list.
- `limit?: number` A limit (optional): a number representing the maximum cocurent workers used to splitt the workload of mapping over each element of the list. If the value is not provided the `os.cpus().length` is used instead but will be limited to the length of the list with `Math.min(limit, list.length)`.

```typescript
function CPU_Mapper(
  filename: string
): <T, R>(cpuMapperArgs: MapperArgs<T, R>) => CPU_MapperRetunType<R>;
```

> All 3 parameter can be combined into a single argument as an object with values of same name and similar type `{list, mapFn, limit}`. The argument object type is `CPU_MapperArgs<TVal, RVal>`. In such case the 2nd and 3rd argument can be passed as _empty_, `null` or `undefined`.

The `filename` argument is passed to the Worker constructor as is and therefor must be compatible whit the argument of the same name described in nodeJs documentation:

- filename `<string>` | `<URL>` The path to the Worker's main script or module. Must be either an absolute path or a relative path (i.e. relative to the current working directory) starting with ./ or ../, or a WHATWG URL object using file: or data: protocol. When using a data: URL, the data is interpreted based on MIME type using the ECMAScript module loader.

There is a caveat that is, the `filename` parameter canot be a string containing JavaScript code rather than a path. It must point to where the _CPU Mapper_ will be consumed. For more infomarion take a look at the examples below.

### Types

```typescript
type Mapper<A, B> = (value: A, index?: number, array?: readonly A[]) => B;
```

```typescript
type MapperArgs<TVal, RVal> = {
  list: T[];
  mapFn: Mapper<TVal, RVal>;
  limit?: number;
};
```

```typescript
type CPU_MapperRetunType<U> = {
  mapper: () => Promise<PromiseSettledResult<U>[]>;
  thread: () => void;
};
```

---

## DOCUMENTATION INCOMPLE ― WORK IN PROGRESS

## Examples

### IO_Mapper Style

This is a super trivial (useless) example of the possible implementation for `IO_Mapper`

```typescript
async function IO_Mapper_miniExample(values: number[]) {
  const list = values;
  const mapFn = (x: number) => 2 ** x;
  const limit = 2;

  const IOMapperParams: MapperArgs<number, number> = { list, mapFn, limit };

  const result = IO_Mapper(IOMapperParams);
  const awaitedResult = await result;

  console.log(awaitedResult);
}

// run the example:
IO_Mapper_miniExample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### MIT Style Liscense

#### Copyright &copy; 2021 Benjamin Vincent Kasapoglu (Luxcium)

based on work by Alex Ewerlöf described in his _Async Map With Limited Parallelism In Node Js_ [blog post](https://medium.com/@alexewerlof/async-map-with-limited-parallelism-in-node-js-2b91bd47af70) on Medium. (Copyright © 2020-2021 Alex Ewerlöf for the source code) (CC0 1.0 Universal (CC0 1.0)
Public Domain Dedication for the Medium Article)

<!--
```
(alias) function CPU_Mapper(filename: string): <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number | undefined) => {
    mapper: () => Promise<PromiseSettledResult<R>[]>;
    thread: () => void;
}
export CPU_Mapper
The path to the Worker's main script or module.

(alias) function IO_Mapper<T, U>({ list, mapFn, limit, }: IO_MapperArgs<T, U>): Promise<PromiseSettledResult<U>[]>
export IO_Mapper
```

This is the code from a [blog post](https://medium.com/@alexewerlof/async-map-with-limited-parallelism-in-node-js-2b91bd47af70)

 -->
