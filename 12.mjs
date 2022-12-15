import fs from "fs";

const input = fs.readFileSync("12.txt").toString();
const grid = input.split(/\r?\n/).map((line) => [...line]);

const start = find(grid, "S");
const end = find(grid, "E");

function bfs(grid, start, end) {
  const queue = [start];
  const visited = new Map();

  while (queue.length) {
    const current = queue.shift();
    const currentValue = grid[current[1]][current[0]];

    if (current[0] == end[0] && current[1] == end[1]) {
      const path = [];
      for (let p = current; p != null; p = visited.get(p)) {
        path.push(p);
      }
      return path.reverse();
    }

    for (const direction of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      const next = [current[0] + direction[0], current[1] + direction[1]];

      if (
        next[1] < 0 ||
        next[1] >= grid.length ||
        next[0] < 0 ||
        next[0] >= grid[next[1]].length
      ) {
        continue;
      }

      const nextValue = grid[next[1]][next[0]];

      if (
        (nextValue == "E" ? "z" : nextValue).charCodeAt(0) -
          (currentValue == "S" ? "a" : currentValue).charCodeAt(0) >
        1
      ) {
        continue;
      }

      if (
        [...visited.keys()].findIndex(
          (p) => next[0] == p[0] && next[1] == p[1]
        ) == -1
      ) {
        visited.set(next, current);
        queue.push(next);
      }
    }
  }
}

function find(grid, value) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == value) {
        return [x, y];
      }
    }
  }
}

// Part 1
console.log(bfs(grid, start, end).length - 1);

// Part 2
const paths = [];
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == "a") {
      paths.push(bfs(grid, [x, y], end));
    }
  }
}
console.log(paths.sort((a, b) => a.length - b.length)[0].length - 1);
