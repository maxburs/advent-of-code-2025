import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { solve } from './part-1.ts';

// test('example', async () => {
//   assert.equal(
//     solve(await fs.readFile(import.meta.dirname + '/example.txt', 'utf8')),
//     357,
//   );
// });

function _test(input: string, solution: number) {
  test(input, () => {
    assert.deepEqual(solve(input), solution);
  });
}

// _test('06', 6);
// _test('89', 89);
// _test('890', 90);
// _test('990', 99);
// _test('199', 99);
// _test('909', 99);
// _test('8019', 89);
// _test('0099', 99);
// _test('0089', 89);
// _test('12345', 45);
// _test('54321', 54);
// _test('123545', 55);
// _test('543921', 92);
// _test('987654321111111', 98);
// _test('811111111111119', 89);
// _test('234234234234278', 78)
// _test('818181911112111', 92)
// _test('111111989', 99);
// _test('989111111', 99);
_test('6789', 89)
