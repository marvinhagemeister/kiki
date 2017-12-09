import CssAsset from "../CssAsset";

describe("CssAsset", () => {
  const asset = new CssAsset("foo");

  describe("mightHaveDependencies", () => {
    it("should check @imports", () => {
      asset.contents = ".foo{color:red}";
      expect(asset.mightHaveDependencies()).toEqual(false);

      asset.contents = "@import 'bob.css';.foo{color:red}";
      expect(asset.mightHaveDependencies()).toEqual(true);
    });

    it("should detect url()", () => {
      asset.contents = ".foo{background:url('bar.jpg')}";
      expect(asset.mightHaveDependencies()).toEqual(true);
    });
  });

  describe("collectDependencies", () => {
    it("should collect normal @import", () => {
      asset.contents = "@import 'bob.css';.foo{color:red}";
      asset.parse();
      expect(asset.collectDependencies()).toEqual(["bob.css"]);
    });

    it("should collect url @import", () => {
      asset.contents = "@import url(bob.css) print;.foo{color:red}";
      asset.parse();
      expect(asset.collectDependencies()).toEqual(["bob.css"]);
    });
  });
});
