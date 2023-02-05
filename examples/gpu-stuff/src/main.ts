export {};

/**
 * Main is the internal code entry point it should be executed by
 * itself and MUST NOT BE IMPORTED FROM index.ts file
 */
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
 const tf = require('@tensorflow/tfjs-node');

const summaryWriter = tf.node.summaryFileWriter('/tmp/tfjs_tb_logdir');

for (let step = 0; step < 100; ++step) {
  summaryWriter.scalar('dummyValue', Math.sin(2 * Math.PI * step / 8), step);
}
  return void 0;
})();
