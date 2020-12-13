import { linesAsArray } from "../util/readFile";
import { earliestAvailableBus, findConsecutiveDepartures } from "./buses";

const inputLines = linesAsArray("13/input.txt");
const startWaitingAt = parseInt(inputLines[0]);
const buses = inputLines[1]
  .split(",")
  .filter((bus) => bus != "x")
  .map((bus) => parseInt(bus));

const busesWithOffsets = inputLines[1]
  .split(",")
  .map((bus, index) => ({ bus, offset: index }))
  .filter(({ bus }) => bus != "x")
  .map(({ bus, offset }) => ({ bus: parseInt(bus), offset }));

console.log("Part 1", earliestAvailableBus(startWaitingAt, buses));

console.log("Part 2", findConsecutiveDepartures(busesWithOffsets));
