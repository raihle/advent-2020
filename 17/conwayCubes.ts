const POSITION_REGEX_3D = /^(?<x>-?\d+),(?<y>-?\d+),(?<z>-?\d+)$/;
const POSITION_REGEX_4D = /^(?<x>-?\d+),(?<y>-?\d+),(?<z>-?\d+),(?<w>-?\d+)$/;

export class Cube {
  protected data: { [position: string]: boolean };

  constructor(lines: Array<string>) {
    this.data = {};
    lines.forEach((line, y) =>
      line.split("").map((char, x) => {
        if (char === "#") this.data[`${x},${y},0`] = true;
      })
    );
  }

  neighbors(position: string): Array<string> {
    const match = POSITION_REGEX_3D.exec(position).groups;
    const x = parseInt(match.x);
    const y = parseInt(match.y);
    const z = parseInt(match.z);
    const positions = [];
    let dx, dy, dz;
    for (dx = -1; dx <= 1; dx++) {
      for (dy = -1; dy <= 1; dy++) {
        for (dz = -1; dz <= 1; dz++) {
          if (dx != 0 || dy !== 0 || dz != 0) {
            positions.push(`${x + dx},${y + dy},${z + dz}`);
          }
        }
      }
    }
    return positions;
  }

  get live() {
    return Object.entries(this.data).length;
  }

  at(position: string): boolean {
    return this.data[position] || false;
  }

  set(position: string) {
    this.data[position] = true;
  }

  unset(position: string) {
    delete this.data[position];
  }

  update() {
    // We could ignore negative z-indexes because the cube is always mirrored over our starting plane
    // But it's less than a 2x optimization and somewhat complicated, so...
    const toKill = [];
    const toBirth = [];
    // Loop over occupied positions to find lonely / crowded cells
    Object.entries(this.data).forEach(([position, _]) => {
      const liveNeighbors = this.neighbors(position).filter(
        (neighbor) => this.data[neighbor]
      ).length;
      if (liveNeighbors < 2 || liveNeighbors >= 4) {
        toKill.push(position);
      }
    });
    // Loop over positions with at least one neighbor to find goldilocks positions
    const neighboredPositions = new Set(
      Object.entries(this.data)
        .map(([position, _]) => this.neighbors(position))
        .flat()
    );
    neighboredPositions.forEach((position) => {
      if (this.at(position)) return;

      const liveNeighbors = this.neighbors(position).filter(
        (neighbor) => this.data[neighbor]
      ).length;
      if (liveNeighbors === 3) {
        toBirth.push(position);
      }
    });

    toKill.forEach((position) => {
      this.unset(position);
    });

    toBirth.forEach((position) => {
      this.set(position);
    });
  }
}

export class HyperCube extends Cube {
  constructor(lines: Array<string>) {
    super([]);
    this.data = {};
    lines.forEach((line, y) =>
      line.split("").map((char, x) => {
        if (char === "#") this.data[`${x},${y},0,0`] = true;
      })
    );
  }

  neighbors(position: string): Array<string> {
    const match = POSITION_REGEX_4D.exec(position).groups;
    const x = parseInt(match.x);
    const y = parseInt(match.y);
    const z = parseInt(match.z);
    const w = parseInt(match.w);
    const positions = [];
    let dx, dy, dz, dw;
    for (dx = -1; dx <= 1; dx++) {
      for (dy = -1; dy <= 1; dy++) {
        for (dz = -1; dz <= 1; dz++) {
          for (dw = -1; dw <= 1; dw++) {
            if (dx != 0 || dy !== 0 || dz != 0 || dw != 0) {
              positions.push(`${x + dx},${y + dy},${z + dz},${w + dw}`);
            }
          }
        }
      }
    }
    return positions;
  }
}
