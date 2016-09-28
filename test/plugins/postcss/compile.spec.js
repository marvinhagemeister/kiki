const t = require('chai').assert;
const fs = require('fs');
const compile = require('../../../dist/plugins/postcss/compile').compile;
const helpers = require('../../helpers');

const getFixture = helpers.getFixture;

function getFiles(name) {
  return [{
    location: getFixture(name),
    map: null,
    content: fs.readFileSync(getFixture(name), 'utf-8')
  }];
}

describe('compile (postcss)', () => {
  it('should work add prefixes by default', () => {
    const files = getFiles('postcss.css');
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

  it('should add prefixes if "addVendorPrefixes" is true', () => {
    const files = getFiles('postcss.css');
    const postCssOpts = {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8,
      ],
      "addVendorPrefixes": true
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

  it('should not add prefixes if "addVendorPrefixes" is false', () => {
    const files = getFiles('postcss.css');
    const postCssOpts = {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ],
      "addVendorPrefixes": false
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        location: getFixture('postcss.css'),
        map: null,
        content: 'h1 {\n  display: flex;\n}\n'
      }]);
    });
  });

  it('should add future features if "cssnext" is true', () => {
    const files = getFiles('cssnext.css');
    const postCssOpts = {
      "cssnext": true
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        location: getFixture('cssnext.css'),
        map: null,
        content: '.one {\n  background-color: brown;\n}\n\n.two {\n  '
          + 'background-color: brown;\n}\n'
      }]);
    });
  });

  it('should add future features if "cssnext" is false', () => {
    const files = getFiles('cssnext.css');
    const postCssOpts = {
      "cssnext": false
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        location: getFixture('cssnext.css'),
        map: null,
        content: ':root {\n  --main-bg-color: brown;\n}\n\n.one {\n  '
          + 'background-color: var(--main-bg-color);\n}\n\n.two {\n  '
          + 'background-color: var(--main-bg-color);\n}\n'
      }]);
    });
  });
});
