const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const emitter = require('../emitter');
const mkdirp = require('../utils').mkdirp;
const glob = require('../utils').glob;

const browsers = [
  '>1%',
  'last 4 versions',
  'Firefox ESR',
  'not ie < 9', // screw IE8
];

const prefixer = autoprefixer({
  browsers
});

function prefix(file) {
  const map = JSON.stringify(file.map.toString());

  const options = {
    to: path.basename(file.stats.entry.replace('.scss', '.css')),
    map: {
      prev: map,
      inline: false
    }
  };

  return postcss([prefixer])
    .process(file.css, options)
    .then(result => {
      result.warnings().forEach(warn => emitter.warning(warn));
      return result;
    });
}

function nodeSass(config) {
  const { file, dest, filename } = config;
  const outFile = path.join(dest, filename.replace('.scss', '.css'));

  return new Promise((resolve, reject) => {
    sass.render({
      file,
      outFile,
      sourceMap: filename + '.map'
    }, (err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
}

function compile(config) {
  const start = config.start;
  config.filename = path.basename(config.file);

  return nodeSass(config)
    .then(prefix)
    .then(out => {
      return mkdirp(config.dest).then(() => {
        fs.writeFileSync(path.join(config.dest, config.filename.replace(/\.scss$/, '.css')), out.css);
        fs.writeFileSync(path.join(config.dest, config.filename.replace(/\.scss$/, '.css.map')), out.map);
      });
    }).then(() => {
      const duration = new Date().getTime() - start;
      emitter.time(config.filename, duration);
      return;
    }).catch(err => emitter.error(err));
}

function build(config) {
  const start = new Date().getTime();
  const globOptions = { ignore: '**/_*', follow: true };
  const { src, dest } = config.sass;

  return glob(src + '*.scss', globOptions)
    .then(files => files.map(file => compile({
      src,
      dest,
      file,
      start
    })))
    .catch(err => emitter.error(err));
}

module.exports = build;
