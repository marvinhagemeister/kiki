import crypto from "crypto";
import { Asset } from "../Asset";

export function md5(data: string) {
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
}

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
