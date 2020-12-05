import { linesAsArray } from "../util/readFile";

const inputLines = linesAsArray("5/input.txt");
const sortedSeatIds = inputLines.map(parseToId).sort((a, b) => a - b);

console.log("Part 1", sortedSeatIds[sortedSeatIds.length - 1]);
console.log("Part 2", findMissingSeat(sortedSeatIds));

function findMissingSeat(sortedSeatIds) {
  let previousId = sortedSeatIds[0] - 1;
  for (const currentId of sortedSeatIds) {
    if (currentId > previousId + 1) {
      return previousId + 1;
    }
    previousId = currentId;
  }
}

function parseToId(instructions: string) {
  const binary = instructions.replace(/[BR]/g, "1").replace(/[FL]/g, "0");
  const id = parseInt(binary, 2);
  return id;
}
