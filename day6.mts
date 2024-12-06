import fs from "node:fs/promises";

const contents = await fs.readFile("./input/day6.txt", "utf-8");

const OBSTRUCTION = "#";
const UP = "^";
const RIGHT = ">";
const DOWN = "V";
const LEFT = "<";

let map: string[][] = [];
let guard: {
  x: number;
  y: number;
  facing: typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT;
};

const lines = contents.split(/\r?\n/).map((line) => line.split(""));
const width = lines[0].length;
const height = lines.length;

function generateMap() {
  const lines = contents.split(/\r?\n/).map((line) => line.split(""));
  map = [];
  for (let y = 0; y < height; y++) {
    const chars = lines[y];
    for (let x = 0; x < width; x++) {
      if (chars[x] === UP) {
        guard = { x, y, facing: UP };
      }
    }
    map.push(chars);
  }
}

function getNextCoords() {
  let nextX: number, nextY: number;
  if (guard.facing === UP) {
    nextX = guard.x;
    nextY = guard.y - 1;
  } else if (guard.facing === RIGHT) {
    nextX = guard.x + 1;
    nextY = guard.y;
  } else if (guard.facing === DOWN) {
    nextX = guard.x;
    nextY = guard.y + 1;
  } else {
    nextX = guard.x - 1;
    nextY = guard.y;
  }
  if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
    return null;
  }
  return [nextX, nextY] as const;
}

function tick() {
  let nextCoords = getNextCoords();
  if (!nextCoords) {
    return { done: true, isLoop: false };
  }
  let [nextX, nextY] = nextCoords;
  let isLoop = map[nextY][nextX] === guard.facing;
  if (isLoop) {
    return { done: true, isLoop: true };
  }

  let hasObstacle = map[nextY][nextX] === OBSTRUCTION;
  if (hasObstacle) {
    if (guard.facing === UP) {
      guard.facing = RIGHT;
    } else if (guard.facing === RIGHT) {
      guard.facing = DOWN;
    } else if (guard.facing === DOWN) {
      guard.facing = LEFT;
    } else if (guard.facing === LEFT) {
      guard.facing = UP;
    }
  } else {
    guard.x = nextX;
    guard.y = nextY;
  }
  map[guard.y][guard.x] = guard.facing;
  return { done: false, isLoop: false };
}

function printMap() {
  console.log("========================");
  for (let line of map) {
    console.log(line.join(""));
  }
}

function part1() {
  generateMap();
  while (!tick().done) {}
  // printMap();

  const count1 = map.reduce((acc, line) => {
    return acc + Array.from(line.join("").matchAll(/[\^|V|<|>]/g)).length;
  }, 0);
  console.log(count1);
}

part1();

function part2() {
  let options = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      generateMap();
      if (map[y][x] === ".") {
        map[y][x] = "#";
        let done, isLoop;
        let iterations = 0;
        do {
          iterations += 1;
          ({ done, isLoop } = tick());
          if (iterations > 1000000) {
            isLoop = true;
            done = true;
          }
        } while (!done);
        if (isLoop) {
          options += 1;
        }
        // printMap();
      }
    }
  }
  console.log(options);
}

part2();
