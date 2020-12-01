import { linesAsArray } from "./readFile";

describe("Readfile", () => {
  describe("Array", () => {
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
});
