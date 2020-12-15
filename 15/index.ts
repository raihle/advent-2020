import { linesAsArray } from "../util/readFile";

const numbers = linesAsArray("15/input.txt")[0]
  .split(",")
  .map((num) => parseInt(num, 10));

console.time();
console.log("Part 1", runner(numbers, 2020));
console.log("Part 2", runner(numbers, 30000000));
console.timeEnd();

function runner(numbers: Array<number>, times) {
  // Can't use an object here, maybe because keys are converted to strings and need too much memory?
  // Performance is also much better with a pre-sized array, even if it's unnecessarily large, so it
  // may be because of constant re-allocation of memory, rather than the actual amount used.
  // Number of repetitions is an upper bound on the largest number that we will need.
  const lastSpoken = new Array(times);
  let i;
  for (i = 0; i < numbers.length - 1; i++) {
    lastSpoken[numbers[i]] = i;
  }
  let nextNumber = numbers[i];
  for (i; i < times - 1; i++) {
    const numberLastSpoken = lastSpoken[nextNumber];
    const age = numberLastSpoken !== undefined ? i - numberLastSpoken : 0;
    lastSpoken[nextNumber] = i;
    nextNumber = age;
  }
  return nextNumber;
}
