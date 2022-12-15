import fs from "fs";

function calculateMonkeyBusiness(rounds, relief) {
  const input = fs.readFileSync("11.txt").toString();
  const lines = input.split(/\r?\n/);

  const monkeys = [];

  for (let i = 0; i < lines.length; i += 7) {
    monkeys.push({
      items: lines[i + 1]
        .split(":")[1]
        .split(", ")
        .map((value) => parseInt(value.trim())),
      operation: lines[i + 2].split(":")[1].trim().split(" "),
      test: lines[i + 3].split(":")[1].trim().split(" "),
      ifTrue: parseInt(lines[i + 4].split(" ").at(-1)),
      ifFalse: parseInt(lines[i + 5].split(" ").at(-1)),
      inspections: 0,
    });
  }

  // Calculate GCM to prevent overflows
  const gcm = monkeys.reduce(
    (previousValue, currentValue) =>
      previousValue * parseInt(currentValue.test[2]),
    1
  );

  for (let round = 1; round <= rounds; round++) {
    for (let monkey of monkeys) {
      while (monkey.items.length) {
        // Inspect
        monkey.inspections++;
        let item = monkey.items.shift();
        let op = monkey.operation[3];
        let value =
          monkey.operation[4] == "old" ? item : parseInt(monkey.operation[4]);
        item = op == "+" ? item + value : item * value;
        // Bored
        if (relief) {
          item = Math.floor(item / relief);
        } else {
          // Prevent overflows
          item %= gcm;
        }
        // Test
        let divisor = parseInt(monkey.test[2]);
        monkeys[
          item % divisor == 0 ? monkey.ifTrue : monkey.ifFalse
        ].items.push(item);
      }
    }
  }

  return monkeys
    .sort((a, b) => b.inspections - a.inspections)
    .slice(0, 2)
    .reduce(
      (previousValue, currentValue) => previousValue * currentValue.inspections,
      1
    );
}

// Part 1
console.log(calculateMonkeyBusiness(20, 3));

// Part 2
console.log(calculateMonkeyBusiness(10000));
