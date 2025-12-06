import fs from 'node:fs/promises';

export function solve(input: string) {
  const [start, end] = input.split('\n\n');
  const ranges = start.split('\n').map((r) => {
    const [start, end] = r.split('-');
    return { start: Number(start), end: Number(end) };
  });
  const ingredients = end.split('\n').map((n) => Number(n));

  let fresh = 0;

  for (const ingredient of ingredients) {
    if (ranges.some((r) => r.start <= ingredient && ingredient <= r.end)) {
      fresh++;
    }
  }

  return fresh;
}
