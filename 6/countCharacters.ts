const CHARS_TO_IGNORE = /[^a-z]/g;

export const countUniqueCharacters = function (block) {
  return new Set(block.replace(CHARS_TO_IGNORE, "")).size;
};

export const countCommonCharacters = function (block) {
  const lines = block
    .split("\n")
    .map((line) => line.replace(CHARS_TO_IGNORE, ""));
  const uniquesInFirstLine = new Set(lines[0]);
  console.log(uniquesInFirstLine);
  let totalChars = 0;
  for (const char of uniquesInFirstLine) {
    console.log("Checking", char, lines);
    if (lines.every((line) => line.includes(char))) {
      console.log("Common");
      totalChars++;
    }
  }
  return totalChars;
};
