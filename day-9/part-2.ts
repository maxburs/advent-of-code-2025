interface Coordinate {
  x: number;
  y: number;
}

function c_to_s(c: Coordinate) {
  return `(${c.x},${c.y})`;
}

function between(
  target: Coordinate,
  a: Coordinate,
  b: Coordinate,
  dimension: 'x' | 'y',
) {
  return (
    (target[dimension] <= a[dimension] && target[dimension] >= b[dimension]) ||
    (target[dimension] <= b[dimension] && target[dimension] >= a[dimension])
  );
}

function crosses(
  a1: Coordinate,
  a2: Coordinate,
  _b1: Coordinate,
  b2: Coordinate,
) {
  const b1 = { ..._b1 };
  if (b1.x < b2.x) {
    b1.x++;
  } else if (b1.x > b2.x) {
    b1.x--;
  } else if (b1.y < b2.y) {
    b1.y++;
  } else if (b1.y > b2.y) {
    b1.y--;
  } else {
    throw new Error(`Zero length line: ${c_to_s(_b1)}, ${c_to_s(b2)}`);
  }

  return (
    (between(a1, b1, b2, 'x') &&
      between(a2, b1, b2, 'x') &&
      between(b1, a1, a2, 'y') &&
      between(b2, a1, a2, 'y')) ||
    (between(b1, a1, a2, 'x') &&
      between(b2, a1, a2, 'x') &&
      between(a1, b1, b2, 'y') &&
      between(a2, b1, b2, 'y'))
  );
}

function _solve(input: readonly Coordinate[]) {
  let max_x = 0;
  let min_x = Infinity;
  let max_y = 0;
  let min_y = Infinity;
  for (const c of input) {
    if (c.x > max_x) {
      max_x = c.x;
    }
    if (c.x < min_x) {
      min_x = c.x;
    }
    if (c.y > max_y) {
      max_y = c.y;
    }
    if (c.y < min_y) {
      min_y = c.y;
    }
  }

  console.log({ min_x, max_x, min_y, max_y });

  const floor = new Array(max_y - min_y + 1)
    .fill(null)
    .map(() => new Uint8Array(max_x - min_x + 1).fill(0));

  function mark(x: number, y: number, value: 0 | 1 | 2) {
    floor[y - min_y][x - min_x] = value;
  }

  function read(x: number, y: number) {
    return floor[y - min_y][x - min_x] as 0 | 1 | 2;
  }

  function connect(a: Coordinate, b: Coordinate) {
    let x = a.x;
    let y = a.y;

    while (true) {
      if (x < b.x) {
        x++;
      } else if (x > b.x) {
        x--;
      } else if (y < b.y) {
        y++;
      } else if (y > b.y) {
        y--;
      }
      if (x === b.x && y === b.y) {
        break;
      }
      mark(x, y, 2);
    }
  }

  for (let i = 0; i < input.length - 1; i++) {
    const a = input[i];
    const b = input[i + 1];
    mark(a.x, a.y, 1);
    connect(a, b);
  }
  {
    const c = input.at(-1)!;
    mark(c.x, c.y, 1);
    connect(c, input[0]);
  }

  let max_area = 0;
  let max_area_coordinates!: [a: Coordinate, b: Coordinate];

  function filled(a: Coordinate, b: Coordinate) {
    const min_x = Math.min(a.x, b.x);
    const min_y = Math.min(a.y, b.y);
    const max_x = Math.max(a.x, b.x);
    const max_y = Math.max(a.y, b.y);

    for (let y = min_y; y <= max_y; y++) {
      for (let x = min_x; x <= max_x; x++) {
        if (read(x, y) === 0) {
          return false;
        }
      }
    }
    return true;
  }

  function check(a_index: number, b_index: number) {
    const a = input.at(a_index)!;
    const b = input.at(b_index)!;
    const area = Math.abs((a.x - b.x + 1) * (a.y - b.y + 1));
    if (area > max_area && filled(a, b)) {
      max_area = area;
      max_area_coordinates = [a, b];
    }
  }

  for (let i = 0; i < input.length - 1 - 2; i++) {
    for (let j = i + 1; j < input.length; j++) {
      check(i, j);
    }
  }
  check(-1, 0);

  console.log('max_area_coordinates', max_area_coordinates);

  return { max_area, max_area_coordinates };
}

function print_input(input: readonly Coordinate[]) {
  let max_x = 0;
  let min_x = Infinity;
  let max_y = 0;
  let min_y = Infinity;

  for (const c of input) {
    if (c.x > max_x) {
      max_x = c.x;
    }
    if (c.x < min_x) {
      min_x = c.x;
    }
    if (c.y > max_y) {
      max_y = c.y;
    }
    if (c.y < min_y) {
      min_y = c.y;
    }
  }

  console.log({ min_x, max_x, min_y, max_y });

  const floor = new Array(max_y - min_y + 3)
    .fill(null)
    .map(() => new Uint8Array(max_x - min_x + 5).fill(0));

  function mark(c: Coordinate, value: 0 | 1 | 2) {
    floor[c.y - min_y + 1][c.x - min_x + 2] = value;
  }

  function connect(a: Coordinate, b: Coordinate) {
    let x = a.x;
    let y = a.y;

    while (true) {
      if (x < b.x) {
        x++;
      } else if (x > b.x) {
        x--;
      } else if (y < b.y) {
        y++;
      } else if (y > b.y) {
        y--;
      }
      if (x === b.x && y === b.y) {
        break;
      }
      mark({ x, y }, 2);
    }
  }

  for (let i = 0; i < input.length - 1; i++) {
    const a = input[i];
    const b = input[i + 1];
    mark(a, 1);
    connect(a, b);
  }

  mark(input.at(-1)!, 1);
  connect(input.at(-1)!, input[0]);

  for (const row of floor) {
    for (const tile of row) {
      let char: string;
      switch (tile) {
        case 0:
          char = '.';
          break;
        case 1:
          char = '#';
          break;
        case 2:
          char = 'X';
          break;
        default:
          throw new Error(`Unexpected number: ${tile}`);
      }
      process.stdout.write(char);
    }
    process.stdout.write('\n');
  }
}

function assert_never_cross(input: readonly Coordinate[]) {
  function check(
    a1: Coordinate,
    a2: Coordinate,
    b1: Coordinate,
    b2: Coordinate,
  ) {
    if (crosses(a1, a2, b1, b2)) {
      throw new Error(
        `(${a1.x},${a1.y})->(${a2.x},${a2.y}) crosses (${b1.x},${b1.y})->(${b2.x},${b2.y})`,
      );
    }
  }
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      check(input[i], input[i + 1], input[j], input[j + 1]);
    }
  }
  check(input.at(-2)!, input.at(-1)!, input[0], input[1]);
}

export function solve(input: string): number {
  const positions = input
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [x, y] = line.split(',');
      return { x: Number(x), y: Number(y) };
    });

  print_input(positions);
  assert_never_cross(positions);
  return _solve(positions).max_area;
}
