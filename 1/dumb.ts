export const findPairWithSum = function (
  numbers: Array<number>,
  targetSum: number
): Array<number> {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === targetSum) {
        return [numbers[i], numbers[j]];
      }
    }
  }
  throw new Error("No available numbers sum to the target");
};

export const findTripletWithSum = function (
  numbers: Array<number>,
  targetSum: number
): Array<number> {
  for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === targetSum) {
          return [numbers[i], numbers[j], numbers[k]];
        }
      }
    }
  }
  throw new Error("No available numbers sum to the target");
};
