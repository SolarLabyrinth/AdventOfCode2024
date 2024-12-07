import fs from "node:fs/promises";

const day = /^.*(day\d+)/.exec(import.meta.filename)?.[1];
const contents = await fs.readFile(`./input/${day}.txt`, "utf-8");

type Operator = "+" | "*" | "||";

function evaluate(operators: Operator[]) {
  let total = 0;
  for (const line of contents.split(/\r?\n/)) {
    const [result, firstOperand, ...remainingOperands] = line
      .split(/:|\s/)
      .filter(Boolean)
      .map(Number);

    const numPossibilities = operators.length ** remainingOperands.length;

    for (let i = 0; i < numPossibilities; i++) {
      // Turns decimal i into pattern like: 0010
      const pattern = i
        .toString(operators.length)
        .padStart(remainingOperands.length, "0")
        .split("")
        .map(Number);

      const patternResult = remainingOperands.reduce((acc, item, i) => {
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
      }, firstOperand);

      if (patternResult === result) {
        total += result;
        break;
      }
    }
  }
  return total;
}

console.log(evaluate(["+", "*"]));
console.log(evaluate(["+", "*", "||"]));
