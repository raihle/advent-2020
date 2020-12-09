import { blocksAsArray } from "../util/readFile";
import {
  countUniqueCharacters,
  countCommonCharacters,
} from "./countCharacters";

import { sum } from "../util/math";

const inputBlocks = blocksAsArray("6/input.txt");
const uniqueAnswers = inputBlocks.map(countUniqueCharacters);
const commonAnswers = inputBlocks.map(countCommonCharacters);

console.log("Part 1", sum(uniqueAnswers));
console.log("Part 2", sum(commonAnswers));
