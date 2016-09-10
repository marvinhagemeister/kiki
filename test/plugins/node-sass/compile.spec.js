const t = require('chai').assert;
const compile = require('../../../dist/plugins/node-sass').compile;
const { getFixture } = require('../../helpers');

describe('compile (node-sass)', () => {
  it('should work', () => {
    const files = [{
      location: getFixture('main.scss'),
      map: null
    }];

    const options = {
      dest: "tmp/"
    };

    compile(options)(files).then(res => {
      t.deepEqual(res, [{
        location: getFixture('main.css'),
        map: null,
        content: 'p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody'
        + ' {\n  background: red; }\n'
      }]);
    });
  });
});
