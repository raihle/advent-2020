export const parseInstructions = function (instructions: string) {
  let fromFront = 0;
  let fromLeft = 0;

  const FRONT_BACK_CHARS = 7;
  for (let i = 0; i < FRONT_BACK_CHARS; i++) {
    if (instructions.charAt(i) === "B") {
      fromFront += 2 ** (FRONT_BACK_CHARS - i - 1);
    }
  }

  const LEFT_RIGHT_CHARS = 3;
  for (let i = 0; i < LEFT_RIGHT_CHARS; i++) {
    if (instructions.charAt(i + FRONT_BACK_CHARS) === "R") {
      fromLeft += 2 ** (LEFT_RIGHT_CHARS - i - 1);
    }
  }

  return {
    instruction: instructions,
    row: fromFront,
    column: fromLeft,
    id: fromFront * 8 + fromLeft,
  };
};
