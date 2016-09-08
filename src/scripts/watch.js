const chokidar = require('chokidar');
const sass = require('./sass');
const emitter = require('../emitter');
const glob = require('../utils').glob;

module.exports = function watch(config) {
  let watchPaths = [];

  if (config.sass) {
    emitter.start('sass', config.sass.src);
    watchPaths.push(config.sass.src);
  }

  if (config.js) {
    emitter.start('js', config.js.src);
    watchPaths.push(config.js.src);
  }

  if (watchPaths.length === 0) {
    emitter.nothingToWatch();
  }

  const watchOpts = {
    ignored: /[\/\\]\./,
    ignoreInitial: true
  };

  chokidar.watch(watchPaths, watchOpts).on('all', (event, path) => {
    console.log();
    console.log(event + ": " + path);

    const start = new Date().getTime();

    if (/.+\.scss$/.test(path)) {
      const globOptions = { ignore: '**/_*', follow: true };
      const { src, dest } = config.sass;

      return glob(src + '*.scss', globOptions)
        .then(files => files.map(file => sass({
          src,
          dest,
          file,
          start
        })))
        .catch(err => emitter.error(err));
    }
  });
}
