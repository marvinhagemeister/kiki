import * as postcss from "postcss";
import Compiler from "../compilers/Compiler";
import CssAsset from "./CssAsset";

export default class CssCompiler extends Compiler {
  AssetConstructor = CssAsset;

  plugins: any[] = [];

  async compile(asset: CssAsset) {
    await asset.parseIfNeeded();
    const res = await postcss(this.plugins).process(asset.ast);
  }
}
