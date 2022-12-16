import fs from "fs";

const input = fs.readFileSync("15.txt").toString().split(/\r?\n/);

const items = [];

for (const line of input) {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map(Number);
  items.push([sx, sy, Math.abs(bx - sx) + Math.abs(by - sy)]);
}

function process(items, startX, startY, endX, endY) {
  let count = 0;
  let tuningFrequency = 0;

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      let valid = true;

      for (let [sx, sy, d] of items) {
        if (Math.abs(x - sx) + Math.abs(y - sy) < d) {
          const dx = d - Math.abs(sy - y) + (sx - x);
          x += dx;
          count += dx + 1;
          valid = false;
          break;
        }
      }

      if (valid) {
        tuningFrequency = x * 4000000 + y;
      }
    }
  }

  return [count, tuningFrequency];
}

// Part 1
const startX = Math.min(...items.map(([sx, , d]) => sx - d));
const endX = Math.max(...items.map(([sx, , d]) => sx + d));
console.log(process(items, startX, 2000000, endX, 2000000)[0]);

// Part 2
console.log(process(items, 0, 0, 4000000, 4000000)[1]);
