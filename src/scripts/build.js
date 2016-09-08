const sass = require('./sass');
const emitter = require('../emitter');

module.exports = function build(config) {
  emitter.start('sass', config.sass.src);
  sass(config);
};
