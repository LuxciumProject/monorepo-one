import * as tf from '@tensorflow/tfjs-node-gpu';
import * as fs from 'fs';

// Define the path to the image directory
const IMAGE_DIR = '/home/luxcium/Images/unsplash';
// Define the path to the label data file
const LABEL_FILE = './data/labels.json';
// Define the path to the training data file
const TRAINING_FILE = './data/training.json';
//
async function main() {
  // Load the label data
  const labels = JSON.parse(fs.readFileSync(LABEL_FILE, 'utf-8'));

  // Load the image data
  const imagePaths = fs.readdirSync(IMAGE_DIR);
  const imageTensors = [];
  for (const path of imagePaths) {
    const imageBuffer = fs.readFileSync(`${IMAGE_DIR}/${path}`);
    const imageTensor = tf.node.decodeImage(imageBuffer);
    imageTensors.push(imageTensor);
  }

  // Build the model
  const model = tf.sequential();
  model.add(tf.layers.flatten({ inputShape: [28, 28, 3] }));
  model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  // Train the model
  const xs = tf.stack(imageTensors);
  const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 10);
  await model.fit(xs, ys, { epochs: 10 });

  // Save the training data
  const trainingData = { model: model.toJSON() };
  fs.writeFileSync(TRAINING_FILE, JSON.stringify(trainingData));

  console.log('Training complete');
}

main().catch(err => console.error(err));
