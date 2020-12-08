import { linesAsArray } from "../util/readFile";
import { parseProgram, runUntilLoop, fixAndRun } from "./simpleMachineLanguage";

const inputLines = linesAsArray("8/input.txt");
const program = parseProgram(inputLines);

console.log("Part 1", runUntilLoop(program));
console.log("Part 2", fixAndRun(program));
