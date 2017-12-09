import { Asset } from "../Asset";
import CompileCache from "./CompileCache";

export interface Compiler {
  compile(assets: Asset[]): Promise<void>;
  AssetConstructor: typeof Asset;
}

export default abstract class BaseCompiler implements Compiler {
  AssetConstructor = Asset;

  constructor(public cache: CompileCache = new CompileCache()) {}

  async compile(assets: Asset[]) {
    const dirty = this.filterAssets(assets);
    const promises = [];
    dirty.forEach(asset => promises.push(this.transform(asset)));
    await Promise.all(promises);
  }

  abstract async transform(asset: Asset);

  protected filterAssets(assets: Asset[]) {
    const dirty = new Set<Asset>();

    for (const asset of assets) {
      if (this.cache.isDirty(asset)) {
        dirty.add(asset);
      }
    }

    return dirty;
  }
}
