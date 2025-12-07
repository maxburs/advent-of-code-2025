export function solve(input: string) {
  const lines = input.split('\n').filter(Boolean).map((l) => l.split(''));

  const pendingBeams: { lineIndex: number; columnIndex: number }[] = [
    { lineIndex: 1, columnIndex: input.indexOf('S') },
  ];

  let splitCount = 0;
  let lastLinePrint = -1;

  while (pendingBeams.length !== 0) {
    const { lineIndex, columnIndex } = pendingBeams.pop()!;

    if (lastLinePrint < lineIndex) {
      lastLinePrint = lineIndex;
      console.log('pending beams: ', pendingBeams.length);
      console.log('splitCount: ', splitCount);
      console.log(lines.map((r) => r.join('')).join('\n'));
      console.log(' ---');
    }

    if (
      columnIndex < 0 ||
      columnIndex >= lines[0].length ||
      lineIndex >= lines.length
    ) {
      continue;
    }
    const line = lines[lineIndex];
    switch (line[columnIndex]) {
      case '^':
        splitCount++;
        // Infinite loop: what should happen if a splitter is next to another splitter?
        pendingBeams.push(
          { lineIndex, columnIndex: columnIndex - 1 },
          { lineIndex, columnIndex: columnIndex + 1 },
        );
        break;
      case '.':
        line[columnIndex] = '|';
        pendingBeams.unshift({ lineIndex: lineIndex + 1, columnIndex });
        break;
      case '|':
        break;
      default:
        throw new Error(`Unexpected character: ${line[columnIndex]}`);
    }
  }

  return splitCount;
}
