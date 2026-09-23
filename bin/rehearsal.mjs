#!/usr/bin/env node
// A stand-in for a real command: it prints its version, and checks npm for a newer one on a channel
// the way a real update check would (the registry's dist-tags: latest is stable, next is beta).
import { readFileSync } from 'node:fs';

const { name, version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const [command, ...rest] = process.argv.slice(2);

if (command === 'check') {
  const channel = rest.includes('--channel') ? rest[rest.indexOf('--channel') + 1] : 'stable';
  const tag = channel === 'beta' ? 'next' : 'latest';
  const res = await fetch(`https://registry.npmjs.org/-/package/${name}/dist-tags`);
  if (!res.ok) {
    console.error(`Couldn't ask npm (HTTP ${res.status}).`);
    process.exit(1);
  }
  const tags = await res.json();
  const newest = tags[tag] ?? tags.latest;
  console.log(newest === version ? `${version} is the newest on ${channel}.` : `${version} here; ${newest} is the newest on ${channel}.`);
} else {
  console.log(version);
}
