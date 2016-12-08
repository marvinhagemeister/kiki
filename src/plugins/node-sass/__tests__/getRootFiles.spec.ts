import { fixturePath, getFixture } from "../../../__tests__/helpers";
import { IFile } from "../../../io/file";
import { getRootFiles as root } from "../getRootFiles";
import { assert as t } from "chai";

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
