import { product } from "../util/math";

export const countGaps = function (inputNumbers: Array<number>) {
  const gaps = [undefined, 0, 0, 1];
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

export const countValidVariations = function (inputNumbers: Array<number>) {
  // Split input on gaps of 3, count the number of variations for each, then multiply them
  // Because each sub-list needs to include its first and last option (to bridge the gap of 3) any choices within a sub-list cannot affect the other sub-lists
  // Add 0 to represent the input joltage.
  // We don't need to add the output joltage because we know it's always 3 away from the last adapter, so it can't contribute to permutations
  const subLists = splitOnGaps([0, ...inputNumbers], 3);
  return product(subLists.map((list) => helper(list)));

  function helper([x, ...xs]: Array<number>, startAt: number = -3) {
    // -3 works as a default "starting" number because it guarantees that we will pick the first adapter in a sublist
    /*
    Every time an adapter is selected, we can multiply the number of permutations up to that length with the number of permutations of a list of the remaining length + 1
    At any time, there are at most three choices for the next adapter.
    We can easily split at gaps of size 3 (already done), because that means the sub-lists have no way of affecting each-other - and we must always pick the first and last adapter in each sub-list
    We will still have a choice for the very first adapter in the list
    Given the input we can also assume that all gaps will be of size 1 (but we don't make use of that here)
    
    There should be a nice-ish mathematical expression for this, with no need for recursion
    Observed pattern:
    If the length is 1 or 2, there is just one permutation: 11
    If the length is 3, there are two permutations: 101, 111
    If the length is 4, there are four permutations: 1001, 1011, 1101, 1111
    If the length is 5, there are seven permutations: 10011, 10101, 10111, 11001, 11011, 11101, 11111
    If the length is 6, there are thirteen permutations: 100101, 100111, 101001, 101011, 101101, 101111, 110011, 110101, 110111, 111001, 111011, 111101, 111111
    If the length is 7, there are twenty-four permutations: 1001001, 1001011, 1001101, 1001111, 1010011, 1010101, 1010111, 1011001, 1011011, 1011101, 1011111, 1100101, 1100111, 1101001, 1101011, 1101101, 1101111, 1110011, 1110101, 1110111, 1111001, 1111011, 1111101, 1111111

    An analogous question seems to be "in how many ways can we split a list of n items into smaller lists of 1-3 items"
    Splitting into lists of any length is easy (2^(n-1)) but the limitation throws a wrench in that.
    I can't figure a mathematical expression out.
    Right now the computation is pretty quick, and works even if there are gaps of size 2 mixed in.
    Don't want to add complexity or sacrifice generality in order to memoize, so I'll leave it unless inspiration strikes
    */

    if (xs.length === 0) {
      // Always pick the last one, because next we have a gap of 3
      return 1;
    }
    if (x >= startAt + 3) {
      // We have to pick this one because of the preceeding gap
      return helper(xs, x);
    } else {
      return (
        // Branch (pick + no-pick) and recurse
        helper(xs, x) + helper(xs, startAt)
      );
    }
  }
};

function splitOnGaps(inputNumbers: Array<number>, gap: number) {
  const subLists = [];
  let lastNumber = -gap;
  for (const number of inputNumbers) {
    if (number - lastNumber >= gap) {
      subLists.push([]);
    }
    subLists[subLists.length - 1].push(number);
    lastNumber = number;
  }
  return subLists;
}
