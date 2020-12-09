import { linesAsArray } from "../util/readFile";
import { sum } from "../util/math";

const numbers = linesAsArray("9/input.txt").map((num) => parseInt(num));

console.log(numbers.slice(0, 30));

const part1Result = part1(numbers, 25);
console.log("Part 1", part1Result.number);
console.log("Part 2", findRangeWhichSumsTo(numbers, part1Result.number));

function part1(numbers, preambleSize) {
  for (let i = preambleSize; i < numbers.length; i++) {
    if (!isSumOfPreceedingNumbers(numbers, i, preambleSize)) {
      return {
        number: numbers[i],
        index: i,
      };
    }
  }
  return {
    number: -1,
    index: -1,
  };
}

function isSumOfPreceedingNumbers(numbers, index, numbersToGoBack) {
  const targetNumber = numbers[index];
  for (let i = index - numbersToGoBack; i < index - 1; i++) {
    for (let j = i + 1; j < index; j++) {
      if (numbers[i] + numbers[j] == targetNumber) {
        return true;
      }
    }
  }
  return false;
}

function findRangeWhichSumsTo(numbers, targetNumber) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const range = numbers.slice(i, j + 1);
      const sumOfRange = sum(range);
      if (sumOfRange === targetNumber) {
        return {
          startIndex: i,
          endIndex: j,
          smallest: Math.min(...range),
          largest: Math.max(...range),
          range,
          sum: Math.min(...range) + Math.max(...range),
        };
      }
      if (sumOfRange > targetNumber) {
        break;
      }
    }
  }
  return -1;
}
