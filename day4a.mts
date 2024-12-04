import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day4.txt", "utf-8");

const matrix: string[][] = [];

for (const line of contents.split(/\r?\n/)) {
  matrix.push(line.split(""));
}

const width = matrix[0].length;
const height = matrix.length;

const possibilities: string[] = [];

// Horizontals
for (let i = 0; i < width; i++) {
  let entry: string[] = [];
  for (let j = 0; j < height; j++) {
    entry.push(matrix[i][j]);
  }
  possibilities.push(entry.join(""));
}

// Verticals
for (let i = 0; i < width; i++) {
  let entry: string[] = [];
  for (let j = 0; j < height; j++) {
    entry.push(matrix[j][i]);
  }
  possibilities.push(entry.join(""));
}

// Diagonals Top Left to Bottom Right
function getDiagonalSeqA(x: number, y: number, width: number, height: number) {
  let seq: [number, number][] = [];

  let _x = x;
  let _y = y;
  while (_x >= 0 && _x < width && _y >= 0 && _y < height) {
    seq.push([_x, _y]);
    _x = _x + 1;
    _y = _y - 1;
  }
  return seq;
}
for (let i = 0; i < width; i++) {
  let entry: string[] = [];
  for (let [x, y] of getDiagonalSeqA(0, i, width, height)) {
    entry.push(matrix[x][y]);
  }
  possibilities.push(entry.join(""));
}
for (let i = 1; i < height; i++) {
  let entry: string[] = [];
  for (let [x, y] of getDiagonalSeqA(i, height - 1, width, height)) {
    entry.push(matrix[x][y]);
  }
  possibilities.push(entry.join(""));
}

// Diagonals Top Left to Bottom Right
function getDiagonalSeqB(x: number, y: number, width: number, height: number) {
  let seq: [number, number][] = [];

  let _x = x;
  let _y = y;
  while (_x >= 0 && _x < width && _y >= 0 && _y < height) {
    seq.push([_x, _y]);
    _x = _x + 1;
    _y = _y + 1;
  }
  return seq;
}
for (let i = width - 1; i >= 0; i--) {
  let entry: string[] = [];
  for (let [x, y] of getDiagonalSeqB(0, i, width, height)) {
    entry.push(matrix[x][y]);
  }
  possibilities.push(entry.join(""));
}
for (let i = 1; i < height; i++) {
  let entry: string[] = [];
  for (let [x, y] of getDiagonalSeqB(i, 0, width, height)) {
    entry.push(matrix[x][y]);
  }
  possibilities.push(entry.join(""));
}

let count = 0;
for (const possibility of possibilities) {
  const matches = Array.from(possibility.matchAll(/XMAS/g));
  count += matches.length;
}
for (const possibility of possibilities) {
  const matches = Array.from(possibility.matchAll(/SAMX/g));
  count += matches.length;
}

console.log(count);
