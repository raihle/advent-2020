import { blocksAsArray } from "../util/readFile";
import { intBetween, or } from "../util/validate";
import { sum, product } from "../util/math";
const RULE_REGEX = /(?<field_name>.+): (?<from1>\d+)-(?<to1>\d+) or (?<from2>\d+)-(?<to2>\d+)/;
const blocks = blocksAsArray("16/input.txt");

type Rule = {
  field: string;
  validation: (value: any) => boolean;
};

type ValueOnlyTicket = Array<number>;

const rules: Array<Rule> = parseRules(blocks[0].split("\n"));
const myTicket: ValueOnlyTicket = parseTicket(blocks[1].split("\n")[1]);
const nearbyTickets: Array<ValueOnlyTicket> = blocks[2]
  .split("\n")
  .slice(1)
  .map(parseTicket);

console.log("Part 1", part1(rules, nearbyTickets));
console.log("Part 2", part2(rules, nearbyTickets, myTicket));

function part1(rules, tickets) {
  return sum(findAllInvalidFieldValues(rules, tickets));
}

function part2(rules, tickets, myTicket) {
  const validTickets = tickets.filter((ticket) => isTicketValid(rules, ticket));
  const fieldOrder = findFieldOrder(rules, validTickets);
  return product(
    Object.entries(fieldOrder)
      .filter(([name, _]) => name.startsWith("departure"))
      .map(([_, index]) => myTicket[index])
  );
}
function findAllInvalidFieldValues(rules, tickets) {
  const invalidFields = tickets.map((ticket) =>
    findInvalidFieldValuesInTicket(rules, ticket)
  );
  return invalidFields.flat();
}

function parseTicket(ticketLine) {
  return ticketLine.split(",").map((field) => parseInt(field, 10));
}
function parseRules(ruleLines) {
  return ruleLines.map(parseRule);
}

function parseRule(ruleLine) {
  const match = RULE_REGEX.exec(ruleLine);
  return {
    field: match.groups.field_name,
    validation: or(
      intBetween(
        parseInt(match.groups.from1, 10),
        parseInt(match.groups.to1, 10)
      ),
      intBetween(
        parseInt(match.groups.from2, 10),
        parseInt(match.groups.to2, 10)
      )
    ),
  };
}

function findInvalidFieldValuesInTicket(
  rules: Array<Rule>,
  ticket: ValueOnlyTicket
) {
  const invalids = [];
  for (const fieldValue of ticket) {
    if (!rules.some((rule) => rule.validation(fieldValue))) {
      invalids.push(fieldValue);
    }
  }
  return invalids;
}

function isTicketValid(rules: Array<Rule>, ticket) {
  return !ticket.some((fieldValue) =>
    rules.every((rule) => !rule.validation(fieldValue))
  );
}

function findFieldOrder(
  rules: Array<Rule>,
  tickets: Array<ValueOnlyTicket>
): { [fieldName: string]: number } {
  let possibilities = [];
  let fieldNumber;
  // Find all fields which could be valid for each index
  for (fieldNumber = 0; fieldNumber < rules.length; fieldNumber++) {
    const possibleRules = rules.filter((rule) =>
      tickets.every((ticket) => rule.validation(ticket[fieldNumber]))
    );
    possibilities.push(possibleRules.map((rule) => rule.field));
  }
  // Deduplicate possibilities by locking in indexes with only one possible field,
  // and removing that possibility from other indexes
  const fieldIndexes = {};
  let found = 0;
  while (found < rules.length) {
    possibilities.forEach((possibleFieldsAtIndex, index) => {
      if (possibleFieldsAtIndex.length === 1) {
        const fieldName = possibleFieldsAtIndex[0];
        fieldIndexes[fieldName] = index;
        found++;
      }
    });
    possibilities = possibilities.map((possibleFieldsAtIndex) =>
      possibleFieldsAtIndex.filter(
        (fieldName) => !fieldIndexes.hasOwnProperty(fieldName)
      )
    );
  }
  return fieldIndexes;
}
