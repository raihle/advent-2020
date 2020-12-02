import { linesAsArray } from "../util/readFile";
import {
  FindWithOccurrencesInput,
  findStringsWithOccurrences,
} from "./findStringsWithOccurences";
import {
  findStringsWithSubstringsAtExactlyOneIndex,
  FindWithSubstringsAtInput,
} from "./findStringsWithSubstringsAt";

import { parseLine, ParsedLine } from "./inputParser";

const inputLines = linesAsArray("2/input.txt").map(parseLine);

console.log("Part 1", part1(inputLines));
console.log("Part 2", part2(inputLines));

function part1(inputLines: Array<ParsedLine>) {
  const validPasswords = findStringsWithOccurrences(
    inputLines.map(({ text, substring, numbers }) => ({
      text,
      substring,
      minOccurrences: numbers[0],
      maxOccurrences: numbers[1],
    }))
  );
  return validPasswords.length;
}

function part2(inputLines: Array<ParsedLine>) {
  const validPasswords = findStringsWithSubstringsAtExactlyOneIndex(
    inputLines.map(({ text, substring, numbers }) => ({
      text,
      substring,
      indexes: numbers.map((number) => number - 1),
    }))
  );
  return validPasswords.length;
}
