import { numberOfBagsStartingWith } from "../7/bagColors";

type Facing = "N" | "S" | "E" | "W";

interface Ship {
  x: number;
  y: number;
}

class FacingShip {
  x: number;
  y: number;
  facing: Facing;

  constructor(initialFacing: Facing) {
    this.facing = initialFacing;
    this.x = 0;
    this.y = 0;

    this.north = this.north.bind(this);
    this.south = this.south.bind(this);
    this.east = this.east.bind(this);
    this.west = this.west.bind(this);
    this.forward = this.forward.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
  }

  north(amount) {
    this.y += amount;
  }

  south(amount) {
    this.y -= amount;
  }

  west(amount) {
    this.x -= amount;
  }

  east(amount) {
    this.x += amount;
  }

  forward(amount) {
    return {
      N: this.north,
      S: this.south,
      W: this.west,
      E: this.east,
    }[this.facing](amount);
  }

  left(amount) {
    if (amount <= 0) return;
    this.facing = {
      N: "W",
      S: "E",
      W: "S",
      E: "N",
    }[this.facing] as Facing;
    return this.left(amount - 90);
  }

  right(amount) {
    if (amount <= 0) return;
    this.facing = {
      W: "N",
      E: "S",
      S: "W",
      N: "E",
    }[this.facing] as Facing;
    return this.right(amount - 90);
  }
}

class Waypoint {
  x: number;
  y: number;

  constructor(initialX: number, initialY: number) {
    this.x = initialX;
    this.y = initialY;

    this.north = this.north.bind(this);
    this.south = this.south.bind(this);
    this.east = this.east.bind(this);
    this.west = this.west.bind(this);
    this.rotateClockwise = this.rotateClockwise.bind(this);
    this.rotateCounterClockwise = this.rotateCounterClockwise.bind(this);
  }

  north(amount) {
    this.y += amount;
  }

  south(amount) {
    this.y -= amount;
  }

  west(amount) {
    this.x -= amount;
  }

  east(amount) {
    this.x += amount;
  }

  rotateClockwise(amount: number) {
    const newX = this.y;
    this.y = -this.x;
    this.x = newX;
    if (amount > 90) this.rotateClockwise(amount - 90);
  }

  rotateCounterClockwise(amount: number) {
    this.rotateClockwise(360 - amount);
  }
}

class WaypointShip {
  x: number;
  y: number;
  waypoint: Waypoint;

  constructor(waypointX: number, waypointY: number) {
    this.waypoint = new Waypoint(waypointX, waypointY);
    this.x = 0;
    this.y = 0;

    this.north = this.north.bind(this);
    this.south = this.south.bind(this);
    this.east = this.east.bind(this);
    this.west = this.west.bind(this);
    this.forward = this.forward.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
  }

  north(amount) {
    this.waypoint.north(amount);
  }

  south(amount) {
    this.waypoint.south(amount);
  }

  west(amount) {
    this.waypoint.west(amount);
  }

  east(amount) {
    this.waypoint.east(amount);
  }

  forward(amount) {
    this.x += this.waypoint.x * amount;
    this.y += this.waypoint.y * amount;
  }

  left(amount) {
    this.waypoint.rotateCounterClockwise(amount);
  }

  right(amount) {
    this.waypoint.rotateClockwise(amount);
  }
}

interface WaypointShip {
  waypointX: number;
  waypointY: number;
  x: number;
  y: number;
}

export const moveShipByFacing = function (
  inputLines: Array<string>,
  initialFacing: Facing
): Ship {
  const ship = new FacingShip(initialFacing);
  inputLines.forEach((line) => executeOrder(line, ship));
  return ship;
};

export const moveShipByWaypoint = function (
  inputLines,
  waypointX: number,
  waypointY: number
): Ship {
  const ship = new WaypointShip(waypointX, waypointY);
  inputLines.forEach((line) => executeOrder(line, ship));
  return ship;
};

function executeOrder(order: string, ship: FacingShip | WaypointShip) {
  const command = order.charAt(0);
  const amount = parseInt(order.substring(1));
  ({
    N: ship.north,
    S: ship.south,
    W: ship.west,
    E: ship.east,
    F: ship.forward,
    L: ship.left,
    R: ship.right,
  }[command](amount));
}
