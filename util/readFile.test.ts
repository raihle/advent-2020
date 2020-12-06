import { linesAsArray, blocksAsArray } from "./readFile";

describe("linesAsArray", () => {
  describe("Reads all lines of a file and returns them as an array of strings", () => {
    it("For files with terminating new-lines", () => {
      expect(linesAsArray("util/input-with-final-newline.txt")).toEqual([
        "a",
        "b",
      ]);
    });

    it("For files without terminating new-lines", () => {
      expect(linesAsArray("util/input-without-final-newline.txt")).toEqual([
        "a",
        "b",
      ]);
    });
  });
});

describe("blocksAsArray", () => {
  it("Reads all lines of a file and returns blocks separated by an empty line, with intra-block newlines preserved", () => {
    expect(blocksAsArray("util/input-with-blocks.txt")).toEqual([
      "a\nb",
      "cd",
      "e\nf",
    ]);
  });
});
