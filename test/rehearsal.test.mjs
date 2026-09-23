import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('prints the version it was published as', () => {
  const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(execFileSync(process.execPath, [new URL('../bin/rehearsal.mjs', import.meta.url).pathname], { encoding: 'utf8' }).trim(), version);
});
