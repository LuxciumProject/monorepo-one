export function* pushPullGenerator() {
  let n = 1;
  try {
    while (true) {
      if (n > 10) {
        console.log('n > 10...');
        n += 5;
        return n;
      }
      console.log('inside :>> ', n);
      n = yield n * 2;
    }
  } catch (e) {
    console.log(e);
    return n;
  } finally {
    console.log('inside :>> ', 'finally');
    return n;
  }
}
export const tryAsyncIterator = async () => ({
  [Symbol.asyncIterator]() {},
});
export const tryAsyncGenerator = async () => ({});
export const tryIterator = async () => ({
  [Symbol.iterator]() {},
});


export interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

export interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}

export interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}
export const tryGenerator = async () => ({});

const exception = RangeError('Out of range (maybe)');
let gen = pushPullGenerator();
console.log('(3)', gen.next(3)); // { value: 0, done: false }
console.log('(2)', gen.next(2)); // { value: 4, done: false }
console.log('(3)', gen.next(3)); // { value: 6, done: false }
console.log('(4)', gen.next(4)); // { value: 8, done: false }
console.log('(5)', gen.next(5)); // { value: 8, done: false }
console.log('(6)', gen.next(6)); // { value: 8, done: false }
console.log('(7)', gen.next(7)); // { value: 8, done: false }
console.log('(7)', gen.throw(exception)); // { value: 8, done: false }

console.log('();', gen.return(18)); // { value: 8, done: false }
console.log('(8)', gen.next(8)); // { value: 8, done: false }
console.log('(9)', gen.next(9)); // { value: 8, done: false }
console.log('(10)', gen.next(10)); // { value: 8, done: false }
console.log('(11)', gen.next(11)); // { value: 8, done: false }
console.log('(12)', gen.next(12)); // { value: 8, done: false }

function waitForDelay(delay: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      //@ts-ignore
      resolve();
    }, delay);
  });
}
async function* createRandomStream(randomness: number) {
  let n = 0;
  while (true) {
    let randomDelay = Math.round(Math.random() * randomness);
    await waitForDelay(randomDelay);
    n++;
    yield Math.sin(n * 2 * Math.PI);
  }
}
async function startConsumingStream() {
  let randomStream = createRandomStream(2000);
  for await (let value of randomStream) {
    console.log(value);
  }
}

startConsumingStream; // ();

// If the receiveMessage function is called before we
// started consuming the data stream, then we don't care about that
// data. In this case the function will be a no-op.
let receiveMessage: any = function () {};
function waitForNextMessage() {
  return new Promise(resolve => {
    receiveMessage = resolve;
  });
}
async function* createMessageStream() {
  while (true) {
    yield waitForNextMessage();
  }
}
async function startConsumingMessageStream() {
  let messageStream = createMessageStream();
  for await (let message of messageStream) {
    console.log(message);
  }
}


startConsumingMessageStream();

setTimeout(() => {
  receiveMessage('Hello');
}, 500);
setTimeout(() => {
  receiveMessage('world');
}, 1000);
setTimeout(() => {
  receiveMessage('!!!');
}, 3000);

const mySymbol = Symbol();
console.log(mySymbol);
