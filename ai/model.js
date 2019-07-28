import {INPUT_LENGTH, OUTPUT_LENGTH} from "../utils/constants.js";

export async function getModel(fromStorage = false) {

  if (fromStorage) {
    const model = await tf.loadLayersModel(`localstorage://${fromStorage}`);
    model.compile({
      optimizer: tf.train.adam(.0005),
      loss: tf.losses.softmaxCrossEntropy,
      metrics: ['accuracy']
    });

    return model;
  }

  const model = tf.sequential();

  model.add(tf.layers.dense({
    inputShape: [INPUT_LENGTH],
    units: 128,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
    trainable: true,
    useBias: true
  }));

  model.add(tf.layers.dense({
    units: 128,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
    trainable: true,
    useBias: true
  }));

  model.add(tf.layers.dense({
    units: OUTPUT_LENGTH,
    activation: 'softmax'
  }));

  model.compile({
    optimizer: tf.train.adam(.001),
    loss: tf.losses.softmaxCrossEntropy,
    metrics: ['accuracy']
  });

  return model;
}
