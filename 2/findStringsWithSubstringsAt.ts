export interface FindWithSubstringsAtInput {
  text: string;
  substring: string;
  indexes: Array<number>;
}

export function exactlyOneIndexMatchesSubstring({
  text,
  substring,
  indexes,
}: FindWithSubstringsAtInput) {
  return (
    indexes.filter((index) => text.substring(index).startsWith(substring))
      .length === 1
  );
}

export function findStringsWithSubstringsAtExactlyOneIndex(
  inputs: Array<FindWithSubstringsAtInput>
): Array<string> {
  return inputs
    .filter(exactlyOneIndexMatchesSubstring)
    .map((input) => input.text);
}
