import { IFile } from "../../../src/io/file";
import { compile } from "../../../src/plugins/node-sass/compile";
import { getFixture } from "../../helpers";
import { assert as t } from "chai";
import "mocha";

describe("compile (node-sass)", () => {
  it("should work", () => {
    const files: IFile[] = [{
      location: getFixture("main.scss"),
      map: null,
    }];

    const options = {
      dest: "tmp/",
    };

    return compile(options)(files).then(res => {
      t.deepEqual(res, [{
        content: "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody"
        + " {\n  background: red; }\n",
        location: getFixture("main.css"),
        map: null,
      }]);
    });
  });
});
