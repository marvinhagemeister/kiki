import { fixturePath as searchPath, getFixture } from "../../../../test/helpers";
import { filterSass as filter } from "../filterSass";
import { assert as t } from "chai";
import "mocha";

const options = { searchPath };

describe("filterSass", () => {
  it("should return only root files", () => {
    let files = [getFixture("main.scss")];

    t.deepEqual(filter(files, options), files);

    files = [getFixture("components/_a.scss")];
    t.deepEqual(filter(files, options), [getFixture("main.scss")]);
  });

  it("should filter duplicate files", () => {
    const files: string[] = [
      getFixture("components/_a.scss"),
      getFixture("components/_a.scss"),
      getFixture("_b.scss"),
    ];

    t.deepEqual(filter(files, options), [
      getFixture("main.scss"),
      getFixture("main2.scss"),
    ]);
  });
});
