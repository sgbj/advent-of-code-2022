import fs from "fs";

const map = new Map(
  fs
    .readFileSync("18.txt")
    .toString()
    .split(/\r?\n/)
    .map((line) => [line, line.split(",").map(Number)])
);

const directions = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];

// Part 1
let total = 0;
for (const [x, y, z] of map.values()) {
  let exposed = 0;
  for (const [dx, dy, dz] of directions) {
    exposed += map.has(`${x + dx},${y + dy},${z + dz}`) ? 0 : 1;
  }
  total += exposed;
}
console.log(total);

// Part 2
total = 0;
let minX = Infinity,
  minY = Infinity,
  minZ = Infinity,
  maxX = -Infinity,
  maxY = -Infinity,
  maxZ = -Infinity;
for (const [x, y, z] of map.values()) {
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  minZ = Math.min(minZ, z);
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
  maxZ = Math.max(maxZ, z);
}
const queue = [[minX - 1, minY - 1, minZ - 1]];
const visited = new Set();
while (queue.length) {
  const [x, y, z] = queue.shift();

  if (visited.has(`${x},${y},${z}`)) {
    continue;
  }

  visited.add(`${x},${y},${z}`);

  for (const [dx, dy, dz] of directions) {
    const [x2, y2, z2] = [x + dx, y + dy, z + dz];

    if (
      visited.has(`${x2},${y2},${z2}`) ||
      x2 < minX - 1 ||
      y2 < minY - 1 ||
      z2 < minZ - 1 ||
      x2 > maxX + 1 ||
      y2 > maxY + 1 ||
      z2 > maxZ + 1
    ) {
      continue;
    }

    if (map.has(`${x2},${y2},${z2}`)) {
      total++;
    } else {
      queue.push([x2, y2, z2]);
    }
  }
}
console.log(total);
