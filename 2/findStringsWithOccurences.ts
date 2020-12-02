export interface FindWithOccurrencesInput {
  text: string;
  substring: string;
  minOccurrences: number;
  maxOccurrences: number;
}

export function hasStringOccurrences({
  text,
  substring,
  minOccurrences,
  maxOccurrences,
}: FindWithOccurrencesInput) {
  const occurences = text.match(new RegExp(substring, "g"))?.length || 0;
  return minOccurrences <= occurences && occurences <= maxOccurrences;
}

export function findStringsWithOccurrences(
  inputs: Array<FindWithOccurrencesInput>
) {
  return inputs.filter(hasStringOccurrences).map((input) => input.text);
}
