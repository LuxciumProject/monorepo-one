const { test } = require('node:test');
const assert = require('node:assert/strict');
const packageJson = require('../package.json');
const compiled = require('../dist/index.js');

test('compiled entry point exports this package identity', () => {
  assert.equal(compiled.projectName, packageJson.name);
});
