import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day4.txt", "utf-8");

const matrix: string[][] = [];

for (const line of contents.split(/\r?\n/)) {
  matrix.push(line.split(""));
}

const width = matrix[0].length;
const height = matrix.length;

let count = 0;
for (let x = 1; x < width - 1; x++) {
  for (let y = 1; y < height - 1; y++) {
    let diag1 = [matrix[x - 1][y - 1], matrix[x][y], matrix[x + 1][y + 1]].join(
      ""
    );
    let diag2 = [matrix[x + 1][y - 1], matrix[x][y], matrix[x - 1][y + 1]].join(
      ""
    );
    if (/MAS|SAM/.test(diag1) && /MAS|SAM/.test(diag2)) {
      count += 1;
    }
  }
}
console.log(count);
