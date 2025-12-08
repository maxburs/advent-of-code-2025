import { parseArgs } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const args = parseArgs({
    args: process.argv.slice(2),
    options: {
      day: {
        type: 'string',
        short: 'd',
      },
      part: {
        type: 'string',
        short: 'p',
      },
    },
  });

  if (args.values.day === undefined) {
    console.error('Missing --day argument');
    process.exitCode = 1;
    return;
  }

  if (args.values.part === undefined) {
    console.error('Missing --part argument');
    process.exitCode = 1;
    return;
  }

  const inputPromise = fs.readFile(
    path.join(
      import.meta.dirname,
      `day-${args.values.day}/part-${args.values.part}.ts`,
    ),
    'utf8',
  );

  const solution: { solve(input: string): number } = await import(
    path.join(
      import.meta.dirname,
      `day-${args.values.day}/part-${args.values.part}.ts`,
    )
  );

  console.log(solution.solve(await inputPromise));
}

main();
