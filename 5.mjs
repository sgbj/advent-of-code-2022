import fs from "fs";

const input = fs.readFileSync("5.txt").toString();

const lines = input.split(/\r?\n/);
const index = lines.indexOf("");

// Convert first part of input to starting crate stacks
const stacks1 = [];
for (const line of lines.slice(0, index - 1).reverse()) {
  for (const [index, value] of [...line.replace(/\[|\]/g, " ")].entries()) {
    if (value != " ") {
      (stacks1[Math.floor(index / 4)] ??= []).push(value);
    }
  }
}
const stacks2 = [...stacks1.map((stack) => [...stack])];

// Move crates
for (const line of lines.slice(index + 1)) {
  // move 1 from 2 to 1
  const split = line.split(" ");
  const count = +split[1];
  const from = +split[3] - 1;
  const to = +split[5] - 1;

  // CrateMover 9000
  for (let i = 0; i < count; i++) {
    stacks1[to].push(stacks1[from].pop());
  }

  // CrateMover 9001
  stacks2[to].push(...stacks2[from].splice(-count));
}

// Part 1
console.log(stacks1.map((stack) => stack.at(-1)).join(""));

// Part 2
console.log(stacks2.map((stack) => stack.at(-1)).join(""));
