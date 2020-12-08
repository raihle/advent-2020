const NOP = "nop";
const ACC = "acc";
const JMP = "jmp";

type Operation = typeof NOP | typeof ACC | typeof JMP;
interface Instruction {
  operation: Operation;
  argument: number;
}

const INSTRUCTION_REGEX = /(?<operation>nop|acc|jmp) (?<argument>[+-]\d+)/;

export const runUntilLoop = function (
  program: Array<Instruction>,
  corruptionAt: number = -1
) {
  let accumulator = 0;
  let nextLine = 0;
  let lastLine = 0;
  const visited = new Array(program.length);

  while (visited[nextLine] !== true && nextLine < program.length) {
    lastLine = nextLine;
    visited[nextLine] = true;
    switch (program[nextLine].operation) {
      case NOP:
        if (corruptionAt === nextLine) {
          nextLine += program[nextLine].argument - 1;
        }
        break;
      case ACC:
        accumulator += program[nextLine].argument;
        break;
      case JMP:
        if (corruptionAt !== nextLine) {
          nextLine += program[nextLine].argument - 1;
        }
        break;
    }
    nextLine++;
  }

  return {
    accumulator,
    nextLine,
    lastLine,
    finished: nextLine === program.length,
  };
};

export const fixAndRun = function (originalProgram: Array<Instruction>) {
  for (let i = 0; i < originalProgram.length; i++) {
    const result = runUntilLoop(originalProgram, i);
    if (result.finished) {
      return { corruptionAt: i, ...result };
    }
  }
};

export const parseProgram = function (
  inputLines: Array<string>
): Array<Instruction> {
  return inputLines.map(parseLine);
};

function parseLine(line: string): Instruction {
  const match = INSTRUCTION_REGEX.exec(line);
  return {
    operation: match.groups.operation as Operation,
    argument: parseInt(match.groups.argument),
  };
}
