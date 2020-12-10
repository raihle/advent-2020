import { product } from "../util/math";

export const countGaps = function (inputNumbers: Array<number>) {
  const gaps = [-1, 0, 0, 1];
  let lastNumber = 0;

  for (const number of inputNumbers) {
    gaps[number - lastNumber]++;
    lastNumber = number;
  }

  return {
    gaps,
    multiplied: gaps[1] * gaps[3],
  };
};

export const countValidPermutations = function (inputNumbers: Array<number>) {
  // Split input on gaps of 3, count the number of sub-permutations, then multiply
  // Start with 0 as the input joltage
  const subLists = [[0]];
  let lastNumber = 0;
  for (const number of inputNumbers) {
    if (number - lastNumber >= 3) {
      subLists.push([]);
    }
    subLists[subLists.length - 1].push(number);
    lastNumber = number;
  }
  return product(subLists.map((list) => helper(list)));

  function helper(subList: Array<number>, startAt: number = -3) {
    // Every time an adapter is selected, we can multiply the number of permutations up to that length with the number of permutations of a list of the remaining length + 1
    // At any time, there are at most three choices for the next adapter.
    // We can easily split at gaps of size 3 (already done), because that means the sub-lists have no way of affecting each-other - and we must always pick the first and last adapter in each sub-list
    // We will still have a choice for the very first adapter in the list
    // Given the input we can also assume that all gaps will be of size 1 (but we don't make use of that here)
    // TODO there should be a nice-ish mathematical expression for this, with no need for recursion
    // Observed pattern:
    // If the length is 1 or 2, there is just one permutation: 11
    // If the length is 3, there are two permutations: 101, 111
    // If the length is 4, there are four permutations: 1001, 1011, 1101, 1111
    // If the length is 5, there are seven permutations: 10011, 10101, 10111, 11001, 11011, 11101, 11111
    // If the length is 6, there are thirteen permutations: 100101, 100111, 101001, 101011, 101101, 101111, 110011, 110101, 110111, 111001, 111011, 111101, 111111
    // If the length is 7, there are twenty-four permutations: 1001001, 1001011, 1001101, 1001111, 1010011, 1010101, 1010111, 1011001, 1011011, 1011101, 1011111, 1100101, 1100111, 1101001, 1101011, 1101101, 1101111, 1110011, 1110101, 1110111, 1111001, 1111011, 1111101, 1111111

    if (subList.length <= 1) {
      // Always pick the last one, because next we have a gap of 3
      return 1;
    }
    if (subList[0] >= startAt + 3) {
      // We have to pick this one because of the preceeding gap
      return helper(subList.slice(1), subList[0]);
    } else {
      return (
        // Branch (pick + no-pick) and recurse
        helper(subList.slice(1), subList[0]) + helper(subList.slice(1), startAt)
      );
    }
  }
};
