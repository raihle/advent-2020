import { linesAsArray } from "../util/readFile";
import { countGaps, countValidVariations } from "./countGaps";
const inputLines = linesAsArray("10/input.txt");
const numbers = inputLines.map((line) => parseInt(line)).sort((a, b) => a - b);

console.log("Part 1", countGaps(numbers));
console.log("Part 2", countValidVariations(numbers));
