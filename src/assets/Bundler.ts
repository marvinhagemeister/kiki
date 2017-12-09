import { Asset } from "./Asset";
import CompileCache from "./compilers/CompileCache";

export default class Bundler {
  constructor(public cache: CompileCache = new CompileCache()) {}

  filterAssets(assets: Asset[]) {
    const dirty = new Set<Asset>();
    const visited = new Set<Asset>();

    for (const asset of assets) {
      if (this.cache.isDirty(asset)) {
        dirty.add(asset);
      } else {
        if (asset.includedInParent) {
          searchRoot(asset, visited, dirty);
        }
      }

      visited.add(asset);
    }

    return dirty;
  }
}

export function searchRoot(
  asset: Asset,
  visited: Set<Asset>,
  found: Set<Asset>,
) {
  for (const parent of asset.parents) {
    if (parent.includedInParent) {
      searchRoot(parent, visited, found);
    } else {
      found.add(asset);
    }
  }
}
