import fs from "fs";

const input = fs
  .readFileSync("16.txt")
  .toString()
  .replace(/=/g, " ")
  .replace(/[;,]/g, "")
  .split(/\r?\n/);

const valves = new Map();

for (const line of input) {
  const split = line.split(" ");
  valves.set(split[1], {
    name: split[1],
    rate: parseInt(split[5]),
    tunnels: split.slice(10),
  });
}

const paths = new Map();

for (const valve1 of valves.values()) {
  for (const valve2 of valves.values()) {
    paths.set(
      `${valve1.name}->${valve2.name}`,
      findPath(valve1.name, valve2.name)
    );
  }
}

function findPath(start, end) {
  const visited = new Map([[start, null]]);
  const queue = [start];

  while (queue.length) {
    const current = queue.shift();
    const currentValve = valves.get(current);

    if (current == end) {
      const path = [];
      for (let p = end; p; p = visited.get(p)) {
        path.push(p);
      }
      return path.reverse();
    }

    for (const tunnel of currentValve.tunnels) {
      if (!visited.has(tunnel)) {
        visited.set(tunnel, current);
        queue.push(tunnel);
      }
    }
  }
}

function solve(players) {
  let maxPressure = 0;

  function visit(players, open, pressure) {
    // Choose player with the most time left
    players = [...players].sort((a, b) => b[0] - a[0]);
    const [remaining, current] = players[0];
    let nextPressure = 0;

    for (const next of valves.keys()) {
      const time = paths.get(`${current}->${next}`).length;
      if (
        next != current &&
        valves.get(next).rate > 0 &&
        !open.has(next) &&
        time <= remaining
      ) {
        nextPressure = Math.max(
          nextPressure,
          visit(
            [[remaining - time, next], ...players.slice(1)],
            new Set([...open, next]),
            pressure + (remaining - time) * valves.get(next).rate
          )
        );
      }
    }

    maxPressure = Math.max(maxPressure, pressure);
    return pressure;
  }

  visit(players, new Set(), 0);
  return maxPressure;
}

// Part 1
console.log(solve([[30, "AA"]]));

// Part 2
console.log(
  solve([
    [26, "AA"],
    [26, "AA"],
  ])
);
