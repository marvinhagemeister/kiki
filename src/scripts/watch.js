const chokidar = require('chokidar');
const sass = require('./sass').watch;
const emitter = require('../emitter');
const getWork = require('../config/utils').getWork;

module.exports = function watch(config) {
  const watchPaths = getWork(config);

  const watchOpts = {
    ignored: /[\/\\]\./,
    ignoreInitial: true
  };

  chokidar.watch(watchPaths, watchOpts).on('all', (event, path) => {
    emitter.change(event, path);

    if (/.+\.scss$/.test(path)) {
      config.sass.path = path;
      sass(config.sass);
    }
  });
}
