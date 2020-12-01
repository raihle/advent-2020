import { findPairWithSum, findTripletWithSum } from "./dumb";

const testArray = [1721, 979, 366, 299, 675, 1456];

describe("Dumb approach", () => {
  describe("findPairWithSum", () => {
    describe("Finds a pair of the given numbers which sums to the target", () => {
      it("299, 1721", () => {
        expect(findPairWithSum(testArray, 299 + 1721).sort(numeric)).toEqual([
          299,
          1721,
        ]);
      });
      it("675, 979", () => {
        expect(findPairWithSum(testArray, 675 + 979).sort(numeric)).toEqual([
          675,
          979,
        ]);
      });
    });
    it("Throws an error if no solution was found", () => {
      expect(() => findPairWithSum([], 1)).toThrow();
    });
  });

  describe("findTripletWithSum", () => {
    describe("Finds a triplet of the given numbers which sums to the target", () => {
      it("299, 1721, 675", () => {
        expect(
          findTripletWithSum(testArray, 299 + 675 + 1721).sort(numeric)
        ).toEqual([299, 675, 1721]);
      });
    });

    it("Throws an error if no solution was found", () => {
      expect(() => findTripletWithSum([], 1)).toThrow();
    });
  });
});

function numeric(a, b) {
  return a - b;
}
