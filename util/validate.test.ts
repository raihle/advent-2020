import { intBetween, and, or, suffix } from "./validate";

describe("intBetween", () => {
  it("Rejects non-numbers", () => {
    expect(intBetween(0, 999)("a")).toBe(false);
  });

  it("Rejects integers which are too small", () => {
    expect(intBetween(0, 999)(-1)).toBe(false);
    expect(intBetween(10, 999)(9)).toBe(false);
  });

  it("Rejects integers which are too large", () => {
    expect(intBetween(0, 999)(1000)).toBe(false);
    expect(intBetween(0, 10)(11)).toBe(false);
  });

  it("Accepts integers which are in range", () => {
    expect(intBetween(0, 999)(0)).toBe(true);
    expect(intBetween(0, 999)(999)).toBe(true);
    expect(intBetween(0, 10)(10)).toBe(true);
  });
});

describe("and", () => {
  it("Rejects if the left side rejects", () => {
    expect(
      and(
        () => false,
        () => true
      )("")
    ).toBe(false);
    expect(
      and(
        () => false,
        () => false
      )("")
    ).toBe(false);
  });

  it("Rejects if the right side rejects", () => {
    expect(
      and(
        () => true,
        () => false
      )("")
    ).toBe(false);
    expect(
      and(
        () => false,
        () => false
      )("")
    ).toBe(false);
  });

  it("Accepts if both sides accept", () => {
    expect(
      and(
        () => true,
        () => true
      )("")
    ).toBe(true);
  });
});

describe("or", () => {
  it("Accepts if the left side accepts", () => {
    expect(
      or(
        () => true,
        () => false
      )("")
    ).toBe(true);
    expect(
      or(
        () => true,
        () => true
      )("")
    ).toBe(true);
  });

  it("Accepts if the right side accepts", () => {
    expect(
      or(
        () => false,
        () => true
      )("")
    ).toBe(true);
    expect(
      or(
        () => true,
        () => true
      )("")
    ).toBe(true);
  });

  it("Rejects if both sides reject", () => {
    expect(
      or(
        () => false,
        () => false
      )("")
    ).toBe(false);
  });
});

describe("suffix", () => {
  it("Rejects strings which do not contain the suffix", () => {
    expect(suffix("em")("asd")).toBe(false);
  });
  it("Rejects strings which contain but do not end with the suffix", () => {
    expect(suffix("em")("asemd")).toBe(false);
  });
  it("Accepts strings which end with the suffix", () => {
    expect(suffix("em")("asdem")).toBe(true);
  });
});
