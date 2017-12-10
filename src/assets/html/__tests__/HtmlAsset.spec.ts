import HtmlAsset from "../HtmlAsset";

describe("HtmlAsset", () => {
  let asset: HtmlAsset;

  beforeAll(() => (asset = new HtmlAsset("foo")));

  describe("mightHaveDependencies", () => {
    it("should check <link>-tags", () => {
      asset.contents = "<foo><link /></foo>";
      expect(asset.mightHaveDependencies()).toEqual(false);

      asset.contents = "<foo><link href='bob'/></foo>";
      expect(asset.mightHaveDependencies()).toEqual(true);
    });

    it("should check <script>-tags", () => {
      asset.contents = "<foo><script href='bob'/></foo>";
      expect(asset.mightHaveDependencies()).toEqual(false);

      asset.contents = "<foo><script href='bob'></script></foo>";
      expect(asset.mightHaveDependencies()).toEqual(false);

      asset.contents = "<foo><script src='bob'></script></foo>";
      expect(asset.mightHaveDependencies()).toEqual(true);
    });
  });

  describe("collectDependencies", () => {
    it("should work", () => {
      asset.contents =
        "<html><script src='bob'></script><body><script src='foo'></script></body></html>";
      asset.parseIfNeeded();

      expect(asset.collectDependencies()).toEqual(["bob", "foo"]);
    });
  });
});
