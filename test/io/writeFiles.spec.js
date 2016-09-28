"use strict";
const t = require('chai').assert;
const path = require('path');
const fs = require('fs');
const mkdirpOld = require('mkdirp');
const Promise = require('bluebird');
const write = require('../../dist/io/writeFiles').writeFiles;
const rimraf = require('rimraf');

const mkdirp = Promise.promisify(mkdirpOld);

describe('writeFiles', () => {
  const dest = path.resolve(__dirname, "../fixtures/tmp/");

  beforeEach(done => {
    rimraf(dest, done);
  });

  afterEach(done => {
    rimraf(dest, done);
  });

  it('should write IFile[] to disk', () => {
    let files = [{
      location: "whatever/hello.txt",
      content: "Hello World!"
    }];

    return mkdirp(dest).then(() => {
      return files
    })
    .then(write(dest))
    .then(res => {
      const file = res[0];

      const out = dest + "/hello.txt";
      t.equal(file.location, out);

      const content = fs.readFileSync(out, 'utf-8');
      t.equal(content, "Hello World!");
      return out;
    });
  });

  it.skip('should write files with sourcemaps to disk', () => {

  });
});
