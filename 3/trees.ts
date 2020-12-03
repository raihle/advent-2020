export function buildTrees(lines) {
  const trees = lines;
  const width = lines[0].length;
  return {
    isTree(x, y) {
      return lines[y][x % width] === "#";
    },
    height: lines.length,
    maxUsefulSlope: width - 1,
  };
}

export function countTrees({ isTree, height }, xPerY, stepSize = 1) {
  let trees = 0;
  for (let y = 0; y < height; y += stepSize) {
    if (isTree(xPerY * y, y)) {
      trees++;
    }
  }
  return trees;
}

export function minimizeTrees(trees) {
  let lowestTreeCount = Number.MAX_SAFE_INTEGER;
  let lowestSlope = 0;
  for (let slope = 0; slope <= trees.maxUsefulSlope; slope++) {
    const treeCount = countTrees(trees, slope);
    if (treeCount < lowestTreeCount) {
      lowestTreeCount = treeCount;
      lowestSlope = slope;
    }
  }
  return {
    treeCount: lowestTreeCount,
    slope: lowestSlope,
  };
}
