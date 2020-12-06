import { readFileSync } from "fs";
import { resolve } from "path";

export const linesAsArray = function (filename) {
  const contents = readFileSync(resolve(process.cwd(), filename), "utf8").split(
    "\n"
  );
  return trimWhiteSpace(contents);
};

export const blocksAsArray = function (filename) {
  const contents = readFileSync(resolve(process.cwd(), filename), "utf8").split(
    "\n\n"
  );

  return trimWhiteSpace(contents);
};

function trimWhiteSpace(lines) {
  return trimTerminatingNewLine(lines.map((line) => line.trim()));
}
function trimTerminatingNewLine(lines) {
  if (lines[lines.length - 1] === "") {
    return lines.slice(0, lines.length - 1);
  }
  return lines;
}
