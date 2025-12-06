import fs from 'node:fs/promises';

export function solve(input: string) {
  const [start, _end] = input.split('\n\n');
  const ranges = start.split('\n').map((r) => {
    const [start, end] = r.split('-');
    return { start: Number(start), end: Number(end) };
  });

  ranges.sort((a, b) => a.start - b.start);
  
  let fresh = 0;
  let lastEnd = -1;

  for (const range of ranges) {
    const start =  Math.max(lastEnd + 1, range.start);
    if (start <= range.end) {
      // console.log(`count: ${start}-${range.end} (${range.end - start + 1})`)
      fresh += range.end - start + 1;
    }
  
    if (range.end > lastEnd) {
      lastEnd = range.end;
    }
  }

  return fresh;
}
