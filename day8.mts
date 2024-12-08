import fs from "node:fs/promises";

const day = /^.*(day\d+)/.exec(import.meta.filename)?.[1];
const contents = await fs.readFile(`./input/${day}.txt`, "utf-8");

const map: string[][] = [];
for (const line of contents.split(/\r?\n/)) {
  map.push(line.split(""));
}

const width = map[0].length;
const height = map.length;

type Point = [number, number];

const locations: Record<string, Point[]> = {};
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const freq = map[y][x];
    if (freq !== ".") {
      if (locations[freq]) {
        locations[freq].push([x, y]);
      } else {
        locations[freq] = [[x, y]];
      }
    }
  }
}

(() => {
  let antiNodes: Point[] = [];
  function addNode(x: number, y: number) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      antiNodes.push([x, y]);
      return true;
    } else {
      return false;
    }
  }

  for (const pointsList of Object.values(locations)) {
    const lines: [Point, Point][] = [];

    for (let i = 0; i < pointsList.length; i++) {
      for (let b of pointsList.slice(i + 1)) {
        lines.push([pointsList[i], b]);
      }
    }

    for (let [a, b] of lines) {
      let xDiff = a[0] - b[0];
      let yDiff = a[1] - b[1];

      addNode(a[0] + xDiff, a[1] + yDiff);
      addNode(b[0] - xDiff, b[1] - yDiff);
    }
  }

  const counter = {};
  for (const antiNode of antiNodes) {
    counter[`${antiNode[0]}-${antiNode[1]}`] = true;
  }

  console.log(Object.keys(counter).length);
})();

(() => {
  let antiNodes: Point[] = [];
  function addNode(x: number, y: number) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      antiNodes.push([x, y]);
      return true;
    } else {
      return false;
    }
  }

  for (const pointsList of Object.values(locations)) {
    const lines: [Point, Point][] = [];

    for (let i = 0; i < pointsList.length; i++) {
      for (let b of pointsList.slice(i + 1)) {
        lines.push([pointsList[i], b]);
      }
    }

    for (let [a, b] of lines) {
      let xDiff = a[0] - b[0];
      let yDiff = a[1] - b[1];

      addNode(a[0], a[1]);
      addNode(b[0], b[1]);

      while (addNode(a[0] + xDiff, a[1] + yDiff)) {
        a = [a[0] + xDiff, a[1] + yDiff];
      }
      while (addNode(b[0] - xDiff, b[1] - yDiff)) {
        b = [b[0] - xDiff, b[1] - yDiff];
      }
    }
  }

  const counter = {};
  for (const antiNode of antiNodes) {
    counter[`${antiNode[0]}-${antiNode[1]}`] = true;
  }

  console.log(Object.keys(counter).length);
})();
