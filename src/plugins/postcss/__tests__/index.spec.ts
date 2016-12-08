import * as postcss from "../index";
import { assert as t } from "chai";

describe("index (postccss)", () => {
  it("should provide exports", () => {
    t.equal(typeof postcss.compile, "function");
  });
});
