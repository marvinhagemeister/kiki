import * as index from "../index";
import { assert as t } from "chai";

describe("main index", () => {
  it("should have correct exports", () => {
    t.isFunction(index.getConfig);
    t.isFunction(index.build);
    t.isFunction(index.watch);

    t.equal(Object.keys(index).length, 3);
  });
});
