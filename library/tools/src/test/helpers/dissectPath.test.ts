import assert from 'assert';
import { dissectPath } from '../../helpers/dissectPath';

describe('test stack', function () {
  it('test dissectPath', function () {
    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 0), [
      '/g.test',
      'g.test',
      '/a/b/c/d/e/f',
    ]);
    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 1), [
      '/f/g.test',
      'g.test',
      '/a/b/c/d/e',
    ]);
    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test'), [
      '/e/f/g.test',
      'g.test',
      '/a/b/c/d',
    ]);
    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 2), [
      '/e/f/g.test',
      'g.test',
      '/a/b/c/d',
    ]);
    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 3), [
      '/d/e/f/g.test',
      'g.test',
      '/a/b/c',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 4), [
      '/c/d/e/f/g.test',
      'g.test',
      '/a/b',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 5), [
      '/b/c/d/e/f/g.test',
      'g.test',
      '/a',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 6), [
      '/a/b/c/d/e/f/g.test',
      'g.test',
      '/',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 7), [
      '/a/b/c/d/e/f/g.test',
      'g.test',
      '/',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 8), [
      '/a/b/c/d/e/f/g.test',
      'g.test',
      '/',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 9), [
      '/a/b/c/d/e/f/g.test',
      'g.test',
      '/',
    ]);

    assert.deepEqual(dissectPath('/a/b/c/d/e/f/g.test', 10), [
      '/a/b/c/d/e/f/g.test',
      'g.test',
      '/',
    ]);
  });
});
