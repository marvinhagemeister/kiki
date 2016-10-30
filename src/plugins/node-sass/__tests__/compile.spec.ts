import { getFixture } from "../../../__tests__/helpers";
import { IFile } from "../../../io/file";
import { compile } from "../compile";
import { assert as t } from "chai";
import * as fs from "fs";
import "mocha";

function getFile(name: string): IFile {
  return {
    base: __dirname + "/fixtures",
    content: fs.readFileSync(getFixture(name), "utf-8"),
    location: getFixture(name),
    map: null,
  };
}

describe("compile (node-sass)", () => {
  it("should work", () => {
    const file: IFile = {
      base: __dirname + "/fixtures",
      location: getFixture("main.scss"),
      map: null,
    };

    const options = {
      dest: "tmp/",
      production: false,
    };

    return compile(options)(file).then(res => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content: "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody"
        + " {\n  background: red; }\n",
        location: getFixture("main.css"),
        map: null,
      });
    });
  });

  it("should minify css if production is true", () => {
    const file = getFile("postcss.css");
    const sassOpts = {
      dest: "tmp/",
      production: true,
    };

    return compile(sassOpts)(file).then(res => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content: "h1{display:flex}\n",
        location: getFixture("postcss.css"),
        map: null,
      });
    });
  });
});
