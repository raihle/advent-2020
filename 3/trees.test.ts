import { buildTrees, countTrees, minimizeTrees } from "./trees";

describe("Tree model", () => {
  const treeInput = [
    ["#", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "."],
  ];
  const trees = buildTrees(treeInput);

  it("Identifies trees at fixed locations", () => {
    expect(trees.isTree(0, 0)).toBe(true);
    expect(trees.isTree(2, 0)).toBe(true);
    expect(trees.isTree(2, 1)).toBe(true);
    expect(trees.isTree(0, 2)).toBe(true);
    expect(trees.isTree(1, 2)).toBe(true);
  });

  it("Identifies non-trees at fixed locations", () => {
    expect(trees.isTree(1, 0)).toBe(false);
    expect(trees.isTree(0, 1)).toBe(false);
    expect(trees.isTree(1, 1)).toBe(false);
    expect(trees.isTree(2, 2)).toBe(false);
  });

  it("Identifies trees at repeated locations", () => {
    expect(trees.isTree(3, 0)).toBe(true);
    expect(trees.isTree(8, 0)).toBe(true);
    expect(trees.isTree(11, 1)).toBe(true);
    expect(trees.isTree(12, 2)).toBe(true);
    expect(trees.isTree(16, 2)).toBe(true);
  });

  it("Finds two trees when heading straight down through #, ., #", () => {
    expect(countTrees(trees, 0)).toBe(2);
  });

  it("Finds one tree when heading at slope 1 through #, ., .", () => {
    expect(countTrees(trees, 1)).toBe(1);
  });

  it("Finds three trees when heading at slope 2 through #, #, #", () => {
    expect(countTrees(trees, 2)).toBe(3);
  });

  it("Finds two trees when heading at slope 3 (effectively 0) through #, ., #", () => {
    expect(countTrees(trees, 2)).toBe(3);
  });

  it("Identifics 1 as the minimal slope", () => {
    expect(minimizeTrees(trees)).toEqual({ slope: 1, treeCount: 1 });
  });
});
