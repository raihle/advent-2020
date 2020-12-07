import { blocksAsArray } from "../util/readFile";
import {
  countUniqueCharacters,
  countCommonCharacters,
} from "./countCharacters";

const inputBlocks = blocksAsArray("6/input.txt");
const uniqueAnswers = inputBlocks.map(countUniqueCharacters);
const commonAnswers = inputBlocks.map(countCommonCharacters);

console.log("Part 1", sum(uniqueAnswers));
console.log("Part 2", sum(commonAnswers));

function sum(array) {
  return array.reduce((sum, next) => sum + next, 0);
}
