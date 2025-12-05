import fs from 'node:fs/promises';

export function count(position: number, input: string) {
  let zeroCount = 0;

  const data: unknown[] = [];

  for (const line of input.split('\n')) {
    const direction = line[0] as 'R' | 'L';
    let offset = Number(line.slice(1));

    if (offset === 0) {
      continue;
    }

    const zeroStart = position === 0;

    // let _zeroCount = Math.floor(offset / 100);

    // offset = offset % 100;

    if (direction === 'L') {
      offset = -offset;
    }

    position += offset;
    let _zeroCount = 0;
    if (position < 0) {
      _zeroCount += Math.floor(Math.abs(position) / 100);
      position = position % 100;
      if (position !== 0) {
        position += 100;
      }
      if (!zeroStart) {
        _zeroCount++;
      }
    } else if (position >= 100) {
      _zeroCount += Math.floor(position / 100);
      position = position % 100;
    } else if (position === 0) {
      _zeroCount++;
    }

    // Remove absolute zero
    if (position === 0) {
      position = 0;
    }

    zeroCount += _zeroCount;

    data.push({
      // line,
      offset,
      position,
      _zeroCount,
      zeroCount,
    });
    // console.log(
    //   'line: ',
    //   line,
    //   ' offset: ',
    //   offset,
    //   ' _zeroCount: ',
    //   _zeroCount,
    //   ' position: ',
    //   position,
    //   ' zeroCount: ',
    //   zeroCount,
    // );
  }

  console.table(data);

  return { position, zeroCount };
}

if (process.env.NODE_ENV !== 'test') {
  const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
  console.log(count(50, input));
}
