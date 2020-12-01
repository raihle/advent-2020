export const findPairWithSum = function (
  numbers: Array<number>,
  targetSum: number
) {
  return findTupleWithSum(2, numbers, targetSum);
};

export const findTripletWithSum = function (
  numbers: Array<number>,
  targetSum: number
) {
  return findTupleWithSum(3, numbers, targetSum);
};

export const findTupleWithSum = function (
  tupleSize: number,
  numbers: Array<number>,
  targetSum: number
): Array<number> {
  const result = helper(numbers, 0, tupleSize, targetSum);
  if (result.success) {
    return result.numbers;
  }
  throw new Error("No tuple can be created which sums to the target");
};

function helper(numbers, startIndex, leftToPick, target) {
  if (leftToPick <= 1) {
    if (numbers.indexOf(target) >= 0) {
      return {
        success: true,
        numbers: [target],
      };
    }
    return {
      success: false,
    };
  }
  for (let i = startIndex; i < numbers.length - (leftToPick - 1); i++) {
    const result = helper(numbers, i + 1, leftToPick - 1, target - numbers[i]);
    if (result.success) {
      return {
        success: true,
        numbers: [numbers[i], ...result.numbers],
      };
    }
  }
  return {
    success: false,
  };
}
