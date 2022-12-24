import fs from "fs";

const blueprints = fs
  .readFileSync("19.txt")
  .toString()
  .split(/\r?\n/)
  .map((line) => line.match(/\d+/g).map(Number))
  .map((values) => ({
    id: values[0],
    // ore, clay, obsidian, geode
    costs: [
      [values[1], 0, 0, 0],
      [values[2], 0, 0, 0],
      [values[3], values[4], 0, 0],
      [values[5], 0, values[6], 0],
    ],
  }));

function solve(blueprint, robots, resources, minutes) {
  let quality = resources[3] + minutes * robots[3];

  if (minutes > 1) {
    for (let i = 0; i < blueprint.costs.length; i++) {
      if (
        blueprint.costs[i].every((c, j) => c == 0 || robots[j] > 0) &&
        (i == 3 || robots[i] < Math.max(...blueprint.costs.map((c) => c[i])))
      ) {
        const time =
          Math.max(
            ...blueprint.costs[i].map((c, j) =>
              c > 0 ? Math.ceil((c - resources[j]) / robots[j]) : 0
            )
          ) + 1;
        if (minutes - time >= 0) {
          quality = Math.max(
            quality,
            solve(
              blueprint,
              robots.map((r, j) => (j == i ? r + 1 : r)),
              resources.map(
                (r, j) => r + robots[j] * time - blueprint.costs[i][j]
              ),
              minutes - time
            )
          );
        }
      }
    }
  }

  return quality;
}

// Part 1
console.log(
  blueprints.reduce(
    (total, blueprint) =>
      total + solve(blueprint, [1, 0, 0, 0], [0, 0, 0, 0], 24) * blueprint.id,
    0
  )
);

// Part 2
console.log(
  blueprints
    .slice(0, 3)
    .reduce(
      (total, blueprint) =>
        total * solve(blueprint, [1, 0, 0, 0], [0, 0, 0, 0], 32),
      1
    )
);
