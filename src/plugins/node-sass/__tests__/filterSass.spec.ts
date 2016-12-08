import { fixturePath as searchPath, getFixture } from "../../../__tests__/helpers";
import { IFile } from "../../../io/file";
import { filterSass as filter } from "../filterSass";
import { assert as t } from "chai";

describe("filterSass", () => {
  it("should return only root files", () => {
    const fixture = getFixture("main.scss");

    let files: IFile[] = [{
      base: ".",
      location: fixture,
      map: null,
    }];

    t.deepEqual(filter(files, searchPath), [{
      base: ".",
      location: fixture,
      map: null,
    }]);

    files[0].location = getFixture("components/_a.scss");
    t.deepEqual(filter(files, searchPath), [{
      base: ".",
      location: getFixture("main.scss"),
      map: null,
    }]);

  });

  it("should filter duplicate files", () => {
    const files: IFile[] = [{
      base: ".",
      location: getFixture("components/_a.scss"),
      map: null,
    }, {
      base: ".",
      location: getFixture("components/_a.scss"),
      map: null,
    }, {
      base: ".",
      location: getFixture("_b.scss"),
      map: null,
    }];

    t.deepEqual(filter(files, searchPath), [{
      base: ".",
      location: getFixture("main.scss"),
      map: null,
    }, {
      base: ".",
      location: getFixture("main2.scss"),
      map: null,
    }]);
  });
});
