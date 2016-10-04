/* global describe:true */
import { IFile } from "../../src/io/file";
import { writeFiles as write } from "../../src/io/writeFiles";
import * as Bluebird from "bluebird";
import { assert as t } from "chai";
import * as fs from "fs";
import * as mkdirpOld from "mkdirp";
import "mocha";
import * as path from "path";
import * as rimraf from "rimraf";

const mkdirp = Bluebird.promisify(mkdirpOld);

describe("writeFiles", () => {
  const dest = path.resolve(__dirname, "../fixtures/tmp/");

  beforeEach(done => {
    rimraf(dest, done);
  });

  afterEach(done => {
    rimraf(dest, done);
  });

  it("should write IFile[] to disk", () => {
    let files: IFile[] = [{
      content: "Hello World!",
      location: "whatever/hello.txt",
      map: null,
    }];

    return mkdirp(dest).then(() => files)
    .then(write(dest))
    .then((res: IFile[]) => {
      const file = res[0];

      const out = dest + "/hello.txt";
      t.equal(file.location, out);

      const content = fs.readFileSync(out, "utf-8");
      t.equal(content, "Hello World!");
      return out;
    });
  });

  it.skip("should write files with sourcemaps to disk", () => {
    t.fail();
  });
});
