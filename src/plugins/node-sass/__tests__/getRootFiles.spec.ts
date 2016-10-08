import { fixturePath, getFixture } from "../../../../test/helpers";
import { IFile } from "../../../io/file";
import { getRootFiles as root } from "../getRootFiles";
import { assert as t } from "chai";
import "mocha";

describe("getRootFiles", () => {
  it("should get root file", () => {
    let file: IFile = {
      location: null,
      map: null,
    };

    file.location = getFixture("main.scss");
    t.deepEqual(root(fixturePath, file), [{
      location: file.location,
      map: null,
    }]);

    file.location = getFixture("components/_a.scss");
    t.deepEqual(root(fixturePath, file), [{
      location: getFixture("main.scss"),
      map: null,
    }]);

  });

  it("should get multiple root files", () => {
    const file: IFile = {
      location: getFixture("_b.scss"),
      map: null,
    };

    t.deepEqual(root(fixturePath, file), [{
      location: getFixture("main.scss"),
      map: null,
    }, {
      location: getFixture("main2.scss"),
      map: null,
    }]);
  });

  it("should filter partials", () => {
    const file: IFile = {
      location: getFixture("components/_no-parents.scss"),
      map: null,
    };

    t.deepEqual(root(fixturePath, file), []);
  });
});
