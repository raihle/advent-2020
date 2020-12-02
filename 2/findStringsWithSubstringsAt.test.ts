import {
  exactlyOneIndexMatchesSubstring,
  findStringsWithSubstringsAtExactlyOneIndex,
} from "./findStringsWithSubstringsAt";

describe("exactlyOneIndexMatchesSubstring", () => {
  it("Accepts that aab has a at index 0 xor 2", () => {
    expect(
      exactlyOneIndexMatchesSubstring({
        text: "aab",
        substring: "a",
        indexes: [0, 2],
      })
    ).toBe(true);
  });

  it("Accepts that baa has a at index 2 xor 0", () => {
    expect(
      exactlyOneIndexMatchesSubstring({
        text: "baa",
        substring: "a",
        indexes: [0, 2],
      })
    ).toBe(true);
  });

  it("Rejects aba for having a at index 0 xor 2", () => {
    expect(
      exactlyOneIndexMatchesSubstring({
        text: "aaa",
        substring: "a",
        indexes: [0, 2],
      })
    ).toBe(false);
  });

  it("Rejects aaa for not having any b's", () => {
    expect(
      exactlyOneIndexMatchesSubstring({
        text: "aaa",
        substring: "b",
        indexes: [0, 2],
      })
    ).toBe(false);
  });
});

describe("findStringsWithSubstringsAtExactlyOneIndex", () => {
  it("Accepts aab (a at 0 xor 2) and bab (b at 0 xor 1), rejects ccc (c at 1 xor 2)", () => {
    expect(
      findStringsWithSubstringsAtExactlyOneIndex([
        {
          text: "aab",
          substring: "a",
          indexes: [0, 2],
        },
        {
          text: "bab",
          substring: "b",
          indexes: [0, 1],
        },
        {
          text: "ccc",
          substring: "c",
          indexes: [1, 2],
        },
      ])
    ).toEqual(["aab", "bab"]);
  });
});
