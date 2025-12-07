export function solve(input: string) {
  const lines: readonly (string | number)[][] = input
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split(''));

  lines[1][input.indexOf('S')] = 1;

  function addValue(lineIndex: number, columnIndex: number, value: number) {
    const line = lines[lineIndex];
    const prev = line[columnIndex];

    if (typeof prev === 'number') {
      line[columnIndex] = prev + value;
    }
    switch (prev) {
      case '.':
        line[columnIndex] = value;
        break;
      case '^':
        addValue(lineIndex, columnIndex - 1, value);
        addValue(lineIndex, columnIndex + 1, value);
        break;
    }
  }

  for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
    for (let columnIndex = 0; columnIndex < lines[0].length; columnIndex++) {
      const above = lines[lineIndex - 1][columnIndex];
      if (typeof above !== 'number') {
        continue;
      }
      addValue(lineIndex, columnIndex, above);
    }

    console.log(lines.map((r) => r.join('')).join('\n'));
    console.log(' ---');
  }

  return lines.at(-1)!.reduce<number>((acc, v) => {
    if (typeof v === 'number') {
      acc += v;
    }
    return acc;
  }, 0);
}
