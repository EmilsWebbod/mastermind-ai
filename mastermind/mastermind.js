import {getRandomColors} from "../utils/colors.js";
import {getPinHelpers} from "../utils/validation.js";

const EMPTY_GUESS = [0, 0, 0, 0];
const EMPTY_GUESSES = new Array(10).fill([...EMPTY_GUESS]);

export class Mastermind {

  correct;
  guesses;
  helpers;

  constructor(
    correct = getRandomColors(),
    guesses = [...EMPTY_GUESSES],
    helpers = [...EMPTY_GUESSES]
  ) {
    this.correct = correct;
    this.guesses = guesses;
    this.helpers = helpers;
  }

  static getRandomMind() {
    const correct = getRandomColors();

    const guesses = EMPTY_GUESSES.map((g, i) => {
      if (i !== 9) {
        return getRandomColors()
      }
      return [0, 0, 0, 0];
    });

    const helpers = guesses.map((guess, i) => {
      if (i !== 9) {
        return getPinHelpers(correct, guess)
      }
      return [0, 0, 0, 0];
    });

    return new Mastermind(correct, guesses, helpers);
  }
}