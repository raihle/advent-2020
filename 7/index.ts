import { linesAsArray } from "../util/readFile";
import {
  childToParentMap,
  possibleAncestorsFor,
  numberOfBagsStartingWith,
  parentToChildrenMap,
} from "./bagColors";

const inputLines = linesAsArray("7/input.txt");

console.log(
  "Part 1",
  possibleAncestorsFor(childToParentMap(inputLines), "shiny gold").size - 1
);

console.log(
  "Part 2",
  numberOfBagsStartingWith(parentToChildrenMap(inputLines), "shiny gold") - 1
);
