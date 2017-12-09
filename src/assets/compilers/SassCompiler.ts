import * as path from "path";
import Compiler from "./Compiler";
import CompileCache from "./CompileCache";
import { Asset } from "../Asset";
import * as nSass from "node-sass";

const render = (options: nSass.Options) =>
  new Promise<nSass.Result>((resolve, reject) => {
    nSass.render(
      options,
      (err, result) => (err !== null ? reject(err) : resolve(result)),
    );
  });

export default class SassCompiler extends Compiler {
  AssetConstructor = Asset;
  cache = new CompileCache();

  async transform(asset: Asset) {
    // TODO: Sourcemaps
    const result = await render({
      data: asset.contents,
    });

    asset.contents = result.css.toString();
    // TODO: Detach children
    // TODO: Convert to css
  }

  filterAssets(assets: Asset[]) {
    const dirty = new Set<Asset>();
    const visited = new Set<Asset>();

    for (const asset of assets) {
      if (!this.cache.isDirty(asset)) {
        visited.add(asset);
        continue;
      }

      // Check for partial
      if (isPartial(asset)) {
        searchRoot(asset, visited, dirty);
      } else {
        dirty.add(asset);
      }
    }

    return dirty;
  }
}

export function isPartial(asset: Asset) {
  return path.basename(asset.name).startsWith("_");
}

export function searchRoot(
  asset: Asset,
  visited: Set<Asset>,
  found: Set<Asset>,
) {
  for (const parent of asset.parents) {
    if (isPartial(parent)) {
      searchRoot(parent, visited, found);
    } else if (asset.name.endsWith(".scss")) {
      found.add(asset);
    }
  }
}
