// Extracts the animated SVGs from svgs.js into ./assets/*.svg
// Usage: node extract-svgs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync(new URL('./svgs.js', import.meta.url), 'utf8');
const json = src.replace(/^window\.GH_SVGS = /, '').replace(/;\s*$/, '');
const svgs = JSON.parse(json);

mkdirSync(new URL('./assets/', import.meta.url), { recursive: true });
for (const [name, svg] of Object.entries(svgs)) {
  if (name === 'trusted-by.svg' || name.endsWith('-dark.svg')) continue;
  writeFileSync(new URL(`./assets/${name}`, import.meta.url), svg);
  console.log('wrote assets/' + name);
}
