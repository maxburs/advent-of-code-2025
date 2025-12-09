import fs from 'node:fs/promises';

function isInvalid(num: number) {
  const asStr = num.toString();

  const len = asStr.length;
  if (len % 2 === 0 && asStr.slice(0, len / 2) === asStr.slice(len / 2)) {
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
    for (let num = start; num <= end; num++) {
      if (isInvalid(num)) {
        data.push({ num });
        total += num;
      }
    }
  }

  console.table(data);

  return total;
}

// if (process.env.NODE_ENV !== 'test') {
//   const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
//   // console.log(solve(input));
// }
