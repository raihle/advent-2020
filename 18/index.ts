import { linesAsArray } from "../util/readFile";
import { evaluateExpression } from "../18/leftToRightMath";
import { sum } from "../util/math";

const lines = linesAsArray("18/input.txt");

console.log(
  "Part 1",
  sum(lines.map((line) => evaluateExpression(line, false)))
);
console.log("Part 2", sum(lines.map((line) => evaluateExpression(line, true))));
