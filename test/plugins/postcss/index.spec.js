const t = require('chai').assert;
const out = require('../../../dist/plugins/postcss/index');

describe('index (postccss)', () => {
  it('should provide exports', () => {
    t.equal(typeof out.compile, 'function');
  });
});
