import fs from 'node:fs/promises';

// function parse(input: string): {
//   values: readonly number[];
//   operators: readonly number[];
// } {
//   const lines = input.split('\n').filter(Boolean);
//   const operators = lines
//     .at(-1)!
//     .matchAll(/\*|\+/g)
//     .map((m) => m[0])
//     .toArray();

//   console.log({ values, operators });

//   // return { values, operators };
// }

export function solve(input: string) {
  const lines = input.split('\n').filter(Boolean);

  let sum = 0;

  for (const match of lines.at(-1)!.matchAll(/(?:\*|\+)\s+(?!\*|\+)/g)) {
    const operator = match[0].trim();
    console.group(`${match.index}-${match.index + match[0].length}: ${operator}`);
    let val: undefined | number;
    for (
      let valueColumn = match.index;
      valueColumn < match.index + match[0].length;
      valueColumn++
    ) {
      let valueChars = '';
      for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
        valueChars += lines[lineIndex][valueColumn];
      }
      valueChars = valueChars.trim();
      const val2 = parseInt(valueChars);
      console.log(val2);
      if (val === undefined) {
        val = val2;
      } else {
        switch (operator) {
          case '*':
            val *= val2;
            break;
          case '+':
            val += val2;
            break;
          default:
            throw new Error(`Unexpected operator: ${operator}`);
        }
      }
    }
    console.groupEnd();
    sum += val!;
  }

  return sum;
}
