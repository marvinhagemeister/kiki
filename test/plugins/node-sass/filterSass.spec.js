const t = require('chai').assert;
const filter = require('../../../dist/plugins/node-sass').filterSass;
const { fixturePath, getFixture } = require('../../helpers');

describe('filterSass', () => {
  it('should throw if options are missing', () => {
    t.throws(() => {
      filter();
    });
  });

  it('should return only root files', () => {
    let file = {
      location: null,
      map: null
    }

    file.location = getFixture('main.scss');
    t.deepEqual(filter(fixturePath, file), [{
      location: file.location,
      map: null
    }]);

    file.location = getFixture('components/_a.scss');
    t.deepEqual(filter(fixturePath, file), [{
      location: getFixture('main.scss'),
      map: null
    }]);

  });
});
