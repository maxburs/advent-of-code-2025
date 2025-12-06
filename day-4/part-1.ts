import fs from 'node:fs/promises';

export function solve(input: string) {
  let accessible = 0;
  const diagram = input.split('\n').filter(Boolean);
  const diagramMarked = input.split('\n').filter(Boolean);
  for (let y = 0; y < diagram.length; y++) {
    for (let x = 0; x < diagram[0].length; x++) {
      if (diagram[y][x] === '.') {
        continue;
      }
      let adjacentRollsOfPaper = 0;
      for (let offsetY = -1; offsetY < 2; offsetY++) {
        for (let offsetX = -1; offsetX < 2; offsetX++) {
          if (
            !(offsetX === 0 && offsetY === 0) &&
            diagram[y + offsetY]?.[x + offsetX] === '@'
          ) {
            adjacentRollsOfPaper++;
          }
        }
      }
      if (adjacentRollsOfPaper < 4) {
        const row = diagramMarked[y];
        diagramMarked[y] = row.slice(0, x) + 'x' + row.slice(x + 1);
        accessible++;
      }
    }
  }

  console.log(diagramMarked.join('\n'))

  return accessible;
}
