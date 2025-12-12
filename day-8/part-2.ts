interface Box {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  circuit: number;
}

function calc_distance(a: Box, b: Box): number {
  return Math.sqrt(
    Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 2 + (a.z - b.z) ** 2,
  );
}

export function solve_slow(input: string) {
  const boxes: Box[] = input
    .matchAll(/\d+,\d+,\d+/g)
    .map((match, i) => {
      const [x, y, z] = match[0].split(',').map((n) => Number(n));
      return { circuit: i, x, y, z };
    })
    .toArray();

  const connections: {
    distance: number;
    boxAIndex: number;
    boxBIndex: number;
  }[] = [];

  for (let boxAIndex = 0; boxAIndex < boxes.length; boxAIndex++) {
    for (let boxBIndex = boxAIndex + 1; boxBIndex < boxes.length; boxBIndex++) {
      connections.push({
        distance: calc_distance(boxes[boxAIndex], boxes[boxBIndex]),
        boxAIndex,
        boxBIndex,
      });
    }
  }

  connections.sort((a, b) => a.distance - b.distance);

  const circuits: readonly { readonly boxes: number[] }[] = boxes.map(
    (_, i) => ({ boxes: [i] }),
  );

  let circuitsCount = circuits.length;

  function connect(boxAIndex: number, boxBIndex: number) {
    const circuitA = boxes[boxAIndex].circuit;
    const circuitB = boxes[boxBIndex].circuit;
    if (circuitA === circuitB) {
      return;
    }
    const circuitBBoxes = circuits[circuitB].boxes;
    for (let boxIndex of circuitBBoxes) {
      boxes[boxIndex].circuit = circuitA;
    }
    circuits[circuitA].boxes.push(...circuitBBoxes);
    circuitBBoxes.length = 0;
    circuitsCount--;
  }

  console.log(connections);

  let connectionsUsed = 0;
  for (const { boxAIndex, boxBIndex } of connections) {
    connect(boxAIndex!, boxBIndex!);
    connectionsUsed++;
    if (circuitsCount === 1) {
      break;
    }
  }

  console.table(boxes);
  console.table(circuits);
  console.log(
    `circuits count: ${circuits.reduce((acc, c) => {
      if (c.boxes.length !== 0) {
        acc += 1;
      }
      return acc;
    }, 0)}`,
  );
  const sizes = circuits
    .toSorted((a, b) => b.boxes.length - a.boxes.length)
    .map((c) => c.boxes.length);
  console.log(`sizes: `, sizes.join(', '));
  console.log(
    `sizes 2: `,
    Object.values(Object.groupBy(boxes, (item) => item.circuit))
      .sort((a, b) => b!.length - a!.length)
      .map((c) => c!.length),
  );

  const lastConnectionUsed = connections[connectionsUsed - 1];
  return (
    boxes[lastConnectionUsed.boxAIndex].x *
    boxes[lastConnectionUsed.boxBIndex].x
  );
}

export function solve(input: string) {
  return solve_slow(input);
}
