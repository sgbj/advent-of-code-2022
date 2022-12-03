import * as fs from "node:fs/promises";

function convertToPriority(value) {
  return value >= "a" && value <= "z"
    ? value.charCodeAt(0) - "a".charCodeAt(0) + 1
    : value.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

function findCommon(arrays) {
  arrays = arrays.map((array) => [...array].sort((a, b) => a - b));
  const indices = Array(arrays.length).fill(0);
  for (; indices[0] < arrays[0].length; indices[0]++) {
    const value = arrays[0][indices[0]];
    let common = true;
    for (let i = 1; i < arrays.length; i++) {
      while (
        arrays[i][indices[i]] < value &&
        indices[i] < arrays[i].length - 1
      ) {
        indices[i]++;
      }
      if (arrays[i][indices[i]] != value) {
        common = false;
      }
    }
    if (common) {
      return value;
    }
  }
}

function* chunk(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const rucksacks = (await fs.readFile("3.txt"))
  .toString()
  .split(/\r?\n/)
  .map((line) => [...line].map(convertToPriority));

// Part 1
let sum = 0;
for (const rucksack of rucksacks) {
  sum += findCommon([...chunk(rucksack, rucksack.length / 2)]);
}
console.log(sum);

// Part 2
sum = 0;
for (let group of chunk(rucksacks, 3)) {
  sum += findCommon(group);
}
console.log(sum);
