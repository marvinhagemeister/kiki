import { replaceExtension as replace } from "../utils";

describe("replaceExtension", () => {
  it("should replace an extension", () => {
    expect(replace("/a/myfile.scss", ".css")).toEqual("/a/myfile.css");
    expect(replace("/a/myfile.scss", "css")).toEqual("/a/myfile.css");

    expect(replace("/a/myfile.scss", ".css.map")).toEqual("/a/myfile.css.map");
    expect(replace("/a/myfile.scss", "css.map")).toEqual("/a/myfile.css.map");
  });
});
