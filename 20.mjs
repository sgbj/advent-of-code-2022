import fs from "fs";

const input = fs.readFileSync("20.txt").toString().split(/\r?\n/).map(Number);

function mix(decryptionKey, count) {
  const file = input.map((value, index) => ({
    value: value * decryptionKey,
    index,
  }));

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < file.length; j++) {
      const index = file.findIndex(({ index }) => index == j);
      const entry = file[index];
      const newIndex = (index + entry.value) % (file.length - 1);
      file.splice(index, 1);
      file.splice(newIndex, 0, entry);
    }
  }

  const zeroIndex = file.findIndex(({ value }) => value === 0);

  return (
    file[(zeroIndex + 1000) % file.length].value +
    file[(zeroIndex + 2000) % file.length].value +
    file[(zeroIndex + 3000) % file.length].value
  );
}

// Part 1
console.log(mix(1, 1));

// Part 2
console.log(mix(811589153, 10));
