import * as out from "../index";

describe("index (node-sass)", () => {
  it("should provide exports", () => {
    expect(typeof out.compile).toEqual("function");
    expect(typeof out.filterSass).toEqual("function");
  });
});
