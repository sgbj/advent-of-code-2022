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

let sum = 0;
const divider1 = [[2]];
const divider2 = [[6]];
let divider1Index = 0;
let divider2Index = 1; // Divider 1 precedes divider 2

for (let i = 0; i < input.length; i += 3) {
  const packet1 = parse(input[i]);
  const packet2 = parse(input[i + 1]);

  if (compare(packet1, packet2) < 0) {
    sum += i / 3 + 1;
  }

  if (compare(packet1, divider1) < 0) divider1Index++;
  if (compare(packet2, divider1) < 0) divider1Index++;
  if (compare(packet1, divider2) < 0) divider2Index++;
  if (compare(packet2, divider2) < 0) divider2Index++;
}

// Part 1
console.log(sum);

// Part 2
console.log((divider1Index + 1) * (divider2Index + 1));

// Or just use eval
function parse(value) {
  const stack = [];
  let current = null;
  let number = "";

  for (const c of value) {
    switch (c) {
      case "[": {
        const temp = [];
        current?.push(temp);
        current = temp;
        stack.push(current);
        break;
      }

      case "]": {
        if (number) {
          current.push(parseInt(number));
          number = "";
        }
        stack.pop();
        const temp = stack.at(-1);
        if (temp) {
          current = temp;
        }
        break;
      }

      case ",": {
        if (number) {
          current.push(parseInt(number));
          number = "";
        }
        break;
      }

      default: {
        number += c;
        break;
      }
    }
  }

  return current;
}
