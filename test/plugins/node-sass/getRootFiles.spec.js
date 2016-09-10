const t = require('chai').assert;
const root = require('../../../dist/plugins/node-sass').getRootFiles;
const { fixturePath, getFixture } = require('../../helpers');

describe('getRootFiles', () => {
  it('should get root file', () => {
    let file = {
      location: null,
      map: null
    }

    file.location = getFixture('main.scss');
    t.deepEqual(root(fixturePath, file), [{
      location: file.location,
      map: null
    }]);

    file.location = getFixture('components/_a.scss');
    t.deepEqual(root(fixturePath, file), [{
      location: getFixture('main.scss'),
      map: null
    }]);

  });

  it('should get multiple root files', () => {
    const file = {
      location: getFixture('_b.scss'),
      map: null
    };

    t.deepEqual(root(fixturePath, file), [{
      location: getFixture('main.scss'),
      map: null
    }, {
      location: getFixture('main2.scss'),
      map: null
    }]);
  });
});
