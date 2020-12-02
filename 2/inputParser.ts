const INPUT_REGEX = /(?<num1>\d+)-(?<num2>\d+) (?<substring>\w+): (?<text>\w+)/;

export interface ParsedLine {
  text: string;
  substring: string;
  numbers: Array<number>;
}

export function parseLine(line: string) {
  const {
    groups: { text, substring, num1, num2 },
  } = INPUT_REGEX.exec(line);
  return {
    text: text,
    substring,
    numbers: [parseInt(num1), parseInt(num2)],
  };
}
