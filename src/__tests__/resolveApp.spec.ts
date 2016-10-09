import { resolveApp as resolve } from "../utils";
import { assert as t } from "chai";
import "mocha";
import * as path from "path";

describe("resolveApp", () => {
  it("should create an IFile object from a match", () => {
    t.equal(resolve("myfile.scss"), path.join(__dirname, "..", "..", "myfile.scss"));
    t.equal(resolve("asdf/myfile.scss"), path.join(__dirname, "..", "..", "asdf", "myfile.scss"));
  });
});
