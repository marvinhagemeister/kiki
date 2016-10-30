import { validate } from "../validate";
import { assert as t } from "chai";
import "mocha";

describe("validate config", () => {
  it("should return true on valid config", () => {
    let config = {};
    t.isFalse(validate(config));

    config = { src: "hello world" };
    t.isFalse(validate(config));
  });
});
