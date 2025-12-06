import fs from 'node:fs/promises';
import { solve } from './part-1.ts';

const input = await fs.readFile(import.meta.dirname + '/input.txt', 'utf-8');
console.log(solve(input));
