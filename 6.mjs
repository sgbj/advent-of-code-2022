import fs from "fs";

const input = fs.readFileSync("6.txt").toString();

const characters = [...input];

function findMarker(characters, markerLength) {
  const buffer = [];
  for (let i = 0; i < characters.length; i++) {
    const characterIndex = buffer.indexOf(characters[i]);
    buffer.push(characters[i]);
    if (buffer.length >= markerLength && characterIndex < 0) {
      return i + 1;
    }
    if (characterIndex >= 0) {
      buffer.splice(0, characterIndex + 1);
    }
  }
}

// Part 1
console.log(findMarker(characters, 4));

// Part 2
console.log(findMarker(characters, 14));
