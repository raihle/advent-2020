import { linesAsArray } from "../util/readFile";
import { findPairWithSum, findTripletWithSum } from "./findNumbersWithSum";

const numbers = linesAsArray("1/input.txt").map((num) => parseInt(num));
console.log("Part 1", part1(numbers));
console.log("Part 2", part2(numbers));

function part1(numbers: Array<number>) {
  const [a, b] = findPairWithSum(numbers, 2020);
  return a * b;
}

function part2(numbers: Array<number>) {
  const [a, b, c] = findTripletWithSum(numbers, 2020);
  return a * b * c;
}
