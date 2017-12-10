import CssAsset from "../CssAsset";

describe("CssAsset", () => {
  let asset: CssAsset;

  beforeEach(() => (asset = new CssAsset("foo")));

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
      asset.parseIfNeeded();
      expect(asset.collectDependencies()).toEqual(["bob.css"]);
    });

    it("should collect url @import", () => {
      asset.contents = "@import url(bob.css) print;.foo{color:red}";
      asset.parseIfNeeded();
      expect(asset.collectDependencies()).toEqual(["bob.css"]);
    });

    it("should collect in body", () => {
      asset.contents = ".foo{background:url(bar.css)}";
      asset.parseIfNeeded();
      expect(asset.collectDependencies()).toEqual(["bar.css"]);
    });
  });
});
