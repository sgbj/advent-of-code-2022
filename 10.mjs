import fs from "fs";

const input = fs.readFileSync("10.txt").toString();
const lines = input.split(/\r?\n/);

let cycle = 1;
let x = 1;
let sum = 0;

const sprite = "###.....................................";
let display = "";

for (let line of lines) {
  const [op, ...args] = line.split(" ");
  let cycles = 0;
  let oldX = x;

  switch (op) {
    case "noop":
      cycles = 1;
      break;

    case "addx":
      cycles = 2;
      x += parseInt(args[0]);
      break;
  }

  for (let i = 0; i < cycles; i++, cycle++) {
    if ((cycle - 20) % 40 == 0) {
      sum += oldX * cycle;
    }

    display += sprite.at((cycle % 40) - oldX);

    if (cycle % 40 == 0) {
      display += "\n";
    }
  }
}

// Part 1
console.log(sum);

// Part 2
console.log(display);
