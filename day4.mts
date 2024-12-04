import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day4.txt", "utf-8");

const matrix: string[] = [];
for (const line of contents.split(/\r?\n/)) {
  matrix.push(line);
}

const width = matrix[0].length;
const height = matrix.length;

const possibilities: string[] = [];

function addPossibility(
  x: number,
  y: number,
  updateFn: (x, y) => [number, number]
) {
  let entry: string[] = [];

  let [_x, _y] = [x, y];
  while (_x >= 0 && _x < width && _y >= 0 && _y < height) {
    entry.push(matrix[_x][_y]);
    [_x, _y] = updateFn(_x, _y);
  }

  possibilities.push(entry.join(""));
}

// Horizontals
for (let i = 0; i < height; i++) {
  addPossibility(i, 0, (x, y) => [x, y + 1]);
}
// Verticals
for (let i = 0; i < width; i++) {
  addPossibility(0, i, (x, y) => [x + 1, y]);
}
// Diagonals Top Left to Bottom Right
for (let i = 0; i < width; i++) {
  addPossibility(0, i, (x, y) => [x + 1, y - 1]);
}
for (let i = 1; i < height; i++) {
  addPossibility(i, height - 1, (x, y) => [x + 1, y - 1]);
}
// Diagonals Top Left to Bottom Right
for (let i = width - 1; i >= 0; i--) {
  addPossibility(0, i, (x, y) => [x + 1, y + 1]);
}
for (let i = 1; i < height; i++) {
  addPossibility(i, 0, (x, y) => [x + 1, y + 1]);
}

let count1 = 0;
for (const possibility of possibilities) {
  count1 += Array.from(possibility.matchAll(/XMAS/g)).length;
  count1 += Array.from(possibility.matchAll(/SAMX/g)).length;
}
console.log(count1);

const pattern = /MAS|SAM/;

let count2 = 0;
for (let x = 1; x < height - 1; x++) {
  for (let y = 1; y < width - 1; y++) {
    const topLeft = matrix[x - 1][y - 1];
    const topRight = matrix[x + 1][y - 1];
    const center = matrix[x][y];
    const bottomLeft = matrix[x - 1][y + 1];
    const bottomRight = matrix[x + 1][y + 1];

    let diag1 = [topLeft, center, bottomRight].join("");
    let diag2 = [topRight, center, bottomLeft].join("");

    if (pattern.test(diag1) && pattern.test(diag2)) {
      count2 += 1;
    }
  }
}
console.log(count2);
