import { linesAsArray } from "../util/readFile";
import { ValueBitmaskMemory, AddressBitmaskMemory } from "./memory";
import { sum } from "../util/math";

const MASK_REGEX = /^mask = (?<mask>[01X]+)$/;
const SET_REGEX = /^mem\[(?<address>\d+)] = (?<value>\d+)$/;

const inputLines = linesAsArray("14/input.txt");

console.log("Part 1", part1(inputLines));
console.log("Part 2", part2(inputLines));

function part1(lines: Array<string>) {
  return runner(new ValueBitmaskMemory(36), lines);
}

function part2(lines: Array<string>) {
  return runner(new AddressBitmaskMemory(36), lines);
}

function runner(memory, lines) {
  lines.forEach((line) => {
    const mask = MASK_REGEX.exec(line);
    if (mask) {
      memory.mask = mask.groups.mask;
    } else {
      const set = SET_REGEX.exec(line);
      memory.setAt(set.groups.address, parseInt(set.groups.value, 10));
    }
  });
  return sum(memory.entries.map(([_key, value]) => value));
}
