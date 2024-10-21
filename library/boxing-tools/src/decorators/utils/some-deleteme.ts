let resolver: <T>(value: T) => void;
let rejecter: (reason: unknown) => void;

const somePromise = new Promise((resolve, reject) => {
  resolver = resolve;
  rejecter = reject;
});

async function main() {
  resolver('Hello, World!');
  void rejecter;
  const result = await somePromise;
  console.log(result);
}
main().then().catch();
