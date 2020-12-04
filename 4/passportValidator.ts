import { intBetween, and, or, suffix } from "../util/validate";

const REQUIRED_FIELDS = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
const FIELD_REGEX = /(\w+):(\S+)/g;
const VALIDATIONS = {
  byr: intBetween(1920, 2002),
  iyr: intBetween(2010, 2020),
  eyr: intBetween(2020, 2030),
  hgt: or(
    and(suffix("cm"), intBetween(150, 193)),
    and(suffix("in"), intBetween(59, 76))
  ),
  hcl: (hairColor) => /^#[a-f0-9]{6}$/.test(hairColor),
  ecl: (eyeColor) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(eyeColor),
  pid: (passportId) => /^\d{9}$/.test(passportId),
};
export const hasRequiredFields = function (passportLine) {
  return REQUIRED_FIELDS.every((field) => passportLine.includes(field + ":"));
};

export const areFieldsValid = function (passportLine) {
  const parsed = parseFields(passportLine);
  return REQUIRED_FIELDS.every((field) => VALIDATIONS[field](parsed[field]));
};

export const parseFields = function (passportLine) {
  const parsed = {};
  let match;
  while ((match = FIELD_REGEX.exec(passportLine))) {
    parsed[match[1]] = match[2];
  }
  return parsed;
};
