import { linesAsArray } from "../util/readFile";
import { parseInstructions, parseId } from "./binaryPartition";

const inputLines = linesAsArray("5/input.txt");
const seats = inputLines.map(parseInstructions);

console.log("Part 1", findHighestSeatId(seats));
console.log("Part 2", findMissingSeatId(seats));

function findHighestSeatId(seatingInstructions) {
  return seatingInstructions.sort((a, b) => b.id - a.id)[0];
}

function findMissingSeatId(seats) {
  const sortedIds = seats.map(({ id }) => id).sort((a, b) => a - b);
  let previousId = sortedIds[0] - 1;
  for (const currentId of sortedIds) {
    if (currentId > previousId + 1) {
      return previousId + 1;
    }
    previousId = currentId;
  }
}
