const t = require('chai').assert;
const out = require('../../../dist/plugins/node-sass/index');

describe('index (node-sass)', () => {
  it('should provide exports', () => {
    t.equal(typeof out.compile, 'function');
    t.equal(typeof out.filterSass, 'function');
  });
});
