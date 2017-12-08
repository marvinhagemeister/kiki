import { validate } from "../validate";

describe("validate config", () => {
  it("should return true on valid config", () => {
    let config = {};
    expect(validate(config)).toEqual(false);

    config = { src: "hello world" };
    expect(validate(config)).toEqual(false);
  });
});
