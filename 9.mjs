import fs from "fs";

const input = fs.readFileSync("9.txt").toString();
const lines = input.split(/\r?\n/);

function countVisits(length) {
  const start = { x: 11, y: 15 };
  const rope = Array(length + 1)
    .fill()
    .map(() => ({ ...start }));
  const visited = [{ ...start }];

  for (const line of lines) {
    const [direction, count] = line.split(" ");

    for (let i = 0; i < count; i++) {
      switch (direction) {
        case "R":
          rope[0].x += 1;
          break;
        case "U":
          rope[0].y -= 1;
          break;
        case "L":
          rope[0].x -= 1;
          break;
        case "D":
          rope[0].y += 1;
          break;
      }

      for (let j = 1; j < rope.length; j++) {
        const dx = rope[j - 1].x - rope[j].x;
        const dy = rope[j - 1].y - rope[j].y;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          rope[j].x += Math.sign(dx);
          rope[j].y += Math.sign(dy);

          if (
            j == rope.length - 1 &&
            !visited.some((knot) => knot.x == rope[j].x && knot.y == rope[j].y)
          ) {
            visited.push({ ...rope[j] });
          }
        }
      }
    }
  }

  return visited.length;
}

// Part 1
console.log(countVisits(1));

// Part 2
console.log(countVisits(9));
