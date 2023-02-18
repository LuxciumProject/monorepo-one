import * as tf from '@tensorflow/tfjs-node-gpu';

async function run_01() {
  // Define a tensor with a single scalar value of `1`.
  const x = tf.tensor1d([1]);

  // Define a simple mathematical operation that adds `1` to the tensor.
  const y = x.add(1);

  // Print the result of the operation.
  console.log(await y.data());

  // Define two tensors with random values.
  const a = tf.randomNormal([500, 500]);
  const b = tf.randomNormal([500, 500]);

  // Define a mathematical operation that computes the dot product of two matrices.
  const c = tf.matMul(a, b);

  // Compute the sum of all elements in the result tensor.
  const d = c.sum();

  // Print the result of the operation.
  console.log(await d.data());
}

run_01();

async function run() {
  // Define the size of the matrices.
  const size = 100;

  // Generate random data for the matrices.
  const a = tf.randomNormal([size, size]);
  const b = tf.randomNormal([size, size]);

  // Perform matrix multiplication repeatedly.
  for (let i = 0; i < 10; i++) {
    const result = a.matMul(b);

    // Keep the memory of the intermediate result to avoid garbage collection.
    result.data();
  }
}
console.log(tf.getBackend());
run();
console.log('Back end:', tf.getBackend());
// console.log('List devices:', tf.config.listDevices());
