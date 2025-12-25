type Button = readonly number[];

interface Machine {
  readonly buttons: readonly Button[];
  readonly joltage_str: string;
  readonly joltage_arr: readonly number[];
}

function parse_input(input: string): readonly Machine[] {
  const lines = input.split('\n').filter(Boolean);

  return lines.map((line) => {
    const parts = line.split(' ');
    const buttons: Button[] = parts.slice(1, -1).map((str) =>
      str
        .slice(1, -1)
        .split(',')
        .map((s) => Number(s)),
    );
    const joltage_str = parts.at(-1)!.slice(1, -1);
    const joltage_arr = joltage_str.split(',').map(Number);
    return { buttons, joltage_str, joltage_arr };
  });
}

function moves_required(machine: Machine): undefined | number {
  let presses_required = Infinity;

  const joltage_to_presses = new Map<string, number>();

  const joltage_counters: number[] = new Array(machine.joltage_arr.length).fill(
    0,
  );

  function add_lights(joltage: string, presses: number) {
    const prev_presses = joltage_to_presses.get(joltage);
    if (prev_presses !== undefined && prev_presses <= presses) {
      return;
    }
    joltage_to_presses.set(joltage, presses);

    if (joltage === machine.joltage_str) {
      presses_required = presses;
      return;
    }
    if (presses + 1 === presses_required) {
      return;
    }
    for (const button of machine.buttons) {
      let over_limit = false;
      for (const n of button) {
        joltage_counters[n]++;
        if (joltage_counters[n] > machine.joltage_arr[n]) {
          over_limit = true;
        }
      }
      if (!over_limit) {
        add_lights(joltage_counters.join(','), presses + 1);
      }
      for (const n of button) {
        joltage_counters[n]--;
      }
    }
  }

  add_lights(joltage_counters.join(','), 0);

  return joltage_to_presses.get(machine.joltage_str);
}

export function solve(input: string): number {
  const machines = parse_input(input);

  let total = 0;

  for (let i = 0; i < machines.length; i++) {
    const moves = moves_required(machines[i]);

    console.log('moves:', moves);

    if (moves === undefined) {
      throw new Error(`Failed to path machine ${i}`);
    } else {
      total += moves;
    }
  }

  return total;
}
