import { getInput } from "./_utils.mts";

const input = await getInput(import.meta);

type SimpleSlot = number | null;
type AdvancedSlot = { id: number | null; size: number };

function simpleDecompress(input: string) {
  let decompressed: SimpleSlot[] = [];

  let id = 0;
  for (let i = 0; i < input.length; i++) {
    let len = Number(input[i]);
    let isData = i % 2 == 0;

    if (isData) {
      for (let j = 0; j < len; j++) {
        decompressed.push(id);
      }
      id += 1;
    } else {
      for (let j = 0; j < len; j++) {
        decompressed.push(null);
      }
    }
  }

  return decompressed;
}

function simpleDefrag(decompressed: SimpleSlot[]) {
  let endIdx = decompressed.length - 1;
  let startIdx = 0;
  for (; endIdx >= 0; endIdx--) {
    let end = decompressed[endIdx];
    if (end !== null) {
      for (; startIdx < decompressed.length; startIdx++) {
        let start = decompressed[startIdx];
        if (endIdx < startIdx) break;
        if (start === null) {
          decompressed[endIdx] = start;
          decompressed[startIdx] = end;
          break;
        }
      }
    }
  }
}

function checksum(decompressed: SimpleSlot[]) {
  return decompressed.reduce(
    (acc, item, index) =>
      item !== null && acc !== null ? acc + item * index : acc,
    0
  );
}

function advancedDecompress(input: string) {
  let decompressed: AdvancedSlot[] = [];

  let id = 0;
  for (let i = 0; i < input.length; i++) {
    let len = Number(input[i]);
    let isData = i % 2 == 0;

    if (isData) {
      decompressed.push({ id, size: len });
      id += 1;
    } else {
      if (len > 0) {
        decompressed.push({ id: null, size: len });
      }
    }
  }

  return decompressed;
}

function compact(decompressed: AdvancedSlot[]) {
  let i = 0;
  while (true) {
    if (i > decompressed.length - 2) break;

    let current = decompressed[i];
    let next = decompressed[i + 1];
    if (current?.id === null && next?.id === null) {
      decompressed.splice(i, 2, {
        id: null,
        size: current.size + next.size,
      });
    }

    i++;
  }
}

function advancedDefrag(decompressed: AdvancedSlot[]) {
  let currentId =
    decompressed[decompressed.length - 1].id ??
    decompressed[decompressed.length - 2].id;
  if (currentId === null) {
    throw new Error("Impossible");
  }

  while (currentId >= 0) {
    let endIdx = decompressed.findIndex((item) => item.id === currentId);
    let end = decompressed[endIdx];

    const freeIdx = decompressed.findIndex(
      (item, idx) => idx < endIdx && item.id === null && item.size >= end.size
    );
    let free = decompressed[freeIdx];

    if (free) {
      let sizeDiff = free.size - end.size;
      if (sizeDiff >= 0) {
        let next = decompressed[freeIdx + 1];

        if (sizeDiff === 0) {
          decompressed.splice(freeIdx, 1, { ...end });
        } else if (next?.id === null) {
          decompressed.splice(
            freeIdx,
            2,
            { ...end },
            { id: null, size: sizeDiff + next.size }
          );
        } else {
          decompressed.splice(
            freeIdx,
            1,
            { ...end },
            { id: null, size: sizeDiff }
          );
        }

        end.id = null;
      }
    }

    compact(decompressed);

    currentId -= 1;
  }
}

function advancedToSimple(input: AdvancedSlot[]): SimpleSlot[] {
  const simple: SimpleSlot[] = [];

  for (let item of input) {
    for (let j = 0; j < item.size; j++) {
      simple.push(item.id);
    }
  }

  return simple;
}

function part1() {
  let decompressed = simpleDecompress(input);
  simpleDefrag(decompressed);
  console.log(checksum(decompressed));
}

part1();

function part2() {
  let decompressed = advancedDecompress(input);
  advancedDefrag(decompressed);
  console.log(checksum(advancedToSimple(decompressed)));
}

part2();
