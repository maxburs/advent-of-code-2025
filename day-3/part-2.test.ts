import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { solve } from './part-2.ts';

test('example', async () => {
  assert.equal(
    solve(12, await fs.readFile(import.meta.dirname + '/example.txt', 'utf8')),
    3121910778619,
  );
});

function _test(input: string, length: number, solution: number) {
  test(input, () => {
    assert.deepEqual(solve(length, input), solution);
  });
}

_test('987654321111111', 4, 9876);
_test('811111111111119', 12, 811111111119);
_test('234234234234278', 12, 434234234278);
_test('818181911112111', 12, 888911112111);
_test('81119', 3, 819);
_test(
  '5373475263753258336423442254746263332334232217334431337464342726873125223932312363675175435324343745',
  12,
  977554343745,
);
