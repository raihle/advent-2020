import { linesAsArray } from "../util/readFile";
import { Cube, HyperCube } from "./conwayCubes";

const startingBoard = linesAsArray("17/input.txt");

const cube = new Cube(startingBoard);
const hypercube = new HyperCube(startingBoard);

let i;
for (i = 0; i < 6; i++) {
  cube.update();
  hypercube.update();
}

console.log("Part 1", cube.live);
console.log("Part 2", hypercube.live);
