import fs from "fs";

const input = fs.readFileSync("17.txt").toString();

const rocks = [
  [["#", "#", "#", "#"]],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."],
  ],
  [
    [".", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "#"],
  ],
  [["#"], ["#"], ["#"], ["#"]],
  [
    ["#", "#"],
    ["#", "#"],
  ],
];

const count = 2022;
const width = 7;
const rockToLocation = new Map();
const locationToRock = new Map();

let height = 0;

for (let i = 0, j = 0; i < count; i++) {
  let rock = rocks[i % rocks.length];
  let x = 2;
  let y = height + rock.length + 3;

  while (true) {
    let jet = input[j++ % input.length];
    let dx = jet == "<" ? -1 : 1;

    if (canMove(rock, x + dx, y)) {
      x += dx;
    }

    let dy = -1;

    if (canMove(rock, x, y + dy)) {
      y += dy;
    } else {
      break;
    }
  }

  for (let row = 0; row < rock.length; row++) {
    for (let col = 0; col < rock[row].length; col++) {
      if (rock[row][col] == "#") {
        locationToRock.set(`${x + col}, ${y - row}`, { i, x, y });
      }
    }
  }

  rockToLocation.set(i + 1, { i, x, y });
  height = Math.max(height, y);
}

// Find cycle
const cycleCount = 50;
let cycleLength = 0;
let cycleHeight = 0;

outer: for (let i = 1; i <= height; i++) {
  for (let j = i + 1; j <= height; j++) {
    let count = 0;
    inner: for (let y1 = i, y2 = j; y2 <= height; y1++, y2++, count++) {
      for (let x = 0; x < width; x++) {
        if (
          locationToRock.has(`${x}, ${y1}`) != locationToRock.has(`${x}, ${y2}`)
        ) {
          break inner;
        }
      }
    }
    if (count > cycleCount) {
      let iMin = 0;
      let iMax = 0;
      for (let x = 0; x < width; x++) {
        if (locationToRock.has(`${x}, ${i}`)) {
          iMin = locationToRock.get(`${x}, ${i}`).i;
        }
        if (locationToRock.has(`${x}, ${j}`)) {
          iMax = locationToRock.get(`${x}, ${j}`).i;
        }
      }
      cycleLength = iMax - iMin;
      cycleHeight = j - i;
      break outer;
    }
  }
}

function canMove(rock, x, y) {
  for (let row = 0; row < rock.length; row++) {
    for (let col = 0; col < rock[row].length; col++) {
      if (
        rock[row][col] == "#" &&
        (x < 0 ||
          x + col >= width ||
          y - row <= 0 ||
          locationToRock.has(`${x + col}, ${y - row}`))
      ) {
        return false;
      }
    }
  }
  return true;
}

function getHeight(count) {
  return rockToLocation.has(count)
    ? rockToLocation.get(count).y
    : Math.floor(count / cycleLength) * cycleHeight +
        rockToLocation.get(count % cycleLength).y;
}

// Part 1
console.log(getHeight(2022));

// Part 2
console.log(getHeight(1000000000000));
