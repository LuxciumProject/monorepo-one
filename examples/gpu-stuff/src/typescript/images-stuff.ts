import * as tf from '@tensorflow/tfjs-node-gpu';
import * as fs from 'fs';
import * as path from 'path';

// Constants for the model
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const IMAGE_CHANNELS = 3;
const NUM_CLASSES = 10;

// Constants for the data
const DATA_DIR = path.join(__dirname, 'data');
const MODEL_DIR = path.join(__dirname, 'models');
// const MODEL_FILE = 'model.json';
const TRAINING_FILE = 'training.json';
const TESTING_FILE = 'testing.json';
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  // Load the data
  const trainingData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, TRAINING_FILE), 'utf-8')
  );
  const testingData = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, TESTING_FILE), 'utf-8')
  );

  // Create the model
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
      filters: 32,
      kernelSize: 3,
      activation: 'relu',
    })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: NUM_CLASSES, activation: 'softmax' }));
  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  // Train the model
  const trainXs = tf.tensor4d(trainingData.images, [
    trainingData.images.length,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_CHANNELS,
  ]);
  const trainYs = tf.oneHot(
    tf.tensor1d(trainingData.labels, 'int32'),
    NUM_CLASSES
  );
  const history = await model.fit(trainXs, trainYs, {
    epochs: 10,
    validationData: [
      tf.tensor4d(testingData.images, [
        testingData.images.length,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        IMAGE_CHANNELS,
      ]),
      tf.oneHot(tf.tensor1d(testingData.labels, 'int32'), NUM_CLASSES),
    ],
    batchSize: 32,
  });

  // Save the model
  await model.save(MODEL_DIR);

  console.log('Training complete');

  return void history;
})();
/*
Layers are the building blocks of a neural network. The more layers you have in a network, the more complex representations it can learn from the data. However, adding too many layers can lead to overfitting, where the network becomes too specialized to the training data and doesn't generalize well to new, unseen data.

A tradeoff exists between the number of layers and the accuracy of the model. A model with too few layers may not have enough capacity to learn the underlying patterns in the data, leading to underfitting and poor performance. On the other hand, a model with too many layers may memorize the training data instead of learning generalizable representations, leading to overfitting and poor performance on new, unseen data.

Finding the right number of layers for a model is often an iterative process of experimentation, involving trying different numbers of layers, evaluating the performance of each model, and adjusting the number of layers accordingly. There is no hard and fast rule for the optimal number of layers, as it depends on the specific problem and the data being used.

It's worth noting that adding more layers to a model typically increases the computational cost of training and inference, so there's also a tradeoff between accuracy and computational efficiency.
*/
