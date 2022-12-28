import fs from "fs";

const values = fs
  .readFileSync("25.txt")
  .toString()
  .split(/\r?\n/)
  .map(parseSnafu);

function parseSnafu(snafu) {
  const digits = new Map([
    ["2", 2],
    ["1", 1],
    ["0", 0],
    ["-", -1],
    ["=", -2],
  ]);
  let value = 0;
  for (let i = 0; i < snafu.length; i++) {
    value += digits.get(snafu[snafu.length - 1 - i]) * 5 ** i;
  }
  return value;
}

function toSnafu(value) {
  const digits = ["=", "-", "0", "1", "2"];
  let snafu = [];
  while (value > 0) {
    snafu.push(digits[(value + 2) % 5]);
    value = Math.floor((value + 2) / 5);
  }
  return snafu.reverse().join("");
}

// Part 1
console.log(toSnafu(values.reduce((sum, value) => sum + value, 0)));
