import * as postcss from "../index";

describe("index (postccss)", () => {
  it("should provide exports", () => {
    expect(typeof postcss.compile).toEqual("function");
  });
});
