export const sum = function (array) {
  return array.reduce((total, next) => total + next, 0);
};

export const product = function (array) {
  return array.reduce((total, next) => total * next, 1);
};

export const smallestMultipleAtLeastAsLargeAs = function (toMultiply, target) {
  const factor = Math.ceil(target / toMultiply);
  return toMultiply * factor;
};
