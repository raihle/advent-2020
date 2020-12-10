export const sum = function (array) {
  return array.reduce((total, next) => total + next, 0);
};

export const product = function (array) {
  return array.reduce((total, next) => total * next, 1);
};
