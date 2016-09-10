const glob = require('glob');
const sass = require('node-sass');
const mkdirp = require('mkdirp');

function pGlob(path, options) {
  return new Promise((resolve, reject) => {
    glob(path, options, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

function pMkdirp(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, err => {
      if (err) return reject(err);

      resolve();
    })
  });
}

function nodeSass(options) {
  return new Promise((resolve, reject) => {
    sass.render(options, (err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
}

module.exports = {
  glob: pGlob,
  mkdirp: pMkdirp,
  sass: nodeSass
}
