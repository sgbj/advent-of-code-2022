import fs from "fs";

const input = fs.readFileSync("14.txt").toString().split(/\r?\n/);

const map = new Map();
let floor = 0;

for (const line of input) {
  const coords = line
    .split(" -> ")
    .map((coord) => coord.split(",").map(Number));

  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];

    for (let y = Math.min(y0, y1), ymax = Math.max(y0, y1); y <= ymax; y++) {
      for (let x = Math.min(x0, x1), xmax = Math.max(x0, x1); x <= xmax; x++) {
        map.set(`${x},${y}`, "#");
      }
    }

    floor = Math.max(floor, Math.max(y0, y1));
  }
}

let sand = 0;
let part1 = 0;

while (true) {
  let x = 500;
  let y = 0;
  let rest = false;

  if (map.get(`${x},${y}`)) {
    break;
  }

  while (y <= floor && !rest) {
    const down = map.get(`${x},${y + 1}`);
    const downLeft = map.get(`${x - 1},${y + 1}`);
    const downRight = map.get(`${x + 1},${y + 1}`);

    if (!down) {
      y++;
    } else if (!downLeft) {
      x--;
      y++;
    } else if (!downRight) {
      x++;
      y++;
    } else {
      rest = true;
    }
  }

  map.set(`${x},${y}`, "o");

  if (y >= floor && !part1) {
    part1 = sand;
  }

  sand++;
}

// Part 1
console.log(part1);

// Part 2
console.log(sand);
