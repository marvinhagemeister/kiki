import * as out from "../../../src/plugins/node-sass/index";
import { assert as t } from "chai";
import "mocha";

describe("index (node-sass)", () => {
  it("should provide exports", () => {
    t.equal(typeof out.compile, "function");
    t.equal(typeof out.filterSass, "function");
  });
});
