import { train, validate } from './ai/index.js';
import {getModel} from "./ai/model.js";

const classNames = ['Zero', 'One', 'Two', 'Three'];

async function run() {
  const model = await getModel('mastermind');
  tfvis.show.modelSummary({ name: 'Model Architecture' }, model);

  tf.enableProdMode()

  await train(model, 50000);

  localStorage.clear();
  await model.save('localstorage://mastermind');

  const [predictions, labels] = validate(model, 10);

  predictions.print()
  labels.print()

  const classAccuracy = await tfvis.metrics.accuracy(labels, predictions);
  const container = { name: 'Accuracy', tab: 'Evaluation'};
  console.log(classAccuracy)

  console.log('Disposing')
  tf.disposeVariables();
}

document.addEventListener('DOMContentLoaded', run);
