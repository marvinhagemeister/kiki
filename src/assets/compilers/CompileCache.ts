import md5 from "md5";
import { Asset } from "../Asset";

export default class CompileCache {
  private cache = new WeakMap<Asset, string>();

  update(asset: Asset) {
    const hash = md5(asset.contents);
    this.cache.set(asset, hash);
  }

  isDirty(asset: Asset): boolean {
    const hash = this.cache.get(asset);
    if (hash === undefined) {
      return true;
    }

    return hash === md5(asset.contents);
  }
}
