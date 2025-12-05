import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { count } from './part-2.ts';

test('example', async () => {
  assert.equal(
    count(50, await fs.readFile(import.meta.dirname + '/example.txt', 'utf8'))
      .zeroCount,
    6,
  );
});

function _test(
  name: string,
  start: number,
  moves: string,
  end: number,
  zeroCount: number,
) {
  test(name, async () => {
    assert.deepEqual(count(start, moves), { position: end, zeroCount });
  });
}

_test('move example', 50, 'L1000', 50, 10);
_test('move ends on zero - left', 50, 'L50', 0, 1);
_test('move ends on zero - right', 50, 'R50', 0, 1);
_test('left from zero', 0, 'L86', 14, 0);
_test('right from zero', 0, 'R86', 86, 0);
_test('full turn right', 0, 'R100', 0, 1);
_test('full turn left', 0, 'L100', 0, 1);
_test('many left turns', 10, 'L837', 73, 9);

_test('1 left rotation ending on zero', 50, 'L150', 0, 2);
_test('1 right rotation ending on zero', 50, 'R150', 0, 2);
_test('2 left rotations ending on zero', 50, 'L250', 0, 3);
_test('2 right rotations ending on zero', 50, 'R250', 0, 3);
