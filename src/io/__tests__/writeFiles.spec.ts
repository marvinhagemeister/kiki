/* global describe:true */
import { IFile } from "../file";
import { writeFile as write } from "../writeFiles";
import * as fs from "fs";
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

  it("should write IFile[] to disk", async () => {
    const file: IFile = {
      base: "",
      content: "Hello World!",
      location: "whatever/hello.txt",
      map: null,
    };

    const res = await write(dest, file);
    const out = dest + "/hello.txt";
    expect(res.location).toEqual(out);

    const content = fs.readFileSync(out, "utf-8");
    expect(content).toEqual("Hello World!");
  });

  it("should keep subfolder structure when writing files", async () => {
    const file: IFile = {
      base: "/root/whatever",
      content: "Hello World!",
      location: "/root/whatever/hello.scss",
      map: null,
    };

    const f = await write(dest, file);
    expect(f.location).toEqual(dest + "/root/whatever/hello.scss");
  });

  it.skip("should write files with sourcemaps to disk", () => {
    // TODO
  });
});
