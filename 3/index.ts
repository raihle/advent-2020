import { linesAsArray } from "../util/readFile";
import { buildTrees, countTrees } from "./trees";

const inputLines = linesAsArray("3/input.txt");
const trees = buildTrees(inputLines);

console.log("Part 1", countTrees(trees, 3));
console.log(
  "Part 2",
  countTrees(trees, 1),
  countTrees(trees, 3),
  countTrees(trees, 5),
  countTrees(trees, 7),
  countTrees(trees, 0.5, 2)
);
