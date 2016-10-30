/* global describe:true */
import { IFile } from "../file";
import { writeFile as write } from "../writeFiles";
import { assert as t } from "chai";
import * as fs from "fs";
import "mocha";
import * as path from "path";
import * as rimraf from "rimraf";

describe("writeFiles", () => {
  const dest = path.join(process.cwd(), "tmp");

  beforeEach(done => {
    rimraf(dest, done);
  });

  afterEach(done => {
    rimraf(dest, done);
  });

  it("should write IFile[] to disk", () => {
    let file: IFile = {
      base: "",
      content: "Hello World!",
      location: "whatever/hello.txt",
      map: null,
    };

    return Promise.resolve(file)
      .then(write(dest))
      .then((f: IFile) => {
        const out = dest + "/hello.txt";
        t.equal(f.location, out);

        const content = fs.readFileSync(out, "utf-8");
        t.equal(content, "Hello World!");
      });
  });

  it("should keep subfolder structure when writing files", () => {
    let file: IFile = {
      base: "/root/whatever",
      content: "Hello World!",
      location: "/root/whatever/hello.scss",
      map: null,
    };

    return Promise.resolve(file)
      .then(write(dest))
      .then((f: IFile) => {
        t.equal(f.location, dest + "/root/whatever/hello.scss");
      });
  });

  it.skip("should write files with sourcemaps to disk", () => {
    t.fail();
  });
});
