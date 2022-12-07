import fs from "fs";

const input = fs.readFileSync("4.txt").toString();

let fullyContainsCount = 0;
let overlapCount = 0;

for (const pair of input.split(/\r?\n/)) {
  const assignments = pair.split(",").map((assignment) => {
    const sections = assignment.split("-");
    return { start: +sections[0], end: +sections[1] };
  });

  if (
    (assignments[0].start >= assignments[1].start &&
      assignments[0].end <= assignments[1].end) ||
    (assignments[1].start >= assignments[0].start &&
      assignments[1].end <= assignments[0].end)
  ) {
    fullyContainsCount++;
  }

  if (
    assignments[0].start <= assignments[1].end &&
    assignments[0].end >= assignments[1].start
  ) {
    overlapCount++;
  }
}

// Part 1
console.log(fullyContainsCount);

// Part 2
console.log(overlapCount);
