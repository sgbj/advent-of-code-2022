import * as fs from "node:fs";
import * as readline from "node:readline/promises";

const opponentMoves = new Map([
  ["A", 1], // Rock
  ["B", 2], // Paper
  ["C", 3], // Scissors
]);

const myMoves = new Map([
  ["X", 1], // Rock
  ["Y", 2], // Paper
  ["Z", 3], // Scissors
]);

const myScores = new Map([
  ["X", 0], // Loss
  ["Y", 3], // Draw
  ["Z", 6], // Win
]);

function getScore(move1, move2) {
  const result = move1 - move2;
  return result == -1 || result == 2 ? 6 : result == 1 || result == -2 ? 0 : 3;
}

const rounds = [];

const rl = readline.createInterface(fs.createReadStream("2.txt"));

for await (const line of rl) {
  const moves = line.split(" ");
  const opponentMove = opponentMoves.get(moves[0]);
  const myMove1 = myMoves.get(moves[1]);
  const myScore1 = myMove1 + getScore(opponentMove, myMove1);
  const myScore2 =
    myScores.get(moves[1]) +
    [...myMoves.values()].find(
      (myMove) => getScore(opponentMove, myMove) == myScores.get(moves[1])
    );
  rounds.push({
    myScore1,
    myScore2,
  });
}

// Part 1
console.log(
  rounds.reduce(
    (previousValue, currentValue) => previousValue + currentValue.myScore1,
    0
  )
);

// Part 2
console.log(
  rounds.reduce(
    (previousValue, currentValue) => previousValue + currentValue.myScore2,
    0
  )
);
