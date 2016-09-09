const sass = require('./sass').build;
const emitter = require('../emitter');

module.exports = function build(config) {
  emitter.start('sass', config.sass.src);
  sass(config.sass);
};
