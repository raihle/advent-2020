import {
  hasStringOccurrences,
  findStringsWithOccurrences,
} from "./findStringsWithOccurences";

describe("hasStringOccurrences", () => {
  it("Accepts that aaa has 3 a's", () => {
    expect(
      hasStringOccurrences({
        text: "aaa",
        substring: "a",
        minOccurrences: 3,
        maxOccurrences: 3,
      })
    ).toBe(true);
  });

  it("Accepts that bbb has 0 - 1 a's", () => {
    expect(
      hasStringOccurrences({
        text: "bbb",
        substring: "a",
        minOccurrences: 0,
        maxOccurrences: 1,
      })
    ).toBe(true);
  });

  it("Rejects aaa for not having 1 b", () => {
    expect(
      hasStringOccurrences({
        text: "aaa",
        substring: "b",
        minOccurrences: 1,
        maxOccurrences: 1,
      })
    ).toBe(false);
  });

  it("Rejects ccc for having more than 2 c's", () => {
    expect(
      hasStringOccurrences({
        text: "ccc",
        substring: "c",
        minOccurrences: 0,
        maxOccurrences: 2,
      })
    ).toBe(false);
  });
});

describe("findStringsWithOccurrences", () => {
  it("Accepts aaa (1-4 a) and bbb (0-0 a), rejects ccc (1-1 a)", () => {
    expect(
      findStringsWithOccurrences([
        {
          text: "aaa",
          substring: "a",
          minOccurrences: 1,
          maxOccurrences: 4,
        },
        {
          text: "bbb",
          substring: "a",
          minOccurrences: 0,
          maxOccurrences: 0,
        },
        {
          text: "ccc",
          substring: "a",
          minOccurrences: 1,
          maxOccurrences: 1,
        },
      ])
    ).toEqual(["aaa", "bbb"]);
  });
});
