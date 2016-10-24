import { filesFromMatch as match } from "../../src/utils";
import { assert as t } from "chai";
import "mocha";

describe("filesFromMatch", () => {
  it("should create an IFile object from a match", () => {
    t.deepEqual(match(["/whatever/myfile.scss"], "/whatever/"), [{
      base: "",
      location: "/whatever/myfile.scss",
      map: null,
    }]);

    t.deepEqual(match(["/whatever/a/myfile.scss", "/whatever/myfile.scss"], "/whatever/"), [{
      base: "a",
      location: "/whatever/a/myfile.scss",
      map: null,
    }, {
      base: "",
      location: "/whatever/myfile.scss",
      map: null,
    }]);
  });

  it("should create correct relative paths", () => {
    t.deepEqual(match(["/home/whatever/myfile.scss"], "/home/"), [{
      base: "whatever",
      location: "/home/whatever/myfile.scss",
      map: null,
    }]);
  });
});
