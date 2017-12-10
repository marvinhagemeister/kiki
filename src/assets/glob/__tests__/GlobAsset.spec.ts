import GlobAsset from "../GlobAsset";

describe("GlobAsset", () => {
  let asset: GlobAsset;

  beforeAll(() => (asset = new GlobAsset("foo")));

  describe("collectDependencies", () => {
    it("should work", async () => {
      asset = new GlobAsset("./foo/bar/*.js", {
        find: () => Promise.resolve(["./foo/bar/bob.js", "./foo/bar/foo.js"]),
      });
      await asset.load();

      expect(asset.collectDependencies()).toEqual(["./bob.js", "./foo.js"]);
    });
  });
});
