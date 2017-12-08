import * as index from "../index";

describe("main index", () => {
  it("should have correct exports", () => {
    expect(typeof index.getConfig).toEqual("function");
    expect(typeof index.build).toEqual("function");
    expect(typeof index.watch).toEqual("function");

    expect(Object.keys(index).length).toEqual(3);
  });
});
