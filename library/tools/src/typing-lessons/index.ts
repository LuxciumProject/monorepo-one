import * as tf from '@tensorflow/tfjs-node-gpu';

tf.tensor;
// tf.scalar
// tf.tensor1d
// tf.tensor2d
// tf.tensor3d
// tf.tensor4d
// tf.tensor5d
// tf.tensor6d
// tf.buffer
// tf.clone
// tf.complex
// tf.diag
// tf.eye
// tf.fill
// tf.imag
// tf.linspace
// tf.oneHot
// tf.ones
// tf.onesLike
// tf.print
// tf.range
// tf.real
// tf.truncatedNormal
// tf.variable
// tf.zeros
// tf.zerosLike

export const letterLists = [
  [
    ['1', '2', '3', '4', '5'],
    ['q', 'w', 'e', 'r', 't'],
    ['a', 's', 'd', 'f', 'g'],
    ['z', 'x', 'c', 'v', 'b'],
  ],
  [
    ['6', '7', '8', '9', '0'],
    ['y', 'u', 'i', 'o', 'p'],
    ['h', 'j', 'k', 'l', ';'],
    ['n', 'm', ',', '.', 'é'],
  ],
];

export function letterMixer() {
  return '';
}

/*
[[
['1','2','3','4','5'],
['q','w','e','r','t'],
['a','s','d','f','g'],
['z','x','c','v','b'],
],[
['6','7','8','9','0'],
['y','u','i','o','p'],
['h','j','k','l',';'],
['n','m',',','.','é'],
]]

 */
