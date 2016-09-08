const glob = require('glob');
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

module.exports = {
  glob: pGlob,
  mkdirp: pMkdirp
}
