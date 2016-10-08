import { fixturePath as searchPath, getFixture } from "../../../../test/helpers";
import { IFile } from "../../../io/file";
import { filterSass as filter } from "../filterSass";
import { assert as t } from "chai";
import "mocha";

describe("filterSass", () => {
  it("should throw if options are missing", () => {
    t.throws(() => {
      filter();
    });
  });

  it("should return only root files", () => {
    let files: IFile[] = [{
      location: null,
      map: null,
    }];

    const options = {
      searchPath,
    };

    files[0].location = getFixture("main.scss");

    t.deepEqual(filter(options)(files), [{
      location: files[0].location,
      map: null,
    }]);

    files[0].location = getFixture("components/_a.scss");
    t.deepEqual(filter(options)(files), [{
      location: getFixture("main.scss"),
      map: null,
    }]);

  });

  it("should filter duplicate files", () => {
    const files: IFile[] = [{
      location: getFixture("components/_a.scss"),
      map: null,
    }, {
      location: getFixture("components/_a.scss"),
      map: null,
    }, {
      location: getFixture("_b.scss"),
      map: null,
    }];

    const options = {
      searchPath,
    };

    t.deepEqual(filter(options)(files), [{
      location: getFixture("main.scss"),
      map: null,
    }, {
      location: getFixture("main2.scss"),
      map: null,
    }]);
  });
});
