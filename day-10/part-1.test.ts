import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { solve } from './part-1.ts';

test('example', async () => {
  assert.equal(
    solve(await fs.readFile(import.meta.dirname + '/example.txt', 'utf8')),
    7,
  );
});

function _test(input: string, solution: number) {
  test(input, async () => {
    assert.deepEqual(solve(input), solution);
  });
}

// _test('L1000', 10);
