import * as out from "../index";
import { assert as t } from "chai";
import "mocha";

describe("index (node-sass)", () => {
  it("should provide exports", () => {
    t.equal(typeof out.compile, "function");
    t.equal(typeof out.filterSass, "function");
  });
});