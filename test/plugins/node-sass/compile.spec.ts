import { IFile } from "../../../src/io/file";
import { compile } from "../../../src/plugins/node-sass/compile";
import { getFixture } from "../../helpers";
import { assert as t } from "chai";
import * as fs from "fs";
import "mocha";

function getFiles(name: string): IFile[] {
  return [{
    base: __dirname + "/fixtures",
    content: fs.readFileSync(getFixture(name), "utf-8"),
    location: getFixture(name),
    map: null,
  }];
}

describe("compile (node-sass)", () => {
  it("should work", () => {
    const files: IFile[] = [{
      base: __dirname + "/fixtures",
      location: getFixture("main.scss"),
      map: null,
    }];

    const options = {
      dest: "tmp/",
    };

    return compile(options)(files).then(res => {
      t.deepEqual(res, [{
        base: __dirname + "/fixtures",
        content: "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody"
        + " {\n  background: red; }\n",
        location: getFixture("main.css"),
        map: null,
      }]);
    });
  });

  it("should minify css if NODE_ENV=production", () => {
    process.env.NODE_ENV = "production";
    const files = getFiles("postcss.css");
    const sassOpts = {
      dest: "tmp/",
    };

    return compile(sassOpts)(files).then(res => {
      t.deepEqual(res, [{
        base: __dirname + "/fixtures",
        content: "h1{display:flex}\n",
        location: getFixture("postcss.css"),
        map: null,
      }]);

      process.env.NODE_ENV = "test";
    });
  });
});
