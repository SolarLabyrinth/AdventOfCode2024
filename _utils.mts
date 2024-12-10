import fs from "node:fs/promises";

export async function getInput(meta: ImportMeta) {
  const day = /^.*(day\d+)/.exec(meta.filename)?.[1];
  const contents = await fs.readFile(`./input/${day}.txt`, "utf-8");
  return contents;
}
