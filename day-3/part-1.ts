import fs from 'node:fs/promises';

function maximumJoltage(bank: string) {
  let digit1 = Number(bank[0]);
  let digit2 = Number(bank[1]);

  let i = 1;
  while (i < bank.length) {
    const asNum = Number(bank[i]);

    if (asNum > digit1 && i + 1 < bank.length) {
      digit1 = asNum;
      digit2 = Number(bank[i + 1]);
      i += 1;
      continue;
    }
    if (asNum > digit2) {
      digit2 = asNum;
    }
    i++;
  }

  // const digit1 = Math.max(...bank.slice(0, -1).split('').map(n => Number(n)));
  // const digit1Index = bank.indexOf(digit1.toString());
  // const digit2 = Math.max(...bank.slice(digit1Index + 1).split('').map(n => Number(n)));
  return Number(digit1.toString() + digit2.toString());
}

export function solve(input: string) {
  const table: unknown[] = [];

  const batteries = input.split('\n').filter(Boolean);
  let total_joltage = 0;

  for (const bank of batteries) {
    const joltage = maximumJoltage(bank);
    table.push({ bank, joltage });
    total_joltage += joltage;
  }

  console.table(table);

  return total_joltage;
}

if (process.env.NODE_ENV !== 'test') {
  const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
  console.log(solve(input));
}
