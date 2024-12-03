import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day1.txt", "utf-8");

let leftList: number[] = [];
let rightList: number[] = [];

for (const line of contents.split(/\r?\n/)) {
  const [left, right] = line.split(/\s+/).filter(Boolean).map(Number);
  leftList.push(left);
  rightList.push(right);
}

leftList.sort();
rightList.sort();

let rightCounts = {};
for (var value of rightList) {
  if (rightCounts[value]) {
    let oldValue = rightCounts[value];
    rightCounts[value] = oldValue + 1;
  } else {
    rightCounts[value] = 1;
  }
}

let total1 = leftList.reduce((acc, value, i) => {
  return acc + Math.abs(value - rightList[i]);
}, 0);

console.log(total1);

let total2 = leftList.reduce((acc, value, i) => {
  return acc + (value * rightCounts[value] || 0);
}, 0);

console.log(total2);
