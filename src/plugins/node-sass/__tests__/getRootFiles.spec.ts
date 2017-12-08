import { fixturePath, getFixture } from "../../../__tests__/helpers";
import { IFile } from "../../../io/file";
import { getRootFiles as root } from "../getRootFiles";

describe("getRootFiles", () => {
  it("should get root file", () => {
    let file: any = {
      base: ".",
      location: null,
      map: null,
    };

    file.location = getFixture("main.scss");
    expect(root(fixturePath, file)).toEqual([
      {
        base: ".",
        location: file.location,
        map: null,
      },
    ]);

    file.location = getFixture("components/_a.scss");
    expect(root(fixturePath, file)).toEqual([
      {
        base: ".",
        location: getFixture("main.scss"),
        map: null,
      },
    ]);
  });

  it("should get multiple root files", () => {
    const file: IFile = {
      base: ".",
      location: getFixture("_b.scss"),
      map: null,
    };

    expect(root(fixturePath, file)).toEqual([
      {
        base: ".",
        location: getFixture("main.scss"),
        map: null,
      },
      {
        base: ".",
        location: getFixture("main2.scss"),
        map: null,
      },
    ]);
  });

  it("should filter partials", () => {
    const file: IFile = {
      base: "components",
      location: getFixture("components/_no-parents.scss"),
      map: null,
    };

    expect(root(fixturePath, file)).toEqual([]);
  });

  it("should set the correct base path", () => {
    const file: IFile = {
      base: "",
      location: getFixture("components/_no-parents.scss"),
      map: null,
    };

    expect(root(fixturePath, file)).toEqual([]);
  });
});
