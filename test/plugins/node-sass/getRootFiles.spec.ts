import { IFile } from "../../../src/io/file";
import { getRootFiles as root } from "../../../src/plugins/node-sass/getRootFiles";
import { fixturePath, getFixture } from "../../helpers";
import { assert as t } from "chai";
import "mocha";

describe("getRootFiles", () => {
  it("should get root file", () => {
    let file: IFile = {
      base: __dirname + "/fixtures",
      location: null,
      map: null,
    };

    file.location = getFixture("main.scss");
    t.deepEqual(root(fixturePath, file), [{
      base: __dirname + "/fixtures",
      location: file.location,
      map: null,
    }]);

    file.location = getFixture("components/_a.scss");
    t.deepEqual(root(fixturePath, file), [{
      base: __dirname + "/fixtures",
      location: getFixture("main.scss"),
      map: null,
    }]);

  });

  it("should get multiple root files", () => {
    const file: IFile = {
      base: __dirname + "/fixtures",
      location: getFixture("_b.scss"),
      map: null,
    };

    t.deepEqual(root(fixturePath, file), [{
      base: __dirname + "/fixtures",
      location: getFixture("main.scss"),
      map: null,
    }, {
      base: __dirname + "/fixtures",
      location: getFixture("main2.scss"),
      map: null,
    }]);
  });

  it("should filter partials", () => {
    const file: IFile = {
      base: __dirname + "/fixtures",
      location: getFixture("components/_no-parents.scss"),
      map: null,
    };

    t.deepEqual(root(fixturePath, file), []);
  });
});
