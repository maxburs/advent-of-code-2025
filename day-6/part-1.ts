import fs from 'node:fs/promises';

export function solve(input: string) {
  const lines = input.split('\n').filter(Boolean);
  const values = lines.slice(0, -1).map((line) =>
    line
      .matchAll(/[^\s]+/g)
      .map((m) => m[0])
      .toArray(),
  );
  const operators = lines
    .at(-1)!
    .matchAll(/\*|\+/g)
    .map((m) => m[0])
    .toArray();

  console.log({ values, operators });

  let sum = 0;

  for (let columnIndex = 0; columnIndex < values[0].length; columnIndex++) {
    const operator = operators[columnIndex];
    let val = parseInt(values[0][columnIndex], 10);
    for (const line of values.slice(1)) {
      const val2 = parseInt(line[columnIndex], 10);
      switch (operator) {
        case '*':
          val *= val2;
          break;
        case '+':
          val += val2;
          break;
        default:
          throw new Error(
            `Unexpected operator: ${operator}. ColumnIndex ${columnIndex}, line: ${line}`,
          );
      }
    }
    sum += val;
  }

  return sum;
}
