import { filesFromMatch as match } from "../utils";

describe("filesFromMatch", () => {
  it("should create an IFile object from a match", () => {
    expect(match(["/whatever/myfile.scss"], "/whatever/")).toEqual([
      {
        base: "",
        location: "/whatever/myfile.scss",
        map: null,
      },
    ]);

    expect(
      match(["/whatever/a/myfile.scss", "/whatever/myfile.scss"], "/whatever/"),
    ).toEqual([
      {
        base: "a",
        location: "/whatever/a/myfile.scss",
        map: null,
      },
      {
        base: "",
        location: "/whatever/myfile.scss",
        map: null,
      },
    ]);
  });

  it("should create correct relative paths", () => {
    expect(match(["/home/whatever/myfile.scss"], "/home/")).toEqual([
      {
        base: "whatever",
        location: "/home/whatever/myfile.scss",
        map: null,
      },
    ]);
  });
});
