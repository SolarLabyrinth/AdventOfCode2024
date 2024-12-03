import fs from "fs/promises";

const contents = await fs.readFile("./input/day2.txt", "utf-8");

type Report = number[];

const reports: Report[] = [];
for (const line of contents.split(/\r?\n/)) {
  if (line) {
    const levels = line.split(/\s+/).filter(Boolean).map(Number);
    reports.push(levels);
  }
}

function checkSequence(
  report: Report,
  comparator: (a: number, b: number) => boolean
) {
  const isIncreasing = report.reduce(
    (acc, item) => {
      if (!acc.lastValue) {
        return {
          result: true,
          lastValue: item,
        };
      } else {
        return {
          result: acc.result && comparator(acc.lastValue, item),
          lastValue: item,
        };
      }
    },
    {
      result: true,
      lastValue: undefined as number | undefined,
    }
  );
  return isIncreasing.result;
}

function isSafe(report: Report) {
  const isAscending = checkSequence(report, (a, b) => a <= b);
  const isDescending = checkSequence(report, (a, b) => a >= b);
  const isWithin3 = checkSequence(report, (a, b) => Math.abs(a - b) <= 3);
  const isAtLeast1 = checkSequence(report, (a, b) => Math.abs(a - b) >= 1);

  const isSafe = (isAscending || isDescending) && isAtLeast1 && isWithin3;
  return isSafe;
}

let safeCounts1 = 0;
for (const report of reports) {
  if (isSafe(report)) {
    safeCounts1 += 1;
  }
}
console.log(safeCounts1);

let safeCounts2 = 0;
for (const report of reports) {
  if (isSafe(report)) {
    safeCounts2 += 1;
  } else {
    for (let i = 0; i < report.length; i++) {
      const newReport = report.filter((_, j) => i !== j);
      if (isSafe(newReport)) {
        safeCounts2 += 1;
        break;
      }
    }
  }
}
console.log(safeCounts2);
