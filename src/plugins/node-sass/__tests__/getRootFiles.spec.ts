import { fixturePath, getFixture } from "../../../../test/helpers";
import { getRootFiles } from "../getRootFiles";
import { assert as t } from "chai";
import "mocha";

describe("getRootFiles", () => {
  it("should get root file", () => {
    let file = getFixture("main.scss");

    t.deepEqual(getRootFiles(fixturePath, file), [
      getFixture("main.scss")
    ]);

    file = getFixture("components/_a.scss");

    t.deepEqual(getRootFiles(fixturePath, file), [
      getFixture("main.scss")
    ]);
  });

  it("should get multiple root files", () => {
    const file = getFixture("_b.scss");

    t.deepEqual(getRootFiles(fixturePath, file), [
      getFixture("main.scss"),
      getFixture("main2.scss"),
    ]);
  });

  it("should filter partials", () => {
    const file = getFixture("components/_no-parents.scss");

    t.deepEqual(getRootFiles(fixturePath, file), []);
  });
});
