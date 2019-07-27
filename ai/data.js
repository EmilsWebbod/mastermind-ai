import {Mastermind} from "../mastermind/mastermind.js";
import {INPUT_LENGTH, OUTPUT_LENGTH} from "../utils/constants.js";

export function getData(length = 10) {
  const trainStates = new Array(length).fill(0).map(Mastermind.getRandomMind);

  const inputs = trainStates.map(x => getInputs(x.guesses, x.helpers));
  const labels = trainStates.map(x => x.correct);

  const inputTensor = tf.tensor2d(inputs, [inputs.length, INPUT_LENGTH]);
  const labelTensor = tf.tensor2d(labels, [labels.length, OUTPUT_LENGTH]);

  const inputMax = inputTensor.max();
  const inputMin = inputTensor.min();
  const labelMax = labelTensor.max();
  const labelMin = labelTensor.min();

  const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
  const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

  return {
    inputs: normalizedInputs,
    labels: normalizedLabels,

    inputMax,
    inputMin,
    labelMax,
    labelMin
  };
}

export function getInputs(guesses, helpers) {
  return guesses.map((x, i) => ([
    ...x.map(y => y),
    ...helpers[i].map(y => y)
  ])).flat();
}