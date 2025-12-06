import fs from 'node:fs/promises';

const digitCount = 12;

function maximumJoltage_fast(digitCount: number, _bank: string) {
  const bank: readonly number[] = _bank.split('').map((n) => Number(n));
  const digits = bank.slice(0, digitCount).map((_n, i) => i);

  bankItems: for (let i = 1; i < bank.length; i++) {
    const prospect = bank[i];
    for (
      let digitIndex = digitCount - Math.min(digitCount, bank.length - i);
      digitIndex < digitCount;
      digitIndex++
    ) {
      const digit = digits[digitIndex];
      if (digit === i) {
        break;
      }
      if (prospect > bank[digit]) {
        for (let k = 0; k < digitCount - digitIndex; k++) {
          digits[k + digitIndex] = i + k;
        }
        continue bankItems;
      }
    }
  }

  return Number(digits.map((d) => bank[d]).join(''));
}

function maximumJoltage_slow(digitCount: number, _bank: string) {
  const bank: readonly number[] = _bank.split('').map((n) => Number(n));
  let lastIndex = -1;
  const digits: number[] = [];

  for (let i = 0; i < digitCount; i++) {
    const digit = Math.max(
      ...bank.slice(lastIndex + 1, bank.length - digitCount + i + 1),
    );
    lastIndex = bank.indexOf(digit, lastIndex + 1);
    digits.push(digit);
  }

  return Number(digits.join(''));
}

export function solve(digitCount: number, input: string) {
  const table: unknown[] = [];

  const batteries = input.split('\n').filter(Boolean);
  let total_joltage = 0;

  for (const bank of batteries) {
    const joltage = maximumJoltage_fast(digitCount, bank);
    table.push({ bank, joltage });
    total_joltage += joltage;
  }

  console.table(table);

  return total_joltage;
}

if (process.env.NODE_ENV !== 'test') {
  const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
  console.log(solve(12, input));
}
