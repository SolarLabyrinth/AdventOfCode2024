import fs from "node:fs/promises";

const day = /^.*(day\d+)/.exec(import.meta.filename)?.[1];
const contents = await fs.readFile(`./input/${day}.txt`, "utf-8");

type Operator = "+" | "*" | "||";

function evaluate(operators: Operator[]) {
  let total = 0;
  for (const line of contents.split(/\r?\n/)) {
    const [result, ...operands] = line
      .split(/:|\s/)
      .filter(Boolean)
      .map(Number);

    const numPossibilities = operators.length ** (operands.length - 1);

    for (let i = 0; i < numPossibilities; i++) {
      const pattern = i
        .toString(operators.length)
        .padStart(operands.length - 1, "0")
        .split("")
        .map(Number);

      let possibilityResult = operands.slice(1).reduce((acc, item, i) => {
        const operator = operators[pattern[i]];
        if (operator === "+") {
          return acc + item;
        } else if (operator === "*") {
          return acc * item;
        } else if (operator === "||") {
          return Number(String(acc) + String(item));
        } else {
          throw new Error("This should never happen");
        }
      }, operands[0]);

      if (possibilityResult === result) {
        total += result;
        break;
      }
    }
  }
  return total;
}

console.log(evaluate(["+", "*"]));
console.log(evaluate(["+", "*", "||"]));
