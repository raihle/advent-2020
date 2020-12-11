import { linesAsArray } from "../util/readFile";
import {
  Board,
  advanceUntilStable,
  advanceGeneration,
} from "./seatingGameOfLife";
const inputLines = linesAsArray("11/input.txt");

const part1Board = new Board(inputLines, Board.neighbors, 4);
console.log("Part 1", advanceUntilStable(part1Board).occupied);

const part2Board = new Board(inputLines, Board.visibleFrom, 5);
console.log("Part 2", advanceUntilStable(part2Board).occupied);
