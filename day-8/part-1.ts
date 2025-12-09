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

export function solve_slow(input: string, connectionsCount: number) {
  const boxes: Box[] = input
    .matchAll(/\d+,\d+,\d+/g)
    .map((match, i) => {
      const [x, y, z] = match[0].split(',').map((n) => Number(n));
      return { x, y, z, circuit: i };
    })
    .toArray();

  const circuits: readonly { readonly boxes: number[] }[] = boxes.map(
    (_, i) => ({ boxes: [i] }),
  );
  const connections = new Set<string>();

  function connect(boxAIndex: number, boxBIndex: number) {
    connections.add(`${boxAIndex},${boxBIndex}`);
    const circuitA = boxes[boxAIndex].circuit;
    const circuitB = boxes[boxBIndex].circuit;
    const boxA = boxes[boxAIndex];
    const boxB = boxes[boxBIndex];
    console.log(
      `connecting: ${boxAIndex} (${boxA.x},${boxA.y},${boxA.z}) <-> ${boxBIndex} (${boxB.x},${boxB.y},${boxB.z})`,
    );
    circuits[circuitA].boxes.push(...circuits[circuitB].boxes);
    circuits[circuitB].boxes.length = 0;
    boxB.circuit = boxAIndex;
  }

  for (let k = 0; k < connectionsCount; k++) {
    let min_distance = Infinity;
    let boxAIndex: undefined | number;
    let boxBIndex: undefined | number;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const boxA = boxes[i];
        const boxB = boxes[j];
        if (boxA.circuit !== boxB.circuit) {
          const distance = calc_distance(boxA, boxB);
          if (distance < min_distance) {
            min_distance = distance;
            boxAIndex = i;
            boxBIndex = j;
          }
        }
      }
    }
    connect(boxAIndex!, boxBIndex!);
  }

  console.log(boxes);
  console.log(circuits);

  return circuits
    .toSorted((a, b) => a.boxes.length - b.boxes.length)
    .slice(-3)
    .reduce<number>((acc, n) => acc * n.boxes.length, 1);
}

export function solve(input: string, connectionsCount = 1000) {
  return solve_slow(input, connectionsCount);
}
