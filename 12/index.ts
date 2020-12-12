import { linesAsArray } from "../util/readFile";
import { moveShipByFacing, moveShipByWaypoint } from "./shipNavigation";

const inputLines = linesAsArray("12/input.txt");

console.log("Part 1", moveShipByFacing(inputLines, "E"));

console.log("Part 1", moveShipByWaypoint(inputLines, 10, 1));
