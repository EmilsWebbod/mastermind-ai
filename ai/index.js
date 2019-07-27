import { getData } from './data.js';

const container = {
  name: 'Model Training',
  styles: { height: '1000px' }
};
const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];

export async function train(model, size = 10) {
  const fitCallacks = tfvis.show.fitCallbacks(container, metrics);
  const TRAIN_BATCHES = 512;
  const EPOCHS = 25;

  const [xs, ys] = tf.tidy(() => {
    const { inputs, labels } = getData(size);
    return [inputs, labels];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const { inputs, labels } = getData(size);
    return [inputs, labels];
  });

  return await model.fit(xs, ys, {
    epochs: EPOCHS,
    validationData: [testXs, testYs],
    batchSize: TRAIN_BATCHES,
    shuffle: true,
    callbacks: fitCallacks
  });
}

export function validate(model, size = 10) {
  const { inputs, labels } = getData(size);

  const predictions = model.predict(inputs);

  return [predictions, labels];
}