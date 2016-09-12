const path = require('path');

const fixturePath = path.resolve(__dirname, 'fixtures');

function getFixture(fixture) {
  return path.resolve(fixturePath, fixture);
}

module.exports = {
  fixturePath,
  getFixture
};
