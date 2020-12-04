import { blocksAsArray } from "../util/readFile";
import { hasRequiredFields, areFieldsValid } from "./passportValidator";

const inputLines = blocksAsArray("4/input.txt");

console.log("Part 1", inputLines.filter(hasRequiredFields).length);
console.log(
  "Part 2",
  inputLines.filter(hasRequiredFields).filter(areFieldsValid).length
);
