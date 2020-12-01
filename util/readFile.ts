import { readFileSync } from "fs";
import { resolve } from "path";

export const linesAsArray = function (filename) {
  const contents = readFileSync(resolve(process.cwd(), filename), "utf8").split(
    "\n"
  );
  if (contents[contents.length - 1] === "" && contents.length > 1) {
    return contents.slice(0, contents.length - 1);
  }
  return contents;
};
