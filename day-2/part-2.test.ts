import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { solve } from './part-2.ts';

test('example', async () => {
  assert.equal(
    solve(await fs.readFile(import.meta.dirname + '/example.txt', 'utf8')),
    4174379265,
  );
});

function _test(name: string, input: string, solution: number) {
  test(name, async () => {
    assert.deepEqual(solve(input), solution);
  });
}

// _test('move example', 'L1000', 10);
