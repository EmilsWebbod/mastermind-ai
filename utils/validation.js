export function getPinHelpers(correct, guess) {
  const hasMatch = [false, false, false, false];

  if (guess.some(x => x === 0)) {
    return [0, 0, 0, 0];
  }

  const matches = correct.map((currectNumber, ci) => {

    if (currectNumber === guess[ci]) {
      hasMatch[ci] = true;
      return 2;
    }

    return guess.some((currentGuess, gi) => {
      if (!hasMatch[gi] && currentGuess === currectNumber && correct[gi] !== currentGuess) {
        hasMatch[gi] = true;
        return true;
      }
      return false;
    }) ? 1 : 0
  });

  return matches.sort( (a, b) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  });
}