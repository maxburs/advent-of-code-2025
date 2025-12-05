import fs from 'fs/promises';

const input = await fs.readFile(process.argv[2], 'utf-8');

let position = 50;
let startingPositionCount = 0;

for (const line of input.split('\n')) {
  const direction = line[0] as 'R' | 'L';
  let offset = Number(line.slice(1));
  if (direction === 'L') {
    offset = -offset;
  }
  position += offset;
  position = position % 100;
  if (position < 0) {
    position += 100;
  }
  console.log('line: ', line, ' offset: ', offset, ' position: ', position);
  if (position % 100 === 0) {
    startingPositionCount++;
  }
}

console.log({
  position,
  startingPositionCount,
})
