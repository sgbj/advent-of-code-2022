import fs from "fs";

const input = fs.readFileSync("24.txt").toString();
const lines = input.split(/\r?\n/);
const width = lines[0].length;
const height = lines.length;
const directions = new Map([
  ["^", [0, -1]],
  ["v", [0, 1]],
  ["<", [-1, 0]],
  [">", [1, 0]],
  ["-", [0, 0]],
]);
const blizzards = [];

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (directions.has(lines[y][x])) {
      const [dx, dy] = directions.get(lines[y][x]);
      blizzards.push({ x, y, dx, dy });
    }
  }
}

function getMinutes(start, end) {
  let points = [start];
  let minutes = 0;

  while (true) {
    minutes++;

    for (const blizzard of blizzards) {
      const newX = blizzard.x + blizzard.dx;
      const newY = blizzard.y + blizzard.dy;
      blizzard.x = newX == 0 ? width - 2 : newX == width - 1 ? 1 : newX;
      blizzard.y = newY == 0 ? height - 2 : newY == height - 1 ? 1 : newY;
    }

    let newPoints = [];

    for (const { x, y } of points) {
      for (const [dx, dy] of directions.values()) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX == end.x && newY == end.y) {
          return minutes;
        }

        if (
          ((newX == start.x && newY == start.y) ||
            (newX >= 1 &&
              newX <= width - 2 &&
              newY >= 1 &&
              newY <= height - 2)) &&
          !blizzards.some((b) => b.x == newX && b.y == newY) &&
          !newPoints.some((p) => p.x == newX && p.y == newY)
        ) {
          newPoints.push({ x: newX, y: newY });
        }
      }
    }

    points = newPoints;
  }
}

// Part 1
const part1 = getMinutes({ x: 1, y: 0 }, { x: width - 2, y: height - 1 });
console.log(part1);

// Part 2
console.log(
  part1 +
    getMinutes({ x: width - 2, y: height - 1 }, { x: 1, y: 0 }) +
    getMinutes({ x: 1, y: 0 }, { x: width - 2, y: height - 1 })
);
