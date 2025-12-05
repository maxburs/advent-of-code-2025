import fs from 'node:fs/promises';

export function solve(input: string) {
}

if (process.env.NODE_ENV !== 'test') {
  const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
  console.log(solve(input));
}
