import * as path from "path";
import { Asset } from "./Asset";
import { Compiler } from "./compilers/BaseCompiler";

export default class Resolver {
  private mapping = new Map<string, Compiler>();

  /** Register an asset class by extension */
  register(extension: string, compiler: Compiler) {
    this.mapping.set(extension, compiler);
  }

  getCompiler(asset: Asset) {
    return this.mapping.get(path.extname(asset.name));
  }

  /** Return registered asset class by file type. Defaults to `Asset` */
  getAssetCtor(extension: string) {
    const compiler = this.mapping.get(extension);
    return compiler !== undefined ? compiler.AssetConstructor : Asset;
  }
}
