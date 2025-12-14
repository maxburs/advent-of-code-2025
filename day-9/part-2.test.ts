import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { solve } from './part-2.ts';

// test('example', async () => {
//   assert.equal(
//     solve(await fs.readFile(import.meta.dirname + '/example.txt', 'utf8')),
//     24,
//   );
// });

function _test(
  input: string,
  { max_area, right_turns }: { max_area: number; right_turns: number },
) {
  test(input, async () => {
    assert.deepEqual(solve(input), { max_area, right_turns });
  });
}

_test(
  `5,5
  7,5
  7,3
  9,3,
  9,5,
  11,5,
  11,7,
  9,7,
  9,9,
  7,9
  7,7,
  5,7`,
  { max_area: 9, right_turns: 8 },
);
