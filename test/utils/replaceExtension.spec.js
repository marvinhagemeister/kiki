const t = require('chai').assert;
const replace = require('../../dist/utils').replaceExtension;

describe('replaceExtension', () => {
  it('should replace an extension', () => {
    t.equal(replace('/a/myfile.scss', '.css'), '/a/myfile.css');
    t.equal(replace('/a/myfile.scss', 'css'), '/a/myfile.css');

    t.equal(replace('/a/myfile.scss', '.css.map'), '/a/myfile.css.map');
    t.equal(replace('/a/myfile.scss', 'css.map'), '/a/myfile.css.map');
  });
});
