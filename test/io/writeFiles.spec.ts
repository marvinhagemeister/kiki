/* global describe:true */
import { IFile } from "../../src/io/file";
import { writeFiles as write } from "../../src/io/writeFiles";
import { assert as t } from "chai";
import * as fs from "fs";
import "mocha";
import * as path from "path";
import * as rimraf from "rimraf";

describe("writeFiles", () => {
  const dest = path.resolve(__dirname, "../tmp");

  beforeEach(done => {
    rimraf(dest, done);
  });

  afterEach(done => {
    rimraf(dest, done);
  });

  it("should write IFile[] to disk", () => {
    let files: IFile[] = [{
      base: "",
      content: "Hello World!",
      location: "whatever/hello.txt",
      map: null,
    }];

    return Promise.resolve(files)
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

  it("should keep subfolder structure when writing files", () => {
    let files: IFile[] = [{
      base: "/root/whatever",
      content: "Hello World!",
      location: "/root/whatever/hello.scss",
      map: null,
    }];

    return Promise.resolve(files)
      .then(write(dest))
      .then((res: IFile[]) => {
        res.forEach(file => {
          t.equal(file.location, dest + "/root/whatever/hello.scss");
        });
      });
  });

  it.skip("should write files with sourcemaps to disk", () => {
    t.fail();
  });
});
