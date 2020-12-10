import { linesAsArray } from "../util/readFile";
import { countGaps, countValidPermutations } from "./countGaps";
const inputLines = linesAsArray("10/input.txt");
const numbers = inputLines.map((line) => parseInt(line)).sort((a, b) => a - b);

console.time();
console.log("Part 1", countGaps(numbers));

console.log("Part 2", countValidPermutations(numbers));
console.timeEnd();
