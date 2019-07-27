import {COLOR_SIZE} from "./constants.js";

export function getColor(color) {
  switch (color) {
    case 1: return '#fff';
    case 2: return '#000';
    case 3: return 'red';
    case 4: return 'green';
    case 5: return 'blue';
    case 6: return 'yellow';
    default: return 'transparent';
  }
}

export function getRandomColor() {
  return Math.ceil(Math.random() * COLOR_SIZE);
}

export function getRandomColors(length = 4) {
  return new Array(length).fill(0).map(() => getRandomColor());
}