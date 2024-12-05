import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day5.txt", "utf-8");

type Rule = [number, number];
type Update = number[];

const rules: Rule[] = [];
const updates: Update[] = [];
for (const line of contents.split(/\r?\n/)) {
  if (line.match(/\d+\|\d+/)) {
    rules.push(line.split("|").map(Number) as Rule);
  } else if (line.match(/\d+,(\d+)+/)) {
    updates.push(line.split(",").map(Number));
  }
}

function getRulesForUpdate(update: Update) {
  let filteredRules = rules.filter(
    ([a, b]) => update.includes(a) && update.includes(b)
  );
  return filteredRules;
}

function matchesRule(update: Update, rule: Rule) {
  const [a, b] = update.filter((page) => rule.includes(page));
  const [c, d] = rule;
  return a === c && b === d;
}

function getFailingRules(update: Update) {
  const failingRules: Rule[] = [];

  const matchingRules = getRulesForUpdate(update);
  for (const rule of matchingRules) {
    if (!matchesRule(update, rule)) {
      failingRules.push(rule);
    }
  }
  return failingRules;
}

let middleSum1 = 0;
for (const update of updates) {
  if (getFailingRules(update).length === 0) {
    middleSum1 += update[Math.floor(update.length / 2)];
  }
}
console.log(middleSum1);

function fixUpdate(update: Update) {
  let fixedUpdate = update;
  let failingRules = getFailingRules(update);

  while (failingRules.length > 0) {
    let rule = failingRules[0];
    fixedUpdate = fixedUpdate.map((page) => {
      if (page === rule[0]) {
        return rule[1];
      } else if (page === rule[1]) {
        return rule[0];
      } else {
        return page;
      }
    });
    failingRules = getFailingRules(fixedUpdate);
  }

  return fixedUpdate;
}

let middleSum2 = 0;
for (const update of updates) {
  const failingRules = getFailingRules(update);
  if (failingRules.length > 0) {
    const fixed = fixUpdate(update);
    middleSum2 += fixed[Math.floor(update.length / 2)];
  }
}
console.log(middleSum2);
