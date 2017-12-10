import * as path from "path";
import { Asset } from "./Asset";
import { BaseCompiler } from "./compilers/Compiler";

export default class Resolver {
  private mapping = new Map<string, BaseCompiler>();

  /** Register an asset class by extension */
  register(extension: string, compiler: BaseCompiler) {
    this.mapping.set(extension, compiler);
  }

  getCompiler(asset: Asset) {
    return this.mapping.get(path.extname(asset.name));
  }

  /** Return registered asset class by file type. Defaults to `Asset` */
  getAssetCtor(file: string): typeof Asset {
    const ext = path.extname(file);
    const compiler = this.mapping.get(ext);
    return compiler !== undefined ? compiler.AssetConstructor : Asset;
  }
}
