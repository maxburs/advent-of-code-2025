interface Coordinate {
  x: number;
  y: number;
}

function solve_slow(input: readonly Coordinate[]): number {
  let max_area = 0;
  let max_area_coordinates!: [a: Coordinate, b: Coordinate];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const a = input[i];
      const b = input[j];
      const area = Math.abs((a.x - b.x + 1) * (a.y - b.y + 1));
      if (area > max_area) {
        max_area = area;
        max_area_coordinates = [a, b];
      }
    }
  }
  console.log(max_area_coordinates);

  return max_area;
}

export function solve(input: string) {
  const positions = input
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [x, y] = line.split(',');
      return { x: Number(x), y: Number(y) };
    });

  return solve_slow(positions);
}
