import { train, validate } from './ai/index.js';
import {getModel} from "./ai/model.js";

const classNames = ['Zero', 'One', 'Two', 'Three'];

async function run() {
  const model = getModel();
  tfvis.show.modelSummary({ name: 'Model Architecture' }, model);
  await train(model, 50000);

  const [predictions, labels] = validate(model, 10);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels.as1D(), predictions.as1D());
  const container = { name: 'Accuracy', tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}

document.addEventListener('DOMContentLoaded', run);
