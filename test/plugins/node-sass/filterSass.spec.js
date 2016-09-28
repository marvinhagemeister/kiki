const t = require('chai').assert;
const filter = require('../../../dist/plugins/node-sass/filterSass').filterSass;
const helpers = require('../../helpers');

const fixturePath = helpers.fixturePath;
const getFixture = helpers.getFixture;

describe('filterSass', () => {
  it('should throw if options are missing', () => {
    t.throws(() => {
      filter();
    });
  });

  it('should return only root files', () => {
    var files = [{
      location: null,
      map: null
    }];

    const options = {
      searchPath: fixturePath
    };

    files[0].location = getFixture('main.scss');

    t.deepEqual(filter(options)(files), [{
      location: files[0].location,
      map: null
    }]);

    files[0].location = getFixture('components/_a.scss');
    t.deepEqual(filter(options)(files), [{
      location: getFixture('main.scss'),
      map: null
    }]);

  });

  it('should filter duplicate files', () => {
    const files = [{
      location: getFixture('components/_a.scss'),
      map: null
    }, {
      location: getFixture('components/_a.scss'),
      map: null
    }, {
      location: getFixture('_b.scss'),
      map: null
    }];

    const options = {
      searchPath: fixturePath
    };

    t.deepEqual(filter(options)(files), [{
      location: getFixture('main.scss'),
      map: null
    }, {
      location: getFixture('main2.scss'),
      map: null
    }]);
  });
});
