import fs from 'node:fs/promises';

function isInvalid(num: number) {
  const asStr = num.toString();

  const len = asStr.length;
  size: for (let patternSize = 1; patternSize <= len / 2; patternSize++) {
    if (len % patternSize !== 0) {
      continue;
    }

    for (let j = patternSize; j < len; j += patternSize) {
      for (let k = 0; k < patternSize; k++) {
        if (asStr[k] !== asStr[j + k]) {
          continue size;
        }
      }
    }
    return true;
  }
  return false;
}

export function solve(input: string) {
  const data: unknown[] = [];

  const ranges = input
    .split('\n')[0]
    .split(',')
    .map(
      (range) =>
        range.split('-').map((num) => Number(num)) as [
          start: number,
          end: number,
        ],
    );

  let total = 0;

  for (const [start, end] of ranges) {
    const invalid: number[] = [];
    for (let num = start; num <= end; num++) {
      if (isInvalid(num)) {
        invalid.push(num);
        total += num;
      }
    }
    data.push({ range: `${start}-${end}`, invalid });
  }

  console.table(data);

  return total;
}

if (process.env.NODE_ENV !== 'test') {
  const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
  console.log(solve(input));
}
