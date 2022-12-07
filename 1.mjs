import fs from "fs";

const input = fs.readFileSync("1.txt").toString();

const elves = input.split(/\r?\n\r?\n/).map((value, index) => {
  const calories = value.split(/\r?\n/).map(Number);
  return {
    id: index + 1,
    calories,
    total: calories.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ),
  };
});

elves.sort((a, b) => b.total - a.total);

// Part 1
console.log(elves[0].total);

// Part 2
console.log(
  elves
    .slice(0, 3)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.total,
      0
    )
);
