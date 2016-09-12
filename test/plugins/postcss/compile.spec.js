const t = require('chai').assert;
const fs = require('fs');
const { compile } = require('../../../dist/plugins/postcss/compile');
const { getFixture } = require('../../helpers');

describe('compile (postcss)', () => {
  it('should work', () => {
    const files = [{
      location: getFixture('postcss.css'),
      map: null,
      content: fs.readFileSync(getFixture('postcss.css'), 'utf-8')
    }];

    const postCssOpts = {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ]
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        location: getFixture('postcss.css'),
        map: null,
        content: 'h1 {\n  display: -webkit-box;\n  display: -webkit-flex;\n'
          + '  display: -ms-flexbox;\n  display: flex;\n}\n'
      }]);
    });
  });
});
