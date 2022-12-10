import fs from "fs";

const input = fs.readFileSync("8.txt").toString();
const grid = input.split(/\r?\n/).map((line) => [...line]);
const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function isVisible(grid, x, y) {
  return directions.some(
    ([dx, dy]) => countVisible(grid, grid[y][x], x + dx, y + dy, dx, dy).visible
  );
}

function getScenicScore(grid, x, y) {
  return directions.reduce(
    (previousValue, [dx, dy]) =>
      previousValue *
      countVisible(grid, grid[y][x], x + dx, y + dy, dx, dy).count,
    1
  );
}

function countVisible(grid, height, x, y, dx, dy) {
  let count = 0;
  let visible = true;

  while (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
    count++;

    if (grid[y][x] >= height) {
      visible = false;
      break;
    }

    x += dx;
    y += dy;
  }

  return { count, visible };
}

let count = 0;
let maxScenicScore = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (isVisible(grid, x, y)) {
      count++;
    }
    maxScenicScore = Math.max(maxScenicScore, getScenicScore(grid, x, y));
  }
}

// Part 1
console.log(count);

// Part 2
console.log(maxScenicScore);
