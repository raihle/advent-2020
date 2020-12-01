import { linesAsArray } from "../util/readFile";
//import { findPairWithSum, findTripletWithSum } from "./dumb";

// The recursive and flexible variant is somehow about 20% faster!
import { findPairWithSum, findTripletWithSum } from "./recursive";

const numbers = linesAsArray("1/input.txt").map((num) => parseInt(num));
console.time();
console.log("Part 1", part1(2020, numbers));
console.log("Part 2", part2(2020, numbers));
console.timeEnd();

function part1(sum, numbers) {
  const [a, b] = findPairWithSum(numbers, sum);
  return a * b;
}

function part2(sum, numbers) {
  const [a, b, c] = findTripletWithSum(numbers, sum);
  return a * b * c;
}
