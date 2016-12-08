import { replaceExtension as replace } from "../utils";
import { assert as t } from "chai";

describe("replaceExtension", () => {
  it("should replace an extension", () => {
    t.equal(replace("/a/myfile.scss", ".css"), "/a/myfile.css");
    t.equal(replace("/a/myfile.scss", "css"), "/a/myfile.css");

    t.equal(replace("/a/myfile.scss", ".css.map"), "/a/myfile.css.map");
    t.equal(replace("/a/myfile.scss", "css.map"), "/a/myfile.css.map");
  });
});
