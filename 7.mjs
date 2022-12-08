import * as fs from "node:fs";
import * as readline from "node:readline/promises";

const rl = readline.createInterface(fs.createReadStream("7.txt"));

let root = null;
let current = null;

for await (const line of rl) {
  const words = line.split(" ");

  if (line.startsWith("$ cd")) {
    if (words[2] == "..") {
      current = current?.parent;
    } else {
      current = current?.children.find((n) => n.name == words[2]) ?? {
        parent: current,
        name: words[2],
        type: "directory",
        size: 0,
        children: [],
      };
      root ??= current;
    }
  } else if (line.startsWith("dir")) {
    if (!current.children.some((n) => n.name == words[1])) {
      current.children.push({
        parent: current,
        name: words[1],
        type: "directory",
        size: 0,
        children: [],
      });
    }
  } else if (/^\d+/.test(line)) {
    if (!current.children.some((n) => n.name == words[1])) {
      current.children.push({
        parent: current,
        name: words[1],
        type: "file",
        size: +words[0],
      });
      // Update parents
      for (let n = current; n; n = n.parent) {
        n.size += +words[0];
      }
    }
  }
}

const spaceNeeded = 30000000 - (70000000 - root.size);
const candidates1 = [];
const candidates2 = [];
const queue = [root];

while (queue.length) {
  const node = queue.shift();

  if (node.size <= 100000) {
    candidates1.push(node);
  }
  if (node.size >= spaceNeeded) {
    candidates2.push(node);
  }

  queue.push(...node.children.filter((n) => n.type == "directory"));
}

// Part 1
console.log(
  candidates1.reduce(
    (previousValue, currentValue) => previousValue + currentValue.size,
    0
  )
);

// Part 2
console.log(candidates2.sort((a, b) => a.size - b.size)[0].size);
