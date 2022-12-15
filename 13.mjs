import fs from "fs";

const input = fs.readFileSync("13.txt").toString().split(/\r?\n/);

function compare(left, right) {
  if (!Array.isArray(left) && Array.isArray(right)) {
    left = [left];
  } else if (Array.isArray(left) && !Array.isArray(right)) {
    right = [right];
  }

  if (Array.isArray(left)) {
    for (let i = 0, n = Math.min(left.length, right.length); i < n; i++) {
      const cmp = compare(left[i], right[i]);
      if (cmp == 0) {
        continue;
      }
      return cmp;
    }
    return left.length - right.length;
  } else {
    return left - right;
  }
}

// Part 1
let sum = 0;

for (let i = 0; i < input.length; i += 3) {
  const packet1 = eval(input[i]);
  const packet2 = eval(input[i + 1]);

  const cmp = compare(packet1, packet2);
  if (cmp < 0) {
    sum += i / 3 + 1;
  }
}

console.log(sum);

// Part 2
const divider1 = [[2]];
const divider2 = [[6]];

const packets = [divider1, divider2];

for (let i = 0; i < input.length; i += 3) {
  packets.push(eval(input[i]), eval(input[i + 1]));
}

packets.sort(compare);

console.log((packets.indexOf(divider1) + 1) * (packets.indexOf(divider2) + 1));
