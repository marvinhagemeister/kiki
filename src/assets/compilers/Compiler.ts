import { Asset } from "../Asset";

export interface BaseCompiler {
  compile(assets: Asset): Promise<void>;
  AssetConstructor: typeof Asset;
}

export default abstract class Compiler implements BaseCompiler {
  AssetConstructor = Asset;
  async compile(assets: Asset) {}
}
