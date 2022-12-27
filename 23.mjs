import fs from "fs";

const grid = fs
  .readFileSync("23.txt")
  .toString()
  .split(/\r?\n/)
  .map((line) => [...line]);

const directions = ["N", "S", "W", "E"];

let elves = new Map();
let round = 0;
let empty = 0;
let minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == "#") {
      elves.set(`${x}, ${y}`, [x, y]);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

while (true) {
  const moves = new Map();

  for (const [k, [x, y]] of elves) {
    if (
      elves.has(`${x}, ${y - 1}`) ||
      elves.has(`${x}, ${y + 1}`) ||
      elves.has(`${x - 1}, ${y}`) ||
      elves.has(`${x + 1}, ${y}`) ||
      elves.has(`${x - 1}, ${y - 1}`) ||
      elves.has(`${x + 1}, ${y - 1}`) ||
      elves.has(`${x - 1}, ${y + 1}`) ||
      elves.has(`${x + 1}, ${y + 1}`)
    ) {
      for (const direction of directions) {
        if (
          direction == "N" &&
          !elves.has(`${x}, ${y - 1}`) &&
          !elves.has(`${x - 1}, ${y - 1}`) &&
          !elves.has(`${x + 1}, ${y - 1}`)
        ) {
          moves.set(k, [x, y - 1]);
          break;
        } else if (
          direction == "S" &&
          !elves.has(`${x}, ${y + 1}`) &&
          !elves.has(`${x - 1}, ${y + 1}`) &&
          !elves.has(`${x + 1}, ${y + 1}`)
        ) {
          moves.set(k, [x, y + 1]);
          break;
        } else if (
          direction == "W" &&
          !elves.has(`${x - 1}, ${y}`) &&
          !elves.has(`${x - 1}, ${y - 1}`) &&
          !elves.has(`${x - 1}, ${y + 1}`)
        ) {
          moves.set(k, [x - 1, y]);
          break;
        } else if (
          direction == "E" &&
          !elves.has(`${x + 1}, ${y}`) &&
          !elves.has(`${x + 1}, ${y - 1}`) &&
          !elves.has(`${x + 1}, ${y + 1}`)
        ) {
          moves.set(k, [x + 1, y]);
          break;
        }
      }
    }
  }

  const newElves = new Map();
  let moved = false;

  for (let [k, [x, y]] of elves) {
    if (moves.has(k)) {
      const [newX, newY] = moves.get(`${x}, ${y}`);
      if (
        ![...moves].some(
          ([k2, [x2, y2]]) => k2 != k && x2 == newX && y2 == newY
        )
      ) {
        x = newX;
        y = newY;
        moved = true;
      }
    }

    newElves.set(`${x}, ${y}`, [x, y]);

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  elves = newElves;

  directions.push(directions.shift());

  if (++round == 10) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (!elves.has(`${x}, ${y}`)) {
          empty++;
        }
      }
    }
  }

  if (!moved) {
    break;
  }
}

// Part 1
console.log(empty);

// Part 2
console.log(round);
