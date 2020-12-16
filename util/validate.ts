export function intBetween(min, max) {
  return function (input) {
    const val = parseInt(input, 10);
    return min <= val && val <= max;
  };
}

export function or(a, b) {
  return function (input) {
    return a(input) || b(input);
  };
}

export function and(a, b) {
  return function (input) {
    return a(input) && b(input);
  };
}

export function suffix(suffix) {
  return function (input) {
    return input.endsWith(suffix);
  };
}
