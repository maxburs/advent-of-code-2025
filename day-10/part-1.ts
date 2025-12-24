type Button = readonly number[];

interface Machine {
  readonly lights: string;
  readonly buttons: readonly Button[];
}

function parse_input(input: string): readonly Machine[] {
  const lines = input.split('\n').filter(Boolean);

  return lines.map((line) => {
    const parts = line.split(' ');
    const lights = parts[0].slice(1, -1);
    const buttons: Button[] = parts.slice(1, -1).map((str) =>
      str
        .slice(1, -1)
        .split(',')
        .map((s) => Number(s)),
    );
    return { lights, buttons };
  });
}

function moves_required(machine: Machine): number {
  const lights_to_presses = new Map<string, number>();

  function add_lights(lights: string, presses: number) {
    const prev_presses = lights_to_presses.get(lights);
    if (prev_presses !== undefined && prev_presses <= presses) {
      return;
    }
    lights_to_presses.set(lights, presses);

    if (lights === machine.lights) {
      return;
    }
    for (const button of machine.buttons) {
      const new_lights = lights.split('');
      for (const n of button) {
        new_lights[n] = new_lights[n] === '.' ? '#' : '.';
      }
      add_lights(new_lights.join(''), presses + 1);
    }
  }

  add_lights('.'.repeat(machine.lights.length), 0);

  const moves = lights_to_presses.get(machine.lights);

  if (moves === undefined) {
    throw new Error(`Failed to path`);
  }

  console.log('moves: ', moves);

  return moves;
}

export function solve(input: string): number {
  const machines = parse_input(input);

  let total = 0;

  for (const m of machines) {
    total += moves_required(m);
  }

  return total;
}
