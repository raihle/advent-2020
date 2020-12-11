import { sum } from "../util/math";

type Position = { x: number; y: number };
type SpotValue = "#" | "L" | ".";
type Spot = Position & { value: SpotValue };
type ProximateSeatsFunction = (x: number, y: number) => Array<Spot>;
type ProximateSeatsFunctionFactory = (board) => ProximateSeatsFunction;

export class Board {
  private data: Array<Array<SpotValue>>;
  private proximityFunction: ProximateSeatsFunction;
  private surroundedThreshold: number;

  constructor(
    lines: Array<string>,
    proximityFunctionFactory: ProximateSeatsFunctionFactory,
    surroundedThreshold: number
  ) {
    this.data = lines.map((line) => line.split("") as Array<SpotValue>);
    this.proximityFunction = proximityFunctionFactory(this);
    this.surroundedThreshold = surroundedThreshold;
  }

  static neighbors(board: Board): ProximateSeatsFunction {
    return board.neighbors.bind(board);
  }

  static visibleFrom(board: Board): ProximateSeatsFunction {
    return board.visibleFrom.bind(board);
  }

  toString() {
    return this.data.map((line) => line.join("")).join("\n");
  }

  get width() {
    return this.data[0].length;
  }

  get height() {
    return this.data.length;
  }

  get occupied() {
    return sum(
      this.data.map((line) => line.filter((spot) => spot === "#").length)
    );
  }

  at(x: number, y: number): Spot {
    return {
      x,
      y,
      value: this.data[y][x],
    };
  }

  set(x: number, y: number, value: SpotValue) {
    this.data[y][x] = value;
  }

  neighbors(x: number, y: number): Array<Spot> {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
      .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
      .filter(({ x, y }) => this.isInBounds(x, y))
      .map(({ x, y }) => this.at(x, y));
  }

  visibleFrom(x: number, y: number): Array<Spot> {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const visibleSpots = [];

    for (const [dx, dy] of directions) {
      let distance: number;
      for (
        distance = 1;
        this.isInBounds(x + distance * dx, y + distance * dy);
        distance++
      ) {
        const spot = this.at(x + distance * dx, y + distance * dy);
        if (spot.value !== ".") {
          visibleSpots.push(spot);
          break;
        }
      }
    }
    return visibleSpots;
  }

  isInBounds(x: number, y: number): boolean {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
  }

  get emptyIsolatedSeats() {
    const results = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const { value } = this.at(x, y);
        if (value !== "L") continue;
        const occupiedAdjacents = this.proximityFunction(x, y).filter(
          spotOccupied
        ).length;
        if (occupiedAdjacents === 0) {
          results.push({ x, y });
        }
      }
    }
    return results;
  }

  get occupiedSurroundedSeats() {
    const results = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!spotOccupied(this.at(x, y))) continue;
        const occupiedAdjacents = this.proximityFunction(x, y).filter(
          spotOccupied
        ).length;
        if (occupiedAdjacents >= this.surroundedThreshold) {
          results.push({ x, y });
        }
      }
    }
    return results;
  }
}

export const advanceUntilStable = function (board: Board) {
  let changedSeats;
  while ((({ changedSeats } = advanceGeneration(board)), changedSeats > 0));
  return {
    board: board.toString(),
    occupied: board.occupied,
  };
};

export const advanceGeneration = function (board: Board) {
  const seatsToFill: Array<Position> = board.emptyIsolatedSeats;
  const seatsToEmpty: Array<Position> = board.occupiedSurroundedSeats;

  seatsToFill.forEach(({ x, y }) => board.set(x, y, "#"));
  seatsToEmpty.forEach(({ x, y }) => board.set(x, y, "L"));

  return {
    board: board.toString(),
    changedSeats: seatsToFill.length + seatsToEmpty.length,
    occupied: board.occupied,
  };
};

function spotOccupied(spot: Spot) {
  return spot.value === "#";
}

// TODO build iterators for boards: all positions, adjacent positions
