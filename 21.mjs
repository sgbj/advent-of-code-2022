import fs from "fs";

const monkeys = new Map(
  fs
    .readFileSync("21.txt")
    .toString()
    .split(/\r?\n/)
    .map((line) => line.split(": "))
);

function part1(name) {
  const job = monkeys.get(name);

  if (!isNaN(job)) {
    return parseInt(job);
  }

  const [left, operation, right] = job.split(" ");

  return operation == "+"
    ? part1(left) + part1(right)
    : operation == "-"
    ? part1(left) - part1(right)
    : operation == "*"
    ? part1(left) * part1(right)
    : part1(left) / part1(right);
}

function part2(name, value) {
  const [left, operation, right] = monkeys.get(name).split(" ");

  if (name == "root") {
    return hasHumn(left)
      ? part2(left, part1(right))
      : part2(right, part1(left));
  }

  const leftHasHumn = hasHumn(left);
  let nextName = leftHasHumn ? left : right;
  let otherValue = part1(leftHasHumn ? right : left);

  value =
    operation == "+"
      ? value - otherValue
      : operation == "-"
      ? leftHasHumn
        ? value + otherValue
        : otherValue - value
      : operation == "*"
      ? value / otherValue
      : value * otherValue;

  return nextName == "humn" ? value : part2(nextName, value);
}

function hasHumn(name) {
  if (name == "humn") {
    return true;
  }

  const job = monkeys.get(name);

  if (!isNaN(job)) {
    return false;
  }

  const [left, , right] = job.split(" ");

  return hasHumn(left) || hasHumn(right);
}

// Part 1
console.log(part1("root"));

// Part 2
console.log(part2("root"));
