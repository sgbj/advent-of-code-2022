import fs from "fs";

const input = fs.readFileSync("22.txt").toString();

const map = [];
const path = [];

for (const line of input.split(/\r?\n/)) {
  if (line == "") {
    continue;
  }

  const matches = line.match(/\d+|L|R/g);

  if (matches?.length) {
    path.push(...matches);
  } else {
    map.push([...line]);
  }
}

function solve(wrap) {
  let row = 0;
  let col = map[row].findIndex((cell) => cell == ".");
  let facing = 0;

  for (const direction of path) {
    if (direction === "R") {
      facing++;
    } else if (direction === "L") {
      facing--;
    } else {
      const count = parseInt(direction);

      for (let i = 0; i < count; i++) {
        const f = ((facing % 4) + 4) % 4;
        const dx = f == 0 ? 1 : f == 2 ? -1 : 0;
        const dy = f == 1 ? 1 : f == 3 ? -1 : 0;
        const cell = map[row + dy]?.[col + dx];

        if (cell == ".") {
          row += dy;
          col += dx;
        } else if (cell == "#") {
          break;
        } else {
          [row, col, facing] = wrap(row, col, facing, dx, dy);
        }
      }
    }
  }

  return 1000 * (row + 1) + 4 * (col + 1) + (((facing % 4) + 4) % 4);
}

// Part 1
console.log(
  solve((row, col, facing, dx, dy) => {
    let r = dy == 0 ? row : dy > 0 ? 0 : map.length - 1;
    let c = dx == 0 ? col : dx > 0 ? 0 : map[r].length - 1;

    while (map[r][c] != "." && map[r][c] != "#") {
      r += dy;
      c += dx;
    }

    if (map[r][c] == ".") {
      return [r, c, facing];
    }

    return [row, col, facing];
  })
);

// Part 2
console.log(
  solve((row, col, facing, dx, dy) => {
    let r = row + dy;
    let c = col + dx;
    let f = ((facing % 4) + 4) % 4;

    if (r < 0) {
      if (c < 100) {
        r = 150 + (c - 50);
        c = 0;
        f = 0;
      } else {
        c -= 100;
        r = 199;
      }
    } else if (r > 199) {
      c += 100;
      r = 0;
    } else if (c < 0) {
      if (r < 150) {
        r = 149 - r;
        c = 50;
        f = 0;
      } else {
        c = 50 + (r - 150);
        r = 0;
        f = 1;
      }
    } else if (c > 149) {
      c = 99;
      r = 149 - r;
      f = 2;
    } else if (c < 50 && r < 100) {
      if (f == 2) {
        if (r < 50) {
          c = 0;
          r = 149 - r;
          f = 0;
        } else {
          c = r - 50;
          r = 100;
          f = 1;
        }
      } else if (f == 3) {
        r = 50 + c;
        c = 50;
        f = 0;
      }
    } else if (c > 99 && r > 49) {
      if (f == 0) {
        if (r < 100) {
          c = 100 + (r - 50);
          r = 49;
          f = 3;
        } else {
          c = 149;
          r = 149 - r;
          f = 2;
        }
      } else if (f == 1) {
        r = 50 + (c - 100);
        c = 99;
        f = 2;
      }
    } else if (c > 49 && r > 149) {
      if (f == 1) {
        r = 150 + (c - 50);
        c = 49;
        f = 2;
      } else if (f == 0) {
        c = 50 + (r - 150);
        r = 149;
        f = 3;
      }
    }

    if (map[r][c] == ".") {
      return [r, c, f];
    }

    return [row, col, facing];
  })
);
