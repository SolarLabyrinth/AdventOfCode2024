import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day3.txt", "utf-8");

const total1 = Array.from(contents.matchAll(/mul\(\d{1,3},\d{1,3}\)/g))
  .map((match) => match[0])
  .map((input) => {
    const match = /mul\((\d{1,3}),(\d{1,3})\)/.exec(input);
    const a = Number(match?.[1]);
    const b = Number(match?.[2]);
    return a * b;
  })
  .reduce((acc, item) => acc + item, 0);

console.log(total1);

const commands = Array.from(
  contents.matchAll(/(do\(\))|(don't\(\))|(mul\(\d{1,3},\d{1,3}\))/g)
).map((match) => match[0]);

let enabled = true;
let total2 = 0;
for (const command of commands) {
  if (command === "do()") {
    enabled = true;
  } else if (command === `don't()`) {
    enabled = false;
  } else {
    if (enabled) {
      const match = /mul\((\d{1,3}),(\d{1,3})\)/.exec(command);
      const a = Number(match?.[1]);
      const b = Number(match?.[2]);
      total2 += a * b;
    }
  }
}
console.log(total2);
